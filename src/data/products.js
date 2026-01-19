import productHeadphones from '../assets/product_headphones.png';
import productLaptop from '../assets/product_laptop.png';
import productSneakers from '../assets/product_sneakers.png';
import productConsole from '../assets/product_console.png';
import productCoffee from '../assets/product_coffee.png';
import productIphone from '../assets/product_iphone.png';
import productSamsung from '../assets/product_samsung.png';
import productTv from '../assets/product_tv.png';
import productWatch from '../assets/product_watch.png';
import productDrone from '../assets/product_drone.png';

export const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: "Sony WH-1000XM5",
        price: "349.00 €",
        category: "audio",
        image: productHeadphones,
        rating: 4.8,
        specs: ["Cancelación de ruido líder", "30h batería", "Audio Hi-Res"],
        stores: [
            { name: "Amazon", price: "349.00 €", url: "https://www.amazon.es/s?k=sony+wh-1000xm5" },
            { name: "PcComponentes", price: "349.00 €", url: "https://www.pccomponentes.com/buscar/?query=sony+wh-1000xm5" },
            { name: "MediaMarkt", price: "355.00 €", url: "https://www.mediamarkt.es/es/search.html?query=sony%20wh-1000xm5" },
            { name: "Fnac", price: "355.00 €", url: "https://www.fnac.es/SearchResult/ResultList.aspx?Search=sony+wh-1000xm5" },
            { name: "El Corte Inglés", price: "359.00 €", url: "https://www.elcorteingles.es/search/?s=sony+wh-1000xm5" },
            { name: "Worten", price: "365.00 €", url: "https://www.worten.es/search?query=sony+wh-1000xm5" }
        ],
        keywords: ["auriculares", "headphones", "sony", "bluetooth", "wireless", "cancelacion ruido", "noise cancelling"]
    },
    {
        id: 2,
        name: "MacBook Air M3",
        price: "1.299 €",
        category: "tech",
        image: productLaptop,
        rating: 4.9,
        specs: ["Chip M3", "13.6 pulgadas", "8GB RAM", "256GB SSD", "18h batería"],
        stores: [
            { name: "Amazon", price: "1.249 €", url: "https://www.amazon.es/s?k=macbook+air+m3" },
            { name: "PcComponentes", price: "1.259 €", url: "https://www.pccomponentes.com/buscar/?query=macbook+air+m3" },
            { name: "MediaMarkt", price: "1.279 €", url: "https://www.mediamarkt.es/es/search.html?query=macbook%20air%20m3" },
            { name: "Fnac", price: "1.289 €", url: "https://www.fnac.es/SearchResult/ResultList.aspx?Search=macbook+air+m3" },
            { name: "Apple", price: "1.299 €", url: "https://www.apple.com/es/shop/buy-mac/macbook-air" },
            { name: "El Corte Inglés", price: "1.299 €", url: "https://www.elcorteingles.es/search/?s=macbook+air+m3" }
        ],
        keywords: ["macbook", "mac", "apple", "portatil", "laptop", "ordenador", "computer", "diseño", "design"]
    },
    {
        id: 3,
        name: "Nike Air Force 1",
        price: "119.99 €",
        category: "fashion",
        image: productSneakers,
        rating: 4.5,
        specs: ["Cuero premium", "Suela Air", "Diseño Clásico"],
        stores: [
            { name: "Nike", price: "119.99 €", url: "https://www.nike.com/es/w/air-force-1-shoes-5sj3yzy7ok" },
            { name: "Zalando", price: "115.00 €", url: "https://www.zalando.es/nike-sportswear-air-force-1/" },
            { name: "JD Sports", price: "119.99 €", url: "https://www.jdsports.es/search/nike+air+force+1/" }
        ],
        keywords: ["zapatillas", "nike", "shoes", "sneakers", "deportivas", "air force", "calzado"]
    },
    {
        id: 4,
        name: "PlayStation 5 Slim",
        price: "549.00 €",
        category: "gaming",
        image: productConsole,
        rating: 4.9,
        specs: ["4K 120Hz", "1TB SSD", "DualSense Incluido"],
        stores: [
            { name: "Fnac", price: "549.00 €", url: "https://www.fnac.es/SearchResult/ResultList.aspx?Search=playstation+5" },
            { name: "Amazon", price: "539.00 €", url: "https://www.amazon.es/s?k=playstation+5+slim" },
            { name: "Game", price: "549.00 €", url: "https://www.game.es/HARDWARE/CONSOLA/PLAYSTATION-5" }
        ],
        keywords: ["playstation", "ps5", "consola", "console", "gaming", "videojuegos", "sony"]
    },
    {
        id: 5,
        name: "Breville Barista Express",
        price: "499.00 €",
        category: "home",
        image: productCoffee,
        rating: 4.7,
        specs: ["Molinillo integrado", "Vaporizador de leche", "Acero inoxidable"],
        stores: [
            { name: "Amazon", price: "499.00 €", url: "https://www.amazon.es/s?k=breville+barista+express" },
            { name: "El Corte Inglés", price: "520.00 €", url: "https://www.elcorteingles.es/search/?s=breville+barista" }
        ],
        keywords: ["cafetera", "coffee", "espresso", "barista", "cafe", "cocina", "kitchen"]
    },
    {
        id: 6,
        name: "iPhone 15 Pro",
        price: "1.199 €",
        category: "tech",
        image: productIphone,
        rating: 4.8,
        specs: ["Chip A17 Pro", "Titanio", "48MP Camera", "USB-C"],
        stores: [
            { name: "Apple", price: "1.199 €", url: "https://www.apple.com/es/shop/buy-iphone/iphone-15-pro" },
            { name: "Amazon", price: "1.149 €", url: "https://www.amazon.es/s?k=iphone+15+pro" },
            { name: "MediaMarkt", price: "1.179 €", url: "https://www.mediamarkt.es/es/search.html?query=iphone%2015%20pro" }
        ],
        keywords: ["iphone", "apple", "smartphone", "movil", "telefono", "phone", "camara"]
    },
    {
        id: 7,
        name: "Samsung Galaxy S24 Ultra",
        price: "1.329 €",
        category: "tech",
        image: productSamsung,
        rating: 4.7,
        specs: ["200MP Camera", "S-Pen incluido", "Titanio", "Snapdragon 8 Gen 3"],
        stores: [
            { name: "Samsung", price: "1.329 €", url: "https://www.samsung.com/es/smartphones/galaxy-s24-ultra/" },
            { name: "Amazon", price: "1.279 €", url: "https://www.amazon.es/s?k=samsung+galaxy+s24+ultra" },
            { name: "PcComponentes", price: "1.299 €", url: "https://www.pccomponentes.com/buscar/?query=samsung+galaxy+s24+ultra" }
        ],
        keywords: ["samsung", "galaxy", "smartphone", "movil", "android", "telefono", "camara"]
    },
    {
        id: 8,
        name: "LG OLED C4 55\"",
        price: "1.399 €",
        category: "tech",
        image: productTv,
        rating: 4.9,
        specs: ["OLED evo", "Dolby Vision IQ", "4K 120Hz", "webOS 24"],
        stores: [
            { name: "LG", price: "1.399 €", url: "https://www.lg.com/es/televisores/lg-oled55c4" },
            { name: "Amazon", price: "1.299 €", url: "https://www.amazon.es/s?k=lg+oled+c4+55" },
            { name: "MediaMarkt", price: "1.349 €", url: "https://www.mediamarkt.es/es/search.html?query=lg%20oled%20c4" }
        ],
        keywords: ["television", "tv", "oled", "lg", "smart tv", "tele", "pantalla"]
    },
    {
        id: 9,
        name: "DJI Mini 4 Pro",
        price: "799 €",
        category: "tech",
        image: productDrone,
        rating: 4.8,
        specs: ["4K 60fps", "Detección obstáculos 360°", "34 min vuelo", "249g"],
        stores: [
            { name: "DJI", price: "799 €", url: "https://store.dji.com/es/product/dji-mini-4-pro" },
            { name: "Amazon", price: "769 €", url: "https://www.amazon.es/s?k=dji+mini+4+pro" },
            { name: "PcComponentes", price: "779 €", url: "https://www.pccomponentes.com/buscar/?query=dji+mini+4+pro" }
        ],
        keywords: ["dron", "drone", "dji", "camara", "video", "aereo"]
    },
    {
        id: 10,
        name: "Apple Watch Ultra 2",
        price: "899 €",
        category: "wearables",
        image: productWatch,
        rating: 4.8,
        specs: ["Titanio", "GPS + Cellular", "36h batería", "100m resistencia agua"],
        stores: [
            { name: "Apple", price: "899 €", url: "https://www.apple.com/es/shop/buy-watch/apple-watch-ultra" },
            { name: "Amazon", price: "869 €", url: "https://www.amazon.es/s?k=apple+watch+ultra+2" },
            { name: "El Corte Inglés", price: "899 €", url: "https://www.elcorteingles.es/search/?s=apple+watch+ultra+2" }
        ],
        keywords: ["smartwatch", "reloj", "watch", "apple", "fitness", "deporte"]
    }
];

// Función para buscar productos basada en query
export const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const results = INITIAL_PRODUCTS.filter(product => {
        const matchesName = product.name.toLowerCase().includes(lowerQuery);
        const matchesKeywords = product.keywords.some(kw =>
            lowerQuery.includes(kw) || kw.includes(lowerQuery)
        );
        const matchesCategory = product.category.toLowerCase().includes(lowerQuery);
        return matchesName || matchesKeywords || matchesCategory;
    });

    return results.length > 0 ? results : [INITIAL_PRODUCTS[Math.floor(Math.random() * INITIAL_PRODUCTS.length)]];
};

// Respuestas de IA mejoradas
export const getAIResponse = (query, language = 'es') => {
    const lowerQuery = query.toLowerCase();
    const products = searchProducts(query);
    const product = products[0];

    const responses = {
        es: {
            headphones: `He analizado 47 modelos de auriculares y los **${product.name}** destacan por su cancelación de ruido líder en el mercado. El precio más bajo ahora mismo está en Amazon.`,
            laptop: `Para tu caso, el **${product.name}** ofrece el mejor equilibrio entre rendimiento y portabilidad. He encontrado una oferta 50€ más barata que el precio oficial.`,
            phone: `El **${product.name}** es la mejor opción en su rango de precio. He comparado 23 tiendas y encontré el mejor precio en Amazon.`,
            console: `La **${product.name}** tiene el mejor rendimiento gaming. Acaba de bajar de precio en varias tiendas. Te muestro la comparativa:`,
            tv: `Para una experiencia visual premium, el **${product.name}** es imbatible. OLED con 4K a 120Hz ideal para cine y gaming.`,
            shoes: `Un clásico atemporal: las **${product.name}**. He encontrado el mejor precio en Zalando, 5€ menos que en la tienda oficial.`,
            watch: `El **${product.name}** es el smartwatch más completo del mercado. Resistente y con la mejor autonomía de su categoría.`,
            drone: `Para grabación aérea profesional, el **${product.name}** es la mejor opción por su portabilidad y calidad de imagen.`,
            coffee: `El **${product.name}** convierte tu cocina en una cafetería profesional. Molinillo integrado y espresso perfecto.`,
            default: `He encontrado el **${product.name}** que encaja con tu búsqueda. Aquí tienes la comparativa de precios:`
        },
        en: {
            headphones: `I've analyzed 47 headphone models and the **${product.name}** stand out for their market-leading noise cancellation. The lowest price right now is on Amazon.`,
            laptop: `For your case, the **${product.name}** offers the best balance of performance and portability. I found an offer €50 cheaper than the official price.`,
            phone: `The **${product.name}** is the best option in its price range. I compared 23 stores and found the best price on Amazon.`,
            console: `The **${product.name}** has the best gaming performance. It just dropped in price at several stores. Here's the comparison:`,
            tv: `For a premium visual experience, the **${product.name}** is unbeatable. OLED with 4K at 120Hz, ideal for cinema and gaming.`,
            shoes: `A timeless classic: the **${product.name}**. I found the best price on Zalando, €5 less than the official store.`,
            watch: `The **${product.name}** is the most complete smartwatch on the market. Durable and with the best battery life in its category.`,
            drone: `For professional aerial recording, the **${product.name}** is the best option for its portability and image quality.`,
            coffee: `The **${product.name}** turns your kitchen into a professional café. Integrated grinder and perfect espresso.`,
            default: `I found the **${product.name}** that matches your search. Here's the price comparison:`
        }
    };

    const lang = responses[language] || responses.es;

    // Detectar categoría de búsqueda
    if (lowerQuery.match(/auric|headphone|cascos|sony|bose/)) return { text: lang.headphones, products };
    if (lowerQuery.match(/portatil|laptop|mac|ordenador|computer/)) return { text: lang.laptop, products };
    if (lowerQuery.match(/movil|phone|iphone|samsung|smartphone|telefono/)) return { text: lang.phone, products };
    if (lowerQuery.match(/consola|playstation|ps5|xbox|nintendo|gaming/)) return { text: lang.console, products };
    if (lowerQuery.match(/television|tv|tele|oled|pantalla/)) return { text: lang.tv, products };
    if (lowerQuery.match(/zapatilla|shoe|nike|adidas|sneaker|deportiva/)) return { text: lang.shoes, products };
    if (lowerQuery.match(/reloj|watch|smartwatch|garmin|fitbit/)) return { text: lang.watch, products };
    if (lowerQuery.match(/dron|drone|dji|aereo/)) return { text: lang.drone, products };
    if (lowerQuery.match(/cafe|coffee|cafetera|espresso|nespresso/)) return { text: lang.coffee, products };

    return { text: lang.default, products };
};
