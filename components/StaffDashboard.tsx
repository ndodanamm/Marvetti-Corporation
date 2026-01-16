
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
  Video, 
  Database, 
  Table, 
  Cpu, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  Activity, 
  Box, 
  Layout, 
  ShoppingCart, 
  Megaphone, 
  Brain, 
  GraduationCap, 
  Headset, 
  CheckCircle2, 
  Briefcase, 
  Cloud, 
  ShieldAlert, 
  Search, 
  Code, 
  FileCode, 
  Layers, 
  Target,
  Palette,
  ArrowLeft,
  User as UserIcon
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
}

const serviceCatalogContext = SERVICES_DATA.map(s => {
  const packages = s.packages.map(p => `${p.name}: ${p.price}`).join(", ");
  return `Vertical: ${s.title} (Starting at ${s.startingPrice}). Description: ${s.shortDescription}. Tiers: ${packages}.`;
}).join("\n");

const ROBOTS: RobotMeta[] = [
  {
    id: 'ava',
    name: 'AVA',
    role: 'Administrative Operations Lead',
    icon: <Briefcase size={24} />,
    color: 'text-blue-400',
    description: 'Senior-level virtual administration and workflow structuring.',
    skills: ['SOP Design', 'Project Coordination', 'Document Indexing'],
    tasks: ['Build Project Plan', 'Index Corporate Drive', 'SOP Drafting'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Final Statement of Work (SOW) or Standard Operating Procedure (SOP).',
    instruction: `ACT AS: Senior Operations Consultant. Produce FINAL implementation-ready SOPs or SOWs.
      SEQUENCE: 
      1. Analyze scope. 2. Verify dependencies (Search). 3. Draft milestones. 4. Finalize SOW.`
  },
  {
    id: 'clara',
    name: 'CLARA',
    role: 'Cloud Architecture Engineer',
    icon: <Cloud size={24} />,
    color: 'text-indigo-400',
    description: 'Security-first cloud scaling and automation protocols.',
    skills: ['AWS Architecture', 'Make/Zapier Automations', 'POPIA Compliance'],
    tasks: ['Design Cloud Hierarchy', 'Build Automation Logic', 'Security Audit'],
    preferredTools: ['googleSearch'],
    outputFormat: 'System Architecture Map or Automation Blueprint (Code/JSON).',
    instruction: `ACT AS: Lead Cloud Engineer. Produce FINAL production-ready automation logic. 
      SEQUENCE: 
      1. Map data flow. 2. Select API tools (Search). 3. Write integration logic. 4. Verify compliance.`
  },
  {
    id: 'brandon',
    name: 'BRANDON',
    role: 'Brand Identity Architect',
    icon: <Palette size={24} />,
    color: 'text-rose-400',
    description: 'Corporate voice, high-impact messaging, and brand guidelines.',
    skills: ['Brand Strategy', 'Copywriting', 'Design Logic'],
    tasks: ['Define Brand Voice', 'Write Website Copy', 'Brand Manual Design'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Comprehensive Brand Style Guide or Conversion Copy Sets.',
    instruction: `ACT AS: Senior Creative Director. Produce FINAL brand pillars or copy sets.
      SEQUENCE: 
      1. Audience research (Search). 2. Persona mapping. 3. Voice definition. 4. Final copy delivery.`
  },
  {
    id: 'wes',
    name: 'WES',
    role: 'UX/UI Logic Specialist',
    icon: <Layout size={24} />,
    color: 'text-cyan-400',
    description: 'Information hierarchy and conversion architecture.',
    skills: ['UX Mapping', 'Wireframing', 'Landing Page Repair'],
    tasks: ['Design Site Map', 'User Journey Audit', 'CTA Strategy'],
    preferredTools: ['googleSearch'],
    outputFormat: 'UI Component Library or Full Sitemap Wireframe Schema.',
    instruction: `ACT AS: Website Architect. Produce FINAL wireframe logic and UX maps.
      SEQUENCE: 
      1. Competitor UI audit (Search). 2. Flow mapping. 3. CTA placement. 4. Final Wireframe structure.`
  },
  {
    id: 'ella',
    name: 'ELLA',
    role: 'E-Commerce Ops Director',
    icon: <ShoppingCart size={24} />,
    color: 'text-emerald-400',
    description: 'Inventory pipelines and payment gateway logic.',
    skills: ['Product Logistics', 'Shopify/Woo Scaling', 'Payment Integrity'],
    tasks: ['Product Category Logic', 'Inventory Sync Plan', 'Gateway Setup Docs'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Store Backend Config Map or Inventory CSV Structure.',
    instruction: `ACT AS: E-Com Manager. Produce FINAL product-catalog structures or logic.`
  },
  {
    id: 'marcus',
    name: 'MARCUS',
    role: 'Growth Marketing Lead',
    icon: <Megaphone size={24} />,
    color: 'text-amber-400',
    description: 'High-ROI digital strategy and ad framework design.',
    skills: ['SEM/SMM Strategy', 'Funnel Architecture', 'Ad Copy'],
    tasks: ['Campaign Roadmap', 'Funnel Visualization', 'Budgeting'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Marketing Campaign Blueprint or Funnel Strategy Doc.',
    instruction: `ACT AS: Performance Strategist. Produce FINAL growth plans.`
  },
  {
    id: 'dara',
    name: 'DARA',
    role: 'Business Intelligence Analyst',
    icon: <Brain size={24} />,
    color: 'text-purple-400',
    description: 'Turning raw data into actionable boardroom insights.',
    skills: ['Data Modeling', 'PowerBI Strategy', 'Trend Forecasting'],
    tasks: ['Data Schema Design', 'Insight Summary', 'Risk Model'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Data Strategy Report or Dashboard Schema Description.',
    instruction: `ACT AS: Lead Data Scientist. Produce FINAL insight frameworks.`
  },
  {
    id: 'tina',
    name: 'TINA',
    role: 'Digital Learning Lead',
    icon: <GraduationCap size={24} />,
    color: 'text-sky-400',
    description: 'Soft-skills upskilling and corporate onboarding protocols.',
    skills: ['Instructional Design', 'Pedagogy', 'Skill Assessment'],
    tasks: ['Create Training Module', 'User Manual', 'Skills Gap Analysis'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Complete Training Syllabus or Onboarding Workflow.',
    instruction: `ACT AS: Upskilling Strategist. Produce FINAL training materials.`
  },
  {
    id: 'cxo',
    name: 'CXO',
    role: 'Customer Experience Optimizer',
    icon: <Headset size={24} />,
    color: 'text-slate-400',
    description: 'Support desk workflows and client relations protocols.',
    skills: ['Journey Mapping', 'Escalation Logic', 'Response Tone'],
    tasks: ['Support Script Set', 'Escalation Framework', 'Ticketing Flow'],
    preferredTools: ['googleSearch'],
    outputFormat: 'Customer Service Standard manual or Response Template sets.',
    instruction: `ACT AS: CX Director. Produce FINAL service standards.`
  }
];

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('intelligence');
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>(MOCK_LEADS);
  const [robotInput, setRobotInput] = useState('');
  const [robotChat, setRobotChat] = useState<{role: 'user' | 'bot', text: string, grounding?: any[]}[]>([]);
  const [isRobotLoading, setIsRobotLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync with localStorage for any "pushed" orders
    const storedLeadsRaw = localStorage.getItem('marvetti_leads');
    if (storedLeadsRaw) {
      const storedLeads: LeadRecord[] = JSON.parse(storedLeadsRaw);
      // Merge unique leads by ID
      const merged = [...storedLeads, ...MOCK_LEADS].filter(
        (v, i, a) => a.findIndex(t => t.id === v.id) === i
      );
      setLeads(merged);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [robotChat]);

  const selectedRobot = ROBOTS.find(r => r.id === selectedRobotId);

  const runRobotTask = async () => {
    if (!robotInput.trim() || !selectedRobot || isRobotLoading) return;
    
    const promptText = robotInput;
    setRobotChat(prev => [...prev, { role: 'user', text: promptText }]);
    setRobotInput('');
    setIsRobotLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemContext = `
        INTERNAL AGENT IDENTITY: ${selectedRobot.name} // ${selectedRobot.role}
        
        PRODUCTION GOAL: Generate a ${selectedRobot.outputFormat}. 
        This is a FINAL output for Marvetti Corp clients.
        
        INTERNAL BUSINESS CONTEXT:
        ${serviceCatalogContext}

        AGENCY GUIDELINES:
        - NEVER mention you are an AI or bot.
        - Tone: Senior Digital Strategist, Calm, Objective-focused.
        - Style: High-density intelligence, Markdown formatted, Implementation-ready.
        - Grounding: Use Google Search to find real tools, pricing, or competitor data if relevant to the request.
        
        ${selectedRobot.instruction}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: promptText,
        config: {
          systemInstruction: systemContext,
          temperature: 0.4,
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }]
        }
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const botResponse = response.text || "Interface Fault. Re-calculating logic path...";
      
      setRobotChat(prev => [...prev, { 
        role: 'bot', 
        text: botResponse,
        grounding: groundingChunks
      }]);
    } catch (error) {
      console.error(error);
      setRobotChat(prev => [...prev, { role: 'bot', text: "Operational Error: Intelligence link severed." }]);
    } finally {
      setIsRobotLoading(false);
    }
  };

  const WORKSPACE_TOOLS = [
    { name: 'Ops Hub', icon: <Mail size={24} />, desc: 'Core communications layer.', link: 'https://mail.google.com' },
    { name: 'Infrastructure Drive', icon: <Database size={24} />, desc: 'Master asset storage.', link: 'https://drive.google.com' },
    { name: 'Milestone Calendar', icon: <Calendar size={24} />, desc: 'Project timelines.', link: 'https://calendar.google.com' },
    { name: 'Nexus Sheets', icon: <Table size={24} />, desc: 'Lead and revenue monitoring.', link: 'https://sheets.google.com' },
    { name: 'Ops Console', icon: <Terminal size={24} />, desc: 'Direct internal API tools.', link: '#' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-inter flex animate-in fade-in duration-700">
      {/* Side Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-8 flex flex-col fixed h-screen z-50 shadow-2xl">
        <div className="mb-12">
          <div className="text-xl font-black text-white tracking-tighter uppercase mb-2">
            MARVETTI <span className="text-indigo-500">INTERNAL</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg w-fit">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">v6.2 Deep Mind Active</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'intelligence', label: 'Reasoning Agents', icon: <Cpu size={18} /> },
            { id: 'leads', label: 'Revenue Pipeline', icon: <Users size={18} /> },
            { id: 'workspace', label: 'Ops Control', icon: <Globe size={18} /> },
            { id: 'analytics', label: 'Verticals', icon: <BarChart3 size={18} /> }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id as TabType); setSelectedRobotId(null); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 ring-1 ring-white/10' : 'hover:bg-slate-800 text-slate-500 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-auto border-t border-slate-800 space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-white/5 shadow-inner">
             <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                <Terminal size={18} />
             </div>
             <div>
                <div className="text-[10px] font-black text-white uppercase tracking-tight">{user.name}</div>
                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{user.role} // access_lvl_5</div>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-72 p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
              {activeTab === 'leads' ? 'Pipeline Control' : activeTab === 'workspace' ? 'Operational Hub' : activeTab === 'analytics' ? 'Boardroom Data' : 'Deep Reasoning Agents'}
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
               <Activity size={14} className="text-indigo-500" /> Operational Status: 32K Thinking Path Enabled
            </p>
          </div>
          <div className="flex gap-4">
            <button className="relative p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all shadow-xl">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <button className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all shadow-xl">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Reasoning Agents Tab */}
        {activeTab === 'intelligence' && (
          <div className="animate-in fade-in duration-500">
            {!selectedRobotId ? (
              <div className="space-y-12">
                <div className="bg-slate-900 p-12 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Cpu size={250} className="text-white" />
                   </div>
                   <div className="max-w-xl relative z-10">
                      <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Internal Intelligence Core</h3>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        9 specialized Senior Agents ready for deep objective reasoning. These agents use Gemini 3 Pro with high-density thinking to produce FINAL implementation-ready deliverables.
                      </p>
                   </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {ROBOTS.map((robot) => (
                    <button
                      key={robot.id}
                      onClick={() => { setSelectedRobotId(robot.id); setRobotChat([]); }}
                      className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 hover:border-indigo-500 transition-all hover:bg-slate-800/50 flex flex-col items-start text-left group shadow-xl hover:-translate-y-2 duration-500"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center ${robot.color} group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all mb-8 shadow-sm group-hover:scale-110 duration-500`}>
                        {robot.icon}
                      </div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-indigo-400 transition-colors">{robot.name}</h4>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">{robot.role}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow line-clamp-3">
                        {robot.description}
                      </p>
                      <div className="mt-8 pt-8 border-t border-white/5 w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-400 transition-all">
                        <span className="flex items-center gap-2"><Zap size={12} className="text-indigo-500" /> Reasoning Active</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-10 h-[calc(100vh-280px)]">
                {/* Agent Profile Sidebar */}
                <div className="lg:col-span-1 bg-slate-900 border border-white/5 rounded-[4rem] p-12 flex flex-col animate-in slide-in-from-left-4 duration-700 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <button 
                    onClick={() => setSelectedRobotId(null)}
                    className="mb-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={16} /> Reasoning Network
                  </button>
                  
                  <div className={`w-24 h-24 rounded-[2.5rem] bg-slate-950 border border-white/10 flex items-center justify-center ${selectedRobot?.color} mb-10 shadow-2xl ring-1 ring-white/5`}>
                    {selectedRobot?.icon}
                  </div>
                  
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">{selectedRobot?.name}</h2>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-12">{selectedRobot?.role}</p>
                  
                  <div className="space-y-10 overflow-y-auto pr-4 scrollbar-hide flex-grow">
                    <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 shadow-inner">
                      <div className="flex items-center gap-2 mb-3">
                        <Target size={14} className="text-indigo-400" />
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Logic Engine</span>
                      </div>
                      <div className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        32K Reasoning Path Active
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5">Production Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRobot?.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-slate-800/50 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest border border-white/5 shadow-sm">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5">Grounding Protocol</h4>
                      <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 shadow-inner space-y-4">
                         <div className="flex items-center gap-3">
                            <Search size={14} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase text-white tracking-tight">Global Search Grounding</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Layers size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-black uppercase text-white tracking-tight">Marvetti Catalog Logic</span>
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-4 p-5 bg-slate-950 rounded-[2rem] border border-white/5 shadow-inner">
                      <ShieldCheck size={22} className="text-indigo-400" />
                      <div>
                        <div className="text-[10px] font-black text-white uppercase tracking-widest">Secure Production</div>
                        <div className="text-[8px] text-slate-500 uppercase font-black tracking-widest">POPIA / GDPR Compliant Layer</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasoning interaction Hub */}
                <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-[4rem] flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-700 shadow-2xl">
                  {/* Reasoning Display */}
                  <div className="flex-grow p-12 overflow-y-auto space-y-10 scroll-smooth scrollbar-hide bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.02),transparent)]">
                    {robotChat.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-12">
                        <div className="w-20 h-20 rounded-[2rem] bg-slate-800 border border-white/5 flex items-center justify-center text-slate-700 mb-8 shadow-inner ring-1 ring-white/5">
                          <Terminal size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-500 uppercase tracking-widest mb-4">Neural Link Established</h3>
                        <p className="text-xs text-slate-600 max-w-sm font-medium leading-relaxed uppercase tracking-tighter">
                          Define the objective to begin the 32K deep thinking sequence for this agent.
                        </p>
                      </div>
                    ) : (
                      robotChat.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                          <div className={`max-w-[90%] p-8 rounded-[3rem] text-sm leading-relaxed shadow-2xl ${
                            msg.role === 'user' 
                              ? 'bg-indigo-600 text-white rounded-tr-none ring-1 ring-white/20' 
                              : 'bg-slate-800 text-slate-300 rounded-tl-none border border-white/5 shadow-indigo-900/10'
                          }`}>
                            <div className="flex items-center gap-3 mb-6 opacity-40">
                              {msg.role === 'bot' ? <Cpu size={14} /> : <UserIcon size={14} />}
                              <span className="text-[9px] font-black uppercase tracking-widest">
                                {msg.role === 'bot' ? `${selectedRobot?.name} // Senior Output` : 'Staff Command Input'}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap font-medium prose prose-invert prose-sm max-w-none">
                              {msg.text}
                            </div>
                            {msg.grounding && (
                              <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 block">Grounding Resources (External Intelligence)</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {msg.grounding.map((chunk: any, ci: number) => chunk.web && (
                                    <a key={ci} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-950/50 border border-white/5 rounded-2xl text-[10px] text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all group/link">
                                      <Globe size={14} className="group-hover/link:animate-pulse" /> 
                                      <span className="truncate">{chunk.web.title || "External Intelligence Doc"}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    {isRobotLoading && (
                      <div className="flex justify-start animate-pulse">
                        <div className="bg-slate-800 p-8 rounded-[3rem] rounded-tl-none border border-white/5 flex flex-col gap-6 shadow-2xl ring-1 ring-white/5">
                          <div className="flex items-center gap-4">
                            <RefreshCw size={20} className="text-indigo-400 animate-spin" />
                            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em]">Processing deep mind path...</span>
                          </div>
                          <div className="h-1.5 w-64 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                             <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] w-full origin-left animate-[loading-bar_4s_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Layer */}
                  <div className="p-10 bg-slate-950/50 border-t border-white/5 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                    <div className="relative flex items-center gap-6">
                      <input 
                        type="text" 
                        value={robotInput}
                        onChange={(e) => setRobotInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runRobotTask()}
                        placeholder={`Brief ${selectedRobot?.name} on objective...`}
                        className="flex-grow bg-slate-900 border border-white/5 rounded-[2rem] px-8 py-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium transition-all shadow-inner placeholder:text-slate-800"
                        disabled={isRobotLoading}
                      />
                      <button 
                        onClick={runRobotTask}
                        disabled={isRobotLoading || !robotInput.trim()}
                        className="p-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:opacity-50 text-white rounded-[2rem] transition-all shadow-2xl shadow-indigo-900/30 active:scale-95 group/send"
                      >
                        <Send size={24} className="group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform duration-300" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-6 px-4">
                       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-3">
                          <Activity size={12} className="text-indigo-500 animate-pulse" /> Logic Tunnel: DeepReasoning-v1-FinalOutput
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lead Management Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-10 animate-in fade-in duration-700">
             <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: 'Pending Response', value: leads.filter(l => l.status === 'New').length, color: 'text-indigo-400' },
                  { label: 'Active pipeline', value: leads.length, color: 'text-white' },
                  { label: 'Closure Matrix', value: '28%', color: 'text-emerald-400' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-500"><Target size={80} /></div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">{stat.label}</div>
                    <div className={`text-5xl font-black tracking-tighter ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
             </div>

             <div className="bg-slate-900 rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/30 border-b border-white/5">
                    <tr>
                      <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Lead Identity</th>
                      <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Target Pillar</th>
                      <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                      <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Ops Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors group">
                        <td className="px-10 py-8">
                          <div className="text-sm font-black text-white uppercase tracking-tight mb-1">{lead.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest">{lead.email}</div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{lead.service}</span>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-inner ${
                            lead.status === 'New' ? 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20' : 
                            lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20' : 
                            'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button className="p-3 rounded-2xl bg-slate-800 border border-white/5 text-slate-500 hover:text-white hover:bg-indigo-600 transition-all shadow-sm group-hover:scale-110">
                             <ArrowUpRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        )}

        {/* Workspace Tab */}
        {activeTab === 'workspace' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="bg-slate-900 p-16 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-16 opacity-5">
                  <Globe size={300} className="text-white" />
               </div>
               <div className="max-w-xl relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-6">Core Infrastructure Hub</h3>
                  <p className="text-slate-400 text-base font-medium leading-relaxed">
                    Marvetti Corp runs on a security-hardened Google Workspace ecosystem. Use these production tunnels to manage internal tasks and client deployments.
                  </p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {WORKSPACE_TOOLS.map((tool, idx) => (
                 <a 
                  key={idx}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-slate-900 p-12 rounded-[4rem] border border-white/5 hover:border-indigo-500 transition-all hover:bg-slate-800/50 flex flex-col shadow-2xl duration-500 hover:-translate-y-2"
                 >
                   <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all mb-10 shadow-inner group-hover:scale-110 duration-500">
                      {tool.icon}
                   </div>
                   <h4 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-indigo-400 transition-colors">{tool.name}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow">
                      {tool.desc}
                   </p>
                   <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-400">
                      Secure Entry <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                   </div>
                 </a>
               ))}
            </div>
          </div>
        )}
      </main>
      <style>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default StaffDashboard;
