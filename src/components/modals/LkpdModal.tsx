import React, { useState } from 'react';
import { LkpdItem } from '../../types';
import { X, Send, CheckCircle2, FileText } from 'lucide-react';
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

  const [hypothesis, setHypothesis] = useState(
    'Jika sudut gaya ditarik semakin mendekati 90°, maka nilai usaha yang dihasilkan semakin mendekati nol.'
  );
  const [tableData] = useState([
    { trial: 1, force: 20, distance: 4, angle: 0, work: 80 },
    { trial: 2, force: 20, distance: 4, angle: 60, work: 40 },
    { trial: 3, force: 20, distance: 4, angle: 90, work: 0 }
  ]);
  const [conclusion, setConclusion] = useState(
    'Besar usaha sebanding dengan gaya F, perpindahan s, dan nilai cos(θ).'
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}

    setTimeout(() => {
      onSubmitSuccess(lkpd.id, 96);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[640px] max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                {lkpd.number}
              </span>
              <h3 className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                {lkpd.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50">
          {/* Section 1: Hipotesis */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <label className="block font-bold text-slate-800 text-xs">
              1. Hipotesis Percobaan
            </label>
            <textarea
              rows={2}
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Section 2: Tabel Pengamatan */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800 text-xs">
                2. Data Pengukuran
              </label>
              <span className="text-[10px] font-mono text-slate-400">W = F · s · cos(θ)</span>
            </div>

            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-1.5 text-center">No</th>
                  <th className="p-1.5">F (N)</th>
                  <th className="p-1.5">s (m)</th>
                  <th className="p-1.5">θ (°)</th>
                  <th className="p-1.5">W (Joule)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {tableData.map((r, i) => (
                  <tr key={i} className="bg-white">
                    <td className="p-1.5 text-center">{r.trial}</td>
                    <td className="p-1.5">{r.force}</td>
                    <td className="p-1.5">{r.distance}</td>
                    <td className="p-1.5">{r.angle}°</td>
                    <td className="p-1.5 font-bold text-sky-700">{r.work} J</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Kesimpulan */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <label className="block font-bold text-slate-800 text-xs">
              3. Kesimpulan Akhir
            </label>
            <textarea
              rows={2}
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>LKPD Berhasil Diserahkan (Nilai: 96)</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Laporan LKPD</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
