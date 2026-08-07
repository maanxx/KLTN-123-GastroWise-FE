---
name: gastrowise-fe
description: Skill chuyên biệt cho dự án GastroWise Frontend Customer — hệ thống trải nghiệm ẩm thực thông minh tại TP.HCM
---

# GastroWise Frontend Skill

## Tổng quan dự án
- **Đề tài**: Xây dựng hệ thống thông tin trải nghiệm ẩm thực thông minh
- **Đối tượng**: Người dùng cuối tại TP.HCM
- **Luồng chính**: Nhập sở thích → AI tạo lộ trình tối ưu → Xem chi tiết quán → Đánh giá
- **Đọc thêm**: `references/` folder cho API docs, design system, UI patterns

---

## 1. Quy tắc tạo Component

### 1.1 Phân loại component

| Loại | Folder | Đặc điểm | Ví dụ |
|------|--------|-----------|-------|
| **UI (Atomic)** | `src/components/ui/` | Tái sử dụng, không có business logic, nhận props | Button, Input, Card, Modal, Skeleton |
| **Feature** | `src/components/features/[module]/` | Chứa business logic UI, dùng hooks | PreferenceForm, ItineraryCard, RestaurantDetail |
| **Layout** | `src/components/layout/` | Cấu trúc trang | Navbar, Footer, Container, Sidebar |

### 1.2 Template tạo UI Component

```tsx
// src/components/ui/Button.tsx
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

// 1. Định nghĩa props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// 2. Dùng forwardRef cho ref forwarding
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200',
          // Variant
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          variant === 'ghost' && 'btn-ghost',
          // Size
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          // States
          (disabled || isLoading) && 'cursor-not-allowed opacity-50',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
```

### 1.3 Template tạo Feature Component

```tsx
// src/components/features/itinerary/ItineraryCard.tsx
'use client';

import { MapPin, Clock, Wallet } from 'lucide-react';

import { Card } from '@/components/ui';
import { cn, formatCurrency, formatDistance } from '@/lib/utils';
import type { Itinerary } from '@/types';

// 1. Props = data + optional callbacks
interface ItineraryCardProps {
  itinerary: Itinerary;
  onSelect?: (id: string) => void;
  className?: string;
}

// 2. Component CHỈ render, KHÔNG gọi API
export function ItineraryCard({ itinerary, onSelect, className }: ItineraryCardProps) {
  return (
    <Card
      className={cn('cursor-pointer hover:border-primary-300', className)}
      onClick={() => onSelect?.(itinerary.id)}
    >
      <h3 className="font-heading text-lg font-bold">{itinerary.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{itinerary.description}</p>

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
        <span className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {formatDistance(itinerary.totalDistance)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {itinerary.totalDuration} phút
        </span>
        <span className="flex items-center gap-1">
          <Wallet className="h-4 w-4" />
          {formatCurrency(itinerary.totalEstimatedCost)}
        </span>
      </div>
    </Card>
  );
}
```

---

## 2. Quy tắc API & Data Flow

### 2.1 Flow bắt buộc: Component → Hook → API → Mock/Real

```
ItineraryList (component)
  └── useItineraries() (hook)
       └── itineraryApi.getAll() (api layer)
            ├── MOCK_ITINERARIES (khi chưa có API)
            └── apiClient.get('/itineraries') (khi có API thật)
```

### 2.2 Template tạo API module mới

**Bước 1**: Thêm types vào `src/types/`
**Bước 2**: Thêm endpoints vào `src/lib/api/endpoints.ts`
**Bước 3**: Tạo API file

```typescript
// src/lib/api/itinerary.api.ts
import type { ApiResponse, Itinerary } from '@/types';

import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

// Flag: dùng mock khi chưa có API Gateway
const USE_MOCK = !process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const itineraryApi = {
  getAll: async (): Promise<ApiResponse<Itinerary[]>> => {
    if (USE_MOCK) {
      const { MOCK_ITINERARIES } = await import('@/lib/mock');
      return { success: true, data: MOCK_ITINERARIES };
    }
    return apiClient.get(API_ENDPOINTS.itinerary.list);
  },

  getById: async (id: string): Promise<ApiResponse<Itinerary>> => {
    if (USE_MOCK) {
      const { MOCK_ITINERARIES } = await import('@/lib/mock');
      const item = MOCK_ITINERARIES.find((i) => i.id === id)!;
      return { success: true, data: item };
    }
    return apiClient.get(API_ENDPOINTS.itinerary.detail(id));
  },
};
```

**Bước 4**: Thêm query key vào `src/lib/constants/query-keys.ts`
**Bước 5**: Tạo hook

```typescript
// src/hooks/useItinerary.ts
import { useQuery } from '@tanstack/react-query';

import { itineraryApi } from '@/lib/api/itinerary.api';
import { QUERY_KEYS } from '@/lib/constants';

export function useItineraries() {
  return useQuery({
    queryKey: QUERY_KEYS.itinerary.all,
    queryFn: itineraryApi.getAll,
    select: (res) => res.data, // Tự unwrap ApiResponse
  });
}

export function useItinerary(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.itinerary.detail(id),
    queryFn: () => itineraryApi.getById(id),
    select: (res) => res.data,
    enabled: !!id, // Chỉ fetch khi có id
  });
}
```

---

## 3. Quy tắc Form & Validation

### Luôn dùng: react-hook-form + Zod + @hookform/resolvers

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input } from '@/components/ui';
import { loginSchema, type LoginInput } from '@/lib/validation';

export function LoginForm({ onSubmit }: { onSubmit: (data: LoginInput) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Mật khẩu"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Đăng nhập
      </Button>
    </form>
  );
}
```

---

## 4. Quy tắc tạo Page (Next.js App Router)

### 4.1 Server Component (mặc định)

```tsx
// src/app/(main)/itinerary/page.tsx
import type { Metadata } from 'next';

import { ItineraryList } from '@/components/features/itinerary/ItineraryList';

// SEO metadata
export const metadata: Metadata = {
  title: 'Lộ trình đề xuất',
  description: 'Danh sách lộ trình ẩm thực được AI tạo dựa trên sở thích của bạn',
};

// Server Component — không cần 'use client'
export default function ItineraryPage() {
  return (
    <div className="container-app py-8">
      <h1 className="font-heading text-3xl font-bold">Lộ trình đề xuất</h1>
      <p className="mt-2 text-slate-500">Chọn lộ trình phù hợp với bạn</p>
      <div className="mt-8">
        <ItineraryList />
      </div>
    </div>
  );
}
```

### 4.2 Loading state

```tsx
// src/app/(main)/itinerary/loading.tsx
import { Skeleton } from '@/components/ui';

export default function ItineraryLoading() {
  return (
    <div className="container-app py-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-2 h-4 w-96" />
      <div className="mt-8 grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
```

---

## 5. Design System — Chi tiết

### 5.1 Colors

| Token | Hex | Dùng cho |
|-------|-----|----------|
| `primary-500` | `#f97316` | CTA buttons, links, active states |
| `primary-50` | `#fff7ed` | Hover backgrounds |
| `secondary-500` | `#14b8a6` | Secondary actions, badges |
| `accent-500` | `#f59e0b` | Ratings, highlights, stars |
| `slate-900` | `#0f172a` | Body text (light mode) |
| `slate-50` | `#f8fafc` | Body text (dark mode) |

### 5.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| h1 | Plus Jakarta Sans | 800 | text-4xl (36px) |
| h2 | Plus Jakarta Sans | 700 | text-3xl (30px) |
| h3 | Plus Jakarta Sans | 700 | text-xl (20px) |
| body | Inter | 400 | text-base (16px) |
| caption | Inter | 400 | text-sm (14px) |

### 5.3 Spacing

- Section padding: `py-16 lg:py-24`
- Card padding: `p-6`
- Gap between items: `gap-4` (cards), `gap-2` (inline)
- Container: `container-app` (max-w-7xl, px-4 sm:px-6 lg:px-8)

### 5.4 Component Style Patterns

- **Cards**: `rounded-2xl border shadow-sm hover:shadow-md transition-all`
- **Buttons**: `rounded-xl` với gradient cho primary
- **Inputs**: `rounded-xl border` với focus ring primary
- **Modals**: `glass-card` (glassmorphism)
- **Badges**: `rounded-full px-3 py-1 text-xs font-medium`

### 5.5 Animation Patterns

- **Page enter**: `animate-fade-in` hoặc Framer Motion `initial={{ opacity: 0, y: 20 }}`
- **Card hover**: `hover:shadow-md hover:-translate-y-1 transition-all duration-300`
- **Button press**: `active:scale-[0.98]`
- **Loading**: `shimmer` class hoặc `Skeleton` component
- **Stagger children**: Framer Motion `staggerChildren: 0.1`

---

## 6. Quy tắc Error Handling

### Trong component

```tsx
import { ERROR_MESSAGES } from '@/lib/errors';

// Hiển thị lỗi cho user
if (error) {
  return <ErrorDisplay message={error.message || ERROR_MESSAGES.SERVER} />;
}
```

### Trong API call (đã xử lý bởi interceptor)

```typescript
// Interceptor tự động:
// - 401 → redirect /login + xoá token
// - 429 → throw AppError(429, 'Quá nhiều yêu cầu...')
// - 500 → throw AppError(500, 'Lỗi hệ thống...')
// Không cần try-catch ở mỗi API function
```

### Trong logic phức tạp

```typescript
import { tryCatch } from '@/lib/errors';

const [data, error] = await tryCatch(() => itineraryApi.generate(preferences));
if (error) {
  if (error.isAuthError()) router.push('/login');
  else toast.error(error.message);
  return;
}
// Sử dụng data an toàn
```

---

## 7. Khi tích hợp API thật

Khi có API Gateway URL:

1. Thêm URL vào `.env.local`: `NEXT_PUBLIC_API_GATEWAY_URL=https://api.gastrowise.com`
2. Biến `USE_MOCK` trong các file `*.api.ts` tự động = `false`
3. Mock data không bị xoá, vẫn dùng cho test
4. **KHÔNG cần sửa** component hay hook — chỉ API layer thay đổi
