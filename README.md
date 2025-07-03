# DigitronCX Website

## Firebase Integration Setup

This project uses Firebase for authentication, Firestore database, and file storage. Follow these steps to set up and run the project:

### 1. Install Dependencies

```
npm install
```

### 2. Firebase Project Setup
- Go to [Firebase Console](https://console.firebase.google.com/).
- Create a project named `digitioncx` (if not already created).
- Register a web app and copy the config values.

### 3. Environment Variables
Create a `.env.local` file in the project root with the following content:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=digitioncx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

Replace the values with your Firebase project credentials.

### 4. Firestore & Storage Security Rules
Set your Firestore and Storage rules to production mode (authenticated users only):

**Firestore:**
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Storage:**
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Run the Project

```
npm run dev
```

### 6. Features
- Admin and client dashboards are fully connected to Firebase.
- All data and file storage is handled via Firestore and Firebase Storage.
- Authentication uses Firebase Auth.

### 7. Troubleshooting
- Ensure your `.env.local` is present and correct.
- If you see TypeScript errors about missing Firebase types, run:
  ```
  npm install --save-dev @types/firebase
  ```
- If you see errors about missing modules, run:
  ```
  npm install firebase
  ```

---

For further customization or help, contact the development team. 