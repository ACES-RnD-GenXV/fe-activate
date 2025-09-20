# Smart Lamp IoT Controller 💡

A simple yet educational IoT web application that allows you to control a physical LED lamp through Bluetooth Low Energy (BLE) communication with an ESP32 microcontroller. Perfect for learning IoT fundamentals!

## 🌟 Features

- **Simple Lamp Control**: Turn your LED lamp ON/OFF with a single click
- **Real-time BLE Communication**: Direct communication with ESP32 via Web Bluetooth API
- **Visual Feedback**: Large circular lamp indicator with customizable colors (Red, Green, Blue)
- **Educational Content**: Interactive accordion-style learning materials about IoT, BLE, and ESP32
- **Modern UI**: Clean, responsive interface built with Chakra UI
- **Connection Management**: Easy ESP32 device discovery and connection

## 🎯 Learning Objectives

This project helps students understand:
- **IoT Fundamentals**: What IoT is and how devices communicate
- **Bluetooth Low Energy (BLE)**: Wireless communication for low-power devices
- **ESP32 Microcontroller**: Hardware platform for IoT projects
- **Web-to-Hardware Communication**: How web applications can control physical devices
- **Real-world Applications**: Examples of IoT in various industries

## 🚀 Getting Started

### Prerequisites

- **ESP32 Development Board** with BLE capability
- **LED** and appropriate resistor
- **Web browser** with Web Bluetooth support (Chrome, Edge, Opera)
- **Node.js/Bun** for development

### Hardware Setup

1. Connect an LED to your ESP32 (typically to GPIO pin with appropriate resistor)
2. Upload the smart lamp firmware to your ESP32 with these BLE characteristics:
   - **Service UUID**: `4869e6e5-dec6-4a9d-a0a4-eda6b5448b97`
   - **Control Characteristic UUID**: `05c4d03a-ac78-4627-8778-f23fab166ba8`
3. Ensure the ESP32 can receive "1" (ON) and "0" (OFF) commands

### Software Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd fe-activate
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**:
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🔧 Usage

### Connecting Your ESP32

1. Power on your ESP32 with the smart lamp firmware
2. In the web app, go to the **Lamp Control** tab
3. Click **"Scan for ESP32 Devices"** in the Device Connection section
4. Select your ESP32 from the discovered devices
5. Wait for the connection to establish

### Controlling the Lamp

1. Once connected, use the large circular lamp indicator to control your LED
2. **Click the circle** or use the **"Turn ON/OFF"** button
3. **Select different colors** using the color picker (Red, Green, Blue)
4. Watch the real-time status updates and connection information

### Learning About IoT

1. Switch to the **"Learn IoT"** tab
2. Explore the interactive accordion sections covering:
   - What is IoT?
   - Bluetooth Low Energy (BLE)
   - ESP32 Microcontroller
   - Communication Protocols
   - Real-world Applications

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LampControl.jsx          # Main lamp control interface
│   ├── IoTEducation.jsx         # Educational content component
│   ├── DeviceConnection.jsx     # BLE device connection management
│   ├── BLEDeviceManager.jsx     # BLE device manager (reused)
│   ├── BLEDeviceScanner.jsx     # BLE device scanner (reused)
│   └── index.js                 # Component exports
├── hooks/
│   └── useBLE.js               # BLE communication hook (reused)
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── theme.js                    # Chakra UI theme configuration
```

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **Chakra UI** - Component library and styling
- **Web Bluetooth API** - Browser-based BLE communication
- **Vite** - Build tool and development server
- **JavaScript/JSX** - Programming language

## 🎓 Educational Use

This project is specifically designed for educational purposes and is perfect for:

- **IoT Workshops** - Hands-on learning experience
- **Computer Science Students** - Understanding hardware-software integration
- **Engineering Courses** - Practical application of communication protocols
- **Maker Spaces** - Simple project for beginners
- **STEM Education** - Interactive learning about modern technology

## 🔍 How It Works

1. **Web Application**: Provides user interface for lamp control
2. **Web Bluetooth API**: Establishes connection with ESP32
3. **BLE Communication**: Sends commands ("1" or "0") to ESP32
4. **ESP32 Processing**: Receives commands and controls LED
5. **Physical Output**: LED turns ON/OFF based on web commands

## 🌐 Browser Support

Web Bluetooth is supported in:
- ✅ Chrome (Desktop & Mobile)
- ✅ Edge (Chromium-based)
- ✅ Opera
- ❌ Firefox (not supported)
- ❌ Safari (not supported)

## 🤝 Contributing

This project is designed for educational use. Feel free to:
- Add new features (brightness control, color changing, etc.)
- Improve the educational content
- Enhance the user interface
- Add more IoT examples

## 📚 Additional Resources

- [Web Bluetooth API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [IoT Learning Resources](https://www.edx.org/learn/internet-of-things-iot)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for IoT Education at University of Minnesota & ACES**

*Perfect for teaching the next generation about IoT and smart device development!* 🚀
