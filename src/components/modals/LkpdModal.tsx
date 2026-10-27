import React, { useState } from 'react';
import { LkpdItem } from '../../types';
import { X, Save, Send, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LkpdModalProps {
  lkpd: LkpdItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (lkpdId: number, score: number) => void;
}

export const LkpdModal: React.FC<LkpdModalProps> = ({
  lkpd,
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  if (!isOpen || !lkpd) return null;

  const [hypothesis, setHypothesis] = useState(lkpd.hypothesisGuide || '');
  const [tableData, setTableData] = useState([
    { trial: 1, force: 20, distance: 4, angle: 0, work: 80 },
    { trial: 2, force: 20, distance: 4, angle: 60, work: 40 },
    { trial: 3, force: 20, distance: 4, angle: 90, work: 0 }
  ]);
  const [analysis, setAnalysis] = useState(
    'Berdasarkan data pengamatan, ketika sudut gaya diperbesar hingga 90 derajat, usaha bernilai nol karena cos(90°) = 0.'
  );
  const [conclusion, setConclusion] = useState(
    'Usaha dipengaruhi oleh besar gaya, jarak perpindahan, dan kosinus sudut antara arah gaya dan perpindahan.'
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setTimeout(() => {
      onSubmitSuccess(lkpd.id, 96);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[700px] max-h-[92vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between border-b border-sky-800/40">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <div>
              <span className="text-[9px] font-mono font-bold text-sky-300 bg-sky-500/20 px-1.5 py-0.5 rounded border border-sky-500/30">
                {lkpd.number}
              </span>
              <h3 className="text-xs font-bold text-white leading-tight mt-0.5">
                Lembar Kerja Peserta Didik Digital
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-800 bg-slate-50">
          {/* Title & Objective Card */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
            <h4 className="font-bold text-slate-900 text-xs">{lkpd.title}</h4>
            <p className="text-[11px] text-slate-500">{lkpd.objective}</p>
          </div>

          {/* Section 1: Rumusan Hipotesis */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <label className="block font-bold text-slate-800 text-[11px]">
              1. Rumusan Hipotesis Peserta Didik
            </label>
            <textarea
              rows={2}
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Section 2: Tabel Pengamatan Praktikum */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 text-[11px]">
                2. Tabel Data Eksperimen / Pengukuran
              </label>
              <span className="text-[10px] text-slate-400 font-mono">W = F·s·cos(θ)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-1.5">Percobaan</th>
                    <th className="p-1.5">Gaya F (N)</th>
                    <th className="p-1.5">Jarak s (m)</th>
                    <th className="p-1.5">Sudut θ (°)</th>
                    <th className="p-1.5">Usaha W (J)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="p-1.5 text-center font-bold">{row.trial}</td>
                      <td className="p-1.5">{row.force}</td>
                      <td className="p-1.5">{row.distance}</td>
                      <td className="p-1.5">{row.angle}°</td>
                      <td className="p-1.5 font-bold text-sky-700">{row.work} J</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Analisis & Kesimpulan */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div>
              <label className="block font-bold text-slate-800 text-[11px] mb-1">
                3. Analisis Hasil Pengamatan
              </label>
              <textarea
                rows={2}
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                required
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 text-[11px] mb-1">
                4. Kesimpulan Inkuiri
              </label>
              <textarea
                rows={2}
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                required
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>LKPD Berhasil Diserahkan (Nilai: 96)</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Laporan LKPD ke Guru Pengampu</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
