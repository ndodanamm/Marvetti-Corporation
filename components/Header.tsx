
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Zap, LayoutDashboard } from 'lucide-react';
import { SERVICES_DATA } from '../constants';

interface HeaderProps {
  onNavigate: (view: any) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-2xl font-black tracking-tighter uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-950' : 'text-white'}`}
            >
              MARVETTI <span className="text-indigo-500">CORP</span>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {/* Services with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors hover:text-indigo-500 ${
                  isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
                }`}
              >
                Services <ChevronDown className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesOpen && (
                <div 
                  onMouseLeave={() => setServicesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden py-4 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="px-6 py-2 mb-2 border-b border-slate-50">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Core Pillars</span>
                  </div>
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        onNavigate(service.id);
                        setServicesOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 hover:bg-slate-50 transition-colors group flex items-center gap-3 ${currentView === service.id ? 'bg-slate-50' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${service.color} opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                      <div>
                        <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider">{service.title}</div>
                        <div className="text-[9px] text-slate-400 font-medium line-clamp-1">{service.shortDescription}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('portfolio')}
              className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-indigo-500 ${
                currentView === 'portfolio' ? 'text-indigo-600' : isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-indigo-500 ${
                currentView === 'how-it-works' ? 'text-indigo-600' : isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
              }`}
            >
              How It Works
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-indigo-500 flex items-center gap-2 ${
                   currentView === 'dashboard' ? 'text-indigo-600' : isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Portal
              </button>
              <button 
                onClick={() => onNavigate('order-quote')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                  isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white backdrop-blur-md'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-indigo-500" /> Instant Quote
              </button>
              <a 
                href="https://wa.me/27687240126"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
              >
                Consult Now
              </a>
            </div>
          </nav>

          <button 
            className="md:hidden p-2 rounded-xl bg-white/5 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b absolute top-full left-0 right-0 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 max-h-[80vh] overflow-y-auto">
          <button 
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="text-lg font-black text-slate-900 text-left border-b border-slate-50 pb-4"
          >
            Home
          </button>

          <button 
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className="text-lg font-black text-indigo-600 text-left border-b border-slate-50 pb-4 flex items-center gap-3"
          >
            <LayoutDashboard className="w-5 h-5" /> Client Portal
          </button>

          <button 
            onClick={() => { onNavigate('order-quote'); setMobileMenuOpen(false); }}
            className="text-lg font-black text-indigo-600 text-left border-b border-slate-50 pb-4 flex items-center gap-3"
          >
            <Zap className="w-5 h-5" /> Instant Quote Hub
          </button>

          <button 
            onClick={() => { onNavigate('portfolio'); setMobileMenuOpen(false); }}
            className="text-lg font-black text-slate-900 text-left border-b border-slate-50 pb-4"
          >
            Portfolio
          </button>

          <button 
            onClick={() => { onNavigate('how-it-works'); setMobileMenuOpen(false); }}
            className="text-lg font-black text-slate-900 text-left border-b border-slate-50 pb-4"
          >
            How It Works
          </button>
          
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Our Services</span>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  onNavigate(service.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-bold pl-4 py-1 text-left ${currentView === service.id ? 'text-indigo-600' : 'text-slate-600'}`}
              >
                {service.title}
              </button>
            ))}
          </div>

          <a href="https://wa.me/27687240126" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white py-4 rounded-2xl font-black text-center uppercase tracking-widest text-xs">
            Chat to Consultant
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
