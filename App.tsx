
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessFlow from './components/ProcessFlow';
import CommercialPillars from './components/CommercialPillars';
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
import AIStudio from './components/AIStudio';
import Footer from './components/Footer';
import ServicePage from './components/ServicePage';
import HowItWorksPage from './components/HowItWorksPage';
import PortfolioPage from './components/PortfolioPage';
import { SERVICES_DATA, STAGES_DATA } from './constants';
import { User, StaffUser } from './types';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

type ViewState = 'home' | 'how-it-works' | 'portfolio' | 'faq' | 'affiliate' | 'order-quote' | 'dashboard' | 'auth' | 'staff-dashboard' | 'staff-auth' | 'ai-studio' | string;

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewState>('home');
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentStaff, setCurrentStaff] = useState<StaffUser | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('marvetti_user');
      if (savedUser && savedUser !== 'undefined') {
        setCurrentUser(JSON.parse(savedUser));
      }

      const savedStaff = localStorage.getItem('marvetti_staff');
      if (savedStaff && savedStaff !== 'undefined') {
        setCurrentStaff(JSON.parse(savedStaff));
      }
    } catch (error) {
      console.error("Nexus Hydration Error:", error);
      localStorage.removeItem('marvetti_user');
      localStorage.removeItem('marvetti_staff');
    }

    const timer = setTimeout(() => setIsAppLoading(false), 2000);
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
  };

  const handleOrderStage = (stageId: string) => {
    setPreSelectedServiceId(stageId);
    setActiveView('order-quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('marvetti_user');
    setCurrentUser(null);
    setActiveView('home');
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-[200] flex flex-col items-center justify-center gap-8">
        <span className="text-4xl font-black tracking-tighter text-white uppercase">MARVETTI <span className="text-brand-500">CORPORATION</span></span>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-brand-500 w-full origin-left animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (activeView === 'staff-dashboard' && currentStaff) {
    return <StaffDashboard user={currentStaff} onLogout={() => { localStorage.removeItem('marvetti_staff'); setCurrentStaff(null); setActiveView('home'); }} />;
  }

  const activeStage = STAGES_DATA.find(s => s.id === activeView);

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-700">
      <Header onNavigate={handleNavigate} currentView={activeView} isAuthenticated={!!currentUser} />
      
      <main className="flex-grow">
        {activeStage ? (
          <OrderQuoteForm 
            onBack={() => handleNavigate('home')} 
            initialServiceId={activeStage.id} 
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
            onOrderService={handleOrderStage}
          />
        ) : activeView === 'order-quote' ? (
          <OrderQuoteForm 
            onBack={() => (currentUser ? handleNavigate('dashboard') : handleNavigate('home'))} 
            initialServiceId={preSelectedServiceId}
          />
        ) : activeView === 'staff-auth' ? (
          <StaffAuth onAuthSuccess={(s) => { setCurrentStaff(s); setActiveView('staff-dashboard'); }} onBack={() => handleNavigate('home')} />
        ) : activeView === 'ai-studio' ? (
          <AIStudio onBack={() => handleNavigate('home')} onOrder={handleOrderStage} />
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <ProcessFlow onViewDetails={() => handleNavigate('how-it-works')} />
            <CommercialPillars onSelectPillar={handleOrderStage} />
            <ServiceTiles onSelectService={handleOrderStage} />
            <StandaloneUpsells onOrder={handleOrderStage} />
            <Portfolio onViewAll={() => handleNavigate('portfolio')} />
            <Testimonials />
            <AIAssistant />
            <FAQ onViewAll={() => handleNavigate('faq')} />

            <section id="contact" className="py-40 bg-slate-950 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,27,35,0.1),transparent_70%)]"></div>
              <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none uppercase">
                  Start Your <br />
                  <span className="text-brand-500">Master Sequence</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a href="https://wa.me/27687240126" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3">
                    Start Consultation <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <button onClick={() => handleNavigate('order-quote')} className="bg-brand-gradient text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3">
                    Direct Entry <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <LeadCapturePopup />

      <div className="fixed bottom-10 right-10 z-[90] pointer-events-none">
         <a 
          href="https://wa.me/27687240126"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto bg-slate-800 hover:bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center group relative overflow-hidden"
        >
          <MessageCircle className="w-8 h-8 relative z-10" />
          <span className="absolute right-full mr-6 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
            Live Consultant
          </span>
        </a>
      </div>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
