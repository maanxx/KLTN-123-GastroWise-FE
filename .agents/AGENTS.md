# GastroWise FE — Agent Rules

## Dự án
- **Đề tài KLTN**: Hệ thống trải nghiệm ẩm thực thông minh (IUH)
- **Stack**: Next.js 14 App Router + TypeScript + TailwindCSS + React Query
- **Repo**: KLTN-123-GastroWise-FE (frontend cho người dùng cuối)

## Quy tắc bắt buộc

### Code Style
1. **Ngôn ngữ**: Comment bằng tiếng Việt, code bằng tiếng Anh
2. **Components**: PascalCase (`Button.tsx`, `ItineraryCard.tsx`)
3. **Hooks**: camelCase bắt đầu `use` (`useAuth.ts`, `useItinerary.ts`)
4. **Utils/Lib**: camelCase (`format.ts`, `cn.ts`)
5. **Types**: PascalCase cho interface/type (`User`, `Itinerary`)

### Import Order (ESLint enforced)
1. React / Next.js
2. Third-party libraries
3. `@/components`
4. `@/hooks`
5. `@/lib`
6. `@/types`
7. Relative imports

### Bảo mật (KHÔNG ĐƯỢC vi phạm)
1. **KHÔNG hardcode** URL, API key, token → dùng `process.env`
2. **KHÔNG tạo file** chứa dữ liệu thật (khách hàng, giá thật)
3. **Error handling**: Dùng `AppError` class từ `src/lib/errors/`
4. **Constants**: Import từ `src/lib/constants/`, KHÔNG khai báo rời rạc
5. **Mọi `.env`** phải có `.env.example` tương ứng (không chứa giá trị thật)
6. **KHÔNG cấu hình** CI/CD deploy public nếu chưa xác nhận

### Kiến trúc & Tái sử dụng (Tránh lan man)
1. **DRY (Don't Repeat Yourself)**: Bất kỳ UI nào dùng nhiều lần (VD: Nút, Input) PHẢI đặt ở `src/components/ui/`.
2. **Logic dùng chung**: Các hàm tính toán, format, xử lý ngày tháng đặt ở `src/lib/utils/`. Các custom hooks xử lý logic đặt ở `src/hooks/`.
3. **UI components** nhận props, KHÔNG gọi API trực tiếp.
4. **API calls**: qua hooks (`src/hooks/`) → API layer (`src/lib/api/`).
5. **Validation**: Zod schemas từ `src/lib/validation/`.
6. **Styling**: TailwindCSS + `cn()` utility, KHÔNG inline style.
7. **Types**: Mọi function/component phải có TypeScript types.

### Tối ưu hoá Assets & Hiệu năng (Production-ready)
1. **Hình ảnh**: 
   - Tuyệt đối KHÔNG dùng thẻ `<img>` thường. BẮT BUỘC dùng `<Image>` từ `next/image` để tự động tối ưu WebP/AVIF, lazy loading và chống Cumulative Layout Shift (CLS).
   - Hình tĩnh lưu tại thư mục `public/images/`. Không dùng link ngoài trừ khi cấu hình CDN.
2. **Icons**: 
   - Tuyệt đối KHÔNG dùng Emoji (🍲, 🥗) cho UI thật (trừ file markdown) vì gây rác DOM, lỗi hiển thị ở các máy cũ, và không chỉnh màu được.
   - BẮT BUỘC dùng thư viện **Lucide React** (`lucide-react`). SVG Icon giúp Tree-shaking (chỉ build icon nào dùng), giảm tải JS và render siêu nhanh.

### Làm việc nhóm & Clean Code (Quan trọng)
1. **Dễ đọc cho partner**: Code phải cực kỳ tường minh (clean code). Tên biến, tên hàm phải thể hiện rõ mục đích.
2. **Comment giải thích logic**: Bất kỳ đoạn logic phức tạp nào cũng phải có comment tiếng Việt ở trên để partner khác vào đọc hiểu ngay.
3. **Giữ cấu trúc gọn gàng**: Không phình to một component quá 300 lines. Nếu quá lớn, phải tách thành các sub-components.

### Commit Convention
- `feat:` tính năng mới
- `fix:` sửa bug
- `refactor:` refactor code
- `style:` format, không thay đổi logic
- `docs:` tài liệu
- `chore:` cấu hình, dependencies
