import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('fadhil.siswa@ariwephys.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email || 'fadhil.siswa@ariwephys.edu');
    }, 400);
  };

  const handleInstantDemo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess('fadhil.siswa@ariwephys.edu');
    }, 300);
  };

  return (
    <div className="w-full min-h-full bg-slate-50 text-slate-800 flex flex-col justify-between p-6">
      {/* Top Logo & Title */}
      <div className="text-center pt-4">
        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/90 shadow-sm mx-auto flex items-center justify-center p-2 mb-3">
          <img src="/logo-atom.svg" alt="ARIWEPHYS Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Masuk ke ARIWEPHYS
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Platform Pembelajaran Usaha & Energi
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs my-auto">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Siswa
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama.siswa@email.com"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-sans"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => alert('Instruksi reset kata sandi telah dikirimkan ke email.')}
                className="text-[11px] text-sky-600 hover:underline"
              >
                Lupa?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk Sekarang</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Instant Demo Login */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Masuk Cepat (Akun Uji Coba)</span>
          </button>
        </div>

        {/* Social SSO Logins */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block text-center mb-2 font-semibold">
            Atau login via
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onLoginSuccess('google.student@ariwephys.edu')}
              className="py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="font-bold text-slate-800">Google</span>
            </button>
            <button
              onClick={() => onLoginSuccess('microsoft.student@ariwephys.edu')}
              className="py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="font-bold text-slate-800">Microsoft</span>
            </button>
            <button
              onClick={() => onLoginSuccess('apple.student@ariwephys.edu')}
              className="py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="font-bold text-slate-800">Apple</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400">
        <p>
          Belum punya akun?{' '}
          <span className="text-sky-600 font-bold hover:underline cursor-pointer">
            Hubungi Guru Pembimbing
          </span>
        </p>
      </div>
    </div>
  );
};
