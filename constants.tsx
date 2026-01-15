
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
  MousePointer2,
  RefreshCw
} from 'lucide-react';
import { ServiceItem, Project, FAQItem, StandaloneService, DashboardProject, DashboardInvoice } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '8',
    category: 'cx',
    title: 'Customer Service & Client Relations',
    shortDescription: 'Call centre services (inbound & outbound), ticketing & bots.',
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
    description: 'Automated 2,000+ SKU inventory and payment routing across 3 regions.',
    fullChallenge: 'Urban Bloom struggled with manual inventory updates and failed cross-border transactions.',
    fullSolution: 'We deployed a Shopify backend with headless CMS and PayFast integration.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    templateImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    marketingImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
    tag: 'E-Commerce',
    stats: [
      { label: 'Growth', value: '+420%' },
      { label: 'Load Time', value: '0.8s' },
      { label: 'Conversion', value: '5.2%' }
    ]
  },
  {
    id: 'p2',
    serviceId: '3',
    title: 'Brand Identity Evolution',
    client: 'AFREECO',
    description: 'Comprehensive design system including corporate profiles, stationery, and digital identity.',
    fullChallenge: 'AFREECO required a unified, premium visual language to consolidate their market presence and international appeal.',
    fullSolution: 'Applying the "Design as Intelligence" philosophy, we crafted a high-impact identity package, corporate profiles, and digital templates.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    templateImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=600',
    marketingImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
    tag: 'Branding',
    stats: [
      { label: 'Design Score', value: 'A+' },
      { label: 'Asset Unity', value: '100%' },
      { label: 'Market Recall', value: '92%' }
    ]
  },
  {
    id: 'p3',
    serviceId: '6',
    title: 'Finance Analytics Engine',
    client: 'Nexus Finance',
    description: 'Predictive data modeling and custom visualization for asset managers.',
    fullChallenge: 'Data silos prevented the investment team from seeing real-time risk exposure.',
    fullSolution: 'Engineered a PowerBI cloud dashboard with Python-based predictive modeling.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    templateImage: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=600',
    marketingImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
    tag: 'AI & Data',
    stats: [
      { label: 'Accuracy', value: '99.2%' },
      { label: 'Time Saved', value: '40h/mo' },
      { label: 'ROI', value: '215%' }
    ]
  }
];

export const MOCK_DASHBOARD_PROJECTS: DashboardProject[] = [
  {
    id: 'd1',
    title: 'E-Commerce Infrastructure Setup',
    status: 'In Progress',
    progress: 65,
    lastUpdate: '2 hours ago',
    manager: 'Sarah Thompson',
    pillar: 'E-Commerce'
  },
  {
    id: 'd2',
    title: 'Corporate Brand Manual',
    status: 'Discovery',
    progress: 20,
    lastUpdate: 'Yesterday',
    manager: 'David Chen',
    pillar: 'Branding'
  }
];

export const MOCK_DASHBOARD_INVOICES: DashboardInvoice[] = [
  { id: 'INV-4521', date: '20 Feb 2025', amount: 'R5,000', status: 'Paid' },
  { id: 'INV-4533', date: '25 Feb 2025', amount: 'R2,500', status: 'Pending' }
];

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: "General & Remote Ops",
    items: [
      {
        question: "Are your services fully online?",
        answer: "Yes, all our services are 100% digital and designed for remote delivery. We leverage high-performance tools like Slack, Zoom, and Asana to maintain constant communication regardless of your location."
      },
      {
        question: "How do you handle different time zones?",
        answer: "Marvetti Corp operates on an asynchronous-first model. This means work is documented and managed so that progress never stalls. For synchronous needs, we coordinate specific windows that respect both parties' regional hours."
      },
      {
        question: "What is the Marvetti soft-skills layer?",
        answer: "Beyond technical delivery, we train our teams in 'Digital Etiquette'—ensuring that every interaction, document, and call is handled with corporate-grade professionalism, high emotional intelligence, and absolute transparency."
      }
    ]
  },
  {
    title: "Services & Delivery",
    items: [
      {
        question: "How long does a typical project take?",
        answer: "Speed is one of our core pillars. Standalone services usually take 24-48 hours. Major pillars like E-Commerce setup or Full Brand Identity typically range from 1 to 3 weeks depending on the complexity of your stack."
      },
      {
        question: "Can I combine multiple pillars?",
        answer: "Absolutely. Most of our high-growth clients combine Branding with E-Commerce and Customer Support. We offer integrated frameworks that ensure your digital ecosystem is cohesive and automated."
      },
      {
        question: "Do you provide ongoing support?",
        answer: "We focus on a pay-per-solution model to keep you lean, but we do offer 'Optimization' modules as add-ons if you require monthly performance audits or ongoing maintenance."
      }
    ]
  },
  {
    title: "Pricing & Payments",
    items: [
      {
        question: "Do I have to pay monthly retainers?",
        answer: "No. Marvetti Corp is built on the principle of 'Value-Based Procurement'. You pay for specific solutions and packages. No hidden fees, no unnecessary monthly bills unless you explicitly opt for recurring maintenance modules."
      },
      {
        question: "What payment methods are supported?",
        answer: "We support all major credit cards, EFT, and regional gateways like PayFast and Stripe. All transactions are encrypted and POPIA compliant."
      },
      {
        question: "Is there a refund policy?",
        answer: "We prioritize total client satisfaction through our phased delivery process. If we fail to meet the specific milestones outlined in your package's Scope of Work, we offer revisions or partial credits based on our service agreement."
      }
    ]
  },
  {
    title: "Security & Compliance",
    items: [
      {
        question: "How do you handle my sensitive data?",
        answer: "Data security is non-negotiable. We use enterprise-grade encryption for all internal and external communication. Your data is handled in strict accordance with POPIA (South Africa) and GDPR standards where applicable."
      },
      {
        question: "Will you sign an NDA?",
        answer: "Yes. For corporate projects and long-term administrative partnerships, we provide standard Non-Disclosure Agreements as part of our onboarding protocol."
      }
    ]
  }
];

export const FAQS: FAQItem[] = FAQ_CATEGORIES.flatMap(cat => cat.items).slice(0, 4);

export const TESTIMONIALS = [
  {
    id: 't1',
    client: 'DUBE CAR CARE',
    industry: 'Automotive Excellence',
    quote: "Marvetti Corp revolutionized our appointment booking system. Our workshop is now 100% digital, and we've seen a 40% increase in customer throughput.",
    color: 'border-red-900',
    brandColor: '#4A0E0E'
  },
  {
    id: 't2',
    client: 'MKHONJANA FOUNDATION',
    industry: 'Social Impact',
    quote: "Tracking our community outreach impact was a manual nightmare. The custom dashboards provided by Marvetti have given us the clarity to scale our tree-planting initiatives.",
    color: 'border-emerald-600',
    brandColor: '#10B981'
  },
  {
    id: 't3',
    client: 'MODIBANE GAS SOLUTIONS',
    industry: 'Energy & Logistics',
    quote: "Inventory management of our gas cylinders is now fully automated via a cloud pipeline. Their technical precision is unmatched in the industry.",
    color: 'border-yellow-500',
    brandColor: '#F59E0B'
  },
  {
    id: 't4',
    client: 'VEVUTI PROJECTS',
    industry: 'Interior Design',
    quote: "Our branding kit and website capture our 'Beautiful Spaces' philosophy perfectly. Marvetti truly understands how to translate high-end aesthetics into digital platforms.",
    color: 'border-blue-900',
    brandColor: '#1E3A8A'
  },
  {
    id: 't5',
    client: 'LERATO KE TEBOGO GROUP',
    industry: 'Heavy Construction',
    quote: "Pioneers we are, and Marvetti helped us prove it. Modernizing our heavy equipment logistics through AI automation saved us millions in operational overhead.",
    color: 'border-amber-500',
    brandColor: '#D97706'
  },
  {
    id: 't6',
    client: 'LOCHANI PROJECTS',
    industry: 'Civil Engineering',
    quote: "Their project management toolsets and data visualizations have brought a new level of precision to our architectural workflows. A vital partner.",
    color: 'border-green-800',
    brandColor: '#064E3B'
  },
  {
    id: 't7',
    client: 'MAWOLELA SECURITY',
    industry: 'Dignified Guarding',
    quote: "CX optimization helped us provide real-time reporting to our high-profile clients. Marvetti helped us bridge the gap between physical security and digital transparency.",
    color: 'border-red-600',
    brandColor: '#DC2626'
  },
  {
    id: 't8',
    client: 'EPIQUE CLEANING',
    industry: 'Management Services',
    quote: "Simplicity meets elegance. Our digital identity is now as spotless as our service. The automation for recurring client bookings is a game-changer.",
    color: 'border-sky-500',
    brandColor: '#0EA5E9'
  }
];
