import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  List,
  ListItem,
  Code,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const IoTEducation = () => {
  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" color="blue.600" mb={2}>
            Learn About IoT & Smart Devices
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Understanding how your smart lamp works
          </Text>
        </Box>

        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>What you're building:</AlertTitle>
            <AlertDescription>
              A web application that controls a physical LED light through Bluetooth Low Energy (BLE) communication with an ESP32 microcontroller.
            </AlertDescription>
          </Box>
        </Alert>

        <Accordion allowMultiple defaultIndex={[0]}>
          {/* What is IoT */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "blue.50", color: "blue.700" }}>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Heading size="md">🌐 What is IoT?</Heading>
                    <Badge colorScheme="blue" variant="subtle">Beginner</Badge>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text>
                  <strong>Internet of Things (IoT)</strong> refers to the network of physical devices that are connected to the internet and can communicate with each other.
                </Text>
                
                <Box bg="gray.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={2}>Common IoT Examples:</Heading>
                  <List spacing={2}>
                    <ListItem>
                      <Text as="span" color="green.500" fontWeight="bold" mr={2}>✅</Text>
                      Smart light bulbs (like Philips Hue)
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="green.500" fontWeight="bold" mr={2}>✅</Text>
                      Smart thermostats (like Nest)
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="green.500" fontWeight="bold" mr={2}>✅</Text>
                      Smart speakers (like Amazon Alexa)
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="green.500" fontWeight="bold" mr={2}>✅</Text>
                      Fitness trackers and smartwatches
                    </ListItem>
                  </List>
                </Box>

                <Text fontSize="sm" color="gray.600" fontStyle="italic">
                  Your smart lamp is a simple IoT device that you can control remotely!
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* How BLE Works */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "purple.50", color: "purple.700" }}>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Heading size="md">📡 Bluetooth Low Energy (BLE)</Heading>
                    <Badge colorScheme="purple" variant="subtle">Intermediate</Badge>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text>
                  <strong>Bluetooth Low Energy (BLE)</strong> is a wireless communication technology designed for devices that need to send small amounts of data while consuming very little power.
                </Text>

                <Box bg="purple.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={3}>How it works in your lamp:</Heading>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Badge colorScheme="blue">1</Badge>
                      <Text fontSize="sm">Your web browser connects to the ESP32 via BLE</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="blue">2</Badge>
                      <Text fontSize="sm">You click the lamp button on the website</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="blue">3</Badge>
                      <Text fontSize="sm">Browser sends "1" (ON) or "0" (OFF) to ESP32</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="blue">4</Badge>
                      <Text fontSize="sm">ESP32 receives the command and controls the LED</Text>
                    </HStack>
                  </VStack>
                </Box>

                <Alert status="warning" size="sm">
                  <AlertIcon />
                  <Text fontSize="sm">
                    BLE has a limited range (usually 10-50 meters) and requires the device to be nearby.
                  </Text>
                </Alert>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* ESP32 Microcontroller */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "green.50", color: "green.700" }}>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Heading size="md">🔧 ESP32 Microcontroller</Heading>
                    <Badge colorScheme="green" variant="subtle">Technical</Badge>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text>
                  The <strong>ESP32</strong> is a powerful, low-cost microcontroller with built-in Wi-Fi and Bluetooth capabilities, making it perfect for IoT projects.
                </Text>

                <Box bg="green.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={2}>What makes ESP32 great for IoT:</Heading>
                  <List spacing={2}>
                    <ListItem>
                      <Text as="span" color="blue.500" fontWeight="bold" mr={2}>ℹ️</Text>
                      <strong>Dual-core processor:</strong> Can handle multiple tasks
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="blue.500" fontWeight="bold" mr={2}>ℹ️</Text>
                      <strong>Built-in connectivity:</strong> Wi-Fi and Bluetooth
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="blue.500" fontWeight="bold" mr={2}>ℹ️</Text>
                      <strong>Low power consumption:</strong> Great for battery projects
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="blue.500" fontWeight="bold" mr={2}>ℹ️</Text>
                      <strong>Many GPIO pins:</strong> Connect sensors, LEDs, motors
                    </ListItem>
                  </List>
                </Box>

                <Divider />

                <Box>
                  <Heading size="sm" mb={2}>In your lamp project:</Heading>
                  <Text fontSize="sm">
                    The ESP32 acts as a bridge between your web application and the physical LED. 
                    It listens for BLE commands and translates them into electrical signals to control the light.
                  </Text>
                </Box>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Communication Protocol */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "orange.50", color: "orange.700" }}>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Heading size="md">💬 Communication Protocol</Heading>
                    <Badge colorScheme="orange" variant="subtle">Advanced</Badge>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text>
                  Understanding how your web app communicates with the ESP32 through BLE services and characteristics.
                </Text>

                <Box bg="orange.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={3}>BLE Structure:</Heading>
                  <VStack align="start" spacing={3}>
                    <Box>
                      <Text fontWeight="bold">Service:</Text>
                      <Code fontSize="xs">4869e6e5-dec6-4a9d-a0a4-eda6b5448b97</Code>
                      <Text fontSize="sm" color="gray.600">A collection of related functions</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Characteristic:</Text>
                      <Code fontSize="xs">05c4d03a-ac78-4627-8778-f23fab166ba8</Code>
                      <Text fontSize="sm" color="gray.600">Specific data point you can read/write</Text>
                    </Box>
                  </VStack>
                </Box>

                <Box bg="gray.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={2}>Data Format:</Heading>
                  <HStack spacing={4}>
                    <Badge colorScheme="green">1</Badge>
                    <Text fontSize="sm">Turn LED ON</Text>
                  </HStack>
                  <HStack spacing={4}>
                    <Badge colorScheme="red">0</Badge>
                    <Text fontSize="sm">Turn LED OFF</Text>
                  </HStack>
                </Box>

                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Text fontSize="sm">
                    This simple protocol makes it easy to extend your project with more features like brightness control or color changing!
                  </Text>
                </Alert>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Real-world Applications */}
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "teal.50", color: "teal.700" }}>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Heading size="md">🚀 Real-world Applications</Heading>
                    <Badge colorScheme="teal" variant="subtle">Inspiring</Badge>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text>
                  Now that you understand the basics, here are some amazing real-world applications of IoT technology:
                </Text>

                <Box bg="teal.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={3}>Industry Applications:</Heading>
                  <List spacing={2}>
                    <ListItem>
                      <Text as="span" color="teal.500" fontWeight="bold" mr={2}>✅</Text>
                      <strong>Smart Cities:</strong> Traffic management, waste management, air quality monitoring
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="teal.500" fontWeight="bold" mr={2}>✅</Text>
                      <strong>Healthcare:</strong> Remote patient monitoring, smart pills, medical equipment tracking
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="teal.500" fontWeight="bold" mr={2}>✅</Text>
                      <strong>Agriculture:</strong> Soil moisture sensors, automated irrigation, livestock tracking
                    </ListItem>
                    <ListItem>
                      <Text as="span" color="teal.500" fontWeight="bold" mr={2}>✅</Text>
                      <strong>Manufacturing:</strong> Predictive maintenance, supply chain optimization, quality control
                    </ListItem>
                  </List>
                </Box>

                <Box bg="blue.50" p={4} borderRadius="md" w="full">
                  <Heading size="sm" mb={2}>Your Next Steps:</Heading>
                  <Text fontSize="sm">
                    With the knowledge from this simple lamp project, you could build:
                  </Text>
                  <List spacing={1} mt={2}>
                    <ListItem fontSize="sm">• Smart home automation system</ListItem>
                    <ListItem fontSize="sm">• Environmental monitoring station</ListItem>
                    <ListItem fontSize="sm">• Security and alert systems</ListItem>
                    <ListItem fontSize="sm">• Health and fitness trackers</ListItem>
                  </List>
                </Box>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default IoTEducation;