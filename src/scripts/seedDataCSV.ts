import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function loadCSV(filePath: string) {
  return new Promise<any[]>((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

async function main() {
  // Seed Product data
  const productData = await loadCSV(path.join(__dirname, '../../data/Product.csv'));
  for (const entry of productData) {
    await prisma.product.create({
      data: {
        productId: entry.productId,
        name: entry.name,
        category: entry.category,
        unitWeight: parseFloat(entry.unitWeight),
        manufacturer: entry.manufacturer || null
      }
    });
  }

  // Seed Shelf data
  const shelfData = await loadCSV(path.join(__dirname, '../../data/Shelf.csv'));
  for (const entry of shelfData) {
    await prisma.shelf.create({
      data: {
        shelfId: entry.shelfId,
        blockId: entry.blockId,
        productId: entry.productId,
        currentStock: parseInt(entry.currentStock)
      }
    });
  }

  // Seed ProductShelfDetails data
  const psdData = await loadCSV(path.join(__dirname, '../../data/ProductShelfDetails.csv'));
  for (const entry of psdData) {
    await prisma.productShelfDetails.create({
      data: {
        shelfId: entry.shelfId,
        productCategory: entry.productCategory,
        productCount: parseInt(entry.productCount),
        inventoryCount: parseInt(entry.inventoryCount)
      }
    });
  }

  // Seed Device data
  const deviceData = await loadCSV(path.join(__dirname, '../../data/Device.csv'));
  for (const entry of deviceData) {
    await prisma.device.create({
      data: {
        deviceId: entry.deviceId,
        deviceType: entry.deviceType,
        shelfId: entry.shelfId || null,
        isActive: entry.isActive === 'true'
      }
    });
  }

  // Seed CameraImageData
  const camImgData = await loadCSV(path.join(__dirname, '../../data/CameraImageData.csv'));
  for (const entry of camImgData) {
    await prisma.cameraImageData.create({
      data: {
        cameraId: entry.cameraId,
        timestamp: new Date(entry.timestamp),
        imageUrl: entry.imageUrl,
        shelfId: entry.shelfId
      }
    });
  }

  // Seed CameraVideoData
  const camVidData = await loadCSV(path.join(__dirname, '../../data/CameraVideoData.csv'));
  for (const entry of camVidData) {
    await prisma.cameraVideoData.create({
      data: {
        cameraId: entry.cameraId,
        timestamp: new Date(entry.timestamp),
        videoUrl: entry.videoUrl,
        shelfId: entry.shelfId
      }
    });
  }

  // Seed WeightSensorData
  const weightData = await loadCSV(path.join(__dirname, '../../data/WeightSensorData.csv'));
  for (const entry of weightData) {
    await prisma.weightSensorData.create({
      data: {
        sensorId: entry.sensorId,
        timestamp: new Date(entry.timestamp),
        shelfId: entry.shelfId,
        initialWeight: parseFloat(entry.initialWeight),
        finalWeight: parseFloat(entry.finalWeight)
      }
    });
  }

  // Seed HeatmapData
  const heatmapData = await loadCSV(path.join(__dirname, '../../data/HeatmapData.csv'));
  for (const entry of heatmapData) {
    await prisma.heatmapData.create({
      data: {
        cameraId: entry.cameraId,
        timestamp: new Date(entry.timestamp),
        areaCode: entry.areaCode,
        intensity: parseInt(entry.intensity)
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
