-- CreateTable
CREATE TABLE "public"."Device" (
    "deviceId" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "shelfId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("deviceId")
);

-- CreateTable
CREATE TABLE "public"."Shelf" (
    "shelfId" TEXT NOT NULL,
    "blockId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "currentStock" INTEGER NOT NULL,

    CONSTRAINT "Shelf_pkey" PRIMARY KEY ("shelfId")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unitWeight" DOUBLE PRECISION NOT NULL,
    "manufacturer" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "public"."ProductShelfDetails" (
    "id" SERIAL NOT NULL,
    "shelfId" TEXT NOT NULL,
    "productCategory" TEXT NOT NULL,
    "productCount" INTEGER NOT NULL,
    "inventoryCount" INTEGER NOT NULL,

    CONSTRAINT "ProductShelfDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CameraImageData" (
    "id" SERIAL NOT NULL,
    "cameraId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shelfId" TEXT NOT NULL,

    CONSTRAINT "CameraImageData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CameraVideoData" (
    "id" SERIAL NOT NULL,
    "cameraId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "shelfId" TEXT NOT NULL,

    CONSTRAINT "CameraVideoData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WeightSensorData" (
    "id" SERIAL NOT NULL,
    "sensorId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "shelfId" TEXT NOT NULL,
    "initialWeight" DOUBLE PRECISION NOT NULL,
    "finalWeight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WeightSensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HeatmapData" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "cameraId" TEXT NOT NULL,
    "areaCode" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,

    CONSTRAINT "HeatmapData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Device" ADD CONSTRAINT "Device_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."Shelf"("shelfId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductShelfDetails" ADD CONSTRAINT "ProductShelfDetails_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."Shelf"("shelfId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CameraImageData" ADD CONSTRAINT "CameraImageData_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "public"."Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CameraImageData" ADD CONSTRAINT "CameraImageData_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."Shelf"("shelfId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CameraVideoData" ADD CONSTRAINT "CameraVideoData_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "public"."Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CameraVideoData" ADD CONSTRAINT "CameraVideoData_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."Shelf"("shelfId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeightSensorData" ADD CONSTRAINT "WeightSensorData_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "public"."Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WeightSensorData" ADD CONSTRAINT "WeightSensorData_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."Shelf"("shelfId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeatmapData" ADD CONSTRAINT "HeatmapData_cameraId_fkey" FOREIGN KEY ("cameraId") REFERENCES "public"."Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;
