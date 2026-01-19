
import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  Bell, 
  ArrowUpRight, 
  LogOut, 
  Cpu, 
  ShieldCheck, 
  Search, 
  Target,
  ArrowLeft,
  Activity,
  History,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { StaffUser } from '../types';

interface StaffDashboardProps {
  user: StaffUser;
  onLogout: () => void;
}

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-inter flex animate-in fade-in duration-700">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-8 flex flex-col fixed h-screen z-50">
        <div className="mb-12">
          <div className="text-xl font-black text-white tracking-tighter uppercase mb-2">
            MARVETTI <span className="text-brand-500">CORPORATION</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg w-fit">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black text-brand-400 uppercase tracking-widest">Master Seq v1.0</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {['Active Orders', 'Human QC Hub', 'Intelligence', 'System Logs'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item.toLowerCase().replace(' ', '_'))}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.toLowerCase().replace(' ', '_') ? 'bg-brand-600 text-white shadow-2xl' : 'hover:bg-slate-800 text-slate-500 hover:text-white'
              }`}
            >
              {item === 'Active Orders' ? <Briefcase size={18} /> : 
               item === 'Human QC Hub' ? <ShieldCheck size={18} /> : 
               item === 'Intelligence' ? <Cpu size={18} /> : <Activity size={18} />}
              {item}
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-auto border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{activeTab.replace('_', ' ')} Node</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
               <Activity size={14} className="text-brand-500" /> Operational Efficiency: 100%
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400">
                <Bell size={20} />
             </div>
             <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">30% Human QC Load Active</span>
             </div>
          </div>
        </header>

        {activeTab === 'active_orders' && (
          <div className="bg-slate-900 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
             <div className="p-20 text-center opacity-30">
                <History size={64} className="mx-auto mb-8" />
                <h3 className="text-2xl font-black uppercase tracking-widest">No active mirrored orders</h3>
                <p className="mt-4 uppercase text-[10px] font-bold tracking-[0.2em]">Listening for global sequence provisioning...</p>
             </div>
          </div>
        )}

        {activeTab === 'human_qc_hub' && (
          <div className="grid md:grid-cols-2 gap-8">
             <div className="p-12 rounded-[4rem] bg-white/5 border border-white/5 border-l-4 border-l-brand-500">
                <div className="flex justify-between items-start mb-10">
                   <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight">CIPC Verification</h4>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Stage 1 Checklist</p>
                   </div>
                   <div className="bg-brand-500/20 text-brand-400 px-4 py-2 rounded-xl text-[10px] font-black">SLA: 24h</div>
                </div>
                <div className="space-y-4 mb-10">
                   {['Verify ID copies', 'Check name availability', 'Format registration draft'].map(task => (
                     <div key={task} className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <div className="w-5 h-5 rounded border border-white/10"></div>
                        {task}
                     </div>
                   ))}
                </div>
                <button className="w-full py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 transition-all">Claim Verification</button>
             </div>
             
             <div className="p-12 rounded-[4rem] bg-white/5 border border-white/5 flex flex-col items-center justify-center opacity-40 italic">
                <Target size={48} className="mb-6" />
                <p className="text-sm font-medium">Listening for new QC checkpoints...</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StaffDashboard;
