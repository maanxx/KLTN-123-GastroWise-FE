'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

/**
 * React Query Provider — wrap app để dùng useQuery, useMutation
 * Cấu hình retry, stale time, error handling mặc định
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Dữ liệu còn "tươi" trong 5 phút
            staleTime: 5 * 60 * 1000,
            // Cache giữ 10 phút sau khi component unmount
            gcTime: 10 * 60 * 1000,
            // Retry 2 lần khi lỗi
            retry: 2,
            // Không refetch khi focus lại tab (tránh gọi API thừa)
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
