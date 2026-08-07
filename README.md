# 🍽️ GastroWise — Frontend Customer

> **Đề tài KLTN**: Xây dựng hệ thống thông tin trải nghiệm ẩm thực thông minh  
> **Trường**: Đại học Công nghiệp TP.HCM (IUH)

## 📋 Mô tả

Website cho phép người dùng nhập sở thích món ăn, thời gian, ngân sách → nhận lộ trình ăn uống tối ưu khoảng cách tại TP.HCM. Tích hợp review từ cộng đồng, thống kê và báo cáo.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State/Cache**: React Query (TanStack Query) + Zustand
- **Form**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🚀 Bắt đầu

### Yêu cầu
- Node.js >= 18
- npm >= 9

### Cài đặt

```bash
# Clone repo
git clone https://github.com/maanxx/KLTN-123-GastroWise-FE.git
cd KLTN-123-GastroWise-FE

# Cài dependencies
npm install

# Copy file env và điền giá trị
cp .env.example .env.local

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production |
| `npm run lint` | Kiểm tra code |
| `npm run format` | Format code |
| `npm run type-check` | Kiểm tra TypeScript |

## 📁 Cấu trúc thư mục

```
src/
├── app/            # Next.js App Router (pages)
├── components/     # React components
│   ├── ui/         # Atomic components (Button, Input, Card...)
│   ├── layout/     # Layout components (Navbar, Footer...)
│   └── features/   # Feature-specific components
├── hooks/          # Custom React hooks
├── lib/
│   ├── api/        # API client & endpoints
│   ├── constants/  # App constants, routes, query keys
│   ├── errors/     # Error handling (AppError, tryCatch)
│   ├── mock/       # Mock data (dev only)
│   ├── utils/      # Utilities (format, cn, storage)
│   └── validation/ # Zod schemas
├── providers/      # React providers
├── stores/         # Zustand stores
└── types/          # TypeScript type definitions
```

## ⚠️ Bảo mật

- **KHÔNG commit** file `.env.local` — đã có trong `.gitignore`
- **KHÔNG hardcode** URL, API key, token trong source code
- Pre-commit hook **secretlint** sẽ quét mỗi commit
- Chỉ dùng **mock/fake data** trong development

## 📄 License

Private — KLTN project
