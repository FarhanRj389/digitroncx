// lib/cloudinary.ts - Pure client-side upload function without cloudinary package dependency

// Debug function to check environment variables (call this in browser console)
export function debugCloudinaryConfig() {
  console.log('🔍 Cloudinary Configuration Debug:');
  console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  console.log('API Key:', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');
  
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    console.error('❌ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing!');
  }
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
    console.error('❌ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is missing!');
  }
  
  console.log('💡 Call this function in browser console to debug Cloudinary config');
}

// Function to upload file to Cloudinary directly from client
export async function uploadToCloudinary(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if required environment variables are set
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName) {
      reject(new Error('Cloudinary cloud name not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your .env.local file.'));
      return;
    }
    
    if (!uploadPreset) {
      reject(new Error('Cloudinary upload preset not configured. Please set NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in your .env.local file.'));
      return;
    }

    console.log('Cloudinary upload config:', {
      cloudName,
      uploadPreset,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('File size must be less than 10MB'));
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      reject(new Error('File type not supported. Please use JPG, PNG, GIF, PDF, DOC, or DOCX files.'));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log('Uploading to:', uploadUrl);

    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        if (!response.ok) {
          // Try to get more detailed error information
          let errorMessage = `Upload failed with status: ${response.status}`;
          try {
            const errorData = await response.text();
            console.error('Cloudinary error response:', errorData);
            if (errorData) {
              try {
                const parsedError = JSON.parse(errorData);
                if (parsedError.error && parsedError.error.message) {
                  errorMessage = `Upload failed: ${parsedError.error.message}`;
                }
              } catch {
                // If it's not JSON, use the raw text
                if (errorData.length < 200) { // Only use short error messages
                  errorMessage = `Upload failed: ${errorData}`;
                }
              }
            }
          } catch (e) {
            console.error('Could not parse error response:', e);
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then(data => {
        console.log('Cloudinary upload success:', data);
        if (data.secure_url) {
          resolve(data.secure_url);
        } else {
          reject(new Error('Upload failed: No URL returned from Cloudinary'));
        }
      })
      .catch(error => {
        console.error('Upload error:', error);
        reject(error);
      });
  });
}
