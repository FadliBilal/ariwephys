import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles, Image, X } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeTabTitle?: string;
  onOpenAr?: () => void;
  onOpenAi?: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  onOpenAr,
  onOpenAi
}) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');
  const [showMockupModal, setShowMockupModal] = useState<boolean>(false);
  const [selectedMockup, setSelectedMockup] = useState<'flow' | 'login' | 'desktop'>('flow');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center justify-start p-2 sm:p-4 transition-colors">
      {/* Top Controller Bar */}
      <header className="w-full max-w-4xl mb-3 px-3.5 py-2 bg-white border border-slate-200/90 rounded-2xl flex flex-wrap items-center justify-between gap-2 shadow-xs z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center p-0.5">
            <img src="/logo-atom.svg" alt="ARIWEPHYS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-tight text-slate-900">ARIWEPHYS</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                Mobile Look
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Ponsel</span>
          </button>
          <button
            onClick={() => setViewMode('responsive')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'responsive'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web Responsif</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowMockupModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            <Image className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Mockup Acuan</span>
          </button>

          {onOpenAi && (
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Tutor</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      {viewMode === 'mobile' ? (
        <div className="relative my-auto flex flex-col items-center">
          {/* Smartphone Frame */}
          <div className="relative w-[380px] sm:w-[400px] h-[820px] max-h-[90vh] bg-slate-900 rounded-[44px] p-2.5 shadow-[0_20px_50px_-12px_rgba(2,132,199,0.2),0_0_0_10px_#0F172A] border-2 border-slate-700 flex flex-col overflow-hidden">
            
            {/* Dynamic Island */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-40 w-24 h-4.5 bg-slate-950 rounded-full flex items-center justify-between px-2.5 border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500/80"></div>
            </div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full bg-slate-50 text-slate-800 rounded-[36px] overflow-hidden flex flex-col">
              {/* Phone Status Bar */}
              <div className="w-full h-10 bg-white text-slate-800 px-6 pt-2 pb-1 flex items-center justify-between text-xs font-semibold z-30 select-none border-b border-slate-100">
                <span className="tracking-tight text-[11px] font-mono font-bold">09:41</span>
                <div className="flex items-center gap-1 text-slate-600 text-[10px] font-mono">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-slate-400 rounded-[2px] p-[1px] flex items-center">
                    <div className="w-full h-full bg-emerald-500 rounded-[1px]"></div>
                  </div>
                </div>
              </div>

              {/* Scrollable Mobile App Body */}
              <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar bg-slate-50">
                {children}
              </div>

              {/* iOS Home Indicator */}
              <div className="w-full h-4 bg-white flex items-center justify-center pointer-events-none z-30 border-t border-slate-100">
                <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-2 text-[11px] text-slate-500 font-medium">
            Tampilan Smartphone First-Mobile • Sentuh & gulir untuk uji coba
          </div>
        </div>
      ) : (
        /* Full-Width Responsive Screen View */
        <div className="w-full max-w-5xl bg-white text-slate-800 rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[800px]">
          <div className="flex-1 w-full overflow-y-auto">
            {children}
          </div>
        </div>
      )}

      {/* Design Mockup Reference Modal */}
      {showMockupModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Referensi Desain Mockup
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-200 text-xs">
                  <button
                    onClick={() => setSelectedMockup('flow')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                      selectedMockup === 'flow' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    5 Layar Mobile
                  </button>
                  <button
                    onClick={() => setSelectedMockup('login')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                      selectedMockup === 'login' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setSelectedMockup('desktop')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                      selectedMockup === 'desktop' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dashboard
                  </button>
                </div>

                <button
                  onClick={() => setShowMockupModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-50">
              {selectedMockup === 'flow' && (
                <img
                  src="/design-mockups/mockup-mobile-flow.jpg"
                  alt="5 Mobile Screen Flow Mockup"
                  className="max-h-[65vh] object-contain rounded-xl border border-slate-200 shadow-sm"
                />
              )}
              {selectedMockup === 'login' && (
                <img
                  src="/design-mockups/mockup-login.jpg"
                  alt="Login Screen Mockup"
                  className="max-h-[65vh] object-contain rounded-xl border border-slate-200 shadow-sm"
                />
              )}
              {selectedMockup === 'desktop' && (
                <img
                  src="/design-mockups/mockup-desktop.jpg"
                  alt="Desktop Dashboard Mockup"
                  className="max-h-[65vh] object-contain rounded-xl border border-slate-200 shadow-sm"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
