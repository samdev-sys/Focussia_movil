
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 glass-overlay animate-in zoom-in duration-300">
      <div className="absolute top-4 w-12 h-1.5 bg-white/20 rounded-full"></div>
      
      <div className="mb-4">
        <h4 className="text-primary text-sm font-black tracking-[0.3em] uppercase text-center animate-bounce">Goal Reached!</h4>
      </div>

      <div className="relative flex flex-col items-center mb-8">
        <div className="absolute -top-16 opacity-50 blur-xl size-40 bg-primary/30 rounded-full"></div>
        <h1 className="text-white tracking-tighter text-[80px] font-black leading-none drop-shadow-[0_0_20px_rgba(43,238,121,0.5)]">+50 XP</h1>
      </div>

      <div className="relative size-72 flex items-center justify-center mb-10">
        <svg className="absolute inset-0 size-full -rotate-90">
            <circle cx="144" cy="144" r="130" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
            <circle 
                cx="144" 
                cy="144" 
                r="130" 
                fill="transparent" 
                stroke="#2bee79" 
                strokeWidth="16" 
                strokeDasharray="816" 
                strokeDashoffset="280" 
                strokeLinecap="round" 
                className="drop-shadow-[0_0_12px_rgba(43,238,121,0.6)]"
            />
        </svg>
        <div className="flex flex-col items-center">
            <div className="size-28 bg-primary/20 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <span className="material-symbols-outlined text-primary text-7xl" style={{fontVariationSettings: "'FILL' 1"}}>terrain</span>
            </div>
            <span className="text-white font-black text-2xl uppercase tracking-[0.2em] drop-shadow-md">Level 12</span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4 text-center">
        <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
                <p>Total Experience</p>
                <p className="text-primary">+ 2.5%</p>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden p-1">
                <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(43,238,121,0.5)]" style={{ width: '65%' }}></div>
            </div>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">1,250 / 2,000 XP</p>
        </div>

        <div className="pt-8 px-4">
            <p className="text-white/90 text-xl italic font-light leading-relaxed">
                "The only way to climb the mountain is one step at a time. Keep moving forward."
            </p>
        </div>

        <div className="space-y-4 pt-10">
            <button 
                onClick={() => navigate('/profile')}
                className="w-full py-5 bg-primary text-background-dark font-black rounded-2xl text-xl shadow-2xl transition-all active:scale-95 uppercase tracking-widest"
            >
                Continue Journey
            </button>
            <button 
                onClick={() => navigate('/hub')}
                className="text-white/40 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
                Dismiss
            </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
