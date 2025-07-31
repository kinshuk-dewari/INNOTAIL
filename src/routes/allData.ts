import { Router } from 'express';
import prisma from '../db/prismaClient';

const router = Router();

router.get('/display-all', async (req, res) => {
  try {
    const devices = await prisma.device.findMany();
    const shelves = await prisma.shelf.findMany();
    const products = await prisma.product.findMany();
    const shelfDetails = await prisma.productShelfDetails.findMany();
    const imageData = await prisma.cameraImageData.findMany();
    const videoData = await prisma.cameraVideoData.findMany();
    const weightData = await prisma.weightSensorData.findMany();
    const heatmapData = await prisma.heatmapData.findMany();

    return res.json({
      devices,
      shelves,
      products,
      shelfDetails,
      imageData,
      videoData,
      weightData,
      heatmapData,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
