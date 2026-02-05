import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, ChevronUp, ExternalLink, TrendingUp } from 'lucide-react';

/**
 * BackendProductCard - Componente para mostrar productos del backend
 * 
 * Formato JSON esperado:
 * {
 *     "product name": "...",
 *     "product description": "...",
 *     "price": 3990.0,
 *     "rating": 4.5
 * }
 */

const BackendProductCard = ({ product, index = 0, onSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Normalizar nombres de campos (el backend puede enviar "product name" o "productName")
    const productName = product['product name'] || product.productName || product.name || 'Producto';
    const productDescription = product['product description'] || product.productDescription || product.description || '';
    const price = product.price || 0;
    const rating = product.rating || 0;

    // Formatear precio en euros
    const formattedPrice = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    // Generar estrellas para el rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star size={14} className="text-gray-600" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} size={14} className="text-gray-600" />
                );
            }
        }
        return stars;
    };

    // Truncar descripción
    const truncatedDescription = productDescription.length > 120 && !isExpanded
        ? productDescription.substring(0, 120) + '...'
        : productDescription;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.1,
                duration: 0.3,
                ease: 'easeOut'
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-[#8c52ff]/50 hover:shadow-xl hover:shadow-[#8c52ff]/10"
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/0 to-purple-600/0 group-hover:from-[#8c52ff]/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none" />

            {/* Ranking badge */}
            <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1 px-2 py-1 bg-[#8c52ff]/20 backdrop-blur-sm rounded-lg border border-[#8c52ff]/30">
                    <TrendingUp size={12} className="text-[#8c52ff]" />
                    <span className="text-xs font-semibold text-[#8c52ff]">#{index + 1}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 pt-12">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#8c52ff] transition-colors">
                    {productName}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                        {renderStars(rating)}
                    </div>
                    <span className="text-sm text-gray-400">
                        {rating.toFixed(1)}
                    </span>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {truncatedDescription}
                    </p>
                    {productDescription.length > 120 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="flex items-center gap-1 mt-2 text-xs text-[#8c52ff] hover:text-purple-400 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp size={14} />
                                    Ver menos
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={14} />
                                    Ver más
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {formattedPrice}
                        </span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect?.(product)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8c52ff] to-purple-600 hover:from-[#7a45e6] hover:to-purple-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-[#8c52ff]/20"
                    >
                        <span>Ver más</span>
                        <ExternalLink size={14} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

/**
 * BackendProductList - Lista de productos del backend
 */
export const BackendProductList = ({ products = [], onProductSelect, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-5 animate-pulse"
                    >
                        <div className="h-6 bg-white/10 rounded w-3/4 mb-3" />
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <div key={s} className="w-4 h-4 bg-white/10 rounded" />
                            ))}
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-white/10 rounded w-full" />
                            <div className="h-4 bg-white/10 rounded w-2/3" />
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-white/5">
                            <div className="h-8 bg-white/10 rounded w-24" />
                            <div className="h-10 bg-[#8c52ff]/20 rounded-xl w-24" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            {products.map((product, index) => (
                <BackendProductCard
                    key={product.id || index}
                    product={product}
                    index={index}
                    onSelect={onProductSelect}
                />
            ))}
        </motion.div>
    );
};

export default BackendProductCard;
