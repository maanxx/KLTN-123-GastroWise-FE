import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-primary-100 bg-primary-50/50 dark:border-primary-900/50 dark:bg-primary-950/50">
      <div className="container-app py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-transform group-hover:scale-105 dark:bg-primary-900/30 dark:text-primary-500">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Gastro<span className="text-primary-500">Wise</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Hệ thống gợi ý trải nghiệm ẩm thực thông minh tại TP.HCM. Tối ưu thời gian,
              tiết kiệm chi phí, khám phá những hương vị tuyệt vời nhất.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-slate-900 dark:text-slate-100">
              Khám phá
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href={ROUTES.PREFERENCES} className="text-sm text-slate-500 hover:text-primary-500">
                  Tạo lộ trình
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-primary-500">
                  Quán ăn nổi bật
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-primary-500">
                  Đánh giá cộng đồng
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-slate-900 dark:text-slate-100">
              Hỗ trợ
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-primary-500">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-primary-500">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-primary-500">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GastroWise (IUH KLTN). All rights reserved.
          </p>
          <p className="mt-4 text-sm text-slate-500 sm:mt-0">
            Phát triển với 💚 tại TP.HCM
          </p>
        </div>
      </div>
    </footer>
  );
}
