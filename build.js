// Script build: kiểm tra source, thay thông tin build rồi copy sang thư mục dist
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

function fail(msg) {
  console.error('BUILD ERROR: ' + msg);
  process.exit(1);
}

// 1. Kiểm tra file bắt buộc
for (const f of ['index.html', 'style.css', 'app.js']) {
  if (!fs.existsSync(path.join(SRC, f))) fail('Thiếu file bắt buộc: src/' + f);
}

// 2. Kiểm tra nội dung index.html
let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
if (!/<title>.+<\/title>/i.test(html)) fail('index.html thiếu thẻ <title>');
if (!/<\/html>/i.test(html)) fail('index.html thiếu thẻ đóng </html>');

// 3. Thay thông tin build
html = html
  .replace('__BUILD_NUMBER__', process.env.BUILD_NUMBER || 'local')
  .replace('__BUILD_TIME__', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));

// 4. Ghi ra dist
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST);
for (const f of fs.readdirSync(SRC)) {
  if (f !== 'index.html') fs.copyFileSync(path.join(SRC, f), path.join(DIST, f));
}
fs.writeFileSync(path.join(DIST, 'index.html'), html);
console.log('BUILD SUCCESS: đã tạo thư mục dist/');
