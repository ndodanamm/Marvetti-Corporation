
import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS, SERVICES_DATA } from '../constants';
import { ChevronLeft, ChevronRight, TrendingUp, Target, ArrowRight, Layers, Briefcase } from 'lucide-react';

const ProjectCarousel: React.FC = () => {
  // Updated filter to include 'Business Admin'
  const displayProjects = PROJECTS.filter(p => p.tag === 'Branding' || p.tag === 'E-Commerce' || p.tag === 'Business Admin');
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  };

  const project = displayProjects[currentIndex];

  if (displayProjects.length === 0) return null;

  // Derive the icon from the service data or fallback
  const projectService = SERVICES_DATA.find(s => s.id === project.serviceId);
  const PillarIcon = projectService ? projectService.icon : <Briefcase />;

  return (
    <section className="py-32 bg-slate-950 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Cross-Pillar Competency</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
              Operational <span className="text-indigo-500">Excellence</span> <br />Showcase
            </h3>
            <p className="text-slate-400 mt-6 font-medium">
              A deep reasoning view of how our administrative and technical frameworks deliver high-end branding and commerce results.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={prevSlide}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-indigo-600 transition-all shadow-xl"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-indigo-600 transition-all shadow-xl"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Project Details */}
            <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                      {React.isValidElement(PillarIcon) ? React.cloneElement(PillarIcon as React.ReactElement, { size: 16 }) : PillarIcon}
                   </div>
                   <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-black rounded-full uppercase tracking-widest">
                     {project.tag} Case Study
                   </span>
                </div>
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter">{project.title}</h4>
                <p className="text-lg text-slate-400 font-medium leading-relaxed italic border-l-2 border-indigo-500 pl-6">
                  "{project.description}"
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 py-10 border-y border-white/5">
                {project.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Target size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-200">Logic-First Implementation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Layers size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-200">Scale-Ready Architecture</span>
                </div>
              </div>
            </div>

            {/* Before/After Visuals */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {/* Visual A: Strategy/Draft */}
                <div className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group cursor-help">
                  <img 
                    src={project.marketingImage} 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                    alt="Phase Strategy" 
                  />
                  <div className="absolute inset-0 bg-slate-950/40"></div>
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-widest rounded-lg">
                      Draft Strategy
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <span className="text-6xl font-black text-white/5 uppercase tracking-widest rotate-12">MARVETTI_V1</span>
                  </div>
                </div>

                {/* Visual B: Result/Production */}
                <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(79,70,229,0.2)]">
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110" 
                    alt="Production Build" 
                  />
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-indigo-600 border border-white/20 text-[8px] font-black text-white uppercase tracking-widest rounded-lg">
                      Final Production
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/80 to-transparent">
                     <div className="flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-400" />
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Verified Outcome</span>
                     </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <span>0{currentIndex + 1}</span>
                <div className="w-32 h-px bg-white/5 relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500" 
                    style={{ width: `${((currentIndex + 1) / displayProjects.length) * 100}%` }}
                  ></div>
                </div>
                <span>0{displayProjects.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
