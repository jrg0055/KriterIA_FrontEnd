import React from 'react';
import { Star, TrendingDown, ExternalLink, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
    const bestStore = product.stores?.reduce((min, store) => {
        const price = parseFloat(store.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
        const minPrice = parseFloat(min.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
        return price < minPrice ? store : min;
    }, product.stores[0]);

    const handleQuickBuy = (e) => {
        e.stopPropagation();
        if (bestStore?.url) {
            window.open(bestStore.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-[#252525] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#8c52ff]/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(140,82,255,0.25)]"
            onClick={() => onClick(product)}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1b1b1b] to-[#252525]">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Best Price Badge */}
                {bestStore && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg"
                    >
                        <TrendingDown size={14} />
                        <span>{bestStore.name}</span>
                    </motion.div>
                )}

                {/* Rating */}
                {product.rating && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg border border-white/10"
                    >
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                    </motion.div>
                )}

                {/* Hover Overlay with Quick Buy */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-4 gap-2"
                >
                    <motion.button
                        onClick={handleQuickBuy}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#8c52ff] hover:bg-[#7a45e6] text-white text-sm font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-[#8c52ff]/30"
                    >
                        <ShoppingCart size={16} />
                        Comprar ahora
                    </motion.button>
                    <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="text-white/80 text-xs flex items-center gap-1"
                    >
                        o ver detalles
                        <ExternalLink size={12} />
                    </motion.span>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category */}
                {product.category && (
                    <motion.span
                        className="text-xs text-[#8c52ff] uppercase tracking-wider font-semibold bg-[#8c52ff]/10 px-2 py-1 rounded-md inline-block mb-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        {product.category}
                    </motion.span>
                )}

                {/* Name */}
                <h3 className="text-white font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-[#8c52ff] transition-colors leading-snug">
                    {product.name}
                </h3>

                {/* Specs Preview */}
                {product.specs && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.specs.slice(0, 2).map((spec, idx) => (
                            <motion.span
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="text-xs text-gray-400 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/5 transition-colors"
                            >
                                {spec}
                            </motion.span>
                        ))}
                    </div>
                )}

                {/* Price and Stores */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div>
                        <span className="text-[#8c52ff] font-bold text-xl tracking-tight">{product.price}</span>
                        {product.stores && product.stores.length > 1 && (
                            <div className="text-xs text-gray-500 mt-0.5">
                                +{product.stores.length - 1} {product.stores.length === 2 ? 'tienda' : 'tiendas'}
                            </div>
                        )}
                    </div>
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-10 h-10 rounded-full bg-[#8c52ff]/10 flex items-center justify-center group-hover:bg-[#8c52ff]/20 transition-colors"
                    >
                        <ExternalLink size={18} className="text-[#8c52ff]" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
