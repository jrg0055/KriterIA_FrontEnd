/**
 * InteractiveChat - Componente de chat interactivo con opciones
 * Se activa cuando la IA necesita hacer preguntas progresivas al usuario
 */
import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, CheckCircle, ChevronRight, Edit3, SkipForward, ShoppingBag, Star, ExternalLink } from 'lucide-react';
import logoImg from '../assets/logotfg.png';
import { sendPromptToModel } from '../../services/api';

// Categorías predefinidas con preguntas y opciones
const PRODUCT_CATEGORIES = {
    tecnologia: {
        keywords: ['móvil', 'movil', 'telefono', 'teléfono', 'smartphone', 'iphone', 'samsung', 'portátil', 'portatil', 'laptop', 'ordenador', 'pc', 'tablet', 'ipad', 'tv', 'televisor', 'televisión', 'television', 'monitor', 'pantalla', 'auriculares', 'cascos', 'altavoz', 'smartwatch', 'reloj', 'cámara', 'camara', 'drone', 'consola', 'playstation', 'xbox', 'nintendo'],
        question: {
            type: 'question',
            message: '¡Perfecto! Para encontrar el mejor producto tecnológico para ti...',
            question: '¿Para qué lo vas a usar principalmente?',
            options: [
                { id: 'gaming', label: '🎮 Gaming', value: 'gaming' },
                { id: 'trabajo', label: '💼 Trabajo/Oficina', value: 'trabajo' },
                { id: 'estudio', label: '📚 Estudio', value: 'estudio' },
                { id: 'multimedia', label: '🎬 Entretenimiento/Multimedia', value: 'multimedia' },
                { id: 'foto', label: '📸 Fotografía/Vídeo', value: 'foto' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    moda: {
        keywords: ['ropa', 'camiseta', 'pantalón', 'pantalon', 'vestido', 'falda', 'chaqueta', 'abrigo', 'zapatillas', 'zapatos', 'botas', 'sneakers', 'nike', 'adidas', 'zara', 'bolso', 'mochila', 'gorra', 'sombrero', 'jersey', 'sudadera'],
        question: {
            type: 'question',
            message: '¡Genial! Para encontrar la prenda perfecta...',
            question: '¿Para qué ocasión lo necesitas?',
            options: [
                { id: 'casual', label: '👕 Casual/Día a día', value: 'casual' },
                { id: 'formal', label: '👔 Formal/Trabajo', value: 'formal' },
                { id: 'deporte', label: '🏃 Deporte/Fitness', value: 'deporte' },
                { id: 'fiesta', label: '🎉 Fiesta/Eventos', value: 'fiesta' },
                { id: 'outdoor', label: '🏔️ Outdoor/Aventura', value: 'outdoor' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    hogar: {
        keywords: ['mueble', 'sofá', 'sofa', 'mesa', 'silla', 'estantería', 'estanteria', 'cama', 'colchón', 'colchon', 'lámpara', 'lampara', 'decoración', 'decoracion', 'alfombra', 'cortina', 'espejo', 'ikea', 'cocina', 'baño'],
        question: {
            type: 'question',
            message: '¡Perfecto! Para encontrar lo mejor para tu hogar...',
            question: '¿Para qué habitación lo necesitas?',
            options: [
                { id: 'salon', label: '🛋️ Salón/Living', value: 'salon' },
                { id: 'dormitorio', label: '🛏️ Dormitorio', value: 'dormitorio' },
                { id: 'cocina', label: '🍳 Cocina', value: 'cocina' },
                { id: 'bano', label: '🚿 Baño', value: 'baño' },
                { id: 'oficina', label: '💻 Oficina/Despacho', value: 'oficina' },
                { id: 'exterior', label: '🌳 Terraza/Jardín', value: 'exterior' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    deporte: {
        keywords: ['deporte', 'fitness', 'gimnasio', 'bicicleta', 'bici', 'pesas', 'yoga', 'running', 'correr', 'natación', 'natacion', 'futbol', 'fútbol', 'baloncesto', 'tenis', 'padel', 'pádel', 'esquí', 'esqui', 'surf', 'decathlon'],
        question: {
            type: 'question',
            message: '¡Genial! Para encontrar el equipo deportivo ideal...',
            question: '¿Cuál es tu nivel de experiencia?',
            options: [
                { id: 'principiante', label: '🌱 Principiante', value: 'principiante' },
                { id: 'intermedio', label: '📈 Intermedio', value: 'intermedio' },
                { id: 'avanzado', label: '🏆 Avanzado/Profesional', value: 'avanzado' }
            ],
            allowCustom: true,
            skipable: true
        }
    },
    belleza: {
        keywords: ['maquillaje', 'crema', 'serum', 'skincare', 'perfume', 'colonia', 'champú', 'champu', 'mascarilla', 'labial', 'base', 'sombra', 'rimel', 'cosmético', 'cosmetico', 'sephora', 'primor'],
        question: {
            type: 'question',
            message: '¡Perfecto! Para encontrar el producto de belleza ideal...',
            question: '¿Cuál es tu tipo de piel?',
            options: [
                { id: 'seca', label: '🏜️ Seca', value: 'seca' },
                { id: 'grasa', label: '✨ Grasa', value: 'grasa' },
                { id: 'mixta', label: '⚖️ Mixta', value: 'mixta' },
                { id: 'sensible', label: '🌸 Sensible', value: 'sensible' },
                { id: 'normal', label: '👌 Normal', value: 'normal' }
            ],
            allowCustom: true,
            skipable: true
        }
    },
    mascotas: {
        keywords: ['perro', 'gato', 'mascota', 'pienso', 'comida mascota', 'juguete mascota', 'collar', 'correa', 'cama perro', 'arenero', 'rascador', 'acuario', 'pez', 'pájaro', 'pajaro', 'kiwoko', 'tiendanimal'],
        question: {
            type: 'question',
            message: '¡Genial! Para encontrar lo mejor para tu mascota...',
            question: '¿Qué tipo de mascota tienes?',
            options: [
                { id: 'perro', label: '🐕 Perro', value: 'perro' },
                { id: 'gato', label: '🐱 Gato', value: 'gato' },
                { id: 'ave', label: '🐦 Ave', value: 'ave' },
                { id: 'pez', label: '🐟 Pez', value: 'pez' },
                { id: 'roedor', label: '🐹 Roedor', value: 'roedor' },
                { id: 'otro', label: '🐾 Otro', value: 'otro' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    electrodomesticos: {
        keywords: ['lavadora', 'secadora', 'lavavajillas', 'frigorífico', 'frigorifico', 'nevera', 'horno', 'microondas', 'aspiradora', 'robot aspirador', 'roomba', 'aire acondicionado', 'calefactor', 'cafetera', 'batidora', 'thermomix'],
        question: {
            type: 'question',
            message: '¡Perfecto! Para encontrar el electrodoméstico ideal...',
            question: '¿Qué es lo más importante para ti?',
            options: [
                { id: 'eficiencia', label: '⚡ Eficiencia energética', value: 'eficiencia' },
                { id: 'capacidad', label: '📦 Gran capacidad', value: 'capacidad' },
                { id: 'silencioso', label: '🔇 Silencioso', value: 'silencioso' },
                { id: 'smart', label: '📱 Funciones Smart/WiFi', value: 'smart' },
                { id: 'precio', label: '💰 Mejor precio', value: 'precio' }
            ],
            allowCustom: true,
            skipable: false
        }
    }
};

// Función para detectar la categoría del producto
const detectCategory = (message) => {
    const lowerMessage = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    for (const [category, data] of Object.entries(PRODUCT_CATEGORIES)) {
        for (const keyword of data.keywords) {
            const normalizedKeyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (lowerMessage.includes(normalizedKeyword)) {
                return { category, ...data };
            }
        }
    }
    return null;
};

const InteractiveChat = ({
    isOpen,
    onClose,
    initialMessage = '',
    products = [],
    onProductClick
}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [conversationId] = useState(() => Math.random().toString(36).substring(7));
    const [userContext, setUserContext] = useState({}); // Guardar respuestas del usuario

    const messagesEndRef = useRef(null);

    // Scroll automático al final
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Iniciar conversación cuando se abre
    useEffect(() => {
        if (isOpen && initialMessage && messages.length === 0) {
            handleInitialMessage(initialMessage);
        }
    }, [isOpen, initialMessage]);

    // Manejar mensaje inicial con detección de categoría
    const handleInitialMessage = (message) => {
        // Añadir mensaje del usuario
        setMessages([{
            role: 'user',
            content: message,
            timestamp: new Date()
        }]);

        // Detectar categoría
        const detected = detectCategory(message);

        if (detected) {
            // Mostrar pregunta predefinida inmediatamente
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: detected.question,
                timestamp: new Date()
            }]);
            setCurrentQuestion(detected.question);
            setUserContext({ originalQuery: message, category: detected.category });
        } else {
            // Si no se detecta categoría, enviar a la IA
            sendMessage(message);
        }
    };

    const sendMessage = async (content, isFollowUp = false) => {
        const userMessage = typeof content === 'string' ? content : content.value;

        // Si es una respuesta a una pregunta predefinida, añadir contexto
        if (!isFollowUp) {
            setMessages(prev => [...prev, {
                role: 'user',
                content: userMessage,
                timestamp: new Date()
            }]);
        }

        setLoading(true);
        setCurrentQuestion(null);
        setShowCustomInput(false);

        // Construir mensaje con contexto
        const contextMessage = userContext.originalQuery
            ? `El usuario busca: ${userContext.originalQuery}. Categoría: ${userContext.category}. Respuesta del usuario: ${userMessage}. Contexto adicional: ${JSON.stringify(userContext)}`
            : userMessage;

        try {
            const data = await sendPromptToModel(contextMessage);

            // Si el backend devuelve un array de productos, construir mensaje de recomendación
            let messageContent;
            if (Array.isArray(data) && data.length > 0) {
                const formatPrice = (p) => new Intl.NumberFormat('es-ES', {
                    style: 'currency', currency: 'EUR',
                    minimumFractionDigits: 0, maximumFractionDigits: 0
                }).format(p || 0);

                messageContent = {
                    type: 'recommendation',
                    status: 'complete',
                    summary: `He encontrado ${data.length} producto${data.length === 1 ? '' : 's'} para ti.`,
                    products: data.map(p => ({
                        name: p['product_name'] || p['product name'] || p.name || 'Producto',
                        price: formatPrice(p.price),
                        reason: p['product_description'] || p['product description'] || p.description || '',
                        matchScore: p.rating ? Math.round(p.rating * 20) : null,
                    })),
                };
            } else {
                messageContent = data;
            }

            // Añadir mensaje de la IA
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: messageContent,
                timestamp: new Date()
            }]);

            // Si hay pregunta, mostrar opciones
            if (messageContent && messageContent.type === 'question') {
                setCurrentQuestion(messageContent);
            }

            // Guardar contexto de respuestas
            setUserContext(prev => ({ ...prev, lastAnswer: userMessage }));

        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: {
                    type: 'error',
                    message: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.'
                },
                timestamp: new Date()
            }]);
        } finally {
            setLoading(false);
            setInput('');
        }
    };

    const handleOptionSelect = (option) => {
        // Añadir la selección como mensaje del usuario
        setMessages(prev => [...prev, {
            role: 'user',
            content: option.label,
            timestamp: new Date()
        }]);

        // Guardar en contexto y enviar a la IA
        setUserContext(prev => ({ ...prev, [option.id]: option.value }));
        sendMessage(option.label, true);
    };

    const handleSkip = () => {
        setMessages(prev => [...prev, {
            role: 'user',
            content: 'Saltar',
            timestamp: new Date()
        }]);
        sendMessage('Saltar (no tengo preferencia)', true);
    };

    const handleCustomSubmit = () => {
        if (input.trim()) {
            const message = input;
            setInput('');

            if (messages.length === 0) {
                handleInitialMessage(message);
            } else {
                setMessages(prev => [...prev, {
                    role: 'user',
                    content: message,
                    timestamp: new Date()
                }]);
                sendMessage(message, true);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col border border-white/10 shadow-2xl overflow-hidden">
                {/* Header con logo grande */}
                <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-[#8c52ff]/20 to-purple-600/20">
                    <div className="flex items-center gap-4">
                        <img
                            src={logoImg}
                            className="h-12 w-auto object-contain"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Kriter<span className="text-[#8c52ff]">IA</span> Asistente
                            </h2>
                            <p className="text-sm text-gray-400">Te ayudo a encontrar el producto perfecto</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'user' ? (
                                <div className="bg-[#8c52ff] text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] shadow-lg">
                                    {msg.content}
                                </div>
                            ) : (
                                <div className="max-w-[85%]">
                                    <MessageContent
                                        content={msg.content}
                                        onProductClick={onProductClick}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-[#252525] px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                                <div className="flex items-center gap-2 text-[#8c52ff]">
                                    <Loader2 className="animate-spin" size={18} />
                                    <span className="text-gray-400">Pensando...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Options de pregunta actual */}
                {currentQuestion && !loading && (
                    <div className="p-4 bg-[#151515] border-t border-white/10 space-y-2 max-h-[40%] overflow-y-auto">
                        <div className="grid gap-2">
                            {currentQuestion.options?.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option)}
                                    className="w-full text-left px-4 py-3 bg-[#252525] hover:bg-[#8c52ff]/20 border border-white/10 hover:border-[#8c52ff]/50 rounded-xl transition-all flex items-center justify-between group"
                                >
                                    <span className="text-gray-200 group-hover:text-white">{option.label}</span>
                                    <ChevronRight size={18} className="text-gray-500 group-hover:text-[#8c52ff] transition-colors" />
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2 pt-2">
                            {currentQuestion.allowCustom && (
                                <button
                                    onClick={() => setShowCustomInput(true)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#8c52ff]/10 border border-white/10 rounded-xl transition-all text-gray-400 hover:text-white"
                                >
                                    <Edit3 size={16} />
                                    <span>Otra opción...</span>
                                </button>
                            )}

                            {currentQuestion.skipable && (
                                <button
                                    onClick={handleSkip}
                                    className="flex items-center justify-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    <SkipForward size={16} />
                                    <span>Saltar</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Input de texto */}
                {((!currentQuestion || showCustomInput) && !loading) && (
                    <div className="p-4 bg-[#151515] border-t border-white/10">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && input.trim() && handleCustomSubmit()}
                                placeholder={showCustomInput ? "Escribe tu respuesta..." : "Escribe tu mensaje..."}
                                className="flex-1 px-4 py-3 bg-[#252525] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent text-white placeholder-gray-500"
                            />
                            <button
                                onClick={handleCustomSubmit}
                                disabled={!input.trim()}
                                className="px-4 py-3 bg-[#8c52ff] hover:bg-[#7a45e6] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                            >
                                <Send size={20} className="text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente para renderizar el contenido del mensaje
const MessageContent = ({ content, onProductClick }) => {
    if (!content) return null;

    // Mensaje de pregunta
    if (content.type === 'question') {
        return (
            <div className="bg-[#252525] text-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 space-y-2">
                {content.message && (
                    <p className="text-sm text-gray-400">{content.message}</p>
                )}
                <p className="font-medium text-white">{content.question}</p>
            </div>
        );
    }

    // Mensaje de recomendación en proceso
    if (content.type === 'recommendation' && content.status === 'gathering') {
        return (
            <div className="bg-[#252525] px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-[#8c52ff]" size={18} />
                    <span className="text-gray-300">{content.message}</span>
                </div>
            </div>
        );
    }

    // Mensaje de recomendación completa
    if (content.type === 'recommendation' && content.status === 'complete') {
        return (
            <div className="space-y-4">
                {/* Resumen */}
                <div className="bg-[#252525] px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                    <div className="flex items-center gap-2 text-[#8c52ff] mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm font-medium">Recomendaciones encontradas</span>
                    </div>
                    <p className="text-sm text-gray-400">{content.summary}</p>
                </div>

                {/* Productos */}
                {content.products?.map((product, i) => (
                    <ProductRecommendation
                        key={i}
                        product={product}
                        rank={i + 1}
                        onClick={onProductClick}
                    />
                ))}

                {/* Consejo */}
                {content.advice && (
                    <div className="bg-gradient-to-r from-[#8c52ff]/20 to-purple-600/20 px-4 py-3 rounded-xl border border-[#8c52ff]/30">
                        <div className="flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <p className="text-sm text-gray-200">{content.advice}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Mensaje de error
    if (content.type === 'error') {
        return (
            <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-2xl rounded-bl-sm">
                <p className="text-red-400">{content.message}</p>
            </div>
        );
    }

    // Mensaje de texto simple
    if (typeof content === 'string') {
        return (
            <div className="bg-[#252525] text-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                {content}
            </div>
        );
    }

    return null;
};

// Componente para mostrar un producto recomendado
const ProductRecommendation = ({ product, rank, onClick }) => {
    return (
        <div
            className="bg-[#252525] rounded-xl border border-white/10 overflow-hidden hover:border-[#8c52ff]/50 transition-all cursor-pointer group"
            onClick={() => onClick?.(product)}
        >
            {/* Header con ranking */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8c52ff]/10 to-transparent border-b border-white/5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${rank === 1 ? 'bg-yellow-500 text-black' :
                    rank === 2 ? 'bg-gray-400 text-black' :
                        'bg-amber-700 text-white'
                    }`}>
                    {rank}
                </div>
                <span className="text-xs text-gray-400">
                    {rank === 1 ? 'Mejor opción' : rank === 2 ? 'Alternativa' : 'Opción económica'}
                </span>
                {product.matchScore && (
                    <div className="ml-auto flex items-center gap-1 text-[#8c52ff]">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs">{product.matchScore}% match</span>
                    </div>
                )}
            </div>

            {/* Contenido del producto */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-white group-hover:text-[#8c52ff] transition-colors">
                            {product.name}
                        </h4>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-green-400">{product.price}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <ShoppingBag size={12} />
                            {product.store}
                        </p>
                    </div>
                </div>

                {/* Specs */}
                {product.specs && (
                    <div className="flex flex-wrap gap-2">
                        {product.specs.map((spec, j) => (
                            <span
                                key={j}
                                className="text-xs bg-[#1a1a1a] px-2 py-1 rounded-lg text-gray-400 border border-white/5"
                            >
                                {spec}
                            </span>
                        ))}
                    </div>
                )}

                {/* Pros */}
                {product.pros && (
                    <div className="space-y-1">
                        {product.pros.map((pro, j) => (
                            <p key={j} className="text-sm text-green-400 flex items-center gap-2">
                                <CheckCircle size={14} />
                                {pro}
                            </p>
                        ))}
                    </div>
                )}

                {/* Cons */}
                {product.cons && product.cons.length > 0 && (
                    <div className="space-y-1">
                        {product.cons.map((con, j) => (
                            <p key={j} className="text-sm text-orange-400 flex items-center gap-2">
                                <span className="w-3.5 h-3.5 flex items-center justify-center">⚠</span>
                                {con}
                            </p>
                        ))}
                    </div>
                )}

                {/* Razón */}
                {product.reason && (
                    <p className="text-sm italic text-gray-400 border-t border-white/5 pt-3">
                        "{product.reason}"
                    </p>
                )}

                {/* Botón de ver en tienda */}
                <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-[#8c52ff]/20 hover:bg-[#8c52ff] text-[#8c52ff] hover:text-white rounded-lg transition-all">
                    <ExternalLink size={16} />
                    <span>Ver en {product.store}</span>
                </button>
            </div>
        </div>
    );
};

export default InteractiveChat;
