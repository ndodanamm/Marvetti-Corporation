
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.5em] mb-4">Client Success Stories</h2>
          <h3 className="text-4xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-none">
            TRUSTED BY <br />
            <span className="text-indigo-600">INDUSTRY LEADERS</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className={`group flex flex-col p-10 bg-slate-50 rounded-[3rem] border-b-8 ${t.color} hover:-translate-y-4 hover:shadow-2xl transition-all duration-700 h-full`}
            >
              <div className="mb-10 flex items-center justify-between">
                <Quote className="w-8 h-8 text-slate-200 group-hover:text-indigo-200 transition-colors" />
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[10px] font-black uppercase tracking-tighter text-center px-1 shadow-lg"
                  style={{ backgroundColor: t.brandColor }}
                >
                  {t.client.split(' ')[0]}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-10 flex-grow">
                "{t.quote}"
              </p>

              <div className="pt-8 border-t border-slate-200/50">
                <h4 className="text-sm font-black text-slate-950 tracking-tight uppercase">{t.client}</h4>
                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1 block">
                  {t.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Logo Grid Scroll */}
        <div className="mt-40 pt-20 border-t border-slate-100">
           <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
             {TESTIMONIALS.map((t) => (
               <div key={`logo-${t.id}`} className="flex flex-col items-center gap-2">
                 <div className="text-xl font-black text-slate-950 tracking-tighter uppercase whitespace-nowrap">
                   {t.client}
                 </div>
                 <div className="w-12 h-0.5 rounded-full" style={{ backgroundColor: t.brandColor }}></div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;