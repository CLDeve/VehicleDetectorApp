import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import VehicleDetectionService, { VehicleCount, VehicleType, DetectedVehicle } from '@/services/VehicleDetectionService';

interface VehicleStatsProps {
  detectedVehicles: DetectedVehicle[];
}

export default function VehicleStats({ detectedVehicles }: VehicleStatsProps) {
  const [vehicleCount, setVehicleCount] = useState<VehicleCount>(VehicleDetectionService.getVehicleCount());
  const [recentDetections, setRecentDetections] = useState<DetectedVehicle[]>([]);

  useEffect(() => {
    updateStats();
  }, [detectedVehicles]);

  const updateStats = () => {
    setVehicleCount(VehicleDetectionService.getVehicleCount());
    setRecentDetections(VehicleDetectionService.getDetectedVehicles().slice(-10));
  };

  const resetStats = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all vehicle counts and detection history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            VehicleDetectionService.resetCounts();
            updateStats();
          },
        },
      ]
    );
  };

  const exportData = async () => {
    try {
      const data = VehicleDetectionService.exportDetectionData();
      const fileName = `vehicle_detection_${new Date().toISOString().split('T')[0]}.json`;
      const fileUri = FileSystem.documentDirectory + fileName;
      
      await FileSystem.writeAsStringAsync(fileUri, data);
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export Vehicle Detection Data',
        });
      } else {
        Alert.alert('Export Complete', `Data saved to: ${fileName}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Export Failed', 'Unable to export data');
    }
  };

  const getVehicleIcon = (type: VehicleType): string => {
    switch (type) {
      case VehicleType.CAR: return '🚗';
      case VehicleType.BUS: return '🚌';
      case VehicleType.TRUCK: return '🚚';
      case VehicleType.MOTORCYCLE: return '🏍️';
      case VehicleType.BICYCLE: return '🚲';
      case VehicleType.VAN: return '🚐';
      default: return '🚙';
    }
  };

  const getVehicleColor = (type: VehicleType): string => {
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

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Vehicle Detection Summary</Text>
        <View style={styles.totalCountContainer}>
          <Text style={styles.totalCountLabel}>Total Vehicles Detected</Text>
          <Text style={styles.totalCount}>{vehicleCount.total}</Text>
        </View>
      </View>

      {/* Vehicle Type Breakdown */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Vehicle Types</Text>
        {Object.values(VehicleType)
          .filter(type => type !== VehicleType.UNKNOWN)
          .map(type => (
            <View key={type} style={styles.statRow}>
              <View style={styles.statLeft}>
                <Text style={styles.vehicleIcon}>{getVehicleIcon(type)}</Text>
                <Text style={styles.vehicleType}>{type.toUpperCase()}</Text>
              </View>
              <View style={[styles.countBadge, { backgroundColor: getVehicleColor(type) }]}>
                <Text style={styles.countText}>{vehicleCount[type]}</Text>
              </View>
            </View>
          ))}
      </View>

      {/* Recent Detections */}
      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Detections</Text>
        {recentDetections.length === 0 ? (
          <Text style={styles.emptyText}>No recent detections</Text>
        ) : (
          recentDetections.map((detection, index) => (
            <View key={detection.id} style={styles.detectionRow}>
              <Text style={styles.detectionIcon}>{getVehicleIcon(detection.type)}</Text>
              <View style={styles.detectionInfo}>
                <Text style={styles.detectionType}>
                  {detection.type.toUpperCase()}
                </Text>
                <Text style={styles.detectionDetails}>
                  Confidence: {Math.round(detection.confidence * 100)}%
                </Text>
                {detection.licensePlate && (
                  <Text style={styles.licensePlate}>
                    📄 {detection.licensePlate}
                  </Text>
                )}
              </View>
              <Text style={styles.detectionTime}>
                {formatTime(detection.timestamp)}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.exportButton} onPress={exportData}>
          <Text style={styles.buttonText}>📊 Export Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={resetStats}>
          <Text style={styles.buttonText}>🔄 Reset Stats</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics Breakdown */}
      <View style={styles.analyticsContainer}>
        <Text style={styles.sectionTitle}>Analytics</Text>
        
        {vehicleCount.total > 0 && (
          <>
            <View style={styles.analyticsRow}>
              <Text style={styles.analyticsLabel}>Most Common Vehicle:</Text>
              <Text style={styles.analyticsValue}>
                {Object.entries(vehicleCount)
                  .filter(([key]) => key !== 'total' && key !== VehicleType.UNKNOWN)
                  .sort(([,a], [,b]) => b - a)[0]?.[0]?.toUpperCase() || 'N/A'}
              </Text>
            </View>
            
            <View style={styles.analyticsRow}>
              <Text style={styles.analyticsLabel}>Detection Rate:</Text>
              <Text style={styles.analyticsValue}>
                {recentDetections.length > 0 
                  ? `${(recentDetections.length / Math.max(1, Math.ceil((Date.now() - recentDetections[0].timestamp.getTime()) / 60000))).toFixed(1)} per minute`
                  : 'N/A'
                }
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  totalCountContainer: {
    alignItems: 'center',
  },
  totalCountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  totalCount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  vehicleType: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  countBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
    fontStyle: 'italic',
  },
  detectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detectionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  detectionInfo: {
    flex: 1,
  },
  detectionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detectionDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  licensePlate: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 2,
  },
  detectionTime: {
    fontSize: 12,
    color: '#999',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    gap: 10,
  },
  exportButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  analyticsContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  analyticsLabel: {
    fontSize: 14,
    color: '#666',
  },
  analyticsValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});