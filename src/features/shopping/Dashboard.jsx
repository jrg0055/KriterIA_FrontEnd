import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, ShoppingBag, LogOut, TrendingUp, Search, ChevronRight, Edit3, SkipForward } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { THEME } from '../../constants/theme';
import { INITIAL_PRODUCTS } from '../../data/products';
import { sendMessage, checkServerHealth } from '../../services/api';
import Logo from '../../components/common/Logo';
import ChatMessage from '../../components/ui/ChatMessage';
import ProductCard from '../../components/ui/ProductCard';
import ProductSlideOver from '../../components/ui/ProductSlideOver';

// Categorías predefinidas con preguntas y opciones
const PRODUCT_CATEGORIES = {
    tecnologia: {
        keywords: ['móvil', 'movil', 'telefono', 'teléfono', 'smartphone', 'iphone', 'samsung', 'portátil', 'portatil', 'laptop', 'ordenador', 'pc', 'tablet', 'ipad', 'tv', 'televisor', 'televisión', 'television', 'monitor', 'pantalla', 'auriculares', 'cascos', 'altavoz', 'smartwatch', 'reloj', 'cámara', 'camara', 'drone', 'consola', 'playstation', 'xbox', 'nintendo'],
        question: {
            message: '¡Perfecto! Para encontrar el mejor producto tecnológico para ti...',
            text: '¿Para qué lo vas a usar principalmente?',
            options: [
                { id: 'gaming', label: '🎮 Gaming', value: 'gaming' },
                { id: 'trabajo', label: '💼 Trabajo/Oficina', value: 'trabajo' },
                { id: 'estudio', label: '📚 Estudio', value: 'estudio' },
                { id: 'multimedia', label: '🎬 Entretenimiento', value: 'multimedia' },
                { id: 'foto', label: '📸 Fotografía/Vídeo', value: 'foto' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    moda: {
        keywords: ['ropa', 'camiseta', 'pantalón', 'pantalon', 'vestido', 'falda', 'chaqueta', 'abrigo', 'zapatillas', 'zapatos', 'botas', 'sneakers', 'nike', 'adidas', 'zara', 'bolso', 'mochila', 'gorra', 'jersey', 'sudadera'],
        question: {
            message: '¡Genial! Para encontrar la prenda perfecta...',
            text: '¿Para qué ocasión lo necesitas?',
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
        keywords: ['mueble', 'sofá', 'sofa', 'mesa', 'silla', 'estantería', 'estanteria', 'cama', 'colchón', 'colchon', 'lámpara', 'lampara', 'decoración', 'decoracion', 'alfombra', 'cortina', 'espejo', 'ikea'],
        question: {
            message: '¡Perfecto! Para encontrar lo mejor para tu hogar...',
            text: '¿Para qué habitación lo necesitas?',
            options: [
                { id: 'salon', label: '🛋️ Salón/Living', value: 'salon' },
                { id: 'dormitorio', label: '🛏️ Dormitorio', value: 'dormitorio' },
                { id: 'cocina', label: '🍳 Cocina', value: 'cocina' },
                { id: 'bano', label: '🚿 Baño', value: 'baño' },
                { id: 'oficina', label: '💻 Oficina', value: 'oficina' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    deporte: {
        keywords: ['deporte', 'fitness', 'gimnasio', 'bicicleta', 'bici', 'pesas', 'yoga', 'running', 'correr', 'natación', 'futbol', 'fútbol', 'baloncesto', 'tenis', 'padel', 'pádel', 'decathlon'],
        question: {
            message: '¡Genial! Para encontrar el equipo deportivo ideal...',
            text: '¿Cuál es tu nivel de experiencia?',
            options: [
                { id: 'principiante', label: '🌱 Principiante', value: 'principiante' },
                { id: 'intermedio', label: '📈 Intermedio', value: 'intermedio' },
                { id: 'avanzado', label: '🏆 Avanzado', value: 'avanzado' }
            ],
            allowCustom: true,
            skipable: true
        }
    },
    belleza: {
        keywords: ['maquillaje', 'crema', 'serum', 'skincare', 'perfume', 'colonia', 'champú', 'mascarilla', 'labial', 'cosmético', 'sephora', 'primor'],
        question: {
            message: '¡Perfecto! Para encontrar el producto de belleza ideal...',
            text: '¿Cuál es tu tipo de piel?',
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
        keywords: ['perro', 'gato', 'mascota', 'pienso', 'collar', 'correa', 'arenero', 'rascador', 'kiwoko', 'tiendanimal'],
        question: {
            message: '¡Genial! Para encontrar lo mejor para tu mascota...',
            text: '¿Qué tipo de mascota tienes?',
            options: [
                { id: 'perro', label: '🐕 Perro', value: 'perro' },
                { id: 'gato', label: '🐱 Gato', value: 'gato' },
                { id: 'ave', label: '🐦 Ave', value: 'ave' },
                { id: 'pez', label: '🐟 Pez', value: 'pez' },
                { id: 'otro', label: '🐾 Otro', value: 'otro' }
            ],
            allowCustom: true,
            skipable: false
        }
    },
    electrodomesticos: {
        keywords: ['lavadora', 'secadora', 'lavavajillas', 'frigorífico', 'frigorifico', 'nevera', 'horno', 'microondas', 'aspiradora', 'robot aspirador', 'roomba', 'cafetera', 'batidora'],
        question: {
            message: '¡Perfecto! Para encontrar el electrodoméstico ideal...',
            text: '¿Qué es lo más importante para ti?',
            options: [
                { id: 'eficiencia', label: '⚡ Eficiencia energética', value: 'eficiencia' },
                { id: 'capacidad', label: '📦 Gran capacidad', value: 'capacidad' },
                { id: 'silencioso', label: '🔇 Silencioso', value: 'silencioso' },
                { id: 'smart', label: '📱 Funciones Smart', value: 'smart' },
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

const Dashboard = ({ onLogout, initialQuery }) => {
    const [activeTab, setActiveTab] = useState('assistant');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const { addToast } = useToast();

    const [messages, setMessages] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [searchCount, setSearchCount] = useState(0);
    const [aiConnected, setAiConnected] = useState(false);

    // Estado para opciones interactivas en el chat
    const [currentOptions, setCurrentOptions] = useState(null);
    const [userContext, setUserContext] = useState({});
    const [showCustomInput, setShowCustomInput] = useState(false);

    const [profileSettings, setProfileSettings] = useState({
        amazon: true,
        ebay: false,
        aliexpress: false,
        instructions: "Prefiero productos con envío Prime y garantía de 2 años."
    });

    useEffect(() => {
        setMessages([{
            role: 'ai',
            content: '¡Hola! Soy **KriterIA**, tu asistente de compras inteligente. 🛒\n\nPuedo ayudarte a encontrar los mejores productos y comparar precios en tiendas como Amazon, MediaMarkt, El Corte Inglés, PcComponentes, Fnac, Worten y muchas más.\n\n**¿Qué producto estás buscando hoy?**',
            timestamp: new Date()
        }]);

        // Verificar conexión con el servidor de IA
        checkServerHealth().then(connected => {
            setAiConnected(connected);
            if (connected) {
                addToast('IA conectada', 'success');
            }
        });
    }, []);

    useEffect(() => {
        if (initialQuery) {
            setTimeout(() => handleSendMessage(initialQuery), 500);
        }
    }, []);

    const TABS = [
        { id: 'assistant', label: 'Asistente', icon: MessageSquare },
        { id: 'recommended', label: 'Recomendados', icon: Sparkles },
        { id: 'recent', label: 'Recientes', icon: ShoppingBag },
    ];

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        if (!recentProducts.find(p => p.id === product.id)) {
            setRecentProducts(prev => [product, ...prev].slice(0, 10));
        }
    };

    const handleBuy = () => {
        addToast("Redirigiendo a la tienda...", "default");
    };

    const handleSendMessage = async (text = inputVal, isOptionResponse = false) => {
        if (!text.trim()) return;

        const userMsg = { role: 'user', content: text, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInputVal("");
        setSearchCount(prev => prev + 1);
        setCurrentOptions(null);
        setShowCustomInput(false);

        // Detectar si es un producto y mostrar opciones inmediatamente
        if (!isOptionResponse && !userContext.originalQuery) {
            const detected = detectCategory(text);

            if (detected) {
                // Guardar contexto
                setUserContext({ originalQuery: text, category: detected.category });

                // Mostrar mensaje de la IA con la pregunta
                const aiMsg = {
                    role: 'ai',
                    content: `${detected.question.message}\n\n**${detected.question.text}**`,
                    timestamp: new Date(),
                    isInteractive: true
                };
                setMessages(prev => [...prev, aiMsg]);
                setCurrentOptions(detected.question);
                return;
            }
        }

        setIsTyping(true);

        try {
            // Construir mensaje con contexto si existe
            const contextMessage = userContext.originalQuery
                ? `El usuario busca: ${userContext.originalQuery}. Categoría: ${userContext.category}. Respuesta: ${text}. Contexto: ${JSON.stringify(userContext)}`
                : text;

            // Obtener respuesta del servicio de IA
            const { response, products } = await sendMessage(contextMessage, messages);

            const aiMsg = {
                role: 'ai',
                content: response,
                timestamp: new Date(),
                attachments: products.slice(0, 3).map((product, idx) => (
                    <ProductCard
                        key={idx}
                        product={{
                            ...product,
                            id: idx,
                            image: product.image || INITIAL_PRODUCTS[0].image
                        }}
                        onClick={handleProductClick}
                    />
                ))
            };

            setMessages(prev => [...prev, aiMsg]);

            // Limpiar contexto después de la respuesta final
            if (userContext.originalQuery) {
                setUserContext({});
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            addToast('Error al procesar tu mensaje', 'error');
        } finally {
            setIsTyping(false);
        }
    };

    // Manejar selección de opción
    const handleOptionSelect = (option) => {
        setUserContext(prev => ({ ...prev, [option.id]: option.value }));
        handleSendMessage(option.label, true);
    };

    // Manejar saltar pregunta
    const handleSkipOption = () => {
        handleSendMessage('Sin preferencia', true);
    };

    // Mostrar input personalizado
    const handleShowCustomInput = () => {
        setShowCustomInput(true);
        setCurrentOptions(null);
    };

    const handleProfileSave = () => {
        addToast("Preferencias guardadas", "success");
    };

    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const quickSuggestions = ["Mejores auriculares 2024", "iPhone vs Samsung", "Portátil para diseño", "Mejor TV OLED"];

    return (
        <div className={`flex h-screen ${THEME.bg} overflow-hidden font-sans`}>
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 bg-[#151515] border-r border-white/5 flex flex-col justify-between py-6 transition-all duration-300">
                <div className="px-4 lg:px-6 mb-8">
                    <div className="hidden lg:block"><Logo size="text-xl" onClick={() => { }} /></div>
                    <div className="lg:hidden flex justify-center"><Sparkles className="text-[#8c52ff]" /></div>
                </div>

                <nav className="flex-1 px-2 lg:px-4 space-y-2">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id && !showProfile;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setShowProfile(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-[#8c52ff]/10 text-[#8c52ff]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Icon size={20} className={isActive ? 'text-[#8c52ff]' : ''} />
                                <span className="hidden lg:block font-medium text-sm">{tab.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8c52ff] hidden lg:block" />}
                            </button>
                        )
                    })}
                </nav>

                <div className="px-4 lg:px-6 mb-4 hidden lg:block">
                    <div className="bg-[#252525] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-2 text-[#8c52ff] mb-2">
                            <TrendingUp size={16} />
                            <span className="text-xs font-medium">Tu actividad</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{searchCount}</div>
                        <div className="text-xs text-gray-500">búsquedas hoy</div>
                    </div>
                </div>

                <div className="px-2 lg:px-4 space-y-2">
                    <button
                        onClick={() => setShowProfile(true)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${showProfile ? 'bg-[#8c52ff]/10 text-[#8c52ff]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 border border-white/20"></div>
                        <span className="hidden lg:block font-medium text-sm">Mi Perfil</span>
                    </button>

                    <div className="h-px w-full bg-white/5 my-2"></div>

                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-colors">
                        <LogOut size={18} />
                        <span className="hidden lg:block font-medium text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#151515]">
                    <span className="text-white font-bold">KriterIA</span>
                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
                    {/* ASSISTANT VIEW */}
                    {!showProfile && activeTab === 'assistant' && (
                        <div className="max-w-4xl mx-auto h-full flex flex-col">
                            <div className="flex-1 overflow-y-auto scrollbar-hide pb-40">
                                {messages.map((msg, idx) => (
                                    <ChatMessage key={idx} {...msg} />
                                ))}
                                {isTyping && (
                                    <div className="flex gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c52ff] to-purple-600 flex items-center justify-center shadow-lg">
                                            <Sparkles size={18} className="text-white animate-pulse" />
                                        </div>
                                        <div className="bg-[#252525] rounded-2xl rounded-tl-none px-4 py-3 border border-white/5">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-[#8c52ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-[#8c52ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-[#8c52ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {messages.length <= 2 && (
                                <div className="absolute bottom-32 left-4 right-4 lg:left-8 lg:right-8 max-w-4xl mx-auto">
                                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                                        {quickSuggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSendMessage(suggestion)}
                                                className="px-4 py-2 bg-[#252525] hover:bg-[#8c52ff]/20 border border-white/10 hover:border-[#8c52ff]/50 rounded-full text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2"
                                            >
                                                <Search size={14} />
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="absolute bottom-6 left-4 right-4 lg:left-8 lg:right-8 max-w-4xl mx-auto z-20">
                                {/* Opciones interactivas cuando hay pregunta activa */}
                                {currentOptions && !isTyping && (
                                    <div className="mb-3 bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 animate-fade-in">
                                        <div className="grid gap-2 mb-3">
                                            {currentOptions.options?.map((option) => (
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

                                        <div className="flex gap-2 pt-2 border-t border-white/5">
                                            {currentOptions.allowCustom && (
                                                <button
                                                    onClick={handleShowCustomInput}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#8c52ff]/10 border border-white/10 rounded-xl transition-all text-gray-400 hover:text-white"
                                                >
                                                    <Edit3 size={16} />
                                                    <span>Otra opción...</span>
                                                </button>
                                            )}

                                            {currentOptions.skipable && (
                                                <button
                                                    onClick={handleSkipOption}
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
                                {(!currentOptions || showCustomInput) && (
                                    <div className="relative bg-[#252525] border border-white/10 rounded-2xl shadow-2xl p-2 flex items-end gap-2 ring-1 ring-white/5 focus-within:ring-[#8c52ff] transition-all">
                                        <button className="p-3 text-gray-400 hover:text-[#8c52ff] transition-colors rounded-xl hover:bg-[#8c52ff]/10">
                                            <Sparkles size={20} />
                                        </button>
                                        <textarea
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                            placeholder={showCustomInput ? "Escribe tu respuesta..." : "¿Qué producto buscas hoy?"}
                                            className="w-full bg-transparent text-white placeholder-gray-500 text-sm md:text-base focus:outline-none py-3 resize-none max-h-32"
                                            rows={1}
                                        />
                                        <button
                                            onClick={() => handleSendMessage()}
                                            disabled={!inputVal.trim()}
                                            className="p-3 bg-[#8c52ff] hover:bg-[#7a45e6] text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                                        >
                                            <Sparkles size={20} />
                                        </button>
                                    </div>
                                )}
                                <div className="text-center mt-2 text-xs text-gray-600">
                                    KriterIA puede cometer errores. Verifica siempre los precios.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RECOMMENDED VIEW */}
                    {!showProfile && activeTab === 'recommended' && (
                        <div className="max-w-6xl mx-auto animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-2">Recomendados para ti</h2>
                            <p className="text-gray-400 mb-6">Basado en tus búsquedas y preferencias</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {INITIAL_PRODUCTS.map(product => (
                                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RECENT VIEW */}
                    {!showProfile && activeTab === 'recent' && (
                        <div className="max-w-6xl mx-auto animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-6">Vistos recientemente</h2>
                            {recentProducts.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">
                                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Aún no has visto ningún producto</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recentProducts.map(product => (
                                        <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PROFILE VIEW */}
                    {showProfile && (
                        <div className="max-w-2xl mx-auto animate-fade-in">
                            <h2 className="text-2xl font-bold text-white mb-8">Configuración del Perfil</h2>

                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-lg font-medium text-white mb-4">Tiendas preferidas</h3>
                                    <div className="bg-[#252525] border border-white/10 rounded-2xl overflow-hidden">
                                        {[
                                            { id: 'amazon', label: 'Amazon', icon: '📦' },
                                            { id: 'ebay', label: 'eBay', icon: '🔨' },
                                            { id: 'aliexpress', label: 'AliExpress', icon: '🌏' }
                                        ].map(store => (
                                            <div key={store.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{store.icon}</span>
                                                    <span className="text-gray-200">{store.label}</span>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={profileSettings[store.id]}
                                                        onChange={() => setProfileSettings(prev => ({ ...prev, [store.id]: !prev[store.id] }))}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8c52ff]"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-lg font-medium text-white mb-4">Instrucciones personalizadas</h3>
                                    <div className="bg-[#252525] border border-white/10 rounded-2xl p-4">
                                        <textarea
                                            value={profileSettings.instructions}
                                            onChange={(e) => setProfileSettings(prev => ({ ...prev, instructions: e.target.value }))}
                                            className="w-full bg-transparent text-gray-300 text-sm focus:outline-none resize-none h-32"
                                            placeholder="Ej: Prefiero productos con garantía..."
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">La IA tendrá en cuenta estas preferencias en sus recomendaciones.</p>
                                </section>

                                <div className="flex justify-end">
                                    <button onClick={handleProfileSave} className="bg-[#8c52ff] hover:bg-[#7a45e6] text-white px-6 py-2 rounded-xl font-medium transition-all hover:scale-105">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <ProductSlideOver
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onBuy={handleBuy}
            />
        </div>
    );
};

export default Dashboard;
