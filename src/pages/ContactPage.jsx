import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ContactPage = () => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            addToast('Mensaje enviado correctamente', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'hola@kriteria.com', href: 'mailto:hola@kriteria.com' },
        { icon: Phone, label: 'Teléfono', value: '+34 900 123 456', href: 'tel:+34900123456' },
        { icon: MapPin, label: 'Oficina', value: 'Madrid, España', href: '#' },
        { icon: Clock, label: 'Horario', value: 'Lun-Vie 9:00-18:00', href: '#' }
    ];

    const faqs = [
        { q: '¿Cómo puedo cancelar mi suscripción?', a: 'Puedes cancelar en cualquier momento desde tu perfil en la sección "Suscripción". La cancelación es inmediata y no hay penalizaciones.' },
        { q: '¿Los precios incluyen IVA?', a: 'Sí, todos los precios mostrados incluyen IVA. Recibirás factura completa con cada pago.' },
        { q: '¿Cómo funciona la detección de reseñas falsas?', a: 'Nuestra IA analiza patrones de lenguaje, frecuencia de publicación y otros factores para identificar reseñas potencialmente falsas.' }
    ];

    return (
        <div className="flex flex-col items-center px-4 py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-[#8c52ff]/10 border border-[#8c52ff]/20 rounded-full px-4 py-1.5 mb-6">
                    <MessageCircle size={16} className="text-[#8c52ff]" />
                    <span className="text-xs font-medium text-[#8c52ff] uppercase tracking-wider">
                        Contacto
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    ¿Tienes alguna<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c52ff] to-purple-400">
                        pregunta?
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Contact Form */}
                <div className="bg-[#252525] border border-white/5 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Nombre</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Email</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Asunto</label>
                            <Input
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="¿En qué podemos ayudarte?"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Mensaje</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Cuéntanos más..."
                                rows={5}
                                required
                                className="w-full bg-[#1b1b1b] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8c52ff] transition-colors resize-none"
                            />
                        </div>
                        <Button type="submit" className="w-full" isLoading={loading}>
                            <Send size={18} />
                            Enviar Mensaje
                        </Button>
                    </form>
                </div>

                {/* Contact Info & FAQ */}
                <div className="space-y-8">
                    {/* Response Time */}
                    <div className="bg-gradient-to-br from-[#8c52ff]/20 to-transparent border border-[#8c52ff]/20 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#8c52ff] rounded-xl flex items-center justify-center">
                                <Clock size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-white font-semibold">Tiempo de respuesta</div>
                                <div className="text-[#8c52ff]">Menos de 24 horas</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {contactInfo.map((info, idx) => (
                            <a
                                key={idx}
                                href={info.href}
                                className="bg-[#252525] border border-white/5 rounded-xl p-4 hover:border-[#8c52ff]/30 transition-all group"
                            >
                                <info.icon size={20} className="text-[#8c52ff] mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-xs text-gray-500 mb-1">{info.label}</div>
                                <div className="text-white text-sm font-medium">{info.value}</div>
                            </a>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Preguntas frecuentes</h3>
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#252525] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full flex items-center justify-between p-4 text-left"
                                    >
                                        <span className="text-white font-medium text-sm">{faq.q}</span>
                                        {openFaq === idx ? (
                                            <ChevronUp size={18} className="text-[#8c52ff]" />
                                        ) : (
                                            <ChevronDown size={18} className="text-gray-500" />
                                        )}
                                    </button>
                                    {openFaq === idx && (
                                        <div className="px-4 pb-4 text-gray-400 text-sm animate-fade-in">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
