import React, { useState } from 'react';
import { ArrowRight, User, Settings } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Logo from '../../components/common/Logo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { login } from '../../services/api';

const LoginScreen = ({ onLoginSuccess, onBack, onRegisterClick, initialQuery }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { addToast } = useToast();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            addToast('Por favor, completa todos los campos', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await login(email, password);
            
            // Guardar token si el backend lo devuelve
            if (response.token) {
                localStorage.setItem('authToken', response.token);
            }
            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            
            addToast('Sesión iniciada correctamente', 'success');
            onLoginSuccess(initialQuery);
        } catch (error) {
            console.error('Error de login:', error);
            addToast(error.message || 'Error al iniciar sesión', 'error');
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
                <div className="flex justify-center mb-8">
                    <Logo size="text-3xl" onClick={() => { }} />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Email</label>
                        <Input 
                            placeholder="usuario@ejemplo.com" 
                            icon={User} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">Contraseña</label>
                        <Input 
                            placeholder="••••••••" 
                            type="password" 
                            icon={Settings}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors">
                            <input type="checkbox" className="rounded bg-gray-700 border-none text-[#8c52ff] focus:ring-0" />
                            Recordarme
                        </label>
                        <a href="#" className="text-[#8c52ff] hover:text-[#a67aff]">¿Olvidaste la contraseña?</a>
                    </div>
                    <Button className="w-full mt-4" onClick={handleLogin} isLoading={loading}>Entrar</Button>

                    <div className="text-center mt-4 text-sm text-gray-400">
                        ¿No tienes cuenta?{' '}
                        <button onClick={onRegisterClick} className="text-[#8c52ff] hover:text-[#a67aff] font-medium transition-colors">
                            Regístrate gratis
                        </button>
                    </div>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#252525] px-2 text-gray-500">O continúa con</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => {
                                setLoading(true);
                                addToast('Conectando con Google...', 'default');
                                setTimeout(() => {
                                    setLoading(false);
                                    addToast('Sesión iniciada con Google', 'success');
                                    onLoginSuccess(initialQuery);
                                }, 2000);
                            }}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-white text-sm font-medium">Google</span>
                        </button>
                        <button
                            onClick={() => {
                                setLoading(true);
                                addToast('Conectando con Apple...', 'default');
                                setTimeout(() => {
                                    setLoading(false);
                                    addToast('Sesión iniciada con Apple', 'success');
                                    onLoginSuccess(initialQuery);
                                }, 2000);
                            }}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span className="text-white text-sm font-medium">Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
