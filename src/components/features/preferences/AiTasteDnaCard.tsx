'use client';

import React from 'react';
import { Sparkles, Utensils, Flame, Coffee, Fish, Heart, Zap } from 'lucide-react';
import { Card } from '@/components/ui';

interface AiTasteDnaCardProps {
  preferences?: string[];
  savedCount?: number;
}

export const AiTasteDnaCard: React.FC<AiTasteDnaCardProps> = ({ preferences = [], savedCount = 0 }) => {
  // Biểu đồ phân tích mặc định + tính toán theo preferences
  const tasteBreakdown = [
    {
      name: 'Món Truyền Thống Việt',
      percentage: preferences.includes('vietnamese') ? 45 : 35,
      color: 'from-amber-500 to-orange-500',
      icon: Utensils,
    },
    {
      name: 'Món Cay & Đậm Đà',
      percentage: preferences.includes('spicy') ? 35 : 25,
      color: 'from-red-500 to-rose-600',
      icon: Flame,
    },
    {
      name: 'Trà Sữa & Cafe Chill',
      percentage: preferences.includes('coffee') || preferences.includes('milk_tea') ? 25 : 20,
      color: 'from-amber-600 to-yellow-600',
      icon: Coffee,
    },
    {
      name: 'Hải Sản & Đồ Biển',
      percentage: preferences.includes('seafood') ? 20 : 15,
      color: 'from-blue-500 to-cyan-500',
      icon: Fish,
    },
  ];

  return (
    <Card className="relative overflow-hidden p-8 border-none bg-gradient-to-br from-slate-900 via-slate-900 to-primary-950 text-white shadow-2xl rounded-3xl">
      {/* Dynamic Background Effects */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-bold mb-3 border border-primary-500/30">
              <Sparkles className="w-3.5 h-3.5 text-primary-400 animate-pulse" /> AI Taste Profile
            </div>
            <h3 className="font-heading text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              DNA Khẩu Vị Ẩm Thực 🧬
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Phân tích cá nhân hóa từ AI dựa trên sở thích và {savedCount} quán ăn đã lưu.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center font-black text-white shadow-md">
              98%
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Độ Khớp AI</div>
              <div className="text-slate-400">Rất chính xác</div>
            </div>
          </div>
        </div>

        {/* AI Tagline Badge */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary-500/30 flex items-center justify-center text-primary-300 shrink-0">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-primary-300 uppercase tracking-wider">Danh Hiệu Ẩm Thực</div>
            <div className="text-base font-extrabold text-white">
              Tín Đồ Ẩm Thực Đậm Đà & Đam Mê Món Việt 🇻🇳
            </div>
          </div>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="space-y-6">
          {tasteBreakdown.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2 text-slate-200">
                    <Icon className="w-4 h-4 text-slate-400" /> {item.name}
                  </span>
                  <span className="font-mono text-primary-400 font-bold">{item.percentage}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-800 p-0.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Suggestions Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Tự động cập nhật mỗi khi bạn tương tác
          </span>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">#MonViet</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">#DamDa</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">#QuanAnNgon</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
