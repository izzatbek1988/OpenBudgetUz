const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const PROXY_ROUTES = {
  '/api/budget': 'https://openbudget.uz/api/v2/info/statistics/board-budget-sum/53?regionId=12&districtId=160',
  '/api/board':  'https://openbudget.uz/api/v2/info/board/53?regionId=12&districtId=160&page=0&size=12&stage=PASSED&quality='
};

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

function fetchUpstream(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

http.createServer(async (req, res) => {
  const pathname = url.parse(req.url).pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Proxy routes
  if (PROXY_ROUTES[pathname]) {
    try {
      const data = await fetchUpstream(PROXY_ROUTES[pathname]);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } catch (e) {
      res.writeHead(502);
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // Static file serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath);
  if (!ext) filePath += '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  ✅  Server running at http://localhost:${PORT}\n`);
});
