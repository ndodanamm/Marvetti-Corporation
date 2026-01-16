
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessFlow from './components/ProcessFlow';
import ServiceTiles from './components/ServiceTiles';
import StandaloneUpsells from './components/StandaloneUpsells';
import AIAssistant from './components/AIAssistant';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import LeadCapturePopup from './components/LeadCapturePopup';
import FAQ from './components/FAQ';
import FAQPage from './components/FAQPage';
import AffiliatePage from './components/AffiliatePage';
import OrderQuoteForm from './components/OrderQuoteForm';
import ClientDashboard from './components/ClientDashboard';
import ClientAuth from './components/ClientAuth';
import StaffDashboard from './components/StaffDashboard';
import StaffAuth from './components/StaffAuth';
import Footer from './components/Footer';
import ServicePage from './components/ServicePage';
import HowItWorksPage from './components/HowItWorksPage';
import PortfolioPage from './components/PortfolioPage';
import { SERVICES_DATA } from './constants';
import { User, StaffUser } from './types';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

type ViewState = 'home' | 'how-it-works' | 'portfolio' | 'faq' | 'affiliate' | 'order-quote' | 'dashboard' | 'auth' | 'staff-dashboard' | 'staff-auth' | string;

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentStaff, setCurrentStaff] = useState<StaffUser | null>(null);

  useEffect(() => {
    // Check sessions
    const savedUser = localStorage.getItem('marvetti_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedStaff = localStorage.getItem('marvetti_staff');
    if (savedStaff) setCurrentStaff(JSON.parse(savedStaff));

    // Handle deep-linking via query params (e.g. ?view=staff)
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'staff') {
      setActiveView(savedStaff ? 'staff-dashboard' : 'staff-auth');
    } else if (viewParam) {
      setActiveView(viewParam);
    }

    const timer = setTimeout(() => setIsAppLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: ViewState) => {
    if (view === 'dashboard' && !currentUser) {
      setActiveView('auth');
    } else if (view === 'staff-dashboard' && !currentStaff) {
      setActiveView('staff-auth');
    } else {
      setActiveView(view);
    }
    setPreSelectedServiceId(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Clear view param from URL without refreshing
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    window.history.replaceState({}, '', url);
  };

  const handleOrderService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setActiveView('order-quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveView('dashboard');
  };

  const handleStaffAuthSuccess = (staff: StaffUser) => {
    setCurrentStaff(staff);
    setActiveView('staff-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('marvetti_user');
    setCurrentUser(null);
    setActiveView('home');
  };

  const handleStaffLogout = () => {
    localStorage.removeItem('marvetti_staff');
    setCurrentStaff(null);
    setActiveView('home');
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[200] flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl font-black tracking-tighter text-white uppercase mb-4">
            MARVETTI <span className="text-indigo-500">CORP</span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 animate-pulse">
            Initializing Core Solutions
          </span>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 w-full origin-left animate-[loading-bar_2s_ease-in-out_forwards]"></div>
          </div>
        </div>
        <style>{`
          @keyframes loading-bar {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
        `}</style>
      </div>
    );
  }

  // Handle direct staff-only rendering
  if (activeView === 'staff-dashboard' && currentStaff) {
    return <StaffDashboard user={currentStaff} onLogout={handleStaffLogout} />;
  }
  if (activeView === 'staff-auth') {
    return <StaffAuth onAuthSuccess={handleStaffAuthSuccess} onBack={() => handleNavigate('home')} />;
  }

  const activeService = SERVICES_DATA.find(s => s.id === activeView);

  return (
    <div className="min-h-screen flex flex-col scroll-smooth animate-in fade-in duration-700">
      <Header onNavigate={handleNavigate} currentView={activeView} isAuthenticated={!!currentUser} />
      
      <main className="flex-grow">
        {activeService ? (
          <ServicePage 
            service={activeService} 
            onBack={() => handleNavigate('home')} 
            onOrder={() => handleOrderService(activeService.id)}
          />
        ) : activeView === 'how-it-works' ? (
          <HowItWorksPage onBack={() => handleNavigate('home')} />
        ) : activeView === 'portfolio' ? (
          <PortfolioPage onBack={() => handleNavigate('home')} />
        ) : activeView === 'faq' ? (
          <FAQPage onBack={() => handleNavigate('home')} />
        ) : activeView === 'affiliate' ? (
          <AffiliatePage onBack={() => handleNavigate('home')} />
        ) : activeView === 'auth' ? (
          <ClientAuth onAuthSuccess={handleAuthSuccess} onBack={() => handleNavigate('home')} />
        ) : activeView === 'dashboard' ? (
          <ClientDashboard 
            user={currentUser!} 
            onBack={() => handleNavigate('home')} 
            onLogout={handleLogout}
            onOrderService={handleOrderService}
          />
        ) : activeView === 'order-quote' ? (
          <OrderQuoteForm 
            onBack={() => (currentUser ? handleNavigate('dashboard') : handleNavigate('home'))} 
            initialServiceId={preSelectedServiceId}
          />
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            
            <section className="bg-slate-950 py-16 border-y border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,#4f46e5,transparent)]"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                   <span className="text-xl font-black tracking-tighter text-white uppercase">MARVETTI CORP</span>
                   <span className="text-xl font-black tracking-tighter text-white">GLOBAL_OPS</span>
                   <span className="text-xl font-black tracking-tighter text-white">TECH_SOLUTIONS</span>
                   <span className="text-xl font-black tracking-tighter text-white">SOFT_SKILLS_PRO</span>
                   <span className="text-xl font-black tracking-tighter text-white">DIGITAL_PILLAR</span>
                </div>
              </div>
            </section>

            <ProcessFlow onViewDetails={() => handleNavigate('how-it-works')} />

            <ServiceTiles onSelectService={(id) => handleNavigate(id)} />

            <StandaloneUpsells onOrder={handleOrderService} />

            <Portfolio onViewAll={() => handleNavigate('portfolio')} />

            <Testimonials />
            
            <AIAssistant />

            <FAQ onViewAll={() => handleNavigate('faq')} />

            <section id="contact" className="py-40 bg-slate-950 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]"></div>
              
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none uppercase">
                  Start Your Journey with <br />
                  <span className="text-indigo-500">MARVETTI CORP</span>
                </h2>
                <p className="text-slate-400 text-xl mb-16 max-w-2xl mx-auto font-medium">
                  Join hundreds of organizations who have digitized their core functions through the Marvetti framework. Remote-first. Solution-driven.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a 
                    href="https://wa.me/27687240126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-900/40 transition-all flex items-center justify-center gap-3"
                  >
                    Start Consultation <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a 
                    href="#services" 
                    className="bg-white/5 text-white hover:bg-white/10 px-12 py-6 rounded-[2rem] border border-white/10 font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 backdrop-blur-md"
                  >
                    Browse All Tiles
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <LeadCapturePopup />

      <div className="fixed bottom-10 right-10 z-[90] flex flex-col items-end gap-4 pointer-events-none">
         <a 
          href="https://wa.me/27687240126"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-emerald-500 hover:bg-emerald-600 text-white p-5 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <MessageCircle className="w-8 h-8 relative z-10" />
          <span className="absolute right-full mr-6 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
            Chat to Consultant
          </span>
        </a>
      </div>
      
      <section className="bg-slate-950 pt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div id="policies" className="font-inter pb-10 text-[9px] font-black leading-relaxed opacity-20 text-center uppercase tracking-[0.3em] max-w-4xl mx-auto text-white">
            POPIA Disclaimer: Marvetti Corp respects your privacy. By engaging with our platform, you consent to our data collection protocols in line with South African legislation (POPIA). All storage is encrypted and strictly used for project facilitation and professional communications.
          </div>
          <div className="pb-10 flex justify-center">
            <button 
              onClick={() => handleNavigate('staff-auth')}
              className="text-[8px] font-black text-slate-700 uppercase tracking-widest hover:text-indigo-500 transition-colors"
            >
              Staff Internal Portal
            </button>
          </div>
        </div>
      </section>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
