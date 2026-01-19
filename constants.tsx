
import React from 'react';
import { 
  Briefcase, 
  Cloud, 
  Palette, 
  ShoppingCart, 
  Megaphone, 
  Zap,
  Search,
  ShieldCheck,
  FileText,
  Building2,
  FileBadge,
  Globe,
  Users,
  Settings,
  Headset,
  Target,
  BarChart,
  Database,
  HeartHandshake
} from 'lucide-react';
import { ServiceStage, ServiceItem, Project } from './types';

export const STAGES_DATA: ServiceStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    title: 'CIPC Company Registration',
    shortDescription: 'Official company formation and registration documents.',
    longDescription: 'Full CIPC registration including tax number and incorporation documents. 70% AI drafting of MoI and 30% human verification of ID documents.',
    priceDisplay: 'R495',
    fixedPrice: 495,
    icon: <Building2 className="w-6 h-6" />,
    color: 'bg-brand-500',
    questions: [
      { id: 'name1', label: 'Company Name Preference 1', type: 'text', required: true },
      { id: 'name2', label: 'Company Name Preference 2', type: 'text', required: true },
      { id: 'directors', label: 'Number of Directors', type: 'select', options: ['1', '2', '3', '4+'], required: true }
    ]
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    title: 'Visual Identity & Logo',
    shortDescription: 'AI-assisted concepts with human design polish.',
    longDescription: 'High-fidelity branding assets. Phase 1 uses AI for rapid concepting (max 3 regens) followed by human refinement.',
    priceDisplay: 'R70 - R350',
    fromPrice: 70,
    icon: <Palette className="w-6 h-6" />,
    color: 'bg-brand-600',
    questions: [
      { id: 'style', label: 'Logo Style', type: 'select', options: ['Minimalist', 'Corporate', 'Playful', 'Vintage'], required: true },
      { id: 'colors', label: 'Primary Brand Colors', type: 'text', required: true },
      { id: 'slogan', label: 'Slogan (if any)', type: 'text', required: false }
    ]
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    title: 'Business Profile',
    shortDescription: 'Professional corporate profile for tenders.',
    longDescription: 'Comprehensive document detailing operations and vision. AI structures the content; human strategists verify industry alignment.',
    priceDisplay: 'R400 - R650',
    fromPrice: 400,
    icon: <FileBadge className="w-6 h-6" />,
    color: 'bg-brand-700',
    questions: [
      { id: 'mission', label: 'Core Mission Statement', type: 'textarea', required: true },
      { id: 'experience', label: 'Years of Industry Experience', type: 'text', required: true }
    ]
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    title: 'Business Plan',
    shortDescription: 'Structured planning for funding and growth.',
    longDescription: 'Detailed financial projections and market analysis generated via neural synthesis and human audit.',
    priceDisplay: 'R650 - R2,500',
    fromPrice: 650,
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-slate-800',
    questions: [
      { id: 'funding', label: 'Target Funding Amount', type: 'text', required: true },
      { id: 'model', label: 'Revenue Model', type: 'select', options: ['Product', 'Service', 'SaaS', 'Hybrid'], required: true }
    ]
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    title: 'Industry Compliance',
    shortDescription: 'Sector-specific regulatory registrations.',
    longDescription: 'UIF, COIDA, Letter of Good Standing. AI handles form population; human agents manage submission.',
    priceDisplay: 'From R1,350',
    fromPrice: 1350,
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-brand-600',
    questions: [
      { id: 'sector', label: 'Industry Sector', type: 'text', required: true },
      { id: 'employees', label: 'Number of Employees', type: 'text', required: true }
    ]
  },
  {
    id: 'stage-6',
    stageNumber: 6,
    title: 'Websites & Domains',
    shortDescription: 'Digital real estate and online presence.',
    longDescription: 'Custom domains and optimized site architectures. AI generates the boilerplate; human engineers finalize UI/UX.',
    priceDisplay: 'R1,450 - R15,500',
    fromPrice: 1450,
    icon: <Globe className="w-6 h-6" />,
    color: 'bg-brand-500',
    questions: [
      { id: 'domain', label: 'Desired Domain Name', type: 'text', required: true },
      { id: 'site_type', label: 'Website Type', type: 'select', options: ['One Page', 'Business Hub', 'E-Commerce Store'], required: true }
    ]
  },
  {
    id: 'stage-7',
    stageNumber: 7,
    title: 'Social Media Setup',
    shortDescription: 'Optimized channel creation and branding.',
    longDescription: 'Professional setup of LinkedIn, Instagram, and Facebook infrastructure.',
    priceDisplay: 'From R350/task',
    fromPrice: 350,
    icon: <Users className="w-6 h-6" />,
    color: 'bg-brand-600',
    questions: [
      { id: 'platforms', label: 'Platforms Needed', type: 'text', required: true }
    ]
  },
  {
    id: 'stage-8',
    stageNumber: 8,
    title: 'Search Engine Setup',
    shortDescription: 'Google Business and SEO indexing.',
    longDescription: 'Indexing and local SEO setup for maximum visibility via automated crawlers and human verification.',
    priceDisplay: 'From R350/task',
    fromPrice: 350,
    icon: <Search className="w-6 h-6" />,
    color: 'bg-brand-700',
    questions: [
      { id: 'location', label: 'Primary Business Location', type: 'text', required: true }
    ]
  },
  {
    id: 'stage-9',
    stageNumber: 9,
    title: 'Digital Campaign Setup',
    shortDescription: 'Conversion-focused ad infrastructure.',
    longDescription: 'Meta and Google Ads setup with pixel tracking. AI targets; humans optimize creative.',
    priceDisplay: 'From R350/task',
    fromPrice: 350,
    icon: <Megaphone className="w-6 h-6" />,
    color: 'bg-slate-800',
    questions: [
      { id: 'goal', label: 'Primary Campaign Goal', type: 'select', options: ['Leads', 'Sales', 'Traffic', 'Awareness'], required: true }
    ]
  },
  {
    id: 'stage-10',
    stageNumber: 10,
    title: 'CRM / Automation',
    shortDescription: 'Automated workflows and client pipelines.',
    longDescription: 'HubSpot or custom nodes. 70% of code generated by AI; 30% debugged by human engineers.',
    priceDisplay: 'From R3,500',
    fromPrice: 3500,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-brand-600',
    questions: [
      { id: 'workflow', label: 'Primary Workflow to Automate', type: 'textarea', required: true }
    ]
  },
  {
    id: 'stage-11',
    stageNumber: 11,
    title: 'Compliance Maintenance',
    shortDescription: 'Ongoing legal and statutory upkeep.',
    longDescription: 'Recurring maintenance protocols to keep your business active and legal.',
    priceDisplay: 'From R150/task',
    fromPrice: 150,
    icon: <Settings className="w-6 h-6" />,
    color: 'bg-brand-500',
    questions: [
      { id: 'maintenance_freq', label: 'Maintenance Frequency', type: 'select', options: ['Monthly', 'Quarterly', 'Annually'], required: true }
    ]
  },
  {
    id: 'stage-12',
    stageNumber: 12,
    title: 'Remote Admin / Human Agents',
    shortDescription: 'High-touch virtual business support.',
    longDescription: 'On-demand administrative tasks handled by verified human agents.',
    priceDisplay: 'From R115/hr',
    fromPrice: 115,
    icon: <Headset className="w-6 h-6" />,
    color: 'bg-brand-600',
    questions: [
      { id: 'task_scope', label: 'Task Description', type: 'textarea', required: true },
      { id: 'hours', label: 'Estimated Hours Needed', type: 'text', required: true }
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '1',
    title: 'Business Admin',
    shortDescription: 'Stages 1, 3, 5, 11, 12',
    longDescription: 'Our business administration pillar handles everything from CIPC registrations to complex statutory compliance and remote virtual assistance.',
    icon: <Briefcase />,
    color: 'bg-brand-500',
    tools: ['CIPC', 'SARS', 'COIDA'],
    startingPrice: 'R495',
    packages: [
      { name: 'Core Setup', price: 'R495', description: 'CIPC Registration (Stage 1)' },
      { name: 'Growth Kit', price: 'R1,250', description: 'Registration + Profile + Compliance' },
      { name: 'Managed Admin', price: 'R3,500/mo', description: 'Full outsourced support' }
    ]
  },
  {
    id: '2',
    title: 'Cloud & Tech',
    shortDescription: 'Stages 6, 10',
    longDescription: 'Automate your pipelines with CRM integrations and cloud-native business tools.',
    icon: <Cloud />,
    color: 'bg-brand-600',
    tools: ['HubSpot', 'Zapier', 'AWS'],
    startingPrice: 'R1,450',
    packages: [
      { name: 'Digital Presence', price: 'R1,450', description: 'Website (Stage 6)' },
      { name: 'Automation Core', price: 'R3,500', description: 'CRM Setup (Stage 10)' }
    ]
  },
  {
    id: '3',
    title: 'Customer Service & Client Relations',
    shortDescription: 'Call center services (inbound & outbound), CX strategy.',
    longDescription: 'Omnichannel customer support, telemarketing, and client relations management powered by professional agents and digital routing.',
    icon: <Headset />,
    color: 'bg-slate-950',
    tools: ['AWS Connect', 'Zendesk', 'VOIP', 'Omnichannel'],
    startingPrice: 'R115/hr',
    packages: [
      { name: 'On-Demand Agents', price: 'R115/hr', description: 'Flexible human support desk.' },
      { name: 'Full-Time Desk', price: 'R18,500/mo', description: 'Dedicated support specialist.' },
      { name: 'Architecture', price: 'Custom', description: 'Call center infrastructure setup.' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Nexus Logistics Hub',
    client: 'Nexus Global',
    description: 'A 100% automated administrative backend for a cross-border logistics provider.',
    tag: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000',
    serviceId: '1',
    fullChallenge: 'Nexus was struggling with manual invoice tracking across 4 countries.',
    fullSolution: 'We implemented an OCR-driven automation layer that reduced manual entry by 85%.',
    templateImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
    marketingImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    stats: [
      { label: 'Time Saved', value: '40h/wk' },
      { label: 'Accuracy', value: '99.8%' },
      { label: 'ROI', value: '310%' }
    ]
  }
];

export const STANDALONE_SERVICES = [
  {
    id: 'ss1',
    title: 'Rapid Logo Kit',
    description: 'High-fidelity AI concepting with human polish.',
    price: 'R350',
    deliveryTime: '24 Hours',
    icon: <Palette className="w-6 h-6" />
  },
  {
    id: 'ss2',
    title: 'Ad Pixel Audit',
    description: 'Deep scan of Meta/Google tracking health.',
    price: 'R450',
    deliveryTime: '48 Hours',
    icon: <Target className="w-6 h-6" />
  }
];

export const FAQS = [
  {
    question: "What is the 70/30 Hybrid Model?",
    answer: "We utilize advanced AI (70%) to handle rapid drafting, generation, and data crunching, while our expert human strategists (30%) provide final quality control, compliance verification, and high-touch consulting."
  }
];

export const FAQ_CATEGORIES = [
  {
    title: 'Operations',
    items: [
      { question: 'Is Marvetti Corporation registered in South Africa?', answer: 'Yes, we are a fully registered South African entity.' }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Marvetti Corporation transformed our startup from an idea to a fully registered, automated entity in record time.",
    client: "Sarah J.",
    industry: "Fintech",
    color: "border-brand-500",
    brandColor: "#EC1B23"
  }
];
