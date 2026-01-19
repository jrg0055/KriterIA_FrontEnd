import React from 'react';
import {
    Users, Target, Heart, Rocket, Lightbulb, Award,
    Brain, Zap, Shield, Globe, TrendingUp, Clock,
    CheckCircle, Star, Building2, Cpu, BarChart3,
    Eye, Lock, Sparkles, ArrowRight
} from 'lucide-react';

const AboutPage = () => {
    const team = [
        { name: "María García", role: "CEO & Fundadora", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400", linkedin: "#" },
        { name: "Carlos Rodríguez", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400", linkedin: "#" },
        { name: "Ana Martínez", role: "Directora de IA", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400", linkedin: "#" },
        { name: "David López", role: "Diseño UX", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400", linkedin: "#" },
        { name: "Laura Fernández", role: "Head of Data", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400", linkedin: "#" },
        { name: "Miguel Sánchez", role: "Backend Lead", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400", linkedin: "#" }
    ];

    const stats = [
        { value: "500K+", label: "Usuarios activos", icon: Users },
        { value: "10M+", label: "Productos analizados", icon: BarChart3 },
        { value: "€2M+", label: "Ahorrados por usuarios", icon: TrendingUp },
        { value: "99.9%", label: "Uptime garantizado", icon: Zap }
    ];

    const values = [
        { icon: Target, title: "Precisión", desc: "Analizamos cada dato con IA de última generación para ofrecerte resultados exactos y personalizados." },
        { icon: Heart, title: "Confianza", desc: "Tu privacidad es nuestra prioridad absoluta. Nunca vendemos tus datos a terceros." },
        { icon: Rocket, title: "Innovación", desc: "Siempre a la vanguardia de la tecnología, implementando las últimas mejoras en IA." },
        { icon: Globe, title: "Accesibilidad", desc: "Diseñamos para todos, asegurando que nuestra plataforma sea fácil de usar." },
        { icon: Shield, title: "Seguridad", desc: "Encriptación de extremo a extremo y cumplimiento total con GDPR y normativas EU." },
        { icon: Sparkles, title: "Excelencia", desc: "Nos esforzamos por superar las expectativas en cada interacción con nuestros usuarios." }
    ];

    const timeline = [
        { year: "2023", quarter: "Q1", title: "Nace la idea", desc: "María y Carlos se unen para resolver el problema de la comparación de precios online con IA.", icon: Lightbulb },
        { year: "2023", quarter: "Q2", title: "Primera inversión", desc: "Conseguimos €500K en ronda pre-seed de inversores ángel especializados en IA.", icon: TrendingUp },
        { year: "2023", quarter: "Q3", title: "MVP lanzado", desc: "Lanzamos la primera versión beta con 10.000 usuarios early adopters.", icon: Rocket },
        { year: "2023", quarter: "Q4", title: "100K usuarios", desc: "Alcanzamos nuestro primer hito de usuarios y expandimos el equipo.", icon: Users },
        { year: "2024", quarter: "Q1", title: "Serie A", desc: "Cerramos ronda de €3M para acelerar el desarrollo de IA y expandir a nuevos mercados.", icon: Award },
        { year: "2024", quarter: "Q2", title: "500K usuarios", desc: "Quintuplicamos nuestra base de usuarios y añadimos 50+ tiendas integradas.", icon: Star }
    ];

    const techFeatures = [
        { icon: Brain, title: "Machine Learning Avanzado", desc: "Modelos propietarios entrenados con millones de productos para predicciones precisas de precios." },
        { icon: Cpu, title: "Procesamiento en Tiempo Real", desc: "Analizamos precios cada 15 minutos para garantizar información actualizada." },
        { icon: Eye, title: "Visión por Computadora", desc: "Reconocemos productos visualmente para comparativas más precisas." },
        { icon: BarChart3, title: "Análisis Predictivo", desc: "Predecimos tendencias de precios para ayudarte a comprar en el mejor momento." },
        { icon: Lock, title: "Privacidad First", desc: "Procesamiento local cuando es posible y encriptación de todos los datos sensibles." },
        { icon: Globe, title: "Multi-idioma & Multi-región", desc: "Soporte para 15+ idiomas y comparativas en 30+ países." }
    ];

    const partners = [
        // Fila 1 - Ecommerce y retail
        { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "eBay", logo: "https://cdn.simpleicons.org/ebay/E53238" },
        { name: "AliExpress", logo: "https://cdn.simpleicons.org/aliexpress/FF4747" },
        { name: "MediaMarkt", logo: "https://cdn.simpleicons.org/mediamarkt/DF0000" },
        { name: "Carrefour", logo: "https://cdn.simpleicons.org/carrefour/004E9F" },
        { name: "El Corte Inglés", logo: "https://cdn.brandfetch.io/elcorteingles.es/logo" },
        { name: "PcComponentes", logo: "https://cdn.brandfetch.io/pccomponentes.com/logo" },
        { name: "Fnac", logo: "https://cdn.simpleicons.org/fnac/E4A800" },
        { name: "Walmart", logo: "https://cdn.brandfetch.io/walmart.com/logo" },
        { name: "Target", logo: "https://cdn.simpleicons.org/target/CC0000" },
        { name: "Costco", logo: "https://cdn.brandfetch.io/costco.com/logo" },
        { name: "IKEA", logo: "https://cdn.simpleicons.org/ikea/0058A3" },
        // Fila 2 - Moda y tecnología
        { name: "Nike", logo: "https://cdn.simpleicons.org/nike/111111" },
        { name: "Adidas", logo: "https://cdn.simpleicons.org/adidas/000000" },
        { name: "Zara", logo: "https://cdn.brandfetch.io/zara.com/logo" },
        { name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
        { name: "Apple", logo: "https://cdn.simpleicons.org/apple/999999" },
        { name: "Samsung", logo: "https://cdn.simpleicons.org/samsung/1428A0" },
        { name: "Shein", logo: "https://cdn.brandfetch.io/shein.com/logo" },
        { name: "Temu", logo: "https://cdn.brandfetch.io/temu.com/logo" },
        { name: "Zalando", logo: "https://cdn.simpleicons.org/zalando/FF6900" },
        { name: "ASOS", logo: "https://cdn.brandfetch.io/asos.com/logo" },
        { name: "Decathlon", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Decathlon_Logo.png" },
        { name: "Lidl", logo: "https://cdn.simpleicons.org/lidl/0050AA" }
    ];

    const awards = [
        { title: "Best AI Startup 2024", org: "South Summit", icon: Award },
        { title: "Top 10 Retail Tech", org: "TechCrunch", icon: Star },
        { title: "Innovation Award", org: "Mobile World Congress", icon: Sparkles }
    ];

    return (
        <div className="flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-24 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                    <Users size={16} className="text-[#8c52ff]" />
                    <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">
                        Sobre Nosotros
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Transformando la forma<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] to-purple-400">
                        de comprar online
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                    Nacimos en 2023 con una misión clara: eliminar la frustración de comparar precios y encontrar el mejor producto. Nuestra IA analiza millones de opciones para que tú tomes la mejor decisión.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Fundada en España</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>+20 empleados</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Respaldada por VCs</span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-24">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-[#252525] border border-white/5 rounded-2xl p-6 text-center group hover:border-[#8c52ff]/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(140,82,255,0.1)]"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <stat.icon size={24} className="text-[#8c52ff]/50 mx-auto mb-3" />
                        <div className="text-3xl md:text-4xl font-bold text-[#8c52ff] mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Mission & Vision Section */}
            <div className="w-full mb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-[#8c52ff]/20 to-[#8c52ff]/5 border border-[#8c52ff]/20 rounded-3xl p-8 md:p-10">
                        <div className="w-14 h-14 bg-[#8c52ff] rounded-2xl flex items-center justify-center mb-6">
                            <Target size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Nuestra Misión</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Democratizar el acceso a la información de precios, permitiendo que cualquier persona pueda tomar decisiones de compra inteligentes sin invertir horas en investigación. Creemos que la tecnología debe trabajar para las personas, no al revés.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-3xl p-8 md:p-10">
                        <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                            <Eye size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Nuestra Visión</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Convertirnos en el asistente de compras definitivo a nivel global. Un futuro donde cada decisión de compra esté respaldada por inteligencia artificial transparente y ética, ahorrando tiempo y dinero a millones de personas.
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline / History */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        Nuestra Trayectoria
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        La Historia de KriterIA
                    </h2>
                </div>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#8c52ff] via-[#8c52ff]/50 to-transparent hidden md:block" />

                    <div className="space-y-8 md:space-y-0">
                        {timeline.map((item, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:mb-12`}>
                                {/* Content */}
                                <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className={`bg-[#252525] border border-white/5 rounded-2xl p-6 hover:border-[#8c52ff]/30 transition-all duration-500 hover:-translate-y-1`}>
                                        <div className={`flex items-center gap-2 mb-3 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <span className="bg-[#8c52ff]/20 text-[#8c52ff] text-xs font-bold px-3 py-1 rounded-full">
                                                {item.year} {item.quarter}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>

                                {/* Center icon */}
                                <div className="hidden md:flex w-2/12 justify-center">
                                    <div className="w-12 h-12 bg-[#8c52ff] rounded-full flex items-center justify-center z-10 border-4 border-[#1b1b1b]">
                                        <item.icon size={20} className="text-white" />
                                    </div>
                                </div>

                                {/* Spacer */}
                                <div className="hidden md:block w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technology Section */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        Tecnología
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        IA que Trabaja para Ti
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Nuestra tecnología propietaria combina lo mejor del machine learning, procesamiento de lenguaje natural y análisis de datos para ofrecerte la experiencia de compra más inteligente.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-[#252525] border border-white/5 rounded-2xl p-6 group hover:border-[#8c52ff]/30 transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-[#8c52ff]/10 rounded-xl flex items-center justify-center text-[#8c52ff] mb-4 group-hover:bg-[#8c52ff] group-hover:text-white transition-all duration-500">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        Principios
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Nuestros Valores
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#252525] to-[#1b1b1b] border border-white/5 p-8 rounded-3xl group hover:border-[#8c52ff]/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-[#8c52ff]/10 rounded-2xl flex items-center justify-center text-[#8c52ff] mb-6 group-hover:bg-[#8c52ff] group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                                <value.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Partners & Integrations */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        Integraciones
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Tiendas Integradas
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Comparamos precios de las principales tiendas online para que siempre encuentres la mejor oferta.
                    </p>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {partners.map((partner, idx) => (
                        <div
                            key={idx}
                            className="bg-white/95 rounded-xl p-5 flex flex-col items-center justify-center aspect-square group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_rgba(140,82,255,0.4)]"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="w-12 h-12 object-contain transition-all duration-300"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${partner.name}&background=8c52ff&color=fff&size=80`;
                                }}
                            />
                            <span className="text-xs text-gray-600 mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{partner.name}</span>
                        </div>
                    ))}
                </div>
                <p className="text-center text-gray-500 text-sm mt-6">
                    Y más de 50 tiendas adicionales...
                </p>
            </div>

            {/* Awards */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        Reconocimientos
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Premios y Menciones
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {awards.map((award, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#8c52ff]/10 to-transparent border border-[#8c52ff]/20 rounded-2xl p-6 text-center group hover:border-[#8c52ff]/50 transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-[#8c52ff]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8c52ff] transition-all duration-500">
                                <award.icon size={28} className="text-[#8c52ff] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{award.title}</h3>
                            <p className="text-gray-500 text-sm">{award.org}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        El Equipo
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Las Personas Detrás de KriterIA
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Un equipo apasionado de ingenieros, diseñadores y expertos en IA trabajando para ti.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className="text-center group cursor-pointer"
                        >
                            <div className="relative mb-4 mx-auto w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#8c52ff] transition-all duration-500 group-hover:scale-105">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#8c52ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <h4 className="text-white font-semibold group-hover:text-[#8c52ff] transition-colors text-sm md:text-base">{member.name}</h4>
                            <p className="text-gray-500 text-xs md:text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Office / Location with Google Maps */}
            <div className="w-full mb-24">
                <div className="text-center mb-12">
                    <span className="inline-block text-[#8c52ff] text-sm font-semibold uppercase tracking-wider mb-2">
                        Ubicación
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Nuestras Oficinas
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Situadas en el corazón de Madrid, en una zona privilegiada con excelentes conexiones.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Map */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.223208447609!2d-3.693245684602825!3d40.41677097936474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d5a7be3ef%3A0x82f8d5e3a5a3e3a5!2sGran%20V%C3%ADa%2C%20Madrid!5e0!3m2!1ses!2ses!4v1705652400000!5m2!1ses!2ses"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ubicación de KriterIA"
                            className="absolute inset-0"
                        />
                    </div>
                    {/* Info */}
                    <div className="bg-gradient-to-br from-[#252525] to-[#1b1b1b] border border-white/5 rounded-2xl p-8 flex flex-col justify-center">
                        <Building2 size={40} className="text-[#8c52ff] mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Sede Central Madrid</h3>
                        <div className="space-y-4 text-gray-400">
                            <p className="flex items-start gap-3">
                                <span className="text-[#8c52ff] mt-1">📍</span>
                                Gran Vía 42, Planta 8<br />28013 Madrid, España
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-[#8c52ff] mt-1">🚇</span>
                                Metro: Gran Vía (L1, L5) / Callao (L3, L5)
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-[#8c52ff] mt-1">🕐</span>
                                Lunes a Viernes: 9:00 - 18:00
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="text-[#8c52ff] mt-1">💼</span>
                                Modelo híbrido: oficina + remoto
                            </p>
                        </div>
                        <a
                            href="https://maps.google.com/?q=Gran+Via+42+Madrid"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 text-[#8c52ff] hover:text-white transition-colors font-medium"
                        >
                            Ver en Google Maps
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="w-full bg-gradient-to-r from-[#8c52ff]/20 via-[#8c52ff]/10 to-[#8c52ff]/20 border border-[#8c52ff]/20 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/5 to-transparent opacity-50" />
                <div className="relative z-10">
                    <Lightbulb size={48} className="text-[#8c52ff] mx-auto mb-6 animate-pulse" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        ¿Quieres unirte al equipo?
                    </h3>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Siempre buscamos talento excepcional. Envíanos tu CV y cuéntanos por qué quieres ser parte de KriterIA.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="mailto:careers@kriteria.com" className="inline-flex items-center justify-center gap-2 bg-[#8c52ff] hover:bg-[#7a45e6] text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(140,82,255,0.4)]">
                            Ver ofertas de empleo
                            <ArrowRight size={18} />
                        </a>
                        <a href="mailto:hello@kriteria.com" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105">
                            Contactar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
