import React from 'react';
import { Cookie, Info, Settings, ToggleRight } from 'lucide-react';
import bgImage from '../assets/Bokeh Light Background.png';

const CookiesPage = () => {
    return (
        <div className="min-h-screen bg-[#1b1b1b] flex flex-col items-center px-4 py-16 relative overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover grayscale" />
            </div>

            <div className="max-w-4xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                        <Cookie size={16} className="text-[#8c52ff]" />
                        <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">Cookies</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Política de Cookies</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Utilizamos cookies para mejorar tu experiencia. Aquí te explicamos cuáles y por qué.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

                    <div className="bg-[#252525]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                            <Info size={24} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Esenciales</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Necesarias para el funcionamiento básico del sitio, como el inicio de sesión y la seguridad. No se pueden desactivar.
                        </p>
                        <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wide">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Siempre Activas
                        </div>
                    </div>

                    <div className="bg-[#252525]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
                        <div className="w-12 h-12 bg-[#8c52ff]/20 rounded-xl flex items-center justify-center text-[#8c52ff] mb-4">
                            <Settings size={24} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Analíticas y Rendimiento</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Nos ayudan a entender cómo usas la web para mejorarla. Todos los datos son anónimos.
                        </p>
                        <button className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium transition-colors">
                            <ToggleRight size={20} className="text-[#8c52ff]" />
                            Configurar
                        </button>
                    </div>

                    <div className="md:col-span-2 bg-[#252525]/90 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-white mb-4">¿Qué es una cookie?</h2>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Una cookie es un pequeño archivo de texto que un sitio web guarda en tu ordenador o dispositivo móvil cuando lo visitas. Permite al sitio recordar tus acciones y preferencias (como el inicio de sesión, idioma, tamaño de fuente y otras preferencias de visualización) durante un período de tiempo, para que no tengas que volver a introducirlas cada vez que regreses al sitio o navegues de una página a otra.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <button className="bg-[#8c52ff] hover:bg-[#7a45e6] text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(140,82,255,0.4)]">
                        Aceptar Todas
                    </button>
                    <button className="ml-4 px-8 py-3 rounded-xl font-medium text-gray-400 hover:text-white transition-colors">
                        Rechazar No Esenciales
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiesPage;
