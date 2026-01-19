import React from 'react';
import { FileText, AlertCircle, Scale, ScrollText } from 'lucide-react';
import pattern from '../assets/Geometric Pattern.png';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-[#1b1b1b] flex flex-col items-center px-4 py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-5 pointer-events-none">
                <img src={pattern} alt="Pattern" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-4xl w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                        <ScrollText size={16} className="text-[#8c52ff]" />
                        <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Términos y Condiciones</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Las reglas del juego. Por favor, lee detenidamente nuestras condiciones de uso.
                    </p>
                </div>

                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

                    <div className="bg-[#252525] border border-white/5 rounded-2xl p-8 hover:border-[#8c52ff]/30 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <Scale size={20} className="text-[#8c52ff]" />
                            1. Aceptación de los Términos
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Al acceder y utilizar KriterIA, aceptas estar legalmente vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.
                        </p>
                    </div>

                    <div className="bg-[#252525] border border-white/5 rounded-2xl p-8 hover:border-[#8c52ff]/30 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <FileText size={20} className="text-[#8c52ff]" />
                            2. Uso del Servicio
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-4">
                            KriterIA proporciona una herramienta de comparación de productos impulsada por IA. Te comprometes a utilizar el servicio solo para fines legales y de acuerdo con estos términos.
                        </p>
                        <ul className="list-disc pl-5 text-gray-400 text-sm space-y-2">
                            <li>No debes usar el servicio para actividades ilegales.</li>
                            <li>No debes intentar acceder a áreas restringidas del sistema.</li>
                            <li>No debes utilizar bots o scrapers sin autorización.</li>
                        </ul>
                    </div>

                    <div className="bg-[#252525] border border-white/5 rounded-2xl p-8 hover:border-[#8c52ff]/30 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <AlertCircle size={20} className="text-[#8c52ff]" />
                            3. Limitación de Responsabilidad
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            KriterIA no garantiza la exactitud completa de los precios mostrados, ya que estos pueden cambiar en tiempo real en las tiendas de origen. No nos hacemos responsables de discrepancias o errores en los datos de terceros.
                        </p>
                    </div>

                    <div className="bg-[#252525] border border-white/5 rounded-2xl p-8 hover:border-[#8c52ff]/30 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-4">
                            4. Modificaciones
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico.
                        </p>
                    </div>

                </div>

                <div className="text-center text-gray-500 text-sm border-t border-white/5 pt-8 mt-12">
                    Si tienes preguntas sobre nuestros términos, contáctanos en <a href="mailto:legal@kriteria.com" className="text-[#8c52ff] hover:underline">legal@kriteria.com</a>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
