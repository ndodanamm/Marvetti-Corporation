
import React from 'react';
import { STANDALONE_SERVICES } from '../constants';
import { Clock, ArrowUpRight, Sparkles } from 'lucide-react';

interface StandaloneUpsellsProps {
  onOrder: (serviceId: string) => void;
}

const StandaloneUpsells: React.FC<StandaloneUpsellsProps> = ({ onOrder }) => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" /> Rapid Delivery
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">
              Standalone <span className="text-indigo-600">Express</span> Services
            </h2>
            <p className="text-lg text-slate-500 mt-6 font-medium">
              High-velocity modules designed for immediate business impact. No long-term contracts, just results.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Delivery</div>
              <div className="text-xl font-black text-slate-950 tracking-tighter">24-48 Hours</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STANDALONE_SERVICES.map((item) => (
            <div 
              key={item.id}
              className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {item.icon}
                </div>
                <div className="font-inter text-lg font-black text-slate-950 tracking-tighter">
                  {item.price}
                </div>
              </div>
              
              <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.deliveryTime}</span>
                </div>
                <button 
                  onClick={() => onOrder('3')} // Default to branding pillar or map specific ID if needed
                  className="p-3 rounded-xl bg-white border border-slate-200 text-slate-900 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandaloneUpsells;
