# devops-test

Website HTML đơn giản phục vụ bài kiểm tra thực hành DevOps.

## Quy trình CI/CD

Developer → GitHub → Jenkins → Build → Deploy → Telegram

## Cấu trúc

- `src/` : source website (HTML, CSS, JS)
- `build.js` : kiểm tra source và tạo thư mục `dist/`
- `server.js` : web server tĩnh (Node.js, không cần thư viện ngoài)
- `Jenkinsfile` : định nghĩa pipeline

## Chạy local

```bash
npm install
npm run build
npm start
```

Mở http://localhost:3000

## Pipeline

1. Notify Start (Telegram)
2. Checkout
3. Install dependencies
4. Build
5. Deploy
6. Telegram: Success / Failed
