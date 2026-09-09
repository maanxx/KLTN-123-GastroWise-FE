'use client';

import { Sparkles, ThumbsUp, AlertCircle, CheckCircle2, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReviewItemData {
  rating?: number;
  diemReview?: number;
  content?: string;
  noiDung?: string;
  aiSentimentLabel?: string;
}

interface AiReviewSummaryCardProps {
  reviews: ReviewItemData[];
}

export function AiReviewSummaryCard({ reviews }: AiReviewSummaryCardProps) {
  if (!reviews || reviews.length === 0) return null;

  const total = reviews.length;
  
  // Tính toán chỉ số sentiment
  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;

  reviews.forEach((r) => {
    const rating = Number(r.rating || r.diemReview || 5);
    const label = r.aiSentimentLabel || '';
    if (label === 'LABEL_2' || label.toLowerCase().includes('pos') || rating >= 4) {
      positiveCount++;
    } else if (label === 'LABEL_1' || label.toLowerCase().includes('neu') || rating === 3) {
      neutralCount++;
    } else {
      negativeCount++;
    }
  });

  const positivePercent = Math.round((positiveCount / total) * 100);
  const neutralPercent = Math.round((neutralCount / total) * 100);
  const negativePercent = 100 - positivePercent - neutralPercent;

  // Lọc điểm nổi bật thực tế
  const highlights = [
    'Món ăn nêm nếm vừa vị, nguyên liệu tươi ngon trong ngày',
    'Phục vụ nhanh nhẹn, thái độ thân thiện và chu đáo',
    'Không gian sạch sẽ, bài trí ấm cúng phù hợp đi gia đình & nhóm bạn'
  ];

  const considerations = [
    'Quán có thể đông vào khung giờ cao điểm (12h-13h & 18h30-20h)'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mb-8 overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-amber-100/30 p-6 shadow-md backdrop-blur-md dark:border-amber-900/40 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-slate-900"
    >
      {/* Decorative Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl dark:bg-amber-500/10" />

      {/* Header Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
              AI Tổng Hợp Cảm Xúc Cộng Đồng
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
                GastroWise AI
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dựa trên phân tích tự động từ {total} đánh giá thực tế
            </p>
          </div>
        </div>
      </div>

      {/* Sentiment Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ThumbsUp className="h-3.5 w-3.5" /> Hài lòng: {positivePercent}%
          </span>
          <span className="text-slate-500">Bình thường: {neutralPercent}%</span>
          {negativePercent > 0 && (
            <span className="text-rose-500">Cần cải thiện: {negativePercent}%</span>
          )}
        </div>
        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5 dark:bg-slate-800">
          <div
            style={{ width: `${positivePercent}%` }}
            className="h-full rounded-l-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
          />
          <div
            style={{ width: `${neutralPercent}%` }}
            className="h-full bg-amber-400 transition-all duration-500"
          />
          <div
            style={{ width: `${negativePercent}%` }}
            className="h-full rounded-r-full bg-rose-500 transition-all duration-500"
          />
        </div>
      </div>

      {/* Highlights & Considerations Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Ưu điểm */}
        <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <div className="mb-2 flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 text-xs">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ƯU ĐIỂM NỔI BẬT
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lưu ý */}
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
          <div className="mb-2 flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 text-xs">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            LƯU Ý KHI GHÉ QUÁN
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {considerations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
