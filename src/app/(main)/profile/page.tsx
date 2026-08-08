import { Map, Navigation, Settings, Trophy, Wallet } from 'lucide-react';

import { Card } from '@/components/ui';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-primary-50/30 pb-24 pt-8 dark:bg-transparent">
      <div className="container-app max-w-4xl">
        
        {/* Header Profile */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-3xl font-bold text-white shadow-lg">
              TU
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                Tuấn Khách Hàng
              </h1>
              <p className="text-slate-500">Thành viên GastroWise Eco</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:text-primary-600 dark:bg-slate-900 dark:border-slate-800">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* KLTN Focus: Thống kê tối ưu di chuyển */}
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-900 dark:text-white">
          Thống kê cá nhân
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          
          <Card className="relative overflow-hidden p-6 border-primary-200 bg-white hover:border-primary-400 transition-colors">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Navigation className="h-24 w-24 text-primary-500" />
            </div>
            <div className="mb-2 text-primary-600 dark:text-primary-400">
              <Navigation className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              12.5 <span className="text-lg text-slate-500">km</span>
            </div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              Quãng đường đã tiết kiệm nhờ AI
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-2 text-secondary-500">
              <Map className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              5
            </div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              Lộ trình đã hoàn thành
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-2 text-blue-500">
              <Wallet className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              ~2.4M
            </div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              Tổng chi tiêu ăn uống
            </div>
          </Card>
        </div>

        {/* Thành tích */}
        <h2 className="mb-4 font-heading text-xl font-bold text-slate-900 dark:text-white">
          Thành tích Eco (Bảo vệ môi trường)
        </h2>
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Huy hiệu "Chân Đi Nhẹ Nhàng"</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Bạn đã tiết kiệm lượng khí thải tương đương 1.5kg CO2 nhờ việc chọn lộ trình ẩm thực được AI tối ưu khoảng cách. Tiếp tục phát huy nhé!
              </p>
              <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '75%' }} />
              </div>
              <div className="mt-1 text-right text-xs text-slate-500">75% tới huy hiệu tiếp theo</div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
