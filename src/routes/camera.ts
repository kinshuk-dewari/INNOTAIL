import express from 'express';
import prisma from '../db/prismaClient';

const router = express.Router();

router.get('/images', async (req, res) => {
  const data = await prisma.cameraImageData.findMany();
  res.json(data);
});

router.get('/videos', async (req, res) => {
  const data = await prisma.cameraVideoData.findMany();
  res.json(data);
});

export default router;
