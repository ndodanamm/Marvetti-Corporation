
import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, Briefcase, ArrowRight, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface ClientAuthProps {
  onAuthSuccess: (user: User) => void;
  onBack: () => void;
}

const ClientAuth: React.FC<ClientAuthProps> = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate auth logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Marvetti Partner',
      email: formData.email,
      businessName: formData.businessName || 'Global Enterprise',
      tier: 'Standard',
      createdAt: new Date().toISOString(),
      completedStages: []
    };

    localStorage.setItem('marvetti_user', JSON.stringify(mockUser));
    onAuthSuccess(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-32 pb-20">
      <div className="w-full max-w-5xl bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        
        {/* Visual Branding Side */}
        <div className="md:w-5/12 bg-slate-950 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,#4f46e5,transparent)]"></div>
          
          <div className="relative z-10">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors mb-12"
            >
              <ArrowLeft className="w-3 h-3" /> Exit to Site
            </button>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-6">
              Access the <br />
              <span className="text-indigo-500">Marvetti Nexus</span>
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed">
              Your centralized command center for digital project tracking, automated billing, and direct strategic consulting.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">POPIA Encrypted Hub</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Real-time Architecture</span>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-7/12 p-12 md:p-20 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <div className="inline-flex p-2 bg-slate-50 rounded-2xl mb-6">
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white shadow-lg text-slate-950' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white shadow-lg text-slate-950' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Register
              </button>
            </div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tighter uppercase mb-2">
              {isLogin ? 'Welcome Back' : 'Create Your Partner Profile'}
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              {isLogin ? 'Enter your credentials to access your project dashboard.' : 'Join the Marvetti ecosystem and start your digital journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    type="text" 
                    placeholder="Business Name"
                    className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm font-bold"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="email" 
                required
                placeholder="Work Email"
                className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm font-bold"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                type="password" 
                required
                placeholder="Secure Password"
                className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all text-sm font-bold"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-950/10 group mt-8"
            >
              {isLogin ? 'Access Portal' : 'Register Account'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {isLogin && (
            <button className="mt-8 text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest text-center block w-full">
              Forgot Your Nexus Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAuth;
