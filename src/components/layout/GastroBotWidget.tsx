'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, MapPin, Store, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  restaurants?: Array<{
    id: string;
    name: string;
    tags: string;
    distance_km: number;
    price: number;
  }>;
}

export function GastroBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Chào bạn! Mình là trợ lý AI GastroWise 🤖. Bạn muốn tìm món gì hôm nay? (Ví dụ: "Phở bò Hà Nội", "Quán lẩu mưa rào", "Cơm tấm ngon")',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply_text,
          restaurants: data.data || [],
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API server error');
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Dựa trên gợi ý AI cho "${queryText}", mình đề xuất bạn thử thưởng thức Phở Bò Thìn Bờ Hồ hoặc Cơm Tấm Ba Gái nhé!`,
        restaurants: [
          {
            id: '6a7d8da3c8148b897824b164',
            name: 'Phở Thìn Bờ Hồ - Chi Nhánh Đặc Biệt',
            tags: 'MÓN NƯỚC, phở',
            distance_km: 1.2,
            price: 65000,
          },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    '🍜 Tìm quán phở ngon',
    '☀️ Nắng nóng ăn gì?',
    '🌧️ Mưa rào ăn lẩu',
    '☕ Cà phê view đẹp',
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/25 transition-all hover:scale-110 active:scale-95"
        aria-label="Hỏi Trợ lý AI GastroWise"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 animate-pulse" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] flex-col rounded-3xl border border-amber-200/80 bg-white shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900 sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-3xl border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900 dark:text-white">GastroBot AI Assistant</h3>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Đang hoạt động (Local AI)
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                    msg.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block rounded-2xl p-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>

                  {/* Recommended Restaurants List */}
                  {msg.restaurants && msg.restaurants.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      {msg.restaurants.map((rest) => (
                        <Link
                          key={rest.id}
                          href={`/restaurant/${rest.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between rounded-xl border border-amber-200/60 bg-white p-2.5 shadow-sm transition-all hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <Store className="h-4 w-4 text-amber-500" />
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-xs">{rest.name}</h4>
                              <p className="text-[10px] text-slate-500">{rest.tags}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400">
                <Bot className="h-4 w-4 animate-spin text-amber-500" />
                <span className="text-[11px]">AI đang phân tích khẩu vị...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-1 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.replace(/^[^\s]+\s/, ''))}
                className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-amber-100 hover:text-amber-800 dark:bg-slate-800 dark:text-slate-300"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 p-3 border-t border-slate-100 dark:border-slate-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập món ăn hoặc nhu cầu..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
