import React from 'react';

const Spinner: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-label={text || "cargando contenido"}>
      <div className="relative w-20 h-20">
        <span className="sr-only">{text || 'Cargando...'}</span>
        <div
          className="absolute inset-0 border-4 border-primary rounded-full animate-ripple"
        ></div>
        <div
          className="absolute inset-0 border-4 border-primary rounded-full animate-ripple"
          style={{ animationDelay: '0.7s' }}
        ></div>
      </div>
      {text && <p className="text-lg text-gray-600 font-semibold animate-pulse">{text}</p>}
    </div>
  );
};

export default Spinner;
