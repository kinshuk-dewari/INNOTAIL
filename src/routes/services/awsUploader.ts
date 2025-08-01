import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
  region: 'ap-south-1', // update if using a different region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

/**
 * Upload JSON data to S3
 * @param data - The JSON object to upload
 * @param bucket - S3 bucket name
 * @param folder - Folder (prefix) within the bucket
 * @param filename - Optional: Provide a fixed filename. If not provided, a UUID-based filename will be used.
 * @returns Public S3 URL of uploaded JSON
 */
export async function uploadJSONToS3(
  data: object,
  bucket: string,
  folder: string,
  filename?: string
): Promise<string> {
  const fileKey = filename ? `${folder}/${filename}` : `${folder}/${uuidv4()}.json`;
  const jsonData = JSON.stringify(data, null, 2);

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileKey,
    Body: jsonData,
    ContentType: 'application/json',
  });

  await s3.send(command);

  return `https://${bucket}.s3.amazonaws.com/${fileKey}`;
}
