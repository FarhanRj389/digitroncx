# 🔥 Firebase Environment Setup Guide

## Dashboard Data Not Showing? Follow These Steps:

### 1. Create Environment File
Create a `.env.local` file in your project root (same level as `package.json`)

### 2. Add Firebase Configuration
Copy and paste this into your `.env.local` file:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=digitroncx
```

### 3. Get Your Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create one)
3. Click the gear icon ⚙️ → "Project settings"
4. Scroll down to "Your apps" section
5. Click on your web app (or create one)
6. Copy the config values

### 4. Restart Your Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Test the Dashboard
1. Go to `/dashboard` page
2. Login with: `admin@digitroncx.com` / `digitroncx123!`
3. Click "Test Connection" button
4. Check the browser console for detailed logs

### 6. Common Issues & Solutions

#### ❌ "Firebase connection failed"
- Check if `.env.local` file exists
- Verify all Firebase variables are set
- Ensure no spaces around `=` in `.env.local`
- Restart your dev server

#### ❌ "Missing Firebase environment variables"
- Check browser console for missing variables
- Ensure all required variables are in `.env.local`

#### ❌ "No data found"
- Test connection first
- Check if forms are actually submitting
- Verify Firebase collections exist

### 7. Verify Collections Exist
In Firebase Console:
1. Go to Firestore Database
2. Check if these collections exist:
   - `contacts`
   - `demo_forms` 
   - `partnership_applications`

### 8. Test Form Submission
1. Submit a test form from your website
2. Check if it appears in Firebase
3. Refresh dashboard to see new data

### 9. Still Having Issues?
Check the browser console for detailed error messages and share them for further assistance.

---
**Note**: Never commit `.env.local` to git - it contains sensitive information!
