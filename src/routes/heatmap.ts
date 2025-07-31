import express from 'express';
import prisma from '../db/prismaClient';

const router = express.Router();

router.get('/', async (req, res) => {
  const heatmaps = await prisma.heatmapData.findMany();
  res.json(heatmaps);
});

export default router;
