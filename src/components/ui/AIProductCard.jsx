/**
 * AIProductCard - Tarjeta para mostrar productos recomendados por la IA
 * Muestra información dinámica basada en el JSON recibido del backend
 */
import React from 'react';
import { Star, Car, Calendar, Gauge, Settings, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const AIProductCard = ({ product, index = 0, onSelect }) => {
    const {
        'product name': productName,
        'product description': productDescription,
        price,
        rating
    } = product;

    // Determinar el color del badge según el ranking
    const getRankBadge = () => {
        if (index === 0) return { bg: 'bg-gradient-to-r from-yellow-500 to-amber-500', text: '🏆 Mejor opción' };
        if (index === 1) return { bg: 'bg-gradient-to-r from-gray-400 to-gray-500', text: '🥈 Alternativa' };
        return { bg: 'bg-gradient-to-r from-amber-700 to-amber-800', text: '🥉 Opción económica' };
    };

    const rankBadge = getRankBadge();

    // Generar estrellas según el rating
    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
                {hasHalfStar && (
                    <div className="relative">
                        <Star size={14} className="text-gray-600" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} size={14} className="text-gray-600" />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-white">{rating}</span>
            </div>
        );
    };

    // Formatear precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                duration: 0.4, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
                y: -4, 
                scale: 1.01,
                transition: { duration: 0.2 }
            }}
            onClick={() => onSelect?.(product)}
            className="relative bg-gradient-to-br from-[#252525] to-[#1f1f1f] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#8c52ff]/50 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(140,82,255,0.2)]"
        >
            {/* Badge de ranking */}
            <div className={`absolute top-0 left-0 right-0 ${rankBadge.bg} py-1.5 px-4`}>
                <span className="text-xs font-bold text-white">{rankBadge.text}</span>
            </div>

            {/* Contenido principal */}
            <div className="pt-10 p-5">
                {/* Header: Nombre y Rating */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Car size={18} className="text-[#8c52ff] flex-shrink-0" />
                            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-[#8c52ff] transition-colors line-clamp-2">
                                {productName}
                            </h3>
                        </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex-shrink-0 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                        {renderStars()}
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors">
                        {productDescription}
                    </p>
                </div>

                {/* Separador con gradiente */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

                {/* Footer: Precio y CTA */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Precio</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#8c52ff] to-purple-400 bg-clip-text text-transparent">
                            {formatPrice(price)}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#8c52ff] hover:bg-[#7a45e6] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-[#8c52ff]/25"
                    >
                        <TrendingUp size={16} />
                        Ver detalles
                    </motion.button>
                </div>
            </div>

            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8c52ff]/0 via-[#8c52ff]/5 to-[#8c52ff]/0 transform -skew-x-12" />
            </div>
        </motion.div>
    );
};

export default AIProductCard;
