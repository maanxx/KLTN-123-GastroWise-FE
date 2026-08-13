# Feature Breakdown & Implementation Guide
## Phân rã tính năng để thực thi (dành cho Developer & AI)

Dựa trên PRD, đây là danh sách các module cần thực thi cùng với hướng dẫn để AI và Dev team triển khai. Khi nhận task, AI hãy tick [x] vào các hạng mục đã hoàn thành hoặc tham chiếu đến tài liệu này.

### Module 1: Trang chủ & Xác thực (Home & Auth)
- [ ] **Trang chủ (Landing Page):** Giới thiệu hệ thống, thanh tìm kiếm nhanh, danh sách quán ăn nổi bật/đánh giá cao (Top rated).
- [ ] **Đăng nhập/Đăng ký:** Form có validate (Zod + RHF). Xử lý lưu JWT token an toàn, lưu thông tin user vào global store (Zustand).

### Module 6: Hồ sơ cá nhân (Profile) - ĐÃ TÍCH HỢP BE
- [x] **Trang Hồ sơ (`/profile`)**: Hiển thị thông tin người dùng, cài đặt, và **đặc biệt là Thống kê Eco** (Lượng CO2 tiết kiệm được, số km di chuyển tối ưu). 

## Module 2: Khám phá & Gợi ý (Explore & Recommend) - ĐÃ TÍCH HỢP BE
- [x] **Trang Khám phá (`/explore`)**: Giao diện hiển thị danh sách bộ sưu tập và quán ăn theo dạng thẻ, tích hợp bộ lọc.
- [x] **Trang Chi tiết Quán ăn (`/restaurant/[id]`)**: Hiển thị thông tin chi tiết (ảnh, địa chỉ, rating, menu, đánh giá).
- [x] **Trang Lên Lộ trình AI (`/ai-planner`)**: Chatbox tương tác kiểu AI, gợi ý nhà hàng và tự động tạo chuyến đi.
  - *Luồng hoạt động (Workflow)*:
    1. Người dùng nhập câu lệnh (prompt) e.g., "Gợi ý quán chay quận 1 giá rẻ".
    2. FE gọi API `POST /itineraries/generate` với payload chứa `prompt`.
    3. BE nhận request, trích xuất từ khóa (keyword extraction: "chay", "quận 1", "giá rẻ").
    4. BE truy vấn Database (`restaurants`) dựa trên từ khóa để tìm các quán ăn phù hợp.
    5. BE tạo một Lộ trình (Itinerary) với các quán ăn (ItineraryStops) này và lưu vào DB.
    6. BE trả về ID của Itinerary vừa tạo.
    7. FE nhận được ID, chuyển hướng (redirect) người dùng sang trang chi tiết lộ trình (`/itinerary/:id`).

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
