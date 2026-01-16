
import React, { useState } from 'react';
import { ShieldAlert, Lock, Mail, ArrowRight, ArrowLeft, Terminal } from 'lucide-react';
import { StaffUser } from '../types';

interface StaffAuthProps {
  onAuthSuccess: (user: StaffUser) => void;
  onBack: () => void;
}

const StaffAuth: React.FC<StaffAuthProps> = ({ onAuthSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Internal Staff check (Simulated)
    if (email.endsWith('@marvetti.co.za') && password === 'staff2025') {
      const mockStaff: StaffUser = {
        id: 'STAFF_001',
        name: email.split('@')[0].toUpperCase(),
        role: 'Strategist',
        email: email,
        accessLevel: 5
      };
      localStorage.setItem('marvetti_staff', JSON.stringify(mockStaff));
      onAuthSuccess(mockStaff);
    } else {
      setError('Invalid credentials or unauthorized domain.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-[3rem] border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-10 border-b border-slate-700 bg-slate-900/50 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-widest text-center">Staff Central</h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">Administrative Ops Only</p>
        </div>

        <div className="p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="email" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  placeholder="name@marvetti.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Auth Token / Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  type="password" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                <Terminal size={14} /> {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
            >
              Initialize Session <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <button 
            onClick={onBack}
            className="w-full mt-6 text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Return to Public Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffAuth;
