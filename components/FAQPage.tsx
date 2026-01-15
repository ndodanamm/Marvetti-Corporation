
import React, { useState, useEffect } from 'react';
import { FAQ_CATEGORIES } from '../constants';
import { Plus, Minus, Search, ArrowLeft, MessageSquare, HelpCircle } from 'lucide-react';

interface FAQPageProps {
  onBack: () => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = FAQ_CATEGORIES.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="animate-in fade-in duration-500 pb-32 min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(79,70,229,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to home
          </button>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
            SUPPORT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">HUB</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
            Detailed answers to help you navigate the Marvetti digital ecosystem with total clarity.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
             <input 
              type="text"
              placeholder="Search protocols, pricing, delivery..."
              className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 rounded-[2.5rem] text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold tracking-tight text-lg backdrop-blur-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          {filteredCategories.length > 0 ? (
            <div className="space-y-24">
              {filteredCategories.map((category) => (
                <div key={category.title}>
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-px flex-grow bg-slate-200"></div>
                     <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] px-4 whitespace-nowrap">{category.title}</h2>
                     <div className="h-px flex-grow bg-slate-200"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {category.items.map((item, idx) => {
                      const isOpen = openItems[`${category.title}-${idx}`];
                      return (
                        <div 
                          key={idx} 
                          className={`group rounded-[2.5rem] border transition-all duration-500 ${
                            isOpen 
                              ? 'bg-white border-indigo-100 shadow-2xl scale-[1.02]' 
                              : 'bg-white/40 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <button 
                            onClick={() => toggleItem(category.title, idx)}
                            className="w-full flex items-center justify-between p-8 text-left"
                          >
                            <span className={`text-xl font-black tracking-tight ${isOpen ? 'text-indigo-600' : 'text-slate-900'}`}>
                              {item.question}
                            </span>
                            <div className={`p-3 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div className="px-8 pb-10 animate-in slide-in-from-top-4 duration-500">
                              <div className="border-t border-slate-50 pt-8 text-slate-500 font-medium leading-relaxed text-lg max-w-3xl">
                                {item.answer}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center">
               <HelpCircle className="w-20 h-20 text-slate-200 mx-auto mb-8" />
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">No matching queries found</h3>
               <p className="text-slate-500 font-medium mb-12">Try different keywords or contact a strategist directly.</p>
               <button onClick={() => setSearchTerm('')} className="px-10 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">Clear Search</button>
            </div>
          )}
        </div>
      </section>

      {/* Still need help? CTA */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
             <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6 uppercase">Still Need <br /><span className="text-indigo-500">More Intelligence?</span></h3>
             <p className="text-slate-400 font-medium text-lg max-w-md">Our consultants are available for complex inquiries and custom framework architectural design.</p>
          </div>
          
          <div className="relative z-10">
             <a 
              href="https://wa.me/27687240126"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white transition-all shadow-2xl"
             >
               <MessageSquare className="w-5 h-5" /> Chat to Strategist
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;