const express = require('express');
const router = express.Router();

const blogPosts = [
  'defis-agriculture-ivoirienne-2026',
  'numerique-transformation-services-publics',
  'sante-ivoirienne-progres-defis',
  'education-ivoirienne-avancees-obstacles',
  'transport-urbain-abidjan-defis',
  'energie-electrification-ivoirienne',
  'assainissement-eau-potable-cote-ivoire',
  'dechets-urbains-gestion-environnement',
  'developpement-urbain-abidjan-infrastructures',
];

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/guide', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/rapports', priority: '0.7', changefreq: 'weekly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/contact', priority: '0.5', changefreq: 'yearly' },
];

router.get('/sitemap.xml', (req, res) => {
  const siteUrl = 'https://civ-alerts.onrender.com';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  staticPages.forEach(page => {
    xml += `<url>
      <loc>${siteUrl}${page.path}</loc>
      <priority>${page.priority}</priority>
      <changefreq>${page.changefreq}</changefreq>
    </url>`;
  });

  blogPosts.forEach(slug => {
    xml += `<url>
      <loc>${siteUrl}/blog/${slug}</loc>
      <priority>0.8</priority>
      <changefreq>monthly</changefreq>
    </url>`;
  });

  xml += '</urlset>';

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
