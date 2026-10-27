import React from 'react';
import { ScreenTab } from '../../types';
import { Sparkles, Camera, BookOpen, User, Bell } from 'lucide-react';

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
  onOpenAi,
  onLogout
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'beranda':
        return { main: 'ARIWEPHYS', step: 'Mobile', subtitle: 'Augmented Reality Intelligent Physics' };
      case 'materi':
        return { main: 'MENU MATERI', step: 'Unit 1-4', subtitle: 'Usaha dan Energi Mekanik' };
      case 'lkpd':
        return { main: 'MODUL & LKPD', step: '1.2/5', subtitle: 'Lembar Kerja Peserta Didik' };
      case 'simulasi':
        return { main: 'SIMULASI FISIKA', step: '2/5', subtitle: 'Ramp Interaktif & Diagram Energi' };
      case 'fenomena':
        return { main: 'FENOMENA & TES', step: '3/5', subtitle: 'Sintaks Inkuiri & Soal HOTS' };
      case 'panduan':
        return { main: 'PANDUAN & PROFIL', step: '4/5', subtitle: 'AR Marker & Status Pembelajaran' };
      default:
        return { main: 'ARIWEPHYS', step: 'Mobile', subtitle: '' };
    }
  };

  const title = getTabTitle();

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white px-4 py-3 sticky top-0 z-20 shadow-md border-b border-sky-900/40">
      <div className="flex items-center justify-between">
        {/* Left: Branding & Page Indicator */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onTabChange('beranda')}
            className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center p-1 shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title="Kembali ke Beranda"
          >
            <img src="/logo-atom.svg" alt="Atom Logo" className="w-full h-full object-contain" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-bold tracking-tight text-white uppercase">
                {title.main}
              </h1>
              {title.step && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {title.step}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-300 line-clamp-1">
              {title.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenAr}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/40 text-sky-200 transition-colors cursor-pointer"
            title="Scan AR Fisika"
          >
            <Camera className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-[10px] font-medium hidden xs:inline">AR</span>
          </button>

          <button
            onClick={onOpenAi}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 transition-colors cursor-pointer"
            title="Tanya AI Tutor"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-medium hidden xs:inline">AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
