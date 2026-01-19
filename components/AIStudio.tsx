
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, Image as ImageIcon, MessageSquare, 
  Mic, Search, MapPin, Upload, Zap, RefreshCw, Send, 
  Volume2, Globe, ShieldCheck, Video, 
  Layers, Cpu, Play, ShoppingCart, ArrowRight, FileText, Target,
  Layout, Monitor, Smartphone, Maximize, Paperclip, File, X, AlertCircle
} from 'lucide-react';
import { GoogleGenAI, Type, Modality } from '@google/genai';
import { SERVICES_DATA } from '../constants';

interface AIStudioProps {
  onBack: () => void;
  onOrder: (serviceId: string) => void;
}

type AIFeature = 'generate' | 'edit' | 'video' | 'chat' | 'analysis' | 'tts' | 'wireframe';

const AIStudio: React.FC<AIStudioProps> = ({ onBack, onOrder }) => {
  const [activeFeature, setActiveFeature] = useState<AIFeature>('generate');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [outputType, setOutputType] = useState<'text' | 'image' | 'video' | 'audio'>('text');
  const [groundingUrls, setGroundingUrls] = useState<{uri: string, title: string}[]>([]);
  
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '2:3' | '3:2' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9'>('1:1');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getActivePillar = () => {
    switch(activeFeature) {
      case 'generate': case 'edit': case 'wireframe': return SERVICES_DATA.find(s => s.id === '3'); 
      case 'video': return SERVICES_DATA.find(s => s.id === '5'); 
      case 'chat': case 'analysis': return SERVICES_DATA.find(s => s.id === '2'); 
      case 'tts': return SERVICES_DATA.find(s => s.id === '8'); 
      default: return SERVICES_DATA[0];
    }
  };

  const activePillar = getActivePillar();

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setOutput(null);
    setGroundingUrls([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      if (activeFeature === 'generate') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: `Marvetti Architectural Prototype: ${prompt}` }] },
          config: { imageConfig: { aspectRatio: (aspectRatio as any), imageSize } }
        });
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setOutput(`data:image/png;base64,${part.inlineData.data}`);
            setOutputType('image');
          }
        }
      } else {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
          config: {
            systemInstruction: `You are the Marvetti Studio AI. Format output in clean Markdown.`,
            thinkingConfig: { thinkingBudget: 32768 }
          }
        });
        setOutput(response.text || "Transmission error.");
        setOutputType('text');
      }
    } catch (err: any) {
      setOutput(`Studio Security Protocol: ${err.message}`);
      setOutputType('text');
    } finally {
      setIsProcessing(false);
    }
  };

  const menuItems = [
    { id: 'generate', icon: <ImageIcon size={20} />, label: 'Brand Conceptor' },
    { id: 'wireframe', icon: <Monitor size={20} />, label: 'Wireframe Sim' },
    { id: 'edit', icon: <Layers size={20} />, label: 'Retouch Engine' },
    { id: 'video', icon: <Video size={20} />, label: 'Motion Staging' },
    { id: 'chat', icon: <MessageSquare size={20} />, label: 'Pillar Audit' },
    { id: 'analysis', icon: <Search size={20} />, label: 'Multi-Modal Lab' },
    { id: 'tts', icon: <Volume2 size={20} />, label: 'Voice Profile' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-40 font-inter text-slate-300 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-400 hover:text-white transition-all mb-4">
              <ArrowLeft size={16} /> Close Hub
            </button>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Marvetti <span className="text-brand-500">Architecture Hub</span>
            </h1>
            <p className="text-slate-500 mt-4 font-medium uppercase tracking-widest text-[10px]">Strategic Prototype Lab // {activeFeature.toUpperCase()}</p>
          </div>
          <div className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl">
             <Cpu size={24} className="text-brand-500" />
             <div>
                <div className="text-[10px] font-black text-white uppercase tracking-widest">Active Model</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Gemini v3 Deep-Flow</div>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-4 border border-white/5 space-y-1">
               {menuItems.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => { setActiveFeature(item.id as AIFeature); setOutput(null); }}
                   className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeFeature === item.id ? 'bg-brand-gradient text-white shadow-xl shadow-brand-900/40' : 'hover:bg-white/5 text-slate-500 hover:text-white'
                   }`}
                 >
                   {item.icon}
                   {item.label}
                 </button>
               ))}
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-8 border border-white/5 space-y-8">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Protocol Tuning</h3>
               <div className="space-y-4">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active State</label>
                  <div className="p-4 rounded-xl bg-slate-950 border border-brand-500/20 text-brand-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-inner shadow-brand-900/5">
                     <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span> Synchronized
                  </div>
               </div>
            </div>

            {activePillar && (
              <div className="bg-brand-gradient rounded-[3rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                    {React.cloneElement(activePillar.icon as React.ReactElement, { size: 100 })}
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Commercial Pillar</h4>
                 <div className="text-xl font-black uppercase tracking-tighter mb-2">{activePillar.title}</div>
                 <button 
                  onClick={() => onOrder(activePillar.id)}
                  className="w-full py-4 bg-white text-brand-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl"
                 >
                    Shift to Production <ArrowRight size={14} />
                 </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-9 space-y-10">
            <div className="bg-slate-900 rounded-[4rem] border border-white/5 min-h-[500px] flex flex-col items-center justify-center p-12 relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,27,35,0.03),transparent)]"></div>
               {isProcessing ? (
                 <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <RefreshCw size={50} className="text-brand-500 animate-spin mx-auto" />
                    <div className="text-[11px] font-black text-brand-400 uppercase tracking-[0.4em]">Neural Synthesis Active</div>
                 </div>
               ) : output ? (
                 <div className="w-full h-full p-8 bg-slate-950/50 rounded-[3rem] border border-white/5">
                    {outputType === 'image' ? <img src={output} className="w-full h-auto rounded-2xl shadow-2xl" /> : <div className="prose prose-invert max-w-none font-medium leading-relaxed">{output}</div>}
                 </div>
               ) : (
                 <div className="text-center opacity-40">
                    <Zap size={48} className="mx-auto mb-6 text-brand-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting Instruction</p>
                 </div>
               )}
            </div>

            <div className="bg-slate-900 rounded-[3.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
               <div className="relative flex items-center gap-6">
                 <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Define objective..."
                    className="flex-grow bg-slate-950 border border-white/10 rounded-[2.5rem] px-8 py-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium transition-all shadow-inner placeholder:text-slate-800 resize-none h-[72px]"
                 />
                 <button 
                   onClick={handleGenerate}
                   disabled={isProcessing || !prompt}
                   className="p-5 bg-brand-gradient hover:opacity-90 disabled:opacity-50 text-white rounded-[2rem] transition-all shadow-2xl shadow-brand-900/30 active:scale-95"
                 >
                   <Send size={24} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudio;
