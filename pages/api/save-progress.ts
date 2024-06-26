import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { isValidToken } from "@/utils/auth";

import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string(),
  idToken: z.string(),
  lessonUrl: z.string(),
  completed: z.boolean(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
