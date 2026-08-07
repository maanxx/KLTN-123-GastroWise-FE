// Trang chủ tạm — sẽ thay bằng Landing Page ở M5
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gradient-primary">
          🍽️ GastroWise
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Hệ thống trải nghiệm ẩm thực thông minh
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Project đang được xây dựng — Module M0 hoàn thành ✅
        </p>
      </div>
    </main>
  );
}
