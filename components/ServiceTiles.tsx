
import React from 'react';
import { STAGES_DATA } from '../constants';
import { ChevronRight, Zap, ArrowRight } from 'lucide-react';

interface ServiceTilesProps {
  onSelectService: (id: string) => void;
}

const ServiceTiles: React.FC<ServiceTilesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-brand-600 uppercase tracking-[0.4em] mb-4">Master Sequence</h2>
            <h3 className="text-5xl font-black text-slate-950 tracking-tighter uppercase">The 12-Stage Matrix</h3>
            <p className="text-lg text-slate-500 mt-6 font-medium">
              Start at any point in the lifecycle. Modular business architecture designed for maximum velocity.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
             <div className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Zap size={12} className="text-brand-500" /> System Active
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pr-4">Node: RSA-CORE-01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {STAGES_DATA.map((stage) => (
            <div 
              key={stage.id}
              className="group relative bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer"
              onClick={() => onSelectService(stage.id)}
            >
              <div className="absolute top-0 right-0 p-8 text-6xl font-black text-slate-50 group-hover:text-brand-50 transition-colors pointer-events-none">
                {stage.stageNumber}
              </div>

              <div className={`w-14 h-14 rounded-2xl ${stage.color} text-white flex items-center justify-center mb-8 shadow-xl transform group-hover:scale-110 transition-all duration-500 z-10`}>
                {stage.icon}
              </div>
              
              <h4 className="text-xl font-black text-slate-950 mb-4 tracking-tight leading-tight group-hover:text-brand-600 transition-colors uppercase">
                {stage.title}
              </h4>
              <p className="text-slate-400 text-sm mb-10 flex-grow font-medium leading-relaxed">
                {stage.shortDescription}
              </p>

              <div className="mt-auto pt-8 border-t border-slate-50 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Entry Price</span>
                  <span className="font-inter text-xl font-black text-slate-950 tracking-tighter">{stage.priceDisplay}</span>
                </div>
                <button 
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-brand-gradient transition-all group/btn shadow-xl shadow-slate-900/10"
                >
                  Start Stage {stage.stageNumber} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTiles;
