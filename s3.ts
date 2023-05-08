const { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET, AWS_SECRET_ACCESS_KEY } =
  process.env;
import { S3Client } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const AWS_CONFIGURATION: any = {
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
};

// Create an instance of the S3 client
export const s3 = new S3Client(AWS_CONFIGURATION);

export async function signUrl(key: string) {
  if (!key) return null;
  const command = new GetObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 24 * 60 * 60 });
  return url;
}
