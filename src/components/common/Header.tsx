import React from 'react';
import { ScreenTab } from '../../types';
import { Sparkles, Camera } from 'lucide-react';

interface HeaderProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  onOpenAr: () => void;
  onOpenAi: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenAr,
  onOpenAi
}) => {
  const getTabLabel = () => {
    switch (currentTab) {
      case 'beranda': return 'Beranda';
      case 'materi': return 'Materi Usaha & Energi';
      case 'lkpd': return 'Lembar Kerja (LKPD)';
      case 'simulasi': return 'Simulasi Ramp 3D';
      case 'fenomena': return 'Kuis & Evaluasi HOTS';
      case 'panduan': return 'Panduan & Profil';
      default: return 'ARIWEPHYS';
    }
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md px-4 py-2.5 sticky top-0 z-20 border-b border-slate-200/80 shadow-xs flex items-center justify-between">
      {/* Brand & Tab Title */}
      <div className="flex items-center gap-2.5">
        <button 
          onClick={() => onTabChange('beranda')}
          className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center p-1 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="Beranda ARIWEPHYS"
        >
          <img src="/logo-atom.svg" alt="Atom Logo" className="w-full h-full object-contain" />
        </button>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-tight text-sky-900">
              ARIWEPHYS
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-xs font-bold text-slate-800">
              {getTabLabel()}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block leading-tight">
            Fisika Fase F • Usaha & Energi
          </span>
        </div>
      </div>

      {/* Minimalist Action Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenAr}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 transition-colors cursor-pointer"
          title="Kamera AR"
        >
          <Camera className="w-3.5 h-3.5 text-sky-600" />
          <span className="text-[11px]">AR</span>
        </button>

        <button
          onClick={onOpenAi}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 transition-colors cursor-pointer"
          title="AI Tutor"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px]">AI</span>
        </button>
      </div>
    </header>
  );
};
