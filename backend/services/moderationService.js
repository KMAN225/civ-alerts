const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('@tensorflow/tfjs-backend-cpu');
const tf = require('@tensorflow/tfjs');
const nsfw = require('nsfwjs');
const jpeg = require('jpeg-js');

const TEMP_DIR = path.join(__dirname, '..', 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

let nsfwModel = null;

async function getModel() {
  if (!nsfwModel) {
    await tf.setBackend('cpu');
    nsfwModel = await nsfw.load();
  }
  return nsfwModel;
}

function jpegToTensor(imagePath) {
  const buf = fs.readFileSync(imagePath);
  const decoded = jpeg.decode(buf, { useTArray: true });
  const { data, width, height } = decoded;
  const rgb = new Uint8Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    const src = i * 4;
    const dst = i * 3;
    rgb[dst] = data[src];
    rgb[dst + 1] = data[src + 1];
    rgb[dst + 2] = data[src + 2];
  }
  const tensor = tf.tensor3d(rgb, [height, width, 3]);
  return tensor;
}

async function classifyImage(imagePath) {
  const model = await getModel();
  const tensor = jpegToTensor(imagePath);
  try {
    const predictions = await model.classify(tensor);
    return predictions;
  } finally {
    tensor.dispose();
  }
}

function isInappropriate(predictions) {
  const map = {};
  for (const p of predictions) {
    map[p.className] = p.probability;
  }

  if ((map.Porn || 0) > 0.5) {
    return { safe: false, reason: 'Contenu pornographique détecté' };
  }
  if ((map.Hentai || 0) > 0.6) {
    return { safe: false, reason: 'Contenu explicite détecté' };
  }
  if ((map.Sexy || 0) > 0.85) {
    return { safe: false, reason: 'Contenu suggestif détecté' };
  }
  return { safe: true };
}

async function moderateImage(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) return { safe: true };

    const predictions = await classifyImage(imagePath);
    return isInappropriate(predictions);
  } catch (error) {
    console.error('Image moderation error:', error.message);
    return { safe: true };
  }
}

function extractVideoFrame(videoPath) {
  return new Promise((resolve, reject) => {
    const framePath = path.join(TEMP_DIR, `frame-${Date.now()}.jpg`);
    exec(
      `ffmpeg -i "${videoPath}" -vframes 1 -q:v 2 "${framePath}" -y`,
      { timeout: 15000 },
      (error) => {
        if (error) reject(error);
        else resolve(framePath);
      }
    );
  });
}

async function moderateVideo(videoPath) {
  try {
    if (!fs.existsSync(videoPath)) return { safe: true };

    const framePath = await extractVideoFrame(videoPath);
    try {
      const predictions = await classifyImage(framePath);
      fs.unlink(framePath, () => {});
      return isInappropriate(predictions);
    } catch {
      if (fs.existsSync(framePath)) fs.unlink(framePath, () => {});
      return { safe: true };
    }
  } catch {
    return { safe: true };
  }
}

async function preloadModel() {
  try {
    await getModel();
    console.log('✅ Moderation model loaded');
  } catch (e) {
    console.warn('⚠️ Moderation model not loaded:', e.message);
  }
}

module.exports = { moderateImage, moderateVideo, preloadModel };
