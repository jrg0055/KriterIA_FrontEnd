import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import CookieBanner from '../ui/CookieBanner';

const PublicLayout = ({ children, onNavigate, onLogin, onRegister }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'how-it-works', label: 'Cómo Funciona', hasDropdown: false },
        { id: 'pricing', label: 'Precios', hasDropdown: false },
        { id: 'stores', label: 'Tiendas', hasDropdown: false },
        {
            id: 'company',
            label: 'Empresa',
            hasDropdown: true,
            dropdownItems: [
                { id: 'about', label: 'Sobre Nosotros' },
                { id: 'contact', label: 'Contacto' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#1b1b1b] relative overflow-x-hidden flex flex-col">
            {/* Background Effects */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8c52ff] rounded-full blur-[120px] opacity-20 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-10 pointer-events-none" />

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#1b1b1b]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
                    <Logo onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        onNavigate('landing');
                    }} />

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div key={item.id} className="relative group">
                                {item.hasDropdown ? (
                                    <button
                                        onMouseEnter={() => setActiveDropdown(item.id)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                        className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white font-medium text-sm transition-all rounded-lg hover:bg-white/5"
                                    >
                                        {item.label}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onNavigate(item.id)}
                                        className="px-4 py-2 text-gray-300 hover:text-white font-medium text-sm transition-all rounded-lg hover:bg-white/5 relative group"
                                    >
                                        {item.label}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#8c52ff] group-hover:w-1/2 transition-all duration-300" />
                                    </button>
                                )}

                                {/* Dropdown Menu */}
                                {item.hasDropdown && (
                                    <div
                                        onMouseEnter={() => setActiveDropdown(item.id)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                        className={`absolute top-full left-0 mt-2 w-48 bg-[#252525] border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${activeDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                                    >
                                        {item.dropdownItems.map((dropItem) => (
                                            <button
                                                key={dropItem.id}
                                                onClick={() => { onNavigate(dropItem.id); setActiveDropdown(null); }}
                                                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-[#8c52ff]/10 transition-all text-sm font-medium flex items-center gap-3 group"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#8c52ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {dropItem.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* GitHub Button */}
                        <a
                            href="https://github.com/jrg0055/KriterIA_FrontEnd.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub ★ 168,853
                        </a>
                        <Button variant="ghost" onClick={onLogin} className="text-sm">Iniciar Sesión</Button>
                        <Button onClick={onRegister || onLogin} className="text-sm group">
                            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                            Empezar Gratis
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-[#1b1b1b]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible max-h-[500px]' : 'opacity-0 invisible max-h-0'} overflow-hidden`}>
                    <div className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <div key={item.id}>
                                {item.hasDropdown ? (
                                    <div className="space-y-1">
                                        <div className="px-4 py-3 text-gray-500 text-sm font-medium">{item.label}</div>
                                        {item.dropdownItems.map((dropItem) => (
                                            <button
                                                key={dropItem.id}
                                                onClick={() => { onNavigate(dropItem.id); setMobileMenuOpen(false); }}
                                                className="w-full text-left px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
                                            >
                                                {dropItem.label}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        {item.label}
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="pt-4 border-t border-white/5 space-y-3">
                            <Button className="w-full" onClick={() => { (onRegister || onLogin)(); setMobileMenuOpen(false); }}>
                                Empezar Gratis
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 relative z-10 pt-24">
                {children}
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-white/5 py-8 px-8 bg-[#151515] relative z-10 mt-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <Logo onClick={() => onNavigate('landing')} size="text-xl" />
                            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                Tu asistente de compras inteligente con IA.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Producto</h4>
                            <ul className="space-y-2 text-sm">
                                <li><button onClick={() => onNavigate('how-it-works')} className="text-gray-400 hover:text-white transition-colors">Cómo Funciona</button></li>
                                <li><button onClick={() => onNavigate('pricing')} className="text-gray-400 hover:text-white transition-colors">Precios</button></li>
                                <li><button onClick={() => onNavigate('stores')} className="text-gray-400 hover:text-white transition-colors">Tiendas</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Empresa</h4>
                            <ul className="space-y-2 text-sm">
                                <li><button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</button></li>
                                <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">Contacto</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-white transition-colors">Privacidad</button></li>
                                <li><button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-white transition-colors">Términos</button></li>
                                <li><button onClick={() => onNavigate('cookies')} className="text-gray-400 hover:text-white transition-colors">Cookies</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                        <div className="text-xs text-gray-500">© 2025 KriterIA Inc. Todos los derechos reservados.</div>
                        <div className="flex items-center gap-4">
                            {/* GitHub */}
                            <a
                                href="https://github.com/jrg0055/KriterIA_FrontEnd.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="GitHub"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Cookie Banner */}
            <CookieBanner />
        </div>
    );
};

export default PublicLayout;
