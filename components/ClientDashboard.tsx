
import React, { useEffect } from 'react';
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
  User,
  ArrowLeft,
  // Added missing FileText import
  FileText
} from 'lucide-react';
import { MOCK_DASHBOARD_PROJECTS, MOCK_DASHBOARD_INVOICES } from '../constants';

interface ClientDashboardProps {
  onBack: () => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-40">
      {/* Dashboard Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Site
          </button>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Client Portal</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search deliverables..." 
                className="pl-10 pr-4 py-2 text-xs font-bold outline-none bg-transparent placeholder:text-slate-300" 
              />
           </div>
           <div className="w-px h-6 bg-slate-100"></div>
           <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
           </button>
           <div className="flex items-center gap-3 pl-2">
              <div className="text-right">
                 <div className="text-[10px] font-black text-slate-950 uppercase tracking-tight">John Doe</div>
                 <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Premium Partner</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                 <User className="w-5 h-5" />
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-4">
             {[
               { icon: <LayoutDashboard size={18} />, label: 'Overview', active: true },
               { icon: <FolderKanban size={18} />, label: 'Projects' },
               { icon: <CreditCard size={18} />, label: 'Billing' },
               { icon: <Settings size={18} />, label: 'Security' }
             ].map((item, idx) => (
               <button 
                key={idx}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  item.active ? 'bg-slate-950 text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-900'
                }`}
               >
                 {item.icon}
                 {item.label}
               </button>
             ))}
             
             <div className="pt-8">
                <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                      <MessageCircle size={80} />
                   </div>
                   <h4 className="font-black uppercase tracking-tight mb-3">Direct Support</h4>
                   <p className="text-[10px] font-medium opacity-80 mb-6 leading-relaxed">Need a strategist? Access your dedicated WhatsApp channel immediately.</p>
                   <a 
                    href="https://wa.me/27687240126" 
                    className="block w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black text-center uppercase tracking-widest hover:bg-indigo-50 transition-colors"
                   >
                     Chat Now
                   </a>
                </div>
             </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Active Projects', value: '2', color: 'text-indigo-600' },
                 { label: 'Pending Docs', value: '0', color: 'text-slate-400' },
                 { label: 'Total Value', value: 'R7,500', color: 'text-slate-950' },
                 { label: 'Status', value: 'Healthy', color: 'text-emerald-500' }
               ].map((stat, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
                    <div className={`text-xl font-black tracking-tighter uppercase ${stat.color}`}>{stat.value}</div>
                 </div>
               ))}
            </div>

            {/* Active Projects Tracker */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest">Active Infrastructure</h3>
                  <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Roadmap</button>
               </div>
               <div className="p-4 space-y-4">
                  {MOCK_DASHBOARD_PROJECTS.map((project) => (
                    <div key={project.id} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-all">
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-300 shadow-sm group-hover:text-indigo-600 transition-colors">
                                <FolderKanban size={24} />
                             </div>
                             <div>
                                <h4 className="font-black text-slate-950 uppercase tracking-tight">{project.title}</h4>
                                <div className="flex items-center gap-4 mt-1">
                                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{project.pillar}</span>
                                   <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> Updated {project.lastUpdate}
                                   </span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-8">
                             <div className="text-right">
                                <div className="flex items-center gap-2 justify-end mb-1">
                                   <div className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`}></div>
                                   <span className="text-[10px] font-black text-slate-950 uppercase tracking-tight">{project.status}</span>
                                </div>
                                <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                   <div className="h-full bg-indigo-600" style={{ width: `${project.progress}%` }}></div>
                                </div>
                             </div>
                             <button className="p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                                <ChevronRight size={18} />
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Bottom Grid: Billing & Resources */}
            <div className="grid md:grid-cols-2 gap-8">
               {/* Billing Section */}
               <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                     <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest">Recent Invoices</h3>
                     <CreditCard className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="p-6 space-y-4">
                     {MOCK_DASHBOARD_INVOICES.map((inv) => (
                       <div key={inv.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                <CreditCard size={18} />
                             </div>
                             <div>
                                <div className="text-[10px] font-black text-slate-950 uppercase tracking-tight">{inv.id}</div>
                                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{inv.date}</div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-xs font-black text-slate-950">{inv.amount}</div>
                             <div className={`text-[8px] font-black uppercase tracking-widest ${inv.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{inv.status}</div>
                          </div>
                       </div>
                     ))}
                  </div>
                  <button className="mt-auto p-6 text-center text-[10px] font-black text-indigo-600 uppercase tracking-widest border-t border-slate-50 hover:bg-slate-50 transition-colors">
                     Manage Settlements
                  </button>
               </div>

               {/* Resource Library */}
               <div className="bg-slate-950 rounded-[3rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_0%_0%,#4f46e5,transparent)]"></div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-8 relative z-10">Resource Library</h3>
                  <div className="space-y-4 relative z-10">
                     {[
                       'Standard Service Agreement.pdf',
                       'Corporate Brand Assets v1.zip',
                       'Infrastructure Access Protocol.key',
                       'Communication Framework.txt'
                     ].map((file, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                             <FileText size={16} className="text-indigo-400" />
                             <span className="text-[10px] font-bold text-slate-300 group-hover:text-white transition-colors">{file}</span>
                          </div>
                          <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                       </div>
                     ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5">
                     <div className="flex items-center gap-3 text-emerald-400">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">All protocols updated</span>
                     </div>
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
