import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Gauge, Sliders } from 'lucide-react';

export const SimulasiScreen: React.FC = () => {
  // Parameters
  const [mass, setMass] = useState<number>(50); // kg
  const [friction, setFriction] = useState<number>(0.02); // mu
  const [gravityPreset, setGravityPreset] = useState<'earth' | 'moon' | 'jupiter'>('earth');
  const [gravity, setGravity] = useState<number>(9.8); // m/s^2
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [slowMo, setSlowMo] = useState<boolean>(false);

  // Dynamic Telemetry
  const [positionX, setPositionX] = useState<number>(-3.5);
  const [velocity, setVelocity] = useState<number>(0);
  const [height, setHeight] = useState<number>(4.2);
  const [kineticEnergy, setKineticEnergy] = useState<number>(0);
  const [potentialEnergy, setPotentialEnergy] = useState<number>(2058);
  const [thermalEnergy, setThermalEnergy] = useState<number>(0);
  const [totalEnergy, setTotalEnergy] = useState<number>(2058);

  const animFrameRef = useRef<number | null>(null);
  const simState = useRef({
    x: -3.5,
    v: 0,
    thermal: 0,
    lastTime: performance.now()
  });

  const handleGravityChange = (preset: 'earth' | 'moon' | 'jupiter') => {
    setGravityPreset(preset);
    if (preset === 'earth') setGravity(9.8);
    else if (preset === 'moon') setGravity(1.6);
    else if (preset === 'jupiter') setGravity(24.8);
  };

  const handleReset = () => {
    simState.current = {
      x: -3.5,
      v: 0,
      thermal: 0,
      lastTime: performance.now()
    };
    setPositionX(-3.5);
    setVelocity(0);
    setThermalEnergy(0);
    const initialH = 0.28 * (3.5 * 3.5);
    setHeight(initialH);
    const ep = mass * gravity * initialH;
    setPotentialEnergy(ep);
    setKineticEnergy(0);
    setTotalEnergy(ep);
  };

  useEffect(() => {
    const updatePhysics = (now: number) => {
      const dt = Math.min((now - simState.current.lastTime) / 1000, 0.05) * (slowMo ? 0.4 : 1.0);
      simState.current.lastTime = now;

      if (isPlaying) {
        let x = simState.current.x;
        let v = simState.current.v;

        const a = 0.28;
        const slope = 2 * a * x;
        const theta = Math.atan(slope);

        const a_grav = -gravity * Math.sin(theta);
        const frictionForce = friction * gravity * Math.cos(theta);
        const a_fric = v !== 0 ? -Math.sign(v) * frictionForce : 0;

        const totalAcc = a_grav + a_fric;

        v += totalAcc * dt;
        x += v * dt;

        if (x > 3.8) {
          x = 3.8;
          v = -v * 0.9;
        } else if (x < -3.8) {
          x = -3.8;
          v = -v * 0.9;
        }

        const dThermal = Math.abs(frictionForce * mass * v * dt);
        simState.current.thermal += dThermal;

        simState.current.x = x;
        simState.current.v = v;

        const h = Math.max(0, a * x * x);
        const curEp = Math.max(0, mass * gravity * h);
        const curEk = Math.max(0, 0.5 * mass * v * v);
        const curThermal = simState.current.thermal;
        const curTotal = curEp + curEk + curThermal;

        setPositionX(x);
        setVelocity(Math.abs(v));
        setHeight(h);
        setPotentialEnergy(curEp);
        setKineticEnergy(curEk);
        setThermalEnergy(curThermal);
        setTotalEnergy(curTotal);
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    simState.current.lastTime = performance.now();
    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, mass, friction, gravity, slowMo]);

  const maxBarScale = Math.max(totalEnergy, 2500);
  const ekPercent = Math.min(100, (kineticEnergy / maxBarScale) * 100);
  const epPercent = Math.min(100, (potentialEnergy / maxBarScale) * 100);
  const thermalPercent = Math.min(100, (thermalEnergy / maxBarScale) * 100);

  const canvasX = 160 + positionX * 35;
  const canvasY = 135 - height * 24;

  return (
    <div className="w-full pb-8 space-y-3.5 p-4 bg-slate-50 text-slate-800">
      {/* Simulation Clean Canvas Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-sky-600" />
            Simulasi Ramp Fisika
          </span>
          <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
            v = {velocity.toFixed(2)} m/s
          </span>
        </div>

        {/* 2D Canvas in Clean White/Slate style */}
        <div className="w-full h-40 bg-slate-50 rounded-xl border border-slate-200/80 overflow-hidden relative flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 320 150" fill="none">
            {/* Parabolic Track */}
            <path
              d="M 20 25 Q 160 165 300 25"
              stroke="#0284C7"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Ground under ramp */}
            <path
              d="M 20 25 Q 160 165 300 25 L 300 150 L 20 150 Z"
              fill="rgba(2, 132, 199, 0.05)"
            />

            {/* Reference dashed lines */}
            <line x1="20" y1="25" x2="300" y2="25" stroke="#CBD5E1" strokeDasharray="3 3" />
            <line x1="20" y1="125" x2="300" y2="125" stroke="#CBD5E1" strokeDasharray="3 3" />

            {/* Ball */}
            <g transform={`translate(${canvasX}, ${canvasY})`}>
              <circle cx="0" cy="0" r="10" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
            </g>
          </svg>
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="py-1.5 px-3.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda' : 'Jalankan'}</span>
            </button>

            <button
              onClick={() => setSlowMo(!slowMo)}
              className={`py-1.5 px-2.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                slowMo
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              0.5x Slow
            </button>
          </div>

          <button
            onClick={handleReset}
            className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Clean Dynamic Energy Bar Graphs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-sky-600" />
            Distribusi Energi
          </h4>
          <span className="text-[10px] text-slate-400 font-mono">EM = {totalEnergy.toFixed(0)} J</span>
        </div>

        {/* Ek Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sky-700">Energi Kinetik (Ek)</span>
            <span className="font-mono text-sky-900 font-bold">{kineticEnergy.toFixed(0)} J</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full transition-all duration-75" style={{ width: `${ekPercent}%` }}></div>
          </div>
        </div>

        {/* Ep Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-amber-700">Energi Potensial (Ep)</span>
            <span className="font-mono text-amber-900 font-bold">{potentialEnergy.toFixed(0)} J</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-75" style={{ width: `${epPercent}%` }}></div>
          </div>
        </div>

        {/* Thermal Bar (if friction > 0) */}
        {friction > 0 && (
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-rose-700">Energi Kalor/Gesek (Wf)</span>
              <span className="font-mono text-rose-900 font-bold">{thermalEnergy.toFixed(0)} J</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full transition-all duration-75" style={{ width: `${thermalPercent}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Clean Parameter Controls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-sky-600" />
          Variabel Percobaan
        </h4>

        {/* Mass */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Massa (m):</span>
            <span className="font-mono font-bold text-sky-700">{mass} kg</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
        </div>

        {/* Friction */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Koefisien Gesek (μ):</span>
            <span className="font-mono font-bold text-sky-700">
              {friction === 0 ? '0.00 (Licin)' : friction.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="0.10"
            step="0.01"
            value={friction}
            onChange={(e) => setFriction(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
        </div>

        {/* Gravity Presets */}
        <div>
          <span className="block text-xs font-semibold text-slate-700 mb-1.5">
            Gravitasi: <span className="font-mono font-bold text-sky-700">{gravity} m/s²</span>
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'earth', label: 'Bumi (9.8)' },
              { id: 'moon', label: 'Bulan (1.6)' },
              { id: 'jupiter', label: 'Jupiter (24.8)' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleGravityChange(p.id as any)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  gravityPreset === p.id
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
