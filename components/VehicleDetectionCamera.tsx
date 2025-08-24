import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import VehicleDetectionService, { DetectedVehicle, VehicleType } from '@/services/VehicleDetectionService';

interface VehicleDetectionCameraProps {
  onDetection?: (vehicles: DetectedVehicle[]) => void;
  isRecording?: boolean;
}

export default function VehicleDetectionCamera({ onDetection, isRecording = false }: VehicleDetectionCameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission] = MediaLibrary.usePermissions();
  const [isDetecting, setIsDetecting] = useState(false);
  const [lastDetection, setLastDetection] = useState<DetectedVehicle[]>([]);
  const [modelStatus, setModelStatus] = useState<'loading' | 'loaded' | 'fallback'>('loading');
  const cameraRef = useRef<CameraView>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializeService = async () => {
    try {
      setModelStatus('loading');
      await VehicleDetectionService.initialize();
      setModelStatus('loaded');
      console.log('Vehicle detection service initialized with real AI model');
    } catch (error) {
      console.error('Failed to initialize detection service:', error);
      setModelStatus('fallback');
      console.log('Using simulation mode');
    }
  };

  const startDetection = useCallback(() => {
    if (isDetecting) return;
    
    setIsDetecting(true);
    detectionIntervalRef.current = setInterval(async () => {
      try {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({
            base64: false,
            quality: 0.7,
          });
          
          const detections = await VehicleDetectionService.detectVehicles(photo.uri);
          setLastDetection(detections);
          onDetection?.(detections);
        }
      } catch (error) {
        console.error('Detection error:', error);
      }
    }, 2000); // Detect every 2 seconds
  }, [isDetecting, onDetection]);

  const stopDetection = useCallback(() => {
    setIsDetecting(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    initializeService();
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isDetecting) {
      startDetection();
    } else if (!isRecording && isDetecting) {
      stopDetection();
    }
  }, [isRecording, isDetecting, startDetection, stopDetection]);

  const capturePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 1.0,
      });

      if (mediaLibraryPermission?.status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }

      const detections = await VehicleDetectionService.detectVehicles(photo.uri);
      setLastDetection(detections);
      onDetection?.(detections);

      Alert.alert('Success', `Photo captured! Detected ${detections.length} vehicles`);
    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to capture photo');
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getVehicleTypeColor = (type: VehicleType): string => {
    switch (type) {
      case VehicleType.CAR: return '#4CAF50';
      case VehicleType.BUS: return '#FF9800';
      case VehicleType.TRUCK: return '#F44336';
      case VehicleType.MOTORCYCLE: return '#9C27B0';
      case VehicleType.BICYCLE: return '#2196F3';
      case VehicleType.VAN: return '#607D8B';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.overlay}>
          {/* Detection Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {isDetecting ? '🔴 Detecting...' : '⚫ Idle'}
            </Text>
            <Text style={styles.demoText}>
              {modelStatus === 'loading' && '⏳ Loading AI Model...'}
              {modelStatus === 'loaded' && '🤖 AI Model - Real Detection'}
              {modelStatus === 'fallback' && '📍 Demo Mode - Simulated Detections'}
            </Text>
            {lastDetection.length > 0 && (
              <Text style={styles.countText}>
                Last detection: {lastDetection.length} vehicles
              </Text>
            )}
          </View>

          {/* Detection Results */}
          {lastDetection.length > 0 && (
            <View style={styles.detectionResults}>
              {lastDetection.map((vehicle, index) => (
                <View key={vehicle.id} style={styles.detectionItem}>
                  <View 
                    style={[
                      styles.vehicleIndicator, 
                      { backgroundColor: getVehicleTypeColor(vehicle.type) }
                    ]} 
                  />
                  <Text style={styles.detectionText}>
                    {vehicle.type.toUpperCase()} ({Math.round(vehicle.confidence * 100)}%)
                  </Text>
                  {vehicle.licensePlate && (
                    <Text style={styles.plateText}>
                      📄 {vehicle.licensePlate}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Camera Controls */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.buttonText}>Flip</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={capturePhoto}>
              <Text style={styles.buttonText}>📷</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, isDetecting && styles.activeButton]}
              onPress={isDetecting ? stopDetection : startDetection}
            >
              <Text style={styles.buttonText}>
                {isDetecting ? 'Stop' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  statusContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  demoText: {
    color: '#FFD700',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  detectionResults: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    maxHeight: 200,
  },
  detectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  detectionText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  plateText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: '#FF4444',
  },
  captureButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});