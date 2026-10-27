import React from 'react';
import { ScreenTab } from '../../types';
import { BookOpen, Camera, Sparkles, Compass, CheckCircle2, ArrowRight, Play, Flame, Brain, HelpCircle } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: ScreenTab) => void;
  onOpenAr: () => void;
  onOpenAi: (initialQuery?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenAr,
  onOpenAi
}) => {
  return (
    <div className="w-full pb-6 space-y-4 text-slate-800 bg-slate-50">
      {/* Hero Banner with Physics Ramp Illustration */}
      <div className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-white p-5 rounded-b-3xl shadow-xl overflow-hidden border-b border-sky-800/40">
        {/* Background glow and subtle vector geometry */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Tagline */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[10px] font-semibold mb-2">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Selamat Datang di ARIWEPHYS</span>
        </div>

        <h2 className="text-xl font-extrabold tracking-tight text-white leading-tight">
          ARIWEPHYS <span className="text-sky-400 text-sm font-semibold">(Mobile)</span>
        </h2>
        <p className="text-[11px] text-sky-200/90 font-medium mt-0.5">
          Augmented Reality Intelligent Web Physics for Work and Energy Learning
        </p>

        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
          Media pembelajaran Fisika berbasis Augmented Reality dan Artificial Intelligence dengan pendekatan <span className="text-amber-300 font-semibold">inquiry terbimbing</span> untuk memahami konsep Usaha dan Energi secara interaktif, visual, dan bermakna.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 mt-4">
          <button
            onClick={() => onNavigate('materi')}
            className="flex-1 py-2 px-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mulai Belajar</span>
          </button>

          <button
            onClick={onOpenAr}
            className="flex-1 py-2 px-3.5 bg-slate-900/80 hover:bg-slate-800 active:scale-95 text-sky-200 border border-sky-500/40 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Camera className="w-4 h-4 text-sky-400" />
            <span>Jelajahi AR</span>
          </button>
        </div>

        {/* Interactive Physics Ramp Teaser */}
        <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-sky-500/30 backdrop-blur-md">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-sky-300 flex items-center gap-1">
              <Play className="w-3 h-3 text-amber-400" /> Simulasi Ramp Usaha & Energi
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40">
              Live Interactive
            </span>
          </div>

          <div className="w-full h-24 bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-800">
            {/* Curved ramp line */}
            <svg className="w-full h-full" viewBox="0 0 320 90" fill="none">
              <path d="M 20 15 Q 120 75 220 75 L 300 75" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
              <path d="M 20 15 Q 120 75 220 75 L 300 75 L 300 90 L 20 90 Z" fill="rgba(56, 189, 248, 0.08)" />
              {/* Ball on ramp */}
              <circle cx="105" cy="58" r="9" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
              {/* Force vector arrows */}
              <line x1="105" y1="58" x2="105" y2="82" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="105" y1="58" x2="88" y2="40" stroke="#10B981" strokeWidth="2" />
            </svg>
            <div className="absolute top-2 left-2 text-[10px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 font-mono">
              Ep = m·g·h = 490 J
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 font-mono">
              Ek = ½·m·v² = 490 J
            </div>
          </div>

          <button
            onClick={() => onNavigate('simulasi')}
            className="w-full mt-2 py-1.5 bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            <span>Uji Coba Simulator Skate Park</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Pilar Pembelajaran ARIWEPHYS */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            4 Pilar Pembelajaran
          </h3>
          <span className="text-[10px] text-sky-600 font-semibold">Kurikulum Merdeka</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: AR */}
          <div
            onClick={onOpenAr}
            className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2 border border-sky-100">
                <Camera className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Augmented Reality</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                Visualisasi 3D konsep vektor gaya, lintasan gerak, dan energi langsung di mejamu.
              </p>
            </div>
            <span className="text-[10px] text-sky-600 font-semibold mt-2 inline-flex items-center gap-0.5">
              Buka AR <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Card 2: AI Tutor */}
          <div
            onClick={() => onOpenAi()}
            className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 border border-amber-100">
                <Brain className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">AI Tutor Cerdas</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                Tanya konsep fisika Usaha & Energi kapan saja, dapatkan solusi dan bimbingan instan.
              </p>
            </div>
            <span className="text-[10px] text-amber-600 font-semibold mt-2 inline-flex items-center gap-0.5">
              Tanya AI <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Card 3: Pendekatan Inkuiri */}
          <div
            onClick={() => onNavigate('lkpd')}
            className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 border border-emerald-100">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Pendekatan Inkuiri</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                Belajar melalui observasi, hipotesis, manipulasi variabel, dan pembuktian empiris.
              </p>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-2 inline-flex items-center gap-0.5">
              Akses LKPD <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Card 4: Berpikir Kritis HOTS */}
          <div
            onClick={() => onNavigate('fenomena')}
            className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 border border-indigo-100">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Berpikir Kritis HOTS</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                Asah kemampuan analitis dan evaluatif melalui studi fenomena kontekstual nyata.
              </p>
            </div>
            <span className="text-[10px] text-indigo-600 font-semibold mt-2 inline-flex items-center gap-0.5">
              Mulai Tes <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Materi Terkini Shortcut */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Daftar Modul Belajar
          </h3>
          <button
            onClick={() => onNavigate('materi')}
            className="text-[11px] text-sky-600 font-bold hover:underline flex items-center gap-0.5"
          >
            Lihat Semua <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          <div
            onClick={() => onNavigate('materi')}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-all flex items-center justify-between cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                01
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Usaha (Vektor dan Definisi)</h4>
                <p className="text-[10px] text-slate-500 font-mono">W = F · s · cos(θ)</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-semibold">
              Selesai
            </span>
          </div>

          <div
            onClick={() => onNavigate('materi')}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-all flex items-center justify-between cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                02
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Energi Kinetik & Teorema Usaha</h4>
                <p className="text-[10px] text-slate-500 font-mono">Ek = ½ m v²  |  W_net = ΔEk</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full font-semibold">
              Sedang Belajar
            </span>
          </div>

          <div
            onClick={() => onNavigate('materi')}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-all flex items-center justify-between cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                04
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Hukum Kekekalan Energi Mekanik</h4>
                <p className="text-[10px] text-slate-500 font-mono">EM₁ = EM₂ (Ep + Ek = Tetap)</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-semibold">
              Terkunci
            </span>
          </div>
        </div>
      </div>

      {/* AI Tutor Floating Shortcut Card */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white p-3.5 rounded-2xl border border-sky-800/60 shadow-md">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                Tanya AI Tutor - ARIWEPHYS
              </h4>
              <p className="text-[10px] text-slate-300 mt-0.5">
                Ada pertanyaan tentang rumus atau konsep Usaha & Energi? AI Tutor siap membantu 24/7.
              </p>
              {/* Quick sample prompt chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  onClick={() => onOpenAi('Mengapa usaha bernilai nol saat arah gaya tegak lurus perpindahan?')}
                  className="text-[9px] px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-sky-200 rounded-md border border-slate-700 transition-colors"
                >
                  Kenapa W = 0 jika tegak lurus?
                </button>
                <button
                  onClick={() => onOpenAi('Bagaimana hukum kekekalan energi berlaku pada roller coaster?')}
                  className="text-[9px] px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-sky-200 rounded-md border border-slate-700 transition-colors"
                >
                  Kekekalan energi di roller coaster?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
