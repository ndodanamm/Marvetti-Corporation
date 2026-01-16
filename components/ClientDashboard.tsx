
import React, { useState, useEffect } from 'react';
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
  Plus
} from 'lucide-react';
import { MOCK_DASHBOARD_PROJECTS, MOCK_DASHBOARD_INVOICES, SERVICES_DATA, STANDALONE_SERVICES } from '../constants';
import { User } from '../types';

interface ClientDashboardProps {
  user: User;
  onBack: () => void;
  onLogout: () => void;
  onOrderService: (id: string) => void;
}

type DashboardTab = 'overview' | 'projects' | 'billing' | 'marketplace' | 'settings';

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, onBack, onLogout, onOrderService }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* User Intro */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
         <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tighter uppercase mb-2">Welcome to the Nexus, {user.name.split(' ')[0]}</h2>
            <p className="text-slate-400 font-medium">Monitoring {user.businessName} infrastructure from Johannesburg Ops.</p>
         </div>
         <div className="flex gap-4">
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nexus Status</span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Systems Nominal
              </span>
            </div>
         </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Active Projects', value: '2', color: 'text-indigo-600' },
           { label: 'Pending Docs', value: '0', color: 'text-slate-400' },
           { label: 'Account Tier', value: user.tier, color: 'text-slate-950' },
           { label: 'Client Since', value: '2025', color: 'text-emerald-500' }
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
            <button onClick={() => setActiveTab('projects')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Roadmap</button>
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
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,#4f46e5,transparent)]"></div>
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-white/5">
            <Zap className="w-3 h-3" /> Instant Provisioning
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Solution Marketplace</h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Expand your digital footprint with Marvetti's core pillars. Select a module below to start an instant quote and implementation roadmap.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {SERVICES_DATA.map((service) => (
          <div key={service.id} className="bg-white border border-slate-100 rounded-[3rem] p-8 flex flex-col group hover:border-indigo-100 transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div className={`w-12 h-12 rounded-2xl ${service.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {React.cloneElement(service.icon as React.ReactElement, { size: 20 })}
              </div>
              <div className="text-right">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Starts from</div>
                <div className="text-xl font-black text-slate-950 tracking-tighter">{service.startingPrice}</div>
              </div>
            </div>
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight mb-3">{service.title}</h3>
            <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed flex-grow">
              {service.shortDescription}
            </p>
            <button 
              onClick={() => onOrderService(service.id)}
              className="w-full py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
            >
              Order Pillar <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-black text-slate-950 uppercase tracking-[0.3em]">Express Modules</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">24-48h Delivery</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STANDALONE_SERVICES.map((item) => (
            <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:bg-white hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-white border border-slate-100 text-indigo-600">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 16 })}
                </div>
                <span className="font-black text-slate-950 text-sm tracking-tight">{item.price}</span>
              </div>
              <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight mb-2">{item.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium mb-6 leading-relaxed">
                {item.description}
              </p>
              <button 
                onClick={() => onOrderService('3')} // Default to branding for standalone samples
                className="w-full py-2.5 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-950 hover:text-white transition-all"
              >
                Quick Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Nexus Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search Nexus..." 
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
                 <div className="text-[10px] font-black text-slate-950 uppercase tracking-tight">{user.name}</div>
                 <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user.tier} Partner</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                 <UserIcon className="w-5 h-5" />
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-4">
             {[
               { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
               { id: 'marketplace', icon: <ShoppingCart size={18} />, label: 'Order Solutions' },
               { id: 'projects', icon: <FolderKanban size={18} />, label: 'Projects' },
               { id: 'billing', icon: <CreditCard size={18} />, label: 'Billing' },
               { id: 'settings', icon: <Settings size={18} />, label: 'Security' }
             ].map((item) => (
               <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as DashboardTab)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === item.id ? 'bg-slate-950 text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-slate-100 hover:text-slate-900'
                }`}
               >
                 {item.icon}
                 {item.label}
               </button>
             ))}
             
             <button 
               onClick={onLogout}
               className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
             >
               <LogOut size={18} />
               Logout Session
             </button>
             
             <div className="pt-4">
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
          <div className="lg:col-span-3">
             {activeTab === 'overview' && renderOverview()}
             {activeTab === 'marketplace' && renderMarketplace()}
             
             {/* Billing, Projects, and Settings can be implemented similarly with detailed sub-views */}
             {['projects', 'billing', 'settings'].includes(activeTab) && (
               <div className="bg-white p-20 rounded-[4rem] border border-slate-100 shadow-sm text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-8">
                     <Settings className="w-10 h-10 text-slate-200 animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-4">{activeTab} Hub Under Optimization</h3>
                  <p className="text-slate-400 font-medium mb-8 max-w-sm mx-auto">This module is currently being fine-tuned for the Johannesburg production server. Check back in 24 hours.</p>
                  <button onClick={() => setActiveTab('overview')} className="text-xs font-black text-indigo-600 uppercase tracking-widest underline underline-offset-8">Return to Overview</button>
               </div>
             )}
             
             {/* Bottom Grid for Overview only (moved from initial implementation) */}
             {activeTab === 'overview' && (
               <div className="grid md:grid-cols-2 gap-8 mt-8">
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
                     <button onClick={() => setActiveTab('billing')} className="mt-auto p-6 text-center text-[10px] font-black text-indigo-600 uppercase tracking-widest border-t border-slate-50 hover:bg-slate-50 transition-colors">
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
             )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ClientDashboard;
