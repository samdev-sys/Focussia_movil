
import React, { useState } from 'react';

const HubScreen: React.FC = () => {
  const [stress, setStress] = useState(4);

  const trinity = [
    { label: "The Carriage (Body)", value: 70, icon: "directions_bus", sub: "Physical energy is restored." },
    { label: "The Horse (Emotions)", value: 45, icon: "psychology_alt", sub: "Currently feeling restless." },
    { label: "The Driver (Mind)", value: 90, icon: "engineering", sub: "Sharp and focused." }
  ];

  const timeThieves = [
    { name: "Socials", icon: "phone_iphone", count: 3, color: "text-pink-500" },
    { name: "Streaming", icon: "tv", count: 0, color: "text-blue-500" },
    { name: "Coffee Loop", icon: "coffee", count: 1, color: "text-yellow-500" },
    { name: "Inbox Loop", icon: "mail", count: 5, color: "text-purple-500" }
  ];

  return (
    <div className="pb-32 animate-in slide-in-from-right duration-500">
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <div className="size-10 rounded-full border-2 border-primary/30 bg-cover bg-center" style={{backgroundImage: 'url("https://picsum.photos/100")'}}></div>
        <div className="text-center">
          <h2 className="text-lg font-black tracking-tight">Focusia Hub</h2>
          <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Welcome, Alex</p>
        </div>
        <button className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="p-4 space-y-6">
        <section>
          <div className="flex flex-col mb-4">
            <h2 className="text-2xl font-black tracking-tight">Focusia Trinity</h2>
            <p className="text-sm text-slate-500">Holistic alignment of your system.</p>
          </div>
          <div className="space-y-3">
            {trinity.map((item, i) => (
              <div key={i} className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <p className="font-black text-sm">{item.label}</p>
                  </div>
                  <p className="text-xs font-black">{item.value}%</p>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-focusia-gradient" style={{ width: `${item.value}%` }}></div>
                </div>
                <p className="text-slate-500 text-[10px] font-medium mt-2 italic">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary/10 border border-primary/20 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="font-black text-lg">Stress Level</h3>
              <p className="text-sm text-slate-500">Current system load</p>
            </div>
            <span className="text-4xl font-black text-primary drop-shadow-sm">{stress}</span>
          </div>
          <input 
            type="range" 
            max="10" 
            value={stress} 
            onChange={(e) => setStress(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg accent-primary outline-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Zen</span>
            <span>Intense</span>
          </div>
        </section>

        <section className="bg-gradient-to-br from-background-dark to-[#0f172a] p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden group shadow-xl">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="material-symbols-outlined absolute top-4 right-4 text-white/5 text-[100px] pointer-events-none">air</span>
          <div className="relative z-10">
            <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">air</span>
            </div>
            <h3 className="text-xl font-black mb-2 tracking-tight text-white">Focusia Breathe</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-[240px] mx-auto leading-relaxed font-medium">Reset your system with a 60-second guided breathing cycle.</p>
            <button className="w-full py-4 bg-focusia-gradient text-white font-black rounded-xl shadow-[0_0_20px_rgba(48,98,255,0.3)] transition-all active:scale-95 uppercase tracking-widest">
              Start Reset
            </button>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-black tracking-tight uppercase">Focus Leaks</h2>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">add_circle</span> Log Leak
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {timeThieves.map((thief, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`size-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center ${thief.color}`}>
                    <span className="material-symbols-outlined text-xl">{thief.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black leading-none uppercase tracking-tighter">{thief.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold">{thief.count}x</p>
                  </div>
                </div>
                <button className="size-6 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HubScreen;
