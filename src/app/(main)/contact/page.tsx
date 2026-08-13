'use client';

import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('footer.contact')}</h1>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* Left side: Info & Form */}
            <div className="p-8 lg:p-12">
              <div className="mb-10">
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

              {/* Form */}
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  required
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  required
                />
                <textarea
                  placeholder="Nội dung"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
                  required
                ></textarea>

                <Button type="submit" size="lg" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg px-8 py-4 h-auto">
                  GỬI LIÊN HỆ
                </Button>
              </form>
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
