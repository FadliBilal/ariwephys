import React from 'react';
import { ScreenTab } from '../../types';
import { BookOpen, Camera, Play, Sparkles, FileText, Award, ArrowRight, Activity } from 'lucide-react';

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
    <div className="w-full pb-8 space-y-3.5 p-4 bg-slate-50 text-slate-800">
      {/* Clean White Hero Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            Fisika SMA/MA • Fase F
          </span>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
            Progress 68%
          </span>
        </div>

        <h2 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
          Usaha dan Energi Mekanik
        </h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Eksplorasi konsep usaha fisis, transformasi energi kinetik & potensial, dan simulasi skate ramp interaktif.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3.5">
          <button
            onClick={() => onNavigate('materi')}
            className="py-2.5 px-3 bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mulai Belajar</span>
          </button>

          <button
            onClick={() => onNavigate('simulasi')}
            className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/90 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 text-sky-600" />
            <span>Simulasi Ramp</span>
          </button>
        </div>
      </div>

      {/* 4 Feature Cards (Ultra Clean) */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Menu Utama
          </h3>
          <span className="text-[10px] text-slate-400">Siap Uji Coba</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Simulasi 3D */}
          <div
            onClick={() => onNavigate('simulasi')}
            className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-sky-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Simulasi Ramp</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Uji energi di lintasan</p>
            </div>
            <span className="text-[11px] text-sky-600 font-bold mt-2.5 flex items-center gap-1">
              Buka <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 2: AI Tutor */}
          <div
            onClick={() => onOpenAi()}
            className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">AI Tutor</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Tanya rumus & konsep</p>
            </div>
            <span className="text-[11px] text-amber-600 font-bold mt-2.5 flex items-center gap-1">
              Tanya <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 3: LKPD */}
          <div
            onClick={() => onNavigate('lkpd')}
            className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">3 LKPD Digital</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Lembar kerja praktikum</p>
            </div>
            <span className="text-[11px] text-emerald-600 font-bold mt-2.5 flex items-center gap-1">
              Kerjakan <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Card 4: Kuis HOTS */}
          <div
            onClick={() => onNavigate('fenomena')}
            className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Kuis HOTS</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">4 Soal evaluasi analitis</p>
            </div>
            <span className="text-[11px] text-indigo-600 font-bold mt-2.5 flex items-center gap-1">
              Mulai <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Clean AR Camera Banner */}
      <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Scan Augmented Reality (AR)</h4>
            <p className="text-[11px] text-slate-500">Sorot marker untuk melihat model 3D di meja</p>
          </div>
        </div>
        <button
          onClick={onOpenAr}
          className="py-1.5 px-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shrink-0 transition-all cursor-pointer shadow-xs"
        >
          Buka AR
        </button>
      </div>

      {/* Progress & Quick Continue */}
      <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-800">Unit 1: Usaha & Vektor Gaya</span>
          <span className="font-semibold text-sky-600">Lanjutkan</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2.5">
          <div className="h-full bg-sky-600 rounded-full w-3/4"></div>
        </div>
        <button
          onClick={() => onNavigate('materi')}
          className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-1 transition-colors cursor-pointer"
        >
          <span>Buka Rangkuman Materi</span>
          <ArrowRight className="w-3 h-3 text-slate-500" />
        </button>
      </div>
    </div>
  );
};
