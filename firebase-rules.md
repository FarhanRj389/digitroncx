# Firebase Security Rules

## Firestore Database Rules (Production Ready)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Contacts collection - anyone can create, only authenticated users can read
    match /contacts/{document} {
      allow create: if true;
      allow read, write, delete: if request.auth != null;
    }
    
    // Demo forms collection - anyone can create, only authenticated users can read
    match /demo_forms/{document} {
      allow create: if true;
      allow read, write, delete: if request.auth != null;
    }
    
    // Partnership applications collection - anyone can create, only authenticated users can read
    match /partnership_applications/{document} {
      allow create: if true;
      allow read, write, delete: if request.auth != null;
    }
    
    // Users collection - only authenticated users can access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Partners collection - only authenticated users can access
    match /partners/{partnerId} {
      allow read, write: if request.auth != null;
    }
    
    // Default rule - deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Storage Rules (Production Ready)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload files
    match /{allPaths=**} {
      allow read: if true; // Public read access for uploaded files
      allow write: if request.auth != null; // Only authenticated users can upload
    }
  }
}
```

## Authentication Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Admin-only collections
    match /admin/{document} {
      allow read, write: if request.auth != null && 
        request.auth.token.email == "admin@digitroncx.com";
    }
    
    // Public forms - anyone can submit
    match /public_forms/{document} {
      allow create: if true;
      allow read, write, delete: if request.auth != null;
    }
    
    // Partner dashboard data
    match /partner_data/{partnerId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == partnerId || 
         request.auth.token.email == "admin@digitroncx.com");
    }
  }
}
```

## How to Deploy Rules

### 1. **Using Firebase CLI (Recommended):**
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules
```

### 2. **Using Firebase Console:**
- Go to **Firestore Database** > **Rules**
- Paste the rules and click **"Publish"**
- Go to **Storage** > **Rules**
- Paste the storage rules and click **"Publish"**

## Environment Variables Required

Make sure these are set in your `.env.local`:

```bash
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary Config
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=digitroncx
```

## Security Features

### ✅ **Public Access:**
- Contact form submissions
- Demo form submissions  
- Partnership applications
- File uploads (read-only)

### 🔒 **Protected Access:**
- Form data reading (authenticated users only)
- File uploads (authenticated users only)
- Partner dashboard data
- Admin functions

### 🚫 **Restricted:**
- Admin-only collections
- User data (own data only)
- Partner data (own data only)

## Testing Your Rules

### 1. **Test Public Forms:**
```bash
# These should work without authentication
curl -X POST https://your-project.firebaseio.com/contacts.json \
  -d '{"name":"Test","email":"test@test.com"}'
```

### 2. **Test Protected Access:**
```bash
# These should require authentication
curl -X GET https://your-project.firebaseio.com/contacts.json \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```

## Monitoring & Analytics

### **Firebase Console:**
- **Firestore** > **Usage** - Monitor read/write operations
- **Storage** > **Usage** - Monitor file uploads
- **Authentication** > **Users** - Monitor user sign-ups

### **Security Rules Testing:**
- Use Firebase Console > **Firestore** > **Rules** > **Rules Playground**
- Test different scenarios with authenticated/unauthenticated users

## Production Checklist

- [ ] Deploy updated security rules
- [ ] Set up proper authentication
- [ ] Configure admin users
- [ ] Test all form submissions
- [ ] Monitor Firebase usage
- [ ] Set up backup strategies
- [ ] Configure error logging
- [ ] Test file upload limits
- [ ] Validate data sanitization
- [ ] Set up rate limiting (if needed)

## Support & Troubleshooting

### **Common Issues:**
1. **"Permission denied"** - Check authentication and rules
2. **"File upload failed"** - Verify Cloudinary credentials
3. **"Form not submitting"** - Check Firebase connection

### **Debug Mode:**
Enable Firebase debug mode in development:
```javascript
// In your firebase.ts
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```
