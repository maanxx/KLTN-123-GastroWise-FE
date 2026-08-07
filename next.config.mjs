/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật React Strict Mode để phát hiện lỗi sớm
  reactStrictMode: true,

  // Cấu hình images — thêm domain khi có API thật
  images: {
    remotePatterns: [
      // Thêm domain ảnh từ API khi cần
      // { protocol: 'https', hostname: 'api.example.com' },
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
};

export default nextConfig;
