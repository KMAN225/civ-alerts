const mongoose = require('mongoose');
const Issue = require('../models/Issue');
const User = require('../models/User');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const TEMP_DIR = path.join(__dirname, '..', 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

async function checkDuplicate(title, location) {
  const normalizedTitle = title.toLowerCase().trim();
  const normalizedLocation = location.toLowerCase().trim();

  const similar = await Issue.find({
    deletedAt: null,
    hidden: false,
  })
    .select('title location')
    .limit(200)
    .lean();

  const threshold = 0.7;
  const matches = [];

  for (const issue of similar) {
    const titleSim = similarity(normalizedTitle, issue.title.toLowerCase().trim());
    const locSim = similarity(normalizedLocation, issue.location.toLowerCase().trim());

    if (titleSim > threshold && locSim > threshold) {
      matches.push({
        issue,
        score: Math.round((titleSim + locSim) / 2 * 100)
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 3);
}

function similarity(s1, s2) {
  if (!s1 || !s2) return 0;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 0;
  const editDist = levenshtein(longer, shorter);
  return 1 - (editDist / longer.length);
}

function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

async function calculateTrustScore(userId) {
  const user = await User.findById(userId);
  if (!user) return 0;

  const accountAge = (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  const issuesSubmitted = await Issue.countDocuments({ userId, deletedAt: null });
  const totalVotes = await Issue.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), deletedAt: null } },
    { $group: { _id: null, votes: { $sum: { $size: { $ifNull: ['$helpfulVotes', []] } } } } }
  ]);

  const helpfulVotes = totalVotes[0]?.votes || 0;

  const suspiciousVotes = await Issue.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), deletedAt: null } },
    { $group: { _id: null, votes: { $sum: { $size: { $ifNull: ['$suspiciousVotes', []] } } } } }
  ]);
  const suspiciousCount = suspiciousVotes[0]?.votes || 0;

  let score = 20;
  if (accountAge > 30) score += 10;
  if (accountAge > 90) score += 10;
  if (accountAge > 365) score += 15;
  if (issuesSubmitted >= 1) score += 5;
  if (issuesSubmitted >= 5) score += 5;
  if (issuesSubmitted >= 10) score += 10;
  if (helpfulVotes >= 3) score += 5;
  if (helpfulVotes >= 10) score += 10;
  if (helpfulVotes >= 50) score += 10;
  if (suspiciousCount >= 3) score -= 10;
  if (suspiciousCount >= 10) score -= 15;

  return Math.max(0, Math.min(100, score));
}

async function fetchNewsForRegion(issue) {
  const keywords = [issue.title, issue.location, issue.sector, 'Côte d\'Ivoire'].filter(Boolean).join(' ');

  const rssFeeds = [
    'https://news.google.com/rss/search?q=' + encodeURIComponent(keywords) + '&hl=fr&gl=CI&ceid=CI:fr',
    'https://rss.lemonde.fr/c/205/cl/1/feed.rss',
  ];

  const articles = [];

  for (const feedUrl of rssFeeds) {
    try {
      const response = await fetch(feedUrl, { timeout: 5000 });
      const text = await response.text();

      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let match;
      while ((match = itemRegex.exec(text)) !== null) {
        const item = match[1];
        const title = item.match(/<title>(.*?)<\/title>/)?.[1] || '';
        const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
        const description = item.match(/<description>(.*?)<\/description>/)?.[1] || '';
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';

        const lowerTitle = title.toLowerCase();
        const lowerDesc = description.toLowerCase();
        const lowerKeywords = keywords.toLowerCase().split(' ');

        const matchCount = lowerKeywords.filter(k => lowerTitle.includes(k) || lowerDesc.includes(k)).length;

        if (matchCount >= 2) {
          articles.push({ title, link, description, pubDate, relevance: matchCount });
        }
      }
    } catch {}
  }

  articles.sort((a, b) => b.relevance - a.relevance);
  return articles.slice(0, 5);
}

module.exports = { checkDuplicate, calculateTrustScore, fetchNewsForRegion };
