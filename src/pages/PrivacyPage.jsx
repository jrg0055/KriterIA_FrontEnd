import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import { THEME } from '../constants/theme';
import trustBadge from '../assets/Trust Badge.png';

const PrivacyPage = () => {
    const sections = [
        {
            title: "1. Información que recopilamos",
            content: "Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico cuando te registras, y datos de uso de la aplicación para mejorar nuestros servicios."
        },
        {
            title: "2. Uso de la información",
            content: "Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones y enviarte notificaciones importantes relacionadas con tu cuenta."
        },
        {
            title: "3. Protección de datos",
            content: "Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado, la pérdida o la alteración."
        },
        {
            title: "4. Tus derechos",
            content: "Tienes derecho a acceder, corregir o eliminar tus datos personales. Puedes ejercer estos derechos contactándonos a través de nuestro formulario de soporte o correo electrónico."
        }
    ];

    return (
        <div className="min-h-screen bg-[#1b1b1b] flex flex-col items-center px-4 py-16">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                        <Shield size={16} className="text-[#8c52ff]" />
                        <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Política de Privacidad</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Tu privacidad es nuestra prioridad. Te explicamos de forma transparente cómo tratamos tus datos.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-[#252525] border border-white/5 rounded-2xl p-6 hover:border-[#8c52ff]/30 transition-colors">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#8c52ff]/20 text-[#8c52ff] flex items-center justify-center text-sm font-bold">
                                        {idx + 1}
                                    </span>
                                    {section.title.substring(3)}
                                </h2>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base pl-11">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="md:col-span-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="bg-[#252525] border border-white/5 rounded-2xl p-6 text-center">
                            <img src={trustBadge} alt="Trust Badge" className="w-24 mx-auto mb-4 opacity-80" />
                            <h3 className="text-white font-bold mb-2">Certificado SSL</h3>
                            <p className="text-xs text-gray-500">Tus datos viajan cifrados de extremo a extremo.</p>
                        </div>

                        <div className="bg-gradient-to-br from-[#8c52ff]/20 to-[#8c52ff]/5 border border-[#8c52ff]/20 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <CheckCircle size={18} className="text-[#8c52ff]" />
                                Compromiso
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8c52ff]"></div>
                                    No vendemos tus datos
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8c52ff]"></div>
                                    Cumplimos el RGPD
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8c52ff]"></div>
                                    Transparencia total
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8">
                    Última actualización: Diciembre 2024
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
