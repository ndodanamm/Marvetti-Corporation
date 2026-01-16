
import React from 'react';
import { 
  Briefcase, 
  Cloud, 
  Palette, 
  ShoppingCart, 
  Megaphone, 
  Brain, 
  GraduationCap, 
  Headset,
  Zap,
  Search,
  ShieldCheck,
  FileText,
  MousePointer2
} from 'lucide-react';
import { ServiceItem, Project, FAQItem, StandaloneService, DashboardProject, DashboardInvoice, LeadRecord } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '8',
    category: 'cx',
    title: 'Customer Service & Client Relations',
    shortDescription: 'Call centre services (inbound & outbound), Customer experience optimization.',
    longDescription: 'Strategic customer engagement solutions including multi-channel call centre services. We handle inbound queries and outbound relations to scale your client satisfaction and retention.',
    tools: ['Zendesk', 'Cloud PBX', 'HubSpot', 'Custom Bots'],
    startingPrice: 'R3,000',
    icon: <Headset className="w-6 h-6" />,
    color: 'bg-slate-700',
    packages: [
      { name: 'Inbound Support Desk', description: 'Dedicated remote support team for inbound queries and ticketing management.', price: 'R3,000' },
      { name: 'Outbound Client Relations', description: 'Active outreach, lead follow-ups, and outbound client relationship management.', price: 'R5,000' },
      { name: 'Full Hybrid Call Centre', description: 'Complete inbound/outbound setup with AI automation and 24/7 coverage.', price: 'R12,500' }
    ]
  },
  {
    id: '1',
    category: 'admin',
    title: 'Business Admin & Virtual Support',
    shortDescription: 'Organize workflows, documents, remote admin support.',
    longDescription: 'High-touch administrative support designed to offload operational weight. We manage your back-office so you can focus on front-line growth.',
    tools: ['Google Workspace', 'Notion', 'Slack', 'Asana'],
    startingPrice: 'R800',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'bg-blue-600',
    packages: [
      { name: 'Basic Task Setup', description: 'Single task/project — scheduling, document organization', price: 'R800' },
      { name: 'Workflow Optimization Pack', description: 'Multi-task integration, recurring task automation', price: 'R1,500' },
      { name: 'Full Admin Support Setup', description: 'Complete workflow framework + remote admin', price: 'R2,500' }
    ]
  },
  {
    id: '2',
    category: 'cloud',
    title: 'Cloud Technology & Automation',
    shortDescription: 'Cloud setup, task automation, AI integration.',
    longDescription: 'Leverage modern cloud stacks and AI to eliminate manual data entry and repetitive workflows.',
    tools: ['AWS', 'Zapier', 'Make.com', 'Azure'],
    startingPrice: 'R1,200',
    icon: <Cloud className="w-6 h-6" />,
    color: 'bg-indigo-600',
    packages: [
      { name: 'Cloud Starter', description: 'Basic cloud migration and storage setup', price: 'R1,200' },
      { name: 'Automation Standard', description: 'Advanced task automation and API integrations', price: 'R2,000' },
      { name: 'Enterprise Flow', description: 'Full architecture overhaul and AI integration', price: 'R3,500' }
    ]
  },
  {
    id: '3',
    category: 'branding',
    title: 'Branding & Online Identity',
    shortDescription: 'Logos, templates, websites, hosting, domain.',
    longDescription: 'Establish a cohesive digital identity that resonates with your target audience across all touchpoints.',
    tools: ['Figma', 'Adobe CC', 'WordPress', 'React'],
    startingPrice: 'R1,000',
    icon: <Palette className="w-6 h-6" />,
    color: 'bg-rose-600',
    packages: [
      { name: 'Identity Basic', description: 'Logo design and basic brand guide', price: 'R1,000' },
      { name: 'Business Identity', description: 'Full branding kit + business website setup', price: 'R3,000' },
      { name: 'Premium Online Hub', description: 'E-Commerce ready site + full custom identity', price: 'R4,500' }
    ]
  },
  {
    id: '4',
    category: 'ecommerce',
    title: 'E-Commerce & Backend Management',
    shortDescription: 'Product setup, payment gateways, inventory automation.',
    longDescription: 'Scalable commerce solutions that bridge the gap between inventory and the checkout button.',
    tools: ['Shopify', 'WooCommerce', 'Stripe', 'PayFast'],
    startingPrice: 'R5,000',
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'bg-emerald-600',
    packages: [
      { name: 'Store Starter', description: 'Core store setup and single gateway config', price: 'R5,000' },
      { name: 'Merchant Pro', description: 'Inventory automation and multi-gateways', price: 'R8,000' },
      { name: 'Omnichannel Enterprise', description: 'Full backend ecosystem management', price: 'R10,000' }
    ]
  },
  {
    id: '5',
    category: 'marketing',
    title: 'Digital Marketing (SMM & SEM)',
    shortDescription: 'Social media & search engine campaigns.',
    longDescription: 'Strategic traffic generation focusing on high conversion rates and ROI-driven ad spend.',
    tools: ['Meta Ads', 'Google Ads', 'Mailchimp', 'Buffer'],
    startingPrice: 'R1,200',
    icon: <Megaphone className="w-6 h-6" />,
    color: 'bg-amber-600',
    packages: [
      { name: 'Basic Campaign', description: 'Single platform management and ad setup', price: 'R1,200' },
      { name: 'Growth Suite', description: 'Multi-channel ads + basic content creation', price: 'R2,500' },
      { name: 'Dominance Plan', description: 'Full-service funnel and retention strategy', price: 'R4,500' }
    ]
  },
  {
    id: '6',
    category: 'ai',
    title: 'AI & Data Analytics',
    shortDescription: 'Business data analysis, dashboards, insights.',
    longDescription: 'Turn raw data into actionable business intelligence through custom reporting and predictive modeling.',
    tools: ['PowerBI', 'Tableau', 'Python', 'Excel Pro'],
    startingPrice: 'R1,800',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-600',
    packages: [
      { name: 'Insight Basic', description: 'Data cleanup and core metric reporting', price: 'R1,800' },
      { name: 'Dashboard Standard', description: 'Interactive real-time visual dashboards', price: 'R2,500' },
      { name: 'Predictive Pro', description: 'Advanced AI modeling and forecasting', price: 'R3,000' }
    ]
  },
  {
    id: '7',
    category: 'training',
    title: 'Online Training & Upskilling',
    shortDescription: 'Team digital soft skills & workflow training.',
    longDescription: 'Human capital development tailored for the digital-first economy. Training that actually sticks.',
    tools: ['Zoom', 'Miro', 'Typeform', 'LMS'],
    startingPrice: 'R800',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-cyan-600',
    packages: [
      { name: 'Skill Module', description: 'Single software or soft-skill proficiency training', price: 'R800' },
      { name: 'Team Upskill', description: 'Full workflow and efficiency workshops', price: 'R2,000' },
      { name: 'Corporate Master', description: 'Ongoing transformation coaching for leads', price: 'R3,500' }
    ]
  }
];

export const STANDALONE_SERVICES: StandaloneService[] = [
  {
    id: 's1',
    title: 'SEO Performance Deep-Dive',
    price: 'R850',
    description: 'Full technical SEO audit with actionable fixes for speed and ranking.',
    deliveryTime: '48 Hours',
    icon: <Search className="w-5 h-5" />
  },
  {
    id: 's2',
    title: 'Site Speed Optimization',
    price: 'R1,200',
    description: 'Manual optimization of images, scripts, and server response times.',
    deliveryTime: '24 Hours',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 's3',
    title: 'Security Hardening Pack',
    price: 'R950',
    description: 'Implementation of advanced firewalls, SSL, and malware protection.',
    deliveryTime: '12 Hours',
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    id: 's4',
    title: 'Copywriting Refresh',
    price: 'R750',
    description: '3 pages of conversion-optimized copy written by specialized editors.',
    deliveryTime: '72 Hours',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 's5',
    title: 'Social Media Kit',
    price: 'R600',
    description: '10 custom-branded social templates ready for Instagram & LinkedIn.',
    deliveryTime: '24 Hours',
    icon: <Palette className="w-5 h-5" />
  },
  {
    id: 's6',
    title: 'Landing Page Repair',
    price: 'R1,500',
    description: 'Redesign of your existing landing page for better conversion metrics.',
    deliveryTime: '48 Hours',
    icon: <MousePointer2 className="w-5 h-5" />
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    serviceId: '4',
    title: 'Global Store Automation',
    client: 'Urban Bloom Boutique',
    description: 'Rebuilding a cross-border e-commerce engine with real-time inventory sync.',
    fullChallenge: 'The client struggled with manual inventory updates across three different regions, leading to over-selling and customer dissatisfaction.',
    fullSolution: 'We implemented a unified Shopify backend integrated with custom ERP middleware and automated currency conversion nodes.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    templateImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    marketingImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
    tag: 'E-Commerce',
    stats: [
      { label: 'Sales Increase', value: '+140%' },
      { label: 'Inventory Error', value: '-98%' },
      { label: 'Regions', value: '3' }
    ]
  },
  {
    id: 'p2',
    serviceId: '3',
    title: 'Identity Refresh 2025',
    client: 'Starlight Foundations',
    description: 'A complete branding overhaul for a leading social impact organization.',
    fullChallenge: 'Starlight needed a modern, digital-first identity that appealed to younger donors without losing its corporate credibility.',
    fullSolution: 'Developed a high-fidelity design system, custom typography, and a rapid-deployment React-based landing page.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    templateImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    marketingImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    tag: 'Branding',
    stats: [
      { label: 'Engagement', value: '+65%' },
      { label: 'Brand Reach', value: '2M+' },
      { label: 'Consistency', value: '100%' }
    ]
  },
  {
    id: 'p3',
    serviceId: '2',
    title: 'Infrastructure Scaling',
    client: 'Apex Logistics',
    description: 'Moving 500TB of operational data to a hybrid-cloud environment.',
    fullChallenge: 'On-premise servers were failing under the load of holiday peak season logistics tracking.',
    fullSolution: 'Migration to AWS with serverless Lambda triggers for real-time fleet telemetry processing.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    templateImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    marketingImage: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
    tag: 'Cloud',
    stats: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Latency', value: '-450ms' },
      { label: 'Security', value: 'Lvl 4' }
    ]
  },
  {
    id: 'p4',
    serviceId: '1',
    title: 'Document Management System Overhaul',
    client: 'Nexus Logistics',
    description: 'Digitalization of 15 years of physical archives with AI-powered indexing.',
    fullChallenge: 'Nexus Logistics struggled with a massive physical document backlog, hindering searchability and operational speed.',
    fullSolution: 'We deployed a high-speed OCR pipeline and a custom-indexed Notion environment for immediate data retrieval.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
    templateImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
    marketingImage: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=600',
    tag: 'Business Admin',
    stats: [
      { label: 'Time Saved', value: '30h/mo' },
      { label: 'Accuracy', value: '99.8%' },
      { label: 'Efficiency', value: '+25%' }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is the Marvetti Corp framework?",
    answer: "The Marvetti Framework is a set of proprietary digital-first operational procedures designed to eliminate inefficiency in business workflows through automation and specialized remote support."
  },
  {
    question: "How does the pricing work?",
    answer: "We offer transparent, once-off setup fees for most modules, with optional monthly retainers for ongoing optimization and high-touch support."
  }
];

export const FAQ_CATEGORIES = [
  {
    title: 'General Inquiries',
    items: FAQS
  },
  {
    title: 'Technical Support',
    items: [
      {
        question: "Is my data secure?",
        answer: "Yes. All projects are built with security-first architecture and are fully compliant with South African POPIA and global GDPR regulations."
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Marvetti Corp didn't just build us a website; they built us a digital identity that actually generates revenue.",
    client: "Sarah Jenkins",
    industry: "Tech Solutions",
    color: "border-indigo-500",
    brandColor: "#4f46e5"
  },
  {
    id: 2,
    quote: "The automation workflows provided by the cloud team have saved us over 40 hours of manual data entry every single month.",
    client: "David Miller",
    industry: "Logistics Hub",
    color: "border-emerald-500",
    brandColor: "#10b981"
  }
];

export const MOCK_DASHBOARD_PROJECTS: DashboardProject[] = [
  {
    id: 'dp1',
    title: 'Cloud Migration Phase 2',
    status: 'In Progress',
    progress: 65,
    lastUpdate: '2 hours ago',
    manager: 'Ava Robot',
    pillar: 'Cloud'
  },
  {
    id: 'dp2',
    title: 'E-Commerce Backend Audit',
    status: 'Optimization',
    progress: 85,
    lastUpdate: '1 day ago',
    manager: 'Ella Robot',
    pillar: 'E-Commerce'
  }
];

export const MOCK_DASHBOARD_INVOICES: DashboardInvoice[] = [
  {
    id: 'INV-2025-001',
    date: 'Jan 15, 2025',
    amount: 'R8,500.00',
    status: 'Paid'
  },
  {
    id: 'INV-2025-002',
    date: 'Feb 01, 2025',
    amount: 'R3,200.00',
    status: 'Pending'
  }
];

export const MOCK_LEADS: LeadRecord[] = [
  {
    id: 'l1',
    name: 'Robert Smith',
    email: 'robert@apex.com',
    service: 'Cloud Automation',
    status: 'New',
    timestamp: '2025-02-10T10:00:00Z'
  },
  {
    id: 'l2',
    name: 'Alice Wong',
    email: 'alice@starlight.org',
    service: 'Branding',
    status: 'Contacted',
    timestamp: '2025-02-11T14:30:00Z'
  }
];
