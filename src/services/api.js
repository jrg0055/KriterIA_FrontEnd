/**
 * API Service - KriterIA Frontend
 * Stub para conectar con el backend de los compañeros
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Helper para hacer peticiones HTTP
 */
async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
    }

    return response.json();
}

// ============================================
// AUTH - Endpoints de autenticación
// ============================================

export async function login(email, password) {
    // TODO: Implementar cuando el backend esté listo
    return fetchAPI('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export async function register(userData) {
    // TODO: Implementar cuando el backend esté listo
    return fetchAPI('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

export async function logout() {
    // TODO: Implementar cuando el backend esté listo
    return fetchAPI('/api/auth/logout', { method: 'POST' });
}

// ============================================
// CHAT - Endpoints del asistente IA
// ============================================

export async function sendMessage(message, history = []) {
    // TODO: Conectar con el backend de IA de los compañeros
    return fetchAPI('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history }),
    });
}

export async function sendInteractiveMessage(message, conversationId, products = []) {
    // TODO: Conectar con el backend de IA de los compañeros
    return fetchAPI('/api/interactive-chat', {
        method: 'POST',
        body: JSON.stringify({ message, conversationId, products }),
    });
}

// ============================================
// PRODUCTS - Endpoints de productos
// ============================================

export async function getProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return fetchAPI(`/api/products?${params}`);
}

export async function getProductById(id) {
    return fetchAPI(`/api/products/${id}`);
}

export async function searchProducts(query) {
    return fetchAPI(`/api/products/search?q=${encodeURIComponent(query)}`);
}

// ============================================
// SHOPPING - Endpoints del carrito
// ============================================

export async function getCart() {
    return fetchAPI('/api/cart');
}

export async function addToCart(productId, quantity = 1) {
    return fetchAPI('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    });
}

export async function removeFromCart(productId) {
    return fetchAPI(`/api/cart/remove/${productId}`, { method: 'DELETE' });
}

// ============================================
// HEALTH - Verificar conexión con backend
// ============================================

export async function checkServerHealth() {
    try {
        const response = await fetch(`${API_URL}/api/health`);
        return response.ok;
    } catch {
        return false;
    }
}

export async function getHello() {
    try {
        const response = await fetch(`${API_URL}/api/hello`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        throw error;
    }
}

export default {
    login,
    register,
    logout,
    sendMessage,
    sendInteractiveMessage,
    getProducts,
    getProductById,
    searchProducts,
    getCart,
    addToCart,
    removeFromCart,
    checkServerHealth,
    getHello,
};
