# GastroWise Frontend - UI Architecture & Components Map

Tài liệu này ghi chép lại toàn bộ cấu trúc thư mục, các Components đã được xây dựng và đường dẫn của chúng. 
Mục đích: Giúp AI (hoặc các lập trình viên khác) trong các phiên làm việc sau nắm bắt nhanh chóng trạng thái dự án Giai đoạn 1 (UI/UX) và tiếp tục phát triển (Gắn API, Logic).

## 1. Cấu trúc thư mục cốt lõi (Core Structure)
Dự án sử dụng Next.js 14 (App Router) với cấu trúc phân tách rõ ràng:
- `src/app/`: Chứa các file định tuyến (Routing) và Pages.
- `src/components/ui/`: Các Component dùng chung, nhỏ lẻ (Design System).
- `src/components/features/`: Các Component lớn, chia theo từng nghiệp vụ (Domain-driven).
- `src/components/layout/`: Các Component bố cục (Navbar, Footer).
- `src/lib/`: Các hàm tiện ích, cấu hình, dữ liệu giả (Mock data).
- `src/stores/`: Quản lý State toàn cục (Zustand).

## 2. Design System & UI Components (`src/components/ui/`)
- `Button.tsx`: Nút bấm đa năng (Primary, Secondary, Ghost).
- `Input.tsx`: Ô nhập liệu chuẩn.
- `Card.tsx`: Khối giao diện nền trắng, bo góc, có shadow.
- `Badge.tsx`: Nhãn dán nhỏ (vd: Thể loại món ăn).
- `Skeleton.tsx`: Hiệu ứng nhấp nháy khi tải dữ liệu.
*(Tất cả đều tuân thủ màu Emerald/Amber theo chuẩn Green Environment).*

## 3. Các Trang Giao Diện (Pages & Features)

### M5: Landing Page (Trang chủ)
- **Đường dẫn**: `src/app/(main)/page.tsx`
- **Components liên quan** (`src/components/features/landing/`):
  - `HeroSection.tsx`: Banner lớn đầu trang.
  - `FeaturesSection.tsx`: Giới thiệu 3 tính năng cốt lõi.
  - `HowItWorksSection.tsx`: Hướng dẫn 4 bước tạo lộ trình.

### M6: Authentication (Đăng nhập / Đăng ký)
- **Đường dẫn**: `src/app/(auth)/login/page.tsx` và `/register/page.tsx`
- **Đặc điểm**: Layout chia đôi màn hình (Split screen), sử dụng `zod` và `react-hook-form` để validate form.

### M7: Preferences Wizard (Form khảo sát sở thích)
- **Đường dẫn**: `src/app/(main)/preferences/page.tsx`
- **State**: Được quản lý bởi Zustand tại `src/stores/usePreferenceStore.ts`.
- **Components liên quan** (`src/components/features/preferences/`):
  - Khảo sát 4 bước: `CuisineStep.tsx`, `TimeStep.tsx`, `BudgetStep.tsx`, `OptionsStep.tsx`.
  - Sử dụng `framer-motion` để tạo hiệu ứng chuyển bước mượt mà.

### M8: Itinerary (Lộ trình ẩm thực)
- **Danh sách lộ trình**: `src/app/(main)/itinerary/page.tsx`
  - Render thẻ `ItineraryCard.tsx`.
- **Chi tiết lộ trình**: `src/app/(main)/itinerary/[id]/page.tsx`
  - Render `ItineraryTimeline.tsx`: Hiển thị dọc các điểm đến và khoảng cách di chuyển.
- **Mock Data**: `src/lib/mock/itinerary.ts`.

### M9: Restaurant (Chi tiết quán ăn)
- **Đường dẫn**: `src/app/(main)/restaurant/[id]/page.tsx`
- **Components liên quan** (`src/components/features/restaurant/`):
  - `RestaurantHero.tsx`: Ảnh bìa lớn trên cùng.
  - `RestaurantInfo.tsx`: Card thông tin giờ mở cửa, địa chỉ (Sticky Sidebar).
  - `RestaurantMenu.tsx`: Thực đơn nổi bật.
  - `RestaurantReviews.tsx`: Đánh giá của khách hàng.
- **Mock Data**: `src/lib/mock/restaurant.ts`.

### M10: Smart Experience (Khám phá & AI)
- **Khám phá**: `src/app/(main)/explore/page.tsx` (Thanh tìm kiếm, bộ lọc món ăn).
- **Hồ sơ & Thống kê**: `src/app/(main)/profile/page.tsx` (Thống kê số km di chuyển đã tiết kiệm).
- **GastroBot (AI Chat)**: `src/components/features/ai/AiChatWidget.tsx` (Nút chat AI lơ lửng góc phải).

### M11: Global UI Polish (Hoàn thiện trải nghiệm)
- **404 Not Found**: `src/app/not-found.tsx`
- **Global Loading**: `src/app/loading.tsx`
- **Trang Yêu thích**: `src/app/(main)/favorites/page.tsx`

## 4. Ghi chú cho Giai đoạn tiếp theo (Tích hợp API)
- Khi có API thật từ Backend, cần thay thế dữ liệu trong các file `src/lib/mock/` bằng React Query (thư mục `src/lib/api/` đã được chuẩn bị sẵn).
- Hình ảnh hiện tại dùng `next/image` với cấu hình Cloudinary (`res.cloudinary.com`) trong `next.config.mjs`. Bắt buộc phải giữ chuẩn này để tối ưu tốc độ load.

## 5. Định hướng phát triển mở rộng (Advanced UI Phase)
Được ghi chú để triển khai trên một nhánh Git mới (nhằm hỗ trợ tích hợp AI sâu hơn):
1. **Trang AI Planner Độc lập (`/ai-planner`)**: Nâng cấp từ Chat Widget lên một trang toàn màn hình chuyên dụng để tương tác với AI (Giao diện giống ChatGPT hoặc Perplexity). Cho phép người dùng nhập Prompt phức tạp để tìm thức ăn.
2. **UI Viết Đánh Giá (Review Modal)**: Chức năng upload ảnh, chọn số sao (1-5) sau khi trải nghiệm quán ăn xong (UGC - User Generated Content).
3. **UI Xác nhận Đặt bàn (Booking Modal)**: Màn hình nhập số lượng người, ngày, giờ khi bấm vào nút "Đặt bàn ngay" ở trang Chi tiết Quán ăn.
