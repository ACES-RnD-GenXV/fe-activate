import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  Progress,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useState } from "react";
import { BLEDeviceScanner, BLEDeviceManager } from "./";

const DeviceConnection = ({ 
  device, 
  onDeviceSelected, 
  onConnected, 
  onDisconnected, 
  onServicesDiscovered 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState(0);
  const toast = useToast();

  // ESP32 Output Service UUID
  const ESP_SERVICE_UUID_OUTPUT = "4869e6e5-dec6-4a9d-a0a4-eda6b5448b97";

  const connectionSteps = [
    "Click 'Connect ESP32' to start",
    "Select your ESP32 device from the list",
    "Establishing BLE connection...",
    "Discovering services...",
    "Connected! Ready to control lamp"
  ];

  const handleDeviceSelected = (selectedDevice) => {
    setConnectionStep(2);
    setIsConnecting(true);
    onDeviceSelected(selectedDevice);
  };

  const handleConnected = (connectedDevice) => {
    setConnectionStep(4);
    setIsConnecting(false);
    onConnected(connectedDevice);
    
    toast({
      title: "Device Connected!",
      description: "Your ESP32 is ready to control the smart lamp",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDisconnected = () => {
    setConnectionStep(0);
    setIsConnecting(false);
    onDisconnected();
    
    toast({
      title: "Device Disconnected",
      description: "ESP32 device has been disconnected",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleServicesDiscovered = (services) => {
    setConnectionStep(5);
    onServicesDiscovered(services);
  };

  if (device) {
    return (
      <Card>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Heading size="md" color="green.600">
                ESP32 Smart Lamp Controller
              </Heading>
              <Badge colorScheme="green" variant="solid">
                Device Found
              </Badge>
            </HStack>

            <BLEDeviceManager
              device={device}
              serviceUUIDs={[ESP_SERVICE_UUID_OUTPUT]}
              onConnected={handleConnected}
              onDisconnected={handleDisconnected}
              onServicesDiscovered={handleServicesDiscovered}
            />

            {connectionStep > 0 && (
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Connection Progress:
                </Text>
                <Progress 
                  value={(connectionStep / (connectionSteps.length - 1)) * 100} 
                  colorScheme="green" 
                  size="sm" 
                  borderRadius="md"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {connectionSteps[connectionStep]}
                </Text>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <VStack spacing={2} textAlign="center">
            <Heading size="lg" color="blue.600">
              Connect Your ESP32 Device
            </Heading>
            <Text color="gray.600">
              First, connect to your ESP32 smart lamp controller via Bluetooth
            </Text>
          </VStack>

          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <AlertDescription fontSize="sm">
              Make sure your ESP32 device is powered on and running the smart lamp firmware. 
              The device should be discoverable via Bluetooth.
            </AlertDescription>
          </Alert>

          <VStack spacing={4}>
            <Box bg="gray.50" p={4} borderRadius="md" w="full">
              <Heading size="sm" mb={2} color="gray.700">
                Before connecting:
              </Heading>
              <VStack align="start" spacing={1} fontSize="sm" color="gray.600">
                <Text>✅ ESP32 is powered on</Text>
                <Text>✅ Smart lamp firmware is uploaded</Text>
                <Text>✅ Device is within Bluetooth range (10m)</Text>
                <Text>✅ Browser supports Web Bluetooth</Text>
              </VStack>
            </Box>

            <BLEDeviceScanner
              onDeviceSelected={handleDeviceSelected}
              serviceUUIDs={[ESP_SERVICE_UUID_OUTPUT]}
            />

            {connectionStep > 0 && connectionStep < 4 && (
              <Box w="full">
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Connection Progress:
                </Text>
                <Progress 
                  value={(connectionStep / (connectionSteps.length - 1)) * 100} 
                  colorScheme="blue" 
                  size="md" 
                  borderRadius="md"
                  isIndeterminate={isConnecting}
                />
                <Text fontSize="xs" color="gray.500" mt={1} textAlign="center">
                  {connectionSteps[connectionStep]}
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default DeviceConnection;