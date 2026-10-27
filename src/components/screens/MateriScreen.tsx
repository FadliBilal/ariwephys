import React, { useState } from 'react';
import { LESSON_UNITS } from '../../data/physicsData';
import { ChevronDown, ChevronUp, Play, BookOpen, Sparkles, CheckCircle2, Compass, Layers, RotateCcw } from 'lucide-react';

export const MateriScreen: React.FC = () => {
  const [activeUnitId, setActiveUnitId] = useState<number>(1);

  // Interactive Vector Work Simulator State
  const [force, setForce] = useState<number>(40); // Newton
  const [distance, setDistance] = useState<number>(5); // meter
  const [angle, setAngle] = useState<number>(30); // degrees

  const rad = (angle * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const workValue = force * distance * cosVal;

  const getWorkClassification = () => {
    if (angle < 90) return { text: 'Usaha Positif (W > 0)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', desc: 'Gaya mempercepat atau searah komponen perpindahan.' };
    if (angle === 90) return { text: 'Usaha Nol (W = 0)', color: 'text-amber-700 bg-amber-50 border-amber-200', desc: 'Gaya tegak lurus perpindahan, tidak melakukan usaha sama sekali.' };
    return { text: 'Usaha Negatif (W < 0)', color: 'text-rose-700 bg-rose-50 border-rose-200', desc: 'Gaya berlawanan arah gerak (seperti gaya gesekan atau pengereman).' };
  };

  const workClass = getWorkClassification();

  return (
    <div className="w-full pb-8 bg-slate-50 text-slate-800 space-y-4">
      {/* 3D Ramp Visualizer Card */}
      <div className="p-4 bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white rounded-b-3xl shadow-lg border-b border-sky-800/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Model Fisika: Usaha dan Energi 3D
          </span>
          <span className="text-[10px] bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded-full border border-sky-500/30">
            Interactive Canvas
          </span>
        </div>

        {/* 3D Ramp Visual Canvas */}
        <div className="relative w-full h-36 bg-slate-950/80 rounded-2xl border border-sky-600/30 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 340 130" fill="none">
            {/* Grid background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
              <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#38BDF8" />
              </marker>
              <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#EF4444" />
              </marker>
              <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#F59E0B" />
              </marker>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Inclined Curved Ramp */}
            <path
              d="M 25 20 Q 110 100 230 100 L 315 100"
              stroke="#0284C7"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Base platform */}
            <path
              d="M 25 20 Q 110 100 230 100 L 315 100 L 315 120 L 25 120 Z"
              fill="rgba(2, 132, 199, 0.12)"
            />

            {/* Skater / Sphere at slope */}
            <g transform="translate(115, 82)">
              <circle cx="0" cy="0" r="11" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
              {/* Gravity vector (W = mg) */}
              <line x1="0" y1="0" x2="0" y2="34" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
              <text x="5" y="32" fill="#EF4444" fontSize="9" fontWeight="bold">W = mg</text>

              {/* Normal force (N) */}
              <line x1="0" y1="0" x2="-14" y2="-24" stroke="#38BDF8" strokeWidth="2.5" markerEnd="url(#arrowHead)" />
              <text x="-22" y="-22" fill="#38BDF8" fontSize="9" fontWeight="bold">N</text>

              {/* Velocity vector */}
              <line x1="0" y1="0" x2="28" y2="12" stroke="#10B981" strokeWidth="2.5" />
              <text x="30" y="10" fill="#10B981" fontSize="9" fontWeight="bold">v</text>
            </g>

            {/* Energy callouts */}
            <rect x="18" y="10" width="75" height="18" rx="4" fill="#0F172A" stroke="#0284C7" strokeWidth="1" />
            <text x="24" y="22" fill="#38BDF8" fontSize="8" fontWeight="bold">Ep = m·g·h max</text>

            <rect x="230" y="80" width="78" height="18" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
            <text x="236" y="92" fill="#F59E0B" fontSize="8" fontWeight="bold">Ek = ½ m v² max</text>
          </svg>
        </div>
      </div>

      {/* Accordion Units (Unit 1 to 4) */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Daftar Unit Materi
          </h3>
          <span className="text-[11px] text-sky-600 font-semibold">4 Modul Aktif</span>
        </div>

        {LESSON_UNITS.map((unit) => {
          const isOpen = activeUnitId === unit.id;
          return (
            <div
              key={unit.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                isOpen ? 'border-sky-500 shadow-md ring-1 ring-sky-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setActiveUnitId(isOpen ? 0 : unit.id)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    0{unit.id}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {unit.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {unit.subtitle}
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 text-xs">
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {unit.description}
                  </p>

                  {/* Formula Box */}
                  <div className="p-3 bg-sky-50 border border-sky-200/80 rounded-xl">
                    <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wide block mb-1">
                      Formula Kunci
                    </span>
                    <div className="font-mono text-xs font-bold text-sky-950 bg-white px-2.5 py-1.5 rounded-lg border border-sky-200 inline-block shadow-xs">
                      {unit.formula}
                    </div>
                    <p className="text-[10px] text-sky-700 mt-1.5 leading-snug">
                      {unit.formulaExplanation}
                    </p>
                  </div>

                  {/* Subtopics */}
                  {unit.subtopics.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                      <h5 className="font-bold text-[11px] text-slate-800 mb-1">
                        {sub.title}
                      </h5>
                      <p className="text-[10px] text-slate-600 leading-relaxed mb-2">
                        {sub.content}
                      </p>
                      <ul className="space-y-1">
                        {sub.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="text-[10px] text-slate-700 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1 shrink-0"></span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Tool: Eksperimen Vektor Usaha (W = F · s · cos θ) */}
      <div className="px-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-600" />
              Kalkulator Interaktif Vektor Usaha
            </h4>
            <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
              W = F·s·cos(θ)
            </span>
          </div>

          <p className="text-[10px] text-slate-500">
            Atur besar gaya tarik $F$, jarak perpindahan $s$, dan sudut $\theta$ untuk melihat pengaruh orientasi vektor terhadap nilai usaha mekanik.
          </p>

          {/* Interactive Sliders */}
          <div className="space-y-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            {/* Sudut Theta Slider */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Sudut Tarik Gaya (θ):</span>
                <span className="font-mono text-sky-700 font-bold">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="5"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                <span>0° (Searah)</span>
                <span>90° (Tegak Lurus)</span>
                <span>180° (Berlawanan)</span>
              </div>
            </div>

            {/* Gaya F */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                  Gaya F: <span className="font-mono text-slate-800">{force} N</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={force}
                  onChange={(e) => setForce(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                  Perpindahan s: <span className="font-mono text-slate-800">{distance} m</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="p-3 bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-xl shadow-inner flex items-center justify-between">
            <div>
              <span className="text-[10px] text-sky-200 block">Hasil Perhitungan Usaha (W):</span>
              <div className="text-lg font-black font-mono text-amber-400">
                {workValue.toFixed(1)} <span className="text-xs text-white">Joule</span>
              </div>
              <span className="text-[9px] text-slate-300 font-mono">
                cos({angle}°) = {cosVal.toFixed(3)}
              </span>
            </div>

            <div className="text-right">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${workClass.color}`}>
                {workClass.text}
              </span>
              <p className="text-[9px] text-slate-300 max-w-[150px] mt-1 leading-tight">
                {workClass.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
