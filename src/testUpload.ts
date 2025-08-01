import { uploadJSONToS3 } from './awsUploader';

const testData = {
  message: "Hello from Innotail!",
  timestamp: new Date().toISOString(),
};

async function main() {
  try {
    const url = await uploadJSONToS3(
      testData,
      'innotail-cloud-data', // your bucket name
      'test-folder',
      'demo.json'            // optional
    );
    console.log('✅ File uploaded to:', url);
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

main();
