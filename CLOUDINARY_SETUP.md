# ☁️ Cloudinary Setup Guide

## 🚨 **Upload Error Fixed! Now You Need to Configure Cloudinary**

Your dashboard is getting a **400 Bad Request** error when trying to upload files to Cloudinary. This means your Cloudinary configuration is missing or incorrect.

---

## 🔧 **Step 1: Create/Update Environment File**

Create or update your `.env.local` file in your project root with these Cloudinary variables:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_actual_api_key_here
CLOUDINARY_API_SECRET=your_actual_api_secret_here
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name_here
```

---

## 🌐 **Step 2: Get Your Cloudinary Credentials**

### **Visit Cloudinary Console:**
1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Sign in to your account (or create one if you don't have it)

### **Find Your Cloud Name:**
1. In the dashboard, look for **"Cloud name"** at the top
2. It should look like: `dpe0etldd` (this is what you saw in the error)
3. Copy this value

### **Get API Key & Secret:**
1. Click on **"Account Details"** in the left sidebar
2. Scroll down to **"API Environment variable"**
3. Copy the **API Key** and **API Secret**

---

## ⚙️ **Step 3: Create Upload Preset**

### **Why Upload Preset?**
Cloudinary requires an upload preset for client-side uploads to work securely.

### **Create Preset:**
1. In Cloudinary Console, go to **"Settings"** → **"Upload"**
2. Scroll down to **"Upload presets"**
3. Click **"Add upload preset"**
4. Fill in:
   - **Preset name**: `digitroncx` (or any name you prefer)
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `digitroncx-uploads` (optional, for organization)
5. Click **"Save"**

---

## 📝 **Step 4: Update Your .env.local File**

Replace the placeholder values with your actual credentials:

```env
# Example (replace with your actual values):
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dpe0etldd
NEXT_PUBLIC_CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=digitroncx
```

---

## 🔄 **Step 5: Restart Your Development Server**

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
# or
pnpm dev
```

---

## 🧪 **Step 6: Test File Upload**

1. Go to your demo form: `/demo`
2. Try uploading a small image file (JPG, PNG)
3. Check the browser console for detailed logs
4. You should see:
   ```
   Cloudinary upload config: { cloudName: "dpe0etldd", uploadPreset: "digitroncx", ... }
   Uploading to: https://api.cloudinary.com/v1_1/dpe0etldd/image/upload
   Cloudinary upload success: { secure_url: "https://res.cloudinary.com/..." }
   ```

---

## 🚨 **Common Issues & Solutions**

### **❌ "Cloudinary cloud name not configured"**
- Check if `.env.local` file exists
- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- Restart your dev server

### **❌ "Upload preset not configured"**
- Check if `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` is set
- Verify the preset exists in Cloudinary Console
- Make sure preset is set to "Unsigned" mode

### **❌ "400 Bad Request" still happening**
- Check browser console for detailed error logs
- Verify cloud name matches exactly
- Ensure upload preset name is correct
- Check if preset allows the file type you're uploading

### **❌ "File type not supported"**
- Only these file types are allowed:
  - Images: JPG, PNG, GIF
  - Documents: PDF, DOC, DOCX
- Check your file's MIME type

---

## 🔍 **Debugging Steps**

1. **Check Environment Variables:**
   ```javascript
   // In browser console, check:
   console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
   console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
   ```

2. **Verify Upload Preset:**
   - Go to Cloudinary Console → Settings → Upload
   - Check if your preset exists and is "Unsigned"

3. **Test with Simple Image:**
   - Use a small JPG file (under 1MB)
   - Avoid complex file names with special characters

---

## 📱 **Expected Results**

After proper configuration:
- ✅ File uploads will work
- ✅ You'll see success logs in console
- ✅ Files will be stored in Cloudinary
- ✅ URLs will be saved to Firebase
- ✅ Dashboard will display file links

---

## 🆘 **Still Having Issues?**

1. **Check Browser Console** for detailed error messages
2. **Verify Cloudinary Account** is active and not suspended
3. **Check File Size** (max 10MB)
4. **Ensure File Type** is supported
5. **Restart Dev Server** after environment changes

---

**Need More Help?** Share the exact error message from the browser console!
