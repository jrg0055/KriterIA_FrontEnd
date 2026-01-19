import React, { useState } from 'react';
import { Check, X, Sparkles, Zap, Building, ChevronDown } from 'lucide-react';
import Button from '../components/common/Button';

const PricingPage = ({ onLogin }) => {
    const [billingPeriod, setBillingPeriod] = useState('monthly');
    const [openFaq, setOpenFaq] = useState(null);

    const plans = [
        {
            id: 'free',
            name: 'Gratis',
            price: '0€',
            period: '/mes',
            description: 'Para empezar a explorar',
            icon: Sparkles,
            color: 'gray',
            features: [
                { text: 'Búsquedas ilimitadas', included: true },
                { text: 'Comparativa básica', included: true },
                { text: 'Historial de 1 día', included: true },
                { text: 'Análisis de reseñas falsas', included: true },
                { text: 'Alertas de precio', included: false },
                { text: 'Soporte prioritario', included: false }
            ],
            cta: 'Empezar Gratis',
            popular: false
        },
        {
            id: 'pro',
            name: 'Pro Shopper',
            price: '9€',
            period: '/mes',
            description: 'Para compradores exigentes',
            icon: Zap,
            color: 'purple',
            features: [
                { text: 'Todo lo del plan Gratis', included: true },
                { text: 'Alertas de precio en tiempo real', included: true },
                { text: 'Historial ilimitado', included: true },
                { text: 'Comparativas avanzadas', included: true },
                { text: 'Soporte prioritario', included: true },
                { text: 'Sin publicidad', included: true }
            ],
            cta: 'Prueba 7 días gratis',
            popular: true
        },
        {
            id: 'business',
            name: 'Empresas',
            price: 'Personalizado',
            period: '',
            description: 'Soluciones a medida',
            icon: Building,
            color: 'blue',
            features: [
                { text: 'Todo lo del plan Pro', included: true },
                { text: 'API de acceso', included: true },
                { text: 'Dashboard de tendencias', included: true },
                { text: 'Exportación CSV', included: true },
                { text: 'Gestor de cuenta dedicado', included: true },
                { text: 'SLA personalizado', included: true }
            ],
            cta: 'Contactar',
            popular: false
        }
    ];

    const faqs = [
        {
            q: '¿Puedo cambiar de plan en cualquier momento?',
            a: 'Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplican inmediatamente.'
        },
        {
            q: '¿Qué métodos de pago aceptáis?',
            a: 'Aceptamos todas las tarjetas principales, PayPal y transferencia bancaria para empresas.'
        },
        {
            q: '¿Hay compromiso de permanencia?',
            a: 'No, puedes cancelar en cualquier momento sin penalización.'
        }
    ];

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    return (
        <div className="flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                    <Zap size={16} className="text-[#8c52ff]" />
                    <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">
                        Precios
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Planes para cada comprador
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Comienza gratis y ahorra más con nuestras herramientas premium.
                </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center gap-4 bg-[#252525] p-1.5 rounded-full border border-white/10 mb-12">
                <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'bg-[#8c52ff] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Mensual
                </button>
                <button
                    onClick={() => setBillingPeriod('annual')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingPeriod === 'annual' ? 'bg-[#8c52ff] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Anual
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">-20%</span>
                </button>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
                {plans.map((plan, idx) => (
                    <div
                        key={plan.id}
                        className={`relative bg-[#252525] border rounded-3xl p-8 flex flex-col transition-all duration-500 hover:scale-[1.02] ${plan.popular
                            ? 'border-[#8c52ff] shadow-[0_0_40px_rgba(140,82,255,0.2)] md:-translate-y-4'
                            : 'border-white/10 hover:border-white/20'
                            }`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <div className="bg-gradient-to-r from-[#8c52ff] to-purple-400 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                    Más Popular
                                </div>
                            </div>
                        )}

                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-[#8c52ff]' : 'bg-white/5'
                            }`}>
                            <plan.icon size={24} className={plan.popular ? 'text-white' : 'text-[#8c52ff]'} />
                        </div>

                        <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-[#8c52ff]' : 'text-gray-300'}`}>
                            {plan.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">
                                {billingPeriod === 'annual' && plan.id === 'pro' ? '7€' : plan.price}
                            </span>
                            <span className="text-gray-500 text-lg">{plan.period}</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${feature.included ? 'bg-[#8c52ff]/20' : 'bg-gray-700/50'
                                        }`}>
                                        {feature.included ? (
                                            <Check size={12} className="text-[#8c52ff]" />
                                        ) : (
                                            <X size={12} className="text-gray-500" />
                                        )}
                                    </div>
                                    <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant={plan.popular ? 'primary' : 'outline'}
                            className="w-full"
                            onClick={onLogin}
                        >
                            {plan.cta}
                        </Button>
                    </div>
                ))}
            </div>

            {/* FAQ Section - Collapsible */}
            <div className="mt-20 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                    Preguntas sobre precios
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-[#252525] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all"
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full p-6 flex items-center justify-between text-left"
                            >
                                <h3 className="text-white font-medium pr-4">{faq.q}</h3>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#8c52ff] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-gray-400 text-sm px-6 pb-6">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
