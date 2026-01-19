
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
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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

        const parts: any[] = [];
        if (selectedFile) {
          const base64 = await fileToBase64(selectedFile);
          parts.push({ inlineData: { data: base64, mimeType: selectedFile.type } });
        }
        parts.push({ text: prompt || "Analyze the provided context and provide high-density strategic insights." });

        let modelName = 'gemini-3-flash-preview';
        if (activeFeature === 'analysis' || thinkingMode) modelName = 'gemini-3-pro-preview';
        if (grounding === 'maps') modelName = 'gemini-2.5-flash';

        const config: any = { tools };
        if (thinkingMode && modelName === 'gemini-3-pro-preview') {
          config.thinkingConfig = { thinkingBudget: 32768 };
        }

        const response = await ai.models.generateContent({
          model: modelName,
          contents: { parts },
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
             <div className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl">
                <Cpu size={24} className="text-indigo-500" />
                <div>
                   <div className="text-[10px] font-black text-white uppercase tracking-widest">Active Model</div>
                   <div className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">Gemini v3 Deep-Flow</div>
                </div>
             </div>
          </div>
        </div>

        {/* Studio Interface */}
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Navigation & Controls */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-4 border border-white/5 space-y-1">
               {menuItems.map((item) => (
                 <button
                   key={item.id}
                   onClick={() => { setActiveFeature(item.id as AIFeature); setOutput(null); }}
                   className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeFeature === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-white/5 text-slate-500 hover:text-white'
                   }`}
                 >
                   {item.icon}
                   {item.label}
                 </button>
               ))}
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-8 border border-white/5 space-y-8">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Protocol Tuning</h3>
               
               {/* Context specific settings */}
               {(activeFeature === 'generate' || activeFeature === 'video') && (
                 <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Aspect Ratio</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['1:1', '16:9', '9:16', '4:3'].map(ratio => (
                         <button 
                          key={ratio}
                          onClick={() => setAspectRatio(ratio as any)}
                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${aspectRatio === ratio ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-950 border-white/5 text-slate-500 hover:text-white'}`}
                         >
                            {ratio}
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {(activeFeature === 'chat' || activeFeature === 'analysis') && (
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Grounding Layer</label>
                       <div className="space-y-2">
                         <button 
                          onClick={() => setGrounding('search')}
                          className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${grounding === 'search' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-white/5 text-slate-500 hover:text-white'}`}
                         >
                            <Globe size={14} /> Web Intelligence
                         </button>
                         <button 
                          onClick={() => setGrounding('maps')}
                          className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${grounding === 'maps' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-white/5 text-slate-500 hover:text-white'}`}
                         >
                            <MapPin size={14} /> Geo-Pillar Lab
                         </button>
                         <button 
                          onClick={() => setGrounding('none')}
                          className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${grounding === 'none' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-950 border-white/5 text-slate-500 hover:text-white'}`}
                         >
                            <Zap size={14} /> Zero Grounding
                         </button>
                       </div>
                    </div>

                    <button 
                      onClick={() => setThinkingMode(!thinkingMode)}
                      className={`w-full flex items-center justify-between px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${thinkingMode ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-white/5 text-slate-500'}`}
                    >
                       <span className="flex items-center gap-2">
                          <Cpu size={14} /> 32K Thinking
                       </span>
                       <div className={`w-8 h-4 rounded-full relative transition-colors ${thinkingMode ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                          <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${thinkingMode ? 'right-1' : 'left-1'}`}></div>
                       </div>
                    </button>
                 </div>
               )}

               {activeFeature === 'tts' && (
                 <div className="space-y-4">
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Voice Synthesis Profile</label>
                   <select 
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black text-white outline-none appearance-none cursor-pointer"
                   >
                     {['Zephyr', 'Puck', 'Charon', 'Kore', 'Fenrir'].map(v => (
                       <option key={v} value={v}>{v} Profile</option>
                     ))}
                   </select>
                 </div>
               )}
            </div>

            {activePillar && (
              <div className="bg-indigo-600 rounded-[3rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                    {React.cloneElement(activePillar.icon as React.ReactElement, { size: 100 })}
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Commercial Pillar</h4>
                 <div className="text-xl font-black uppercase tracking-tighter mb-2">{activePillar.title}</div>
                 <p className="text-[10px] font-medium opacity-80 leading-relaxed mb-8">Concept proven? Shift to full production immediately via our corporate pipeline.</p>
                 <button 
                  onClick={() => onOrder(activePillar.id)}
                  className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-950/20"
                 >
                    Shift to Production <ArrowRight size={14} />
                 </button>
              </div>
            )}
          </div>

          {/* Interaction Area */}
          <div className="lg:col-span-9 space-y-10">
            {/* Display Node */}
            <div className="bg-slate-900 rounded-[4rem] border border-white/5 min-h-[500px] flex flex-col items-center justify-center p-12 relative overflow-hidden group/display shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.03),transparent)]"></div>
               
               {!output && !isProcessing && (
                 <div className="text-center animate-in fade-in duration-700">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-950 border border-white/5 flex items-center justify-center text-slate-800 mx-auto mb-10 shadow-inner group-hover/display:scale-110 group-hover/display:rotate-3 transition-transform duration-700">
                       <Zap size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-500 uppercase tracking-widest mb-4">Awaiting Objective</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium leading-relaxed uppercase tracking-tighter">
                       Select a protocol and define your objective to begin the neural generation sequence.
                    </p>
                 </div>
               )}

               {isProcessing && (
                 <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="relative">
                       <RefreshCw size={50} className="text-indigo-500 animate-spin mx-auto" />
                       <div className="absolute inset-0 text-indigo-400 blur-xl opacity-20">
                          <RefreshCw size={50} className="animate-spin mx-auto" />
                       </div>
                    </div>
                    <div>
                       <div className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4">Neural Synthesis Active</div>
                       <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden shadow-inner">
                          <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] w-full origin-left animate-[studio-loading_3s_infinite]"></div>
                       </div>
                    </div>
                 </div>
               )}

               {output && !isProcessing && (
                 <div className="w-full h-full animate-in zoom-in-95 duration-700">
                    {outputType === 'image' && (
                      <div className="relative group/img overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                        <img src={output} className="w-full h-auto max-h-[600px] object-contain transition-transform duration-1000" alt="Generated Output" />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                           <button onClick={() => window.open(output, '_blank')} className="p-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"><Maximize size={16} /> Maximize View</button>
                        </div>
                      </div>
                    )}
                    {outputType === 'video' && (
                      <video src={output} controls className="w-full max-h-[600px] rounded-[3rem] border border-white/10 shadow-2xl" />
                    )}
                    {outputType === 'audio' && (
                      <div className="p-20 flex flex-col items-center gap-10">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-900/40 animate-pulse">
                           <Volume2 size={40} />
                        </div>
                        <audio src={output} controls className="w-full max-w-lg custom-audio" />
                      </div>
                    )}
                    {outputType === 'text' && (
                      <div className="w-full space-y-10">
                         <div className="prose prose-invert prose-lg max-w-none font-medium leading-relaxed bg-slate-950/50 p-10 rounded-[3rem] border border-white/5 shadow-inner">
                            {output}
                         </div>
                         {groundingUrls.length > 0 && (
                           <div className="space-y-6">
                              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">External Evidence Grounds</h4>
                              <div className="grid sm:grid-cols-2 gap-4">
                                 {groundingUrls.map((url, idx) => (
                                   <a key={idx} href={url.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-slate-900 border border-white/5 rounded-2xl hover:bg-white/5 transition-all group/link shadow-xl">
                                      <Globe size={16} className="text-slate-500 group-hover/link:text-indigo-400 transition-colors" />
                                      <div className="truncate flex-grow">
                                         <div className="text-[10px] font-black text-white uppercase tracking-tight">{url.title || "External Source"}</div>
                                         <div className="text-[8px] text-slate-500 truncate">{url.uri}</div>
                                      </div>
                                   </a>
                                 ))}
                              </div>
                           </div>
                         )}
                      </div>
                    )}
                 </div>
               )}
            </div>

            {/* Prompt Command Hub */}
            <div className="bg-slate-900 rounded-[3.5rem] p-10 border border-white/5 shadow-2xl relative">
               <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
               
               {/* Context Chips Layer */}
               <div className="flex flex-wrap gap-4 mb-8">
                 <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} /> PROTOCOL: {activeFeature.toUpperCase()}
                 </div>
                 {selectedFile && (
                   <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-left-2">
                      <FileText size={12} /> {selectedFile.name.toUpperCase()}
                      <button onClick={removeSelectedFile} className="hover:text-white transition-colors">
                        <X size={14} />
                      </button>
                   </div>
                 )}
                 {isRecording && (
                   <div className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-3 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span> SAMPLING AUDIO...
                   </div>
                 )}
               </div>

               <div className="relative flex items-center gap-6">
                 {/* Attachment Trigger */}
                 {(activeFeature === 'edit' || activeFeature === 'analysis' || activeFeature === 'video' || activeFeature === 'wireframe') && (
                   <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 bg-slate-950 border border-white/10 rounded-[2rem] text-slate-500 hover:text-white transition-all shadow-inner group/attach"
                   >
                     <Paperclip size={24} className="group-hover/attach:rotate-12 transition-transform" />
                   </button>
                 )}
                 
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   onChange={handleFileChange} 
                   className="hidden" 
                   accept="image/*,video/*,application/pdf,text/plain"
                 />

                 <div className="flex-grow relative">
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleGenerate())}
                      placeholder={
                        activeFeature === 'generate' ? "Define visual brand concepts (e.g., A neon minimal logo for a tech hub)..." :
                        activeFeature === 'edit' ? "Instruct the retouch engine (e.g., Adjust lighting and add corporate glass textures)..." :
                        activeFeature === 'video' ? "Describe motion sequences for your business assets..." :
                        activeFeature === 'tts' ? "Enter corporate copy to synthesize into vocal profiles..." :
                        "Define your objective or ask for architectural analysis..."
                      }
                      className="w-full bg-slate-950 border border-white/10 rounded-[2.5rem] px-8 py-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium transition-all shadow-inner placeholder:text-slate-800 resize-none h-[72px] flex items-center pt-6"
                      disabled={isProcessing}
                    />
                    
                    <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${isRecording ? 'bg-rose-500 text-white' : 'text-slate-700 hover:text-indigo-400'}`}
                    >
                       <Mic size={18} />
                    </button>
                 </div>

                 <button 
                   onClick={handleGenerate}
                   disabled={isProcessing || (!prompt && !selectedFile)}
                   className="p-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:opacity-50 text-white rounded-[2rem] transition-all shadow-2xl shadow-indigo-900/30 active:scale-95 group/send"
                 >
                   <Send size={24} className="group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform" />
                 </button>
               </div>

               <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 px-4">
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-[9px] font-black text-slate-700 uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-emerald-500" /> Secure Protocol
                     </div>
                     <div className="flex items-center gap-2 text-[9px] font-black text-slate-700 uppercase tracking-widest">
                        <Activity size={14} className="text-indigo-500" /> Low Latency Node
                     </div>
                  </div>
                  <div className="text-[9px] font-black text-slate-700 uppercase tracking-widest">
                    MARVETTI STUDIO v2.5 // PROTOTYPE LAYER
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes studio-loading {
          0% { transform: scaleX(0); opacity: 0.5; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0.5; }
        }
        .custom-audio::-webkit-media-controls-panel {
          background-color: #0f172a;
        }
        .custom-audio::-webkit-media-controls-current-time-display,
        .custom-audio::-webkit-media-controls-time-remaining-display {
          color: white;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 10px;
        }
        .prose pre {
          background: #020617 !important;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1.5rem;
          padding: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default AIStudio;

const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);
