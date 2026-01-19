
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Zap, LayoutDashboard, Sparkles } from 'lucide-react';
import { STAGES_DATA } from '../constants';

interface HeaderProps {
  onNavigate: (view: any) => void;
  currentView: string;
  isAuthenticated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, isAuthenticated }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stagesOpen, setStagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStagesOpen(false);
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
              MARVETTI <span className="text-brand-500">CORPORATION</span>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setStagesOpen(true)}
                onClick={() => setStagesOpen(!stagesOpen)}
                className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-500 ${
                  isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
                }`}
              >
                Stages 1-12 <ChevronDown className={`w-3 h-3 transition-transform ${stagesOpen ? 'rotate-180' : ''}`} />
              </button>

              {stagesOpen && (
                <div 
                  onMouseLeave={() => setStagesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden py-4 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="px-6 py-2 mb-2 border-b border-slate-50">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-500">Master Sequence</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {STAGES_DATA.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => {
                          onNavigate(stage.id);
                          setStagesOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 hover:bg-slate-50 transition-colors group flex items-center gap-3 ${currentView === stage.id ? 'bg-slate-50' : ''}`}
                      >
                        <div className="text-[10px] font-black text-slate-300 group-hover:text-brand-500 transition-colors">{stage.stageNumber}</div>
                        <div>
                          <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider">{stage.title}</div>
                          <div className="text-[9px] text-slate-400 font-medium line-clamp-1">{stage.shortDescription}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('ai-studio')}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-500 ${
                currentView === 'ai-studio' ? 'text-brand-600' : isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Lab
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-500 ${
                currentView === 'portfolio' ? 'text-brand-600' : isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
              }`}
            >
              Results
            </button>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-500 flex items-center gap-2 ${
                   currentView === 'dashboard' ? 'text-brand-600' : isScrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> {isAuthenticated ? 'Nexus' : 'Sign In'}
              </button>
              <button 
                onClick={() => onNavigate('order-quote')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                  isScrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-950'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-brand-500" /> Start Project
              </button>
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
            className="text-lg font-black text-brand-600 text-left border-b border-slate-50 pb-4"
          >
            Nexus Dashboard
          </button>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Select Stage</span>
            {STAGES_DATA.map((stage) => (
              <button
                key={stage.id}
                onClick={() => {
                  onNavigate(stage.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-bold pl-4 py-1 text-left ${currentView === stage.id ? 'text-brand-600' : 'text-slate-600'}`}
              >
                Stage {stage.stageNumber}: {stage.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
