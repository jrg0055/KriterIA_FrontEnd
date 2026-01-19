<div align="center">
  <img src="public/logotfg.png" alt="KriterIA Logo" width="200"/>
  
  # 🧠 KriterIA Frontend
  
  ### Tu Asistente de Compras Inteligente potenciado por IA
  
  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  
  [Características](#-características) • [Tecnologías](#-tecnologías) • [Instalación](#-instalación-y-configuración) • [Uso](#-uso) • [Estructura](#-estructura-del-proyecto) • [Contribuir](#-contribuir)
  
</div>

---

## 📋 Sobre el Proyecto

**KriterIA** es una aplicación web innovadora que revoluciona la experiencia de compras online mediante el poder de la Inteligencia Artificial. Compara precios, analiza productos y ofrece recomendaciones personalizadas en tiempo real a través de una interfaz intuitiva y moderna.

### 🎯 Características Principales

- 🔍 **Búsqueda Inteligente**: Encuentra los mejores productos adaptados a tus necesidades específicas
- 💰 **Comparación de Precios**: Análisis automático de precios en múltiples tiendas online
- 🤖 **Asistente IA Conversacional**: Chat interactivo para recomendaciones personalizadas
- ⚡ **Actualizaciones en Tiempo Real**: Información actualizada de ofertas y disponibilidad
- 📊 **Dashboard Interactivo**: Panel de control con tus búsquedas y productos favoritos
- 🏪 **Integración Multi-tienda**: Compatible con las principales plataformas de e-commerce

---

## ✨ Características

### Funcionalidades Implementadas

| Módulo | Descripción | Estado |
|--------|-------------|--------|
| 🏠 **Landing Page** | Página de inicio con animaciones fluidas y diseño moderno | ✅ Completo |
| 📖 **Cómo Funciona** | Guía interactiva del funcionamiento de la plataforma | ✅ Completo |
| 💳 **Planes y Precios** | Sistema de suscripción con múltiples niveles (Gratis, Pro, Empresarial) | ✅ Completo |
| 🏪 **Tiendas Integradas** | Catálogo visual de tiendas compatibles (Amazon, eBay, AliExpress, etc.) | ✅ Completo |
| 👥 **Sobre Nosotros** | Información del equipo y valores de la empresa | ✅ Completo |
| 📞 **Contacto** | Formulario de contacto con validación | ✅ Completo |
| 🔐 **Autenticación** | Sistema de login y registro de usuarios | ✅ Completo |
| 🛒 **Dashboard de Compras** | Panel interactivo para gestionar búsquedas y productos | ✅ Completo |
| 💬 **Chat Interactivo** | Asistente IA conversacional para recomendaciones | ✅ Completo |
| 📱 **Diseño Responsive** | Optimizado para dispositivos móviles y tablets | ✅ Completo |
| 🍪 **Gestión de Cookies** | Banner y política de cookies conforme a RGPD | ✅ Completo |
| 🔒 **Páginas Legales** | Privacidad, términos y condiciones | ✅ Completo |

---

## 🛠️ Tecnologías

### Core
- **React 19.2.0** - Biblioteca UI con las últimas características
- **Vite 7.2.4** - Build tool ultrarrápido para desarrollo moderno
- **JavaScript (ES6+)** - Lógica de aplicación moderna

### Estilos y Animaciones
- **Tailwind CSS 3.4.17** - Framework de utilidades CSS
- **Framer Motion 12.23** - Animaciones fluidas y profesionales
- **Lucide React 0.555** - Iconografía moderna y consistente

### Estado y Datos
- **Zustand 5.0.9** - Gestión de estado ligera y escalable
- **TanStack React Query 5.90** - Fetching y cache de datos servidor
- **Recharts 3.5.1** - Visualización de datos y gráficos

### Herramientas de Desarrollo
- **ESLint 9.39** - Linting y calidad de código
- **PostCSS + Autoprefixer** - Procesamiento CSS avanzado
- **Vite Plugin React** - Integración optimizada

---

## 🚀 Instalación y Configuración

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git** para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jrg0055/KriterIA_FrontEnd.git
   cd KriterIA_FrontEnd
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o si prefieres yarn
   yarn install
   ```

3. **Configurar variables de entorno** (opcional)
   ```bash
   # Crea un archivo .env si necesitas configuraciones personalizadas
   cp .env.example .env
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en: `http://localhost:5173`

---

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con Hot Module Replacement |
| `npm run build` | Genera build de producción optimizado en `/dist` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint para análisis de código |

---

## 💻 Uso

### Navegación Principal

La aplicación cuenta con un sistema de navegación intuitivo:

- **Landing Page**: Página de inicio con presentación del producto
- **Cómo Funciona**: Guía detallada del funcionamiento
- **Precios**: Planes de suscripción disponibles
- **Tiendas**: Catálogo de integraciones disponibles
- **Sobre Nosotros**: Información del equipo
- **Contacto**: Formulario de contacto

### Funcionalidades de Usuario

1. **Registro e Inicio de Sesión**: Crea tu cuenta o inicia sesión
2. **Dashboard**: Accede a tu panel personalizado
3. **Chat Interactivo**: Utiliza el asistente IA para buscar productos
4. **Comparación**: Visualiza comparativas de precios en tiempo real

---

## 📁 Estructura del Proyecto

```
KriterIA_FrontEnd/
├── 📂 public/                  # Archivos estáticos públicos
│   └── logotfg.png            # Logo de la aplicación
│
├── 📂 src/                     # Código fuente
│   ├── 📂 assets/             # Recursos multimedia
│   │   └── 📂 images/         # Imágenes del proyecto
│   │
│   ├── 📂 components/         # Componentes React
│   │   ├── 📂 common/         # Componentes comunes reutilizables
│   │   │   ├── Button.jsx     # Botones personalizados
│   │   │   ├── Input.jsx      # Inputs de formulario
│   │   │   ├── Logo.jsx       # Componente de logo
│   │   │   └── PublicLayout.jsx # Layout principal
│   │   │
│   │   └── 📂 ui/             # Componentes de interfaz
│   │       ├── ChatMessage.jsx           # Mensajes del chat
│   │       ├── CookieBanner.jsx          # Banner de cookies
│   │       ├── IntegrationCarousel.jsx   # Carrusel de integraciones
│   │       ├── IntegrationsPanel.jsx     # Panel de integraciones
│   │       ├── InteractiveChat.jsx       # Chat interactivo
│   │       ├── ProductCard.jsx           # Tarjeta de producto
│   │       ├── ProductSlideOver.jsx      # Panel deslizante de producto
│   │       ├── SpotlightCard.jsx         # Tarjeta destacada
│   │       └── StackingSection.jsx       # Sección con efecto stack
│   │
│   ├── 📂 constants/          # Constantes de la aplicación
│   │   └── theme.js           # Configuración del tema
│   │
│   ├── 📂 context/            # Contextos de React
│   │   └── ToastContext.jsx   # Context para notificaciones
│   │
│   ├── 📂 data/               # Datos estáticos y mocks
│   │   ├── products.js        # Datos de productos
│   │   └── storeIntegrations.js # Integraciones de tiendas
│   │
│   ├── 📂 features/           # Módulos de funcionalidades
│   │   ├── 📂 auth/           # Autenticación
│   │   │   ├── LoginScreen.jsx    # Pantalla de login
│   │   │   └── RegisterScreen.jsx # Pantalla de registro
│   │   │
│   │   └── 📂 shopping/       # Módulo de compras
│   │       └── Dashboard.jsx  # Dashboard principal
│   │
│   ├── 📂 hooks/              # Custom React hooks
│   │   └── useScrollStack.js  # Hook para scroll effects
│   │
│   ├── 📂 pages/              # Páginas de la aplicación
│   │   ├── AboutPage.jsx      # Página "Sobre Nosotros"
│   │   ├── ContactPage.jsx    # Página de contacto
│   │   ├── CookiesPage.jsx    # Política de cookies
│   │   ├── HowItWorksPage.jsx # Cómo funciona
│   │   ├── LandingContent.jsx # Contenido landing
│   │   ├── PricingPage.jsx    # Precios y planes
│   │   ├── PrivacyPage.jsx    # Política de privacidad
│   │   ├── StoresPage.jsx     # Tiendas integradas
│   │   └── TermsPage.jsx      # Términos y condiciones
│   │
│   ├── 📂 redux/              # Configuración de Redux (si aplica)
│   ├── 📂 services/           # Servicios y API
│   │   └── api.js             # Cliente API
│   │
│   ├── 📂 utils/              # Utilidades y helpers
│   │
│   ├── App.css                # Estilos del componente App
│   ├── App.jsx                # Componente raíz
│   ├── KriterIA_App.jsx       # Aplicación principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
│
├── .gitignore                 # Archivos ignorados por Git
├── eslint.config.js           # Configuración ESLint
├── index.html                 # HTML principal
├── package.json               # Dependencias y scripts
├── postcss.config.js          # Configuración PostCSS
├── README.md                  # Este archivo
├── tailwind.config.js         # Configuración Tailwind CSS
└── vite.config.js             # Configuración Vite
```

---

## 🎯 Roadmap

### Próximas Funcionalidades

- [ ] Integración con backend para búsqueda real
- [ ] Sistema de favoritos persistente
- [ ] Notificaciones push para ofertas
- [ ] Modo oscuro
- [ ] Aplicación móvil nativa
- [ ] Extensión de navegador
- [ ] Comparador avanzado con filtros
- [ ] Historial de precios
- [ ] Alertas de precio personalizado

---

## 🎨 Paleta de Colores

La aplicación utiliza una paleta de colores moderna y accesible definida en [tailwind.config.js](tailwind.config.js):

- **Primario**: Azul vibrante para acciones principales
- **Secundario**: Tonos complementarios
- **Neutros**: Grises para texto y fondos
- **Acentos**: Colores de énfasis para notificaciones

---

## 🤝 Contribuir

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

### Cómo Contribuir

1. **Fork** el proyecto
2. Crea tu **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva característica increíble'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar código)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto y Soporte

¿Tienes preguntas o sugerencias? No dudes en contactar:

- **Email**: [Crear issue en GitHub](https://github.com/jrg0055/KriterIA_FrontEnd/issues)
- **Issues**: [github.com/jrg0055/KriterIA_FrontEnd/issues](https://github.com/jrg0055/KriterIA_FrontEnd/issues)

---

## 🙏 Agradecimientos

- React Team por una biblioteca increíble
- Vite por la velocidad de desarrollo
- Tailwind CSS por el sistema de diseño
- Framer Motion por las animaciones fluidas
- La comunidad de código abierto

---

## 👨‍💻 Autor

**Proyecto de Fin de Grado (TFG)**  
Desarrollado con dedicación y café ☕

---

<div align="center">
  
  ### ⭐ Si este proyecto te ha sido útil, considera darle una estrella ⭐
  
  ---
  
  **Made with ❤️ using React + Vite + Tailwind CSS**
  
  [⬆ Volver arriba](#-kriteria-frontend)
  
</div>
