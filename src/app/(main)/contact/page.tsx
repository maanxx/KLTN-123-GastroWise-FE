'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, Loader2, CheckCircle2, Building2, MessageSquare, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';
import { apiClient } from '@/lib/api/client';

export default function ContactPage() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'FEEDBACK' | 'MERCHANT' | 'COMPLAINT' | 'OTHER'>('FEEDBACK');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; email?: string; message?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập Số điện thoại';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Số điện thoại không hợp lệ (gồm 10 chữ số, VD: 0912345678)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ Email';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Địa chỉ Email không đúng định dạng (VD: example@gmail.com)';
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Nội dung phản hồi phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra và sửa các lỗi nhập liệu bên dưới!');
      return;
    }

    try {
      setIsSubmitting(true);
      const response: any = await apiClient.post('/contacts', {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        topic,
        message: message.trim(),
      });

      toast.success(response?.message || 'Gửi liên hệ thành công!');
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err?.message || 'Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setTopic('FEEDBACK');
    setMessage('');
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('footer.contact')}</h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            GastroWise luôn sẵn sàng lắng nghe ý kiến phản hồi, giải đáp thắc mắc và tiếp nhận đăng ký hợp tác từ Quý Nhà hàng.
          </p>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* Left side: Info & Form */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <MapPin className="text-primary-500 w-6 h-6" />
                  GastroWise Việt Nam
                </h2>

                <div className="space-y-4 text-slate-600">
                  <p className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary-600" />
                    </span>
                    12 Nguyễn Văn Bảo, Hạnh Thông, Gò Vấp, Hồ Chí Minh 700000, Việt Nam
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5 text-primary-600" />
                    </span>
                    (+84) 379767728
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-primary-600" />
                    </span>
                    thanhoangthienthien@gmail.com
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                      <Globe className="w-3.5 h-3.5 text-primary-600" />
                    </span>
                    www.gastrowise.vn
                  </p>
                </div>
              </div>

              {/* Form hoặc Thẻ Thông Báo Thành Công */}
              {isSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900">Gửi Thông Tin Thành Công!</h3>
                    <p className="text-sm text-emerald-700 mt-1">
                      Cảm ơn bạn đã liên hệ với GastroWise. Thông tin của bạn đã được lưu vào hệ thống và gửi email phản hồi tự động.
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={handleResetForm}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg px-6 py-2.5 text-sm"
                  >
                    Gửi phản hồi khác
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  {/* Dropdown Chủ Đề */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Chủ Đề Liên Hệ
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setTopic('FEEDBACK')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          topic === 'FEEDBACK'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-primary-500" /> Góp Ý Dịch Vụ
                      </button>
                      <button
                        type="button"
                        onClick={() => setTopic('MERCHANT')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          topic === 'MERCHANT'
                            ? 'bg-white text-emerald-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Đăng Ký Hợp Tác
                      </button>
                      <button
                        type="button"
                        onClick={() => setTopic('COMPLAINT')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          topic === 'COMPLAINT'
                            ? 'bg-white text-rose-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Báo Lỗi / Khiếu Nại
                      </button>
                      <button
                        type="button"
                        onClick={() => setTopic('OTHER')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          topic === 'OTHER'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        💬 Khác
                      </button>
                    </div>
                  </div>

                  {/* Họ và tên */}
                  <div>
                    <input
                      type="text"
                      placeholder="Họ và tên *"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-primary-500/20 focus:border-primary-500'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                  </div>

                  {/* SĐT & Email */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        placeholder="Số điện thoại (VD: 0912345678) *"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                            : 'border-slate-200 focus:ring-primary-500/20 focus:border-primary-500'
                        }`}
                      />
                      {errors.phone && <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email (VD: user@gmail.com) *"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                            : 'border-slate-200 focus:ring-primary-500/20 focus:border-primary-500'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div>
                    <textarea
                      placeholder={
                        topic === 'MERCHANT'
                          ? 'Nhập Tên nhà hàng, địa chỉ và mô hình kinh doanh bạn muốn hợp tác... (tối thiểu 10 ký tự)'
                          : 'Nội dung phản hồi hoặc câu hỏi của bạn... (tối thiểu 10 ký tự)'
                      }
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-200 focus:ring-primary-500/20 focus:border-primary-500'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg px-8 py-4 h-auto flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> GỬI LIÊN HỆ
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Right side: Map iframe */}
            <div className="bg-slate-200 h-[400px] lg:h-auto relative min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8581690910543!2d106.68427047587841!3d10.822164189329352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e5496d03cf%3A0xa5b8e7395ec636b9!2zMTIgTmd1eeG7hW4gVsSDbiBC4bqjbywgUGjGsOG7nW5nIDQsIEfDsiBW4bqlcCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1714571987515!5m2!1svi!2s"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GastroWise Location"
              ></iframe>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
