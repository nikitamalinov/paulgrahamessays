// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { kv } from "@vercel/kv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await kv.smembers("random");
    res.status(200).json({ status: "ok" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
