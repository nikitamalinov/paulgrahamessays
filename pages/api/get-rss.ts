import type { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    // fetch("http://www.aaronsw.com/2002/feeds/pgessays.rss")
    fetch("https://www.paulgrahamessays.com//essays.rss")
      .then((response) => response.text())
      .then((data) => {
        parseString(data, (error: any, result: any) => {
          if (error) {
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.status(200).json(result.rss.channel[0].item);
          }
        });
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
  return;
}
