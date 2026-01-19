import React, { useState, useContext } from 'react';
import { Check, Bell } from 'lucide-react';

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map(toast => (
                    <div key={toast.id} className="bg-[#252525] border border-white/10 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up pointer-events-auto min-w-[300px]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-[#8c52ff]/20 text-[#8c52ff]'}`}>
                            {toast.type === 'success' ? <Check size={16} /> : <Bell size={16} />}
                        </div>
                        <span className="text-sm font-medium">{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
