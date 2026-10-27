import React, { useState } from 'react';
import { Smartphone, Monitor, Maximize2, Sparkles, Image, X } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeTabTitle?: string;
  onOpenAr?: () => void;
  onOpenAi?: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeTabTitle,
  onOpenAr,
  onOpenAi
}) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');
  const [showMockupModal, setShowMockupModal] = useState<boolean>(false);
  const [selectedMockup, setSelectedMockup] = useState<'login' | 'desktop' | 'flow'>('flow');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 transition-colors duration-300">
      {/* Top Controller Bar (Switcher for Reviewers/Users) */}
      <header className="w-full max-w-5xl mb-4 px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <img src="/logo-atom.svg" alt="ARIWEPHYS Logo" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">ARIWEPHYS</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                First Mobile Look
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Augmented Reality Intelligent Web Physics Learning
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Tampilan Ponsel</span>
          </button>
          <button
            onClick={() => setViewMode('responsive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              viewMode === 'responsive'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web Responsif</span>
          </button>
        </div>

        {/* Fast Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMockupModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            title="Lihat Referensi Desain Lomba"
          >
            <Image className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Desain Referensi</span>
          </button>

          {onOpenAi && (
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
              title="Tanya AI Tutor Cerdas"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">AI Tutor</span>
            </button>
          )}

          {onOpenAr && (
            <button
              onClick={onOpenAr}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 transition-all cursor-pointer"
              title="Simulasi Kamera AR"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Jelajahi AR</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      {viewMode === 'mobile' ? (
        /* Realistic Mobile Device Frame */
        <div className="relative my-auto flex flex-col items-center">
          <div className="relative w-[380px] sm:w-[410px] h-[830px] max-h-[92vh] bg-slate-900 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.25),0_0_0_12px_#1E293B,0_0_0_14px_#334155] border-4 border-slate-700/80 flex flex-col overflow-hidden">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-28 h-5 bg-slate-950 rounded-full flex items-center justify-between px-3 border border-slate-800 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-sky-500/80"></div>
              </div>
              <div className="w-2 h-2 rounded-full bg-amber-500/40"></div>
            </div>

            {/* Hardware Side Button Accents */}
            <div className="absolute -left-4.5 top-28 w-1 h-10 bg-slate-700 rounded-l-sm"></div>
            <div className="absolute -left-4.5 top-42 w-1 h-12 bg-slate-700 rounded-l-sm"></div>
            <div className="absolute -left-4.5 top-58 w-1 h-12 bg-slate-700 rounded-l-sm"></div>
            <div className="absolute -right-4.5 top-36 w-1 h-16 bg-slate-700 rounded-r-sm"></div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full bg-slate-50 text-slate-800 rounded-[38px] overflow-hidden flex flex-col shadow-inner">
              {/* Phone Status Bar */}
              <div className="w-full h-11 bg-slate-900 text-slate-200 px-6 pt-2 pb-1 flex items-center justify-between text-xs font-semibold z-30 select-none">
                <span className="tracking-tight text-[11px] font-mono">09:41</span>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[10px] tracking-widest font-mono">5G</span>
                  <div className="w-5 h-2.5 border border-slate-400 rounded-[3px] p-[1px] flex items-center">
                    <div className="w-3/4 h-full bg-emerald-400 rounded-[1px]"></div>
                  </div>
                </div>
              </div>

              {/* Scrollable Mobile App Body */}
              <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar">
                {children}
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-full h-5 bg-slate-900/90 backdrop-blur-md flex items-center justify-center pointer-events-none z-30">
                <div className="w-32 h-1 bg-slate-400/60 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3 text-xs text-slate-400">
            Tampilan Smartphone First-Mobile • Sentuh & gulir interaktif
          </div>
        </div>
      ) : (
        /* Full-Width Responsive Screen View */
        <div className="w-full max-w-6xl bg-slate-50 text-slate-800 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col min-h-[820px]">
          <div className="flex-1 w-full overflow-y-auto">
            {children}
          </div>
        </div>
      )}

      {/* Design Reference Mockup Modal */}
      {showMockupModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Image className="w-4 h-4 text-amber-400" />
                  Referensi Desain Mockup ARIWEPHYS
                </h3>
                <p className="text-xs text-slate-400">
                  Desain konseptual yang diadaptasi menjadi aplikasi web interaktif first-mobile
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setSelectedMockup('flow')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      selectedMockup === 'flow' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    5 Layar Mobile
                  </button>
                  <button
                    onClick={() => setSelectedMockup('login')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      selectedMockup === 'login' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Login Ponsel
                  </button>
                  <button
                    onClick={() => setSelectedMockup('desktop')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      selectedMockup === 'desktop' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Dashboard Web
                  </button>
                </div>

                <button
                  onClick={() => setShowMockupModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              {selectedMockup === 'flow' && (
                <img
                  src="/design-mockups/mockup-mobile-flow.jpg"
                  alt="5 Mobile Screen Flow Mockup"
                  className="max-h-[70vh] object-contain rounded-xl border border-slate-800 shadow-xl"
                />
              )}
              {selectedMockup === 'login' && (
                <img
                  src="/design-mockups/mockup-login.jpg"
                  alt="Login Screen Mockup"
                  className="max-h-[70vh] object-contain rounded-xl border border-slate-800 shadow-xl"
                />
              )}
              {selectedMockup === 'desktop' && (
                <img
                  src="/design-mockups/mockup-desktop.jpg"
                  alt="Desktop Dashboard Mockup"
                  className="max-h-[70vh] object-contain rounded-xl border border-slate-800 shadow-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
