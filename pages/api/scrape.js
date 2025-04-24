const scrapeEssays = require('../../lib/scrapeEssays');

export default async function handler(req, res) {
  try {
    await scrapeEssays();
    res.status(200).json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate sitemap' });
  }
}

export default async function handler(req, res) {
  try {
    await scrapeEssays();
    res.status(200).json({ message: 'Sitemap generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate sitemap' });
  }
}