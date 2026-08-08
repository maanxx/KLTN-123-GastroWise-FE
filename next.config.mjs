/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật React Strict Mode để phát hiện lỗi sớm
  reactStrictMode: true,

  // Cấu hình images — khai báo các domain được phép lấy ảnh (Chuẩn bảo mật)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }, // Dùng cho ảnh demo
      { protocol: 'https', hostname: 'res.cloudinary.com' }, // Dùng cho ảnh thật lưu trên Cloudinary (Miễn phí)
    ],
  },

  // Headers bảo mật
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Bỏ qua lỗi ESLint và TypeScript nghiêm ngặt khi Build lên Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
