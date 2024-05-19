import type { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";
import { isValidToken } from "@/utils/auth";

import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string(),
  idToken: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, idToken } = schema.parse(req.query);

  if (!isValidToken(email, idToken)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const completedLessons = await kv.smembers(email);

  res.status(200).json({ completedLessons });
}
