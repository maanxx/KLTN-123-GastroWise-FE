# Coding Standards & Guidelines
## Tiêu chuẩn phát triển Frontend cho dự án GastroWise

Tài liệu này mở rộng thêm các quy tắc đã định nghĩa trong `.agents/AGENTS.md`, cung cấp chi tiết về cách tổ chức file và xử lý state trong Next.js.

### 1. Cấu trúc thư mục (Folder Structure)
- `src/app/`: Chứa các page routes, layout, loading, error (Next.js App Router).
- `src/components/`:
  - `ui/`: Các components nguyên thủy tái sử dụng (Button, Input, Modal, Card).
  - `layout/`: Navbar, Footer, Sidebar, Container.
  - `features/`: Các components phức tạp chứa logic nghiệp vụ (ví dụ: `MapViewer`, `ItineraryForm`).
- `src/lib/`:
  - `api/`: Các hàm gọi API chia theo domain (ví dụ: `restaurant.api.ts`, `auth.api.ts`).
  - `utils/`: Các hàm tiện ích (format tiền, ngày tháng, cn cho Tailwind).
  - `validation/`: Schema Zod dùng chung (loginSchema, searchSchema).
  - `constants/`: Biến dùng chung (Mã lỗi, routes path).
- `src/hooks/`: Các custom hooks (ví dụ: `useAuth.ts`, các hook bọc React Query như `useGetRestaurants.ts`).
- `src/stores/`: Zustand stores.
- `src/types/`: TypeScript definitions (`index.d.ts`, `api.types.ts`, `models.ts`).

### 2. Xử lý State với React Query
- Mọi thao tác lấy dữ liệu từ Server PHẢI dùng React Query. KHÔNG dùng `useEffect` kết hợp `useState` để fetch data thủ công.
- **Quy ước đặt tên Hook:**
  - GET: `useGet[Entity]s` (e.g., `useGetRestaurants`).
  - POST/PUT/DELETE: `use[Action][Entity]Mutation` (e.g., `useCreateReviewMutation`).
- Tách riêng lớp API config (Axios instance) và lớp React Query. Hook React Query sẽ gọi hàm từ lớp API.

### 3. Styling bằng Tailwind CSS
- Sử dụng hàm tiện ích `cn()` (clsx + tailwind-merge) để nối class động một cách an toàn mà không bị conflict specificity.
- Ví dụ:
  ```tsx
  import { cn } from "@/lib/utils";
  
  export function Button({ className, variant, ...props }) {
    return <button className={cn("base-classes", variant === "outline" && "border-black", className)} {...props} />
  }
  ```
- Định nghĩa màu chủ đạo trong `tailwind.config.ts` (ví dụ: primary, secondary, accent) để UI thống nhất. Không dùng mã màu HEX rải rác trong code.

### 4. Component Patterns
- **Server vs Client Components:**
  - Mặc định các page/layout là Server Components (`async function Page()`). Dùng để lấy dữ liệu tĩnh, SEO, giảm dung lượng JS gửi xuống client.
  - Chỉ thêm `'use client'` ở trên cùng file đối với các components cần tương tác (onClick, onChange), có dùng hooks (useState, useEffect, React Query), hoặc chứa trình duyệt API (window, localStorage).
- **Phân tách thông minh (Smart/Dumb components):** 
  - Smart (Container): Gọi data, quản lý state.
  - Dumb (Presenter): Chỉ nhận props và render UI, bắn sự kiện ngược lên qua callback.

### 5. Xử lý Lỗi (Error Handling)
- **API Errors:** Phải được catch và hiển thị thông báo thân thiện bằng Toast Notification (ví dụ: `react-hot-toast` hoặc thư viện tương tự).
- **Boundary Errors:** Sử dụng `error.tsx` của Next.js để bọc các lỗi render không mong muốn ở cấp độ Route.

### 6. Teamwork & Reusability (Zero-dependency orientation)
- **Hạn chế thư viện ngoài:** Không tùy tiện cài đặt thư viện mới (ví dụ: `antd`, `mui`, `lodash`) nếu JavaScript thuần hoặc TailwindCSS có thể giải quyết được, nhằm giữ cho web app nhẹ và mượt mà.
- **Tái sử dụng (DRY):** Các Component UI cơ bản (Button, Input, Form) PHẢI được thiết kế linh hoạt, dùng chung và lưu trong thư mục `src/components/ui/`.
- **Logic chung:** Gom các hàm xử lý chuỗi, ngày tháng vào `src/lib/utils/`. Team cần đọc thư mục này trước khi tự viết một hàm tương tự.
