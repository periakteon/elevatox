import { type NextApiRequest, type NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getSignedURL } from "@/utils/s3client";
import { rateLimiter } from "@/utils/redis";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = getAuth(req);

  if (!user?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const identifier = `s3-${user.userId}`;

  const result = await rateLimiter.limit(identifier);

  res.setHeader("X-RateLimit-Limit", result.limit);
  res.setHeader("X-RateLimit-Remaining", result.remaining);

  if (!result.success) {
    res.status(200).json({
      message: "The request has been rate limited.",
      rateLimitState: result,
    });
    return;
  }

  const { fileName, companyName } = req.query;

  if (!fileName || !companyName) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    if (!req.method || req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const presignedUrl = await getSignedURL({
      userId: user.userId,
      companyName: companyName as string,
      fileName: fileName as string,
      date: new Date(),
    });

    if (presignedUrl.success) {
      const { url } = presignedUrl.success;

      // yalnızca soru işaretinden önceki kısmı al
      // örnek:
      // https://elevatox-bucket.s3.eu-central-1.amazonaws.com/company-logos/Theoria+Interactive/user_2TaTt3H2rW8YiGSYsPr1O2l1URG/2023-12-13T10%3A30%3A22.389Z-logo.png
      const regex =
        /^(https:\/\/[^?]+\.(?:jpg|jpeg|png|gif))(?:\?X-Amz-Algorithm=|$)/;
      const matches = url.match(regex);

      if (matches) {
        const desiredPart = matches[1];
        return res.status(200).json({ url, desiredPart });
      }
    }

    if (presignedUrl.failure) {
      return res.status(500).json({ message: presignedUrl.failure });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
