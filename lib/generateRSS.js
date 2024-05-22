export default function generateRSS(essays) {
  let rss = `<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>
  <title>Paul Graham: Essays</title>
  <link>http://www.paulgraham.com/</link>
  <description>Scraped feed provided by @nikitamalinov</description>`;
  essays.forEach((essay) => {
    rss += `
<item>
	<link>${essay.link}</link>
	<title>${essay.title}</title>
</item>`;
  });
  rss += `</channel></rss>`;
  return rss;
}
