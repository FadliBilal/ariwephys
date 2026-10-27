import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, RefreshCw, Eye, Sparkles, Layers, Sliders, CheckCircle } from 'lucide-react';

interface ArCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArCameraModal: React.FC<ArCameraModalProps> = ({ isOpen, onClose }) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [markerDetected, setMarkerDetected] = useState<boolean>(true);
  const [rampTilt, setRampTilt] = useState<number>(35); // degrees
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isOpen && cameraActive) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setStreamError(null);
        })
        .catch(err => {
          setStreamError('Kamera fisik tidak dapat diakses atau izin ditolak. Menggunakan mode simulasi AR berkualitas tinggi.');
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, cameraActive]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-950 rounded-3xl border border-sky-500/40 shadow-2xl overflow-hidden flex flex-col h-[680px] max-h-[92vh] relative">
        {/* Top AR HUD Bar */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-xs font-bold font-mono tracking-wider text-sky-300">
              ARIWEPHYS • AR VIEW
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCameraActive(!cameraActive)}
              className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors"
            >
              <Camera className="w-3 h-3" />
              <span>{cameraActive ? 'Kamera Nyata Aktif' : 'Simulasi Meja AR'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AR Viewport */}
        <div className="flex-1 w-full relative bg-slate-900 overflow-hidden flex items-center justify-center">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            /* High-Res Realistic Physics Lab / Desk Backdrop */
            <div className="w-full h-full relative bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 flex items-center justify-center">
              {/* Augmented Grid on Flat Surface */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
              
              <div className="text-center text-slate-400 text-xs px-4 pointer-events-none select-none">
                <p className="font-mono text-[11px] text-sky-400/80 mb-1">
                  [ AR MARKER DETECTED ON SURFACE ]
                </p>
                <p className="text-[10px] text-slate-500">
                  Model 3D Usaha & Energi diproyeksikan secara stabil
                </p>
              </div>
            </div>
          )}

          {/* AR 3D Holographic Ramp & Vector Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Holographic 3D Ramp Projection */}
            <svg className="w-full h-80 max-w-sm" viewBox="0 0 320 200" fill="none">
              <defs>
                <linearGradient id="arHolo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.9" />
                  <stop offset="100%" stop-color="#0284C7" stop-opacity="0.4" />
                </linearGradient>
              </defs>

              {/* Surface Tracking Plane Reticle */}
              <ellipse cx="160" cy="150" rx="110" ry="32" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <circle cx="160" cy="150" r="3" fill="#38BDF8" />

              {/* Hologram Ramp */}
              <path
                d="M 50 60 Q 150 155 270 155"
                stroke="url(#arHolo)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))"
              />

              {/* Support legs */}
              <line x1="50" y1="60" x2="50" y2="155" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
              <line x1="50" y1="155" x2="270" y2="155" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />

              {/* Holographic Sphere / Skater */}
              <g transform="translate(140, 135)">
                <circle cx="0" cy="0" r="12" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" filter="drop-shadow(0 0 10px #F59E0B)" />
                {/* 3D Normal Vector Arrow */}
                <line x1="0" y1="0" x2="-18" y2="-28" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="-26" y="-30" fill="#38BDF8" fontSize="10" fontWeight="bold">N</text>

                {/* 3D Gravity Vector */}
                <line x1="0" y1="0" x2="0" y2="35" stroke="#EF4444" strokeWidth="2.5" />
                <text x="4" y="36" fill="#EF4444" fontSize="10" fontWeight="bold">w = mg</text>
              </g>

              {/* Live AR Formula Floater */}
              <g transform="translate(50, 40)">
                <rect width="90" height="22" rx="6" fill="#0A2540" stroke="#38BDF8" strokeWidth="1.2" />
                <text x="6" y="15" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  W = F·s·cos(θ)
                </text>
              </g>

              {/* Live AR Energy Status Floater */}
              <g transform="translate(180, 50)">
                <rect width="105" height="42" rx="6" fill="#0A2540" stroke="#F59E0B" strokeWidth="1.2" />
                <text x="6" y="16" fill="#F59E0B" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  Ep: 784 Joule
                </text>
                <text x="6" y="32" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  Ek: 392 Joule
                </text>
              </g>
            </svg>
          </div>

          {/* AR Tracking Target Reticle in Center */}
          <div className="absolute w-44 h-44 border-2 border-sky-400/40 rounded-2xl pointer-events-none flex items-center justify-center">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-sky-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-sky-400"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-sky-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-sky-400"></div>
            <span className="text-[9px] font-mono text-sky-400/80 bg-slate-950/80 px-2 py-0.5 rounded">
              MARKER LOCKED 100%
            </span>
          </div>
        </div>

        {/* Bottom AR Controls */}
        <div className="p-4 bg-slate-950/95 border-t border-slate-800 text-slate-200 space-y-3 z-30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Kemiringan Sudut Ramp AR:</span>
            <span className="font-mono text-sky-400 font-bold">{rampTilt}°</span>
          </div>
          <input
            type="range"
            min="15"
            max="65"
            value={rampTilt}
            onChange={(e) => setRampTilt(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rotasi & Skala 3D Aktif</span>
            </div>

            <button
              onClick={onClose}
              className="py-1.5 px-4 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Kembali ke Materi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
