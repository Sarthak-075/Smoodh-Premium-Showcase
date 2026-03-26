'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_OUT } from '@/lib/easing';

// ─── Predefined Q&A Knowledge Base ───────────────────────────────────────────
interface QA { triggers: string[]; response: string }

const QA_DB: QA[] = [
  {
    triggers: ['what is smoodh', 'what smoodh', 'about smoodh', 'tell me about', 'who are you'],
    response: 'Smoodh is a premium dairy beverages brand offering rich, creamy milk-based drinks. Our range includes Lassi, Chocolate, and Chocolate Hazelnut flavors — made with real dairy for an authentic, wholesome experience.',
  },
  {
    triggers: ['flavors', 'flavours', 'varieties', 'options', 'available'],
    response: 'We currently offer 3 premium flavors:\n🥛 Lassi — Creamy traditional lassi\n🍫 Chocolate — Rich cocoa blend\n🌰 Chocolate Hazelnut — Cocoa + nutty hazelnut fusion\nAll at just ₹30 per 150ml bottle!',
  },
  {
    triggers: ['price', 'cost', 'how much', 'rate', '₹', 'rupees', 'pricing'],
    response: 'All Smoodh products are priced at ₹30 per 150ml bottle — premium quality at an accessible price. A wholesome, delicious drink that won\'t break the bank! 🎉',
  },
  {
    triggers: ['where', 'buy', 'purchase', 'get it', 'store', 'shop', 'order'],
    response: 'You can order Smoodh directly from our website by clicking the "Order Now" button above! We\'re also working on expanding to local stores and quick-commerce platforms soon. 🚀',
  },
  {
    triggers: ['healthy', 'health', 'nutrition', 'nutrients', 'good for', 'benefit'],
    response: 'Absolutely! Smoodh drinks are made with real dairy, providing natural protein, calcium, and energy. No artificial preservatives. A nourishing daily drink for all ages! 💪',
  },
  {
    triggers: ['ingredient', 'made of', 'contains', 'recipe', 'what\'s in'],
    response: 'Our drinks are crafted with:\n• Real milk & milk solids\n• Natural flavor extracts\n• No artificial preservatives\n• Cocoa (for Chocolate & Hazelnut variants)\nSimple, real ingredients you can trust.',
  },
  {
    triggers: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
    response: 'Hi there! 👋 Welcome to Smoodh! I\'m here to help with any questions about our products. What would you like to know?',
  },
  {
    triggers: ['thanks', 'thank you', 'bye', 'goodbye', 'cya'],
    response: 'Thanks for stopping by! Enjoy your Smoodh 🥛 Feel free to ask anything anytime. Have a great day!',
  },
];

const SUGGESTIONS = [
  'What flavors are available?',
  'What is the price?',
  'Is it healthy?',
  'Where can I buy?',
];

interface Message {
  id: number;
  from: 'user' | 'bot';
  text: string;
}

function getReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const qa of QA_DB) {
    if (qa.triggers.some((t) => lower.includes(t))) return qa.response;
  }
  return "Hmm, I'm not sure about that! Try asking about our flavors, pricing, ingredients, or where to buy. 😊";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: 'bot', text: "Hey! I'm Smoodh's assistant 🥛 Ask me anything about our drinks!" },
  ]);
  const [input, setInput]     = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: idCounter.current++, from: 'user', text: trimmed };
    const botMsg: Message  = { id: idCounter.current++, from: 'bot',  text: getReply(trimmed) };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Slight delay for natural feel
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 500);
  }

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="fixed bottom-24 right-5 z-[200] w-[340px] sm:w-[380px] flex flex-col rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10"
            style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(40px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-sm font-black text-white shadow-[0_0_12px_rgba(217,70,239,0.5)]">
                  S
                </span>
                <div>
                  <p className="text-sm font-black text-white tracking-tight">Smoodh Assistant</p>
                  <p className="text-[10px] text-emerald-400 font-medium">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-[320px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.from === 'user'
                        ? 'bg-gradient-to-br from-pink-600 to-fuchsia-600 text-white rounded-br-sm'
                        : 'bg-white/10 text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[11px] bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-gray-300 hover:text-white rounded-full px-3 py-1 transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask something…"
                className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-fuchsia-500/50 transition-all duration-200"
              />
              <motion.button
                onClick={() => sendMessage(input)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(217,70,239,0.4)] flex-shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(217,70,239,0.7)' }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-5 z-[200] w-14 h-14 rounded-full bg-gradient-to-br from-pink-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(217,70,239,0.5)] border border-white/20"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="text-lg font-black">
              ✕
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
