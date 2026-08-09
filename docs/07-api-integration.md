# API Integration Guide (Zustand + React Query + Axios)

Tài liệu này hướng dẫn cách gọi API chuẩn xác nhất trong dự án GastroWise FE.

## 1. Cấu trúc nền tảng (Đã được setup)
- **Axios Client (`src/lib/api/axiosClient.ts`)**: 
  - Đã được nhúng sẵn Base URL lấy từ biến môi trường `NEXT_PUBLIC_API_GATEWAY_URL`.
  - Tự động lấy token từ `localStorage` và gắn vào header `Authorization: Bearer <token>` trước mỗi request.
  - Tự động bắt lỗi HTTP 401 (Token hết hạn hoặc sai), tự động xoá token và đẩy user về trang login.
- **React Query (`src/providers/QueryProvider.tsx`)**: Đã bọc ứng dụng để quản lý Server State, tự động retry 2 lần nếu rớt mạng.

## 2. Quy trình viết tính năng gọi API

### Bước 1: Viết API Call bằng Axios
Luôn tạo các file tương ứng trong thư mục `src/lib/api/` (ví dụ `restaurant.api.ts`, `auth.api.ts`).
**KHÔNG gọi Axios trực tiếp trong React Component.**

```typescript
// src/lib/api/restaurant.api.ts
import { axiosClient } from './axiosClient';
import type { Restaurant } from '@/types';

// API Fetch danh sách quán ăn
export const getRestaurants = async (params?: { category?: string; search?: string }) => {
  // axiosClient sẽ tự động trả về data bên trong, ta chỉ cần ép kiểu
  return axiosClient.get<any, Restaurant[]>('/restaurants', { params });
};
```

### Bước 2: Bọc API Call bằng Custom Hook React Query
Luôn tạo file ở thư mục `src/hooks/` hoặc gom nhóm theo feature (ví dụ `src/hooks/queries/useRestaurantQueries.ts`).
- Dùng `useQuery` cho việc ĐỌC data (GET).
- Dùng `useMutation` cho việc GHI/SỬA/XÓA data (POST, PUT, DELETE).

```typescript
// src/hooks/queries/useRestaurants.ts
import { useQuery } from '@tanstack/react-query';
import { getRestaurants } from '@/lib/api/restaurant.api.ts';

export const useRestaurants = (params?: { category?: string }) => {
  return useQuery({
    queryKey: ['restaurants', params], // Key phải là mảng và chứa các biến phụ thuộc
    queryFn: () => getRestaurants(params),
  });
};
```

### Bước 3: Sử dụng ở Component
Bây giờ ở giao diện, bạn chỉ việc gọi custom hook một cách sạch sẽ:

```tsx
'use client';
import { useRestaurants } from '@/hooks/queries/useRestaurants';

export function RestaurantList() {
  const { data: restaurants, isLoading, isError } = useRestaurants({ category: 'asian' });

  if (isLoading) return <div>Đang tải danh sách quán ăn...</div>;
  if (isError) return <div>Đã xảy ra lỗi khi tải dữ liệu!</div>;

  return (
    <ul>
      {restaurants?.map(r => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
```

## 3. Quản lý Local State với Zustand
Nếu dữ liệu thuộc về Server, hãy dùng React Query như trên.
Chỉ dùng Zustand cho các dữ liệu UI thuần túy hoặc dữ liệu cần lưu xuyên suốt ứng dụng nhưng hiếm khi thay đổi (ví dụ: Thông tin User đăng nhập, Trạng thái Sidebar, form nhập dở lộ trình).

```typescript
// src/stores/useAuthStore.ts
import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```
