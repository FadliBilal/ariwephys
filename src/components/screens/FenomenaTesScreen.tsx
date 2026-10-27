import React, { useState } from 'react';
import { HOTS_QUESTIONS, FAQ_LIST } from '../../data/physicsData';
import { QuizQuestion } from '../../types';
import { HelpCircle, Play, CheckCircle2, XCircle, ArrowRight, Brain, RotateCcw, ChevronDown, ChevronUp, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FenomenaTesScreenProps {
  onAskAi: (query: string) => void;
}

export const FenomenaTesScreen: React.FC<FenomenaTesScreenProps> = ({ onAskAi }) => {
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Active Inquiry Stage
  const [activeInquiryStage, setActiveInquiryStage] = useState<number>(1);

  const currentQ = HOTS_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (label: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: label
    }));
  };

  const handleCalculateScore = () => {
    let correctCount = 0;
    HOTS_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round((correctCount / HOTS_QUESTIONS.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    if (calculatedScore >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="w-full pb-8 bg-slate-50 text-slate-800 space-y-4">
      {/* Fenomena Nyata Banner (Video / Interactive Case Study) */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-b-3xl shadow-lg border-b border-sky-800/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Fenomena Kontekstual Fisika
          </span>
          <span className="text-[10px] text-sky-300">Studi Kasus 1</span>
        </div>

        <h3 className="text-xs font-bold text-white leading-tight">
          Transformasi Energi pada Mesin Rube Goldberg & Roller Coaster
        </h3>
        <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
          Amati bagaimana energi potensial gravitasi diubah menjadi energi kinetik, usaha hambatan angin, dan transfer momentum berantai secara estafet.
        </p>

        {/* Video / Interactive Simulation Thumbnail */}
        <div className="mt-3 relative w-full h-36 bg-slate-950 rounded-2xl border border-sky-600/30 overflow-hidden flex items-center justify-center group cursor-pointer">
          <svg className="w-full h-full opacity-60" viewBox="0 0 320 140" fill="none">
            {/* Roller coaster loop curve */}
            <path d="M 10 30 Q 90 140 150 140 C 200 140 220 20 170 20 C 130 20 130 140 230 140 L 310 140" stroke="#38BDF8" strokeWidth="4" />
            <circle cx="170" cy="20" r="7" fill="#F59E0B" />
          </svg>

          {/* Central Play Button */}
          <div className="absolute w-11 h-11 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all">
            <Play className="w-5 h-5 ml-0.5" />
          </div>

          <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 border border-slate-700">
            ▶ 01:45 • Studi Inkuiri: Loop Tertinggi
          </div>
        </div>
      </div>

      {/* 5-Tahap Sintaks Inkuiri Terbimbing */}
      <div className="px-4">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900">
              Sintaks Pembelajaran Inkuiri
            </h4>
            <span className="text-[10px] text-sky-600 font-semibold">5 Tahapan Riset</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center">
            {[
              { num: 1, title: 'Orientasi' },
              { num: 2, title: 'Hipotesis' },
              { num: 3, title: 'Uji Eksperimen' },
              { num: 4, title: 'Analisis' },
              { num: 5, title: 'Kesimpulan' }
            ].map(step => (
              <button
                key={step.num}
                onClick={() => setActiveInquiryStage(step.num)}
                className={`py-1.5 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                  activeInquiryStage === step.num
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[11px] font-bold font-mono">0{step.num}</span>
                <span className="text-[8px] font-medium leading-tight block truncate">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Content of Current Inquiry Step */}
          <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100 text-[11px] text-slate-700 space-y-1">
            {activeInquiryStage === 1 && (
              <p>
                <strong>Tahap 1 - Orientasi Fenomena:</strong> Mengamati fenomena kereta luncur yang tidak jatuh saat melewati loop vertikal dan mengidentifikasi besaran fisika yang terlibat (massa, jari-jari loop, ketinggian mula-mula).
              </p>
            )}
            {activeInquiryStage === 2 && (
              <p>
                <strong>Tahap 2 - Perumusan Masalah & Hipotesis:</strong> "Apakah kelajuan di dasar lintasan dipengaruhi oleh bentuk lekukan lintasan ataukah hanya bergantung pada beda ketinggian h?"
              </p>
            )}
            {activeInquiryStage === 3 && (
              <p>
                <strong>Tahap 3 - Pengujian Simulasi:</strong> Buka tab <strong>Simulasi</strong>, variasikan massa m dan ketinggian h awal, lalu catat energi kinetik di dasar lintasan.
              </p>
            )}
            {activeInquiryStage === 4 && (
              <p>
                <strong>Tahap 4 - Analisis Data:</strong> Bandingkan nilai Ek terukur dengan perhitungan rumus teoritis $Ek = m \cdot g \cdot h$. Evaluasi pengaruh koefisien gesek lintasan.
              </p>
            )}
            {activeInquiryStage === 5 && (
              <p>
                <strong>Tahap 5 - Kesimpulan:</strong> Energi mekanik total pada sistem konservatif adalah konstan, di mana seluruh energi potensial berubah menjadi energi kinetik tanpa dipengaruhi lintasan.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tes Evaluasi HOTS (Higher Order Thinking Skills) */}
      <div className="px-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-slate-900">
                Uji Kompetensi Soal HOTS
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
              Soal {currentQuestionIndex + 1} dari {HOTS_QUESTIONS.length}
            </span>
          </div>

          {/* Question Category & Level */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
              {currentQ.hotsCategory}
            </span>
            <span className="text-[10px] text-slate-400">
              {currentQ.context}
            </span>
          </div>

          {/* Question Text */}
          <p className="text-xs font-semibold text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            {currentQ.question}
          </p>

          {/* Multiple Choice Options */}
          <div className="space-y-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.label;
              const isCorrect = currentQ.correctAnswer === opt.label;

              let optionStyle = 'bg-white border-slate-200 hover:border-sky-300 text-slate-700';
              if (isSelected) {
                optionStyle = 'bg-sky-50 border-sky-500 text-sky-950 font-bold ring-1 ring-sky-500/30';
              }
              if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 line-through';
                }
              }

              return (
                <button
                  key={opt.label}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.label)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {opt.label}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[11px]">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5 text-sky-600" /> Pembahasan Konseptual:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {currentQ.explanation}
              </p>
              <button
                onClick={() => onAskAi(`Tolong jelaskan lebih detail soal HOTS nomor ${currentQ.id}: ${currentQ.question}`)}
                className="text-[10px] text-sky-600 font-bold hover:underline flex items-center gap-1 mt-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Tanya AI Tutor untuk langkah penyelesaian ini</span>
              </button>
            </div>
          )}

          {/* Quiz Navigation & Submit Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 cursor-pointer"
            >
              ← Soal Sebelumnya
            </button>

            {currentQuestionIndex < HOTS_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : !isSubmitted ? (
              <button
                onClick={handleCalculateScore}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 cursor-pointer"
              >
                Kirim & Lihat Nilai
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Tes</span>
              </button>
            )}
          </div>

          {/* Score Summary Box if Submitted */}
          {isSubmitted && (
            <div className="p-3 bg-gradient-to-r from-sky-950 to-slate-900 text-white rounded-xl text-center space-y-1">
              <span className="text-[10px] text-sky-300 uppercase tracking-wider font-semibold">
                Skor Evaluasi Kemampuan Analitis
              </span>
              <div className="text-2xl font-black font-mono text-amber-400">
                {score} / 100
              </div>
              <p className="text-[10px] text-slate-300">
                {score >= 75
                  ? 'Luar biasa! Pemahaman konsep Usaha & Energi kamu telah memenuhi kriteria ketuntasan HOTS.'
                  : 'Tetap semangat! Pelajari kembali materi dan gunakan AI Tutor untuk mengulas soal yang belum tepat.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Masalah Umum Accordion */}
      <div className="px-4">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            FAQ & Tanya Jawab Konsep
          </h4>

          <div className="space-y-1.5">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-2.5 text-left flex items-center justify-between text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-sky-600 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-2.5 text-[11px] text-slate-600 bg-white border-t border-slate-200 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
