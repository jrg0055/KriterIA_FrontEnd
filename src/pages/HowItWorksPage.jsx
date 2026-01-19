import React from 'react';
import { Search, Zap, LayoutGrid, Shield, ArrowRight, Sparkles } from 'lucide-react';

const HowItWorksPage = () => {
    const steps = [
        {
            icon: Search,
            title: "Busca cualquier producto",
            description: "Escribe lo que necesitas en lenguaje natural. Nuestra IA entiende exactamente lo que buscas.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Zap,
            title: "Análisis instantáneo",
            description: "Comparamos precios, características y reseñas de todas las tiendas principales en segundos.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: LayoutGrid,
            title: "Resultados claros",
            description: "Te mostramos las mejores opciones ordenadas por relevancia, precio y valoraciones.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Shield,
            title: "Compra con confianza",
            description: "Verificamos la fiabilidad de cada tienda y te alertamos de posibles reseñas falsas.",
            color: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <div className="flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                    <Sparkles size={16} className="text-[#8c52ff]" />
                    <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">
                        Cómo Funciona
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Comprar nunca fue<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] to-purple-400">
                        tan fácil
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Cuatro simples pasos para encontrar el mejor producto al mejor precio.
                </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-20">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="relative group animate-fade-in-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Connector Line */}
                        {idx < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-white/10 to-transparent" />
                        )}

                        <div className="bg-[#252525] border border-white/5 rounded-2xl p-6 hover:border-[#8c52ff]/30 transition-all duration-500 hover:-translate-y-2 h-full">
                            {/* Step Number */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#8c52ff] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                {idx + 1}
                            </div>

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-0.5 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <div className="w-full h-full bg-[#252525] rounded-[10px] flex items-center justify-center">
                                    <step.icon size={24} className="text-white" />
                                </div>
                            </div>

                            <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Demo Section */}
            <div className="w-full bg-gradient-to-r from-[#8c52ff]/20 via-[#8c52ff]/10 to-[#8c52ff]/20 border border-[#8c52ff]/20 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/5 to-transparent" />
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        ¿Listo para empezar?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Únete a miles de compradores que ya ahorran tiempo y dinero con KriterIA.
                    </p>
                    <button className="bg-[#8c52ff] hover:bg-[#7a45e6] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(140,82,255,0.4)] inline-flex items-center gap-2">
                        Probar Gratis
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;
