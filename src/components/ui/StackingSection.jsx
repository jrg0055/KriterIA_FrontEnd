import React, { useRef, forwardRef } from 'react';
import useScrollStack, { useScrollAnimation } from '../../hooks/useScrollStack';

/**
 * Componente para secciones con efecto stacking al hacer scroll
 * Similar al efecto de n8n.io
 */
const StackingSection = forwardRef(({
    children,
    className = '',
    bgColor = 'bg-[#1b1b1b]',
    order = 0,
    enableStack = true,
    fullHeight = true,
    id,
}, ref) => {
    const sectionRef = useRef(null);
    const { style, isInView, scrollProgress } = useScrollStack(sectionRef, {
        threshold: 0.3,
        scaleRange: [1, 0.92],
        opacityRange: [1, 0.3],
    });

    // Z-index basado en orden (las últimas secciones están encima)
    const zIndex = 10 + order;

    return (
        <section
            ref={(node) => {
                sectionRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            id={id}
            className={`
                ${enableStack ? 'sticky top-0' : 'relative'}
                ${fullHeight ? 'min-h-screen' : ''}
                ${bgColor}
                w-full
                flex items-center justify-center
                overflow-hidden
                ${className}
            `}
            style={{
                zIndex,
                ...(enableStack && scrollProgress > 0 ? style : {}),
                willChange: enableStack ? 'transform, opacity' : 'auto',
            }}
        >
            {/* Contenedor interno con padding para el contenido */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                {children}
            </div>

            {/* Sombra superior para efecto de profundidad */}
            {enableStack && scrollProgress > 0 && (
                <div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 to-transparent"
                    style={{ opacity: scrollProgress * 0.5 }}
                />
            )}
        </section>
    );
});

StackingSection.displayName = 'StackingSection';

/**
 * Componente para animar elementos cuando entran en vista
 */
export const AnimatedOnScroll = ({
    children,
    className = '',
    animation = 'fadeInUp',
    delay = 0,
    duration = 600,
}) => {
    const elementRef = useRef(null);
    const isVisible = useScrollAnimation(elementRef, { threshold: 0.2 });

    const animations = {
        fadeInUp: {
            initial: { opacity: 0, transform: 'translateY(40px)' },
            animate: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInLeft: {
            initial: { opacity: 0, transform: 'translateX(-40px)' },
            animate: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeInRight: {
            initial: { opacity: 0, transform: 'translateX(40px)' },
            animate: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
        },
        scaleIn: {
            initial: { opacity: 0, transform: 'scale(0.9)' },
            animate: { opacity: 1, transform: 'scale(1)' },
        },
        slideUp: {
            initial: { opacity: 0, transform: 'translateY(60px)' },
            animate: { opacity: 1, transform: 'translateY(0)' },
        },
    };

    const anim = animations[animation] || animations.fadeInUp;

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                ...anim.initial,
                ...(isVisible ? anim.animate : {}),
                transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

/**
 * Componente para stats con contadores animados
 */
export const AnimatedCounter = ({
    value,
    suffix = '',
    prefix = '',
    className = '',
    duration = 2000,
}) => {
    const counterRef = useRef(null);
    const isVisible = useScrollAnimation(counterRef, { threshold: 0.5, once: true });
    const [displayValue, setDisplayValue] = React.useState(0);

    React.useEffect(() => {
        if (!isVisible) return;

        const startTime = Date.now();
        const startValue = 0;
        const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = startValue + (numericValue - startValue) * easeProgress;
            setDisplayValue(Math.round(currentValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, value, duration]);

    return (
        <span ref={counterRef} className={className}>
            {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
    );
};

/**
 * Componente para carrousel infinito de logos
 */
export const InfiniteLogoCarousel = ({
    items = [],
    speed = 30, // segundos para un ciclo completo
    direction = 'left',
    className = '',
}) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <div
                className="flex items-center gap-12 animate-scroll"
                style={{
                    animation: `scroll-${direction} ${speed}s linear infinite`,
                }}
            >
                {/* Duplicar items para efecto infinito */}
                {[...items, ...items].map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 text-gray-500 hover:text-white font-semibold text-lg transition-all duration-300 hover:scale-110 cursor-default px-4"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StackingSection;
