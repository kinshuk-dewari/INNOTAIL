import express from 'express';
import cameraRoutes from './routes/camera';
import deviceRoutes from './routes/device';
import productRoutes from './routes/product';
import shelfRoutes from './routes/shelf';
import sensorRoutes from './routes/sensor';
import heatmapRoutes from './routes/heatmap';
import displayRoutes from './routes/allData'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const routeMappings = [
  { path: 'device', router: deviceRoutes },
  { path: 'camera', router: cameraRoutes },
  { path: 'product', router: productRoutes },
  { path: 'shelf', router: shelfRoutes },
  { path: 'sensor', router: sensorRoutes },
  { path: 'heatmap', router: heatmapRoutes },
  { path: 'display', router: displayRoutes },
];

routeMappings.forEach(({ path, router }) => {
  app.use(`/api/${path}`, router);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
