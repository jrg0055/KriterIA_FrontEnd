import React, { useState } from 'react';
import { ArrowRight, User, Mail, Lock, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Logo from '../../components/common/Logo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { register } from '../../services/api';

const RegisterScreen = ({ onRegisterSuccess, onBack, onLoginClick }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { addToast } = useToast();

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            addToast('Por favor, completa todos los campos', 'error');
            return;
        }

        if (password.length < 6) {
            addToast('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await register({ name, email, password });
            
            // Guardar token si el backend lo devuelve
            if (response.token) {
                localStorage.setItem('authToken', response.token);
            }
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            
            addToast('Cuenta creada correctamente', 'success');
            onRegisterSuccess();
        } catch (error) {
            console.error('Error de registro:', error);
            addToast(error.message || 'Error al crear la cuenta', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1b1b1b] flex items-center justify-center relative p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,82,255,0.1),transparent_70%)]" />

            <button onClick={onBack} className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20">
                <ArrowRight className="rotate-180" size={16} /> Volver
            </button>

            <div className="w-full max-w-md bg-[#252525] border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-fade-in">
                <div className="flex justify-center mb-6">
                    <Logo size="text-2xl" onClick={() => { }} />
                </div>
                <h2 className="text-2xl text-white font-semibold text-center mb-2">Crea tu cuenta</h2>
                <p className="text-gray-400 text-center mb-8 text-sm">Únete a KriterIA y empieza a ahorrar</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Nombre Completo</label>
                        <Input 
                            placeholder="Juan Pérez" 
                            icon={User}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Email</label>
                        <Input 
                            placeholder="usuario@ejemplo.com" 
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Contraseña</label>
                        <Input 
                            placeholder="••••••••" 
                            type="password" 
                            icon={Lock}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button className="w-full mt-6 group" onClick={handleRegister} isLoading={loading}>
                        <Sparkles size={16} className="mr-2 group-hover:rotate-12 transition-transform" />
                        Crear Cuenta Gratis
                    </Button>

                    <div className="text-center mt-6 text-sm text-gray-400">
                        ¿Ya tienes cuenta?{' '}
                        <button onClick={onLoginClick} className="text-[#8c52ff] hover:text-[#a67aff] font-medium transition-colors">
                            Inicia Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
