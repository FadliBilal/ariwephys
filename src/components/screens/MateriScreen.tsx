import React, { useState } from 'react';
import { LESSON_UNITS } from '../../data/physicsData';
import { Compass, CheckCircle2 } from 'lucide-react';

export const MateriScreen: React.FC = () => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);

  // Interactive Work Calculator State
  const [force, setForce] = useState<number>(40); // N
  const [distance, setDistance] = useState<number>(5); // m
  const [angle, setAngle] = useState<number>(30); // deg

  const rad = (angle * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const workValue = force * distance * cosVal;

  const currentUnit = LESSON_UNITS.find(u => u.id === selectedUnitId) || LESSON_UNITS[0];

  const getWorkBadge = () => {
    if (angle < 90) return { label: 'Usaha Positif (W > 0)', style: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    if (angle === 90) return { label: 'Usaha Nol (W = 0)', style: 'bg-amber-50 text-amber-800 border-amber-200' };
    return { label: 'Usaha Negatif (W < 0)', style: 'bg-rose-50 text-rose-800 border-rose-200' };
  };

  const badge = getWorkBadge();

  return (
    <div className="w-full pb-8 space-y-3.5 p-4 bg-slate-50 text-slate-800">
      {/* Unit Selector Pills */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {[
          { id: 1, label: 'Unit 1: Usaha' },
          { id: 2, label: 'Unit 2: Energi Kinetik' },
          { id: 3, label: 'Unit 3: Energi Potensial' },
          { id: 4, label: 'Unit 4: Kekekalan EM' }
        ].map((unit) => (
          <button
            key={unit.id}
            onClick={() => setSelectedUnitId(unit.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
              selectedUnitId === unit.id
                ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {unit.label}
          </button>
        ))}
      </div>

      {/* Clean 3D Physics Canvas */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-900">
            {currentUnit.title}
          </h3>
          <span className="text-[10px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 font-bold">
            {currentUnit.formula}
          </span>
        </div>

        {/* Minimalist Visual Ramp */}
        <div className="w-full h-36 bg-slate-50 rounded-xl border border-slate-200/80 overflow-hidden relative flex items-center justify-center mb-3">
          <svg className="w-full h-full" viewBox="0 0 320 130" fill="none">
            {/* Smooth Track */}
            <path
              d="M 25 25 Q 110 105 220 105 L 305 105"
              stroke="#0284C7"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Ground */}
            <path
              d="M 25 25 Q 110 105 220 105 L 305 105 L 305 125 L 25 125 Z"
              fill="rgba(2, 132, 199, 0.06)"
            />

            {/* Skater / Sphere at slope */}
            <g transform="translate(115, 85)">
              <circle cx="0" cy="0" r="10" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
              {/* Force vector w */}
              <line x1="0" y1="0" x2="0" y2="30" stroke="#EF4444" strokeWidth="2" />
              <text x="4" y="28" fill="#EF4444" fontSize="8" fontWeight="bold">w</text>

              {/* Normal force N */}
              <line x1="0" y1="0" x2="-14" y2="-22" stroke="#0284C7" strokeWidth="2" />
              <text x="-22" y="-18" fill="#0284C7" fontSize="8" fontWeight="bold">N</text>
            </g>

            {/* Labels */}
            <text x="28" y="22" fill="#0284C7" fontSize="9" fontWeight="bold" fontFamily="monospace">
              h = maks (Ep)
            </text>
            <text x="235" y="98" fill="#F59E0B" fontSize="9" fontWeight="bold" fontFamily="monospace">
              v = maks (Ek)
            </text>
          </svg>
        </div>

        {/* Clean Concept Bullets */}
        <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          {currentUnit.subtopics[0]?.keyPoints.map((pt, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0"></span>
              <span className="leading-snug">{pt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tool: Kalkulator Vektor Usaha */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sky-600" />
            Kalkulator Vektor Usaha (W)
          </h4>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.style}`}>
            {badge.label}
          </span>
        </div>

        {/* Sliders */}
        <div className="space-y-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Sudut Gaya (θ):</span>
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
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0° (Searah)</span>
              <span>90° (Tegak Lurus)</span>
              <span>180° (Berlawanan)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                Gaya (F): <span className="font-mono font-bold text-slate-900">{force} N</span>
              </span>
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
              <span className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                Jarak (s): <span className="font-mono font-bold text-slate-900">{distance} m</span>
              </span>
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

        {/* Calculation Result */}
        <div className="p-3 bg-sky-50 border border-sky-200/90 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 block">Nilai Usaha Fisis:</span>
            <div className="text-xl font-black font-mono text-sky-900">
              {workValue.toFixed(1)} <span className="text-xs font-bold text-sky-700">Joule</span>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-slate-600">
            <div>cos({angle}°) = {cosVal.toFixed(3)}</div>
            <div className="text-[10px] text-slate-400">W = {force} · {distance} · {cosVal.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
