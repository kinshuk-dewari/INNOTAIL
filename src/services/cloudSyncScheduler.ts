import { uploadJSONToS3 } from './awsUploader';
import prisma from '../db/prismaClient';

const bucketName = 'innotail-cloud-data';

async function fetchAndUpload() {
  try {
    const data = {
      devices: await prisma.device.findMany(),
      shelves: await prisma.shelf.findMany(),
      products: await prisma.product.findMany(),
      shelfDetails: await prisma.productShelfDetails.findMany(),
      imageData: await prisma.cameraImageData.findMany(),
      videoData: await prisma.cameraVideoData.findMany(),
      weightData: await prisma.weightSensorData.findMany(),
      heatmapData: await prisma.heatmapData.findMany(),
    };

    const filename = 'live-data.json';
    const url = await uploadJSONToS3(data, bucketName, filename);
    console.log('✅ Data updated in S3:', url);
  } catch (error) {
    console.error('❌ Failed to upload data:', error);
  }
}

setInterval(fetchAndUpload, 30 * 1000); // Every 30 seconds
fetchAndUpload(); // Initial upload
