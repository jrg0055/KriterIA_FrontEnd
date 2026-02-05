import React from 'react';
import { Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';
import BackendProductCard, { BackendProductList } from './BackendProductCard';

const ChatMessage = ({ role, content, attachments, backendProducts, timestamp, isInteractive, onProductSelect }) => {
    const isAi = role === 'ai';

    // Renderizar markdown básico (negrita, cursiva, listas)
    const renderContent = (text) => {
        if (!text) return null;

        const lines = text.split('\n');

        return lines.map((line, lineIdx) => {
            // Negrita
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const rendered = parts.map((part, idx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={idx} className="text-[#8c52ff] font-semibold">{part.slice(2, -2)}</strong>;
                }
                // Cursiva
                if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                    return <em key={idx} className="text-gray-400">{part.slice(1, -1)}</em>;
                }
                return part;
            });

            // Si es un bullet point
            if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                return (
                    <li key={lineIdx} className="ml-4">
                        {rendered}
                    </li>
                );
            }

            // Línea normal
            return <p key={lineIdx}>{rendered}</p>;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex gap-4 mb-6 ${isAi ? '' : 'flex-row-reverse'}`}
        >
            {isAi ? (
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c52ff] to-purple-600 flex items-center justify-center shadow-lg shadow-[#8c52ff]/30 flex-shrink-0"
                >
                    <Sparkles size={18} className="text-white" />
                </motion.div>
            ) : (
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0"
                >
                    <User size={18} className="text-white" />
                </motion.div>
            )}

            <div className={`flex flex-col max-w-[85%] ${isAi ? '' : 'items-end'}`}>
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-2xl px-5 py-3 ${isAi
                        ? 'bg-[#252525] border border-white/5 rounded-tl-none shadow-xl'
                        : 'bg-gradient-to-br from-[#8c52ff] to-[#7a45e6] rounded-tr-none shadow-lg shadow-[#8c52ff]/30'
                        }`}
                >
                    <div className={`text-sm md:text-base leading-relaxed ${isAi ? 'text-gray-200' : 'text-white'} whitespace-pre-wrap`}>
                        {renderContent(content)}
                    </div>
                </motion.div>

                {/* Backend Products (from AI model response) */}
                {backendProducts && backendProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 w-full"
                    >
                        <BackendProductList
                            products={backendProducts}
                            onProductSelect={onProductSelect}
                        />
                    </motion.div>
                )}

                {/* Attachments (Legacy Product Cards) */}
                {attachments && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 flex flex-wrap gap-4 w-full"
                    >
                        {Array.isArray(attachments) ? attachments : attachments}
                    </motion.div>
                )}

                {/* Timestamp */}
                {timestamp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs text-gray-600 mt-2 px-1"
                    >
                        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ChatMessage;

