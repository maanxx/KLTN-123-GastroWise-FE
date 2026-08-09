# Security, Docker & Environment Variables Setup
## Hướng dẫn bảo mật và cấu hình kết nối

Tài liệu này quy định cách bảo mật hạ tầng và cấu hình `.env` để FE giao tiếp an toàn với hệ thống Microservices.

### 1. Nguyên tắc Bảo mật Hạ tầng (Docker & Network)
- **Chỉ mở Port của API Gateway:** Các service bên trong (Auth, Restaurant, Postgres, Redis) KHÔNG được map port ra host machine (không dùng `ports: - "5432:5432"` trên production unless debugging).
- **Docker Network:** Tạo một `backend-network` kiểu bridge. Các container giao tiếp với nhau bằng Tên Container (Container Name) thay vì IP.
  - Ví dụ: `http://auth-service:3001` thay vì `http://localhost:3001`.
- **CORS:** API Gateway cấu hình CORS chỉ cho phép domain của FE truy cập (ví dụ: `https://gastrowise.com`).

### 2. Bảo mật ở tầng Frontend (FE)
- **Bảo vệ JWT Token:**
  - **KHÔNG LƯU** Access Token và Refresh Token trong `localStorage` để tránh lỗ hổng XSS (Cross-Site Scripting).
  - **BẮT BUỘC LƯU** vào `HttpOnly`, `Secure`, `SameSite=Strict` Cookies thông qua BE khi đăng nhập. FE sẽ tự động gửi cookie này ở mỗi request axios (cấu hình `withCredentials: true`).
- **CSRF (Cross-Site Request Forgery):** Cấu hình thêm cơ chế CSRF token trên BE nếu dùng Cookie.
- **Ẩn API Keys:** Bất kỳ key nào của bên thứ 3 (Google Maps API) đều phải hạn chế HTTP Referrers trên Google Cloud Console (chỉ cho phép domain FE gọi).

### 3. Cấu hình biến môi trường (.env)

#### 3.1. Frontend `.env`
Frontend chỉ cần biết duy nhất địa chỉ của API Gateway.
```env
# URL trỏ tới API Gateway
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Key bản đồ (nếu gọi từ client)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSy...
```

#### 3.2. Backend `.env` (Ví dụ cho các Services)
Mỗi service nên có file `.env` riêng biệt, hoặc quản lý tập trung qua `docker-compose.yml`.

**API Gateway (`.env`)**
```env
PORT=8000
AUTH_SERVICE_URL=http://auth-service:3001
RESTAURANT_SERVICE_URL=http://restaurant-service:3002
```

**Auth Service (`.env`)**
```env
PORT=3001
# Kết nối Postgres trong Docker network
DATABASE_URL=postgres://user:password@postgres-db:5432/auth_db
# Kết nối Redis
REDIS_URL=redis://redis-cache:6379

JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

**Restaurant Service (`.env`)**
```env
PORT=3002
DATABASE_URL=postgres://user:password@postgres-db:5432/restaurant_db
```

### 4. Checklist khi khởi tạo
1. [ ] Chắc chắn FE chỉ gọi tới `NEXT_PUBLIC_API_URL`.
2. [ ] Các API call từ FE sử dụng thư viện `axios` đã được config `withCredentials: true`.
3. [ ] Chạy lệnh `docker-compose up -d` để khởi động Redis, Postgres, và các Services BE.
4. [ ] Kiểm tra API Gateway đã nhận request và proxy đúng xuống các service chưa.
