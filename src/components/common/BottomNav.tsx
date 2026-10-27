import React from 'react';
import { ScreenTab } from '../../types';
import { Home, BookOpen, PlayCircle, FileText, Award, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: ScreenTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'simulasi', label: 'Simulasi', icon: <PlayCircle className="w-5 h-5" /> },
    { id: 'lkpd', label: 'LKPD', icon: <FileText className="w-5 h-5" /> },
    { id: 'fenomena', label: 'Kuis', icon: <Award className="w-5 h-5" /> },
    { id: 'panduan', label: 'Profil', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <nav className="w-full bg-white border-t border-slate-200/90 text-slate-500 py-1.5 px-2 flex items-center justify-around sticky bottom-0 z-20 shadow-md select-none">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-sky-600 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-700 active:scale-95'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-600 rounded-full"></span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
