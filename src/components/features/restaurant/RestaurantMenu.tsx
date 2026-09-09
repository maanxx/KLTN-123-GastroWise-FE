'use client';

import { useState } from 'react';
import { Flame, Sparkles, Languages, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { formatCurrency } from '@/lib/utils';
import type { MenuItem } from '@/types/restaurant';
import { Button } from '@/components/ui';

interface RestaurantMenuProps {
  menu: MenuItem[];
}

type Lang = 'vi' | 'en' | 'ja' | 'ko';

export function RestaurantMenu({ menu }: RestaurantMenuProps) {
  const [selectedLang, setSelectedLang] = useState<Lang>('vi');
  const [activeExplainItem, setActiveExplainItem] = useState<MenuItem | null>(null);

  const translateDish = (name: string, lang: Lang): string => {
    if (lang === 'vi') return name;
    const lower = name.toLowerCase();

    if (lang === 'en') {
      if (lower.includes('phở')) return name + ' (Vietnamese Traditional Noodle Soup)';
      if (lower.includes('cơm tấm')) return name + ' (Broken Rice with Grilled Pork)';
      if (lower.includes('bún chả')) return name + ' (Hanoi Grilled Pork Noodles)';
      if (lower.includes('hủ tiếu')) return name + ' (Southern Clear Noodle Soup)';
      if (lower.includes('bún đậu')) return name + ' (Vermicelli with Tofu & Shrimp Paste)';
      if (lower.includes('cà phê')) return name + ' (Vietnamese Drip Coffee)';
      return name + ' (Vietnamese Specialty)';
    }

    if (lang === 'ja') {
      if (lower.includes('phở')) return name + ' (ベトナム伝統フォー)';
      if (lower.includes('cơm tấm')) return name + ' (ベトナム風豚焼き肉ご飯)';
      if (lower.includes('cà phê')) return name + ' (ベトナムコーヒー)';
      return name + ' (ベトナム名物)';
    }

    if (lang === 'ko') {
      if (lower.includes('phở')) return name + ' (베트남 쌀국수)';
      if (lower.includes('cơm tấm')) return name + ' (베트남식 돼지갈비 덮밥)';
      if (lower.includes('cà phê')) return name + ' (베트남 연유 커피)';
      return name + ' (베트남 특선 요리)';
    }

    return name;
  };

  const getCulturalExplanation = (name: string): { origin: string; howToEat: string; ingredients: string } => {
    const lower = name.toLowerCase();
    if (lower.includes('phở')) {
      return {
        origin: 'Phở là quốc hồn quốc túy của ẩm thực Việt Nam, xuất phát từ miền Bắc thế kỷ 20 với nước dùng hầm từ xương bò nguyên chất trong 12 tiếng.',
        ingredients: 'Bánh phở tươi, thịt bò chín/tái, hành lá, ngò rí, quế, hoa hồi, thảo quả.',
        howToEat: 'Vắt chanh, thêm chút ớt tươi và dấm tỏi. Ăn kèm quẩy nóng giòn dip vào nước dùng nhiệt độ cao!',
      };
    } else if (lower.includes('cơm tấm')) {
      return {
        origin: 'Món ăn biểu tượng của Sài Gòn, vốn từ hạt gạo tấm vỡ của người dân lao động, tạo nên hương vị bùi béo đặc trưng.',
        ingredients: 'Gạo tấm thơm, sườn nướng mật ong, bì chả trứng, mỡ hành, nước mắm tỏi ớt kẹo sệt.',
        howToEat: 'Rưới nước mắm chua ngọt đặc sệt lên cơm, dùng kèm dưa góp su su cà rốt muối chua.',
      };
    } else if (lower.includes('bún chả')) {
      return {
        origin: 'Món ăn đặc sản Hà Nội nổi tiếng thế giới (từng được Tổng thống Obama thưởng thức năm 2016).',
        ingredients: 'Chả viên, thịt miếng nướng than hoa, bún tươi, nước mắm mặn ngọt ngâm đu đủ xanh.',
        howToEat: 'Gắp bún tươi và rau sống nhúng trực tiếp vào bát nước chấm ấm nóng chứa thịt nướng!',
      };
    }
    return {
      origin: 'Món ăn mang hương vị truyền thống độc đáo, được các nghệ nhân ẩm thực chế biến theo công thức gia truyền.',
      ingredients: 'Nguyên liệu tươi chọn lọc trong ngày, gia vị thảo mộc thiên nhiên.',
      howToEat: 'Thưởng thức khi còn nóng hổi để cảm nhận trọn vẹn hương vị tuyệt vời nhất.',
    };
  };

  return (
    <div className="mt-12">
      {/* Header & AI Translator Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Thực Đơn Nhà Hàng
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              AI Smart Menu
            </span>
          </h2>
          <p className="text-xs text-slate-500">Hỗ trợ phiên dịch đa ngôn ngữ & giải thích văn hóa ẩm thực bởi AI</p>
        </div>

        {/* Language Toggles */}
        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Languages className="ml-2 h-4 w-4 text-slate-400" />
          {[
            { id: 'vi', label: '🇻🇳 VI' },
            { id: 'en', label: '🇬🇧 EN' },
            { id: 'ja', label: '🇯🇵 JA' },
            { id: 'ko', label: '🇰🇷 KO' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLang(l.id as Lang)}
              className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                selectedLang === l.id
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {menu.map((item) => (
          <div
            key={item.id || (item as any)._id || Math.random().toString()}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-primary-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-primary-700"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                    {translateDish(item.name, selectedLang)}
                  </h3>
                  {item.isPopular && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      <Flame className="h-3 w-3" /> Hot
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="font-extrabold text-slate-900 dark:text-white text-base">
                    {formatCurrency(item.price)}
                  </div>

                  <button
                    onClick={() => setActiveExplainItem(item)}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> AI Giải Thích Văn Hóa
                  </button>
                </div>
              </div>

              {item.image && (
                <div className="shrink-0 ml-2">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover shadow-sm" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cultural Explainer Modal */}
      <AnimatePresence>
        {activeExplainItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveExplainItem(null)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white">
                    AI Giải Thích Văn Hóa Món Ăn
                  </h3>
                </div>
                <button onClick={() => setActiveExplainItem(null)} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h2 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white mb-4">
                {activeExplainItem.name}
              </h2>

              {(() => {
                const exp = getCulturalExplanation(activeExplainItem.name);
                return (
                  <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    <div className="rounded-2xl bg-indigo-50/70 p-4 dark:bg-indigo-950/40">
                      <strong className="block font-bold text-indigo-900 dark:text-indigo-300 mb-1">🏛️ Nguồn gốc & Điểm độc đáo:</strong>
                      <p>{exp.origin}</p>
                    </div>

                    <div className="rounded-2xl bg-amber-50/70 p-4 dark:bg-amber-950/40">
                      <strong className="block font-bold text-amber-900 dark:text-amber-300 mb-1">🌿 Thành phần chính:</strong>
                      <p>{exp.ingredients}</p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50/70 p-4 dark:bg-emerald-950/40">
                      <strong className="block font-bold text-emerald-900 dark:text-emerald-300 mb-1">🥢 Cách thưởng thức chuẩn vị người bản địa:</strong>
                      <p>{exp.howToEat}</p>
                    </div>
                  </div>
                );
              })()}

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setActiveExplainItem(null)} className="rounded-xl">
                  Đã hiểu
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
