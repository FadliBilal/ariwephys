import React, { useState } from 'react';
import { LKPD_LIST } from '../../data/physicsData';
import { LkpdItem } from '../../types';
import { FileText, Download, CheckCircle, Clock, PenTool } from 'lucide-react';

interface LkpdScreenProps {
  onOpenWorksheet: (lkpd: LkpdItem) => void;
}

export const LkpdScreen: React.FC<LkpdScreenProps> = ({ onOpenWorksheet }) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const completedCount = LKPD_LIST.filter(l => l.status === 'selesai').length;
  const progressPercent = Math.round((completedCount / LKPD_LIST.length) * 100);

  const handleDownload = (number: string) => {
    setDownloadNotice(number);
    setTimeout(() => setDownloadNotice(null), 2500);
  };

  return (
    <div className="w-full pb-8 space-y-3.5 p-4 bg-slate-50 text-slate-800">
      {/* Clean Progress Summary */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-900">
            Progres Praktikum Siswa
          </span>
          <span className="text-xs font-bold font-mono text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-100">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-sky-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span className="text-[11px] text-slate-500">
          {completedCount} dari {LKPD_LIST.length} Lembar Kerja terselesaikan
        </span>
      </div>

      {downloadNotice && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center animate-fade-in">
          ✓ Lembar {downloadNotice} (PDF) berhasil diunduh.
        </div>
      )}

      {/* List of 3 LKPD Items */}
      <div className="space-y-2.5">
        {LKPD_LIST.map((lkpd) => {
          const isDone = lkpd.status === 'selesai';
          return (
            <div
              key={lkpd.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-sky-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {lkpd.number}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lkpd.estimatedMinutes} Menit
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {lkpd.title}
                  </h4>
                </div>

                {isDone ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    Selesai ({lkpd.score})
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    Aktif
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                {lkpd.objective}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <button
                  onClick={() => onOpenWorksheet(lkpd)}
                  className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Buka Lembar Kerja' : 'Kerjakan Sekarang'}</span>
                </button>

                <button
                  onClick={() => handleDownload(lkpd.number)}
                  className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
