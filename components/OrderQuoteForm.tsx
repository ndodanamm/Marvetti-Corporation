
import React, { useState, useEffect } from 'react';
import { STAGES_DATA } from '../constants';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Zap,
  ChevronRight,
  Mail,
  Cpu,
  RefreshCw,
  Lock,
  CreditCard,
  Building,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { Order, ServiceStage } from '../types';
import { GoogleGenAI } from "@google/genai";

interface OrderQuoteFormProps {
  onBack: () => void;
  initialServiceId?: string | null;
}

type OrderStep = 'select' | 'questionnaire' | 'ai_sandbox' | 'approval' | 'payment' | 'success';

const OrderQuoteForm: React.FC<OrderQuoteFormProps> = ({ onBack, initialServiceId }) => {
  const [currentStep, setCurrentStep] = useState<OrderStep>(initialServiceId ? 'questionnaire' : 'select');
  const [selectedStageId, setSelectedStageId] = useState<string | null>(initialServiceId || null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [regens, setRegens] = useState(0);
  const [orderId] = useState(`MV-${Math.floor(100000 + Math.random() * 900000)}`);

  const selectedStage = STAGES_DATA.find(s => s.id === selectedStageId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const runAIGeneration = async () => {
    if (!selectedStage) return;
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        System: Act as the Marvetti Corporation Stage Orchestrator. 
        Objective: Generate a draft output for Stage ${selectedStage.stageNumber}: ${selectedStage.title}.
        User Inputs: ${JSON.stringify(formData)}
        Instructions: Provide a professional, corporate-grade draft structure or description. Max 300 words.
        Format: Clean Markdown.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      setAiOutput(response.text || "Output failed to initialize. Try again.");
      setCurrentStep('ai_sandbox');
    } catch (err) {
      console.error(err);
      setAiOutput("System congestion. Manual override required.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (regens < 3) {
      setRegens(prev => prev + 1);
      runAIGeneration();
    }
  };

  const handleFinalApproval = () => {
    setCurrentStep('approval');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'select':
        return (
          <div className="p-10 md:p-16 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black text-slate-950 mb-10 uppercase tracking-tighter">Enter the sequence</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {STAGES_DATA.map(stage => (
                <button
                  key={stage.id}
                  onClick={() => { setSelectedStageId(stage.id); setCurrentStep('questionnaire'); }}
                  className="flex items-center gap-6 p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-brand-500 hover:bg-slate-50 transition-all text-left bg-white shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-2xl ${stage.color} text-white flex items-center justify-center shrink-0`}>
                    {stage.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">Stage {stage.stageNumber}</div>
                    <div className="font-black text-slate-950 text-sm uppercase tracking-tight">{stage.title}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{stage.priceDisplay}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'questionnaire':
        return (
          <div className="p-10 md:p-16 animate-in fade-in slide-in-from-right-4">
             <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 rounded-2xl ${selectedStage?.color} text-white flex items-center justify-center`}>
                  {selectedStage?.icon}
                </div>
                <div>
                   <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">Guided Intake</h2>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Stage {selectedStage?.stageNumber} // Configuration</p>
                </div>
             </div>
             <div className="space-y-8 max-w-2xl">
                {selectedStage?.questions.map(q => (
                  <div key={q.id} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{q.label} {q.required && '*'}</label>
                    {q.type === 'select' ? (
                      <select 
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-600 outline-none transition-all font-bold text-slate-900"
                      >
                        <option value="">Select Option</option>
                        {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : q.type === 'textarea' ? (
                      <textarea 
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-600 outline-none transition-all font-bold h-32"
                        placeholder="..."
                      />
                    ) : (
                      <input 
                        type="text"
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-600 outline-none transition-all font-bold"
                        placeholder="..."
                      />
                    )}
                  </div>
                ))}
                <button 
                  onClick={runAIGeneration}
                  disabled={isGenerating}
                  className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all flex items-center justify-center gap-3 shadow-2xl"
                >
                  {isGenerating ? <RefreshCw className="animate-spin" /> : <><Cpu size={18} /> Initialize AI Sandbox</>}
                </button>
             </div>
          </div>
        );

      case 'ai_sandbox':
        return (
          <div className="p-10 md:p-16 animate-in fade-in zoom-in-95">
             <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tight">AI Sandbox Preview</h2>
                  <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mt-1">70% Automated Draft // Optimization Node</p>
                </div>
                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Regenerations</div>
                   <div className="flex justify-center gap-1">
                      {[1,2,3].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i <= regens ? 'bg-slate-300' : 'bg-brand-500'}`}></div>)}
                   </div>
                </div>
             </div>

             <div className="bg-slate-950 rounded-[3rem] p-10 text-slate-300 font-medium leading-relaxed prose prose-invert max-w-none shadow-2xl mb-12 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Cpu size={120} />
                </div>
                <div className="relative z-10">{aiOutput}</div>
             </div>

             <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleFinalApproval}
                  className="flex-grow py-6 bg-brand-gradient text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:opacity-90 shadow-2xl flex items-center justify-center gap-3"
                >
                  Approve & Finalize Stage <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={handleRegenerate}
                  disabled={regens >= 3 || isGenerating}
                  className="px-10 py-6 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isGenerating ? <RefreshCw className="animate-spin" /> : <><RefreshCw size={18} /> Regenerate ({3 - regens} left)</>}
                </button>
             </div>
             <p className="text-center text-[10px] font-bold text-slate-400 mt-8 uppercase tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck size={12} className="text-emerald-500" /> Human QC Flag applied automatically upon approval
             </p>
          </div>
        );

      case 'approval':
        return (
          <div className="p-10 md:p-16 animate-in fade-in scale-95">
             <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4" /> Preview Approved
                </div>
                <h2 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Approval Gate</h2>
                <p className="text-slate-400 font-medium mt-4">Inputs are now locked for human verification and final execution.</p>
             </div>

             <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 grid md:grid-cols-2 gap-12 mb-12 shadow-inner">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${selectedStage?.color} text-white flex items-center justify-center shadow-lg`}>
                        {selectedStage?.icon}
                      </div>
                      <div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</div>
                         <div className="text-lg font-black text-slate-950 tracking-tight">{orderId}</div>
                      </div>
                   </div>
                   <div className="h-px bg-slate-200"></div>
                   <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Stage Deliverable</div>
                      <div className="text-sm font-bold text-slate-700 uppercase tracking-tight">{selectedStage?.title} Implementation</div>
                   </div>
                </div>
                <div className="md:text-right flex flex-col justify-center">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Investment Total</div>
                   <div className="text-6xl font-black text-brand-600 tracking-tighter">{selectedStage?.priceDisplay}</div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase mt-4">*Excludes statutory/platform fees where applicable</p>
                </div>
             </div>

             <button 
                onClick={() => setCurrentStep('payment')}
                className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-2xl flex items-center justify-center gap-3"
             >
                Proceed to Secure Payment <Lock size={18} />
             </button>
          </div>
        );

      case 'payment':
        return (
          <div className="p-10 md:p-16 animate-in fade-in">
             <h2 className="text-3xl font-black text-slate-950 uppercase mb-10 tracking-tight">Stage Settlement</h2>
             <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-brand-500 transition-all">
                      <div className="flex items-center gap-6">
                         <CreditCard className="w-8 h-8 text-slate-400 group-hover:text-brand-500" />
                         <div>
                            <div className="font-black text-slate-950 uppercase tracking-tight">Full Payment</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Once-off Provisioning</div>
                         </div>
                      </div>
                      <span className="font-black text-slate-950">{selectedStage?.priceDisplay}</span>
                   </div>
                   <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-6">
                         <Clock className="w-8 h-8 text-slate-400" />
                         <div>
                            <div className="font-black text-slate-950 uppercase tracking-tight">Payment Plan</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Only for R5,000+ projects</div>
                         </div>
                      </div>
                      <ArrowRight size={20} />
                   </div>
                </div>
                <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400 mb-10">Vault Summary</h3>
                   <div className="space-y-4 mb-10">
                      <div className="flex justify-between border-b border-white/5 pb-4">
                         <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Stage {selectedStage?.stageNumber}</span>
                         <span className="font-black tracking-tight">{selectedStage?.priceDisplay}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-4">
                         <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Platform Admin</span>
                         <span className="font-black tracking-tight">R0.00</span>
                      </div>
                   </div>
                   <button 
                      onClick={() => setCurrentStep('success')}
                      className="w-full py-6 bg-brand-gradient rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-900/40"
                   >
                      Confirm Settlement
                   </button>
                </div>
             </div>
          </div>
        );

      case 'success':
        return (
          <div className="p-20 text-center animate-in zoom-in-95">
             <div className="w-24 h-24 bg-slate-950 text-brand-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-bounce">
                <Sparkles size={48} />
             </div>
             <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase mb-6">Nexus Order Confirmed</h2>
             <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed mb-12 italic">
               "Thank you for your order. Your project will be processed using our 70% AI automation and 30% human quality control model. Track progress in your dashboard."
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onBack}
                  className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
                >
                  Enter Client Dashboard <ArrowUpRight size={18} />
                </button>
             </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Header */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
             <div>
                <button onClick={onBack} className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 hover:text-brand-600 transition-colors">
                  <ArrowLeft size={12} /> Master Exit
                </button>
                <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Stage Provisioning</h1>
             </div>
             <div className="text-right">
                <div className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-1">Global Seq v1.0</div>
                <div className="text-xs font-bold text-slate-400 uppercase">{currentStep.replace('_', ' ')}</div>
             </div>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
             <div 
              className="h-full bg-brand-500 transition-all duration-1000 ease-out" 
              style={{ width: `${(STAGES_DATA.findIndex(s => s.id === selectedStageId) + 1) * 8.33 || 0}%` }}
             ></div>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden min-h-[600px] flex flex-col relative">
           {renderStep()}
           
           {/* Trust Footer */}
           <div className="mt-auto p-10 bg-slate-50 border-t border-slate-100 grid grid-cols-3 gap-6 opacity-40">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={16} className="text-brand-600" />
                 <span className="text-[9px] font-black uppercase tracking-widest">70/30 Hybrid Model</span>
              </div>
              <div className="flex items-center gap-3">
                 <Lock size={16} className="text-slate-600" />
                 <span className="text-[9px] font-black uppercase tracking-widest">POPIA Secure</span>
              </div>
              <div className="flex items-center gap-3">
                 <Target size={16} className="text-slate-600" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Quality Guaranteed</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderQuoteForm;
