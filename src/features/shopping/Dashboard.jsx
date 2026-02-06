import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, ShoppingBag, LogOut, TrendingUp, Search, ChevronRight, Edit3, SkipForward, ChevronDown, Zap, Cpu, Send, Mic, BarChart3, Clock, Star, Crown, Plus, CreditCard, ArrowUpRight, History, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { THEME } from '../../constants/theme';
import { INITIAL_PRODUCTS } from '../../data/products';
import { STORE_INTEGRATIONS, STORE_CATEGORIES } from '../../data/storeIntegrations';
import { sendMessage, sendPromptToModel, checkServerHealth } from '../../services/api';
import Logo from '../../components/common/Logo';
import ChatMessage from '../../components/ui/ChatMessage';
import ProductCard from '../../components/ui/ProductCard';
import ProductSlideOver from '../../components/ui/ProductSlideOver';
import BackendProductCard, { BackendProductList } from '../../components/ui/BackendProductCard';

// Modelos de IA disponibles
const AI_MODELS = [
    { id: 'openai/gpt-oss-120b', name: 'High', icon: Cpu, description: 'Más preciso y detallado' },
    { id: 'openai/gpt-oss-20b', name: 'Flash', icon: Zap, description: 'Rápido y eficiente' },
];

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

    // Estado para selector de modelo
    const [selectedModel, setSelectedModel] = useState('openai/gpt-oss-120b');
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const modelDropdownRef = useRef(null);

    // Estado inicial de tiendas favoritas - Solo Amazon activado por defecto
    const [favoriteStores, setFavoriteStores] = useState(['amazon']);
    const [profileSettings, setProfileSettings] = useState({
        instructions: "Prefiero productos con envío Prime y garantía de 2 años.",
        currentPlan: 'premium'
    });

    // Estado para el historial de conversaciones
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([
        {
            id: 1,
            title: 'Búsqueda de auriculares gaming',
            date: new Date(Date.now() - 86400000),
            preview: 'Quiero unos auriculares para gaming con...',
            messageCount: 8
        },
        {
            id: 2,
            title: 'Comparativa iPhone vs Samsung',
            date: new Date(Date.now() - 172800000),
            preview: '¿Cuál es mejor el iPhone 15 o Samsung S24?',
            messageCount: 12
        },
        {
            id: 3,
            title: 'Portátil para diseño gráfico',
            date: new Date(Date.now() - 259200000),
            preview: 'Busco un portátil potente para diseño...',
            messageCount: 6
        },
        {
            id: 4,
            title: 'Mejor televisor OLED 2024',
            date: new Date(Date.now() - 345600000),
            preview: '¿Cuál es el mejor televisor OLED de 55?',
            messageCount: 10
        }
    ]);

    // Función para crear nueva conversación
    const handleNewConversation = () => {
        // Guardar conversación actual en historial si hay mensajes
        if (messages.length > 1) {
            const newHistoryItem = {
                id: Date.now(),
                title: messages[1]?.content?.substring(0, 40) + '...' || 'Nueva conversación',
                date: new Date(),
                preview: messages[1]?.content?.substring(0, 50) + '...' || '',
                messageCount: messages.length
            };
            setConversationHistory(prev => [newHistoryItem, ...prev]);
        }

        setMessages([{
            role: 'ai',
            content: '¡Hola! Soy **KriterIA**, tu asistente de compras inteligente. 🛒\n\n¿Qué producto estás buscando hoy?',
            timestamp: new Date()
        }]);
        setUserContext({});
        setCurrentOptions(null);
        setShowCustomInput(false);
        setActiveTab('assistant');
        setShowProfile(false);
        addToast('Nueva conversación iniciada', 'success');
    };

    // Cargar conversación del historial
    const loadConversation = (conversationId) => {
        addToast('Cargando conversación...', 'default');
        setShowHistoryModal(false);
        // Aquí se cargaría la conversación real desde el backend
    };

    // Eliminar conversación del historial
    const deleteConversation = (e, conversationId) => {
        e.stopPropagation();
        setConversationHistory(prev => prev.filter(c => c.id !== conversationId));
        addToast('Conversación eliminada', 'success');
    };

    // Toggle tienda favorita
    const toggleFavoriteStore = (storeId) => {
        setFavoriteStores(prev =>
            prev.includes(storeId)
                ? prev.filter(id => id !== storeId)
                : [...prev, storeId]
        );
    };

    useEffect(() => {
        setMessages([{
            role: 'ai',
            content: '¡Hola! Soy **KriterIA**, tu asistente de compras inteligente. 🛒\n\nPuedo ayudarte a encontrar los mejores productos y comparar precios en tiendas como Amazon, MediaMarkt, El Corte Inglés, PcComponentes, Fnac, Worten y muchas más.\n\n**¿Qué producto estás buscando hoy?**',
            timestamp: new Date()
        }]);

        // Función para verificar conexión
        const checkConnection = async () => {
            // Primero verificar si hay conexión a internet
            if (!navigator.onLine) {
                setAiConnected(false);
                return;
            }

            // Si hay internet, verificar conexión con el servidor de IA
            try {
                const connected = await checkServerHealth();
                setAiConnected(connected);
                if (connected) {
                    addToast('IA conectada', 'success');
                }
            } catch {
                // Si falla el servidor pero hay internet, aún mostrar conectado
                setAiConnected(navigator.onLine);
            }
        };

        // Verificar conexión inicial
        checkConnection();

        // Listeners para detectar cambios de conexión a internet
        const handleOnline = () => {
            setAiConnected(true);
            addToast('Conexión restaurada - IA conectada', 'success');
        };

        const handleOffline = () => {
            setAiConnected(false);
            addToast('Sin conexión a internet', 'error');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Verificar conexión cada 60 segundos
        const connectionInterval = setInterval(() => {
            if (navigator.onLine) {
                checkServerHealth().then(connected => {
                    setAiConnected(connected);
                }).catch(() => {
                    setAiConnected(navigator.onLine);
                });
            } else {
                setAiConnected(false);
            }
        }, 60000);

        // Cleanup
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(connectionInterval);
        };
    }, []);

    // Cerrar dropdown del modelo al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
                setIsModelDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

            // Log del modelo seleccionado para debugging
            const currentModel = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];
            console.log(`📤 Enviando prompt al modelo: ${currentModel.name} (${selectedModel})`);

            // Enviar al backend con el modelo seleccionado
            const backendProducts = await sendPromptToModel(contextMessage, selectedModel);

            // Verificar si recibimos productos del backend
            if (backendProducts && Array.isArray(backendProducts) && backendProducts.length > 0) {
                console.log(`📦 Recibidos ${backendProducts.length} productos del backend`);

                // Crear mensaje de IA con las tarjetas de productos del backend
                const aiMsg = {
                    role: 'ai',
                    content: `He encontrado **${backendProducts.length} productos** que coinciden con tu búsqueda "${text}":\n\n*Modelo utilizado: ${currentModel.name}*`,
                    timestamp: new Date(),
                    backendProducts: backendProducts
                };

                setMessages(prev => [...prev, aiMsg]);
            } else {
                // No se encontraron productos
                console.log('⚠️ No se recibieron productos');
                const aiMsg = {
                    role: 'ai',
                    content: `No encontré productos para "${text}". Intenta con otra búsqueda más específica.`,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMsg]);
            }

            // Limpiar contexto después de la respuesta final
            if (userContext.originalQuery) {
                setUserContext({});
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);

            // Mostrar mensaje de error real - sin datos de demostración
            const aiMsg = {
                role: 'ai',
                content: `⚠️ **Error de conexión** - No se pudo conectar con el servidor.\n\nPor favor, verifica que el backend esté disponible.`,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
            addToast('Error: No se pudo conectar con el backend', 'error');
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
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#8c52ff]/20 via-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-[#8c52ff]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            {/* Premium Sidebar */}
            <aside className="w-20 lg:w-72 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] border-r border-white/5 flex flex-col py-6 transition-all duration-300 relative z-10">
                {/* Logo Section */}
                <div className="px-4 lg:px-6 mb-4">
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c52ff] to-purple-600 flex items-center justify-center shadow-lg shadow-[#8c52ff]/30">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">KriterIA</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Shopping AI</div>
                        </div>
                    </div>
                    <div className="lg:hidden flex justify-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8c52ff] to-purple-600 flex items-center justify-center">
                            <Sparkles size={18} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* New Conversation Button */}
                <div className="px-3 lg:px-4 mb-2">
                    <motion.button
                        onClick={handleNewConversation}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center lg:justify-start gap-2 px-4 py-3 bg-gradient-to-r from-[#8c52ff] to-purple-600 hover:from-[#7a45e6] hover:to-purple-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-[#8c52ff]/20"
                    >
                        <Plus size={18} />
                        <span className="hidden lg:block">Nueva Conversación</span>
                    </motion.button>
                </div>

                {/* History Button */}
                <div className="px-3 lg:px-4 mb-6">
                    <motion.button
                        onClick={() => setShowHistoryModal(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center lg:justify-start gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl font-medium transition-all border border-white/10"
                    >
                        <History size={18} />
                        <span className="hidden lg:block">Ver Historial</span>
                        <span className="hidden lg:flex ml-auto bg-[#8c52ff]/20 text-[#8c52ff] px-2 py-0.5 rounded-full text-xs">
                            {conversationHistory.length}
                        </span>
                    </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 lg:px-4 space-y-1">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id && !showProfile;
                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setShowProfile(false); }}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-[#8c52ff]/20 to-purple-600/10 text-white shadow-lg shadow-[#8c52ff]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8c52ff] to-purple-600 rounded-r-full" />}
                                <div className={`p-2 rounded-lg transition-all ${isActive ? 'bg-[#8c52ff]/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                    <Icon size={18} className={isActive ? 'text-[#8c52ff]' : ''} />
                                </div>
                                <span className="hidden lg:block font-medium text-sm">{tab.label}</span>
                                {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-[#8c52ff] hidden lg:block animate-pulse" />}
                            </motion.button>
                        )
                    })}
                </nav>

                {/* Activity Stats Card */}
                <div className="px-4 lg:px-5 mb-4 hidden lg:block">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-5 border border-white/10">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[#8c52ff]/20 rounded-full blur-2xl" />
                        <div className="flex items-center gap-2 text-[#8c52ff] mb-3">
                            <BarChart3 size={18} />
                            <span className="text-xs font-semibold uppercase tracking-wider">Tu Actividad</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{searchCount}</div>
                        <div className="text-xs text-gray-500">búsquedas hoy</div>
                        <div className="mt-4 flex gap-2">
                            <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                                <Clock size={14} className="mx-auto text-gray-400 mb-1" />
                                <div className="text-xs text-gray-400">24h</div>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                                <Star size={14} className="mx-auto text-yellow-400 mb-1" />
                                <div className="text-xs text-gray-400">Pro</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Section */}
                <div className="px-3 lg:px-4 space-y-2">
                    <motion.button
                        onClick={() => setShowProfile(true)}
                        whileHover={{ x: 4 }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${showProfile ? 'bg-gradient-to-r from-[#8c52ff]/20 to-purple-600/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8c52ff] via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                            U
                        </div>
                        <div className="hidden lg:block text-left">
                            <div className="font-medium text-sm">Usuario</div>
                            <div className="text-xs text-gray-500">Plan Premium</div>
                        </div>
                        <Crown size={14} className="hidden lg:block ml-auto text-yellow-400" />
                    </motion.button>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />

                    <motion.button
                        onClick={onLogout}
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={18} />
                        <span className="hidden lg:block font-medium text-sm">Cerrar Sesión</span>
                    </motion.button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Premium Header - Desktop */}
                <header className="hidden lg:flex h-16 border-b border-white/5 items-center justify-between px-8 bg-gradient-to-r from-[#0d0d0d]/80 to-transparent backdrop-blur-xl relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${aiConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                            <span className="text-sm text-gray-400">
                                {aiConnected ? 'IA Conectada' : 'IA Desconectada'}
                            </span>
                        </div>
                        <div className="h-5 w-px bg-white/10" />
                        <div className="flex items-center gap-2 text-gray-400">
                            <Sparkles size={14} className="text-[#8c52ff]" />
                            <span className="text-sm">{messages.length} mensajes</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Tiendas activas: {favoriteStores.length}</span>
                    </div>
                </header>

                {/* Mobile Header */}
                <header className="lg:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#0d0d0d]/90 backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8c52ff] to-purple-600 flex items-center justify-center">
                            <Sparkles size={14} className="text-white" />
                        </div>
                        <span className="text-white font-bold">KriterIA</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8c52ff] to-purple-500" />
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
                                    <p className="text-center text-gray-500 text-sm mb-4">✨ Prueba estas sugerencias populares</p>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {quickSuggestions.map((suggestion, idx) => (
                                            <motion.button
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSendMessage(suggestion)}
                                                className="px-5 py-2.5 bg-gradient-to-br from-white/10 to-white/5 hover:from-[#8c52ff]/30 hover:to-purple-600/20 border border-white/10 hover:border-[#8c52ff]/50 rounded-2xl text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2.5 backdrop-blur-sm shadow-lg hover:shadow-[#8c52ff]/20"
                                            >
                                                <Search size={14} className="text-[#8c52ff]" />
                                                {suggestion}
                                            </motion.button>
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

                                {/* Input de texto con selector de modelo - Estilo Slim */}
                                {(!currentOptions || showCustomInput) && (
                                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-xl shadow-xl transition-all focus-within:border-[#8c52ff]/50 focus-within:shadow-[0_0_20px_rgba(140,82,255,0.15)] backdrop-blur-xl">
                                        {/* Área del textarea */}
                                        <div className="px-4 py-2.5 relative flex items-center gap-3">
                                            <Sparkles size={18} className="text-[#8c52ff] flex-shrink-0" />
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
                                                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none resize-none min-h-[24px] max-h-24 leading-relaxed"
                                                rows={1}
                                            />

                                            {/* Selector de modelo compacto */}
                                            <div className="relative flex-shrink-0" ref={modelDropdownRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                                    className="flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all text-xs font-medium"
                                                >
                                                    {(() => {
                                                        const currentModel = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];
                                                        return currentModel.name;
                                                    })()}
                                                    <ChevronDown
                                                        size={12}
                                                        className={`transition-transform duration-200 ${isModelDropdownOpen ? 'rotate-180' : ''}`}
                                                    />
                                                </button>

                                                {/* Dropdown de modelos */}
                                                <AnimatePresence>
                                                    {isModelDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                            transition={{ duration: 0.15, ease: 'easeOut' }}
                                                            className="absolute bottom-full right-0 mb-2 w-48 bg-[#2a2a2a] border border-white/10 rounded-xl shadow-2xl z-[100] overflow-hidden"
                                                        >
                                                            <div className="p-1">
                                                                {AI_MODELS.map((model) => {
                                                                    const Icon = model.icon;
                                                                    const isSelected = selectedModel === model.id;
                                                                    return (
                                                                        <button
                                                                            key={model.id}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setSelectedModel(model.id);
                                                                                setIsModelDropdownOpen(false);
                                                                            }}
                                                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${isSelected
                                                                                ? 'bg-[#8c52ff]/20 text-white'
                                                                                : 'hover:bg-white/5 text-gray-300'
                                                                                }`}
                                                                        >
                                                                            <Icon size={14} className={isSelected ? 'text-[#8c52ff]' : 'text-gray-400'} />
                                                                            <span className="text-sm">{model.name}</span>
                                                                            {isSelected && <span className="ml-auto text-[#8c52ff]">✓</span>}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Separador */}
                                            <div className="w-px h-5 bg-white/10" />

                                            {/* Botón de enviar */}
                                            <button
                                                onClick={() => handleSendMessage()}
                                                disabled={!inputVal.trim()}
                                                className="p-2 bg-[#8c52ff] hover:bg-[#7a45e6] text-white rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                                            >
                                                <Send size={16} />
                                            </button>
                                        </div>
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-6xl mx-auto"
                        >
                            {/* Premium Header */}
                            <div className="relative overflow-hidden bg-gradient-to-r from-[#8c52ff]/20 via-purple-600/10 to-transparent rounded-3xl p-8 mb-8 border border-white/10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8c52ff]/20 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-[#8c52ff]/20 rounded-xl">
                                            <Sparkles className="text-[#8c52ff]" size={24} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Recomendados para ti</h2>
                                    </div>
                                    <p className="text-gray-400 ml-12">Productos seleccionados con IA basados en tus búsquedas y preferencias</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {INITIAL_PRODUCTS.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <ProductCard product={product} onClick={handleProductClick} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* RECENT VIEW */}
                    {!showProfile && activeTab === 'recent' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-6xl mx-auto"
                        >
                            {/* Premium Header */}
                            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-[#8c52ff]/10 to-transparent rounded-3xl p-8 mb-8 border border-white/10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-500/20 rounded-xl">
                                            <Clock className="text-blue-400" size={24} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Vistos recientemente</h2>
                                    </div>
                                    <p className="text-gray-400 ml-12">Tu historial de productos visitados</p>
                                </div>
                            </div>

                            {recentProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                                        <ShoppingBag size={40} className="text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Sin productos aún</h3>
                                    <p className="text-gray-500">Explora productos y aparecerán aquí</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recentProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <ProductCard product={product} onClick={handleProductClick} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* PROFILE VIEW */}
                    {showProfile && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto"
                        >
                            {/* Profile Header */}
                            <div className="relative overflow-hidden bg-gradient-to-r from-[#8c52ff]/30 via-purple-600/20 to-pink-500/10 rounded-3xl p-8 mb-8 border border-white/10">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[#8c52ff]/20 rounded-full blur-3xl" />
                                <div className="relative z-10 flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8c52ff] via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-[#8c52ff]/30">
                                        U
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-1">Mi Perfil</h2>
                                        <div className="flex items-center gap-2">
                                            <Crown size={16} className="text-yellow-400" />
                                            <span className="text-yellow-400 text-sm font-medium">Plan Premium</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Tiendas preferidas */}
                                <motion.section
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#8c52ff]/20 rounded-xl">
                                                <ShoppingBag size={20} className="text-[#8c52ff]" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">Tiendas preferidas</h3>
                                                <p className="text-xs text-gray-500">{favoriteStores.length} tiendas seleccionadas</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Store Categories */}
                                    {STORE_CATEGORIES.filter(cat => cat.id !== 'all').map((category) => {
                                        const categoryStores = STORE_INTEGRATIONS.filter(s => s.category === category.label);
                                        if (categoryStores.length === 0) return null;

                                        return (
                                            <div key={category.id} className="mb-6 last:mb-0">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-base">{category.icon}</span>
                                                    <span className="text-sm font-medium text-gray-400">{category.label}</span>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                    {categoryStores.map(store => {
                                                        const isActive = favoriteStores.includes(store.id);
                                                        return (
                                                            <button
                                                                key={store.id}
                                                                onClick={() => toggleFavoriteStore(store.id)}
                                                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive
                                                                    ? 'bg-[#8c52ff]/20 border border-[#8c52ff]/50 ring-1 ring-[#8c52ff]/30'
                                                                    : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10'
                                                                    }`}
                                                            >
                                                                <div
                                                                    className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
                                                                    style={{ backgroundColor: store.color || '#6B7280' }}
                                                                >
                                                                    <span className="text-xs font-bold text-white drop-shadow-sm">
                                                                        {store.name.substring(0, 2).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1 text-left min-w-0">
                                                                    <p className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                                        {store.name}
                                                                    </p>
                                                                </div>
                                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-[#8c52ff]' : 'bg-white/10'
                                                                    }`}>
                                                                    {isActive && <span className="text-white text-xs">✓</span>}
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.section>

                                {/* Instrucciones personalizadas */}
                                <motion.section
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-6"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2 bg-blue-500/20 rounded-xl">
                                            <Edit3 size={20} className="text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">Instrucciones personalizadas</h3>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 focus-within:border-[#8c52ff]/50 transition-all">
                                        <textarea
                                            value={profileSettings.instructions}
                                            onChange={(e) => setProfileSettings(prev => ({ ...prev, instructions: e.target.value }))}
                                            className="w-full bg-transparent text-gray-300 text-sm focus:outline-none resize-none h-32"
                                            placeholder="Ej: Prefiero productos con garantía, envío gratis, marcas premium..."
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                                        <Sparkles size={12} className="text-[#8c52ff]" />
                                        La IA tendrá en cuenta estas preferencias en sus recomendaciones.
                                    </p>
                                </motion.section>

                                {/* Save Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex justify-end pt-2"
                                >
                                    <button
                                        onClick={handleProfileSave}
                                        className="bg-gradient-to-r from-[#8c52ff] to-purple-600 hover:from-[#7a45e6] hover:to-purple-500 text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 shadow-lg shadow-[#8c52ff]/30 flex items-center gap-2"
                                    >
                                        <span>Guardar Cambios</span>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <ProductSlideOver
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onBuy={handleBuy}
            />

            {/* History Modal */}
            <AnimatePresence>
                {showHistoryModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowHistoryModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#8c52ff]/20 rounded-xl">
                                        <History size={24} className="text-[#8c52ff]" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Historial de Conversaciones</h2>
                                        <p className="text-sm text-gray-500">{conversationHistory.length} conversaciones guardadas</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowHistoryModal(false)}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Conversation List */}
                            <div className="p-4 max-h-[60vh] overflow-y-auto">
                                {conversationHistory.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <History size={32} className="text-gray-600" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-400 mb-2">Sin conversaciones</h3>
                                        <p className="text-sm text-gray-500">Tus conversaciones aparecerán aquí</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {conversationHistory.map((conversation, idx) => (
                                            <motion.button
                                                key={conversation.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => loadConversation(conversation.id)}
                                                className="w-full p-4 bg-white/5 hover:bg-[#8c52ff]/10 border border-white/5 hover:border-[#8c52ff]/30 rounded-2xl transition-all text-left group"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-white truncate group-hover:text-[#8c52ff] transition-colors">
                                                            {conversation.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 truncate mt-1">
                                                            {conversation.preview}
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Clock size={12} />
                                                                {conversation.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                                            </span>
                                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                <MessageSquare size={12} />
                                                                {conversation.messageCount} mensajes
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => deleteConversation(e, conversation.id)}
                                                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-white/10">
                                <button
                                    onClick={() => setShowHistoryModal(false)}
                                    className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl font-medium transition-all"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
