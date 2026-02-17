
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/hub');
    } catch (err: any) {
      console.error(err);
      setError(err.message.includes('email-already-in-use') 
        ? 'Este correo ya está registrado.' 
        : 'Error al crear la cuenta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold">Register</h2>
        <div className="size-10"></div>
      </div>

      <div className="flex w-full gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
        <div className="h-1.5 flex-1 rounded-full bg-slate-300 dark:bg-white/10"></div>
        <div className="h-1.5 flex-1 rounded-full bg-slate-300 dark:bg-white/10"></div>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Your Account</h1>
        <p className="text-slate-500">Join thousands finding their flow and achieving balance through gamified growth.</p>
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs font-bold">
            {error}
          </div>
        )}

        <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase text-slate-400 text-[10px] tracking-widest">Full Name</label>
            <input className="w-full h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 focus:ring-2 focus:ring-primary outline-none font-bold" placeholder="John Doe" />
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase text-slate-400 text-[10px] tracking-widest">Email Address</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 focus:ring-2 focus:ring-primary outline-none font-bold" 
              placeholder="hello@example.com" 
              type="email" 
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase text-slate-400 text-[10px] tracking-widest">Password</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 focus:ring-2 focus:ring-primary outline-none font-bold" 
              placeholder="Min. 6 characters" 
              type="password" 
            />
        </div>

        <button 
          disabled={loading}
          className="w-full py-5 bg-primary text-background-dark font-black rounded-2xl text-lg shadow-xl mt-8 flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'} <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </form>

      <div className="mt-auto text-center py-6">
        <p className="text-slate-500">Already have an account? <button onClick={() => navigate('/')} className="text-primary font-bold">Log in</button></p>
      </div>
    </div>
  );
};

export default RegisterScreen;
