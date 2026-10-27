import React, { useState } from 'react';
import { INITIAL_USER } from '../../data/physicsData';
import { Camera, Compass, Award, CheckCircle2, Download, ExternalLink, HelpCircle, User, ShieldCheck, LogOut, Sparkles } from 'lucide-react';

interface PanduanProfilScreenProps {
  onOpenAr: () => void;
  onLogout: () => void;
}

export const PanduanProfilScreen: React.FC<PanduanProfilScreenProps> = ({
  onOpenAr,
  onLogout
}) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [downloadMsg, setDownloadMsg] = useState(false);

  const handleDownloadCertificate = () => {
    setDownloadMsg(true);
    setTimeout(() => setDownloadMsg(false), 3000);
  };

  return (
    <div className="w-full pb-8 bg-slate-50 text-slate-800 space-y-4">
      {/* Profil Header Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-b-3xl shadow-lg border-b border-sky-800/40">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-amber-500 p-0.5 shadow-md shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">{user.name}</h3>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Siswa Aktif
              </span>
            </div>
            <p className="text-[10px] text-slate-300">{user.school}</p>
            <p className="text-[9px] font-mono text-sky-300 mt-0.5">NISN: {user.nisn}</p>
          </div>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Keluar / Ganti Akun"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Overview Bar */}
        <div className="mt-3.5 p-3 bg-slate-950/70 rounded-2xl border border-sky-600/30">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-300 font-semibold">Capaian Pembelajaran Fisika</span>
            <span className="font-mono font-bold text-amber-400">{user.progressPercent}% Selesai</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-amber-400 rounded-full"
              style={{ width: `${user.progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Panduan Penggunaan AR Marker */}
      <div className="px-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-sky-600" />
              Panduan Pemindaian Marker AR
            </h4>
            <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              WebAR Ready
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            Teknologi Augmented Reality pada ARIWEPHYS menghadirkan model 3D lintasan skate park dan vektor gaya langsung di hadapan Anda.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                1
              </span>
              <span className="text-[10px] font-bold text-slate-800 block">Izin Kamera</span>
              <span className="text-[9px] text-slate-500">Berikan akses kamera web/ponsel</span>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                2
              </span>
              <span className="text-[10px] font-bold text-slate-800 block">Arahkan Marker</span>
              <span className="text-[9px] text-slate-500">Sorot halaman cover LKPD/Buku</span>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                3
              </span>
              <span className="text-[10px] font-bold text-slate-800 block">Interaksi 3D</span>
              <span className="text-[9px] text-slate-500">Sentuh layar untuk manipulasi sudut</span>
            </div>
          </div>

          <button
            onClick={onOpenAr}
            className="w-full py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>Mulai Uji Coba Simulator Kamera AR</span>
          </button>
        </div>
      </div>

      {/* Peta Konsep Alur Belajar Fisika */}
      <div className="px-4">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" />
              Peta Konsep Kurikulum
            </h4>
            <span className="text-[10px] text-slate-400">Mind Map</span>
          </div>

          {/* Graphical Concept Tree Flow */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
            <div className="inline-block px-3 py-1 bg-sky-600 text-white font-bold text-xs rounded-lg shadow-xs">
              Usaha dan Energi Mekanik
            </div>
            
            <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-sky-800 block">USAHA (W)</span>
                <span className="text-[9px] text-slate-500 font-mono">W = F · s · cos(θ)</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-amber-800 block">ENERGI (E)</span>
                <span className="text-[9px] text-slate-500 font-mono">Ek + Ep = EM</span>
              </div>
            </div>

            <div className="w-0.5 h-3 bg-slate-300 mx-auto"></div>

            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block">Hukum Kekekalan Energi Mekanik</span>
              <span className="text-[9px] text-emerald-600 font-mono">EM₁ = EM₂ (Sistem Bebas Gesekan)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lencana & Pencapaian Belajar */}
      <div className="px-4">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Lencana Pencapaian
            </h4>
            <span className="text-[10px] text-slate-500">3 dari 4 Diraih</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {user.badges.map((b) => (
              <div
                key={b.id}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                  b.earned
                    ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="text-xl">{b.icon}</span>
                <div>
                  <h5 className="text-[11px] font-bold leading-tight">{b.name}</h5>
                  <span className="text-[9px] block text-slate-500">
                    {b.earned ? b.date : 'Terkunci'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="w-full mt-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Unduh Rekap Nilai & Sertifikat Belajar</span>
          </button>

          {downloadMsg && (
            <p className="text-[10px] text-emerald-600 font-semibold text-center mt-1 animate-pulse">
              ✓ Berkas sertifikat kompetensi berhasil diunduh.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
