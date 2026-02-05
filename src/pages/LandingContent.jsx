import React, { useState, useEffect, useRef } from 'react';
import {
    Sparkles, ArrowRight, Zap, Shield, LayoutGrid, TrendingUp,
    Users, Star, CheckCircle, Search, ShoppingCart, Percent,
    Clock, Globe, Lock, Award, ChevronRight, Play
} from 'lucide-react';
import StackingSection, { AnimatedOnScroll, AnimatedCounter } from '../components/ui/StackingSection';
import IntegrationCarousel from '../components/ui/IntegrationCarousel';
import SpotlightCard from '../components/ui/SpotlightCard';

const LandingContent = ({ onStart, onNavigate }) => {
    const [query, setQuery] = useState("");
    const [typedText, setTypedText] = useState("");
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

    const placeholders = [
        "Auriculares con cancelación de ruido...",
        "Portátil para diseño gráfico...",
        "Zapatillas running bajo 100€...",
        "Smartphone con mejor cámara..."
    ];

    useEffect(() => {
        let charIndex = 0;
        const placeholder = placeholders[currentPlaceholder];
        const typingInterval = setInterval(() => {
            if (charIndex <= placeholder.length) {
                setTypedText(placeholder.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
                }, 2000);
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, [currentPlaceholder]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart(query.trim() || null);
    };

    // Datos para las secciones
    const stats = [
        { value: 500000, suffix: "+", label: "Usuarios activos", icon: Users },
        { value: 10, suffix: "M+", label: "Productos analizados", icon: Search },
        { value: 50, suffix: "M€", label: "Ahorrados por usuarios", icon: TrendingUp },
    ];

    const features = [
        {
            icon: Zap,
            title: "Búsqueda Instantánea",
            desc: "Nuestra IA analiza millones de productos en segundos para encontrar exactamente lo que necesitas.",
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: Shield,
            title: "Precios Verificados",
            desc: "Comparamos precios en tiempo real de las tiendas más fiables del mercado.",
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: LayoutGrid,
            title: "Todo en un Lugar",
            desc: "Amazon, eBay, AliExpress y más. Compara sin saltar entre pestañas.",
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Clock,
            title: "Alertas de Precio",
            desc: "Te notificamos cuando el producto que quieres baja de precio. No pierdas ninguna oferta.",
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Globe,
            title: "Cobertura Global",
            desc: "Buscamos en tiendas de todo el mundo y te mostramos el mejor precio con envío incluido.",
            color: 'from-indigo-500 to-violet-500'
        },
        {
            icon: Award,
            title: "Recomendaciones IA",
            desc: "Nuestro asistente inteligente aprende tus preferencias y sugiere productos perfectos para ti.",
            color: 'from-rose-500 to-red-500'
        }
    ];

    const useCases = [
        {
            title: "Encuentra el portátil perfecto",
            desc: "\"Portátil para programar con buena pantalla\"",
            savings: "Ahorra hasta 200€",
            bgColor: "from-blue-600/20 to-cyan-600/20"
        },
        {
            title: "Compara smartphones",
            desc: "\"Móvil con la mejor cámara por menos de 500€\"",
            savings: "Ahorra hasta 150€",
            bgColor: "from-purple-600/20 to-pink-600/20"
        },
        {
            title: "Electrónica del hogar",
            desc: "\"Aspirador robot con mapeo inteligente\"",
            savings: "Ahorra hasta 100€",
            bgColor: "from-green-600/20 to-emerald-600/20"
        }
    ];

    const testimonials = [
        {
            name: "María G.",
            role: "Diseñadora",
            text: "Encontré mi MacBook Pro 300€ más barato que en la tienda oficial. ¡Increíble!",
            rating: 5
        },
        {
            name: "Carlos R.",
            role: "Desarrollador",
            text: "La IA entendió exactamente lo que buscaba. Me recomendó el monitor perfecto para mi setup.",
            rating: 5
        },
        {
            name: "Ana L.",
            role: "Estudiante",
            text: "Ya no pierdo horas comparando precios. Esta herramienta lo hace todo por mí.",
            rating: 5
        },
        {
            name: "James W.",
            role: "Software Engineer",
            text: "Best price comparison tool I've ever used. Saved me $200 on my new laptop!",
            rating: 5
        },
        {
            name: "Elena M.",
            role: "Fotógrafa",
            text: "Compré mi cámara Sony al mejor precio del mercado. La comparación fue instantánea.",
            rating: 5
        },
        {
            name: "Sophie L.",
            role: "Marketing Manager",
            text: "The AI recommendations are incredibly accurate. Found exactly what I needed in seconds.",
            rating: 5
        },
        {
            name: "Pablo S.",
            role: "Gamer",
            text: "Encontré mi setup gaming completo ahorrando más de 400€. ¡Una locura!",
            rating: 5
        },
        {
            name: "Michael K.",
            role: "Data Scientist",
            text: "Impressive AI technology. It understands context better than any other comparison site.",
            rating: 5
        },
        {
            name: "Laura P.",
            role: "Emprendedora",
            text: "Uso KriterIA para todas las compras de mi negocio. Ahorro tiempo y dinero.",
            rating: 5
        },
        {
            name: "David H.",
            role: "Tech Blogger",
            text: "A game-changer for online shopping. The real-time price tracking is amazing!",
            rating: 5
        },
        {
            name: "Carmen V.",
            role: "Médica",
            text: "Perfecto para comprar equipamiento. Compara todas las tiendas en segundos.",
            rating: 5
        },
        {
            name: "Emily R.",
            role: "UX Designer",
            text: "Clean interface, powerful AI. This is how all shopping tools should work.",
            rating: 5
        }
    ];

    const securityBadges = [
        { icon: Lock, title: "Datos Seguros", desc: "Encriptación SSL de extremo a extremo" },
        { icon: Shield, title: "Sin Spam", desc: "Nunca vendemos tus datos" },
        { icon: CheckCircle, title: "100% Gratis", desc: "Sin tarjeta de crédito" }
    ];

    return (
        <div className="stacking-container">
            {/* DEGRADADO DE FONDO HERO - FULLSCREEN (fuera del StackingSection para cubrir toda la pantalla) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Degradado principal púrpura */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-[#8c52ff]/40 via-[#8c52ff]/20 to-transparent rounded-full blur-[120px]" />
                {/* Degradado secundario derecho */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-600/30 via-violet-500/20 to-transparent rounded-full blur-[100px]" />
                {/* Degradado izquierdo */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/25 via-purple-500/15 to-transparent rounded-full blur-[80px]" />
            </div>

            {/* ===== HERO SECTION ===== */}
            <StackingSection
                order={1}
                bgColor="bg-transparent"
                className="relative"
                id="hero"
            >

                <div className="flex flex-col items-center justify-center text-center relative z-10">
                    <AnimatedOnScroll animation="fadeInUp" delay={0}>
                        <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-8">
                            <Sparkles size={16} className="text-[#8c52ff]" />
                            <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">Potenciado por IA</span>
                        </div>
                    </AnimatedOnScroll>

                    <AnimatedOnScroll animation="fadeInUp" delay={100}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                            Compra inteligente <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] via-purple-400 to-[#8c52ff] animate-gradient bg-[length:200%_200%]">
                                con IA
                            </span>
                        </h1>
                    </AnimatedOnScroll>

                    <AnimatedOnScroll animation="fadeInUp" delay={200}>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Deja que nuestra IA encuentre el mejor producto al mejor precio. Comparamos millones de opciones para ti.
                        </p>
                    </AnimatedOnScroll>

                    {/* Search Input con glow mejorado */}
                    <AnimatedOnScroll animation="scaleIn" delay={300} className="w-full max-w-2xl">
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#8c52ff] via-purple-500 to-[#8c52ff] rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
                            <div className="relative flex items-center bg-[#151515]/90 backdrop-blur-xl rounded-2xl p-2 border border-white/10 group-hover:border-[#8c52ff]/50 transition-all shadow-2xl">
                                <div className="p-3 text-[#8c52ff]">
                                    <Sparkles size={24} className="animate-pulse" />
                                </div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={typedText}
                                    className="w-full bg-transparent text-white placeholder-gray-500 text-lg focus:outline-none px-2 py-2"
                                />
                                <button type="submit" className="bg-gradient-to-r from-[#8c52ff] to-purple-600 hover:from-[#7a45e6] hover:to-purple-500 text-white p-3 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(140,82,255,0.6)] group">
                                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </AnimatedOnScroll>

                    {/* Quick Stats */}
                    <AnimatedOnScroll animation="fadeInUp" delay={400} className="flex flex-wrap justify-center gap-8 mt-12">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-bold text-lg">4.9</span>
                            <span className="text-sm">Valoración</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Users size={16} className="text-[#8c52ff]" />
                            <span className="text-white font-bold text-lg">500K+</span>
                            <span className="text-sm">Usuarios</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <ShoppingCart size={16} className="text-green-400" />
                            <span className="text-white font-bold text-lg">10M+</span>
                            <span className="text-sm">Productos</span>
                        </div>
                    </AnimatedOnScroll>

                    {/* Scroll indicator - posicionado más abajo */}
                    {/* Scroll indicator - posicionado relativa al contenido para evitar solapamientos */}
                    <div className="mt-24 animate-bounce flex justify-center w-full">
                        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
                            <div className="w-1.5 h-3 bg-[#8c52ff] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </StackingSection>

            {/* ===== INTEGRATIONS SECTION CON CARRUSEL ESTILO N8N ===== */}
            <StackingSection
                order={2}
                bgColor="bg-gradient-to-b from-[#0f0f0f] via-[#151515] to-[#1a1a2e]"
                fullHeight={false}
                className="py-20"
                id="integrations"
            >
                {/* Degradado decorativo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-purple-900/20 via-[#8c52ff]/10 to-transparent rounded-full blur-[100px]" />
                </div>

                <AnimatedOnScroll animation="fadeInUp" className="text-center mb-12 relative z-10">
                    <p className="text-[#8c52ff] text-sm uppercase tracking-wider mb-4 font-semibold">
                        +500 Integraciones
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Conectamos con todas tus{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] to-purple-400">
                            tiendas favoritas
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Desde Amazon hasta tiendas asiáticas, rastreamos precios en todo el mundo.
                    </p>
                </AnimatedOnScroll>

                {/* Carrusel de logos estilo n8n */}
                <IntegrationCarousel className="relative z-10" />

                {/* Botón explorar */}
                <AnimatedOnScroll animation="fadeInUp" delay={200} className="text-center mt-8 relative z-10">
                    <button
                        onClick={() => onNavigate('stores')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8c52ff] to-purple-600 text-white rounded-full font-medium hover:from-[#7a45e6] hover:to-purple-500 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(140,82,255,0.4)]"
                    >
                        Ver todas las tiendas
                        <ChevronRight size={18} />
                    </button>
                </AnimatedOnScroll>
            </StackingSection>

            {/* ===== STATS SECTION - Compacta ===== */}
            <StackingSection
                order={3}
                bgColor="bg-[#151515]"
                fullHeight={false}
                className="py-16"
                id="stats"
            >
                <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                    {stats.map((stat, idx) => (
                        <AnimatedOnScroll key={idx} animation="fadeInUp" delay={idx * 100}>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <stat.icon size={20} className="text-[#8c52ff]" />
                                    <span className="text-3xl md:text-4xl font-bold text-white">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </div>
                        </AnimatedOnScroll>
                    ))}
                </div>
            </StackingSection>

            {/* ===== FEATURES SECTION - Compacta ===== */}
            <StackingSection
                order={4}
                bgColor="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#240046] via-[#0f001e] to-black"
                fullHeight={false}
                className="py-16 relative"
                id="features"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

                <AnimatedOnScroll animation="fadeInUp" className="text-center mb-10 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Todo lo que necesitas para{' '}
                        <span className="text-yellow-300">comprar mejor</span>
                    </h2>
                    <p className="text-white/90 text-sm max-w-2xl mx-auto font-medium">
                        Herramientas potentes impulsadas por inteligencia artificial para encontrar las mejores ofertas.
                    </p>
                </AnimatedOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <AnimatedOnScroll key={idx} animation="fadeInUp" delay={idx * 100}>
                            <SpotlightCard className="group h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <div className="w-full h-full bg-[#252525] rounded-[10px] flex items-center justify-center">
                                        <feature.icon size={24} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </SpotlightCard>
                        </AnimatedOnScroll>
                    ))}
                </div>
            </StackingSection>

            {/* ===== USE CASES SECTION - Compacta ===== */}
            <StackingSection
                order={5}
                bgColor="bg-[#151515]"
                fullHeight={false}
                className="py-16"
                id="use-cases"
            >
                <AnimatedOnScroll animation="fadeInUp" className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Ejemplos de <span className="text-[#8c52ff]">ahorro real</span>
                    </h2>
                </AnimatedOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {useCases.map((useCase, idx) => (
                        <AnimatedOnScroll key={idx} animation="fadeInUp" delay={idx * 100}>
                            <SpotlightCard className="p-5 h-full">
                                <h3 className="text-white font-medium text-sm mb-1">{useCase.title}</h3>
                                <p className="text-gray-400 text-xs mb-2">{useCase.desc}</p>
                                <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                                    <Percent size={12} />
                                    {useCase.savings}
                                </span>
                            </SpotlightCard>
                        </AnimatedOnScroll>
                    ))}
                </div>
            </StackingSection>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <StackingSection
                order={6}
                bgColor="bg-neutral-950"
                fullHeight={false}
                className="py-16 relative"
                id="testimonials"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-dot-white/[0.1] bg-[size:20px_20px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

                <AnimatedOnScroll animation="fadeInUp" className="text-center mb-10 relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        Lo que dicen nuestros <span className="text-[#8c52ff]">usuarios</span>
                    </h2>
                    <p className="text-gray-400 text-sm">Opiniones reales de todo el mundo</p>
                </AnimatedOnScroll>

                {/* Testimonials Carousel */}
                <div
                    className="overflow-hidden py-4"
                    onMouseEnter={(e) => {
                        const track = e.currentTarget.querySelector('.testimonial-track');
                        if (track) track.style.animationPlayState = 'paused';
                    }}
                    onMouseLeave={(e) => {
                        const track = e.currentTarget.querySelector('.testimonial-track');
                        if (track) track.style.animationPlayState = 'running';
                    }}
                >
                    <div
                        className="testimonial-track flex gap-6 animate-scroll-testimonials"
                        style={{ width: 'max-content' }}
                    >
                        {[...testimonials, ...testimonials].map((testimonial, idx) => (
                            <SpotlightCard
                                key={idx}
                                className="flex-shrink-0 w-[320px] p-5 cursor-default"
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8c52ff] to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium text-sm">{testimonial.name}</div>
                                        <div className="text-gray-500 text-xs">{testimonial.role}</div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </StackingSection>

            {/* ===== SECURITY + CTA SECTION - Combinada ===== */}
            <StackingSection
                order={7}
                bgColor="bg-[#151515]"
                fullHeight={false}
                className="py-16"
                id="cta"
                enableStack={false}
            >
                {/* Security badges inline */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {securityBadges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                            <badge.icon size={16} className="text-green-400" />
                            <span className="text-gray-400">{badge.title}</span>
                        </div>
                    ))}
                </div>

                {/* CTA simple */}
                <AnimatedOnScroll animation="fadeInUp">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Únete a +500K compradores inteligentes
                        </h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Gratis. Sin tarjeta de crédito.
                        </p>
                        <button
                            onClick={() => onStart(null)}
                            className="bg-gradient-to-r from-[#8c52ff] to-purple-600 hover:from-[#7a45e6] hover:to-purple-500 text-white px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(140,82,255,0.4)] inline-flex items-center gap-2"
                        >
                            <Sparkles size={18} />
                            Empezar Gratis
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </AnimatedOnScroll>
            </StackingSection>
        </div>
    );
};

export default LandingContent;
