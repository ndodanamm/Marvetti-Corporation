
import React from 'react';
import { SERVICES_DATA } from '../constants';
import { ChevronRight, Zap } from 'lucide-react';

interface ServiceTilesProps {
  onSelectService: (id: string) => void;
}

const ServiceTiles: React.FC<ServiceTilesProps> = ({ onSelectService }) => {
  // Explicitly sort ID 8 (Customer Service) to the start
  const sortedServices = [...SERVICES_DATA].sort((a, b) => {
    if (a.id === '8') return -1;
    if (b.id === '8') return 1;
    return 0;
  });

  return (
    <section id="services" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">The Marvetti Pillars</h2>
            <h3 className="text-5xl font-black text-slate-950 tracking-tighter">Core Service Matrix</h3>
            <p className="text-lg text-slate-500 mt-6 font-medium">
              Elite digital transformation modules. High-performance, pay-per-solution excellence for the modern enterprise.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
             <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Zap size={12} /> Live Ops: 100%
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pr-4">Global Node: JHB-01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {sortedServices.map((service) => (
            <div 
              key={service.id}
              className={`group relative bg-white border ${service.id === '8' ? 'border-indigo-200 ring-2 ring-indigo-500/10' : 'border-slate-100'} rounded-[3rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 flex flex-col h-full overflow-hidden cursor-pointer`}
              onClick={() => onSelectService(service.id)}
            >
              {/* Tile Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:opacity-10 transition-opacity`}></div>
              
              {service.id === '8' && (
                <div className="absolute top-8 right-8">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-[8px] font-black rounded-full uppercase tracking-widest animate-pulse">Primary Pillar</span>
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl ${service.color} text-white flex items-center justify-center mb-10 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {service.icon}
              </div>
              
              <h4 className="text-xl font-black text-slate-950 mb-4 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                {service.title}
              </h4>
              <p className="text-slate-400 text-sm mb-10 flex-grow font-medium leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="mt-auto pt-8 border-t border-slate-50 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Pricing Layer</span>
                  <span className="font-inter text-xl font-black text-slate-950 tracking-tighter">{service.startingPrice}</span>
                </div>
                <button 
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-600 transition-all group/btn shadow-xl shadow-slate-900/10"
                >
                  Enter Pillar <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
