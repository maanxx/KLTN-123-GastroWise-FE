'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}

export function BookingModal({ isOpen, onClose, restaurantName }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [partySize, setPartySize] = useState(2);
  const [selectedTime, setSelectedTime] = useState('19:00');

  // Giả lập UI lịch đơn giản
  const dates = [
    { day: 'Th 2', date: '12' },
    { day: 'Th 3', date: '13', active: true },
    { day: 'Th 4', date: '14' },
    { day: 'Th 5', date: '15' },
    { day: 'Th 6', date: '16' },
  ];

  const timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {step === 2 && (
                  <button onClick={() => setStep(1)} className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <h3 className="font-heading font-bold text-slate-900 dark:text-white">
                  {step === 1 ? 'Đặt bàn' : 'Xác nhận'}
                </h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <h2 className="font-heading text-xl font-bold text-primary-600 truncate">{restaurantName}</h2>
                <p className="text-sm text-slate-500">Hoàn tất đặt bàn trong vài giây</p>
              </div>

              {step === 1 ? (
                <div className="space-y-6">
                  {/* Party Size */}
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <Users className="h-4 w-4" /> Số lượng khách
                    </label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold hover:bg-slate-200 dark:bg-slate-800"
                      >-</button>
                      <span className="w-12 text-center text-xl font-bold">{partySize}</span>
                      <button 
                        onClick={() => setPartySize(partySize + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold hover:bg-slate-200 dark:bg-slate-800"
                      >+</button>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <CalendarIcon className="h-4 w-4" /> Chọn Ngày (Tháng này)
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {dates.map((d, i) => (
                        <button
                          key={i}
                          className={`flex flex-col items-center justify-center shrink-0 w-14 h-16 rounded-2xl border transition-all ${
                            d.active 
                              ? 'border-primary-500 bg-primary-50 text-primary-600 font-bold dark:bg-primary-950 dark:text-primary-400' 
                              : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900'
                          }`}
                        >
                          <span className="text-xs">{d.day}</span>
                          <span className="text-lg">{d.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="h-4 w-4" /> Chọn Giờ
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            selectedTime === t
                              ? 'border-primary-500 bg-primary-500 text-white shadow-sm'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full h-12 text-base rounded-xl mt-4" onClick={() => setStep(2)}>
                    Tiếp tục
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="rounded-2xl bg-slate-50 p-4 text-left text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                    <div className="flex justify-between border-b border-slate-200 py-2 dark:border-slate-700">
                      <span className="text-slate-500">Khách:</span>
                      <span className="font-bold">{partySize} người</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 py-2 dark:border-slate-700">
                      <span className="text-slate-500">Thời gian:</span>
                      <span className="font-bold">{selectedTime}, Thứ 3 ngày 13</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Phí đặt chỗ:</span>
                      <span className="font-bold text-green-600">Miễn phí</span>
                    </div>
                  </div>

                  <Button className="h-12 w-full rounded-xl text-base" onClick={onClose}>
                    Xác nhận đặt bàn
                  </Button>
                  <p className="mt-2 text-xs text-slate-500">Bằng cách xác nhận, bạn đồng ý với chính sách của nhà hàng.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
