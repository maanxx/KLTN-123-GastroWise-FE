"use client";

import { useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurantApi } from '@/lib/api/restaurant.api';

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Chào bạn! Mình là GastroBot. Mình có thể giúp bạn tìm quán ăn hoặc tư vấn lộ trình thông minh. Bạn muốn ăn gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await restaurantApi.chat(userMsg);
      if (res && res.reply_text) {
        setMessages(prev => [...prev, { role: 'ai', text: res.reply_text }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Xin lỗi, tôi không hiểu ý bạn.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Có lỗi xảy ra khi kết nối máy chủ!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Widget Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:right-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">GastroBot AI</h3>
                  <p className="text-xs text-primary-100">Luôn sẵn sàng hỗ trợ</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary-500 text-white rounded-tr-sm' 
                          : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-sm bg-white border border-slate-100 px-4 py-3 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" style={{ animationDelay: '0ms' }} />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" style={{ animationDelay: '150ms' }} />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhắn với AI..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-12 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl shadow-primary-500/30 sm:right-8 group border border-white/20"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <Bot className="h-6 w-6" />
            <Sparkles className="absolute -right-2 -top-2 h-4 w-4 animate-pulse text-yellow-300" />
          </div>
        )}
      </motion.button>
    </>
  );
}
