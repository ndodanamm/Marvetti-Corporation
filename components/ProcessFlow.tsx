import React from 'react';
import { Search, CreditCard, Box, Zap, Trophy, ArrowRight } from 'lucide-react';

interface ProcessFlowProps {
  onViewDetails?: () => void;
}

const STEPS = [
  { icon: <Search className="w-6 h-6" />, title: 'Choose Service', desc: 'Select from our specialized digital pillars.' },
  { icon: <CreditCard className="w-6 h-6" />, title: 'Purchase/Consult', desc: 'Secure payment or discovery strategy call.' },
  { icon: <Box className="w-6 h-6" />, title: 'Setup/Delivery', desc: 'Swift implementation by our expert team.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Optimization', desc: 'Continuous reporting and performance tuning.' },
  { icon: <Trophy className="w-6 h-6" />, title: 'Success', desc: 'Measurable growth and operational excellence.' }
];

const ProcessFlow: React.FC<ProcessFlowProps> = ({ onViewDetails }) => {
  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Snap-On Visual Flow</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter mb-6">How It Works</h3>
            <p className="text-slate-500 font-medium">Our simple 5-step process delivers measurable results without the overhead of traditional consultancy.</p>
          </div>
          {onViewDetails && (
            <button 
              onClick={onViewDetails}
              className="flex items-center gap-3 px-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 group"
            >
              View Methodology <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[2.5rem] left-0 w-full h-1 bg-slate-50 z-0">
             <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 w-3/4 opacity-20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-[2rem] bg-white border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-indigo-600 group-hover:text-indigo-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-slate-200/50 mb-8 bg-white z-10">
                  {step.icon}
                </div>
                <div className="relative group-hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-[10px] font-black text-indigo-500 mb-2 block tracking-widest uppercase">Phase 0{idx + 1}</span>
                  <h4 className="text-lg font-black text-slate-950 mb-3 tracking-tight leading-tight">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium px-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-slate-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>
    </section>
  );
};

export default ProcessFlow;