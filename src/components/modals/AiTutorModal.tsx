import React, { useState, useEffect, useRef } from 'react';
import { AI_KNOWLEDGE_BASE } from '../../data/physicsData';
import { X, Send, Bot } from 'lucide-react';

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
      text: 'Halo! Saya AI Tutor Fisika. Tanyakan apa saja seputar Usaha, Energi Kinetik, Energi Potensial, atau Kekekalan Energi.',
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
      const lower = query.toLowerCase();
      let ans = '';

      for (const item of AI_KNOWLEDGE_BASE) {
        if (item.triggers.some(t => lower.includes(t))) {
          ans = item.answer;
          break;
        }
      }

      if (!ans) {
        ans = `Pertanyaan bagus tentang "${query}". Dalam fisika Usaha & Energi:\n\n1. Usaha: W = F · s · cos(θ). Nilainya nol bila arah gaya tegak lurus perpindahan.\n2. Kekekalan Energi: Ep + Ek selalu tetap pada sistem tanpa gesekan.\n\nKamu juga bisa mengujinya langsung di menu Simulasi!`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: ans,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[580px] max-h-[88vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                AI Tutor Fisika
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </h3>
              <p className="text-[10px] text-slate-400">Asisten Belajar Usaha & Energi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-2 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    isAi
                      ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                      : 'bg-sky-600 text-white rounded-tr-xs shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line text-xs font-sans">
                    {m.text}
                  </div>
                  <span className={`block text-[9px] mt-1 text-right ${isAi ? 'text-slate-400' : 'text-sky-200'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-1.5 items-center pl-2 text-slate-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            'Rumus W = F s cos θ',
            'Kenapa Ek nol di puncak?',
            'Teorema Usaha-Energi'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[10px] px-2.5 py-1 bg-slate-50 hover:bg-sky-50 hover:text-sky-700 text-slate-600 rounded-lg whitespace-nowrap border border-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan konsep fisika..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="p-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
