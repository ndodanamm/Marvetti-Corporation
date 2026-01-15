
import React from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface PortfolioProps {
  onViewAll?: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onViewAll }) => {
  // Only show the first 3 on the landing page
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <section id="portfolio" className="py-32 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-xl">
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Case Studies</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Proven Results</h3>
            <p className="text-slate-400 mt-6 font-medium">Showcase of our elite project pipeline: From digital identities to AI-driven industrial logistics.</p>
          </div>
          <button 
            onClick={onViewAll}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all backdrop-blur-md group"
          >
            Explore All Results <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group relative bg-white/5 rounded-[3.5rem] overflow-hidden border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-700">
              <div className="h-80 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-2xl">{project.tag}</span>
                </div>
              </div>
              <div className="p-12">
                <span className="text-xs font-black text-indigo-400 block mb-3 uppercase tracking-widest">{project.client}</span>
                <h4 className="text-2xl font-black text-white mb-6 tracking-tight uppercase">{project.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-10 font-medium">{project.description}</p>
                <div 
                  onClick={onViewAll}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Explore Case Study <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
