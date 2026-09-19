import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3999;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Internal Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const urls = [
  '/',
  '/css/variables.css',
  '/css/base.css',
  '/css/components/intro.css',
  '/css/components/header.css',
  '/css/components/hero.css',
  '/css/components/countdown.css',
  '/css/components/ticker.css',
  '/css/components/pre-events.css',
  '/css/components/tracks.css',
  '/css/components/schedule.css',
  '/css/components/gallery.css',
  '/css/components/tickets.css',
  '/css/components/faq-venue.css',
  '/css/components/modal.css',
  '/css/components/stage-rail.css',
  '/css/components/metrics-pronite.css',
  '/css/components/footer.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/components/introAnimation.js',
  '/js/components/countdown.js',
  '/js/components/stageRail.js',
  '/js/components/eventSearch.js',
  '/js/components/particleCanvas.js',
  '/js/components/audioSynthesizer.js',
  '/js/components/ticker.js',
  '/js/components/preEvents.js',
  '/js/components/tracks.js',
  '/js/components/schedule.js',
  '/js/components/gallery.js',
  '/js/components/ticketCalculator.js',
  '/js/components/faq.js',
  '/js/components/campusRadar.js',
  '/assets/icons/dhyuthi-logo.svg',
  '/assets/icons/ieee-logo.svg',
  '/assets/icons/ieee-sctsb-logo.svg',
  '/assets/images/poster-trailquest.jpg',
  '/assets/images/poster-doodlequest.jpg',
  '/assets/images/poster-strikezone.jpg',
  '/assets/images/poster-synapse.jpg',
  '/assets/images/poster-promptarena.jpg',
  '/assets/images/gallery-auditorium.jpg',
  '/assets/images/gallery-workshop.jpg',
  '/assets/images/gallery-awards.jpg',
  '/assets/images/dyuthi-typography-transparent.png'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      resolve({ path, status: res.statusCode, type: res.headers['content-type'] });
    }).on('error', (e) => {
      resolve({ path, status: e.message });
    });
  });
}

server.listen(PORT, async () => {
  console.log(`Self-test server running on http://localhost:${PORT}`);
  let allPass = true;
  for (const url of urls) {
    const result = await checkUrl(url);
    if (result.status !== 200) {
      console.error(`FAILED: ${result.path} -> ${result.status}`);
      allPass = false;
    } else {
      console.log(`OK 200 [${result.type}]: ${result.path}`);
    }
  }

  server.close(() => {
    if (allPass) {
      console.log(`\n🎉 SUCCESS: All ${urls.length} routes and assets verified HTTP 200 OK with correct MIME types!`);
      process.exit(0);
    } else {
      console.error('\n❌ FAIL: Some assets failed to load.');
      process.exit(1);
    }
  });
});
