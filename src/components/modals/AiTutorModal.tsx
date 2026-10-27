import React, { useState, useEffect, useRef } from 'react';
import { AI_KNOWLEDGE_BASE } from '../../data/physicsData';
import { X, Send, Sparkles, Brain, Bot, User, CornerDownLeft, BookOpen } from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  initialQuery
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Halo! Saya **AI Tutor Fisika ARIWEPHYS**. Ada yang ingin kamu diskusikan tentang konsep **Usaha**, **Energi Kinetik**, **Energi Potensial**, atau **Kekekalan Energi**?',
      time: '09:41'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching physics answer
      const lowerQuery = query.toLowerCase();
      let matchedAnswer = '';

      for (const item of AI_KNOWLEDGE_BASE) {
        if (item.triggers.some(trig => lowerQuery.includes(trig))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = `Pertanyaan yang sangat bagus mengenai "${query}"! Dalam konteks Fisika Usaha dan Energi:\n\n1. Ingat bahwa **Usaha ($W = F \\cdot s \\cdot \\cos\\theta$)** hanya dilakukan oleh komponen gaya yang sejajar lintasan.\n2. **Energi Mekanik ($EM = Ek + Ep$)** selalu kekal bila tidak ada gaya non-konservatif.\n\nKamu juga bisa mencoba menguji variabel tersebut langsung di tab **Simulasi** untuk melihat perubahannya secara visual!`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: matchedAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[650px] max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between border-b border-sky-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                AI Tutor Fisika ARIWEPHYS
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h3>
              <p className="text-[10px] text-slate-300">
                Spesialis Pembelajaran Usaha & Energi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-2 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 text-xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl shadow-xs leading-relaxed ${
                    isAi
                      ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                      : 'bg-sky-600 text-white rounded-tr-sm'
                  }`}
                >
                  <div className="whitespace-pre-line text-[11px]">
                    {m.text}
                  </div>
                  <span
                    className={`block text-[9px] mt-1.5 text-right ${
                      isAi ? 'text-slate-400' : 'text-sky-200'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2 items-center text-slate-400 text-xs pl-2">
              <Bot className="w-4 h-4 text-sky-600" />
              <div className="flex gap-1 py-2 px-3 bg-white rounded-xl border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            'Jelaskan rumus W = F s cos θ',
            'Kenapa Ek nol di puncak?',
            'Apa bedanya usaha fisis vs sehari-hari?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[10px] px-2.5 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 rounded-lg whitespace-nowrap border border-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan konsep fisika atau bantuan LKPD..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="p-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
