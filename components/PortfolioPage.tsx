
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Filter, TrendingUp, Target, Shield } from 'lucide-react';

interface PortfolioPageProps {
  onBack: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.tag)))];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tag === filter);

  return (
    <div className="animate-in fade-in duration-500 pb-32">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(79,70,229,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
            PROVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">RESULTS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl">
            A deep dive into how Marvetti Corp has transformed operations across diverse industries. From automotive hubs to social foundations.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-[80] bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 mr-6 text-slate-400">
               <Filter className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Filter By Pillar:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-slate-950 text-white shadow-xl shadow-slate-900/20' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group flex flex-col bg-slate-50 rounded-[3.5rem] overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
              >
                <div className="h-72 relative overflow-hidden">
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                   <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black rounded-xl uppercase tracking-widest">{project.tag}</span>
                   </div>
                   <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-4 bg-white text-slate-950 rounded-2xl shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                         <ExternalLink className="w-6 h-6" />
                      </button>
                   </div>
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-3">{project.client}</div>
                  <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-4 uppercase">{project.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 flex-grow">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/50">
                    {project.stats.map((stat, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-lg font-black text-slate-950 tracking-tighter mb-1">{stat.value}</div>
                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-40 text-center">
               <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">No matching results in this pillar</h3>
               <button onClick={() => setFilter('All')} className="mt-8 text-indigo-600 font-black uppercase text-xs tracking-widest underline underline-offset-4">View All Projects</button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-32 bg-slate-950 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center gap-12 mb-20 opacity-30 grayscale">
               <TrendingUp className="w-12 h-12 text-white" />
               <Target className="w-12 h-12 text-white" />
               <Shield className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight max-w-4xl mx-auto">
              "WE DON'T JUST DELIVER PROJECTS; WE ENGINEER SUCCESS PATHS FOR ORGANIZATIONS THAT REFUSE TO BE LEFT BEHIND."
            </h2>
            <div className="mt-12 text-xs font-black text-indigo-400 uppercase tracking-[0.5em]">Marvetti Operational Standard</div>
         </div>
      </section>
    </div>
  );
};

export default PortfolioPage;