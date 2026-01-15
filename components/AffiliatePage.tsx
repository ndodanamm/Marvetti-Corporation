
import React, { useEffect } from 'react';
import { Handshake, TrendingUp, Users, DollarSign, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

interface AffiliatePageProps {
  onBack: () => void;
}

const PARTNER_BENEFITS = [
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: '10% Referral Commission',
    desc: 'Earn a flat 10% on the total project value for every client you refer that signs a Marvetti Service Agreement.'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Recurring Revenue',
    desc: 'Receive ongoing commissions for recurring service modules and optimization audits attached to your referred clients.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Partner Portal Access',
    desc: 'Get a dedicated channel for lead tracking, marketing materials, and real-time status updates on your referrals.'
  }
];

const AffiliatePage: React.FC<AffiliatePageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="animate-in fade-in duration-500 pb-32 bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-indigo-400 font-black uppercase text-[10px] tracking-[0.3em] mb-12 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
            GROW WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">MARVETTI</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
            Our Affiliate & Partnership Program is designed for consultants, agencies, and networkers who want to monetize their connections with premium digital solutions.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {PARTNER_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-4">Strategic Paths</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Partner Categories</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Users className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">Referral Partner</h4>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Ideal for Networkers</span>
                </div>
              </div>
              <p className="text-slate-400 mb-10 font-medium leading-relaxed">Simply introduce qualified leads to the Marvetti ecosystem. We handle the discovery, sales, implementation, and support. You receive your commission upon client payment.</p>
              <ul className="space-y-4 mb-12">
                {['No technical knowledge required', 'Passive earning potential', 'Direct WhatsApp support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-12 rounded-[4rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Handshake className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">Strategic Alliance</h4>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Ideal for Agencies</span>
                </div>
              </div>
              <p className="text-slate-400 mb-10 font-medium leading-relaxed">Integrated partnerships where Marvetti acts as your outsourced technical or administrative pillar. We white-label or co-brand services to add value to your existing clients.</p>
              <ul className="space-y-4 mb-12">
                {['Preferred partner pricing', 'Co-branded marketing kits', 'Priority project delivery'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Fast-Track Onboarding</h2>
            <h3 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">How to Begin</h3>
          </div>

          <div className="space-y-12">
            {[
              { title: 'Expression of Interest', desc: 'Click the "Apply Now" button below to message our partnership coordinator on WhatsApp.' },
              { title: 'Briefing Call', desc: 'We\'ll schedule a 15-minute call to align on your network and provide you with our partner protocol.' },
              { title: 'Asset Access', desc: 'Receive your custom referral kit, including brochures, corporate profiles, and tracking links.' },
              { title: 'Submit & Earn', desc: 'Begin submitting leads. Commissions are paid out 48 hours after the client settles their first invoice.' }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm relative z-10">
                    {idx + 1}
                  </div>
                  {idx < 3 && <div className="w-px h-full bg-slate-100 group-hover:bg-indigo-600 transition-colors"></div>}
                </div>
                <div className="pb-12">
                  <h4 className="text-xl font-black text-slate-950 uppercase mb-3 tracking-tight">{step.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="bg-emerald-600 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
             <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6 uppercase">Ready to <br />Partner with Us?</h3>
             <p className="text-emerald-50 font-medium text-lg max-w-md">Join our elite network of professional partners and start generating value from your connections today.</p>
          </div>
          
          <div className="relative z-10">
             <a 
              href="https://wa.me/27687240126"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-6 bg-slate-950 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-slate-950 transition-all shadow-2xl"
             >
               <MessageSquare className="w-5 h-5" /> Apply Now (WhatsApp)
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffiliatePage;
