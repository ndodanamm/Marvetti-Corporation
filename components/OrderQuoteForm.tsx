
import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../constants';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';

interface OrderQuoteFormProps {
  onBack: () => void;
  initialServiceId?: string | null;
}

type Step = 'pillar' | 'package' | 'details' | 'summary';

const OrderQuoteForm: React.FC<OrderQuoteFormProps> = ({ onBack, initialServiceId }) => {
  const [step, setStep] = useState<Step>(initialServiceId ? 'package' : 'pillar');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(initialServiceId || null);
  const [selectedPackageIdx, setSelectedPackageIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId);
  const selectedPackage = selectedService && selectedPackageIdx !== null ? selectedService.packages[selectedPackageIdx] : null;

  const handleNextStep = () => {
    if (step === 'pillar' && selectedServiceId) setStep('package');
    else if (step === 'package' && selectedPackageIdx !== null) setStep('details');
    else if (step === 'details' && formData.name && formData.email) setStep('summary');
  };

  const handleBackStep = () => {
    if (step === 'package') {
      if (initialServiceId) onBack();
      else setStep('pillar');
    }
    else if (step === 'details') setStep('package');
    else if (step === 'summary') setStep('details');
    else onBack();
  };

  const sendToWhatsApp = () => {
    if (!selectedService || !selectedPackage) return;
    
    const message = `*NEW ORDER REQUEST - MARVETTI CORP*%0A%0A` +
      `*Client:* ${formData.name}%0A` +
      `*Business:* ${formData.businessName || 'N/A'}%0A` +
      `*Email:* ${formData.email}%0A%0A` +
      `*Solution:* ${selectedService.title}%0A` +
      `*Package:* ${selectedPackage.name}%0A` +
      `*Price:* ${selectedPackage.price}%0A%0A` +
      `*Notes:* ${formData.notes || 'No extra notes'}%0A%0A` +
      `_Request generated via Marvetti Instant Quote Hub_`;

    window.open(`https://wa.me/27687240126?text=${message}`, '_blank');
  };

  const currentStepNum = step === 'pillar' ? 1 : step === 'package' ? 2 : step === 'details' ? 3 : 4;
  const progress = currentStepNum * 25;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <button 
                onClick={handleBackStep}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors mb-2"
              >
                <ArrowLeft className="w-3 h-3" /> Go Back
              </button>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Instant Quote Hub</h1>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Step {currentStepNum} of 4</span>
              <span className="text-xs font-bold text-slate-400">
                {step === 'pillar' ? 'Solution Pillar' : step === 'package' ? 'Package Selection' : step === 'details' ? 'Contact Data' : 'Final Summary'}
              </span>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
          
          {/* STEP 1: PILLAR SELECTION */}
          {step === 'pillar' && (
            <div className="p-10 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-slate-950 mb-8 uppercase tracking-tight">Select your solution pillar</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICES_DATA.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left ${
                      selectedServiceId === service.id 
                        ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' 
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${service.color} text-white flex items-center justify-center shrink-0`}>
                      {React.cloneElement(service.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <div>
                      <div className="font-black text-slate-950 text-sm uppercase tracking-tight mb-1">{service.title}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">From {service.startingPrice}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: PACKAGE SELECTION */}
          {step === 'package' && selectedService && (
            <div className="p-10 md:p-16 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-10 h-10 rounded-xl ${selectedService.color} text-white flex items-center justify-center`}>
                  {React.cloneElement(selectedService.icon as React.ReactElement, { size: 16 })}
                </div>
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">{selectedService.title} Tiers</h2>
              </div>
              <div className="space-y-4">
                {selectedService.packages.map((pkg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPackageIdx(idx)}
                    className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-[2.5rem] border-2 transition-all text-left ${
                      selectedPackageIdx === idx 
                        ? 'border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50' 
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="max-w-md">
                      <div className="font-black text-slate-950 text-lg uppercase tracking-tight mb-2">{pkg.name}</div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{pkg.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-3xl font-black text-indigo-600 tracking-tighter">{pkg.price}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Once-off setup</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS */}
          {step === 'details' && (
            <div className="p-10 md:p-16 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-black text-slate-950 mb-8 uppercase tracking-tight">Business Intelligence</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Name *</label>
                    <input 
                      type="text"
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      placeholder="e.g., Marvetti Corp"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email *</label>
                  <input 
                    type="email"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specific Requirements / Notes</label>
                  <textarea 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all font-bold h-32 resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Tell us more about your project goals..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUMMARY */}
          {step === 'summary' && selectedService && selectedPackage && (
            <div className="p-10 md:p-16 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Sparkles className="w-4 h-4" /> Ready for confirmation
                </div>
                <h2 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Review Order</h2>
              </div>

              <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 mb-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Selected Pillar</span>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${selectedService.color} text-white flex items-center justify-center`}>
                           {React.cloneElement(selectedService.icon as React.ReactElement, { size: 14 })}
                        </div>
                        <span className="font-black text-slate-950 uppercase tracking-tight">{selectedService.title}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Selected Tier</span>
                      <span className="font-black text-slate-950 text-xl uppercase tracking-tight">{selectedPackage.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contact</span>
                      <span className="font-bold text-slate-600">{formData.name} ({formData.email})</span>
                    </div>
                  </div>
                  <div className="md:text-right flex flex-col justify-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Total Project Estimate</span>
                    <div className="text-6xl font-black text-indigo-600 tracking-tighter">{selectedPackage.price}</div>
                    <span className="text-xs font-bold text-slate-400 mt-2">VAT Included where applicable</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                 <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Fully Encrypted Ordering Pipeline
                 </div>
                 <p className="text-center text-slate-500 font-medium text-sm max-w-lg italic">
                    By clicking the button below, we will generate a real-time order summary and open WhatsApp to finalize the onboarding with a Marvetti Consultant.
                 </p>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-auto p-10 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
             <div className="hidden md:flex items-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                   <Clock className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest">3 Min Completion</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                   <Zap className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Instant Calculation</span>
                </div>
             </div>
             
             <div className="flex gap-4 w-full md:w-auto">
               {step !== 'summary' ? (
                 <button 
                  onClick={handleNextStep}
                  disabled={step === 'pillar' ? !selectedServiceId : step === 'package' ? selectedPackageIdx === null : step === 'details' ? (!formData.name || !formData.email) : false}
                  className="w-full md:w-auto px-12 py-5 bg-slate-950 hover:bg-indigo-600 disabled:bg-slate-200 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 group"
                 >
                   Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
               ) : (
                 <button 
                  onClick={sendToWhatsApp}
                  className="w-full md:w-auto px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20"
                 >
                   Push Order to WhatsApp <MessageSquare className="w-4 h-4" />
                 </button>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderQuoteForm;
