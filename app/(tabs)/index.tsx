import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import VehicleDetectionCamera from '@/components/VehicleDetectionCamera';
import VehicleStats from '@/components/VehicleStats';
import { DetectedVehicle } from '@/services/VehicleDetectionService';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [currentView, setCurrentView] = useState<'camera' | 'stats'>('camera');
  const [detectedVehicles, setDetectedVehicles] = useState<DetectedVehicle[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleDetection = (vehicles: DetectedVehicle[]) => {
    setDetectedVehicles(prev => [...prev, ...vehicles]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      Alert.alert('Recording Started', 'Vehicle detection is now running continuously');
    } else {
      Alert.alert('Recording Stopped', 'Vehicle detection has been paused');
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Vehicle Detector</ThemedText>
        <ThemedText style={styles.subtitle}>
          AI-powered vehicle identification and counting
        </ThemedText>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentView === 'camera' && styles.activeTab]}
          onPress={() => setCurrentView('camera')}
        >
          <Text style={[styles.tabText, currentView === 'camera' && styles.activeTabText]}>
            📷 Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentView === 'stats' && styles.activeTab]}
          onPress={() => setCurrentView('stats')}
        >
          <Text style={[styles.tabText, currentView === 'stats' && styles.activeTabText]}>
            📊 Statistics
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {currentView === 'camera' ? (
          <>
            <VehicleDetectionCamera
              onDetection={handleDetection}
              isRecording={isRecording}
            />
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={[styles.recordButton, isRecording && styles.recordingButton]}
                onPress={toggleRecording}
              >
                <Text style={styles.recordButtonText}>
                  {isRecording ? '⏹️ Stop Detection' : '▶️ Start Detection'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <VehicleStats detectedVehicles={detectedVehicles} />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    margin: 10,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  recordingButton: {
    backgroundColor: '#FF5722',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
