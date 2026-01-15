
import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, Briefcase, Sparkles } from 'lucide-react';

const LeadCapturePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Business Admin'
  });

  useEffect(() => {
    // Check if the user has already interacted with the lead capture in this session
    const hasInteracted = sessionStorage.getItem('marvetti_lead_captured');
    
    if (!hasInteracted) {
      // Set a 3-minute timer (180,000 milliseconds)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 180000); 

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Prevent showing it again in this browser session
    sessionStorage.setItem('marvetti_lead_captured', 'dismissed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Lead Captured:', formData);
    setIsSubmitted(true);
    sessionStorage.setItem('marvetti_lead_captured', 'submitted');
    
    // Close after a brief success message
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-500">
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-10 md:p-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> Exclusive Access
            </div>
            <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-4 leading-tight">
              Unlock Your <br />
              <span className="text-indigo-600">Digital Potential</span>
            </h3>
            <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">
              Drop your details below and a Marvetti Solution Architect will reach out with a personalized framework for your business.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="text" 
                  required
                  placeholder="Full Name"
                  className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-sm font-bold placeholder:text-slate-300"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="email" 
                  required
                  placeholder="Work Email"
                  className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-sm font-bold placeholder:text-slate-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <select 
                  className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-sm font-bold text-slate-900 appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option>Business Admin</option>
                  <option>Cloud Automation</option>
                  <option>Branding</option>
                  <option>E-Commerce</option>
                  <option>Data Analytics</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 mt-6"
              >
                Send Request <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-20 text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-slate-950 tracking-tighter mb-4">Transmission Sent</h3>
            <p className="text-slate-500 font-medium">
              We've received your data. A strategist will contact you shortly to begin your transformation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCapturePopup;
