
import React, { useState } from 'react';
import { Bot, Send, Sparkles, RefreshCw, CheckCircle2, CreditCard } from 'lucide-react';
import { getServiceRecommendation } from '../services/gemini';
import { RecommendationResult } from '../types';

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      const res = await getServiceRecommendation(input);
      setRecommendation(res);
      setInput('');
    } catch (err) {
      setError("I couldn't generate a recommendation at this moment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-200">
          <div className="grid md:grid-cols-2">
            {/* Left side: Form */}
            <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Not sure where to start?
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Describe your current business bottleneck, challenge, or desired goal, and our AI advisor will match you with the perfect service vertical.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., We are struggling with high customer turnover and slow response times in our European markets..."
                  className="w-full h-32 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-slate-700 placeholder:text-slate-400"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    loading 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Analyzing Challenge...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Get Recommendation
                    </>
                  )}
                </button>
              </form>
              {error && <p className="mt-4 text-sm text-rose-500 font-medium">{error}</p>}
            </div>

            {/* Right side: Output */}
            <div className="p-8 md:p-12 lg:p-16 bg-slate-50 flex flex-col justify-center">
              {!recommendation && !loading ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Bot className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium">
                    Enter your challenge to see <br /> tailored service matches
                  </p>
                </div>
              ) : loading ? (
                 <div className="space-y-6 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-24 bg-slate-200 rounded w-full"></div>
                    <div className="space-y-3 pt-4">
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                 </div>
              ) : (
                <div className="space-y-6 transition-all duration-500 ease-out translate-y-0 opacity-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1 block">Best Match</span>
                      <h4 className="text-2xl font-extrabold text-slate-900">{recommendation?.categoryName}</h4>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl text-center">
                       <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 block mb-1">Estimated Cost</span>
                       <span className="font-inter text-sm font-black text-slate-950">{recommendation?.estimatedCost}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group">
                    <div className="absolute top-4 right-4 text-indigo-100 group-hover:text-indigo-200 transition-colors">
                      <Bot className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 leading-relaxed pr-6">
                      "{recommendation?.reason}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                       <CreditCard className="w-4 h-4 text-slate-400" />
                       Suggested Strategy:
                    </h5>
                    <div className="space-y-3">
                      {recommendation?.suggestedSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button 
                      onClick={() => setRecommendation(null)}
                      className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors underline underline-offset-4"
                    >
                      New analysis
                    </button>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">*Estimates based on current catalog</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;