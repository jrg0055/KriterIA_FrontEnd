import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Check, ExternalLink, Info, Search } from 'lucide-react';
import { STORE_INTEGRATIONS, STORE_CATEGORIES, getStoresByCategory } from '../data/storeIntegrations';

const IntegrationsPanel = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [connectedStores, setConnectedStores] = useState([]);

    const filteredStores = getStoresByCategory(selectedCategory).filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleConnect = (storeId) => {
        if (connectedStores.includes(storeId)) {
            setConnectedStores(connectedStores.filter(id => id !== storeId));
        } else {
            setConnectedStores([...connectedStores, storeId]);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            available: { label: 'Disponible', color: 'bg-green-500' },
            planned: { label: 'Próximamente', color: 'bg-yellow-500' },
            beta: { label: 'Beta', color: 'bg-blue-500' },
            unavailable: { label: 'No disponible', color: 'bg-gray-500' }
        };
        return badges[status] || badges.unavailable;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Integraciones de Tiendas</h1>
                <p className="text-gray-400">Conecta con tus tiendas favoritas para obtener los mejores precios y productos</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar tiendas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8c52ff]"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {STORE_CATEGORIES.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedCategory === category.id
                                    ? 'bg-[#8c52ff] text-white'
                                    : 'bg-[#252525] text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {category.icon} {category.label}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-[#252525] border border-white/5 rounded-xl p-4"
                >
                    <div className="text-gray-400 text-sm mb-1">Tiendas Disponibles</div>
                    <div className="text-3xl font-bold text-white">
                        {STORE_INTEGRATIONS.filter(s => s.status === 'available').length}
                    </div>
                </motion.div>
                <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-[#252525] border border-white/5 rounded-xl p-4"
                >
                    <div className="text-gray-400 text-sm mb-1">Conectadas</div>
                    <div className="text-3xl font-bold text-[#8c52ff]">{connectedStores.length}</div>
                </motion.div>
                <motion.div
                    whileHover={{ y: -2 }}
                    className="bg-[#252525] border border-white/5 rounded-xl p-4"
                >
                    <div className="text-gray-400 text-sm mb-1">Próximamente</div>
                    <div className="text-3xl font-bold text-yellow-500">
                        {STORE_INTEGRATIONS.filter(s => s.status === 'planned').length}
                    </div>
                </motion.div>
            </div>

            {/* Store Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory + searchQuery}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredStores.map((store, index) => {
                        const isConnected = connectedStores.includes(store.id);
                        const statusBadge = getStatusBadge(store.status);

                        return (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -4 }}
                                className={`bg-[#252525] border rounded-2xl p-6 transition-all ${isConnected
                                        ? 'border-[#8c52ff]/50 shadow-lg shadow-[#8c52ff]/20'
                                        : 'border-white/5 hover:border-white/10'
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {/* Logo Placeholder */}
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                            <Store size={24} className="text-[#8c52ff]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{store.name}</h3>
                                            <span className="text-xs text-gray-500">{store.category}</span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <span className={`text-xs px-2 py-1 rounded-full ${statusBadge.color} text-white`}>
                                        {statusBadge.label}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{store.description}</p>

                                {/* Scopes */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {store.scopes.map((scope, idx) => (
                                        <span key={idx} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-md">
                                            {scope}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <motion.button
                                        onClick={() => handleConnect(store.id)}
                                        disabled={store.status !== 'available'}
                                        whileHover={{ scale: store.status === 'available' ? 1.02 : 1 }}
                                        whileTap={{ scale: store.status === 'available' ? 0.98 : 1 }}
                                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${isConnected
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : store.status === 'available'
                                                    ? 'bg-[#8c52ff] hover:bg-[#7a45e6] text-white'
                                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {isConnected ? (
                                            <>
                                                <Check size={16} />
                                                Conectado
                                            </>
                                        ) : (
                                            'Conectar'
                                        )}
                                    </motion.button>

                                    {store.documentation && (
                                        <motion.a
                                            href={store.documentation}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            <Info size={20} className="text-gray-400" />
                                        </motion.a>
                                    )}
                                </div>

                                {/* Setup Instructions */}
                                {store.setupInstructions && (
                                    <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <p className="text-xs text-blue-400">{store.setupInstructions}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredStores.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <Store size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400">No se encontraron tiendas</p>
                </motion.div>
            )}
        </div>
    );
};

export default IntegrationsPanel;
