
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WheelScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-32 animate-in zoom-in duration-500">
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/80 backdrop-blur-md flex items-center p-4 justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold">Wheel of Life</h2>
        <button className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </header>

      <div className="px-4 py-4 text-center">
        <h4 className="text-primary text-sm font-black uppercase tracking-widest">Diagnostic Tool</h4>
        <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase">Assess your current holistic balance</p>
      </div>

      <div className="relative flex flex-col items-center justify-center py-8 px-4 overflow-hidden">
        <div className="relative w-full aspect-square max-w-[340px]">
          <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_20px_rgba(43,238,121,0.1)]" viewBox="0 0 100 100">
            {[10, 20, 30, 40, 50].map(r => (
              <circle key={r} className="radar-grid" cx="50" cy="50" fill="none" r={r} />
            ))}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
                const rad = (deg * Math.PI) / 180;
                return <line key={deg} x1="50" y1="50" x2={50 + 50 * Math.cos(rad)} y2={50 + 50 * Math.sin(rad)} className="radar-grid" />
            })}
            {/* Dashed Goal */}
            <polygon 
                points="85,50 78,78 50,90 22,78 10,50 22,22 50,10 78,22" 
                fill="none" 
                stroke="white" 
                strokeWidth="0.5" 
                strokeDasharray="2" 
                className="opacity-20"
            />
            {/* Active Data */}
            <polygon 
                fill="rgba(43, 238, 121, 0.2)" 
                points="85,50 70,70 50,82 35,65 20,50 35,35 50,25 75,35" 
                stroke="#2bee79" 
                strokeWidth="2"
            />
            {/* Interactive Points */}
            <circle cx="85" cy="50" fill="#2bee79" r="2.5" />
            <circle cx="70" cy="70" fill="#2bee79" r="2.5" />
            <circle cx="50" cy="82" fill="#2bee79" r="2.5" />
            <circle cx="35" cy="65" fill="#2bee79" r="2.5" />
            <circle cx="20" cy="50" fill="#2bee79" r="2.5" />
            <circle cx="35" cy="35" fill="#2bee79" r="2.5" />
            <circle cx="50" cy="25" fill="#2bee79" r="2.5" />
            <circle cx="75" cy="35" fill="#2bee79" r="2.5" />
          </svg>
          
          <div className="absolute inset-0 pointer-events-none text-[9px] font-black text-slate-500 uppercase tracking-tighter">
            <span className="absolute top-[-15px] left-1/2 -translate-x-1/2">Health</span>
            <span className="absolute top-[10%] right-[-15px]">Growth</span>
            <span className="absolute top-1/2 right-[-30px] -translate-y-1/2">Finances</span>
            <span className="absolute bottom-[10%] right-[-10px]">Career</span>
            <span className="absolute bottom-[-15px] left-1/2 -translate-x-1/2">Family</span>
            <span className="absolute bottom-[10%] left-[-15px]">Fun</span>
            <span className="absolute top-1/2 left-[-40px] -translate-y-1/2 text-center">Environment</span>
            <span className="absolute top-[10%] left-[-20px]">Spirit</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-slate-100 dark:border-white/10 shadow-sm">
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-base font-bold">Balance Overview</p>
            <p className="text-primary text-3xl font-black">6.8 <span className="text-sm font-medium text-slate-500">/ 10</span></p>
          </div>
          <div className="space-y-5">
            {[
                { name: "Health", score: 7, color: "bg-primary" },
                { name: "Career", score: 8, color: "bg-primary" },
                { name: "Fun & Recreation", score: 4, color: "bg-orange-400" }
            ].map((stat, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-400">{stat.name}</span>
                        <span className={stat.score < 5 ? 'text-orange-400' : 'text-primary'}>{stat.score}/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color}`} style={{ width: `${stat.score * 10}%` }}></div>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex gap-4 items-start">
            <div className="bg-orange-500/20 p-2 rounded-lg text-orange-500 shrink-0">
                <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
                <h5 className="text-orange-500 font-black text-sm uppercase">Imbalance Detected</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Your <b>Fun</b> segments are significantly lower than your Career focus. Schedule some downtime to restore equilibrium.
                </p>
            </div>
        </div>
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent">
        <button onClick={() => navigate('/success')} className="w-full bg-primary text-background-dark font-black py-4 rounded-xl shadow-lg active:scale-95 transition-transform uppercase tracking-widest">
            Save & Generate Insights
        </button>
      </div>
    </div>
  );
};

export default WheelScreen;
