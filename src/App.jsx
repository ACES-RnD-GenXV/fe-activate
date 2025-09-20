import { useState, useCallback } from "react";
import {
  Stack,
  Heading,
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  LampControl,
  IoTEducation,
  DeviceConnection,
} from "./components";

// ESP32 BLE UUIDs
const ESP_SERVICE_UUID_OUTPUT = "4869e6e5-dec6-4a9d-a0a4-eda6b5448b97";
const OUTPUT_CONTROL_CHAR_UUID = "05c4d03a-ac78-4627-8778-f23fab166ba8";

function App() {
  // Device state
  const [outputDevice, setOutputDevice] = useState(null);
  const [connectedOutputDevice, setConnectedOutputDevice] = useState(null);
  const [serviceData, setServiceData] = useState({});

  // Lamp state
  const [lampState, setLampState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Background color
  const bgColor = useColorModeValue("gray.50", "gray.900");

  // Send output state to ESP32
  const sendOutputToESP = useCallback(
    async (state) => {
      if (!serviceData[ESP_SERVICE_UUID_OUTPUT]?.[OUTPUT_CONTROL_CHAR_UUID]) {
        console.log("Output characteristic not available");
        return false;
      }

      try {
        const outputChar = serviceData[ESP_SERVICE_UUID_OUTPUT][OUTPUT_CONTROL_CHAR_UUID];
        const te = new TextEncoder();
        
        // Send 1 for ON, 0 for OFF
        const command = state ? "1" : "0";
        await outputChar.writeValue(te.encode(command));
        
        console.log(`Sent command: ${command} (${state ? 'ON' : 'OFF'})`);
        return true;
      } catch (error) {
        console.error("Error sending command to ESP32:", error);
        return false;
      }
    },
    [serviceData]
  );

  // Handle lamp toggle
  const handleToggleLamp = useCallback(
    async (newState, color) => {
      if (!connectedOutputDevice) {
        console.log("No device connected");
        return;
      }

      setIsLoading(true);
      
      try {
        const success = await sendOutputToESP(newState, color);
        if (success) {
          setLampState(newState);
        }
      } catch (error) {
        console.error("Error toggling lamp:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [connectedOutputDevice, sendOutputToESP]
  );

  // Handle device connection
  const handleDeviceConnected = useCallback((device) => {
    setConnectedOutputDevice(device);
    console.log("Device connected:", device);
  }, []);

  // Handle device disconnection
  const handleDeviceDisconnected = useCallback(() => {
    setConnectedOutputDevice(null);
    setLampState(false); // Reset lamp state when disconnected
    console.log("Device disconnected");
  }, []);

  // Handle services discovered
  const handleServicesDiscovered = useCallback((services) => {
    setServiceData((prev) => ({ ...prev, ...services }));
    console.log("Services discovered:", services);
  }, []);

  return (
    <Stack bg={bgColor} overflow={"hidden"} align="center" justify={"center"} w={"full"} h={"full"} minH={"100vh"}>
      <Stack py={8} w={"full"} boxShadow="md" px={4}>
        <Stack align="center">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <HStack spacing={4}>
              <Image src="/umn.png" alt="UMN Logo" boxSize="60px" objectFit="contain" />
              <Image src="/LogoACES.png" alt="ACES Logo" boxSize="60px" objectFit="contain" />
            </HStack>
            
            <VStack spacing={2}>
              <Heading as="h1" size="2xl" color="blue.600">
                Smart Lamp IoT Controller
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Learn IoT fundamentals by controlling a real LED lamp through Bluetooth Low Energy communication with ESP32
              </Text>
            </VStack>
          </VStack>

          {/* Main Content */}
          <Box w="full">
            <Tabs isFitted variant="enclosed" colorScheme="blue">
              <TabList mb={4}>
                <Tab>
                  <HStack spacing={2}>
                    <span>💡</span>
                    <Text>Lamp Control</Text>
                  </HStack>
                </Tab>
                <Tab>
                  <HStack spacing={2}>
                    <span>📚</span>
                    <Text>Learn IoT</Text>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels>
                {/* Lamp Control Tab */}
                <TabPanel>
                  <VStack spacing={8} align="stretch">
                    {/* Device Connection Section */}
                    <Box>
                      <DeviceConnection
                        device={outputDevice}
                        onDeviceSelected={setOutputDevice}
                        onConnected={handleDeviceConnected}
                        onDisconnected={handleDeviceDisconnected}
                        onServicesDiscovered={handleServicesDiscovered}
                      />
                    </Box>

                    {/* Lamp Control Section */}
                    <Box>
                      <LampControl
                        isConnected={!!connectedOutputDevice}
                        lampState={lampState}
                        onToggleLamp={handleToggleLamp}
                        isLoading={isLoading}
                      />
                    </Box>

                    {/* Status Information */}
                    {connectedOutputDevice && (
                      <Box bg="green.50" p={4} borderRadius="lg" borderLeft="4px solid" borderLeftColor="green.400">
                        <HStack spacing={4}>
                          <Box>
                            <Text fontWeight="bold" color="green.700">
                              ✅ Connected to: {connectedOutputDevice.name || "ESP32 Device"}
                            </Text>
                            <Text fontSize="sm" color="green.600">
                              Lamp Status: {lampState ? "ON 💡" : "OFF 🔌"}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>

                {/* Education Tab */}
                <TabPanel>
                  <IoTEducation />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;