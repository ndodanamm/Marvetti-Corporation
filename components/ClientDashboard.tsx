
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CreditCard, 
  Settings, 
  MessageCircle, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronRight,
  Bell,
  Search,
  User as UserIcon,
  ArrowLeft,
  FileText,
  LogOut,
  Zap,
  ShoppingCart,
  Plus,
  Cpu,
  History,
  ShieldCheck // Added to fix the error on line 124
} from 'lucide-react';
import { STAGES_DATA } from '../constants';
import { User } from '../types';

interface ClientDashboardProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
  onOrderService: (id: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, onBack, onLogout, onOrderService }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const nextRecommendedStage = STAGES_DATA.find(s => !user.completedStages?.includes(s.stageNumber));

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-40 font-inter">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div>
              <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tighter">Client Nexus</h1>
              <p className="text-slate-400 font-medium mt-1">Status: Monitoring {user.businessName} Lifecycle</p>
           </div>
           <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400"><UserIcon size={18} /></div>
              <div className="text-right">
                 <div className="text-[10px] font-black uppercase">{user.name}</div>
                 <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user.tier} Partner</div>
              </div>
              <button onClick={onLogout} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><LogOut size={16} /></button>
           </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
           {/* Sidebar Navigation */}
           <div className="space-y-4">
              {['Overview', 'Infrastructure', 'AI Previews', 'Financials'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`w-full flex items-center gap-4 px-8 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === tab.toLowerCase() ? 'bg-slate-950 text-white shadow-2xl' : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab === 'Overview' ? <LayoutDashboard size={18} /> : 
                   tab === 'Infrastructure' ? <FolderKanban size={18} /> : 
                   tab === 'AI Previews' ? <Cpu size={18} /> : <CreditCard size={18} />}
                  {tab}
                </button>
              ))}
              
              <div className="p-8 rounded-[3rem] bg-brand-gradient text-white relative overflow-hidden mt-8 shadow-2xl shadow-brand-900/20">
                 <Zap className="w-12 h-12 opacity-20 absolute top-0 right-0 p-4" />
                 <h4 className="font-black uppercase tracking-tight mb-4">Master Sequence</h4>
                 <div className="text-xs font-bold opacity-80 leading-relaxed mb-6">
                    You have completed {user.completedStages?.length || 0} / 12 stages.
                 </div>
                 {nextRecommendedStage && (
                   <button 
                    onClick={() => onOrderService(nextRecommendedStage.id)}
                    className="w-full py-4 bg-white text-brand-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50"
                   >
                     Unlock Stage {nextRecommendedStage.stageNumber}
                   </button>
                 )}
              </div>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-3 space-y-8">
              {/* Active Stages Monitor */}
              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                    <div>
                       <h3 className="text-sm font-black text-slate-950 uppercase tracking-[0.3em]">Infrastructure Monitor</h3>
                       <p className="text-[9px] text-slate-400 uppercase font-bold mt-1">Live project mirroring from staff nexus</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Ops Live
                    </div>
                 </div>
                 
                 <div className="p-10 text-center py-20">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6"><History size={32} className="text-slate-200" /></div>
                    <h4 className="text-xl font-black text-slate-900 uppercase">No active operations</h4>
                    <p className="text-slate-400 font-medium mt-2 mb-10">Begin a new stage to monitor real-time AI and human progress.</p>
                    <button 
                      onClick={() => onOrderService('stage-1')}
                      className="inline-flex items-center gap-3 px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20"
                    >
                      Initialize Stage 1 <Plus size={14} />
                    </button>
                 </div>
              </div>

              {/* Trust/Guarantee Infographic */}
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck size={100} /></div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-4 relative z-10">Quality Controlled</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed relative z-10">Every AI generation in your dashboard has been flagged for human verification. Final delivery is only granted once verified by a Marvetti Strategist.</p>
                 </div>
                 <div className="p-10 rounded-[3rem] border border-slate-100 bg-white shadow-sm">
                    <h4 className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-6">Stage Roadmap</h4>
                    <div className="space-y-4">
                       {[1,2,3,4,5,6].map(s => (
                         <div key={s} className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${user.completedStages?.includes(s) ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                               {user.completedStages?.includes(s) ? <CheckCircle2 size={14} /> : s}
                            </div>
                            <div className="h-px flex-grow bg-slate-100"></div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
