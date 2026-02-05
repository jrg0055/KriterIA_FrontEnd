/**
 * AIProductResults - Contenedor para mostrar los resultados de búsqueda de la IA
 * Recibe productos del backend y los muestra en tarjetas animadas
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, RefreshCw, AlertCircle, Search, ChevronDown, Zap, Cpu, Send, Mic } from 'lucide-react';
import AIProductCard from './AIProductCard';
import { sendPromptToModel } from '../../services/api';

// Modelos disponibles
const AI_MODELS = [
    { id: 'openai/gpt-oss-120b', name: 'High', icon: Cpu, description: 'Más preciso y detallado' },
    { id: 'openai/gpt-oss-20b', name: 'Flash', icon: Zap, description: 'Rápido y eficiente' },
];

const AIProductResults = ({ 
    onProductSelect,
    className = '' 
}) => {
    const [prompt, setPrompt] = useState('');
    const [selectedModel, setSelectedModel] = useState('openai/gpt-oss-120b');
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsModelDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Enviar prompt al backend
    const handleSubmit = async (e) => {
        e?.preventDefault();
        
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const response = await sendPromptToModel(prompt.trim(), selectedModel);
            
            // El backend devuelve un array de productos
            if (Array.isArray(response)) {
                setProducts(response);
            } else if (response.products && Array.isArray(response.products)) {
                setProducts(response.products);
            } else {
                setProducts([]);
                setError('No se encontraron productos que coincidan con tu búsqueda.');
            }
        } catch (err) {
            console.error('Error al obtener productos:', err);
            setError(err.message || 'Error al conectar con el servidor. Inténtalo de nuevo.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Limpiar búsqueda
    const handleClear = () => {
        setPrompt('');
        setProducts([]);
        setError(null);
        setHasSearched(false);
    };

    // Obtener modelo seleccionado
    const currentModel = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];
    const ModelIcon = currentModel.icon;

    return (
        <div className={`w-full ${className}`}>
            {/* Barra de búsqueda estilo Gemini */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 mb-6">
                <form onSubmit={handleSubmit}>
                    {/* Input del prompt */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Pregunta a KriterIA"
                            className="w-full px-5 py-4 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none text-lg"
                            disabled={loading}
                        />
                    </div>

                    {/* Barra inferior con controles */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        {/* Lado izquierdo - Herramientas (placeholder) */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="p-2 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-lg transition-all"
                            >
                                <span className="text-xl">+</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-lg transition-all text-sm"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                </svg>
                                Herramientas
                            </button>
                        </div>

                        {/* Lado derecho - Selector de modelo y enviar */}
                        <div className="flex items-center gap-3">
                            {/* Selector de modelo estilo Gemini */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
                                    <span className="text-sm font-medium">{currentModel.name}</span>
                                    <ChevronDown 
                                        size={14} 
                                        className={`text-gray-500 transition-transform duration-200 ${isModelDropdownOpen ? 'rotate-180' : ''}`} 
                                    />
                                </button>

                                {/* Dropdown de modelos */}
                                <AnimatePresence>
                                    {isModelDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute bottom-full right-0 mb-2 w-48 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                                        >
                                            {AI_MODELS.map((model) => {
                                                const Icon = model.icon;
                                                return (
                                                    <button
                                                        key={model.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedModel(model.id);
                                                            setIsModelDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 ${
                                                            selectedModel === model.id ? 'bg-[#8c52ff]/15' : ''
                                                        }`}
                                                    >
                                                        <Icon size={18} className={selectedModel === model.id ? 'text-[#8c52ff]' : 'text-gray-400'} />
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <span className={`font-medium ${selectedModel === model.id ? 'text-white' : 'text-gray-300'}`}>
                                                                    {model.name}
                                                                </span>
                                                                {selectedModel === model.id && (
                                                                    <span className="text-[#8c52ff]">✓</span>
                                                                )}
                                                            </div>
                                                            <span className="text-xs text-gray-500">{model.description}</span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Botón de micrófono */}
                            <button
                                type="button"
                                className="p-2 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-lg transition-all"
                            >
                                <Mic size={20} />
                            </button>

                            {/* Botón de enviar */}
                            {prompt.trim() && (
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 bg-[#8c52ff] hover:bg-[#7a45e6] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#8c52ff]/25"
                                >
                                    {loading ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Área de resultados */}
            <AnimatePresence mode="wait">
                {/* Estado de carga */}
                {loading && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-[#8c52ff]/20 rounded-full" />
                            <div className="absolute inset-0 w-16 h-16 border-4 border-[#8c52ff] border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="mt-4 text-gray-400">Analizando tu búsqueda con {currentModel.name}...</p>
                        <p className="text-sm text-gray-600 mt-1">Encontrando las mejores opciones para ti</p>
                    </motion.div>
                )}

                {/* Error */}
                {!loading && error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle size={32} className="text-red-400" />
                        </div>
                        <p className="text-red-400 font-medium mb-2">{error}</p>
                        <button
                            onClick={handleSubmit}
                            className="text-[#8c52ff] hover:text-white text-sm flex items-center gap-1 mt-2"
                        >
                            <RefreshCw size={14} />
                            Intentar de nuevo
                        </button>
                    </motion.div>
                )}

                {/* Sin resultados */}
                {!loading && !error && hasSearched && products.length === 0 && (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <div className="w-16 h-16 bg-[#8c52ff]/10 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-[#8c52ff]" />
                        </div>
                        <p className="text-gray-400 font-medium mb-2">No se encontraron productos</p>
                        <p className="text-sm text-gray-600">Prueba con una descripción diferente</p>
                    </motion.div>
                )}

                {/* Resultados de productos */}
                {!loading && !error && products.length > 0 && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {/* Header de resultados */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles size={18} className="text-[#8c52ff]" />
                                <h3 className="text-white font-semibold">
                                    {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                                </h3>
                            </div>
                            <span className="text-xs text-gray-500 bg-[#252525] px-3 py-1 rounded-full">
                                Usando {currentModel.name}
                            </span>
                        </div>

                        {/* Grid de tarjetas */}
                        <div className="grid grid-cols-1 gap-4">
                            {products.map((product, index) => (
                                <AIProductCard
                                    key={`${product['product name']}-${index}`}
                                    product={product}
                                    index={index}
                                    onSelect={onProductSelect}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Estado inicial */}
                {!loading && !error && !hasSearched && (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-[#8c52ff]/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4">
                            <Sparkles size={36} className="text-[#8c52ff]" />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                            Busca con inteligencia artificial
                        </h3>
                        <p className="text-gray-500 text-sm max-w-md">
                            Describe lo que buscas y nuestra IA encontrará las mejores opciones para ti
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIProductResults;
