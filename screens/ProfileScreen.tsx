
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-32 animate-in slide-in-from-bottom duration-500">
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-100 dark:border-white/5">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined cursor-pointer">arrow_back_ios</button>
        <h2 className="text-lg font-bold text-center flex-1">Growth Profile</h2>
        <button 
          onClick={() => navigate('/settings')}
          className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-all active:rotate-90"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </nav>

      <header className="flex flex-col items-center pt-10 pb-6">
        <div className="relative flex flex-col items-center">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            <div className="relative size-32 rounded-full border-4 border-primary/30 ring-4 ring-background-dark bg-cover bg-center shadow-2xl" style={{backgroundImage: 'url("https://picsum.photos/200")'}}></div>
            <div className="absolute -bottom-3 bg-primary text-background-dark px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Level 5</div>
        </div>
        <div className="mt-8 text-center px-4">
            <p className="text-2xl font-black tracking-tight">Balanced Initiate</p>
            <p className="text-sm text-primary font-bold mt-1 uppercase tracking-tighter opacity-80">Mastering the art of holistic growth</p>
        </div>
      </header>

      <section className="p-4 space-y-4">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end px-1">
                <div>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Next Milestone</span>
                    <p className="text-xl font-black">Level 6</p>
                </div>
                <p className="text-sm font-black">1,250 <span className="text-slate-400 font-medium">/ 1,500 XP</span></p>
            </div>
            <div className="h-5 bg-slate-200 dark:bg-white/5 rounded-full p-1 shadow-inner flex items-center">
                <div className="h-3 rounded-full bg-primary progress-glow transition-all duration-1000" style={{ width: '83%' }}></div>
            </div>
        </div>

        <div className="flex gap-3">
            <div className="flex-1 achievement-card p-5 rounded-2xl border border-white/5 shadow-xl space-y-3">
                <div className="flex justify-between items-start text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Streak <span className="material-symbols-outlined text-orange-500 text-sm">local_fire_department</span>
                </div>
                <p className="text-3xl font-black">12 <span className="text-xs font-medium text-slate-500">Days</span></p>
            </div>
            <div className="flex-1 achievement-card p-5 rounded-2xl border border-white/5 shadow-xl space-y-3">
                <div className="flex justify-between items-start text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Rank <span className="material-symbols-outlined text-yellow-500 text-sm">workspace_premium</span>
                </div>
                <p className="text-3xl font-black">Top 10%</p>
            </div>
        </div>

        <div className="pt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black uppercase tracking-tight">Achievements</h2>
                <button className="text-primary text-sm font-bold">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                {[
                    { label: "Early Bird", icon: "wb_sunny", color: "text-yellow-400" },
                    { label: "Mindfulness", icon: "self_improvement", color: "text-blue-400" },
                    { label: "Pareto Pro", icon: "equalizer", color: "text-purple-400" }
                ].map((a, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 min-w-[100px] transition-all hover:scale-105">
                        <div className="size-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative shadow-lg">
                            <span className={`material-symbols-outlined text-4xl ${a.color}`}>{a.icon}</span>
                        </div>
                        <p className="text-[10px] font-black text-center uppercase tracking-tighter">{a.label}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="pt-6">
            <button 
                onClick={() => navigate('/')}
                className="w-full h-14 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
                <span className="material-symbols-outlined">logout</span> Log Out
            </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
