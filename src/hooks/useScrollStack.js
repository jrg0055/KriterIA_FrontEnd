import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar el efecto de scroll stacking
 * Similar al efecto de n8n.io donde las secciones se apilan
 */
const useScrollStack = (sectionRef, options = {}) => {
    const {
        threshold = 0.5, // Punto en el que la sección empieza a transformarse
        scaleRange = [1, 0.9], // Rango de escala [inicio, fin]
        opacityRange = [1, 0], // Rango de opacidad [inicio, fin]
    } = options;

    const [scrollProgress, setScrollProgress] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [isPassed, setIsPassed] = useState(false);

    const calculateProgress = useCallback(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;

        // Calcular si la sección está en vista
        const isCurrentlyInView = rect.top < windowHeight && rect.bottom > 0;
        setIsInView(isCurrentlyInView);

        // Calcular si la sección ya pasó
        const hasPassedTop = rect.top < 0;
        setIsPassed(hasPassedTop && rect.bottom < windowHeight * threshold);

        // Calcular progreso del scroll (0 a 1)
        if (hasPassedTop) {
            // La sección está pegada arriba, calcular cuánto ha "pasado"
            const passedAmount = Math.abs(rect.top);
            const maxPass = sectionHeight - windowHeight * threshold;
            const progress = Math.min(passedAmount / maxPass, 1);
            setScrollProgress(progress);
        } else {
            setScrollProgress(0);
        }
    }, [sectionRef, threshold]);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(calculateProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Calcular estado inicial

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [calculateProgress]);

    // Calcular valores de transformación basados en el progreso
    const scale = scaleRange[0] - (scaleRange[0] - scaleRange[1]) * scrollProgress;
    const opacity = opacityRange[0] - (opacityRange[0] - opacityRange[1]) * scrollProgress;
    const translateY = scrollProgress * -50; // Mover hacia arriba conforme avanza

    return {
        scrollProgress,
        isInView,
        isPassed,
        style: {
            transform: `scale(${scale}) translateY(${translateY}px)`,
            opacity: Math.max(opacity, 0),
        },
    };
};

/**
 * Hook simplificado para animaciones de entrada al hacer scroll
 */
export const useScrollAnimation = (elementRef, options = {}) => {
    const { threshold = 0.2, once = true } = options;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, threshold, once]);

    return isVisible;
};

/**
 * Hook para contadores animados
 */
export const useCountUp = (endValue, duration = 2000, startOnView = true) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    const startCounting = useCallback(() => {
        if (hasStarted) return;
        setHasStarted(true);

        const startTime = Date.now();
        const startValue = 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out-cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = startValue + (endValue - startValue) * easeProgress;
            setCount(Math.round(currentValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [endValue, duration, hasStarted]);

    return { count, startCounting, hasStarted };
};

export default useScrollStack;
