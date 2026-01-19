
import React from 'react';
import { SERVICES_DATA } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CommercialPillarsProps {
  onSelectPillar: (id: string) => void;
}

const CommercialPillars: React.FC<CommercialPillarsProps> = ({ onSelectPillar }) => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-xs font-black text-brand-600 uppercase tracking-[0.5em] mb-4">Enterprise Verticals</h2>
            <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-none">
              Strategic <br />
              <span className="text-brand-500">Commercial Pilllars</span>
            </h3>
            <p className="text-xl text-slate-500 mt-10 font-medium leading-relaxed">
              Marvetti Corporation operates across three core business verticals, providing end-to-end support for the modern enterprise.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 rounded-full border-4 border-slate-50 flex items-center justify-center animate-spin-slow">
               <Sparkles className="w-8 h-8 text-brand-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((pillar) => (
            <div 
              key={pillar.id}
              onClick={() => onSelectPillar(pillar.id === '3' ? 'stage-12' : pillar.id)}
              className="group relative bg-slate-50 rounded-[4rem] p-12 border border-slate-100 hover:bg-slate-950 transition-all duration-700 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl h-[550px] flex flex-col"
            >
              {/* Background Accent */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] group-hover:bg-brand-500/20 transition-all duration-700"></div>
              
              <div className={`w-20 h-20 rounded-3xl ${pillar.id === '3' ? 'bg-slate-900 text-brand-500' : 'bg-brand-500 text-white'} flex items-center justify-center mb-10 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {pillar.icon}
              </div>

              <h4 className="text-3xl font-black text-slate-950 group-hover:text-white transition-colors uppercase tracking-tighter leading-none mb-6">
                {pillar.title}
              </h4>
              
              <p className="text-slate-500 group-hover:text-slate-400 transition-colors font-medium text-lg leading-relaxed mb-10">
                {pillar.shortDescription}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-10">
                  {pillar.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="px-4 py-1.5 bg-white group-hover:bg-white/5 border border-slate-200 group-hover:border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>
                
                <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-slate-950 group-hover:text-brand-500 transition-colors">
                  Initialize Vertical <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommercialPillars;
