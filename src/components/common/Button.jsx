import React from 'react';
import { Loader2 } from 'lucide-react';

const THEME = {
    primary: 'bg-[#8c52ff]',
    primaryHover: 'hover:bg-[#7a45e6]',
    border: 'border-white/10',
};

const Button = ({ children, variant = 'primary', className = '', onClick, disabled, isLoading }) => {
    const baseStyle = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: `${THEME.primary} text-white ${THEME.primaryHover} shadow-[0_0_15px_rgba(140,82,255,0.4)] hover:shadow-[0_0_25px_rgba(140,82,255,0.6)]`,
        outline: `bg-transparent border ${THEME.border} text-white hover:bg-white/5`,
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        glass: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
    };

    return (
        <button onClick={onClick} disabled={disabled || isLoading} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : children}
        </button>
    );
};

export default Button;
