
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface FAQProps {
  onViewAll?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onViewAll }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Support Hub</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter mb-6">Common Queries</h3>
          <p className="text-slate-500 font-medium">Everything you need to know about the Marvetti Corp digital ecosystem.</p>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`rounded-[2.5rem] overflow-hidden transition-all duration-500 ${openIdx === idx ? 'bg-slate-50 border-2 border-slate-100 shadow-xl' : 'bg-white border border-slate-100 hover:border-slate-200'}`}>
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-8 text-left transition-colors"
              >
                <span className={`text-lg font-black tracking-tight ${openIdx === idx ? 'text-indigo-600' : 'text-slate-900'}`}>
                  {faq.question}
                </span>
                <div className={`p-3 rounded-2xl transition-all duration-500 ${openIdx === idx ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                  {openIdx === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {openIdx === idx && (
                <div className="px-8 pb-10 text-slate-500 leading-relaxed font-medium animate-in slide-in-from-top-4 duration-500">
                  <div className="max-w-2xl border-t border-slate-200 pt-6">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onViewAll}
            className="group inline-flex items-center gap-3 text-indigo-600 font-black uppercase text-xs tracking-[0.2em] hover:text-slate-950 transition-colors"
          >
            Explore Detailed Knowledge Base <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
