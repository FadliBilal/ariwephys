import React, { useState } from 'react';
import { INITIAL_USER } from '../../data/physicsData';
import { Camera, Compass, Award, Download, LogOut, CheckCircle } from 'lucide-react';

interface PanduanProfilScreenProps {
  onOpenAr: () => void;
  onLogout: () => void;
}

export const PanduanProfilScreen: React.FC<PanduanProfilScreenProps> = ({
  onOpenAr,
  onLogout
}) => {
  const [user] = useState(INITIAL_USER);
  const [certNotice, setCertNotice] = useState(false);

  const handleDownload = () => {
    setCertNotice(true);
    setTimeout(() => setCertNotice(false), 2500);
  };

  return (
    <div className="w-full pb-8 space-y-3.5 p-4 bg-slate-50 text-slate-800">
      {/* Student Profile Clean Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
          />
          <div className="flex-1">
            <h3 className="text-xs font-bold text-slate-900">{user.name}</h3>
            <p className="text-[11px] text-slate-500">{user.school}</p>
            <p className="text-[10px] font-mono text-sky-700">NISN: {user.nisn}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-600">Capaian Pembelajaran</span>
            <span className="text-sky-700 font-bold font-mono">{user.progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sky-600 rounded-full w-[68%]"></div>
          </div>
        </div>
      </div>

      {/* 3-Step Clean AR Guide */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-sky-600" />
            Panduan Scan AR Fisika
          </h4>
          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
            3 Langkah
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
              1
            </span>
            <span className="text-[11px] font-bold text-slate-800 block">Izin Kamera</span>
            <span className="text-[10px] text-slate-500">Aktifkan kamera</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
              2
            </span>
            <span className="text-[11px] font-bold text-slate-800 block">Sorot Meja</span>
            <span className="text-[10px] text-slate-500">Arahkan ke marker</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
              3
            </span>
            <span className="text-[11px] font-bold text-slate-800 block">Eksplorasi 3D</span>
            <span className="text-[10px] text-slate-500">Amati grafik energi</span>
          </div>
        </div>

        <button
          onClick={onOpenAr}
          className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Buka Kamera AR</span>
        </button>
      </div>

      {/* Peta Konsep Ringkas */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2">
        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-sky-600" />
          Peta Alur Materi
        </h4>
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1.5 font-mono text-xs">
          <div className="p-1.5 bg-white rounded-lg border border-slate-200 font-bold text-sky-900">
            Usaha (W = F · s · cos θ)
          </div>
          <div className="text-slate-400">↓</div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700">
              Ek = ½ m v²
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700">
              Ep = m g h
            </div>
          </div>
          <div className="text-slate-400">↓</div>
          <div className="p-1.5 bg-sky-50 rounded-lg border border-sky-200 text-sky-800 font-bold text-[11px]">
            Hukum Kekekalan EM (EM₁ = EM₂)
          </div>
        </div>
      </div>

      {/* Badges & Certificate */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Lencana Pencapaian
          </h4>
          <span className="text-[10px] text-slate-400">3 / 4 Terbuka</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {user.badges.map((b) => (
            <div
              key={b.id}
              className={`p-2 rounded-xl border flex items-center gap-2 ${
                b.earned ? 'bg-amber-50/50 border-amber-200 text-slate-800' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}
            >
              <span className="text-lg">{b.icon}</span>
              <div>
                <span className="text-xs font-bold block leading-tight">{b.name}</span>
                <span className="text-[9px] text-slate-400">{b.earned ? b.date : 'Terkunci'}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleDownload}
          className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          <span>Unduh Rekap Nilai & Sertifikat</span>
        </button>

        {certNotice && (
          <p className="text-xs text-emerald-600 font-bold text-center">
            ✓ Berkas sertifikat kompetensi berhasil diunduh.
          </p>
        )}
      </div>
    </div>
  );
};
