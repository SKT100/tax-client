import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const DIR = './dist'; // Changed to serve Vite build output

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  let extname = String(path.extname(filePath)).toLowerCase();
  
  // React Router / SPA fallback support
  let absolutePath = path.join(process.cwd(), DIR, filePath);
  
  if (!fs.existsSync(absolutePath)) {
    // If not found (e.g. client side route), fallback to index.html
    absolutePath = path.join(process.cwd(), DIR, 'index.html');
    extname = '.html';
  }

  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server Error: '+error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/ serving ${DIR}`);
});
