import { Box, Button, Heading, Text, VStack, useToast, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useBLE } from "../hooks/useBLE";

const BLEDeviceScanner = ({ onDeviceSelected, serviceUUIDs = [] }) => {
  const toast = useToast();
  const { isBluetoothAvailable, startScan, isScanning, error } = useBLE({
    services: serviceUUIDs,
  });

  const handleScan = async () => {
    console.log("Scan button clicked");
    console.log("Browser user agent:", navigator.userAgent);
    console.log("Is HTTPS?", location.protocol === 'https:');
    console.log("Is localhost?", location.hostname === 'localhost');
    console.log("Bluetooth available?", isBluetoothAvailable());
    console.log("Service UUIDs:", serviceUUIDs);
    
    if (!isBluetoothAvailable()) {
      toast({
        title: "Bluetooth not available",
        description:
          "Your browser doesn't support Web Bluetooth or it's disabled. Please use Chrome, Edge, or Opera on HTTPS.",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
      return;
    }

    const device = await startScan();
    if (device) {
      toast({
        title: "Device found",
        description: `Found device: ${device.name || "Unknown device"}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeviceSelected(device);
    } else if (error) {
      toast({
        title: "Scan failed",
        description: error,
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      bg="white"
      boxShadow="sm"
    >
      <VStack spacing={4} align="flex-start">
        <Heading size="md">Connect to ESP32 Device</Heading>
        
        {/* Troubleshooting Alert */}
        {!isBluetoothAvailable() && (
          <Alert status="warning" size="sm">
            <AlertIcon />
            <Box>
              <AlertTitle fontSize="sm">Web Bluetooth Not Available!</AlertTitle>
              <AlertDescription fontSize="xs">
                Please use Chrome, Edge, or Opera browser on HTTPS or localhost.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Button
          colorScheme="blue"
          onClick={handleScan}
          isLoading={isScanning}
          loadingText="Scanning..."
          w="full"
          isDisabled={!isBluetoothAvailable()}
        >
          Scan for ESP32 Devices
        </Button>

        {error && (
          <Text color="red.500" fontSize="sm">
            <strong>Error:</strong> {error}
          </Text>
        )}
        
        {/* Debug information */}
        <Box fontSize="xs" color="gray.500" mt={2}>
          <Text>Debug info:</Text>
          <Text>• Browser: {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Edge') ? 'Edge' : 'Other'}</Text>
          <Text>• Protocol: {location.protocol}</Text>
          <Text>• Web Bluetooth: {navigator.bluetooth ? '✅ Available' : '❌ Not Available'}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default BLEDeviceScanner;
