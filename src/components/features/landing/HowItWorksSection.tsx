const STEPS = [
  {
    number: '01',
    title: 'Nhập sở thích & yêu cầu',
    description: 'Chọn loại ẩm thực bạn thích, thời gian rảnh và mức ngân sách dự kiến.',
  },
  {
    number: '02',
    title: 'AI xử lý & tối ưu',
    description: 'Hệ thống quét hàng ngàn quán ăn và sắp xếp một lộ trình hoàn hảo nhất.',
  },
  {
    number: '03',
    title: 'Xách xe lên và đi',
    description: 'Theo dõi lộ trình trên bản đồ, thưởng thức món ngon và chia sẻ cảm nhận.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-primary-50/50 py-24 sm:py-32 dark:bg-primary-900/10">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Hoạt động như thế nào?
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Chỉ với 3 bước đơn giản để có một chuyến food tour trọn vẹn.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Connecting line for desktop */}
            <div className="absolute left-[10%] top-12 hidden h-0.5 w-[80%] bg-primary-200 md:block dark:bg-primary-800/50" />
            
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-primary-50 bg-primary-500 shadow-xl dark:border-primary-950">
                  <span className="font-heading text-2xl font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
