# Product Requirements Document (PRD)
## Đề tài: Xây dựng hệ thống thông tin trải nghiệm ẩm thực thông minh (GastroWise)

### 1. Tổng quan dự án
GastroWise là một Website/Mobile App nhằm cung cấp trải nghiệm cá nhân hóa trong việc tìm kiếm, lựa chọn và thưởng thức ẩm thực. Hệ thống giúp người dùng dễ dàng tìm được quán ăn phù hợp với sở thích, ngân sách, và quỹ thời gian của bản thân, đồng thời tối ưu hóa lộ trình di chuyển.

### 2. Mục tiêu (Objectives)
- **Cho người dùng (Diners):** Dễ dàng tìm kiếm quán ăn, cá nhân hóa trải nghiệm, đề xuất lộ trình đi lại tối ưu nhất dựa trên vị trí, sở thích, ngân sách và thời gian.
- **Cho chủ nhà hàng/Nhà đầu tư:** Theo dõi hiệu quả của từng món ăn, xem các báo cáo thống kê, đánh giá từ cộng đồng (Review).
- **Hệ thống:** Phải tích hợp chức năng thông báo (notification), tối ưu lộ trình (Routing), tìm kiếm thông minh và thống kê.

### 3. Các chức năng chính (Core Features)
#### 3.1. Module Người dùng (User/Diner)
- **Nhập thông tin cá nhân hóa:** 
  - Sở thích món ăn (cuisine, tags).
  - Khoảng thời gian rảnh rỗi.
  - Ngân sách dự kiến.
- **Tối ưu hóa lộ trình (Routing & Itinerary):** 
  - Hệ thống tính toán và xuất ra lộ trình di chuyển tối ưu nhất (ngắn nhất/nhanh nhất) tới các địa điểm ẩm thực.
  - Tích hợp bản đồ (Google Maps API/Mapbox).
- **Tìm kiếm và tra cứu:** Tìm quán ăn theo tên, khu vực, đánh giá.
- **Cộng đồng (Community Review):** Viết review, đánh giá (rating), upload ảnh món ăn.

#### 3.2. Module Nhà đầu tư/Quản lý (Admin/Investor)
- **Dashboard Thống kê:** Hiển thị lượt xem, lượt review, đánh giá của từng món ăn/quán ăn.
- **Báo cáo (Reports):** Trích xuất báo cáo doanh thu/sự quan tâm của khách hàng.
- **Quản lý món ăn:** Thêm, sửa, xóa món ăn, cập nhật giá.

#### 3.3. Module Thông báo (Notification)
- Đẩy thông báo (Push notifications) khi có review mới, gợi ý món ăn hợp khẩu vị, hoặc nhắc nhở lộ trình.

### 4. Quy trình thực hiện (Dành cho Team)
1. Tìm hiểu thông tin về ẩm thực TP. Hồ Chí Minh.
2. Thu thập yêu cầu người dùng (Surveys).
3. Phân tích và thiết kế hệ thống phần mềm (Architecture, UI/UX).
4. Hiện thực hệ thống từ bản thiết kế (Code FE/BE).
5. Triển khai, chạy thử nghiệm, kiểm thử (Testing & Deployment), phân tích kết quả.

### 5. Chuẩn đầu ra (Deliverables)
- Một sản phẩm phần mềm (FE + BE) có tính khả thi trong thực tế.
- Báo cáo kỹ thuật về sản phẩm.
- Nắm vững công nghệ áp dụng và khả năng thuyết trình.
- Bài báo khoa học trẻ/bài báo IUH.
