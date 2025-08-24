# 📱 Vehicle Detector App - APK Build Instructions

This guide shows how to automatically build APK files using GitHub Actions.

## 🚀 Automatic APK Building with GitHub Actions

### Setup Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vehicle Detection App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/VehicleDetectorApp.git
   git push -u origin main
   ```

2. **GitHub Actions will automatically:**
   - ✅ Install all dependencies
   - ✅ Setup Android SDK and Java
   - ✅ Build the APK file
   - ✅ Create a new release with download link
   - ✅ Upload APK as artifact

3. **Download your APK:**
   - Go to **Actions** tab in your GitHub repo
   - Click on the latest workflow run
   - Download the **vehicle-detector-app** artifact
   - OR check **Releases** for the APK download

### Manual Trigger:
- Go to **Actions** → **Build APK** → **Run workflow**
- Builds automatically on every push to main/master

## 📁 What Gets Built:

- **APK Size**: ~20-30MB (includes AI model)
- **Package Name**: `com.certis.vehicledetectorapp`
- **Features**: Full AI vehicle detection, counting, license plate recognition
- **Permissions**: Camera, Storage (automatically handled)

## 🛠 Local Build Alternative:

If you prefer building locally:

```bash
# Install dependencies
npm install --legacy-peer-deps

# Generate native code
npx expo prebuild --platform android

# Build APK
cd android && ./gradlew assembleRelease
```

APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## 📋 Requirements:

- **GitHub Account** (free)
- **Android Device** for testing
- **Internet connection** (for AI model download)

## 🎯 App Features in APK:

- 🤖 **Real AI Detection**: Cars, buses, trucks, motorcycles, bicycles, vans
- 📊 **Live Counting**: Real-time vehicle statistics
- 📄 **License Plate Recognition**: OCR technology
- 📱 **Mobile Optimized**: Smooth performance on Android devices
- 💾 **Data Export**: JSON export functionality

---

**Technology**: React Native, Expo, TensorFlow.js, GitHub Actions