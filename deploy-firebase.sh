#!/bin/bash

# DigitronCX Firebase Deployment Script
# This script deploys Firebase rules, indexes, and configurations

echo "🚀 Starting DigitronCX Firebase Deployment..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase..."
    firebase login
fi

# Initialize Firebase if not already done
if [ ! -f ".firebaserc" ]; then
    echo "📁 Initializing Firebase project..."
    firebase init
fi

echo "📋 Deploying Firestore Rules..."
firebase deploy --only firestore:rules

echo "📋 Deploying Firestore Indexes..."
firebase deploy --only firestore:indexes

echo "📁 Deploying Storage Rules..."
firebase deploy --only storage:rules

echo "✅ Firebase deployment completed successfully!"
echo ""
echo "🔍 To verify deployment:"
echo "   - Visit: https://console.firebase.google.com"
echo "   - Check Firestore Database > Rules"
echo "   - Check Storage > Rules"
echo "   - Check Firestore Database > Indexes"
echo ""
echo "🧪 To test locally with emulators:"
echo "   firebase emulators:start"
