import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Circle,
  useColorModeValue,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";

const LampControl = ({ 
  isConnected = false, 
  lampState = false, 
  onToggleLamp, 
  isLoading = false 
}) => {
  const [selectedColor, setSelectedColor] = useState("red");
  
  // Color options for the lamp
  const colorOptions = [
    { name: "Red", value: "red", bg: "red.500", hoverBg: "red.600" },
    { name: "Green", value: "green", bg: "green.500", hoverBg: "green.600" },
    { name: "Blue", value: "blue", bg: "blue.500", hoverBg: "blue.600" },
  ];

  // Background colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Get current lamp color based on state and selection
  const getCurrentLampColor = () => {
    if (!lampState) return "gray.300"; // Off state
    const selectedColorConfig = colorOptions.find(c => c.value === selectedColor);
    return selectedColorConfig?.bg || "red.500";
  };

  const handleToggle = () => {
    if (onToggleLamp) {
      onToggleLamp(!lampState, selectedColor);
    }
  };

  return (
    <Box
      bg={bgColor}
      borderWidth="2px"
      borderColor={borderColor}
      borderRadius="xl"
      p={8}
      textAlign="center"
      boxShadow="lg"
    >
      <VStack spacing={6}>
        <VStack spacing={2}>
          <Heading size="lg" color="gray.700">
            Smart Lamp Control
          </Heading>
          <HStack>
            <Badge colorScheme={isConnected ? "green" : "red"} variant="solid">
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </HStack>
        </VStack>

        {/* Large Circular Lamp Indicator */}
        <VStack spacing={4}>
          <Tooltip 
            label={`Lamp is ${lampState ? 'ON' : 'OFF'}`} 
            fontSize="md"
          >
            <Circle
              size="120px"
              bg={getCurrentLampColor()}
              border="4px solid"
              borderColor={lampState ? "yellow.400" : "gray.400"}
              boxShadow={lampState ? "0 0 30px rgba(255, 255, 0, 0.5)" : "none"}
              transition="all 0.3s ease"
              cursor="pointer"
              _hover={{
                transform: lampState ? "scale(1.05)" : "scale(1.02)",
              }}
              onClick={handleToggle}
            >
              <Text 
                fontSize="2xl" 
                fontWeight="bold" 
                color={lampState ? "white" : "gray.600"}
                textShadow={lampState ? "1px 1px 2px rgba(0,0,0,0.5)" : "none"}
              >
                {lampState ? "ON" : "OFF"}
              </Text>
            </Circle>
          </Tooltip>

          <Text fontSize="sm" color="gray.500">
            Click the lamp to toggle
          </Text>
        </VStack>

        {/* Color Selection */}
        <VStack spacing={3}>
          <Text fontWeight="semibold" color="gray.600">
            Lamp Color
          </Text>
          <HStack spacing={3}>
            {colorOptions.map((color) => (
              <Tooltip key={color.value} label={color.name} fontSize="sm">
                <Circle
                  size="40px"
                  bg={color.bg}
                  border="3px solid"
                  borderColor={selectedColor === color.value ? "gray.800" : "transparent"}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "gray.600",
                    transform: "scale(1.1)",
                  }}
                  onClick={() => setSelectedColor(color.value)}
                />
              </Tooltip>
            ))}
          </HStack>
        </VStack>

        {/* Control Button */}
        <Button
          colorScheme={lampState ? "red" : "green"}
          size="lg"
          width="200px"
          height="50px"
          fontSize="lg"
          fontWeight="bold"
          onClick={handleToggle}
          isLoading={isLoading}
          loadingText={lampState ? "Turning OFF..." : "Turning ON..."}
          isDisabled={!isConnected}
          leftIcon={<span>{lampState ? "💡" : "🔌"}</span>}
        >
          Turn {lampState ? "OFF" : "ON"}
        </Button>

        {!isConnected && (
          <Text fontSize="sm" color="red.500" fontStyle="italic">
            Connect to ESP32 device to control the lamp
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default LampControl;