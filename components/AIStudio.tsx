
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, Image as ImageIcon, MessageSquare, 
  Mic, Search, MapPin, Upload, Zap, RefreshCw, Send, 
  Volume2, Globe, ShieldCheck, Video, 
  Layers, Cpu, Play, ShoppingCart, ArrowRight, FileText, Target,
  Layout, Monitor, Smartphone, Maximize
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
  
  // Configs
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9'>('1:1');
  const [thinkingMode, setThinkingMode] = useState(false);
  const [grounding, setGrounding] = useState<'none' | 'search' | 'maps'>('none');
  const [voiceName, setVoiceName] = useState('Zephyr');

  // File Uploads
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Transcription
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Map features to Commercial Pillars
  const getActivePillar = () => {
    switch(activeFeature) {
      case 'generate': case 'edit': case 'wireframe': return SERVICES_DATA.find(s => s.id === '3'); // Branding
      case 'video': return SERVICES_DATA.find(s => s.id === '5'); // Marketing
      case 'chat': case 'analysis': return SERVICES_DATA.find(s => s.id === '2'); // Cloud/Automation
      case 'tts': return SERVICES_DATA.find(s => s.id === '8'); // CX
      default: return SERVICES_DATA[0];
    }
  };

  const activePillar = getActivePillar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        processTranscription(audioBlob);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const processTranscription = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      });

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64, mimeType: 'audio/webm' } },
            { text: "Please transcribe this audio accurately. Return only the transcription." }
          ]
        }
      });
      setPrompt(response.text || "");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !selectedFile) return;
    setIsProcessing(true);
    setOutput(null);
    setGroundingUrls([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (activeFeature === 'generate') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: { aspectRatio, imageSize }
          }
        });
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setOutput(`data:image/png;base64,${part.inlineData.data}`);
            setOutputType('image');
          }
        }
      } else if (activeFeature === 'edit' || activeFeature === 'wireframe') {
        if (!selectedFile) throw new Error("Reference asset required.");
        const base64 = await fileToBase64(selectedFile);
        const finalPrompt = activeFeature === 'wireframe' 
          ? `Transform this business asset into a professional, modern corporate website wireframe. The user's specific request: ${prompt}` 
          : prompt;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { inlineData: { data: base64, mimeType: selectedFile.type } },
              { text: finalPrompt }
            ]
          }
        });
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setOutput(`data:image/png;base64,${part.inlineData.data}`);
            setOutputType('image');
          }
        }
      } else if (activeFeature === 'video') {
        const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
        if (hasKey === false) {
          await (window as any).aistudio.openSelectKey();
        }
        
        const videoParams: any = {
          model: 'veo-3.1-fast-generate-preview',
          prompt: prompt,
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: (aspectRatio === '16:9' || aspectRatio === '9:16') ? aspectRatio : '16:9'
          }
        };

        if (selectedFile) {
          const base64 = await fileToBase64(selectedFile);
          videoParams.image = { imageBytes: base64, mimeType: selectedFile.type };
        }

        let operation = await ai.models.generateVideos(videoParams);
        while (!operation.done) {
          await new Promise(r => setTimeout(r, 8000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        const videoRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await videoRes.blob();
        setOutput(URL.createObjectURL(videoBlob));
        setOutputType('video');
      } else if (activeFeature === 'chat' || activeFeature === 'analysis') {
        const tools: any[] = [];
        if (grounding === 'search') tools.push({ googleSearch: {} });
        if (grounding === 'maps') tools.push({ googleMaps: {} });

        const contents: any[] = [];
        if (selectedFile) {
          const base64 = await fileToBase64(selectedFile);
          contents.push({ inlineData: { data: base64, mimeType: selectedFile.type } });
        }
        contents.push({ text: prompt });

        let modelName = 'gemini-3-flash-preview';
        if (activeFeature === 'analysis' || thinkingMode) modelName = 'gemini-3-pro-preview';
        if (grounding === 'maps') modelName = 'gemini-2.5-flash';

        const config: any = { tools };
        if (thinkingMode && modelName === 'gemini-3-pro-preview') {
          config.thinkingConfig = { thinkingBudget: 32768 };
        }

        const response = await ai.models.generateContent({
          model: modelName,
          contents: { parts: contents },
          config: config
        });

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const urls = chunks.map((c: any) => {
            if (c.web) return { uri: c.web.uri, title: c.web.title };
            if (c.maps) return { uri: c.maps.uri, title: c.maps.title };
            return null;
          }).filter(Boolean);
          setGroundingUrls(urls);
        }

        setOutput(response.text || "No intelligence output generated.");
        setOutputType('text');
      } else if (activeFeature === 'tts') {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: prompt }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voiceName },
              },
            },
          },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const binaryString = atob(base64Audio);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: 'audio/pcm' });
          setOutput(URL.createObjectURL(blob));
          setOutputType('audio');
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio?.openSelectKey?.();
      }
      setOutput(`Studio System Fault: ${err.message}`);
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
        {/* Studio Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 hover:text-white transition-all mb-4">
              <ArrowLeft size={16} /> Close Hub
            </button>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Marvetti <span className="text-indigo-500">Architecture Hub</span>
            </h1>
            <p className="text-slate-500 mt-4 font-medium uppercase tracking-widest text-[10px]">Strategic Concepting & Prototype Lab</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl shadow-black/50">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Nominal // Prototyping Active</div>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-3">
             <div className="px-4 py-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6 shadow-inner">
                <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400 block mb-1">Architecture Context</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-tight">Active Pillar: {activePillar?.title}</span>
             </div>

             {menuItems.map(item => (
               <button 
                key={item.id}
                onClick={() => { setActiveFeature(item.id as AIFeature); setOutput(null); setFilePreview(null); setSelectedFile(null); }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFeature === item.id ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 ring-1 ring-white/20' : 'bg-slate-900 text-slate-500 hover:text-white border border-white/5'
                }`}
               >
                 {item.icon}
                 {item.label}
               </button>
             ))}

             <div className="pt-8 border-t border-white/5 mt-8 space-y-6">
                <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-4">Draft Params</h4>
                
                {['generate', 'wireframe'].includes(activeFeature) && (
                  <div className="px-4 space-y-4">
                    <div>
                       <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Target Canvas</label>
                       <select value={imageSize} onChange={e => setImageSize(e.target.value as any)} className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white outline-none">
                          <option>1K (Draft)</option>
                          <option>2K (Concept)</option>
                          <option>4K (Finalist)</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Display Aspect</label>
                       <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as any)} className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white outline-none">
                          <option>1:1</option>
                          <option>16:9</option>
                          <option>9:16</option>
                          <option>21:9</option>
                       </select>
                    </div>
                  </div>
                )}

                {(activeFeature === 'chat' || activeFeature === 'analysis') && (
                  <div className="px-4 space-y-4">
                    <div>
                       <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Deep Logic Layer</label>
                       <button onClick={() => setThinkingMode(!thinkingMode)} className={`w-full flex items-center justify-between px-4 py-2 rounded-xl border transition-all ${thinkingMode ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/5 bg-slate-900 text-slate-500'}`}>
                          <span className="text-[9px] font-black uppercase tracking-widest">32K Thinking</span>
                          {thinkingMode ? <ShieldCheck size={14} /> : <Zap size={14} />}
                       </button>
                    </div>
                    <div>
                       <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Grounding</label>
                       <div className="flex flex-col gap-2">
                          <button onClick={() => setGrounding('search')} className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${grounding === 'search' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/5 bg-slate-900 text-slate-500'}`}>
                             <Globe size={14} /> Global Search
                          </button>
                       </div>
                    </div>
                  </div>
                )}
             </div>

             {/* Commercial Context */}
             <div className="p-6 bg-slate-900 border border-white/5 rounded-[2rem] mt-8 shadow-2xl">
                <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-4">Implementation Path</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Starting Retainer</div>
                    <div className="text-xl font-black text-white tracking-tighter">{activePillar?.startingPrice}</div>
                  </div>
                  <button 
                    onClick={() => onOrder(activePillar?.id || '1')}
                    className="w-full py-3 bg-white text-slate-950 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
                  >
                    commence implementation
                  </button>
                </div>
             </div>
          </div>

          {/* Main Work Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Input Hub */}
            <div className="bg-slate-900 p-10 rounded-[4rem] border border-white/5 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Layout size={200} />
               </div>

               <div className="relative z-10 flex flex-col gap-8">
                  {/* File Dropzone */}
                  {(activeFeature === 'edit' || activeFeature === 'video' || activeFeature === 'analysis' || activeFeature === 'wireframe') && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative w-full h-56 rounded-[2.5rem] border-2 border-dashed border-white/5 hover:border-indigo-500 flex flex-col items-center justify-center transition-all cursor-pointer group shadow-inner ${filePreview ? 'bg-black' : 'bg-slate-950/50'}`}
                    >
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" />
                      {filePreview ? (
                        <div className="relative w-full h-full flex items-center justify-center p-6">
                          <img src={filePreview} className="max-h-full object-contain rounded-2xl shadow-2xl" alt="Asset Preview" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-slate-950/60 transition-opacity rounded-2xl">
                             <div className="flex flex-col items-center gap-2">
                                <RefreshCw className="text-white animate-spin-slow" />
                                <span className="text-[8px] font-black uppercase text-white tracking-widest">Replace Asset</span>
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                           <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-500">
                             <Upload className="w-8 h-8 text-slate-700 group-hover:text-indigo-400" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inject Business Asset into Design Path</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Text Input */}
                  <div className="space-y-4">
                     <div className="flex items-center justify-between px-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural objective</label>
                        <button 
                          onMouseDown={startRecording} 
                          onMouseUp={stopRecording}
                          className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-950 text-slate-500 hover:text-white shadow-inner border border-white/5'}`}
                        >
                          <Mic size={18} />
                        </button>
                     </div>
                     <textarea 
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                      placeholder={
                        activeFeature === 'wireframe' ? "Describe the website layout: e.g. 'Place this product image into a high-end SaaS homepage hero section'..." :
                        activeFeature === 'generate' ? "Describe the visual vision: e.g. 'A futuristic logistics hub in Cape Town, hyper-realistic'..." :
                        "Brief our architecture engine on the desired outcome..."
                      }
                      className="w-full h-32 bg-slate-950 border border-white/5 rounded-[2.5rem] p-8 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium leading-relaxed transition-all placeholder:text-slate-800 shadow-inner"
                     />
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isProcessing || (!prompt && !selectedFile)}
                    className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:opacity-50 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-900/40 group/btn"
                  >
                    {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Target size={18} className="group-hover/btn:scale-125 transition-transform" />}
                    {isProcessing ? "Synthesizing Architecture..." : `Stage Strategic Concept`}
                  </button>
               </div>
            </div>

            {/* Result Hub */}
            {output && (
              <div className="bg-slate-900 p-10 rounded-[4rem] border border-white/5 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden relative shadow-2xl">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                       <ShieldCheck size={20} />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural Draft: Complete</h3>
                       <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Low-Res Framework (Not for Deployment)</span>
                    </div>
                 </div>

                 <div className="relative">
                    {outputType === 'image' && (
                      <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black relative group/output">
                        <img src={output} className="w-full object-contain max-h-[700px] opacity-90 group-hover/output:opacity-100 transition-opacity" alt="Strategic Output" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover/output:opacity-10 transition-opacity">
                           <span className="text-4xl font-black text-white uppercase tracking-[1.5em] rotate-12 -translate-x-12">MARVETTI DRAFT</span>
                        </div>
                      </div>
                    )}
                    {outputType === 'video' && (
                      <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video">
                        <video src={output} controls className="w-full h-full" autoPlay loop />
                      </div>
                    )}
                    {outputType === 'audio' && (
                      <div className="p-12 bg-slate-950 rounded-[3rem] border border-white/5 flex flex-col items-center shadow-inner">
                        <Volume2 size={48} className="text-indigo-400 mb-6" />
                        <audio src={output} controls className="w-full" />
                      </div>
                    )}
                    {outputType === 'text' && (
                      <div className="p-10 bg-slate-950 rounded-[3rem] border border-white/5 font-medium leading-relaxed text-slate-300 prose prose-invert max-w-none shadow-inner">
                         {output.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                      </div>
                    )}
                 </div>

                 {/* CONVERSION BAR */}
                 <div className="mt-12 p-8 bg-indigo-600 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl ring-1 ring-white/10">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
                          <ShoppingCart size={24} />
                       </div>
                       <div>
                          <h4 className="text-xl font-black uppercase tracking-tight">Convert to Production Solution</h4>
                          <p className="text-xs font-medium text-white/80">Hire our senior architects to finalize, implement, and secure this concept.</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => onOrder(activePillar?.id || '1')}
                      className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-3 shadow-2xl active:scale-95"
                    >
                      Instant Quote for implementation <ArrowRight size={16} />
                    </button>
                 </div>

                 <div className="mt-10 flex justify-center">
                    <button onClick={() => setOutput(null)} className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors flex items-center gap-2">
                       <RefreshCw size={12} /> Re-initialize Design Path
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIStudio;
