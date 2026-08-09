# Architecture Design
## Hệ thống GastroWise (FE & BE)

### 1. High-Level Architecture
GastroWise được thiết kế theo kiến trúc **Microservices** để đảm bảo khả năng mở rộng (scalability) và chịu lỗi tốt.
- **Client (Frontend):** Ứng dụng web Next.js giao tiếp với duy nhất một điểm đầu vào là API Gateway.
- **API Gateway:** Điều phối requests từ FE xuống các service nhỏ hơn, xử lý Rate Limiting và Load Balancing.
- **Microservices (Backend):** Hệ thống phân tán với các dịch vụ độc lập: Auth, User, Restaurant, Itinerary, Review, Notification. (Xem chi tiết tại `05-microservices-architecture.md`).

### 2. Frontend Tech Stack (KLTN-123-GastroWise-FE)
- **Framework:** Next.js 14+ (App Router) để tận dụng SSR (Server-Side Rendering) giúp SEO tốt và CSR (Client-Side Rendering) cho tính năng tương tác nhanh.
- **Ngôn ngữ:** TypeScript (Strict Mode) để đảm bảo type safety.
- **Styling:** TailwindCSS cho layout, có thể kết hợp Shadcn/UI (hoặc Radix UI) để tạo components chuẩn Accessibilty nhanh chóng.
- **State Management:**
  - *Server State (API Cache/Sync):* React Query (@tanstack/react-query) để fetch, cache, và update data.
  - *Client State (Local UI State):* Zustand cho các global state nhỏ (ví dụ: theme, form lộ trình đang nhập dở) vì nó nhẹ hơn Redux.
- **Routing:** Built-in Next.js App Router (`src/app/`).
- **Bản đồ:** Google Maps API (hoặc Mapbox GL JS) cho chức năng hiển thị và vẽ đường đi (routing).
- **Form & Validation:** React Hook Form kết hợp với Zod.

### 3. API Communication Pattern
- Giao tiếp với BE qua chuẩn RESTful API.
- Định dạng dữ liệu: JSON.
- **Authentication:** Sử dụng JWT (JSON Web Tokens). Lưu Access Token trong bộ nhớ (hoặc secure HttpOnly cookie tùy setup BE), Refresh Token lưu trong HttpOnly cookie.
- Base URL API cấu hình trong `.env`: `NEXT_PUBLIC_API_URL`
- Interceptor: Sử dụng Axios interceptor để tự động đính kèm Bearer Token vào headers ở mọi request yêu cầu xác thực, đồng thời tự động refresh token khi token hết hạn (mã lỗi 401).

### 4. Luồng xử lý Tối ưu lộ trình (Routing Algorithm Flow)
1. **Input:** Người dùng nhập [Vị trí hiện tại], [Sở thích: Á, Âu, Chay...], [Ngân sách], [Thời gian khả dụng].
2. **FE Xử lý:** Zod validate form, gửi payload qua POST API `/api/v1/itinerary/optimize`.
3. **BE Xử lý:** Truy vấn cơ sở dữ liệu để lọc các nhà hàng thỏa mãn tiêu chí (khoảng cách, giá, thời gian mở cửa). Áp dụng thuật toán TSP (Traveling Salesperson Problem) hoặc Google Directions API Matrix để tìm đường đi tối ưu nhất nối các điểm.
4. **Output:** BE trả về một mảng danh sách địa điểm theo thứ tự tối ưu + Polyline/Waypoints.
5. **FE Render:** Vẽ danh sách địa điểm lên danh sách (List view) và bản đồ (Map view).

### 5. Deployment
- **Frontend:** Deploy lên Vercel để tận dụng tối đa Next.js Edge Cache.
- **CI/CD:** GitHub Actions tự động kiểm tra lint (`npm run lint`), build (`npm run build`) trước khi merge vào nhánh `main`.
