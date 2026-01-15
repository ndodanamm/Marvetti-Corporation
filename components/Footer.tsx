
import React from 'react';
import { Linkedin, Twitter, Facebook, Mail, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                MARVETTI <span className="text-indigo-500">CORP</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 font-medium">
              The premier choice for digital transformation, business support, and corporate excellence across South Africa and beyond.
            </p>
            <div className="flex gap-4">
              <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => onNavigate('1')} className="hover:text-white transition-colors">Business Admin</button></li>
              <li><button onClick={() => onNavigate('2')} className="hover:text-white transition-colors">Cloud & Automation</button></li>
              <li><button onClick={() => onNavigate('4')} className="hover:text-white transition-colors">E-Commerce</button></li>
              <li><button onClick={() => onNavigate('5')} className="hover:text-white transition-colors">Digital Marketing</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Support & Partners</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-white transition-colors">Our Portfolio</a></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
              <li><button onClick={() => onNavigate('affiliate')} className="hover:text-white transition-colors">Affiliate Program</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">Support Hub</button></li>
              <li><a href="https://wa.me/27687240126" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chat to Consultant</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-500" /> 
                <a href="mailto:info@marvetti.co.za" className="hover:text-white transition-colors">info@marvetti.co.za</a>
              </li>
              <li className="flex items-center gap-3">
                <a href="https://wa.me/27687240126" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-500" /> 0687240126
                </a>
              </li>
              <li className="opacity-60">Johannesburg, South Africa<br />Remote-First Operations</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <p>© 2025 MARVETTI CORP | DIGITAL EXCELLENCE.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">POPIA</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
