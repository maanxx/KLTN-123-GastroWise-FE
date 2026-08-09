# Microservices Architecture Breakdown
## Phân chia Module & Giao tiếp (Backend)

Hệ thống GastroWise BE được chia thành 6 Microservices độc lập, chạy trong các container Docker riêng biệt.

### 1. API Gateway Service
- **Vai trò:** Là điểm chạm (entry point) duy nhất cho toàn bộ các request từ Frontend. Không xử lý logic nghiệp vụ.
- **Nhiệm vụ:**
  - Route các request: `/api/auth/*` -> Auth Service, `/api/restaurants/*` -> Restaurant Service.
  - Cắt giảm CORS issues (FE chỉ gọi duy nhất 1 domain của Gateway).
  - Rate Limiting chống spam/DDoS.
  - (Tùy chọn) Xác thực sơ bộ Token (nhưng tốt nhất đẩy xuống Auth Service).

### 2. Auth & User Service
- **Công nghệ đề xuất:** Node.js/Go, PostgreSQL (Lưu user), Redis.
- **Nhiệm vụ:**
  - Xử lý Đăng ký, Đăng nhập, Quên mật khẩu.
  - Cấp phát JWT Access Token và Refresh Token.
  - Lưu Refresh Token/Session đang active vào Redis để dễ dàng thu hồi (Revoke).
  - Quản lý thông tin cá nhân (Profile, Sở thích ẩm thực).

### 3. Restaurant & Menu Service
- **Công nghệ đề xuất:** Node.js/Go, PostgreSQL.
- **Nhiệm vụ:**
  - CRUD thông tin quán ăn, thực đơn, giá cả, thời gian mở cửa.
  - API tìm kiếm quán ăn (có thể dùng Full-Text Search của Postgres hoặc ElasticSearch sau này).

### 4. Itinerary & Routing Service (Core Engine)
- **Công nghệ đề xuất:** Python (vì mạnh về thuật toán) hoặc Node.js, PostgreSQL (Lưu lộ trình đã tạo), Redis.
- **Nhiệm vụ:**
  - Nhận input từ user: vị trí, sở thích, ngân sách, thời gian.
  - Fetch dữ liệu quán ăn từ *Restaurant Service* (giao tiếp nội bộ).
  - Chạy thuật toán tối ưu (Traveling Salesperson) kết hợp Google Matrix API.
  - Dùng Redis để Cache kết quả các lộ trình phổ biến để giảm tải tính toán.

### 5. Review & Rating Service
- **Công nghệ đề xuất:** Node.js, PostgreSQL.
- **Nhiệm vụ:**
  - Cho phép người dùng đánh giá, bình luận quán ăn/món ăn.
  - Tính điểm trung bình (Rating average).
  - Tách riêng ra để tránh làm nặng bảng Restaurant khi lượng review tăng đột biến.

### 6. Notification Service
- **Công nghệ đề xuất:** Node.js, Redis (Pub/Sub) hoặc Message Queue (RabbitMQ).
- **Nhiệm vụ:**
  - Bắn thông báo (Push/Email) khi có ai đó phản hồi review, nhắc nhở lộ trình sắp tới.

### 7. Giao tiếp nội bộ (Inter-service Communication)
- **Đồng bộ (Synchronous):** Sử dụng gRPC hoặc REST API chuẩn qua mạng nội bộ Docker (Docker Bridge Network) để các service gọi data lẫn nhau (ví dụ: Itinerary Service gọi Restaurant Service lấy danh sách quán).
- **Bất đồng bộ (Asynchronous):** Dùng Message Queue (RabbitMQ) cho các tác vụ không cần chờ kết quả ngay (ví dụ: Gửi email đăng ký thành công qua Notification Service).
