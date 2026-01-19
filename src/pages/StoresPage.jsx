import React from 'react';
import { Store, Globe, Check, ArrowRight, Sparkles } from 'lucide-react';

const StoresPage = () => {
    const stores = [
        {
            name: "Amazon",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            categories: ["Todo"],
            countries: ["ES", "EU", "US"],
            featured: true,
            url: "https://www.amazon.es"
        },
        {
            name: "eBay",
            logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
            categories: ["Subastas", "Outlet"],
            countries: ["ES", "EU", "US"],
            featured: true,
            url: "https://www.ebay.es"
        },
        {
            name: "AliExpress",
            logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Aliexpress_logo.svg",
            categories: ["Electrónica", "Moda"],
            countries: ["Global"],
            featured: true,
            url: "https://es.aliexpress.com"
        },
        {
            name: "Apple",
            logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            categories: ["Tecnología"],
            countries: ["Global"],
            featured: true,
            url: "https://www.apple.com/es"
        },
        {
            name: "Nike",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
            categories: ["Deportes", "Moda"],
            countries: ["Global"],
            featured: true,
            url: "https://www.nike.com/es"
        },
        {
            name: "Zara",
            logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
            categories: ["Moda"],
            countries: ["Global"],
            featured: true,
            url: "https://www.zara.com"
        },
        {
            name: "MediaMarkt",
            logo: "https://cdn.simpleicons.org/mediamarkt",
            categories: ["Electrónica"],
            countries: ["ES", "EU"],
            featured: false,
            url: "https://www.mediamarkt.es"
        },
        {
            name: "Fnac",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Fnac_Logo.svg",
            categories: ["Cultura", "Electrónica"],
            countries: ["ES", "EU"],
            featured: false,
            url: "https://www.fnac.es"
        },
        {
            name: "El Corte Inglés",
            logo: "https://cdn.brandfetch.io/elcorteingles.es/logo",
            categories: ["Todo"],
            countries: ["ES"],
            featured: false,
            url: "https://www.elcorteingles.es"
        },
        {
            name: "Carrefour",
            logo: "https://cdn.simpleicons.org/carrefour",
            categories: ["Supermercado", "Tecnología"],
            countries: ["ES", "EU"],
            featured: false,
            url: "https://www.carrefour.es"
        },
        {
            name: "IKEA",
            logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg",
            categories: ["Hogar", "Decoración"],
            countries: ["Global"],
            featured: true,
            url: "https://www.ikea.es"
        },
        {
            name: "Leroy Merlin",
            logo: "https://cdn.brandfetch.io/leroymerlin.es/logo",
            categories: ["Bricolaje", "Hogar"],
            countries: ["ES", "EU"],
            featured: false,
            url: "https://www.leroymerlin.es"
        },
        {
            name: "PcComponentes",
            logo: "https://cdn.brandfetch.io/pccomponentes.com/logo",
            categories: ["Informática"],
            countries: ["ES"],
            featured: false,
            url: "https://www.pccomponentes.com"
        },
        {
            name: "Zalando",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Zalando_logo.svg",
            categories: ["Moda"],
            countries: ["ES", "EU"],
            featured: false,
            url: "https://www.zalando.es"
        },
        {
            name: "Adidas",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
            categories: ["Deportes", "Moda"],
            countries: ["Global"],
            featured: false,
            url: "https://www.adidas.es"
        },
        {
            name: "H&M",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
            categories: ["Moda"],
            countries: ["Global"],
            featured: false,
            url: "https://www2.hm.com/es_es"
        },
        {
            name: "Samsung",
            logo: "https://cdn.simpleicons.org/samsung",
            categories: ["Tecnología"],
            countries: ["Global"],
            featured: false,
            url: "https://www.samsung.com/es"
        },
        {
            name: "Shein",
            logo: "https://cdn.brandfetch.io/shein.com/logo",
            categories: ["Moda", "Todo"],
            countries: ["Global"],
            featured: false,
            url: "https://es.shein.com"
        },
        {
            name: "Temu",
            logo: "https://cdn.brandfetch.io/temu.com/logo",
            categories: ["Todo"],
            countries: ["Global"],
            featured: false,
            url: "https://www.temu.com"
        },
        {
            name: "ASOS",
            logo: "https://cdn.brandfetch.io/asos.com/logo",
            categories: ["Moda"],
            countries: ["Global"],
            featured: false,
            url: "https://www.asos.com/es"
        },
        {
            name: "Decathlon",
            logo: "https://cdn.brandfetch.io/decathlon.es/logo",
            categories: ["Deportes"],
            countries: ["Global"],
            featured: false,
            url: "https://www.decathlon.es"
        },
        {
            name: "Lidl",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Lidl-Logo.svg",
            categories: ["Supermercado"],
            countries: ["ES", "EU"],
            featured: false,
            url: "https://www.lidl.es"
        },
        {
            name: "Walmart",
            logo: "https://cdn.brandfetch.io/walmart.com/logo",
            categories: ["Supermercado", "Todo"],
            countries: ["US"],
            featured: false,
            url: "https://www.walmart.com"
        },
        {
            name: "Target",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
            categories: ["Supermercado", "Todo"],
            countries: ["US"],
            featured: false,
            url: "https://www.target.com"
        },
        {
            name: "Costco",
            logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg",
            categories: ["Supermercado"],
            countries: ["Global"],
            featured: false,
            url: "https://www.costco.es"
        }
    ];

    return (
        <div className="flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                    <Store size={16} className="text-[#8c52ff]" />
                    <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">
                        Tiendas
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Todas tus tiendas<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] to-purple-400">
                        en un solo lugar
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Comparamos precios de las principales tiendas online para que siempre encuentres la mejor oferta.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-3xl mb-16">
                {[
                    { value: "50+", label: "Tiendas" },
                    { value: "10M+", label: "Productos" },
                    { value: "24/7", label: "Actualización" }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-[#252525] border border-white/5 rounded-2xl p-6 text-center hover:border-[#8c52ff]/30 transition-all">
                        <div className="text-3xl font-bold text-[#8c52ff] mb-1">{stat.value}</div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Featured Stores */}
            <div className="w-full mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Tiendas Destacadas</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {stores.filter(s => s.featured).map((store, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#252525] to-[#1b1b1b] border border-white/10 rounded-2xl p-6 hover:border-[#8c52ff]/50 transition-all duration-500 hover:-translate-y-2 group"
                        >
                            <div className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform bg-white rounded-xl p-2 flex items-center justify-center">
                                <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">{store.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {store.categories.map((cat, i) => (
                                    <span key={i} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Globe size={14} />
                                {store.countries.join(", ")}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Stores */}
            <div className="w-full mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Todas las Tiendas</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stores.filter(s => !s.featured).map((store, idx) => (
                        <div
                            key={idx}
                            className="bg-[#252525] border border-white/5 rounded-xl p-4 hover:border-[#8c52ff]/30 transition-all flex items-center gap-3 group cursor-pointer"
                        >
                            <div className="w-12 h-12 group-hover:scale-110 transition-transform bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                                <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="text-white font-medium">{store.name}</div>
                                <div className="text-xs text-gray-500">{store.countries.join(", ")}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="w-full bg-gradient-to-r from-[#8c52ff]/20 via-[#8c52ff]/10 to-[#8c52ff]/20 border border-[#8c52ff]/20 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/5 to-transparent" />
                <div className="relative z-10">
                    <Sparkles size={48} className="text-[#8c52ff] mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        ¿Echas de menos alguna tienda?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Estamos constantemente añadiendo nuevas tiendas. Cuéntanos cuál necesitas.
                    </p>
                    <button className="bg-[#8c52ff] hover:bg-[#7a45e6] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(140,82,255,0.4)] inline-flex items-center gap-2">
                        Solicitar Tienda
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoresPage;
