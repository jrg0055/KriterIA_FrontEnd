import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
// Common components
import PublicLayout from './components/common/PublicLayout';
import BackendConnector from './components/BackendConnector';
// Pages
import LandingContent from './pages/LandingContent';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import StoresPage from './pages/StoresPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
// Features - Auth
import LoginScreen from './features/auth/LoginScreen';
import RegisterScreen from './features/auth/RegisterScreen';
// Features - Shopping
import Dashboard from './features/shopping/Dashboard';

const KriterIA_App = () => {
    const [currentView, setCurrentView] = useState('landing');
    const [initialQuery, setInitialQuery] = useState(null);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slide-in-right {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(140,82,255,0.3); }
                50% { box-shadow: 0 0 40px rgba(140,82,255,0.6); }
            }
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
            .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
            .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
            .animate-float { animation: float 3s ease-in-out infinite; }
            .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
            .animate-gradient { 
                background-size: 200% 200%;
                animation: gradient-shift 3s ease infinite; 
            }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            html { scroll-behavior: smooth; }
            ::selection {
                background: rgba(140,82,255,0.4);
                color: white;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const handleStart = (query) => {
        setInitialQuery(query);
        setCurrentView('login');
    };

    const handleLoginSuccess = () => {
        setCurrentView('dashboard');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'login':
                return (
                    <LoginScreen
                        onLoginSuccess={handleLoginSuccess}
                        onBack={() => setCurrentView('landing')}
                        onRegisterClick={() => setCurrentView('register')}
                        initialQuery={initialQuery}
                    />
                );
            case 'register':
                return (
                    <RegisterScreen
                        onRegisterSuccess={handleLoginSuccess}
                        onBack={() => setCurrentView('landing')}
                        onLoginClick={() => setCurrentView('login')}
                    />
                );
            case 'dashboard':
                return <Dashboard onLogout={() => setCurrentView('landing')} />;
            case 'how-it-works':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <HowItWorksPage />
                    </PublicLayout>
                );
            case 'pricing':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <PricingPage />
                    </PublicLayout>
                );
            case 'stores':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <StoresPage />
                    </PublicLayout>
                );
            case 'about':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <AboutPage />
                    </PublicLayout>
                );
            case 'contact':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <ContactPage />
                    </PublicLayout>
                );
            case 'privacy':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <PrivacyPage />
                    </PublicLayout>
                );
            case 'terms':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <TermsPage />
                    </PublicLayout>
                );
            case 'cookies':
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')}>
                        <CookiesPage />
                    </PublicLayout>
                );
            case 'landing':
            default:
                return (
                    <PublicLayout onNavigate={setCurrentView} onLogin={() => setCurrentView('login')}>
                        <LandingContent onStart={handleStart} onNavigate={setCurrentView} />
                    </PublicLayout>
                );
        }
    };

    return (
        <ToastProvider>
            <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
                {/* Componente de verificación de conexión con el backend */}
                <BackendConnector />
                
                {renderContent()}
            </div>
        </ToastProvider>
    );
};

export default KriterIA_App;