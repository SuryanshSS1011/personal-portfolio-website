require('dotenv').config({ path: '.env.local' });
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadAudioFiles() {
  const audioDir = path.join(__dirname, '../public/audio');
  const audioFiles = [
    'autumn-scene.mp3',
    'meadow-waltz.mp3', 
    'mozart-symphony-40.mp3'
  ];

  const uploadedUrls = {};

  for (const file of audioFiles) {
    try {
      const filePath = path.join(audioDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      
      console.log(`Uploading ${file}...`);
      
      const blob = await put(file, fileBuffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      uploadedUrls[file] = blob.url;
      console.log(`✓ Uploaded ${file}: ${blob.url}`);
      
    } catch (error) {
      console.error(`✗ Failed to upload ${file}:`, error.message);
    }
  }

  console.log('\n=== Upload Results ===');
  console.log(JSON.stringify(uploadedUrls, null, 2));
  
  // Write URLs to a file for easy reference
  fs.writeFileSync(
    path.join(__dirname, '../audio-urls.json'), 
    JSON.stringify(uploadedUrls, null, 2)
  );
  
  console.log('\n✓ URLs saved to audio-urls.json');
}

uploadAudioFiles().catch(console.error);