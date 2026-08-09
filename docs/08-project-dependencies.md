# Quản lý Tools & Libraries
## Danh sách các thư viện và công cụ đang sử dụng trong dự án

Tài liệu này giúp team (và AI) theo dõi tất cả các thư viện đã được cài đặt vào dự án, mục đích sử dụng để tránh việc cài đặt trùng lặp các thư viện có cùng chức năng. 

**Quy tắc (Rule):** Bất cứ khi nào cài đặt hoặc quyết định sử dụng một thư viện mới, **BẮT BUỘC** phải ghi chép lại vào file này.

### Frontend (GastroWise-FE)
- **Framework & Core:**
  - `next` (v14): Core framework (App Router).
  - `react`, `react-dom` (v18): UI library.
  - `typescript`: Type checking.

- **UI & Styling:**
  - `tailwindcss`: Utility-first CSS framework.
  - `lucide-react`: Bộ icon chuẩn, nhẹ, hỗ trợ tree-shaking.
  - `clsx`, `tailwind-merge`: Tiện ích gộp class Tailwind an toàn (dùng trong `cn` function).
  - `framer-motion`: Thư viện tạo animation mượt mà (dùng cho các hiệu ứng transition).

- **Quản lý Form & Validation:**
  - `react-hook-form`: Xử lý form state nhẹ, không re-render toàn component.
  - `zod`: Định nghĩa schema và validate dữ liệu (Dùng chung với hook form qua `@hookform/resolvers`).

- **Data Fetching & State Management:**
  - `axios`: HTTP Client để gọi API.
  - `@tanstack/react-query`: Quản lý Server State (cache, retry, refetch data).
  - `zustand`: Quản lý Global Client State (lưu thông tin user, UI state nhỏ).

### Backend (GastroWise-BE) - Tham chiếu
- `express`: Web framework.
- `pg`: Thư viện kết nối PostgreSQL.
- `PostGIS`: Extension của PostgreSQL để query và tính toán không gian (Spatial/Geolocation) cho AI Planner.
- `jsonwebtoken`: Tạo và verify JWT token.
- `bcryptjs`: Hash mật khẩu.
- `cors`, `dotenv`, `morgan`: Các middleware cơ bản.
