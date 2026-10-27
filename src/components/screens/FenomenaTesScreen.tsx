import React, { useState } from 'react';
import { HOTS_QUESTIONS, FAQ_LIST } from '../../data/physicsData';
import { Award, CheckCircle2, XCircle, ArrowRight, Brain, RotateCcw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FenomenaTesScreenProps {
  onAskAi: (query: string) => void;
}

export const FenomenaTesScreen: React.FC<FenomenaTesScreenProps> = ({ onAskAi }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentQ = HOTS_QUESTIONS[currentIdx];

  const handleSelect = (label: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: label
    }));
  };

  const handleSubmit = () => {
    let count = 0;
    HOTS_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) count++;
    });
    const finalScore = Math.round((count / HOTS_QUESTIONS.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 75) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setScore(0);
  };

  return (
    <div className="w-full pb-8 space-y-3.5 p-4 bg-slate-50 text-slate-800">
      {/* Quiz Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Header Question */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-900">
              Kuis Fisika HOTS
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
            Soal {currentIdx + 1} / {HOTS_QUESTIONS.length}
          </span>
        </div>

        {/* Level Tag */}
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-500">{currentQ.hotsCategory}</span>
          <span className="text-slate-400">{currentQ.context}</span>
        </div>

        {/* Question Text */}
        <p className="text-xs font-bold text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswers[currentQ.id] === opt.label;
            const isCorrect = currentQ.correctAnswer === opt.label;

            let btnStyle = 'bg-slate-50 border-slate-200 hover:border-sky-300 text-slate-700';
            if (isSelected) {
              btnStyle = 'bg-sky-50 border-sky-600 text-sky-950 font-bold ring-1 ring-sky-600/30';
            }
            if (isSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 line-through';
              }
            }

            return (
              <button
                key={opt.label}
                disabled={isSubmitted}
                onClick={() => handleSelect(opt.label)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {opt.label}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isSubmitted && (
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-1 text-[11px] text-slate-700 leading-relaxed">
            <span className="font-bold text-sky-900 block">Pembahasan:</span>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation & Submit Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
          >
            ← Kembali
          </button>

          {currentIdx < HOTS_QUESTIONS.length - 1 ? (
            <button
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : !isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Kirim Jawaban
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi</span>
            </button>
          )}
        </div>

        {/* Score Box */}
        {isSubmitted && (
          <div className="p-3 bg-slate-900 text-white rounded-xl text-center">
            <span className="text-[10px] text-slate-400 block font-semibold">Skor Akhir Evaluasi</span>
            <div className="text-2xl font-black font-mono text-amber-400 my-0.5">{score} / 100</div>
            <span className="text-[11px] text-slate-300">
              {score >= 75 ? 'Hebat! Pemahaman konsep sudah sangat baik.' : 'Ulangi lagi untuk mengasah pemahamanmu.'}
            </span>
          </div>
        )}
      </div>

      {/* Clean FAQ Accordion */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2">
        <h4 className="text-xs font-bold text-slate-900">Pertanyaan Populer</h4>
        <div className="space-y-1.5">
          {FAQ_LIST.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-2.5 text-left text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-3.5 h-3.5 text-sky-600" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="p-2.5 text-[11px] text-slate-600 bg-white border-t border-slate-200 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
