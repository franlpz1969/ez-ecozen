import React, { useState } from 'react';
import { generateCleaningTip } from '../services/geminiService';
import { LeafIcon } from '../components/icons/LeafIcon';

const HomePage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateTip = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTip('');
    const generatedTip = await generateCleaningTip(topic);
    setTip(generatedTip);
    setLoading(false);
  };

  return (
    <section>
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/53577/hotel-architectural-tourism-travel-53577.jpeg')" }}
      >
        <div className="absolute inset-0 bg-dark bg-opacity-50"></div>
        
        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mt-8 mb-4">
              Limpieza ecológica que armoniza tu espacio
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-200">
              Cuidamos tu hogar con productos <strong>naturales</strong> y energía <strong>positiva</strong> para crear ambientes de <strong>paz</strong> y <strong>bienestar</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Bloque de valor */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-14 grid sm:grid-cols-3 gap-6">
        {[
          { t: 'Productos naturales', d: 'Ingredientes biodegradables y respetuosos con la piel y el planeta.' },
          { t: 'Ritual de bienestar', d: 'Textiles frescos, fragancias suaves y luz cálida para armonizar tu espacio.' },
          { t: 'Resultados visibles', d: 'Brillo, orden y serenidad que se perciben desde el primer instante.' },
        ].map((item) => (
          <div
            key={item.t}
            className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-secondary transition"
          >
            <h3 className="font-semibold text-dark text-xl md:text-2xl">
              {item.t}
            </h3>
            <p className="text-base md:text-lg text-gray-600 mt-2">{item.d}</p>
          </div>
        ))}
      </div>

      {/* AI Cleaning Assistant */}
      <section className="bg-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <LeafIcon className="w-12 h-12 text-secondary mb-4 mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Tu Asistente de Limpieza EcoZen</h2>
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Dinos qué necesitas limpiar y te daremos un consejo <strong>ecológico</strong> y <strong>personalizado</strong> al instante.
          </p>
          
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ej: manchas de café en un mantel"
                className="flex-grow bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500"
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateTip()}
              />
              <button
                onClick={handleGenerateTip}
                className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-green-600 transition-colors duration-300 disabled:bg-green-300 disabled:cursor-not-allowed"
                disabled={loading || !topic.trim()}
              >
                {loading ? 'Generando...' : 'Generar Consejo'}
              </button>
            </div>
            
            {loading && (
               <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-gray-800 animate-pulse">Buscando la mejor solución natural...</p>
               </div>
            )}

            {tip && !loading &&(
              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-left animate-fade-in">
                <p className="text-lg text-gray-800">{tip}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomePage;