// src/hooks/useBLE.js

import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook for BLE device management
 * @param {Object} options Configuration options
 * @param {string[]} options.services Array of service UUIDs to filter devices
 * @returns {Object} BLE control methods and state
 */
export const useBLE = ({ services = [] } = {}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [characteristics, setCharacteristics] = useState({});

  // Check if Bluetooth is available
  const isBluetoothAvailable = useCallback(() => {
    // More comprehensive check
    if (!navigator.bluetooth) {
      console.log("Web Bluetooth API not supported");
      return false;
    }
    
    // Check if we're on HTTPS (required for Web Bluetooth)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      console.log("Web Bluetooth requires HTTPS or localhost");
      return false;
    }
    
    return true;
  }, []);

  // Scan for devices
  const startScan = useCallback(async () => {
    setError(null);

    if (!isBluetoothAvailable()) {
      const errorMsg = "Bluetooth is not available in this browser";
      console.error(errorMsg);
      setError(errorMsg);
      return null;
    }

    try {
      setIsScanning(true);
      
      console.log("Starting BLE scan with services:", services);

      const requestOptions =
        services.length > 0
          ? { 
              filters: [{ services }], 
              optionalServices: services 
            }
          : { acceptAllDevices: true };

      console.log("Request options:", requestOptions);

      const device = await navigator.bluetooth.requestDevice(requestOptions);
      
      console.log("Device found:", device);

      // Add to devices list if not already there
      setDevices((prevDevices) => {
        const exists = prevDevices.some((d) => d.id === device.id);
        return exists ? prevDevices : [...prevDevices, device];
      });

      setIsScanning(false);
      return device;
    } catch (err) {
      console.error("BLE scan error:", err);
      
      let errorMessage = err.message;
      
      // Provide more helpful error messages
      if (err.name === "NotFoundError") {
        errorMessage = "No devices found. Make sure your ESP32 is powered on and broadcasting.";
      } else if (err.name === "SecurityError") {
        errorMessage = "Bluetooth access denied. Please enable Web Bluetooth in your browser.";
      } else if (err.name === "NotSupportedError") {
        errorMessage = "Web Bluetooth is not supported in this browser. Try Chrome, Edge, or Opera.";
      } else if (err.message.includes("User cancelled")) {
        errorMessage = "Device selection was cancelled.";
      }
      
      setError(errorMessage);
      setIsScanning(false);
      return null;
    }
  }, [services, isBluetoothAvailable]);

  // Connect to device
  // In useBLE.js, update the connectToDevice function:
  const connectToDevice = useCallback(
    async (device) => {
      try {
        setError(null);
        const server = await device.gatt.connect();
        setConnectedDevice(device);

        const discoveredServices = {};
        for (const serviceId of services) {
          try {
            const service = await server.getPrimaryService(serviceId);
            const characteristics = await service.getCharacteristics();

            discoveredServices[serviceId] = {};
            for (const char of characteristics) {
              discoveredServices[serviceId][char.uuid] = char;
            }
          } catch (e) {
            console.error(`Service ${serviceId} not found:`, e);
          }
        }

        setCharacteristics(discoveredServices);
        return { device, services: discoveredServices };
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [services]
  );
  // const connectToDevice = useCallback(
  //   async (device) => {
  //     try {
  //       console.log("Connecting to device:", device);
  //       setError(null);
  //       console.log("Before connect:", device.gatt.connected);
  //       const server = await device.gatt.connect();
  //       console.log("After connect:", device.gatt.connected);
  //       console.log("Device:", device);
  //       setConnectedDevice(device);
  //       console.log("Connected device:", connectedDevice);

  //       // Get all services
  //       const discoveredServices = {};
  //       for (const serviceId of services) {
  //         try {
  //           const service = await server.getPrimaryService(serviceId);
  //           const serviceCharacteristics = await service.getCharacteristics();

  //           discoveredServices[serviceId] = serviceCharacteristics.reduce(
  //             (acc, char) => {
  //               acc[char.uuid] = char;
  //               return acc;
  //             },
  //             {}
  //           );
  //         } catch (e) {
  //           console.log(
  //             `Service ${serviceId} not found on device. Error : ${e}`
  //           );
  //         }
  //       }

  //       setCharacteristics(discoveredServices);
  //       return { device, services: discoveredServices };
  //     } catch (err) {
  //       setError(err.message);
  //       return null;
  //     }
  //   },
  //   [services, connectedDevice]
  // );

  // Disconnect from device
  const disconnect = useCallback(async () => {
    if (connectedDevice && connectedDevice.gatt.connected) {
      await connectedDevice.gatt.disconnect();
      setConnectedDevice(null);
      setCharacteristics({});
    }
  }, [connectedDevice]);

  // Read characteristic value
  const readCharacteristic = useCallback(
    async (serviceId, characteristicId) => {
      try {
        const characteristic = characteristics[serviceId]?.[characteristicId];
        if (!characteristic) {
          throw new Error("Characteristic not found");
        }

        const value = await characteristic.readValue();
        return new DataView(value.buffer);
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [characteristics]
  );

  // Write to characteristic
  const writeCharacteristic = useCallback(
    async (serviceId, characteristicId, data) => {
      try {
        const characteristic = characteristics[serviceId]?.[characteristicId];
        if (!characteristic) {
          throw new Error("Characteristic not found");
        }

        await characteristic.writeValue(data);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    [characteristics]
  );

  // Subscribe to notifications
  const startNotifications = useCallback(
    async (serviceId, characteristicId, listener) => {
      try {
        const characteristic = characteristics[serviceId]?.[characteristicId];
        if (!characteristic) {
          throw new Error("Characteristic not found");
        }

        await characteristic.startNotifications();
        characteristic.addEventListener("characteristicvaluechanged", listener);

        return () => {
          characteristic.removeEventListener(
            "characteristicvaluechanged",
            listener
          );
          characteristic.stopNotifications().catch(console.error);
        };
      } catch (err) {
        setError(err.message);
        return null;
      }
    },
    [characteristics]
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (connectedDevice && connectedDevice.gatt.connected) {
        connectedDevice.gatt.disconnect();
      }
    };
  }, [connectedDevice]);

  return {
    isBluetoothAvailable,
    isScanning,
    devices,
    connectedDevice,
    error,
    startScan,
    connectToDevice,
    disconnect,
    readCharacteristic,
    writeCharacteristic,
    startNotifications,
  };
};
