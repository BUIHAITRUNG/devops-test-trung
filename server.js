// Web server tĩnh đơn giản, không cần cài thư viện
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIR = path.join(__dirname, 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript' };

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const file = path.join(DIR, urlPath === '/' ? 'index.html' : path.normalize(urlPath));
  if (!file.startsWith(DIR)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not Found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log('Server chạy tại cổng ' + PORT));
