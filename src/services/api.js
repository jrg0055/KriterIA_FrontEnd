/**
 * API Service - KriterIA Frontend
 * Conexión real con el backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Helper para obtener el token de autenticación
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Helper para hacer peticiones HTTP
 */
async function fetchAPI(endpoint, options = {}) {
    const token = getAuthToken();
    
    const { headers: optHeaders, ...restOptions } = options;
    
    const headers = {
        'Content-Type': 'application/json',
        ...optHeaders,
    };
    
    // Añadir token si existe
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,
        headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.message || data.error || `Error del servidor: ${response.status}`;
        throw new Error(errorMessage);
    }

    return data;
}

// ============================================
// AUTH - Endpoints de autenticación
// ============================================

export async function login(email, password) {
    return fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export async function register(userData) {
    return fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

export async function logout() {
    const result = await fetchAPI('/auth/logout', { method: 'POST' });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return result;
}

// ============================================
// CHAT - Endpoints del asistente IA
// ============================================

/**
 * Envía un mensaje al asistente IA (usa /search internamente)
 */
export async function sendMessage(message, history = []) {
    return fetchAPI('/search', {
        method: 'POST',
        body: JSON.stringify({ prompt: message, model: 'openai/gpt-oss-120b' }),
    });
}

/**
 * Envía un mensaje interactivo al asistente IA (usa /search internamente)
 */
export async function sendInteractiveMessage(message, conversationId, products = []) {
    return fetchAPI('/search', {
        method: 'POST',
        body: JSON.stringify({ prompt: message, model: 'openai/gpt-oss-120b' }),
    });
}

/**
 * Envía un prompt al modelo de IA seleccionado y recibe recomendaciones de productos
 * @param {string} prompt - El mensaje/consulta del usuario
 * @param {string} model - El modelo de IA a utilizar (ej: 'gpt-4', 'gpt-3.5-turbo', 'claude')
 * @returns {Promise<Array>} - Array de productos recomendados
 */
export async function sendPromptToModel(prompt, model = 'openai/gpt-oss-120b') {
    console.log(`🤖 sendPromptToModel → modelo: ${model}`);
    return fetchAPI('/search', {
        method: 'POST',
        body: JSON.stringify({ prompt, model }),
    });
}

// ============================================
// PRODUCTS - Endpoints de productos
// ============================================

export async function getProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return fetchAPI(`/products?${params}`);
}

export async function getProductById(id) {
    return fetchAPI(`/products/${id}`);
}

export async function searchProducts(query) {
    return fetchAPI(`/products/search?q=${encodeURIComponent(query)}`);
}

// ============================================
// SHOPPING - Endpoints del carrito
// ============================================

export async function getCart() {
    return fetchAPI('/cart');
}

export async function addToCart(productId, quantity = 1) {
    return fetchAPI('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    });
}

export async function removeFromCart(productId) {
    return fetchAPI(`/cart/remove/${productId}`, { method: 'DELETE' });
}

// ============================================
// HEALTH - Verificar conexión con backend
// ============================================

export async function checkServerHealth() {
    try {
        const response = await fetch(`${API_URL}/`, { signal: AbortSignal.timeout(5000) });
        if (!response.ok) return false;
        const data = await response.json().catch(() => null);
        return data?.success === true;
    } catch {
        return false;
    }
}

export async function getHello() {
    try {
        const response = await fetch(`${API_URL}/`);
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
    sendPromptToModel,
    getProducts,
    getProductById,
    searchProducts,
    getCart,
    addToCart,
    removeFromCart,
    checkServerHealth,
    getHello,
};
