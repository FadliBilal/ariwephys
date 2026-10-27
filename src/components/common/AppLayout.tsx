import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center">
      {/* Responsive Main App Shell (Centered on desktop, full-width on mobile) */}
      <div className="w-full max-w-2xl min-h-screen bg-slate-50 flex flex-col sm:border-x sm:border-slate-200/80 shadow-xs relative">
        {children}
      </div>
    </div>
  );
};
