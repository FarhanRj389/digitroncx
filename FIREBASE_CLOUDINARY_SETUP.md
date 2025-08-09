# Firebase and Cloudinary Setup Guide

## Prerequisites
- Node.js and npm installed
- Firebase account
- Cloudinary account

## Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `digitroncx-dashboards`
4. Follow the setup wizard
5. Enable Google Analytics (optional)

### 1.2 Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to your users)
5. Click "Done"

### 1.3 Enable Storage
1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode" (for development)
4. Select a location
5. Click "Done"

### 1.4 Get Firebase Configuration
1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and choose "Web"
4. Register app with name: `digitroncx-web`
5. Copy the configuration object

### 1.5 Update Environment Variables
Create a `.env.local` file in your project root and add:

```env
# Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyDjzOLT857-GUtx2c3ajPWHeztT4f5XGwo",
  authDomain: "digitroncx-dashboards-3b8dd.firebaseapp.com",
  projectId: "digitroncx-dashboards-3b8dd",
  storageBucket: "digitroncx-dashboards-3b8dd.firebasestorage.app",
  messagingSenderId: "935961008167",
  appId: "1:935961008167:web:2ee2e053984af2543dd602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

## Step 2: Cloudinary Setup

### 2.1 Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

### 2.2 Get Cloudinary Credentials
1. Login to Cloudinary Dashboard
2. Go to "Dashboard" tab
3. Copy your:
   - Cloud name
   - API Key
   - API Secret

### 2.3 Create Upload Preset
1. In Cloudinary Dashboard, go to "Settings" > "Upload"
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Set preset name: `digitroncx`
5. Set signing mode: "Unsigned"
6. Save the preset

### 2.4 Update Environment Variables
Add to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=digitroncx
```

## Step 3: Firebase Security Rules

### 3.1 Firestore Rules
Create `firestore.rules` in your Firebase project:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3.2 Storage Rules
Create `storage.rules` in your Firebase project:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## Step 4: Deploy Rules

### 4.1 Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 4.2 Login to Firebase
```bash
firebase login
```

### 4.3 Initialize Firebase
```bash
firebase init
```
- Select Firestore and Storage
- Choose your project: `digitroncx-dashboards`
- Accept defaults for rules files

### 4.4 Deploy Rules
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## Step 5: Test the Setup

### 5.1 Test Contact Form
1. Start your development server: `npm run dev`
2. Go to contact page
3. Fill and submit the form
4. Check Firebase Console > Firestore Database for the new document

### 5.2 Test Demo Form
1. Go to demo page
2. Fill and submit the form
3. Check Firebase Console for the new document
4. Check Cloudinary for uploaded files

### 5.3 Test Partnership Form
1. Go to partnership page
2. Fill and submit the form
3. Check Firebase Console for the new document

## Step 6: Dashboard Access

### 6.1 Access Dashboard
1. Go to `/dashboard` in your app
2. Login with:
   - Username: `admin@digitroncx.com`
   - Password: `digitroncx123!`

### 6.2 View Data
- Contacts: View all contact form submissions
- Demo Forms: View all demo form submissions
- Partnership Applications: View all partnership applications

## Troubleshooting

### Common Issues

1. **Firebase connection error**
   - Check if environment variables are correct
   - Ensure Firebase project is created and configured

2. **Cloudinary upload error**
   - Verify upload preset is created
   - Check if API credentials are correct

3. **Form submission error**
   - Check browser console for errors
   - Verify Firebase rules are deployed

4. **Dashboard not loading data**
   - Check if Firebase rules allow read access
   - Verify collection names match

### Support
If you encounter issues:
1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure Firebase and Cloudinary services are enabled
4. Check Firebase Console for any error messages
