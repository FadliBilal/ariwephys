import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Compass, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('nama.siswa@email.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email || 'fadhil.siswa@ariwephys.edu');
    }, 600);
  };

  const handleInstantDemo = () => {
    setEmail('fadhil.siswa@ariwephys.edu');
    setPassword('fisika2026');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('fadhil.siswa@ariwephys.edu');
    }, 400);
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 text-white flex flex-col justify-between p-5 relative overflow-hidden">
      {/* Subtle Blueprint Circuit Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Top Header & Branding */}
      <div className="text-center pt-2 relative z-10">
        <div className="inline-flex flex-col items-center justify-center mb-2">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-amber-500 p-0.5 shadow-xl shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center p-2">
              <img src="/logo-atom.svg" alt="ARIWEPHYS Atom" className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight text-white mt-2">
            Login ke ARIWEPHYS
          </h2>
          <p className="text-[11px] text-sky-200/80 font-medium">
            Augmented Reality Intelligent Web Physics
          </p>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-4 shadow-2xl relative z-10 my-2">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email / Username */}
          <div>
            <label className="block text-[11px] font-semibold text-sky-100 mb-1">
              Email atau Nama Pengguna Siswa
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama.siswa@email.com"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-950/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-sans"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-sky-100">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => alert('Fitur reset kata sandi telah dikirimkan ke email terdaftar.')}
                className="text-[10px] text-sky-400 hover:text-sky-300 transition-colors"
              >
                Lupa Kata Sandi?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-9 py-2 bg-slate-950/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk ke ARIWEPHYS</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-center">
          <button
            onClick={handleInstantDemo}
            className="w-full py-1.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Masuk Cepat (Akun Uji Coba Siswa)</span>
          </button>
        </div>

        {/* Social Logins */}
        <div className="mt-3 text-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2 font-medium">
            Atau masuk dengan
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onLoginSuccess('google.student@ariwephys.edu')}
              className="py-1.5 px-2 bg-slate-950/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center gap-1.5 text-[11px] text-slate-200 font-medium transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z" />
                <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.3 7.5 23.5 12 23.5z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => onLoginSuccess('microsoft.student@ariwephys.edu')}
              className="py-1.5 px-2 bg-slate-950/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center gap-1.5 text-[11px] text-slate-200 font-medium transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              <span>Microsoft</span>
            </button>

            <button
              onClick={() => onLoginSuccess('apple.student@ariwephys.edu')}
              className="py-1.5 px-2 bg-slate-950/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-center gap-1.5 text-[11px] text-slate-200 font-medium transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.73-7.98-12.13-14.69-6.3-9.61-11.25-20.91-14.86-33.89-3.6-13-5.41-25.04-5.41-36.14 0-14.54 3.63-26.65 10.9-36.32 7.27-9.68 16.51-14.63 27.72-14.86 4.9 0 10.37 1.34 16.41 4.02 6.04 2.68 9.94 4.08 11.71 4.2 2.01-.12 6.06-1.56 12.14-4.32 6.08-2.76 11.45-4.06 16.11-3.9 12.28.61 22.09 4.87 29.43 12.78-10.74 6.52-16 15.48-15.78 26.88.22 8.94 3.67 16.51 10.36 22.7 6.69 6.19 14.55 9.77 23.59 10.73-2.12 6.38-4.73 12.79-7.83 19.24z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Registration & Policies */}
      <div className="text-center relative z-10 pb-2">
        <p className="text-[11px] text-slate-300">
          Belum punya akun?{' '}
          <button
            onClick={() => alert('Pendaftaran akun siswa dapat dilakukan melalui guru mata pelajaran atau admin sekolah.')}
            className="text-sky-300 font-bold hover:underline"
          >
            Daftar Sekarang
          </button>
        </p>
        <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-slate-400">
          <button onClick={() => alert('Bantuan Teknis: Hubungi helpdesk@ariwephys.edu')} className="hover:text-slate-200">
            Bantuan
          </button>
          <span>•</span>
          <button onClick={() => alert('Kebijakan Privasi: Data siswa dilindungi dan hanya digunakan untuk kepentingan pembelajaran fisika.')} className="hover:text-slate-200">
            Kebijakan Privasi
          </button>
        </div>
      </div>
    </div>
  );
};
