
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [cloudSync, setCloudSync] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const SettingToggle = ({ label, sub, active, onToggle, icon }: any) => (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl transition-all hover:bg-white/10">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <p className="font-bold text-sm">{label}</p>
          <p className="text-[10px] text-slate-500 font-medium uppercase">{sub}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-primary' : 'bg-slate-700'}`}
      >
        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`}></div>
      </button>
    </div>
  );

  const SettingLink = ({ label, sub, icon, color = "text-primary", onClick }: any) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl transition-all hover:bg-white/10 active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className={`size-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="text-left">
          <p className="font-bold text-sm">{label}</p>
          <p className="text-[10px] text-slate-500 font-medium uppercase">{sub}</p>
        </div>
      </div>
      <span className="material-symbols-outlined text-slate-500">chevron_right</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background-dark pb-10 animate-in slide-in-from-right duration-500">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl p-4 flex items-center border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-black tracking-tight flex-1 text-center pr-10">Configuration</h2>
      </header>

      <main className="p-6 space-y-8">
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase text-primary tracking-[0.2em] ml-1">Account & Security</h3>
          <div className="space-y-2">
            <SettingLink icon="person" label="Profile Information" sub="Edit name, email and avatar" />
            <SettingLink icon="key" label="Password & Security" sub="Change password & 2FA" />
            <SettingLink icon="verified" label="Subscription" sub="Focusia Pro - Active" />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase text-primary tracking-[0.2em] ml-1">App Preferences</h3>
          <div className="space-y-2">
            <SettingToggle 
                icon="notifications" 
                label="Smart Notifications" 
                sub="Based on focus cycles" 
                active={notifications} 
                onToggle={() => setNotifications(!notifications)} 
            />
            <SettingToggle 
                icon="dark_mode" 
                label="Dark Interface" 
                sub="System default enabled" 
                active={darkMode} 
                onToggle={() => setDarkMode(!darkMode)} 
            />
            <SettingToggle 
                icon="cloud_sync" 
                label="Cloud Sincronization" 
                sub="Sync across devices" 
                active={cloudSync} 
                onToggle={() => setCloudSync(!cloudSync)} 
            />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase text-primary tracking-[0.2em] ml-1">Help & System</h3>
          <div className="space-y-2">
            <SettingLink icon="help" label="Help Center" sub="FAQ & Documentation" />
            <SettingLink icon="description" label="Terms of Service" sub="Legal documentation" />
            <SettingLink icon="info" label="App Version" sub="v1.4.2 (Production)" />
          </div>
        </section>

        <section className="pt-6 space-y-4">
          <button 
            onClick={handleLogout}
            className="w-full h-16 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-red-500">logout</span>
            <span className="uppercase tracking-widest text-sm">Close Session</span>
          </button>
          
          <button className="w-full py-2 text-red-500/50 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">
            Delete Account Data
          </button>
        </section>
      </main>
    </div>
  );
};

export default SettingsScreen;
