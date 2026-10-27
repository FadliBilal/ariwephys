import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Activity, Gauge, Sliders, Info, Sparkles } from 'lucide-react';

export const SimulasiScreen: React.FC = () => {
  // Interactive Physics Parameters
  const [mass, setMass] = useState<number>(50); // kg
  const [friction, setFriction] = useState<number>(0.02); // mu
  const [gravityPreset, setGravityPreset] = useState<'earth' | 'moon' | 'jupiter'>('earth');
  const [gravity, setGravity] = useState<number>(9.8); // m/s^2
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [slowMo, setSlowMo] = useState<boolean>(false);

  // Simulation Dynamic State
  const [positionX, setPositionX] = useState<number>(-3.5); // x along track (-4 to 4)
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

  // Handle Gravity Presets
  const handleGravityChange = (preset: 'earth' | 'moon' | 'jupiter') => {
    setGravityPreset(preset);
    if (preset === 'earth') setGravity(9.8);
    else if (preset === 'moon') setGravity(1.6);
    else if (preset === 'jupiter') setGravity(24.8);
  };

  // Reset Simulation
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
    const initialH = 0.3 * (3.5 * 3.5);
    setHeight(initialH);
    const ep = mass * gravity * initialH;
    setPotentialEnergy(ep);
    setKineticEnergy(0);
    setTotalEnergy(ep);
  };

  // Physics Engine Loop
  useEffect(() => {
    const updatePhysics = (now: number) => {
      const dt = Math.min((now - simState.current.lastTime) / 1000, 0.05) * (slowMo ? 0.4 : 1.0);
      simState.current.lastTime = now;

      if (isPlaying) {
        let x = simState.current.x;
        let v = simState.current.v;

        // Ramp profile: y(x) = a * x^2, where a = 0.28
        const a = 0.28;
        // Slope dy/dx = 2 * a * x
        const slope = 2 * a * x;
        const theta = Math.atan(slope); // angle of ramp at x

        // Tangential acceleration due to gravity: a_t = -g * sin(theta)
        // Friction acceleration opposes velocity: a_f = -mu * g * cos(theta) * sign(v)
        const a_grav = -gravity * Math.sin(theta);
        const frictionForce = friction * gravity * Math.cos(theta);
        const a_fric = v !== 0 ? -Math.sign(v) * frictionForce : 0;

        const totalAcc = a_grav + a_fric;

        // Numerical integration (Verlet / Euler-Cromer)
        v += totalAcc * dt;
        x += v * dt;

        // Track limits with bounce
        if (x > 3.8) {
          x = 3.8;
          v = -v * 0.9;
        } else if (x < -3.8) {
          x = -3.8;
          v = -v * 0.9;
        }

        // Dissipated thermal energy due to friction
        const dThermal = Math.abs(frictionForce * mass * v * dt);
        simState.current.thermal += dThermal;

        simState.current.x = x;
        simState.current.v = v;

        // Telemetry calculation
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

  // Max scale for bars (reference initial Ep)
  const maxBarScale = Math.max(totalEnergy, 2500);
  const ekPercent = Math.min(100, (kineticEnergy / maxBarScale) * 100);
  const epPercent = Math.min(100, (potentialEnergy / maxBarScale) * 100);
  const thermalPercent = Math.min(100, (thermalEnergy / maxBarScale) * 100);

  // SVG Coordinates for Canvas
  // Map x (-4 to 4) to canvas width (20 to 300)
  const canvasX = 160 + positionX * 35;
  // Map h (0 to 4.5) to canvas height (135 to 25)
  const canvasY = 135 - height * 24;

  return (
    <div className="w-full pb-8 bg-slate-50 text-slate-800 space-y-3.5">
      {/* Simulation Screen Canvas Container */}
      <div className="p-4 bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 text-white rounded-b-3xl shadow-lg border-b border-sky-800/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Simulasi Lintasan Ramp (PhET Engine)
          </span>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
            Realtime 60 FPS
          </span>
        </div>

        {/* 2D Interactive Physics Ramp Canvas */}
        <div className="relative w-full h-44 bg-slate-950 rounded-2xl border border-sky-600/40 overflow-hidden shadow-inner flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 320 160" fill="none">
            {/* Grid Lines */}
            <defs>
              <pattern id="simGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.06)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#simGrid)" />

            {/* Parabolic Skate Ramp Track */}
            <path
              d="M 20 25 Q 160 175 300 25"
              stroke="#0284C7"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Ramp substrate/ground */}
            <path
              d="M 20 25 Q 160 175 300 25 L 300 160 L 20 160 Z"
              fill="rgba(2, 132, 199, 0.12)"
            />

            {/* Reference height lines */}
            <line x1="20" y1="25" x2="300" y2="25" stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="3 3" />
            <text x="24" y="22" fill="#94A3B8" fontSize="8" fontFamily="monospace">h_max = 4.5 m</text>

            <line x1="20" y1="135" x2="300" y2="135" stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="3 3" />
            <text x="24" y="146" fill="#94A3B8" fontSize="8" fontFamily="monospace">h = 0 (Dasar)</text>

            {/* Dynamic Skater / Ball Marker */}
            <g transform={`translate(${canvasX}, ${canvasY})`}>
              {/* Outer Energy Aura */}
              <circle cx="0" cy="0" r="14" fill="rgba(245, 158, 11, 0.25)" className="animate-pulse" />
              {/* Skater Mass Body */}
              <circle cx="0" cy="0" r="10" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
              {/* Skater icon / face */}
              <circle cx="-3" cy="-2" r="1.5" fill="#0F172A" />
              <circle cx="3" cy="-2" r="1.5" fill="#0F172A" />
              {/* Velocity vector line */}
              <line
                x1="0"
                y1="0"
                x2={Math.min(30, Math.max(-30, (simState.current.v || 0) * 3))}
                y2={0}
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          {/* Real-time Velocity Badge on Canvas */}
          <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700/80 rounded-lg px-2 py-1 text-right">
            <span className="text-[9px] text-slate-400 block">Kelajuan (v)</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {velocity.toFixed(2)} m/s
            </span>
          </div>
        </div>

        {/* Playback Control Bar */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="py-1.5 px-3 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-600/30 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda' : 'Jalankan'}</span>
            </button>

            <button
              onClick={() => setSlowMo(!slowMo)}
              className={`py-1.5 px-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                slowMo
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span>0.5x Slow</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Posisi</span>
          </button>
        </div>
      </div>

      {/* Dynamic Energy Bar Graphs (Ek vs Ep vs Thermal) */}
      <div className="px-4">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-sky-600" />
              Diagram Batang Energi Realtime
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">EM = Ek + Ep + Wf</span>
          </div>

          {/* Bar 1: Kinetic Energy (Ek) */}
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-sky-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Energi Kinetik (Ek = ½ m v²)
              </span>
              <span className="font-mono font-bold text-sky-900">
                {kineticEnergy.toFixed(0)} J
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-75"
                style={{ width: `${ekPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Bar 2: Potential Energy (Ep) */}
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-amber-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Energi Potensial (Ep = m g h)
              </span>
              <span className="font-mono font-bold text-amber-900">
                {potentialEnergy.toFixed(0)} J
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-75"
                style={{ width: `${epPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Bar 3: Thermal / Friction Loss */}
          {friction > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-rose-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Energi Termal Gesekan (W_f)
                </span>
                <span className="font-mono font-bold text-rose-900">
                  {thermalEnergy.toFixed(0)} J
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-75"
                  style={{ width: `${thermalPercent}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parameter Control Sliders */}
      <div className="px-4">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              Kontrol Parameter Fisika
            </h4>
            <span className="text-[10px] text-slate-500 font-medium">Variabel Bebas</span>
          </div>

          {/* Slider 1: Mass (kg) */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
              <span>Massa Skater (m):</span>
              <span className="font-mono text-sky-700 font-bold">{mass} kg</span>
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
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>10 kg (Ringan)</span>
              <span>50 kg</span>
              <span>100 kg (Berat)</span>
            </div>
          </div>

          {/* Slider 2: Friction Coefficient mu */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
              <span>Koefisien Gesekan Lintasan (μ):</span>
              <span className="font-mono text-sky-700 font-bold">
                {friction === 0 ? '0.00 (Licin Sempurna)' : friction.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="0.15"
              step="0.01"
              value={friction}
              onChange={(e) => setFriction(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>0.00 (Konservatif)</span>
              <span>0.05 (Rendah)</span>
              <span>0.15 (Kasar)</span>
            </div>
          </div>

          {/* Gravity Presets */}
          <div>
            <span className="block text-[11px] font-semibold text-slate-700 mb-1.5">
              Percepatan Gravitasi (g): <span className="font-mono text-sky-700">{gravity} m/s²</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleGravityChange('earth')}
                className={`py-1 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                  gravityPreset === 'earth'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🌍 Bumi (9.8)
              </button>
              <button
                onClick={() => handleGravityChange('moon')}
                className={`py-1 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                  gravityPreset === 'moon'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🌑 Bulan (1.6)
              </button>
              <button
                onClick={() => handleGravityChange('jupiter')}
                className={`py-1 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                  gravityPreset === 'jupiter'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🪐 Jupiter (24.8)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Numeric Readout Grid */}
      <div className="px-4">
        <div className="p-3 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-2">
            Telemetri Sensor Digital
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Ketinggian (h)</span>
              <span className="text-xs font-mono font-bold text-amber-400">{height.toFixed(2)} m</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Kecepatan (v)</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{velocity.toFixed(2)} m/s</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[9px] text-slate-400 block">Energi Total (EM)</span>
              <span className="text-xs font-mono font-bold text-sky-400">{totalEnergy.toFixed(0)} J</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
