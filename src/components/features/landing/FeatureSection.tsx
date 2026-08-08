import { Map, Clock, Wallet, Star } from 'lucide-react';

import { Card } from '@/components/ui';

const FEATURES = [
  {
    icon: <Map className="h-6 w-6 text-primary-500" />,
    title: 'Gợi ý thông minh',
    description: 'AI phân tích sở thích cá nhân để đưa ra lộ trình ăn uống phù hợp nhất.',
  },
  {
    icon: <Clock className="h-6 w-6 text-secondary-500" />,
    title: 'Tối ưu thời gian',
    description: 'Sắp xếp thứ tự các quán ăn dựa trên vị trí địa lý, giảm thiểu thời gian di chuyển.',
  },
  {
    icon: <Wallet className="h-6 w-6 text-primary-500" />,
    title: 'Kiểm soát ngân sách',
    description: 'Tự động tính toán chi phí dự kiến để không vượt quá giới hạn túi tiền của bạn.',
  },
  {
    icon: <Star className="h-6 w-6 text-secondary-500" />,
    title: 'Đánh giá chân thực',
    description: 'Tham khảo review từ cộng đồng yêu ẩm thực để có cái nhìn chính xác nhất.',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Tại sao chọn GastroWise?
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Ứng dụng công nghệ AI tiên tiến để mang lại trải nghiệm khám phá ẩm thực tuyệt vời nhất.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className="group relative overflow-hidden p-8 hover:border-primary-300 dark:hover:border-primary-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-heading text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
                {/* Decorative blob on hover */}
                <div className="absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-primary-500/5 opacity-0 transition-opacity duration-300 blur-2xl group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
