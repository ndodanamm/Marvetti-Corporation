
import React, { useEffect } from 'react';
import { ServiceItem } from '../types';
import { Check, ArrowRight, MessageCircle, ArrowLeft, Clock, Sparkles, Zap } from 'lucide-react';
import { STANDALONE_SERVICES, PROJECTS } from '../constants';
import ServicePortfolio from './ServicePortfolio';
import ProjectCarousel from './ProjectCarousel';

interface ServicePageProps {
  service: ServiceItem;
  onBack: () => void;
  onOrder: () => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ service, onBack, onOrder }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [service]);

  const upsells = [...STANDALONE_SERVICES].sort(() => 0.5 - Math.random()).slice(0, 3);
  const serviceProject = PROJECTS.find(p => p.serviceId === service.id);

  return (
    <div className="animate-in fade-in duration-500 pb-32">
      {/* Service Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${service.color} opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2`}></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <div className="max-w-4xl">
            <div className={`w-24 h-24 rounded-3xl ${service.color} text-white flex items-center justify-center mb-10 shadow-2xl`}>
              {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-20">
              <div>
                <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">Service Overview</h2>
                <div className="prose prose-slate prose-xl font-medium text-slate-600 max-w-none leading-relaxed">
                  Establishing a cohesive digital identity that resonates with your target audience across all touchpoints. Our Marvetti Framework ensures that every solution is optimized for the digital-first economy.
                </div>
              </div>

              <div>
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-8">Soft-Skills & Strategy Layer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    'Professional Remote Etiquette',
                    'Global Compliance Ready',
                    'Emotional Intelligence Focused',
                    'Direct & Transparent Communication',
                    'Strategic Implementation',
                    'Result-Driven Reporting'
                  ].map(skill => (
                    <div key={skill} className="flex items-center gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-900 font-bold text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-12">
              <div className="p-10 rounded-[3rem] bg-slate-950 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-10">Pillar Stack</h3>
                <div className="flex flex-wrap gap-3 mb-12">
                   {service.tools.map(tool => (
                      <span key={tool} className="px-4 py-2 bg-white/5 border border-white/10 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">{tool}</span>
                   ))}
                </div>
                <button 
                  onClick={onOrder}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-900/20 transition-all mb-4"
                >
                  <Zap className="w-4 h-4" /> Configure Order
                </button>
                <a 
                  href="https://wa.me/27687240126"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Start Consultation
                </a>
              </div>

              <div className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest mb-6">Delivery Promise</h3>
                <ul className="space-y-4">
                  <li className="text-sm font-medium text-slate-500 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> 100% Digital Workflow
                  </li>
                  <li className="text-sm font-medium text-slate-500 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Real-time Progress Tracking
                  </li>
                  <li className="text-sm font-medium text-slate-500 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Post-Delivery Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Portfolio Carousel for Business Admin */}
      {service.id === '1' && (
        <ProjectCarousel />
      )}

      {/* Standard Portfolio Showcase Pillar */}
      {serviceProject && service.id !== '1' && (
        <ServicePortfolio project={serviceProject} />
      )}

      {/* Pricing Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Investment Tiers</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">Choose Your Package</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {service.packages.map((pkg, idx) => (
                <div key={idx} className={`p-12 rounded-[3.5rem] bg-white border transition-all duration-500 flex flex-col ${idx === 1 ? 'border-indigo-600 shadow-2xl scale-105 z-10' : 'border-slate-200 hover:border-indigo-200 shadow-lg'}`}>
                   {idx === 1 && (
                     <span className="bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mb-8 shadow-lg">Most Popular Choice</span>
                   )}
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{pkg.name}</span>
                   <div className="font-inter text-5xl font-black text-slate-950 mb-8 tracking-tighter">{pkg.price}</div>
                   <p className="text-sm text-slate-500 leading-relaxed mb-12 flex-grow font-medium">{pkg.description}</p>
                   <button 
                      onClick={onOrder}
                      className="w-full py-6 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 group/btn"
                   >
                      Order Package <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                   </button>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest mb-4">
                 <Sparkles className="w-3 h-3" /> Enhance Your Project
               </div>
               <h3 className="text-3xl font-black text-slate-950 tracking-tighter">Recommended Add-ons</h3>
            </div>
            <p className="text-slate-400 text-sm max-w-sm font-medium text-center md:text-right">
              Stack these high-velocity services with your current selection for a complete business transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upsells.map((upsell) => (
              <div key={upsell.id} className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-100 transition-all duration-500 hover:shadow-xl">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                      {upsell.icon}
                    </div>
                    <div className="font-inter font-black text-slate-950 tracking-tighter">{upsell.price}</div>
                 </div>
                 <h4 className="text-md font-black text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">{upsell.title}</h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{upsell.description}</p>
                 <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
                       <Clock className="w-3 h-3" /> {upsell.deliveryTime}
                    </div>
                    <button 
                      onClick={() => onOrder()} 
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700"
                    >
                      Add to Plan +
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
