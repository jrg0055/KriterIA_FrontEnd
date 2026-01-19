import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings, Check, ChevronRight } from 'lucide-react';

/**
 * Banner de cookies editable estilo n8n
 */
const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Siempre activo
        analytics: false,
        marketing: false,
        personalization: false,
    });

    // Comprobar si ya se aceptaron las cookies
    useEffect(() => {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            // Mostrar después de un pequeño delay para mejor UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
            personalization: true,
        };
        setPreferences(allAccepted);
        localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        const onlyNecessary = {
            necessary: true,
            analytics: false,
            marketing: false,
            personalization: false,
        };
        setPreferences(onlyNecessary);
        localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        setIsVisible(false);
        setShowSettings(false);
    };

    const togglePreference = (key) => {
        if (key === 'necessary') return; // No se puede desactivar
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Botón flotante para reabrir configuración
    const FloatingCookieButton = () => (
        <button
            onClick={() => { setIsVisible(true); setShowSettings(true); }}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-[#252525] border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:border-[#8c52ff]/50 transition-all group"
            title="Configurar cookies"
        >
            <Cookie size={20} className="text-[#8c52ff] group-hover:rotate-12 transition-transform" />
        </button>
    );

    if (!isVisible) {
        return <FloatingCookieButton />;
    }

    const cookieTypes = [
        {
            key: 'necessary',
            title: 'Cookies Necesarias',
            description: 'Esenciales para el funcionamiento básico del sitio. No pueden desactivarse.',
            required: true,
        },
        {
            key: 'analytics',
            title: 'Cookies de Análisis',
            description: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
            required: false,
        },
        {
            key: 'marketing',
            title: 'Cookies de Marketing',
            description: 'Se utilizan para mostrarte publicidad relevante.',
            required: false,
        },
        {
            key: 'personalization',
            title: 'Cookies de Personalización',
            description: 'Permiten recordar tus preferencias y personalizar tu experiencia.',
            required: false,
        },
    ];

    return (
        <>
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={() => !showSettings && setIsVisible(false)}
            />

            {/* Banner principal */}
            <div className={`fixed z-50 transition-all duration-500 ${showSettings
                    ? 'inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[80vh]'
                    : 'bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:w-[420px]'
                }`}>
                <div className="bg-[#1b1b1b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#8c52ff]/20 rounded-xl flex items-center justify-center">
                                    <Cookie size={20} className="text-[#8c52ff]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">
                                        {showSettings ? 'Configurar Cookies' : 'Utilizamos Cookies'}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {showSettings ? 'Personaliza tus preferencias' : 'Tu privacidad es importante'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${showSettings ? 'max-h-[400px] overflow-y-auto' : ''}`}>
                        {!showSettings ? (
                            <>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.
                                    Puedes aceptar todas, rechazarlas o configurar tus preferencias.
                                </p>
                            </>
                        ) : (
                            <div className="space-y-4">
                                {cookieTypes.map((type) => (
                                    <div
                                        key={type.key}
                                        className={`p-4 rounded-xl border transition-all ${preferences[type.key]
                                                ? 'bg-[#8c52ff]/10 border-[#8c52ff]/30'
                                                : 'bg-white/5 border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-medium">{type.title}</span>
                                            <button
                                                onClick={() => togglePreference(type.key)}
                                                disabled={type.required}
                                                className={`w-12 h-6 rounded-full transition-all relative ${preferences[type.key]
                                                        ? 'bg-[#8c52ff]'
                                                        : 'bg-gray-600'
                                                    } ${type.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences[type.key] ? 'left-7' : 'left-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                        <p className="text-gray-400 text-sm">{type.description}</p>
                                        {type.required && (
                                            <span className="text-xs text-[#8c52ff] mt-2 inline-block">Siempre activo</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer con botones */}
                    <div className="p-6 border-t border-white/5 flex flex-wrap gap-3">
                        {!showSettings ? (
                            <>
                                <button
                                    onClick={handleRejectAll}
                                    className="flex-1 px-4 py-3 border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium"
                                >
                                    Rechazar todas
                                </button>
                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="flex-1 px-4 py-3 border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <Settings size={16} />
                                    Configurar
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 px-4 py-3 bg-[#8c52ff] hover:bg-[#7a45e6] text-white rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <Check size={16} />
                                    Aceptar todas
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="flex-1 px-4 py-3 border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium"
                                >
                                    Volver
                                </button>
                                <button
                                    onClick={handleSavePreferences}
                                    className="flex-1 px-4 py-3 bg-[#8c52ff] hover:bg-[#7a45e6] text-white rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <Check size={16} />
                                    Guardar preferencias
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieBanner;
