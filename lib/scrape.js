const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const generateRSS = require("./generateRSS");

async function scrapeEssays() {
  const url = "http://www.paulgraham.com/articles.html";
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let essays = [];
    $("a").each((index, element) => {
      const title = $(element).text();
      let link = $(element).attr("href");
      if (link && title) {
        if (!link.includes("http")) {
          link = `https://www.paulgraham.com/${link}`;
        }
        essays.push({ title, link: link.replace("&", "%26") });
      }
    });
    const rss = generateRSS(essays);
    fs.writeFileSync("public/essays.rss", rss);
  } catch (error) {
    console.error(error);
  }
}

scrapeEssays();
