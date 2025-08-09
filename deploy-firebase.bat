@echo off
REM DigitronCX Firebase Deployment Script for Windows
REM This script deploys Firebase rules, indexes, and configurations

echo 🚀 Starting DigitronCX Firebase Deployment...

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI not found. Installing...
    npm install -g firebase-tools
)

REM Check if user is logged in
firebase projects:list >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please login to Firebase...
    firebase login
)

REM Initialize Firebase if not already done
if not exist ".firebaserc" (
    echo 📁 Initializing Firebase project...
    firebase init
)

echo 📋 Deploying Firestore Rules...
firebase deploy --only firestore:rules

echo 📋 Deploying Firestore Indexes...
firebase deploy --only firestore:indexes

echo 📁 Deploying Storage Rules...
firebase deploy --only storage:rules

echo ✅ Firebase deployment completed successfully!
echo.
echo 🔍 To verify deployment:
echo    - Visit: https://console.firebase.google.com
echo    - Check Firestore Database ^> Rules
echo    - Check Storage ^> Rules
echo    - Check Firestore Database ^> Indexes
echo.
echo 🧪 To test locally with emulators:
echo    firebase emulators:start

pause
