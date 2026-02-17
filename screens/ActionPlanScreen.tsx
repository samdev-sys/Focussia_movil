
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionPlanScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-32 animate-in fade-in duration-500">
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/80 ios-blur flex items-center p-4 justify-between border-b border-slate-100 dark:border-white/5">
        <div className="size-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
        </div>
        <h2 className="text-lg font-bold">Action Plan</h2>
        <button onClick={() => navigate('/calendar')} className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
      </header>

      <main className="p-4 space-y-8">
        <section>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black uppercase tracking-tight">SMART Goals</h3>
                <span className="text-primary text-[10px] font-black uppercase tracking-widest">Active</span>
            </div>
            <div className="space-y-4">
                {[
                    { name: "Launch Personal Website", due: "Oct 20", val: 80 },
                    { name: "Read 24 Books", due: "Dec 31", val: 50 }
                ].map((goal, i) => (
                    <div key={i} className="bg-white dark:bg-[#193324] p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="max-w-[60%]">
                            <p className="font-bold text-base leading-tight">{goal.name}</p>
                            <p className="text-[#92c9a8] text-[10px] flex items-center gap-1 mt-1 font-bold uppercase">
                                <span className="material-symbols-outlined text-xs">calendar_today</span> Due {goal.due}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <p className="text-sm font-black">{goal.val}%</p>
                            <div className="w-20 h-1.5 bg-slate-100 dark:bg-[#326747] rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${goal.val}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="bg-[#193324] rounded-3xl overflow-hidden border border-primary/20 shadow-2xl">
            <div className="h-44 relative">
                <img 
                    src="https://picsum.photos/seed/nature/800/400" 
                    alt="Sunday Review" 
                    className="size-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#193324] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-background-dark text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Weekend Routine</span>
                </div>
            </div>
            <div className="p-6 space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Sunday Review</h3>
                <p className="text-[#92c9a8] text-sm leading-relaxed">Reflect on your achievements this week and recalibrate your focus for the upcoming cycle.</p>
                <div className="flex flex-col gap-2">
                  <button className="w-full py-4 bg-primary text-background-dark font-black rounded-xl text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                      Start Review Now
                  </button>
                  <button onClick={() => navigate('/calendar')} className="w-full py-2 text-[#92c9a8] text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
                      View Schedule in Calendar
                  </button>
                </div>
            </div>
        </section>

        <section>
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">favorite</span>
                <h3 className="text-xl font-black uppercase tracking-tight">Daily Gratitude</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Take a moment to acknowledge three things you are thankful for today.</p>
            <div className="space-y-4">
                {[
                    "Something that brought a smile...",
                    "A person I appreciate...",
                    "A small win from today..."
                ].map((placeholder, i) => (
                    <div key={i} className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black opacity-30">{i + 1}</span>
                        <input 
                            className="w-full bg-white dark:bg-[#193324] border-none rounded-2xl py-5 pl-12 pr-4 text-sm font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary shadow-sm"
                            placeholder={placeholder}
                        />
                    </div>
                ))}
            </div>
        </section>

        <div className="pt-6">
            <button className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-background-dark rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all uppercase tracking-widest">
                <span className="material-symbols-outlined">check_circle</span> Save Daily Log
            </button>
        </div>
      </main>
    </div>
  );
};

export default ActionPlanScreen;
