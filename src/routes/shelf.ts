import express from 'express';
import prisma from '../db/prismaClient';

const router = express.Router();

router.get('/', async (req, res) => {
  const shelves = await prisma.shelf.findMany();
  res.json(shelves);
});

export default router;
