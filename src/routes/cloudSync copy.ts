import express from 'express';
import prisma from '../db/prismaClient';
import { uploadJSONToS3 } from '../services/awsUploader';

const router = express.Router();

router.post('/sync', async (req, res) => {
  try {
    const [
      devices,
      shelves,
      products,
      shelfDetails,
      imageData,
      videoData,
      weightData,
      heatmapData,
    ] = await Promise.all([
      prisma.device.findMany(),
      prisma.shelf.findMany(),
      prisma.product.findMany(),
      prisma.productShelfDetails.findMany(),
      prisma.cameraImageData.findMany(),
      prisma.cameraVideoData.findMany(),
      prisma.weightSensorData.findMany(),
      prisma.heatmapData.findMany(),
    ]);

    const allData = {
      devices,
      shelves,
      products,
      shelfDetails,
      imageData,
      videoData,
      weightData,
      heatmapData,
    };

    const s3Url = await uploadJSONToS3(allData, 'innotail-cloud-data', 'snapshots');

    res.status(200).json({
      message: 'Data uploaded to AWS S3',
      s3Url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to sync data to AWS' });
  }
});

export default router;
