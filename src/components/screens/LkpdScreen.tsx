import React, { useState } from 'react';
import { LKPD_LIST } from '../../data/physicsData';
import { LkpdItem } from '../../types';
import { FileText, Download, CheckCircle, Clock, ArrowRight, Eye, Sparkles, BookOpen, PenTool } from 'lucide-react';

interface LkpdScreenProps {
  onOpenWorksheet: (lkpd: LkpdItem) => void;
}

export const LkpdScreen: React.FC<LkpdScreenProps> = ({ onOpenWorksheet }) => {
  const [selectedLkpd, setSelectedLkpd] = useState<LkpdItem>(LKPD_LIST[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const completedCount = LKPD_LIST.filter(l => l.status === 'selesai').length;
  const progressPercent = Math.round((completedCount / LKPD_LIST.length) * 100);

  const handleDownloadPdf = (lkpd: LkpdItem) => {
    setDownloadSuccess(lkpd.number);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="w-full pb-8 bg-slate-50 text-slate-800 space-y-4">
      {/* Top Banner: Akses Modul Ajar Digital */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-b-3xl shadow-lg border-b border-sky-800/40">
        <div className="flex items-start gap-3">
          <div className="w-14 h-18 bg-white/10 rounded-xl p-1.5 border border-sky-400/40 shadow-md flex flex-col justify-between shrink-0">
            <div className="w-full flex items-center justify-between text-[8px] text-sky-300 font-mono">
              <span>PDF</span>
              <span>2026</span>
            </div>
            <div className="text-center">
              <FileText className="w-6 h-6 text-sky-300 mx-auto" />
              <span className="text-[7px] text-slate-200 block font-bold leading-tight mt-0.5">MODUL AJAR</span>
            </div>
            <div className="w-full h-1 bg-amber-400 rounded-full"></div>
          </div>

          <div className="flex-1">
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 inline-block mb-1">
              Kurikulum Merdeka • Fase F
            </span>
            <h3 className="text-xs font-bold text-white leading-tight">
              Akses Modul Ajar Digital Fisika
            </h3>
            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
              Panduan pembelajaran lengkap Usaha dan Energi dengan sintaks inquiry terbimbing, alur tujuan pembelajaran (ATP), dan rubrik asesmen autentik.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => alert('Modul Ajar Fisika (Fase F - Usaha & Energi) siap dibuka dalam penampil dokumen digital.')}
                className="py-1 px-2.5 bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <Eye className="w-3 h-3" />
                <span>Baca Modul Ajar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar LKPD per unit */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Daftar LKPD Penyelidikan
          </h3>
          <span className="text-[10px] text-slate-500 font-medium">3 Unit Eksperimen</span>
        </div>

        <div className="space-y-2.5">
          {LKPD_LIST.map((lkpd) => {
            const isSelected = selectedLkpd.id === lkpd.id;
            return (
              <div
                key={lkpd.id}
                onClick={() => setSelectedLkpd(lkpd)}
                className={`p-3.5 bg-white rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        lkpd.status === 'selesai'
                          ? 'bg-emerald-100 text-emerald-700'
                          : lkpd.status === 'sedang'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                          {lkpd.number}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {lkpd.estimatedMinutes} Menit
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                        {lkpd.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                        {lkpd.objective}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 text-right">
                    {lkpd.status === 'selesai' ? (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        {lkpd.score ? `Skor: ${lkpd.score}` : 'Selesai'}
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        Sedang Aktif
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional details for selected LKPD */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <span className="font-bold text-slate-800 block mb-0.5">Sintaks Inkuiri:</span>
                      <span>{lkpd.inquiryStep}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenWorksheet(lkpd);
                        }}
                        className="flex-1 py-1.5 px-3 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <PenTool className="w-3 h-3" />
                        <span>Kerjakan Lembar Kerja</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadPdf(lkpd);
                        }}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>

                    {downloadSuccess === lkpd.number && (
                      <p className="text-[10px] text-emerald-600 font-semibold text-center mt-1 animate-pulse">
                        ✓ Berkas {lkpd.number} berhasil diunduh ke perangkat Anda.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unduh & Kerjakan Progress Box */}
      <div className="px-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Penyelesaian LKPD & Praktikum
              </h4>
              <p className="text-[10px] text-slate-500">
                Progres pengumpulan laporan praktikum inkuiri fisika
              </p>
            </div>
            <span className="text-xs font-black font-mono text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
              {progressPercent}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>{completedCount} dari {LKPD_LIST.length} LKPD Selesai</span>
            <span>Tersisa 1 LKPD Belum Diserahkan</span>
          </div>

          {/* Bottom Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onOpenWorksheet(selectedLkpd)}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Kerjakan Sekarang</span>
            </button>

            <button
              onClick={() => handleDownloadPdf(selectedLkpd)}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-slate-300/80 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Unduh LKPD (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
