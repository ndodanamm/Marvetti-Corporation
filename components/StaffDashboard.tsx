
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  ArrowUpRight, 
  Terminal, 
  LogOut, 
  Sparkles, 
  Zap, 
  FileText, 
  RefreshCw, 
  Globe, 
  Mail, 
  Calendar, 
  Database, 
  Table, 
  Cpu, 
  ShieldCheck, 
  Send, 
  Activity, 
  Layout, 
  ShoppingCart, 
  Megaphone, 
  Brain, 
  GraduationCap, 
  Headset, 
  Briefcase, 
  Cloud, 
  Search, 
  Target,
  Palette,
  ArrowLeft,
  User as UserIcon,
  Maximize,
  AlertTriangle,
  Key,
  Code,
  Image as ImageIcon
} from 'lucide-react';
import { MOCK_LEADS, SERVICES_DATA } from '../constants';
import { StaffUser, LeadRecord } from '../types';
import { GoogleGenAI } from "@google/genai";

interface StaffDashboardProps {
  user: StaffUser;
  onLogout: () => void;
}

type TabType = 'leads' | 'analytics' | 'intelligence' | 'workspace';

interface RobotMeta {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  skills: string[];
  tasks: string[];
  instruction: string;
  outputFormat: string;
  preferredTools: 'googleSearch'[];
  modality: 'text' | 'visual' | 'hybrid';
}

const serviceCatalogContext = SERVICES_DATA.map(s => {
  const packages = s.packages.map(p => `${p.name}: ${p.price}`).join(", ");
  return `Vertical: ${s.title} (Starting at ${s.startingPrice}). Description: ${s.shortDescription}. Tiers: ${packages}.`;
}).join("\n");

const ROBOTS: RobotMeta[] = [
  {
    id: 'ava',
    name: 'AVA',
    role: 'Operations Lead',
    icon: <Briefcase size={24} />,
    color: 'text-blue-400',
    description: 'Senior-level virtual administration and workflow structuring.',
    skills: ['SOP Design', 'Project Coordination', 'Document Indexing'],
    tasks: ['Build Project Plan', 'Index Corporate Drive', 'SOP Drafting'],
    preferredTools: ['googleSearch'],
    modality: 'text',
    outputFormat: 'Final Statement of Work (SOW) or Standard Operating Procedure (SOP).',
    instruction: `ACT AS: Senior Operations Consultant. Produce FINAL implementation-ready SOPs or SOWs.`
  },
  {
    id: 'clara',
    name: 'CLARA',
    role: 'Cloud Architect',
    icon: <Cloud size={24} />,
    color: 'text-indigo-400',
    description: 'Security-first cloud scaling and automation protocols.',
    skills: ['AWS Architecture', 'Make/Zapier Automations', 'POPIA Compliance'],
    tasks: ['Design Cloud Hierarchy', 'Build Automation Logic', 'Security Audit'],
    preferredTools: ['googleSearch'],
    modality: 'text',
    outputFormat: 'System Architecture Map or Automation Blueprint (Code/JSON).',
    instruction: `ACT AS: Lead Cloud Engineer. Produce FINAL production-ready automation logic.`
  },
  {
    id: 'brandon',
    name: 'BRANDON',
    role: 'Brand Architect',
    icon: <Palette size={24} />,
    color: 'text-rose-400',
    description: 'High-impact messaging and visual identity synthesis.',
    skills: ['Logo Generation', 'Brand Strategy', 'Visual Concepts'],
    tasks: ['Generate Logo', 'Define Brand Voice', 'Write Brand Guide'],
    preferredTools: ['googleSearch'],
    modality: 'hybrid',
    outputFormat: 'Visual Identity or Comprehensive Brand Style Guide.',
    instruction: `ACT AS: Senior Creative Director. If visual work is requested, use visual synthesis tools to produce the artifact.`
  },
  {
    id: 'wes',
    name: 'WES',
    role: 'UX/UI Specialist',
    icon: <Layout size={24} />,
    color: 'text-cyan-400',
    description: 'Information hierarchy and conversion architecture.',
    skills: ['UX Mapping', 'Interface Design', 'Website Wireframing'],
    tasks: ['Generate UI Mockup', 'Design Site Map', 'User Journey Audit'],
    preferredTools: ['googleSearch'],
    modality: 'hybrid',
    outputFormat: 'UI Mockup or Sitemap Wireframe Schema.',
    instruction: `ACT AS: Website Architect. Produce FINAL wireframe logic and visual UI concepts.`
  },
  {
    id: 'ella',
    name: 'ELLA',
    role: 'E-Commerce Ops',
    icon: <ShoppingCart size={24} />,
    color: 'text-emerald-400',
    description: 'Inventory pipelines and payment gateway logic.',
    skills: ['Product Logistics', 'Shopify Scaling', 'Payment Integrity'],
    tasks: ['Product Category Logic', 'Inventory Sync Plan', 'Gateway Setup Docs'],
    preferredTools: ['googleSearch'],
    modality: 'text',
    outputFormat: 'Store Backend Config Map or Inventory CSV Structure.',
    instruction: `ACT AS: E-Com Manager. Produce FINAL product-catalog structures or logic.`
  }
];

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('intelligence');
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>(MOCK_LEADS);
  const [robotInput, setRobotInput] = useState('');
  const [robotChat, setRobotChat] = useState<{role: 'user' | 'bot', text: string, type: 'text' | 'image', grounding?: any[]}[]>([]);
  const [isRobotLoading, setIsRobotLoading] = useState(false);
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [robotChat, isRobotLoading]);

  const selectedRobot = ROBOTS.find(r => r.id === selectedRobotId);

  const fixPermissionFault = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setPermissionError(false);
    }
  };

  const runRobotTask = async () => {
    if (!robotInput.trim() || !selectedRobot || isRobotLoading) return;
    
    const promptText = robotInput;
    setRobotChat(prev => [...prev, { role: 'user', text: promptText, type: 'text' }]);
    setRobotInput('');
    setIsRobotLoading(true);
    setPermissionError(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const isActualWorkIntent = (selectedRobot.modality === 'hybrid') && (
        promptText.toLowerCase().includes('logo') || 
        promptText.toLowerCase().includes('design') || 
        promptText.toLowerCase().includes('website') ||
        promptText.toLowerCase().includes('ui') ||
        promptText.toLowerCase().includes('draw') ||
        promptText.toLowerCase().includes('generate')
      );

      if (isActualWorkIntent) {
        // ACTUAL WORK: Use High-Resolution Visual Synthesis
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: `MARVETTI CORE PRODUCTION: ${promptText}. Style: Corporate, Elite, Clean, High-fidelity.` }] },
          config: {
            imageConfig: { aspectRatio: '1:1', imageSize: '1K' }
          }
        });

        let workFound = false;
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const workUrl = `data:image/png;base64,${part.inlineData.data}`;
            setRobotChat(prev => [...prev, { role: 'bot', text: workUrl, type: 'image' }]);
            workFound = true;
          }
        }
        if (!workFound) {
          setRobotChat(prev => [...prev, { role: 'bot', text: response.text || "Work logic completed. Visual rendering buffered but not sent.", type: 'text' }]);
        }
      } else {
        // STRATEGIC REASONING: Use Thinking Model
        const systemContext = `
          IDENTITY: ${selectedRobot.name} // ${selectedRobot.role}
          OBJECTIVE: Deliver production-ready solutions for Marvetti Corp clients.
          CONTEXT: ${serviceCatalogContext}
          ${selectedRobot.instruction}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: promptText,
          config: {
            systemInstruction: systemContext,
            thinkingConfig: { thinkingBudget: 32768 },
            tools: [{ googleSearch: {} }]
          }
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        setRobotChat(prev => [...prev, { 
          role: 'bot', 
          text: response.text || "Transmission error in reasoning core.", 
          type: 'text',
          grounding: groundingChunks
        }]);
      }
    } catch (error: any) {
      console.error("Staff Robot Error:", error);
      if (error.message?.includes("PERMISSION_DENIED") || error.message?.includes("403")) {
        setPermissionError(true);
        setRobotChat(prev => [...prev, { role: 'bot', text: "SECURITY PROTOCOL ALERT: 403 Permission Denied. Your current API node does not have authorization for this production layer. Please click the Fix Permissions button above.", type: 'text' }]);
      } else {
        setRobotChat(prev => [...prev, { role: 'bot', text: `Intelligence Severed: ${error.message}`, type: 'text' }]);
      }
    } finally {
      setIsRobotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-inter flex animate-in fade-in duration-700">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-8 flex flex-col fixed h-screen z-50">
        <div className="mb-12">
          <div className="text-xl font-black text-white tracking-tighter uppercase mb-2">
            MARVETTI <span className="text-indigo-500">INTERNAL</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg w-fit">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">v1.0 Core Active</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'intelligence', label: 'Work Robots', icon: <Cpu size={18} /> },
            { id: 'leads', label: 'Lead Nexus', icon: <Users size={18} /> },
            { id: 'workspace', label: 'Ops Control', icon: <Globe size={18} /> }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id as TabType); setSelectedRobotId(null); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-2xl' : 'hover:bg-slate-800 text-slate-500'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-auto border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">{activeTab} Node</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
               <Activity size={14} className="text-indigo-500" /> Operational Status: Systems Prime
            </p>
          </div>
          
          <div className="flex gap-4">
             {permissionError && (
               <button 
                onClick={fixPermissionFault}
                className="flex items-center gap-3 px-6 py-3 bg-amber-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl animate-pulse"
               >
                 <Key size={14} /> Fix Permissions
               </button>
             )}
             <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                <Bell size={20} />
             </div>
          </div>
        </header>

        {activeTab === 'intelligence' && (
          <div className="animate-in fade-in duration-500">
            {!selectedRobotId ? (
              <div className="grid md:grid-cols-3 gap-8">
                {ROBOTS.map((robot) => (
                  <button
                    key={robot.id}
                    onClick={() => { setSelectedRobotId(robot.id); setRobotChat([]); }}
                    className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 hover:border-indigo-500 transition-all flex flex-col items-start group shadow-xl"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center ${robot.color} mb-8 shadow-sm group-hover:scale-110 duration-500`}>
                      {robot.icon}
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">{robot.name}</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">{robot.role}</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{robot.description}</p>
                    <div className="mt-8 pt-8 border-t border-white/5 w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                      <span>Begin Workflow</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-10 h-[calc(100vh-280px)]">
                {/* Robot Profile */}
                <div className="lg:col-span-1 bg-slate-900 border border-white/5 rounded-[3rem] p-10 flex flex-col shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <button 
                    onClick={() => setSelectedRobotId(null)}
                    className="mb-8 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={14} /> Operations Mesh
                  </button>
                  
                  <div className={`w-20 h-20 rounded-[1.5rem] bg-slate-950 flex items-center justify-center ${selectedRobot?.color} mb-8 shadow-2xl`}>
                    {selectedRobot?.icon}
                  </div>
                  
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">{selectedRobot?.name}</h2>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10">{selectedRobot?.role}</p>
                  
                  <div className="space-y-8 flex-grow overflow-y-auto pr-2 scrollbar-hide">
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                      <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Production Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRobot?.skills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 bg-slate-800 rounded-lg text-[9px] font-black text-slate-300 uppercase">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                       <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Data Integrity</h4>
                       <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold">
                          <ShieldCheck size={14} /> End-to-End Encrypted
                       </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Terminal */}
                <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl relative">
                  <div className="flex-grow p-10 overflow-y-auto space-y-8 scrollbar-hide">
                    {robotChat.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <Terminal size={48} className="text-slate-800 mb-6" />
                        <h3 className="text-xl font-black text-slate-600 uppercase tracking-widest">Neural Link Open</h3>
                        <p className="text-[10px] text-slate-700 max-w-xs mt-2 uppercase tracking-tighter font-black">Brief the agent on the current production objective.</p>
                      </div>
                    ) : (
                      robotChat.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
                          <div className={`max-w-[90%] p-8 rounded-[2.5rem] ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none border border-white/5'}`}>
                            {msg.type === 'image' ? (
                               <div className="space-y-4">
                                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-50 mb-2">
                                     <ImageIcon size={12} /> Production Artifact Generated
                                  </div>
                                  <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-950 p-2">
                                     <img src={msg.text} className="w-full h-auto" alt="Production Output" />
                                     <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button onClick={() => window.open(msg.text, '_blank')} className="p-4 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><Maximize size={16} /> Expand Asset</button>
                                     </div>
                                  </div>
                               </div>
                            ) : (
                               <div className="prose prose-invert prose-sm max-w-none font-medium leading-relaxed whitespace-pre-wrap">
                                 {msg.text}
                               </div>
                            )}
                            {msg.grounding && (
                               <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {msg.grounding.map((g:any, gi:number) => g.web && (
                                    <a key={gi} href={g.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-xl text-[9px] text-slate-500 hover:text-indigo-400 transition-all truncate border border-white/5">
                                       <Globe size={12} /> {g.web.title || "External Reference"}
                                    </a>
                                  ))}
                               </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    {isRobotLoading && (
                      <div className="flex justify-start animate-pulse">
                        <div className="bg-slate-800 p-6 rounded-[2.5rem] rounded-tl-none border border-white/5 flex flex-col gap-4">
                           <div className="flex items-center gap-3">
                              <RefreshCw size={18} className="text-indigo-400 animate-spin" />
                              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Analyzing Logic Path...</span>
                           </div>
                           <div className="h-1 w-48 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 w-full origin-left animate-[robot-load_3s_infinite]"></div>
                           </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-8 bg-slate-950/50 border-t border-white/5">
                    <div className="relative flex items-center gap-4">
                      <input 
                        type="text" 
                        value={robotInput}
                        onChange={(e) => setRobotInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runRobotTask()}
                        placeholder={`Instruct ${selectedRobot?.name}... (e.g. "Draft a website UI concept")`}
                        className="flex-grow bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder:text-slate-800 font-bold"
                        disabled={isRobotLoading}
                      />
                      <button 
                        onClick={runRobotTask}
                        disabled={isRobotLoading || !robotInput.trim()}
                        className="p-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white rounded-2xl transition-all shadow-xl shadow-indigo-900/20"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lead Nexus View */}
        {activeTab === 'leads' && (
          <div className="bg-slate-900 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl animate-in fade-in duration-700">
             <table className="w-full text-left">
                <thead className="bg-slate-800/50 border-b border-white/5">
                   <tr>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Inquiry Path</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Identity</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status Matrix</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {leads.map(lead => (
                     <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6">
                           <div className="text-[10px] font-black text-indigo-400 uppercase tracking-tight">{lead.service}</div>
                           <div className="text-[8px] text-slate-600 uppercase mt-1">{lead.timestamp.split('T')[0]}</div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="text-xs font-black text-white uppercase">{lead.name}</div>
                           <div className="text-[9px] text-slate-500 font-bold mt-0.5">{lead.email}</div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${lead.status === 'New' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                             {lead.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-2.5 rounded-xl bg-slate-800 border border-white/5 text-slate-500 hover:text-white transition-all"><ArrowUpRight size={16} /></button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </main>
      <style>{`
        @keyframes robot-load {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default StaffDashboard;
