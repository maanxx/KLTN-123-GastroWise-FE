'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, ArrowRight, Play, Utensils, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Premium Cuisine Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay to ensure text readability but keep it light/blue themed */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Tinh hoa <span className="text-primary-400">Ẩm thực Việt</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Kết nối đam mê, chia sẻ hương vị. Khám phá câu chuyện đằng sau mỗi món ăn cùng GastroWise.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 text-base shadow-lg shadow-primary-500/30 group"
              onClick={() => scrollToSection('story-section')}
            >
              KHÁM PHÁ CÂU CHUYỆN CỦA CHÚNG TÔI
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section id="story-section" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl group"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Our Story"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-primary-600/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:pl-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary-500"></div>
                <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Khám phá</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-8">Câu chuyện</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Trong một thế giới mà mọi thứ đều được số hóa, việc cùng nhau chia sẻ một bữa ăn là một trong những sợi dây kết nối thực tế cuối cùng còn sót lại.
                  Đó là nơi những hợp đồng được ký kết, tình bạn được thắt chặt và những chuyện tình bắt đầu.
                </p>
                <p>
                  Tại GastroWise, sứ mệnh của chúng tôi rất đơn giản: đảm bảo mọi cuộc gặp gỡ đều đi kèm với những món ăn tuyệt vời.
                  Chúng tôi không chỉ gợi ý nhà hàng, chúng tôi gợi ý những kỷ niệm. Hãy để chúng tôi lo phần thực đơn, để bạn toàn tâm toàn ý dành thời gian cho những người ngồi đối diện.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-10 rounded-full border-2 border-slate-200 text-slate-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
                onClick={() => scrollToSection('team-section')}
              >
                XEM CHI TIẾT
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Meet The Team Section */}
      <section id="team-section" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-primary-500"></div>
              <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Gặp gỡ đội ngũ</span>
              <div className="h-px w-8 bg-primary-500"></div>
            </div>
            <h2 className="font-heading text-4xl font-bold text-slate-900">Những người đứng sau GastroWise</h2>
          </motion.div>

          <div className="space-y-32">
            {/* Member 1: Thien Thien (Image Left, Text Right) */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image src="/team/thien.jpg" alt="Thiên Thiên" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:pr-8"
              >
                <h3 className="font-heading text-5xl font-bold text-slate-900 mb-4">Thiên Thiên</h3>
                <p className="text-xl text-primary-600 font-medium mb-6">Trưởng nhóm Backend & AI</p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Người đứng đằng sau toàn bộ hệ thống máy chủ và các thuật toán AI thông minh.
                  Sở trường: Biến những dữ liệu phức tạp thành các gợi ý món ăn hoàn hảo và giữ cho server luôn vững chắc như bàn thạch.
                </p>
                <div className="p-4 bg-primary-50 border-l-4 border-primary-500 text-primary-800 italic rounded-r-lg">
                  Món tủ: Matcha Latte – Nguồn năng lượng để code xuyên màn đêm.
                </div>
              </motion.div>
            </div>

            {/* Member 2: Minh Man (Text Left, Image Right) */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="order-2 lg:order-1 lg:pl-8"
              >
                <h3 className="font-heading text-5xl font-bold text-slate-900 mb-4">Minh Mẫn</h3>
                <p className="text-xl text-primary-600 font-medium mb-6">Fullstack Admin & Frontend User</p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Kiến trúc sư xây dựng toàn bộ hệ thống quản trị và giao diện người dùng mượt mà.
                  Đam mê thiết kế các trải nghiệm trực quan, đảm bảo người dùng luôn có trải nghiệm tuyệt vời nhất khi tương tác.
                </p>
                <div className="p-4 bg-primary-50 border-l-4 border-primary-500 text-primary-800 italic rounded-r-lg">
                  Món tủ: Cà phê đen đá – Bí quyết để giữ server luôn 'sống' 24/7.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative order-1 lg:order-2"
              >
                <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image src="/team/man.jpg" alt="Minh Mẫn" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Culinary Features (Tuyệt tác / Nguyên liệu) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-primary-500"></div>
              <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Tuyệt tác</span>
              <div className="h-px w-8 bg-primary-500"></div>
            </div>
            <h2 className="font-heading text-4xl font-bold text-slate-900 mb-6">Tinh hoa Ẩm thực</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Ẩm thực Việt Nam là một sự quyến rũ kì diệu không chỉ với những người sinh ra ở mảnh đất hình chữ S, mà còn với cả du khách quốc tế. Những tinh hoa và di sản đó không ngừng vươn xa bởi sự nhiệt huyết của chúng ta.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
          >
            {[
              { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Hương vị truyền thống' },
              { img: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Nguyên liệu tươi sạch' },
              { img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', title: 'Cà phê & Đồ uống' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="group cursor-pointer">
                <div className="relative aspect-square rounded-full overflow-hidden mb-6 shadow-xl ring-8 ring-primary-50 group-hover:ring-primary-100 transition-all duration-300">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                </div>
                <h4 className="text-center font-bold text-slate-900 text-xl group-hover:text-primary-600 transition-colors">{item.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
