/**
 * Store Integrations Data
 * Logos, metadata y configuración para todas las tiendas soportadas
 */

export const STORE_INTEGRATIONS = [
    // Tecnología
    {
        id: 'amazon',
        name: 'Amazon',
        logo: '/assets/stores/amazon.svg', // TODO: Añadir imágenes reales
        category: 'Tecnología',
        description: 'Líder mundial en e-commerce con millones de productos',
        scopes: ['product:read', 'price:check'],
        status: 'available',
        requiresAuth: false,
        apiType: 'Product Advertising API',
        setupInstructions: 'Requiere Amazon Associates account',
        documentation: 'https://webservices.amazon.com/paapi5/documentation/'
    },
    {
        id: 'pccomponentes',
        name: 'PcComponentes',
        logo: '/assets/stores/pccomponentes.svg',
        category: 'Tecnología',
        description: 'Especialistas en informática y tecnología en España',
        scopes: ['product:read'],
        status: 'available',
        requiresAuth: false,
        apiType: 'Web Scraping',
        setupInstructions: 'No API pública disponible'
    },
    {
        id: 'mediamarkt',
        name: 'MediaMarkt',
        logo: '/assets/stores/mediamarkt.svg',
        category: 'Tecnología',
        description: 'Cadena de electrónica y electrodomésticos',
        scopes: ['product:read', 'price:check'],
        status: 'available',
        requiresAuth: false,
        apiType: 'Web Scraping'
    },
    {
        id: 'fnac',
        name: 'Fnac',
        logo: '/assets/stores/fnac.svg',
        category: 'Tecnología',
        description: 'Libros, tecnología y entretenimiento',
        scopes: ['product:read'],
        status: 'available',
        requiresAuth: false,
        apiType: 'Web Scraping'
    },
    {
        id: 'worten',
        name: 'Worten',
        logo: '/assets/stores/worten.svg',
        category: 'Tecnología',
        description: 'Electrónica y electrodomésticos',
        scopes: ['product:read'],
        status: 'available',
        requiresAuth: false,
        apiType: 'Web Scraping'
    },

    // Moda
    {
        id: 'zalando',
        name: 'Zalando',
        logo: '/assets/stores/zalando.svg',
        category: 'Moda',
        description: 'Moda online con miles de marcas',
        scopes: ['product:read', 'price:check'],
        status: 'planned',
        requiresAuth: false,
        apiType: 'Partner API',
        documentation: 'https://api.zalando.com/'
    },
    {
        id: 'zara',
        name: 'Zara',
        logo: '/assets/stores/zara.svg',
        category: 'Moda',
        description: 'Moda rápida de Inditex',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false,
        apiType: 'Web Scraping'
    },
    {
        id: 'hm',
        name: 'H&M',
        logo: '/assets/stores/hm.svg',
        category: 'Moda',
        description: 'Moda asequible para toda la familia',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false,
        apiType: 'Web Scraping'
    },
    {
        id: 'mango',
        name: 'Mango',
        logo: '/assets/stores/mango.svg',
        category: 'Moda',
        description: 'Moda contemporánea española',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },

    // Hogar
    {
        id: 'ikea',
        name: 'IKEA',
        logo: '/assets/stores/ikea.svg',
        category: 'Hogar',
        description: 'Muebles y decoración para el hogar',
        scopes: ['product:read', 'stock:check'],
        status: 'planned',
        requiresAuth: false,
        apiType: 'Web Scraping'
    },
    {
        id: 'leroymerlin',
        name: 'Leroy Merlin',
        logo: '/assets/stores/leroymerlin.svg',
        category: 'Hogar',
        description: 'Bricolaje, construcción y jardín',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },

    // Deportes
    {
        id: 'decathlon',
        name: 'Decathlon',
        logo: '/assets/stores/decathlon.svg',
        category: 'Deportes',
        description: 'Artículos deportivos para todos',
        scopes: ['product:read', 'stock:check'],
        status: 'planned',
        requiresAuth: false
    },
    {
        id: 'nike',
        name: 'Nike',
        logo: '/assets/stores/nike.svg',
        category: 'Deportes',
        description: 'Ropa y calzado deportivo premium',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },
    {
        id: 'adidas',
        name: 'Adidas',
        logo: '/assets/stores/adidas.svg',
        category: 'Deportes',
        description: 'Marca deportiva líder mundial',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },

    // Belleza
    {
        id: 'sephora',
        name: 'Sephora',
        logo: '/assets/stores/sephora.svg',
        category: 'Belleza',
        description: 'Cosméticos y productos de belleza',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },
    {
        id: 'primor',
        name: 'Primor',
        logo: '/assets/stores/primor.svg',
        category: 'Belleza',
        description: 'Perfumería y cosmética española',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },

    // Mascotas
    {
        id: 'tiendanimal',
        name: 'Tiendanimal',
        logo: '/assets/stores/tiendanimal.svg',
        category: 'Mascotas',
        description: 'Todo para tu mascota',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    },
    {
        id: 'kiwoko',
        name: 'Kiwoko',
        logo: '/assets/stores/kiwoko.svg',
        category: 'Mascotas',
        description: 'Tienda especializada en mascotas',
        scopes: ['product:read'],
        status: 'planned',
        requiresAuth: false
    }
];

export const STORE_CATEGORIES = [
    { id: 'all', label: 'Todas', icon: '🏪' },
    { id: 'Tecnología', label: 'Tecnología', icon: '💻' },
    { id: 'Moda', label: 'Moda', icon: '👕' },
    { id: 'Hogar', label: 'Hogar', icon: '🏠' },
    { id: 'Deportes', label: 'Deportes', icon: '⚽' },
    { id: 'Belleza', label: 'Belleza', icon: '💄' },
    { id: 'Mascotas', label: 'Mascotas', icon: '🐕' }
];

export const getStoresByCategory = (category) => {
    if (category === 'all') return STORE_INTEGRATIONS;
    return STORE_INTEGRATIONS.filter(store => store.category === category);
};

export const getStoreById = (id) => {
    return STORE_INTEGRATIONS.find(store => store.id === id);
};
