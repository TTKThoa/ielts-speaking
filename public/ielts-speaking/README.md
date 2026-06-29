# IELTS Speaking Coach

Web luyện nói IELTS với AI chấm điểm theo 4 tiêu chí.

## Deploy lên Render (miễn phí)

### Bước 1 — Upload lên GitHub
1. Vào github.com → đăng nhập → nhấn **New repository**
2. Đặt tên repo: `ielts-speaking`
3. Nhấn **Create repository**
4. Kéo thả toàn bộ folder này vào trang GitHub vừa tạo (hoặc dùng GitHub Desktop)

### Bước 2 — Deploy lên Render
1. Vào render.com → đăng nhập bằng GitHub
2. Nhấn **New** → **Web Service**
3. Chọn repo `ielts-speaking`
4. Điền thông tin:
   - **Name**: ielts-speaking
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Kéo xuống phần **Environment Variables** → nhấn **Add Environment Variable**:
   - Key: `GROQ_API_KEY`
   - Value: (dán API key Groq của bạn vào đây)
6. Nhấn **Create Web Service**

Render sẽ tự deploy, sau 2–3 phút bạn có link như: `https://ielts-speaking.onrender.com`

## Chạy local (để test)

```bash
npm install
GROQ_API_KEY=your_key_here npm start
```

Mở trình duyệt: http://localhost:3000
