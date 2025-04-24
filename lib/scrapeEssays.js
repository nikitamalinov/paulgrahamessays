const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const generateRSS = require('./generateRSS');

async function scrapeEssays() {
  const url = 'http://www.paulgraham.com/articles.html';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let essays = [];
    $('a').each((index, element) => {
      const title = $(element).text();
      const link = $(element).attr('href');
      if (link && title) {
        essays.push({ title, link: `http://www.paulgraham.com/${link}` });
      }
    });
    const rss = generateRSS(essays);
    fs.writeFileSync('lib/essays.rss', rss);
  } catch (error) {
    console.error(error);
  }
}

module.exports = scrapeEssays;

async function handler(req, res) {
  try {
    await scrapeEssays();
    res.status(200).json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate sitemap' });
  }
}