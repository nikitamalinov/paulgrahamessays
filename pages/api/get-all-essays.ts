import type { NextApiRequest, NextApiResponse } from "next";
import { generateRss } from "@/utils/generateRss";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const url = "http://www.paulgraham.com/articles.html";
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let essays: any = [];
    $("a").each((index: number, element: string) => {
      // Skip first 4 links due to the 3 honerable mentions at the top of page and one blank
      if (index > 3) {
        const title = $(element).text();
        let link = $(element).attr("href");
        if (link && title) {
          if (!link.includes("http")) {
            link = `https://www.paulgraham.com/${link}`;
          }
          essays.push({ title, link: link.replace("&", "%26") });
        }
      }
    });

    const rss = generateRSS(essays);
    fs.writeFileSync("public/essays.rss", rss);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
