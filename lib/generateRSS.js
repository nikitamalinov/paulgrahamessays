function generateRSS(essays) {
  let rss = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Paul Graham: Essays</title><link>http://www.paulgraham.com/</link><description>Paul Graham's Essays</description>`;
  essays.forEach(essay => {
    rss += `<item><title>${essay.title}</title><link>${essay.link}</link></item>`;
  });
  rss += `</channel></rss>`;
  return rss;
}

module.exports = generateRSS;