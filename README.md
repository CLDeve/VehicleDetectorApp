# Vehicle Detector App

An AI-powered vehicle detection and counting application built with React Native and Expo. This app can identify different types of vehicles (cars, buses, trucks, motorcycles, bicycles, vans) from camera input, count them in real-time, and extract license plate numbers.

## Features

### Vehicle Detection & Classification
- **Multi-class detection**: Cars, Buses, Trucks, Motorcycles, Bicycles, Vans
- **Real-time processing**: Live camera feed analysis
- **High accuracy**: AI-powered detection with confidence scores
- **Batch processing**: Single photo capture and analysis

### Analytics & Statistics
- **Live counting**: Real-time vehicle count by type
- **Historical tracking**: Store and review detection history
- **Data export**: Export detection data as JSON for analysis
- **Traffic analytics**: Detection rates and traffic flow insights

### License Plate Recognition
- **OCR technology**: Extract license plate numbers from detected vehicles
- **Multi-format support**: Various license plate formats
- **Vehicle linking**: Associate plates with detected vehicles

### User-Friendly Interface
- **Dual-tab layout**: Camera view and Statistics dashboard
- **Real-time feedback**: Live detection results overlay
- **Intuitive controls**: Simple start/stop detection
- **Dark/Light mode**: Adaptive UI themes

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VehicleDetectorApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**
   - **Android**: Press `a` or scan QR code with Expo Go
   - **iOS**: Press `i` or scan QR code with Expo Go  
   - **Web**: Press `w` to open in browser

## Usage

### Camera Tab
1. **Grant permissions**: Allow camera and media library access
2. **Start detection**: Tap "Start Detection" for continuous monitoring
3. **Capture photos**: Use camera button for single frame analysis
4. **View results**: Real-time detection overlay shows identified vehicles

### Statistics Tab
1. **Monitor counts**: View live vehicle counts by type
2. **Review history**: See recent detection results
3. **Export data**: Generate JSON reports for analysis
4. **Reset counters**: Clear statistics when needed

## Technical Architecture

### Core Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **TensorFlow.js**: Machine learning framework
- **YOLO-based detection**: Object detection model
- **TypeScript**: Type-safe development

### Key Components
- `VehicleDetectionService`: Core ML detection logic
- `VehicleDetectionCamera`: Camera interface and controls
- `VehicleStats`: Analytics and statistics display
- Custom UI components with themed styling

### AI/ML Features
- Object detection using TensorFlow.js
- Real-time image processing
- Vehicle classification algorithms
- License plate OCR recognition
- Confidence scoring and filtering

## Project Structure

```
VehicleDetectorApp/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx        # Main camera interface
│   │   └── explore.tsx      # App information
│   └── _layout.tsx          # Root layout
├── components/
│   ├── VehicleDetectionCamera.tsx  # Camera component
│   ├── VehicleStats.tsx            # Statistics display
│   └── ui/                         # Themed UI components
├── services/
│   └── VehicleDetectionService.ts  # Core detection logic
└── constants/
    └── Colors.ts                   # Theme colors
```

## Configuration

### Environment Setup
- Node.js 16+ required
- Expo CLI for development
- Android Studio/Xcode for device testing

### Permissions Required
- **Camera**: For vehicle detection
- **Media Library**: For photo storage
- **File System**: For data export

## Use Cases

- **Traffic monitoring**: Analyze traffic patterns and flow
- **Parking management**: Count and classify parked vehicles  
- **Security surveillance**: Monitor vehicle activity
- **Urban planning**: Gather traffic data for city planning
- **Smart city initiatives**: Integrate with IoT systems

## Development

- Version: 1.0.0
- Platform: Cross-platform (iOS, Android, Web)

## Future Enhancements

- Cloud-based model inference
- Video recording and analysis
- GPS location tracking
- Multi-camera support
- Advanced analytics dashboard
- API integration for external systems

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.
