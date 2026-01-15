
import React from 'react';
import { Project } from '../types';
// Fixed: Added ShieldCheck to the imports from lucide-react to fix the error on line 123
import { Layout, Megaphone, TrendingUp, Target, ExternalLink, Box, ShieldCheck } from 'lucide-react';

interface ServicePortfolioProps {
  project: Project;
}

const ServicePortfolio: React.FC<ServicePortfolioProps> = ({ project }) => {
  return (
    <section className="py-32 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-4">Portfolio Pillar</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            Deep Dive: <span className="text-indigo-500">{project.title}</span>
          </h3>
          <p className="text-slate-400 text-lg mt-8 max-w-2xl mx-auto font-medium">
            Discover how the Marvetti framework was applied to {project.client}'s unique business challenge.
          </p>
        </div>

        {/* Hero Spotlight */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
           <div className="relative group">
              <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-[4rem] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
              <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 aspect-[4/3]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-10 left-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block">Client Partner</span>
                    <div className="text-2xl font-black text-white tracking-tight">{project.client}</div>
                 </div>
              </div>
           </div>
           
           <div className="space-y-12">
              <div className="space-y-6">
                 <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">The Challenge</h4>
                 <p className="text-xl text-slate-300 font-medium leading-relaxed">{project.fullChallenge}</p>
              </div>
              <div className="space-y-6">
                 <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em]">The Solution</h4>
                 <p className="text-lg text-slate-400 leading-relaxed font-medium">{project.fullSolution}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
                 {project.stats.map((stat, idx) => (
                    <div key={idx}>
                       <div className="text-3xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                       <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Asset Visualizers */}
        <div className="grid md:grid-cols-2 gap-12">
           {/* Website Template View */}
           <div className="group bg-white/5 border border-white/5 rounded-[4rem] p-12 hover:bg-white/10 transition-all duration-500">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                       <Layout className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-white uppercase tracking-widest">Interface Mockup</h5>
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Web Template v1.2</span>
                    </div>
                 </div>
                 <button className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                 </button>
              </div>
              
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80">
                 <img src={project.templateImage} alt="Template Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-8 py-3 rounded-full bg-white text-slate-950 font-black text-[10px] uppercase tracking-widest">Preview Design</span>
                 </div>
              </div>
           </div>

           {/* Marketing Material View */}
           <div className="group bg-white/5 border border-white/5 rounded-[4rem] p-12 hover:bg-white/10 transition-all duration-500">
              <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                       <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-white uppercase tracking-widest">Marketing Kit</h5>
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Ad Material x 12</span>
                    </div>
                 </div>
                 <button className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors">
                    <Box className="w-4 h-4" />
                 </button>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80">
                 <img src={project.marketingImage} alt="Marketing Assets" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-8 py-3 rounded-full bg-white text-slate-950 font-black text-[10px] uppercase tracking-widest">View Materials</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Strategy Bar */}
        <div className="mt-32 p-10 rounded-[3rem] bg-gradient-to-r from-indigo-900/40 to-slate-900/40 border border-white/5 flex flex-wrap justify-center gap-16 md:gap-24 opacity-60">
           <div className="flex items-center gap-4">
              <TrendingUp className="text-indigo-400 w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Performance Focused</span>
           </div>
           <div className="flex items-center gap-4">
              <Target className="text-emerald-400 w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Conversion Driven</span>
           </div>
           <div className="flex items-center gap-4">
              <ShieldCheck className="text-blue-400 w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Secure Architecture</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePortfolio;
