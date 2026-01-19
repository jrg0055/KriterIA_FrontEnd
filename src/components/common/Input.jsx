import React from 'react';

const Input = ({ placeholder, type = "text", icon: Icon, value, onChange }) => (
    <div className="relative w-full group">
        {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#8c52ff] transition-colors" size={20} />}
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-[#252525] border border-white/10 rounded-xl py-4 ${Icon ? 'pl-12' : 'pl-4'} pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#8c52ff] focus:ring-1 focus:ring-[#8c52ff] transition-all`}
        />
    </div>
);

export default Input;
