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

### Kiến trúc
1. **UI components** nhận props, KHÔNG gọi API trực tiếp
2. **API calls**: qua hooks (`src/hooks/`) → API layer (`src/lib/api/`)
3. **Validation**: Zod schemas từ `src/lib/validation/`
4. **Styling**: TailwindCSS + `cn()` utility, KHÔNG inline style
5. **Mock data**: Đặt trong `src/lib/mock/`, dùng khi chưa có API thật
6. **Types**: Mọi function/component phải có TypeScript types

### Commit Convention
- `feat:` tính năng mới
- `fix:` sửa bug
- `refactor:` refactor code
- `style:` format, không thay đổi logic
- `docs:` tài liệu
- `chore:` cấu hình, dependencies
