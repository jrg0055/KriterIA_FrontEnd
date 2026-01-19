import React, { useRef, useEffect, useState } from 'react';

/**
 * Logos de tiendas usando URLs públicas de Wikimedia Commons
 */
const stores = [
    // Fila 1 - Ecommerce y retail
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'eBay', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg' },
    { name: 'AliExpress', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Aliexpress_logo.svg' },
    { name: 'MediaMarkt', logo: 'https://cdn.simpleicons.org/mediamarkt' },
    { name: 'Carrefour', logo: 'https://cdn.simpleicons.org/carrefour' },
    { name: 'El Corte Inglés', logo: 'https://cdn.brandfetch.io/elcorteingles.es/logo' },
    { name: 'PcComponentes', logo: 'https://cdn.brandfetch.io/pccomponentes.com/logo' },
    { name: 'Fnac', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Fnac_Logo.svg' },
    { name: 'Walmart', logo: 'https://cdn.brandfetch.io/walmart.com/logo' },
    { name: 'Target', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg' },
    { name: 'Costco', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Costco_Wholesale_logo_2010-10-26.svg' },
    { name: 'IKEA', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg' },
];

const stores2 = [
    // Fila 2 - Moda y tecnología
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { name: 'Zara', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg' },
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung' },
    { name: 'Shein', logo: 'https://cdn.brandfetch.io/shein.com/logo' },
    { name: 'Temu', logo: 'https://cdn.brandfetch.io/temu.com/logo' },
    { name: 'Zalando', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Zalando_logo.svg' },
    { name: 'ASOS', logo: 'https://cdn.brandfetch.io/asos.com/logo' },
    { name: 'Decathlon', logo: 'https://cdn.brandfetch.io/decathlon.es/logo' },
    { name: 'Lidl', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Lidl-Logo.svg' },
];

/**
 * Carrusel de logos estilo n8n con tarjetas blancas
 */
const IntegrationCarousel = ({ className = '' }) => {
    const containerRef = useRef(null);
    const [isLifted, setIsLifted] = useState(false);
    const [failedImages, setFailedImages] = useState(new Set());

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.6 && rect.bottom > 0) {
                setIsLifted(true);
            } else {
                setIsLifted(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleImageError = (storeName) => {
        setFailedImages(prev => new Set([...prev, storeName]));
    };

    const renderLogo = (store, idx, prefix) => {
        const isFailed = failedImages.has(store.name) || !store.logo;

        return (
            <div
                key={`${prefix}-${idx}`}
                className="flex-shrink-0 w-20 h-14 bg-white rounded-xl flex items-center justify-center p-3 hover:scale-105 transition-transform cursor-pointer shadow-sm hover:shadow-md"
                title={store.name}
            >
                {isFailed ? (
                    <span className="text-gray-600 text-xs font-semibold text-center leading-tight">
                        {store.fallback || store.name.slice(0, 3)}
                    </span>
                ) : (
                    <img
                        src={store.logo}
                        alt={store.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        onError={() => handleImageError(store.name)}
                    />
                )}
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden py-6 ${className}`}
            style={{
                transform: isLifted ? 'translateY(-10px)' : 'translateY(0)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            {/* Primera fila */}
            <div className="flex gap-4 mb-4 animate-scroll-left">
                {[...stores, ...stores, ...stores].map((store, idx) =>
                    renderLogo(store, idx, 'row1')
                )}
            </div>

            {/* Segunda fila */}
            <div className="flex gap-4 animate-scroll-right">
                {[...stores2, ...stores2, ...stores2].map((store, idx) =>
                    renderLogo(store, idx, 'row2')
                )}
            </div>
        </div>
    );
};

export default IntegrationCarousel;
