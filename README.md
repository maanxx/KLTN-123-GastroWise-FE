# GastroWise Frontend 🎨

Đây là mã nguồn giao diện (Next.js + React) của dự án **GastroWise - Hệ thống thông tin trải nghiệm ẩm thực thông minh**.

## 📌 Yêu cầu hệ thống (Prerequisites)
1. **Node.js**: Phiên bản v18.x trở lên.
2. Đã cài đặt và chạy thành công **GastroWise Backend** ở cổng `5000` (Xem hướng dẫn bên repo Backend).

---

## 🛠️ Hướng dẫn Cài đặt & Chạy dự án (Dành cho Partner)

### Bước 1: Clone code và cài thư viện
Mở terminal tại thư mục dự án (GastroWise-FE) và chạy:
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường (.env.local)
Tạo một file mới tên là `.env.local` nằm ở **thư mục gốc** (ngang hàng với `package.json`).
Copy nội dung sau vào file `.env.local`:

```env
# Địa chỉ API của Backend (Mặc định Backend chạy ở cổng 5000)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Bước 3: Chạy Web
Sau khi Backend đã chạy thành công, mở một Terminal mới ở thư mục FE và chạy:
```bash
npm run dev
```
Trình duyệt sẽ tự động mở hoặc bạn có thể tự truy cập vào địa chỉ: [http://localhost:3000](http://localhost:3000).

---

## 📚 Tài liệu tham khảo (Documentation)
Bạn có thể đọc thêm các tài liệu phân tích thiết kế, cấu trúc dự án và danh sách thư viện được sử dụng tại thư mục `/docs` trong repo này. Đặc biệt lưu ý:
- `docs/01-product-requirements.md`: Đọc để hiểu tổng quan các tính năng của Web.
- `docs/08-project-dependencies.md`: Danh sách các thư viện UI (framer-motion, lucide-react, zustand...) đang dùng để tránh cài trùng lặp.
- `docs/09-class-diagram.md`: Phân tích thiết kế của hệ thống.

---
**Lưu ý:** Giao diện quản trị Admin sẽ được tách riêng ra một Repository Frontend khác để dễ quản lý. Repo FE này chỉ dành cho người dùng cuối (End User).
