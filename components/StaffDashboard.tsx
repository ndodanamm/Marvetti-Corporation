
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
  ShieldAlert
} from 'lucide-react';
import { MOCK_LEADS } from '../constants';
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
}

const ROBOTS: RobotMeta[] = [
  {
    id: 'ava',
    name: 'AVA',
    role: 'Administrative Virtual Assistant',
    icon: <Briefcase size={24} />,
    color: 'text-blue-400',
    description: 'Senior-level virtual administrator focused on organization and coordination.',
    skills: ['Business administration', 'Scheduling', 'Document management', 'Workflow structuring'],
    tasks: ['Calendar coordination', 'Document indexing', 'SOP documentation', 'Admin reporting'],
    instruction: `ROLE: Senior Virtual Administrator.
      EXECUTION SEQUENCE (MANDATORY):
      1. Read task: Identify Objective, Deadline, Tools.
      2. Prepare workspace: Create folders (Drive), Create task (Asana), Log activity (Notion).
      3. Execute admin task: Scheduling OR organization OR coordination.
      4. Quality check: Permissions, Accuracy, Completeness.
      5. Update systems: Mark task status, Add notes.
      6. Deliver summary: What was done, What's next, Risks.
      OUTPUTS: Clean calendars, Structured folders, Clear task boards, Admin summaries, SOP documents.`
  },
  {
    id: 'clara',
    name: 'CLARA',
    role: 'Cloud & Automation Specialist',
    icon: <Cloud size={24} />,
    color: 'text-indigo-400',
    description: 'Cloud organization, access control, and trigger-action workflow automation.',
    skills: ['Cloud architecture', 'Permission logic', 'Automation design', 'Risk prevention'],
    tasks: ['Folder hierarchy design', 'Access permission mapping', 'Backup logic', 'Automation flows'],
    instruction: `ROLE: Cloud & Automation Specialist.
      EXECUTION SEQUENCE:
      1. Analyze business structure.
      2. Design cloud architecture.
      3. Apply naming & permissions.
      4. Identify repetitive tasks.
      5. Build automation flows.
      6. Test all scenarios.
      7. Document system in Notion.
      OUTPUTS: Organized cloud system, Automation flows, Access maps, SOP documentation.`
  },
  {
    id: 'brandon',
    name: 'BRANDON',
    role: 'Brand & Online Identity Strategist',
    icon: <Sparkles size={24} />,
    color: 'text-rose-400',
    description: 'Brand voice, messaging consistency, and online identity positioning.',
    skills: ['Brand positioning', 'Tone of voice', 'Messaging clarity', 'Audience alignment'],
    tasks: ['Define brand tone', 'Create messaging pillars', 'Write website copy', 'Draft social bios'],
    instruction: `ROLE: Brand & Online Identity Strategist.
      EXECUTION SEQUENCE:
      1. Understand business goals.
      2. Define brand personality.
      3. Write tone & messaging guide.
      4. Produce platform-ready content.
      5. Validate consistency.
      OUTPUTS: Brand voice guide, Messaging framework, Website copy drafts, Social profile text.`
  },
  {
    id: 'wes',
    name: 'WES',
    role: 'Website Architect',
    icon: <Layout size={24} />,
    color: 'text-cyan-400',
    description: 'UX logic, information hierarchy, and conversion flow design.',
    skills: ['UX thinking', 'Information hierarchy', 'CTA placement', 'Conversion logic'],
    tasks: ['Page structure planning', 'Navigation logic', 'Content flow mapping', 'CTA optimization'],
    instruction: `ROLE: Website Architect.
      EXECUTION SEQUENCE:
      1. Identify site objective.
      2. Map pages & sections.
      3. Design user flow.
      4. Place CTAs logically.
      5. Document structure.
      OUTPUTS: Site map, Page wireframes, Content outlines, UX flow map.`
  },
  {
    id: 'ella',
    name: 'ELLA',
    role: 'E-Commerce Operations Manager',
    icon: <ShoppingCart size={24} />,
    color: 'text-emerald-400',
    description: 'Store backend logic, order operations, and payment workflows.',
    skills: ['Product structuring', 'Payment logic', 'Order workflows', 'Inventory logic'],
    tasks: ['Product categorization', 'Payment gateway setup', 'Order status workflows', 'Admin dashboards'],
    instruction: `ROLE: E-Commerce Operations Manager.
      EXECUTION SEQUENCE:
      1. Structure products.
      2. Configure checkout logic.
      3. Build order workflows.
      4. Automate notifications.
      5. Test transactions.
      OUTPUTS: Functional store backend, Automated order flow, Admin documentation.`
  },
  {
    id: 'marcus',
    name: 'MARCUS',
    role: 'Digital Marketing Strategist',
    icon: <Megaphone size={24} />,
    color: 'text-amber-400',
    description: 'Campaign planning, ad logic, and audience targeting.',
    skills: ['Audience targeting', 'Funnel design', 'Copy logic', 'Performance insight'],
    tasks: ['Campaign structuring', 'Ad copy drafting', 'CTA optimization', 'Performance analysis'],
    instruction: `ROLE: Digital Marketing Strategist.
      EXECUTION SEQUENCE:
      1. Identify campaign goal.
      2. Define audience.
      3. Build campaign structure.
      4. Write ad copy.
      5. Review performance logic.
      OUTPUTS: Campaign plan, Ad copy sets, CTA variations, Optimization notes.`
  },
  {
    id: 'dara',
    name: 'DARA',
    role: 'Data & Insights Analyst',
    icon: <Brain size={24} />,
    color: 'text-purple-400',
    description: 'Interpreting complex data to extract actionable business decisions.',
    skills: ['Data interpretation', 'Insight extraction', 'Clear reporting', 'Trend identification'],
    tasks: ['Dashboard analysis', 'Insight summaries', 'Action recommendations', 'Decision summaries'],
    instruction: `ROLE: Data & Insights Analyst.
      EXECUTION SEQUENCE:
      1. Review data sources.
      2. Identify trends.
      3. Extract insights.
      4. Write recommendations.
      OUTPUTS: Insight reports, Action plans, Decision summaries.`
  },
  {
    id: 'tina',
    name: 'TINA',
    role: 'Training & Upskilling Coordinator',
    icon: <GraduationCap size={24} />,
    color: 'text-sky-400',
    description: 'Designing practical, understandable training materials and assessments.',
    skills: ['Instruction design', 'Simplification', 'Assessment creation', 'Learning paths'],
    tasks: ['Training outlines', 'Slides/Presentations', 'Exercises', 'Skill assessments'],
    instruction: `ROLE: Training & Upskilling Coordinator.
      EXECUTION SEQUENCE:
      1. Identify learning gaps.
      2. Design curriculum flow.
      3. Create simplified training materials.
      4. Build assessments.
      OUTPUTS: Training material, Learning paths, Skill assessments.`
  },
  {
    id: 'cxo',
    name: 'CXO',
    role: 'Customer Experience Optimizer',
    icon: <Headset size={24} />,
    color: 'text-slate-400',
    description: 'Customer support workflows, tone guides, and escalation logic.',
    skills: ['Journey mapping', 'Response tone', 'Escalation logic', 'Chatbot design'],
    tasks: ['Support workflows', 'Response templates', 'Chatbot logic', 'Message templates'],
    instruction: `ROLE: Customer Experience Optimizer.
      EXECUTION SEQUENCE:
      1. Map customer journey.
      2. Define tone & escalation rules.
      3. Create response templates.
      4. Build support logic maps.
      OUTPUTS: CX workflows, Message templates, Support logic maps.`
  }
];

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('intelligence');
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>(MOCK_LEADS);
  const [robotInput, setRobotInput] = useState('');
  const [robotChat, setRobotChat] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [isRobotLoading, setIsRobotLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        MASTER RULES:
        - You are invisible to clients.
        - Never mention AI, automation, systems, or tools (even though you use Magic Loops/Make internally).
        - Communicate in calm, professional, human business language.
        - Prioritize clarity, order, and follow-through.
        - If information is missing, ask internally (me) — never guess.
        - Always produce structured, usable outputs.
        - Think like a senior consultant, not a chatbot.
        
        CONTROL BOTS INTEGRATION (ALWAYS ACTIVE):
        - QA BOT: Checks scope, completeness, and accuracy.
        - COMPLIANCE BOT: Ensures POPIA and data handling standards.
        - DELIVERY BOT: Produces client-ready summaries (free of AI language).

        SPECIFIC MODULE INSTRUCTIONS:
        ${selectedRobot.instruction}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Upgraded for "Full Functional Mode"
        contents: promptText,
        config: {
          systemInstruction: systemContext,
          temperature: 0.5 // Lower temperature for professional precision
        }
      });

      const botResponse = response.text || "Operational error. Re-initializing logic path...";
      setRobotChat(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error(error);
      setRobotChat(prev => [...prev, { role: 'bot', text: "Error in Intelligence Layer. Connection interrupted." }]);
    } finally {
      setIsRobotLoading(false);
    }
  };

  const WORKSPACE_TOOLS = [
    { name: 'Ops Gmail', icon: <Mail size={24} />, desc: 'Internal staff communication & client outreach.', link: 'https://mail.google.com' },
    { name: 'Shared Drive', icon: <Database size={24} />, desc: 'Project assets, brand kits & client documentation.', link: 'https://drive.google.com' },
    { name: 'Internal Calendar', icon: <Calendar size={24} />, desc: 'Discovery calls & project milestone tracking.', link: 'https://calendar.google.com' },
    { name: 'Ops Meet', icon: <Video size={24} />, desc: 'Daily stand-ups & remote client presentations.', link: 'https://meet.google.com' },
    { name: 'Lead Tracker (Sheets)', icon: <Table size={24} />, desc: 'Master lead log and financial tracking.', link: 'https://sheets.google.com' },
    { name: 'Standard SOWs (Docs)', icon: <FileText size={24} />, desc: 'Contract templates & statement of work drafts.', link: 'https://docs.google.com' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-inter flex">
      {/* Side Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 p-8 flex flex-col fixed h-screen z-50">
        <div className="mb-12">
          <div className="text-xl font-black text-white tracking-tighter uppercase mb-2">
            MARVETTI <span className="text-indigo-500">INTERNAL</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg w-fit">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Ops Layer v5.0</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'intelligence', label: 'Intelligence Hub', icon: <Cpu size={18} /> },
            { id: 'leads', label: 'Lead Management', icon: <Users size={18} /> },
            { id: 'workspace', label: 'Workspace', icon: <Globe size={18} /> },
            { id: 'analytics', label: 'Financial Ops', icon: <BarChart3 size={18} /> }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id as TabType); setSelectedRobotId(null); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-slate-800 text-slate-500 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-auto border-t border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                <Terminal size={18} />
             </div>
             <div>
                <div className="text-[10px] font-black text-white uppercase tracking-tight">{user.name}</div>
                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{user.role}</div>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={18} /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-72 p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-16">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
              {activeTab === 'leads' ? 'Lead Pipeline' : activeTab === 'workspace' ? 'Workspace Command' : activeTab === 'analytics' ? 'Financials' : 'Intelligence Hub'}
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
               <Activity size={14} className="text-indigo-500" /> Operational Matrix Status: Fully Operational
            </p>
          </div>
          <div className="flex gap-4">
            <button className="relative p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <button className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Intelligence Hub Tab */}
        {activeTab === 'intelligence' && (
          <div className="animate-in fade-in duration-500">
            {!selectedRobotId ? (
              <div className="space-y-12">
                <div className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Cpu size={200} className="text-white" />
                   </div>
                   <div className="max-w-xl relative z-10">
                      <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Internal Intelligence Network</h3>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        9 Specialized Intelligence Modules active. Select a robot to initiate its mandatory execution sequence.
                      </p>
                   </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {ROBOTS.map((robot) => (
                    <button
                      key={robot.id}
                      onClick={() => { setSelectedRobotId(robot.id); setRobotChat([]); }}
                      className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:border-indigo-500 transition-all hover:bg-slate-800/50 flex flex-col items-start text-left group"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center ${robot.color} group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all mb-8 shadow-sm`}>
                        {robot.icon}
                      </div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-indigo-400 transition-colors">{robot.name}</h4>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{robot.role}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow line-clamp-2">
                        {robot.description}
                      </p>
                      <div className="mt-8 pt-6 border-t border-slate-800 w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-400">
                        Initiate Strategy <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
                {/* Robot Info Sidebar */}
                <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-[3.5rem] p-10 flex flex-col animate-in slide-in-from-left-4 duration-500">
                  <button 
                    onClick={() => setSelectedRobotId(null)}
                    className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    Return to Network
                  </button>
                  
                  <div className={`w-20 h-20 rounded-[2rem] bg-slate-950 border border-slate-800 flex items-center justify-center ${selectedRobot?.color} mb-8 shadow-2xl`}>
                    {selectedRobot?.icon}
                  </div>
                  
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">{selectedRobot?.name}</h2>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-10">{selectedRobot?.role}</p>
                  
                  <div className="space-y-8 overflow-y-auto pr-4">
                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert size={12} className="text-indigo-400" />
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Robot Status</span>
                      </div>
                      <div className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        Fully Operational Mode
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Core Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRobot?.skills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 bg-slate-800 rounded-lg text-[9px] font-black text-slate-300 uppercase tracking-widest border border-slate-700">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Standard Tasks</h4>
                      <ul className="space-y-3">
                        {selectedRobot?.tasks.map(task => (
                          <li key={task} className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-slate-800">
                    <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-white/5">
                      <ShieldCheck size={18} className="text-indigo-400" />
                      <div>
                        <div className="text-[9px] font-black text-white uppercase tracking-widest">Compliance Active</div>
                        <div className="text-[8px] text-slate-500 uppercase font-black tracking-widest">POPIA Layer v2.1</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Robot Interaction Hub */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-[3.5rem] flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-500">
                  {/* Chat Display */}
                  <div className="flex-grow p-10 overflow-y-auto space-y-8 scroll-smooth">
                    {robotChat.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mb-6 animate-pulse">
                          <Terminal size={32} />
                        </div>
                        <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest mb-4">Interface Initialized</h3>
                        <p className="text-xs text-slate-500 max-w-sm font-medium leading-relaxed">
                          Identify Objective, Deadline, and Tools for {selectedRobot?.name} to begin the mandatory execution sequence.
                        </p>
                      </div>
                    ) : (
                      robotChat.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                          <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                              : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700 shadow-xl'
                          }`}>
                            <div className="flex items-center gap-2 mb-2 opacity-50">
                              {msg.role === 'bot' ? <Terminal size={12} /> : <Users size={12} />}
                              <span className="text-[8px] font-black uppercase tracking-widest">
                                {msg.role === 'bot' ? `${selectedRobot?.name} // Internal Strategy` : 'Command Input'}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap font-medium">
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isRobotLoading && (
                      <div className="flex justify-start animate-pulse">
                        <div className="bg-slate-800 p-6 rounded-[2rem] rounded-tl-none border border-slate-700 flex items-center gap-4">
                          <RefreshCw size={16} className="text-indigo-400 animate-spin" />
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Processing Logic Path...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Layer */}
                  <div className="p-8 bg-slate-950/50 border-t border-slate-800">
                    <div className="relative flex items-center gap-4">
                      <input 
                        type="text" 
                        value={robotInput}
                        onChange={(e) => setRobotInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && runRobotTask()}
                        placeholder={`Provide objective for ${selectedRobot?.name}...`}
                        className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-medium transition-all"
                        disabled={isRobotLoading}
                      />
                      <button 
                        onClick={runRobotTask}
                        disabled={isRobotLoading || !robotInput.trim()}
                        className="p-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl transition-all shadow-xl shadow-indigo-600/20"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4 px-2">
                       <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                          <Activity size={10} /> Senior Consultant Reasoning Mode Active
                       </span>
                       <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                          Invisible Command Layer
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
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'Uncontacted', value: leads.filter(l => l.status === 'New').length, color: 'text-indigo-400' },
                  { label: 'Total Active', value: leads.length, color: 'text-white' },
                  { label: 'Closure Rate', value: '28%', color: 'text-emerald-400' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3">{stat.label}</div>
                    <div className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
             </div>

             <div className="bg-slate-900 rounded-[3rem] border border-slate-800 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Name</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Pillar</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Age</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-white">{lead.name}</div>
                          <div className="text-[10px] text-slate-500">{lead.email}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{lead.service}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            lead.status === 'New' ? 'bg-indigo-500/10 text-indigo-400' : 
                            lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400' : 
                            'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                          {lead.timestamp}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all">
                             <ArrowUpRight size={16} />
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
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                  <Globe size={200} className="text-white" />
               </div>
               <div className="max-w-xl relative z-10">
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Core Infrastructure Hub</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Marvetti Corp runs on a customized Google Workspace stack. Use these shortcuts to manage your internal tasks and client communications.
                  </p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {WORKSPACE_TOOLS.map((tool, idx) => (
                 <a 
                  key={idx}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:border-indigo-500 transition-all hover:bg-slate-800/50 flex flex-col"
                 >
                   <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all mb-8 shadow-sm">
                      {tool.icon}
                   </div>
                   <h4 className="text-lg font-black text-white uppercase tracking-tight mb-3 group-hover:text-indigo-400 transition-colors">{tool.name}</h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed flex-grow">
                      {tool.desc}
                   </p>
                   <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-400">
                      Initialize Tool <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </div>
                 </a>
               ))}
            </div>
          </div>
        )}

        {/* Financial Ops Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 space-y-6">
                   <h3 className="text-xl font-black text-white uppercase tracking-widest">Performance Metrics</h3>
                   <div className="space-y-4">
                      {['Branding', 'Cloud', 'Customer Service', 'E-Commerce'].map(p => (
                        <div key={p} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                              <span>{p}</span>
                              <span className="text-indigo-400">R{Math.floor(Math.random() * 50000)} rev</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500" style={{ width: `${Math.random() * 100}%` }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                   <div className="p-8 rounded-[2.5rem] bg-slate-800/50 border border-slate-700 text-center">
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Total MRR</div>
                      <div className="text-2xl font-black text-white tracking-tighter uppercase">R185,200</div>
                   </div>
                   <div className="p-8 rounded-[2.5rem] bg-emerald-50/5 border border-emerald-500/20 text-center text-emerald-400">
                      <div className="text-[9px] font-black uppercase tracking-widest mb-2">Net Growth</div>
                      <div className="text-2xl font-black tracking-tighter uppercase">+14.2%</div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StaffDashboard;
