import React, { useState } from 'react';
import { Image, X, Sparkles } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  onOpenAr?: () => void;
  onOpenAi?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onOpenAr,
  onOpenAi
}) => {
  const [showMockupModal, setShowMockupModal] = useState<boolean>(false);
  const [selectedMockup, setSelectedMockup] = useState<'flow' | 'login' | 'desktop'>('flow');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center">
      {/* Top Utility Bar (for Quick Mockup Comparison & AI on large screens) */}
      <div className="w-full bg-white border-b border-slate-200/80 px-4 py-1.5 flex items-center justify-between text-xs z-30">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ARIWEPHYS
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">• Web App Fisika Interaktif</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMockupModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <Image className="w-3.5 h-3.5 text-slate-500" />
            <span>Referensi Mockup</span>
          </button>
        </div>
      </div>

      {/* Responsive Main App Shell (Centered on desktop, full-width on mobile) */}
      <div className="w-full max-w-2xl min-h-[calc(100vh-37px)] bg-slate-50 flex flex-col sm:border-x sm:border-slate-200/80 shadow-xs relative">
        {children}
      </div>

      {/* Mockup Reference Modal */}
      {showMockupModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">
                Referensi Desain Mockup Asli
              </h3>

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
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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
