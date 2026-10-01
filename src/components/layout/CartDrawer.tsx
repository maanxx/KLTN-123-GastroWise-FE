'use client';

import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, ArrowRight, CheckCircle2, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { toast } from 'sonner';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    items,
    removeItem,
    updateQuantity,
    updateNote,
    voucherCode,
    discountAmount,
    applyVoucher,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotal,
  } = useCartStore();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const total = getTotal();

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyVoucher(promoInput);
    if (success) {
      toast.success(`Đã áp dụng mã giảm giá ${promoInput.toUpperCase()} (-20%)!`);
      setPromoInput('');
    } else {
      toast.error('Mã giảm giá không hợp lệ. Thử: GASTRO20 hoặc CHAO2026');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      toast.success('Đặt đơn thành công! Quán ăn đã nhận được đơn của bạn.');
    }, 1200);
  };

  const handleCloseSuccess = () => {
    setOrderSuccess(false);
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-40 flex h-14 items-center gap-3 rounded-full border border-primary-200 bg-white px-5 py-3 shadow-xl shadow-primary-500/15 transition-all hover:scale-105 active:scale-95 dark:border-slate-800 dark:bg-slate-900"
        aria-label="Giỏ hàng"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white shadow-md shadow-primary-500/30">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-extrabold text-white ring-2 ring-white dark:ring-slate-900">
              {totalItems}
            </span>
          )}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Giỏ hàng món ăn</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            {total.toLocaleString('vi-VN')}đ
          </p>
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Giỏ hàng của bạn</h3>
                  <p className="text-xs text-slate-500">{totalItems} món đã chọn</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-900">
                    <UtensilsCrossed className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 font-bold text-slate-800 dark:text-white">Giỏ hàng đang trống</h4>
                  <p className="mt-1 text-xs text-slate-500">Hãy thêm món ăn yêu thích vào giỏ từ thực đơn nhà hàng</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                          <p className="text-[11px] text-slate-500">{item.restaurantName}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-primary-600 dark:text-primary-400">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </span>

                        <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-1 shadow-sm dark:bg-slate-800">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer & Summary */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyVoucher} className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Nhập mã GASTRO20..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-medium uppercase outline-none focus:border-primary-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-500"
                >
                  Áp dụng
                </button>
              </form>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between font-medium text-emerald-600 dark:text-emerald-400">
                    <span>Mã giảm giá ({voucherCode})</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Phí dịch vụ & đặt chỗ</span>
                  <span className="text-emerald-600 font-bold">MIỄN PHÍ</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-extrabold text-slate-900 dark:border-slate-800 dark:text-white">
                  <span>Tổng tiền</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn...</span>
                ) : (
                  <>
                    <span>Đặt đơn & Xác nhận ngay</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Đặt món thành công!</h3>
            <p className="mt-2 text-xs text-slate-500">
              Đơn hàng của bạn đã được chuyển tới nhà hàng. Mã đơn: <strong className="text-primary-600">GW-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </p>
            <button
              onClick={handleCloseSuccess}
              className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 dark:bg-primary-600"
            >
              Hoàn tất & Tiếp tục trải nghiệm
            </button>
          </div>
        </div>
      )}
    </>
  );
}
