import express from 'express';
import prisma from '../db/prismaClient';

const router = express.Router();

router.get('/weights', async (req, res) => {
  const data = await prisma.weightSensorData.findMany();
  res.json(data);
});

export default router;
