import React from 'react';
import { X, Search, TrendingUp, CreditCard, ChevronRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';

const ProductSlideOver = ({ product, isOpen, onClose, onBuy }) => {
    const { addToast } = useToast();

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative w-full max-w-md h-full bg-[#1b1b1b] border-l border-white/10 shadow-2xl p-6 overflow-y-auto animate-slide-in-right">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
                    <X size={20} />
                </button>

                <span className="inline-block px-3 py-1 rounded-full bg-[#8c52ff]/10 text-[#8c52ff] text-xs font-bold mb-4 border border-[#8c52ff]/20">
                    Mejor Opción
                </span>

                <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
                <div className="text-3xl text-[#8c52ff] font-bold mb-6">{product.price}</div>

                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-8 border border-white/10 relative shadow-lg">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                    <button className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
                        <Search size={12} /> Zoom
                    </button>
                </div>

                <div className="space-y-6">
                    <section>
                        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                            <TrendingUp size={16} className="text-[#8c52ff]" />
                            Especificaciones Clave
                        </h3>
                        <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
                            <ul className="space-y-2">
                                {product.specs.map((spec, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#8c52ff]" />
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                            <CreditCard size={16} className="text-[#8c52ff]" />
                            Comparativa de Tiendas
                        </h3>
                        <div className="space-y-2">
                            {product.stores.map((store, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        if (store.url) {
                                            window.open(store.url, '_blank');
                                            addToast(`Redirigiendo a ${store.name}...`, 'success');
                                        } else {
                                            addToast('URL no disponible', 'default');
                                        }
                                    }}
                                    className="flex justify-between items-center p-3 rounded-xl bg-[#252525] border border-white/5 hover:border-[#8c52ff]/50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-bold text-xs">
                                            {store.name[0]}
                                        </div>
                                        <span className="text-gray-200 text-sm">{store.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-white font-bold text-sm">{store.price}</span>
                                        <ChevronRight size={16} className="text-gray-500 group-hover:text-[#8c52ff]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="pt-6 border-t border-white/10 flex gap-3">
                        <Button
                            className="flex-1"
                            onClick={() => {
                                const bestStore = product.stores.reduce((min, s) =>
                                    parseFloat(s.price.replace(/[^\d,]/g, '').replace(',', '.')) <
                                        parseFloat(min.price.replace(/[^\d,]/g, '').replace(',', '.')) ? s : min
                                );
                                if (bestStore.url) {
                                    window.open(bestStore.url, '_blank');
                                    addToast(`Redirigiendo al mejor precio en ${bestStore.name}...`, 'success');
                                }
                            }}
                        >
                            Comprar Ahora
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => addToast("Función próximamente", "default")}>Comparar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSlideOver;
