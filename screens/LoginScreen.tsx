
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex@focusia.app');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/hub');
    } catch (err: any) {
      console.error(err);
      setError('Credenciales inválidas. Por favor, revisa tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col p-6 animate-in fade-in duration-500 bg-background-light dark:bg-background-dark">
      <div className="flex justify-end">
        <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-primary">help_outline</span>
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center pt-8 pb-10">
        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="focusia-logo-shape shadow-2xl shadow-primary/40"></div>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-center bg-focusia-gradient bg-clip-text text-transparent">Focusia</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg text-center mt-2 font-medium">Find your flow.</p>
      </div>

      <form onSubmit={handleLogin} className="flex-1 space-y-6">
        <div className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs font-bold animate-in slide-in-from-top-2">
              {error}
            </div>
          )}
          
          <div className="flex flex-col">
            <label className="text-[10px] font-black uppercase tracking-widest mb-2 ml-1 text-slate-400">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">mail</span>
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 pl-12 pr-6 focus:ring-2 focus:ring-primary outline-none transition-all font-bold" 
                placeholder="alex@focusia.app" 
                type="email"
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2 px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
              <button type="button" className="text-primary text-xs font-bold">Forgot?</button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">lock</span>
              <input 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 pl-12 pr-12 focus:ring-2 focus:ring-primary outline-none transition-all font-bold" 
                placeholder="••••••••" 
                type="password"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer">visibility</span>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className={`w-full h-16 bg-focusia-gradient text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest ${loading ? 'opacity-50 cursor-wait' : ''}`}
        >
          {loading ? 'Authenticating...' : 'Login'} <span className="material-symbols-outlined">arrow_forward</span>
        </button>

        <div className="flex items-center gap-4 py-4">
          <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Or continue with</span>
          <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
        </div>

        <div className="flex gap-4">
          <button type="button" className="flex-1 h-14 flex items-center justify-center border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="size-6" />
          </button>
          <button type="button" className="flex-1 h-14 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-2xl transition-colors">
            <span className="material-symbols-outlined">apple</span>
          </button>
        </div>
      </form>

      <div className="mt-auto text-center py-6">
        <p className="text-slate-500 text-sm">New to Focusia? <Link to="/register" className="text-primary font-black hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
};

export default LoginScreen;
