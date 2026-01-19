
import React, { useEffect } from 'react';
import { Search, CreditCard, Box, Zap, Trophy, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Globe, Users } from 'lucide-react';

interface HowItWorksPageProps {
  onBack: () => void;
}

const STEPS = [
  { 
    icon: <Search className="w-8 h-8" />, 
    title: 'Choose Service', 
    desc: 'Select from our specialized digital pillars. We provide clear, transparent pricing and scope for every module.',
    details: ['Transparent Pricing', 'Modular Selection', 'Instant Onboarding']
  },
  { 
    icon: <CreditCard className="w-8 h-8" />, 
    title: 'Consult & Procure', 
    desc: 'Secure your solution via our encrypted payment gateway or book a discovery strategy call with a lead consultant.',
    details: ['Secure Payments', 'Expert Discovery', 'Statement of Work']
  },
  { 
    icon: <Box className="w-8 h-8" />, 
    title: 'Setup & Delivery', 
    desc: 'Swift implementation by our expert team. We build the environment, migrate the data, and configure the tools.',
    details: ['Rapid Deployment', 'Data Migration', 'System Configuration']
  },
  { 
    icon: <Zap className="w-8 h-8" />, 
    title: 'Optimization', 
    desc: 'Continuous reporting and performance tuning. We don\'t just set it up; we ensure it performs to peak standards.',
    details: ['Performance Audits', 'Automated Reporting', 'Fine-Tuning']
  },
  { 
    icon: <Trophy className="w-8 h-8" />, 
    title: 'Scale & Success', 
    desc: 'Measurable growth and operational excellence. You own the infrastructure; we provide the ongoing digital intelligence.',
    details: ['Strategic Scaling', 'Operational Freedom', 'ROI Tracking']
  }
];

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="animate-in fade-in duration-500 pb-32">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,27,35,0.15),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-brand-400 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
            THE MARVETTI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">FRAMEWORK</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            A frictionless, remote-first operational pipeline designed to digitize and scale your business without traditional overhead.
          </p>
        </div>
      </section>

      {/* Deep Dive Steps */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-40">
            {STEPS.map((step, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 relative">
                  <div className={`absolute -inset-10 bg-slate-50 rounded-full blur-3xl opacity-30`}></div>
                  <div className="relative p-16 rounded-[4rem] bg-slate-50 border border-slate-100 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-8xl font-black text-slate-200/50 -translate-y-4 translate-x-4 tracking-tighter">
                      0{idx + 1}
                    </div>
                    <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center text-slate-600 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      {step.icon}
                    </div>
                    <h2 className="text-4xl font-black text-slate-950 mb-6 tracking-tighter uppercase">{step.title}</h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">{step.desc}</p>
                    <div className="space-y-4">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-4 text-slate-700 font-bold">
                          <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                    Phase Protocol v4.0
                  </div>
                  <h3 className="text-3xl font-black text-slate-950 tracking-tighter">Strategic Implementation</h3>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    Our approach in Phase 0{idx + 1} focuses on total transparency. We believe that by providing a clear modular path, we empower our clients to own their digital evolution. No hidden retainers, no jargon—just pure operational execution.
                  </p>
                  <div className="pt-6 border-t border-slate-100 flex gap-12">
                     <div>
                       <div className="text-2xl font-black text-slate-950 tracking-tighter">100%</div>
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital</div>
                     </div>
                     <div>
                       <div className="text-2xl font-black text-slate-950 tracking-tighter">24/7</div>
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Promise */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
           <h2 className="text-xs font-black text-brand-400 uppercase tracking-[0.5em] mb-12">The Marvetti Standard</h2>
           <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <ShieldCheck className="w-10 h-10" />, title: 'Secure Ops', desc: 'Enterprise-grade encryption and POPIA compliance on all data handling.' },
                { icon: <Globe className="w-10 h-10" />, title: 'Global Skills', desc: 'Soft-skills training adapted for multi-regional corporate environments.' },
                { icon: <Users className="w-10 h-10" />, title: 'Remote First', desc: 'Built for the modern workforce, with 100% asynchronous capability.' }
              ].map((item, idx) => (
                <div key={idx} className="p-12 rounded-[3.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                   <div className="text-brand-400 mb-8 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                   <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase">{item.title}</h3>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-10 tracking-tighter leading-none uppercase">
            Ready to Build Your <br />
            <span className="text-brand-600">Digital Pillar?</span>
          </h2>
          <p className="text-slate-500 text-xl mb-16 max-w-2xl mx-auto font-medium">
            Join the Marvetti Framework today. Simple, fast, and results-driven digital business solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/27687240126"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-900/40 transition-all flex items-center justify-center gap-3 border border-white/5"
            >
              Start Consultation <ArrowRight className="w-5 h-5" />
            </a>
            <button 
              onClick={onBack}
              className="bg-slate-950 text-white hover:bg-slate-900 px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all"
            >
              Back to Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;