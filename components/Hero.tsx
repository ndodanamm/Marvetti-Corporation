
import React from 'react';
import { ArrowRight, MessageCircle, Share2, Database, Layout, Cloud, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Dynamic Workflow Background Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M -10 20 C 20 40, 50 10, 110 30" stroke="rgba(79, 70, 229, 0.4)" strokeWidth="0.2" fill="none" className="animate-pulse" />
          <path d="M -10 80 C 40 60, 70 90, 110 70" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              Marvetti Corp // Digital First
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">
                Business Digitally
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              Choose any service, pay per solution, and start seeing results immediately — fully digital and soft-skills-driven solutions at Marvetti Corp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a 
                href="https://wa.me/27687240126" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-3 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Chat to Consultant
              </a>
              <a 
                href="#services" 
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all backdrop-blur-xl group"
              >
                View Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-8 flex flex-wrap gap-8 opacity-60">
               {[
                 { icon: <Layout size={16} />, label: 'Branding' },
                 { icon: <Cloud size={16} />, label: 'Cloud' },
                 { icon: <Database size={16} />, label: 'Data' },
                 { icon: <ShieldCheck size={16} />, label: 'Support' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-lg bg-white/10">{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-10 bg-indigo-500/10 blur-[120px] rounded-full"></div>
            <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-16 shadow-2xl overflow-hidden group border-b-4 border-b-indigo-500/20">
               
               {/* Workflow Visualization */}
               <div className="space-y-16 relative">
                  <div className="flex items-center gap-12">
                     <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-xl shadow-indigo-900/20">
                        <Layout className="text-indigo-400 w-8 h-8" />
                     </div>
                     <div className="h-0.5 w-32 bg-gradient-to-r from-indigo-500/50 to-emerald-500/50 relative">
                        <div className="absolute top-1/2 left-0 w-2 h-2 bg-indigo-400 rounded-full -translate-y-1/2 animate-flow-right"></div>
                     </div>
                     <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-xl shadow-emerald-900/20 delay-100">
                        <Database className="text-emerald-400 w-8 h-8" />
                     </div>
                  </div>

                  <div className="flex items-center gap-12 ml-24">
                     <div className="w-20 h-20 rounded-3xl bg-slate-800 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-700 delay-200">
                        <Share2 className="text-slate-400 w-8 h-8" />
                     </div>
                     <div className="h-0.5 w-24 bg-gradient-to-r from-slate-700 to-white/0"></div>
                     <div className="text-white font-black text-3xl tracking-tighter opacity-20 uppercase">MARVETTI_SUCCESS</div>
                  </div>
               </div>

               <div className="absolute bottom-0 right-0 p-8">
                  <div className="text-[10px] font-mono text-indigo-400/40 uppercase tracking-widest">
                    marvetticorp.com Protocol v2.5
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flow-right {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-flow-right {
          animation: flow-right 3s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Hero;
