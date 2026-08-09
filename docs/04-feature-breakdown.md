# Feature Breakdown & Implementation Guide
## Phân rã tính năng để thực thi (dành cho Developer & AI)

Dựa trên PRD, đây là danh sách các module cần thực thi cùng với hướng dẫn để AI và Dev team triển khai. Khi nhận task, AI hãy tick [x] vào các hạng mục đã hoàn thành hoặc tham chiếu đến tài liệu này.

### Module 1: Trang chủ & Xác thực (Home & Auth)
- [ ] **Trang chủ (Landing Page):** Giới thiệu hệ thống, thanh tìm kiếm nhanh, danh sách quán ăn nổi bật/đánh giá cao (Top rated).
- [ ] **Đăng nhập/Đăng ký:** Form có validate (Zod + RHF). Xử lý lưu JWT token an toàn, lưu thông tin user vào global store (Zustand).

### Module 2: Trải nghiệm người dùng (Diners)
- [ ] **Quản lý Hồ sơ (Profile):** Cập nhật thông tin cá nhân, cài đặt Sở thích Ẩm thực (Cuisine preferences).
- [ ] **Tính năng Tối ưu Lộ trình (Core Feature):**
  - Giao diện (UI): Form chọn [Vị trí bắt đầu], [Bán kính], [Sở thích], [Thời gian (Từ - Đến)], [Ngân sách].
  - Hiển thị Lộ trình (Itinerary View): Danh sách các điểm đến theo thứ tự (Timeline), hiển thị tổng thời gian và khoảng cách.
  - Tích hợp Bản đồ: Render Google Map, đặt Markers (Điểm đi, Điểm đến 1, Điểm đến 2), vẽ Polyline đường đi nối các điểm.
- [ ] **Khám phá Quán ăn (Explore/Search):**
  - Thanh tìm kiếm (Search bar) tích hợp debounce.
  - Bộ lọc (Filters): Theo giá, loại món, số sao đánh giá, khoảng cách.
  - Danh sách dạng Card (Infinity Scroll hoặc Pagination).
- [ ] **Chi tiết Quán ăn (Restaurant Detail):**
  - Hiển thị thông tin cơ bản: Tên, ảnh, địa chỉ, giờ mở cửa, menu nổi bật.
  - Tính năng Community: Xem review, Rating trung bình, Nút "Viết đánh giá", Upload ảnh review.
  - Nút hành động: "Lưu vào Yêu thích", "Chỉ đường".

### Module 3: Quản lý & Chủ nhà hàng (Admin/Investor Dashboard)
- [ ] **Dashboard Tổng quan:** Biểu đồ (Charts) thống kê lượt truy cập, lượt tìm kiếm lộ trình có đi qua quán, đánh giá trung bình. (Có thể dùng Recharts hoặc Chart.js).
- [ ] **Quản lý Danh mục (CRUD):** Giao diện dạng Bảng (Table) để Admin quản lý Danh sách Quán ăn, Món ăn, Người dùng, Review (ẩn/xóa review xấu vi phạm).
- [ ] **Báo cáo (Reports):** Xuất báo cáo hiệu quả dưới dạng danh sách/bảng, có nút Export (CSV/PDF).

### Module 4: Tính năng bổ trợ
- [ ] **Notifications:** Bell icon góc phải trên cùng. Hiển thị danh sách thông báo. Cấu hình WebSocket/SSE (Server-Sent Events) hoặc Polling đơn giản để nhận thông báo thời gian thực (nếu BE hỗ trợ).

### Hướng dẫn cách prompt AI (Cho người dùng)
Khi muốn làm một tính năng, bạn có thể nói với AI:
*"Triển khai tính năng Tối ưu Lộ trình trong Module 2. Đọc kỹ file `02-architecture-design.md` phần luồng xử lý trước khi làm. Hãy tạo ra các component form và map."*
AI sẽ tự động tuân thủ cấu trúc thư mục từ file số `03` và thiết kế luồng data chuẩn xác.
