
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  
  // Static events mapping for demonstration
  const events: Record<number, { type: 'goal' | 'review' | 'habit', title: string, time?: string }[]> = {
    5: [{ type: 'review', title: 'Sunday Review', time: '10:00 AM' }],
    12: [{ type: 'review', title: 'Sunday Review', time: '10:00 AM' }],
    19: [{ type: 'review', title: 'Sunday Review', time: '10:00 AM' }],
    20: [{ type: 'goal', title: 'Launch Personal Website', time: '11:59 PM' }],
    26: [{ type: 'review', title: 'Sunday Review', time: '10:00 AM' }],
    28: [{ type: 'habit', title: 'Mindfulness Session', time: '08:00 AM' }]
  };

  const daysInMonth = 31; // Oct
  const firstDay = 2; // Tuesday start for Oct 2024 (example)
  
  const renderCalendarDays = () => {
    const days = [];
    // Padding for first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-14"></div>);
    }
    // Month days
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selectedDate === d;
      const hasEvents = events[d];
      
      days.push(
        <button 
          key={d} 
          onClick={() => setSelectedDate(d)}
          className={`relative h-14 flex flex-col items-center justify-center rounded-2xl transition-all ${isSelected ? 'bg-primary text-background-dark font-black' : 'hover:bg-white/5'}`}
        >
          <span className="text-sm">{d}</span>
          {hasEvents && !isSelected && (
            <div className="absolute bottom-2 flex gap-0.5">
              {hasEvents.map((e, idx) => (
                <div key={idx} className={`size-1 rounded-full ${e.type === 'goal' ? 'bg-primary' : e.type === 'review' ? 'bg-blue-400' : 'bg-yellow-400'}`}></div>
              ))}
            </div>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="pb-32 animate-in fade-in duration-500 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/80 ios-blur flex items-center p-4 justify-between border-b border-slate-100 dark:border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold">Focus Calendar</h2>
        <button className="size-10 flex items-center justify-end">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main className="p-4">
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="text-2xl font-black">October 2024</h3>
          <div className="flex gap-2">
            <button className="size-8 rounded-full bg-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
            <button className="size-8 rounded-full bg-white/5 flex items-center justify-center"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#112218] rounded-3xl p-4 border border-slate-100 dark:border-white/5 shadow-xl mb-8">
          <div className="grid grid-cols-7 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-slate-400 py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Events for Oct {selectedDate}</h4>
            <button className="text-primary font-bold text-xs">+ Add Event</button>
          </div>
          
          <div className="space-y-3">
            {events[selectedDate] ? events[selectedDate].map((event, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                <div className={`size-12 rounded-xl flex items-center justify-center ${
                  event.type === 'goal' ? 'bg-emerald-500/20 text-emerald-400' : 
                  event.type === 'review' ? 'bg-blue-500/20 text-blue-400' : 
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  <span className="material-symbols-outlined">
                    {event.type === 'goal' ? 'flag' : event.type === 'review' ? 'event_repeat' : 'bolt'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold">{event.title}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter mt-0.5">{event.time || 'All Day'}</p>
                </div>
                <span className="material-symbols-outlined text-slate-500">chevron_right</span>
              </div>
            )) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
                <span className="material-symbols-outlined text-slate-500 text-4xl mb-2">event_busy</span>
                <p className="text-slate-500 text-sm font-medium">No plans for this day yet.</p>
              </div>
            )}
          </div>
        </section>

        {selectedDate === 20 && (
          <div className="mt-8 bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-4 animate-pulse">
            <div className="bg-primary/20 p-2 rounded-lg text-primary shrink-0 flex items-center">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
              <p className="text-xs text-primary font-black uppercase tracking-wider">Upcoming Milestone</p>
              <p className="text-sm mt-1 leading-tight font-bold">Your SMART Goal "Launch Website" is due today. Ready to crush it?</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarScreen;
