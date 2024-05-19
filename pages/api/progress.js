import { verifyIdToken } from "@/lib/verifyIdToken";
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

const handler = async (req, res) => {
  const { email, url } = req.query;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || !(await verifyIdToken(token))) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    const progress = await redis.smembers(email);
    return res.status(200).json({ progress, total: progress.length });
  }

  if (req.method === "POST") {
    await redis.sadd(email, url);
    return res.status(200).json({ message: "Progress added" });
  }

  if (req.method === "DELETE") {
    await redis.srem(email, url);
    return res.status(200).json({ message: "Progress removed" });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;