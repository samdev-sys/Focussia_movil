
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-[#112218]/90 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 px-6 py-3 pb-6 flex justify-between items-center z-50">
      <Link to="/hub" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/hub') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px] font-bold">Hub</span>
      </Link>
      <Link to="/matrix" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/matrix') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined">grid_view</span>
        <span className="text-[10px] font-bold">Matrix</span>
      </Link>
      <Link to="/wheel" className="relative group">
        <div className={`size-14 bg-primary rounded-full flex items-center justify-center -mt-10 shadow-lg shadow-primary/30 border-4 border-white dark:border-background-dark transition-transform group-active:scale-95`}>
          <span className="material-symbols-outlined text-background-dark font-black">add</span>
        </div>
        <div className="text-center w-full mt-1">
          <span className="text-[10px] font-bold text-slate-400">Wheel</span>
        </div>
      </Link>
      <Link to="/action" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/action') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined">task_alt</span>
        <span className="text-[10px] font-bold">Plan</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-primary' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] font-bold">XP</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
