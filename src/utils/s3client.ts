import { env } from "@/env.mjs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: env.S3_BUCKET_ACCESS_KEY,
    secretAccessKey: env.S3_BUCKET_SECRET_ACCESS_KEY,
  },
});

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }
>;

interface SignedURLParams {
  userId: string;
  companyName: string;
  fileName: string;
  date: Date;
}

export async function getSignedURL(params: SignedURLParams): SignedURLResponse {
  try {
    const putObjectCommand = new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: `company-logos/${params.companyName}/${
        params.userId
      }/${params.date.toISOString()}-${params.fileName}`,
    });

    const url = await getSignedUrl(
      s3,
      putObjectCommand,
      { expiresIn: 60 }, // 60 saniye geçerli PUT URL
    );

    return { success: { url } };
  } catch (error) {
    if (error instanceof Error) {
      return { failure: error.message };
    }
    return { failure: "Presigned URL error" };
  }
}
