import React from 'react';
import { ScreenTab } from '../../types';
import { Home, BookOpen, FileSpreadsheet, PlayCircle, HelpCircle, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems: { id: ScreenTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'materi',
      label: 'Materi',
      icon: <BookOpen className="w-5 h-5" />,
      badge: '4'
    },
    {
      id: 'lkpd',
      label: 'LKPD',
      icon: <FileSpreadsheet className="w-5 h-5" />
    },
    {
      id: 'simulasi',
      label: 'Simulasi',
      icon: <PlayCircle className="w-5 h-5" />,
      badge: '3D'
    },
    {
      id: 'fenomena',
      label: 'Tes HOTS',
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: 'panduan',
      label: 'Panduan',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <nav className="w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-400 py-1.5 px-2 flex items-center justify-around sticky bottom-0 z-20 shadow-lg">
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center relative py-1 px-2 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-sky-400 scale-105 font-bold'
                : 'text-slate-400 hover:text-slate-200 active:scale-95'
            }`}
          >
            {/* Active Highlight Pill */}
            {isActive && (
              <span className="absolute -top-1 w-6 h-1 bg-gradient-to-r from-sky-400 to-amber-400 rounded-full"></span>
            )}

            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black px-1 rounded-full shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] mt-0.5 tracking-tight font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
