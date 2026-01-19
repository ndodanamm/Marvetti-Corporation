
import React from 'react';
import { Search, Cpu, Users, Lock, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProcessFlowProps {
  onViewDetails?: () => void;
}

const STEPS = [
  { icon: <Search className="w-6 h-6" />, title: 'Entry Stage', desc: 'Select any stage from 1-12 based on your current need.' },
  { icon: <Cpu className="w-6 h-6" />, title: 'AI Generation', desc: '70% neural drafting and rapid sandbox prototyping.' },
  { icon: <Users className="w-6 h-6" />, title: 'Human Audit', desc: '30% professional QC and compliance verification.' },
  { icon: <Lock className="w-6 h-6" />, title: 'Nexus Mirror', desc: 'Real-time mirroring to client and staff dashboards.' },
  { icon: <Trophy className="w-6 h-6" />, title: 'Final Delivery', desc: 'Validated, compliant outputs ready for scale.' }
];

const ProcessFlow: React.FC<ProcessFlowProps> = ({ onViewDetails }) => {
  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-brand-600 uppercase tracking-[0.4em] mb-4">Hybrid Operating Model</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter mb-6">The 70/30 Framework</h3>
            <p className="text-slate-500 font-medium">We combine neural speed with human wisdom to deliver professional outcomes at non-linear velocity.</p>
          </div>
          {onViewDetails && (
            <button 
              onClick={onViewDetails}
              className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-gradient transition-all shadow-xl shadow-slate-900/10 group"
            >
              Sequence Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[2.5rem] left-0 w-full h-1 bg-slate-50 z-0">
             <div className="h-full bg-gradient-to-r from-brand-500 to-slate-400 w-full opacity-20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-[2rem] bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-brand-600 group-hover:text-brand-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-slate-200/50 mb-8 bg-white z-10">
                  {step.icon}
                </div>
                <div className="relative group-hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-[10px] font-black text-brand-500 mb-2 block tracking-widest uppercase">Protocol 0{idx + 1}</span>
                  <h4 className="text-lg font-black text-slate-950 mb-3 tracking-tight leading-tight">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium px-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 p-8 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-200">
                 <ShieldCheck size={24} />
              </div>
              <div>
                 <div className="text-sm font-black text-slate-950 uppercase tracking-tight">Quality Verified</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">30% Human QC Checkpoint on every stage</div>
              </div>
           </div>
           <div className="h-px w-full md:w-px md:h-12 bg-slate-200"></div>
           <div className="text-center md:text-right">
              <div className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">Global Standard</div>
              <div className="text-lg font-black text-slate-950 tracking-tighter uppercase">Marvetti Operational Standard</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
