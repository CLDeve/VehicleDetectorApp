import { StyleSheet, ScrollView } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <IconSymbol size={80} name="car" color="#fff" />
        <ThemedText type="title" style={styles.title}>Vehicle Detector App</ThemedText>
        <ThemedText style={styles.subtitle}>AI-Powered Traffic Analysis</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <Collapsible title="🚗 Supported Vehicle Types">
          <ThemedText style={styles.text}>
            The app can detect and classify various vehicle types:
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• 🚗 Cars - Standard passenger vehicles</ThemedText>
          <ThemedText style={styles.bulletPoint}>• 🚌 Buses - Public transportation vehicles</ThemedText>
          <ThemedText style={styles.bulletPoint}>• 🚚 Trucks - Commercial and delivery vehicles</ThemedText>
          <ThemedText style={styles.bulletPoint}>• 🏍️ Motorcycles - Two-wheeled motor vehicles</ThemedText>
          <ThemedText style={styles.bulletPoint}>• 🚲 Bicycles - Pedal-powered vehicles</ThemedText>
          <ThemedText style={styles.bulletPoint}>• 🚐 Vans - Multi-purpose vehicles</ThemedText>
        </Collapsible>

        <Collapsible title="📊 Real-time Analytics">
          <ThemedText style={styles.text}>
            Get comprehensive traffic analysis with:
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• Live vehicle counting for each type</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Detection confidence scores</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Traffic flow statistics</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Historical data tracking</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Export functionality for reports</ThemedText>
        </Collapsible>

        <Collapsible title="📄 License Plate Recognition">
          <ThemedText style={styles.text}>
            Advanced OCR technology to:
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• Extract license plate numbers</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Link plates to detected vehicles</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Store plate data for analysis</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Support multiple plate formats</ThemedText>
        </Collapsible>

        <Collapsible title="📱 How to Use">
          <ThemedText style={styles.text}>
            <ThemedText type="defaultSemiBold">Camera Tab:</ThemedText>
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• Tap &quot;Start Detection&quot; for continuous monitoring</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Use the capture button for single frame analysis</ThemedText>
          <ThemedText style={styles.bulletPoint}>• View real-time detection results on screen</ThemedText>
          
          <ThemedText style={[styles.text, styles.marginTop]}>
            <ThemedText type="defaultSemiBold">Statistics Tab:</ThemedText>
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• Monitor vehicle counts by type</ThemedText>
          <ThemedText style={styles.bulletPoint}>• View recent detection history</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Export data for analysis</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Reset counters when needed</ThemedText>
        </Collapsible>

        <Collapsible title="⚙️ Technical Features">
          <ThemedText style={styles.text}>
            Built with modern AI technology:
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• TensorFlow.js for machine learning</ThemedText>
          <ThemedText style={styles.bulletPoint}>• YOLO-based object detection</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Real-time camera processing</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Cross-platform compatibility</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Offline processing capability</ThemedText>
        </Collapsible>

        <Collapsible title="🎯 Use Cases">
          <ThemedText style={styles.text}>
            Perfect for various applications:
          </ThemedText>
          <ThemedText style={styles.bulletPoint}>• Traffic monitoring and analysis</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Parking management systems</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Security and surveillance</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Urban planning research</ThemedText>
          <ThemedText style={styles.bulletPoint}>• Smart city initiatives</ThemedText>
        </Collapsible>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 15,
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '500',
  },
  version: {
    fontSize: 12,
    opacity: 0.7,
  },
});
