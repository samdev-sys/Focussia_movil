
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface Task {
  id: string;
  name: string;
  pareto?: boolean;
  load: number;
  dueDate?: string;
  assignee?: string;
  notes?: string;
  quadrantColor: string;
  status: TaskStatus;
  quadrant: string;
}

interface Quadrant {
  id: string;
  title: string;
  color: string;
  icon: string;
  tasks: Task[];
  emptyText?: string;
}

const MatrixScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Professional');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [defaultQuadrantId, setDefaultQuadrantId] = useState('do-first');
  
  // Filtering states
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'All'>('All');
  const [filterAssignee, setFilterAssignee] = useState<string>('All');

  // Default tasks
  const [allTasks, setAllTasks] = useState<Task[]>([
    { 
      id: '1',
      name: "Q4 Budget Approval", 
      pareto: true, 
      load: 6,
      dueDate: "Oct 20, 2024",
      assignee: "Alex (Me)",
      notes: "Requires final sign-off from the finance department.",
      quadrantColor: "emerald",
      status: "To Do",
      quadrant: "do-first"
    },
    { 
      id: '2',
      name: "Update client deck", 
      load: 6,
      dueDate: "Oct 18, 2024",
      assignee: "Alex (Me)",
      notes: "Add new case studies.",
      quadrantColor: "emerald",
      status: "In Progress",
      quadrant: "do-first"
    },
    { 
      id: '3',
      name: "Weekly team sync", 
      load: 3,
      dueDate: "Every Monday",
      assignee: "Whole Team",
      notes: "Review progress on SMART goals.",
      quadrantColor: "yellow",
      status: "To Do",
      quadrant: "schedule"
    },
    { 
      id: '4',
      name: "Book travel for Mike", 
      load: 8,
      dueDate: "Oct 19, 2024",
      assignee: "Sara",
      notes: "Flight to NY.",
      quadrantColor: "blue",
      status: "Done",
      quadrant: "delegate"
    },
    { 
      id: '5',
      name: "Social media cleanup", 
      load: 1,
      dueDate: "N/A",
      assignee: "Alex (Me)",
      notes: "Low priority.",
      quadrantColor: "red",
      status: "To Do",
      quadrant: "eliminate"
    }
  ]);

  // Derived unique assignees for filter
  const uniqueAssignees = useMemo(() => {
    const assignees = allTasks.map(t => t.assignee).filter(Boolean) as string[];
    return ['All', ...Array.from(new Set(assignees))];
  }, [allTasks]);

  // Filtered tasks logic
  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
      const matchesAssignee = filterAssignee === 'All' || task.assignee === filterAssignee;
      return matchesStatus && matchesAssignee;
    });
  }, [allTasks, filterStatus, filterAssignee]);

  const quadrants: Quadrant[] = [
    { 
      id: "do-first",
      title: "Do First", 
      color: "emerald", 
      icon: "priority_high", 
      tasks: filteredTasks.filter(t => t.quadrant === "do-first")
    },
    { 
      id: "schedule",
      title: "Schedule", 
      color: "yellow", 
      icon: "calendar_month", 
      tasks: filteredTasks.filter(t => t.quadrant === "schedule")
    },
    { 
      id: "delegate",
      title: "Delegate", 
      color: "blue", 
      icon: "groups", 
      tasks: filteredTasks.filter(t => t.quadrant === "delegate")
    },
    { 
      id: "eliminate",
      title: "Eliminate", 
      color: "red", 
      icon: "delete_sweep", 
      tasks: filteredTasks.filter(t => t.quadrant === "eliminate"),
      emptyText: "No tasks match filters..."
    }
  ];

  const handleOpenCreateModal = (quadId?: string) => {
    setDefaultQuadrantId(quadId || 'do-first');
    setIsCreateModalOpen(true);
  };

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const quadrantId = formData.get('quadrant') as string;
    const load = parseInt(formData.get('load') as string);
    const assignee = formData.get('assignee') as string || 'Alex (Me)';
    const quadrant = quadrants.find(q => q.id === quadrantId);

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      load,
      quadrant: quadrantId,
      quadrantColor: quadrant?.color || 'emerald',
      status: 'To Do',
      dueDate: 'Today',
      assignee,
      notes: 'New task created via Matrix interface.'
    };

    setAllTasks([...allTasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Done': return 'text-primary';
      case 'In Progress': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="pb-32 animate-in fade-in duration-500 h-screen flex flex-col relative">
      <header className="sticky top-0 z-40 bg-background-light dark:bg-background-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">settings</span>
        <h2 className="text-lg font-bold">Eisenhower Matrix</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenCreateModal()}
            className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all"
          >
            <span className="material-symbols-outlined text-sm">add</span> New
          </button>
          <span onClick={() => navigate('/calendar')} className="material-symbols-outlined cursor-pointer text-primary hover:scale-110 transition-transform">calendar_today</span>
        </div>
      </header>

      {/* Tabs & Filter Bar */}
      <div className="bg-background-light dark:bg-background-dark/50 z-30 pb-2">
        <nav className="px-4 py-3">
          <div className="flex h-11 items-center justify-center rounded-xl bg-slate-200 dark:bg-emerald-950/40 p-1 border border-emerald-900/20">
            {['Personal', 'Professional'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 h-full rounded-lg text-sm font-black transition-all ${activeTab === tab ? 'bg-white dark:bg-background-dark text-primary shadow-sm' : 'text-slate-500 dark:text-emerald-400/50'}`}
                >
                  {tab}
                </button>
            ))}
          </div>
        </nav>

        {/* Global Filters */}
        <div className="px-4 overflow-x-auto no-scrollbar flex items-center gap-3 pb-2">
           <div className="flex items-center gap-1 shrink-0">
             <span className="material-symbols-outlined text-xs text-slate-400">filter_list</span>
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-2">Filters:</span>
           </div>
           
           {/* Status Chips */}
           <div className="flex gap-2 shrink-0">
              {['All', 'To Do', 'In Progress', 'Done'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-primary text-background-dark' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                >
                  {status}
                </button>
              ))}
           </div>

           <div className="w-[1px] h-4 bg-slate-200 dark:bg-white/10 shrink-0"></div>

           {/* Assignee Chips */}
           <div className="flex gap-2 shrink-0">
              {uniqueAssignees.map(assignee => (
                <button 
                  key={assignee}
                  onClick={() => setFilterAssignee(assignee)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterAssignee === assignee ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'}`}
                >
                  {assignee === 'Alex (Me)' ? 'Me' : assignee}
                </button>
              ))}
           </div>
        </div>
      </div>

      <main className="flex-1 px-4 grid grid-cols-2 grid-rows-2 gap-3 pb-4 overflow-hidden mt-1">
        {quadrants.map((quad, i) => (
            <section key={i} className={`flex flex-col rounded-2xl bg-${quad.color}-500/10 border border-${quad.color}-500/20 overflow-hidden shadow-sm`}>
                <div className={`p-3 bg-${quad.color}-500/20 border-b border-${quad.color}-500/20 flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-${quad.color}-400 text-sm`}>{quad.icon}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest text-${quad.color}-400`}>{quad.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black opacity-40">{quad.tasks.length}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenCreateModal(quad.id); }}
                        className={`size-5 rounded-full bg-${quad.color}-400/20 flex items-center justify-center text-${quad.color}-400 hover:bg-${quad.color}-400 hover:text-white transition-all`}
                        title="Add task to this quadrant"
                      >
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
                    {quad.tasks.map((task) => (
                        <div 
                          key={task.id} 
                          onClick={() => setSelectedTask(task)}
                          className={`${task.pareto ? 'ios-blur border border-primary/40 shadow-inner' : 'bg-white/5'} p-2.5 rounded-xl cursor-pointer active:scale-[0.97] transition-all hover:bg-white/10 animate-in zoom-in-95 duration-200`}
                        >
                            <div className="flex items-start gap-1.5">
                                {task.status === 'Done' ? (
                                  <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
                                ) : task.pareto ? (
                                  <span className="material-symbols-outlined text-yellow-400 text-[14px] shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                ) : null}
                                <p className={`text-[11px] font-bold leading-tight opacity-90 ${task.status === 'Done' ? 'line-through opacity-40' : ''}`}>
                                  {task.name}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-2 px-1">
                              <span className={`text-[8px] font-black uppercase tracking-tighter ${getStatusColor(task.status)}`}>{task.status}</span>
                              <span className="text-[8px] font-bold text-slate-500 opacity-60 truncate max-w-[50%]">{task.assignee === 'Alex (Me)' ? 'Me' : task.assignee}</span>
                            </div>
                        </div>
                    ))}
                    {quad.tasks.length < 1 && (
                        <div className="flex flex-col items-center justify-center h-full opacity-20 py-10">
                          <span className="material-symbols-outlined text-xl mb-1">inbox</span>
                          <p className="text-[8px] font-black uppercase tracking-[0.2em]">{quad.emptyText || 'Empty'}</p>
                        </div>
                    )}
                </div>
                <div className={`p-3 bg-${quad.color}-500/5`}>
                    <div className={`flex justify-between items-end mb-1 text-[9px] font-bold text-${quad.color}-400 uppercase`}>
                        <span>Segment Load</span>
                        <span>{quad.tasks.length > 0 ? (quad.tasks.filter(t => t.status === 'Done').length / quad.tasks.length * 100).toFixed(0) : 0}%</span>
                    </div>
                    <div className={`h-1 w-full bg-${quad.color}-900/20 rounded-full overflow-hidden`}>
                        <div 
                          className={`h-full bg-${quad.color}-400 transition-all duration-700`} 
                          style={{ width: `${quad.tasks.length > 0 ? (quad.tasks.filter(t => t.status === 'Done').length / quad.tasks.length * 100) : 0}%` }}
                        ></div>
                    </div>
                </div>
            </section>
        ))}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={() => handleOpenCreateModal()}
          className="h-16 w-16 bg-primary rounded-full shadow-[0_8px_30px_rgb(43,238,121,0.3)] flex items-center justify-center text-background-dark active:scale-90 transition-all hover:rotate-90 group"
        >
            <span className="material-symbols-outlined text-3xl font-black">add</span>
        </button>
      </div>

      <footer className="px-6 pb-28 text-emerald-400/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm animate-pulse">info</span>
        <span className="text-[9px] uppercase font-black tracking-widest">Active Filters: {filterStatus} • {filterAssignee}</span>
      </footer>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setSelectedTask(null)}
          ></div>
          <div className="relative w-full max-w-md bg-white dark:bg-[#112218] rounded-[2.5rem] p-8 border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out overflow-hidden">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full"></div>
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-${selectedTask.quadrantColor}-500/20 text-${selectedTask.quadrantColor}-400`}>
                    {activeTab}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-500/10 ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                <h3 className={`text-2xl font-black leading-tight ${selectedTask.status === 'Done' ? 'line-through opacity-50 transition-all' : ''}`}>
                  {selectedTask.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTask(null)}
                className="size-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Due Date</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
                    <p className="font-bold text-sm">{selectedTask.dueDate || 'No Date'}</p>
                  </div>
                </div>
                <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Assignee</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">person</span>
                    <p className="font-bold text-sm truncate">{selectedTask.assignee || 'Unassigned'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Complexity & Resource Load</p>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-[0_0_10px_rgba(43,238,121,0.5)] transition-all duration-1000" style={{ width: `${selectedTask.load * 10}%` }}></div>
                  </div>
                  <span className="text-sm font-black text-primary">{selectedTask.load}/10</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Contextual Notes</p>
                <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 min-h-[100px]">
                  <p className="text-sm text-slate-600 dark:text-[#92c9a8] leading-relaxed">
                    {selectedTask.notes || 'No notes provided for this task.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={() => {
                  // Explicitly cast to TaskStatus to avoid type widening to 'string'
                  const updatedTasks = allTasks.map(t => t.id === selectedTask.id ? {...t, status: (t.status === 'Done' ? 'To Do' : 'Done') as TaskStatus} : t);
                  setAllTasks(updatedTasks);
                  setSelectedTask(null);
                }}
                className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-black transition-all active:scale-95 ${
                  selectedTask.status === 'Done' 
                  ? 'bg-slate-200 dark:bg-white/10 text-slate-500' 
                  : 'bg-primary text-background-dark shadow-lg shadow-primary/20'
                }`}
              >
                <span className="material-symbols-outlined">
                  {selectedTask.status === 'Done' ? 'restart_alt' : 'task_alt'}
                </span>
                {selectedTask.status === 'Done' ? 'Reopen Task' : 'Mark as Complete'}
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 h-14 bg-slate-100 dark:bg-white/5 text-slate-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-lg">edit</span> Edit
                </button>
                <button 
                  onClick={() => {
                    setAllTasks(allTasks.filter(t => t.id !== selectedTask.id));
                    setSelectedTask(null);
                  }}
                  className="flex-1 h-14 bg-red-500/10 text-red-400 font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">delete</span> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsCreateModalOpen(false)}
          ></div>
          <form 
            onSubmit={handleCreateTask}
            className="relative w-full max-w-md bg-white dark:bg-[#112218] rounded-[2.5rem] p-8 border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out overflow-hidden"
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full"></div>
            </div>

            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black">Create Task</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Assign to {activeTab} Flow</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="size-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Task Name</label>
                <input 
                  required
                  autoFocus
                  name="name"
                  placeholder="What needs to be done?"
                  className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border-none px-4 focus:ring-2 focus:ring-primary font-bold placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Assignee</label>
                  <select name="assignee" className="w-full h-12 rounded-xl bg-slate-50 dark:bg-white/5 border-none px-3 text-xs font-bold focus:ring-primary">
                    <option value="Alex (Me)">Me</option>
                    <option value="Whole Team">Team</option>
                    <option value="Sara">Sara</option>
                    <option value="Mike">Mike</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Complexity</label>
                  <input type="number" name="load" min="1" max="10" defaultValue="5" className="w-full h-12 rounded-xl bg-slate-50 dark:bg-white/5 border-none px-3 text-xs font-bold focus:ring-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Quadrant Assignment</label>
                <div className="grid grid-cols-2 gap-2">
                  {quadrants.map(q => (
                    <label key={q.id} className="cursor-pointer">
                      <input type="radio" name="quadrant" value={q.id} className="hidden peer" defaultChecked={q.id === defaultQuadrantId} />
                      <div className={`h-12 flex items-center gap-2 px-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 peer-checked:border-primary peer-checked:bg-primary/10 transition-all`}>
                        <span className={`material-symbols-outlined text-sm text-${q.color}-400`}>{q.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-tighter truncate">{q.title}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full h-16 bg-primary text-background-dark font-black rounded-2xl text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined font-black">add_task</span>
                  Generate Task
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MatrixScreen;
