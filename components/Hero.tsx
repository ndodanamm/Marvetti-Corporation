
import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Share2, Database, Layout, Cloud, ShieldCheck, ShieldAlert, Zap, Users, Cpu, CheckCircle } from 'lucide-react';

interface HeroProps {
  onNavigate?: (view: string) => void;
}

const Counter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 overflow-hidden bg-slate-950">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M -10 20 C 20 40, 50 10, 110 30" stroke="#EC1B23" strokeWidth="0.1" fill="none" className="animate-pulse" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-400 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
                Marvetti Corporation // Digital Ecosystem
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600">
                Made Easy
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              A linear, 12-stage ordering system powered by 70% AI automation and 30% human quality control. Start at any stage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-gradient hover:opacity-90 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-brand-900/40 flex items-center justify-center gap-3 group"
              >
                Select a Service <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="https://wa.me/27687240126" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-900 text-white border border-white/5 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" /> Chat to Consultant
              </a>
            </div>

            {/* Infographic Layer */}
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-brand-500/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-6 h-6 text-brand-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">70% AI Automation</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-brand-500 w-[70%]"></div>
                </div>
                <p className="text-[9px] text-slate-500 mt-3 uppercase font-bold tracking-tighter">Speeds up generation & drafting</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 group hover:border-brand-500/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">30% Human Quality</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-slate-400 w-[30%]"></div>
                </div>
                <p className="text-[9px] text-slate-500 mt-3 uppercase font-bold tracking-tighter">Ensures accuracy & compliance</p>
              </div>
            </div>
          </div>

          {/* Animated Counters and Visual */}
          <div className="hidden lg:block relative">
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden h-[600px] flex flex-col justify-between">
               <div className="space-y-8">
                  <div className="text-xs font-black text-brand-500 uppercase tracking-[0.4em]">Live Nexus Data</div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-4xl font-black text-white mb-2"><Counter end={1250} suffix="+" /></div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Companies Registered</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-2"><Counter end={3400} suffix="+" /></div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-white mb-2"><Counter end={15} suffix="k+" /></div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Outputs Generated</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-brand-500 mb-2"><Counter end={99} suffix="%" /></div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compliance Success</div>
                    </div>
                  </div>
               </div>

               <div className="p-8 rounded-[2.5rem] bg-brand-500/10 border border-brand-500/20">
                  <div className="flex items-center gap-4 text-white">
                     <ShieldCheck className="w-10 h-10 text-brand-500" />
                     <div>
                        <div className="text-xl font-black uppercase tracking-tighter">Marvetti Secure™</div>
                        <p className="text-xs text-slate-400 font-medium">All project data is POPIA encrypted and mirrored across redundant global nodes.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
