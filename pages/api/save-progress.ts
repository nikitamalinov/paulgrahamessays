import { kv } from "@vercel/kv";
import { isValidToken } from "@/utils/auth";

export default async function handler(req, res) {
  const { lessonUrl, completed, email, idToken } = JSON.parse(req.body);
  if (!isValidToken(email, idToken)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (completed) {
    await kv.sadd(email, lessonUrl);
  } else {
    await kv.srem(email, lessonUrl);
  }

  res.status(200).json({ message: "Progress saved" });
}
