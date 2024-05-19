import { kv } from "@vercel/kv";
import { isValidToken } from "@/utils/auth";

export default async function handler(req, res) {
  const { email, idToken } = req.query;
  if (!isValidToken(email, idToken)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const completedLessons = await kv.smembers(email);

  res.status(200).json({ completedLessons });
}