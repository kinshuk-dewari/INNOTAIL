import express from 'express';
import prisma from '../db/prismaClient';

const router = express.Router();

router.get('/', async (req, res) => {
  const devices = await prisma.device.findMany();
  res.json(devices);
});

export default router;
