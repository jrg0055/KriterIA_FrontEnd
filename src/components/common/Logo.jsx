import React from 'react';
import logoImg from '../../assets/logotfg.png';

const Logo = ({ className = "", size = "text-xl", onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-2 font-bold cursor-pointer ${size} ${className}`}
        >
            <img
                src={logoImg}
                alt="KriterIA"
                className="h-20 md:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
        </div>
    );
};

export default Logo;
