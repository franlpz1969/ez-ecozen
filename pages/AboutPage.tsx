import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="bg-light py-10 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">Sobre EcoZen</h1>
          <p className="mt-2 text-base md:text-lg text-gray-700">Limpieza profesional, <strong>ecológica</strong> y <strong>consciente</strong>.</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Nuestra Esencia</h2>
            <p className="text-base md:text-lg text-gray-700 mb-4">
              Somos EcoZen, una empresa joven, dinámica y comprometida con una <strong>nueva forma</strong> de entender la limpieza. Con varios años de experiencia en la zona Oeste de la capital, nuestro equipo combina <strong>profesionalismo</strong>, <strong>conciencia ecológica</strong> y <strong>sensibilidad</strong> para ofrecerte un servicio <strong>único</strong>.
            </p>
            <p className="text-base md:text-lg text-gray-700">
              Creemos que cada espacio merece el mejor cuidado. Por eso, trabajamos con productos <strong>ecológicos certificados</strong>, técnicas <strong>eficientes</strong> y una atención <strong>personalizada</strong>, adaptada a cada cliente.
            </p>
          </div>
          <div>
            <img src="https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Equipo de limpieza profesional usando productos ecológicos" className="rounded-lg shadow-xl aspect-video w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-20 bg-light">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
            <img src="https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Rincón de lectura tranquilo y ordenado que inspira calma" className="rounded-lg shadow-xl aspect-video w-full object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Nuestra Misión</h2>
            <p className="text-base md:text-lg text-gray-700">
              En EcoZen, transformamos los ambientes en lugares de <strong>bienestar</strong> y <strong>equilibrio</strong>. Tu hogar o empresa se convierten en un <strong>oasis de calma</strong>, donde la limpieza y el orden prevalecen.
            </p>
             <p className="text-base md:text-lg text-gray-700 mt-4">
              Nuestra misión es crear espacios <strong>impecables</strong>, utilizando productos <strong>100% ecológicos</strong> que son <strong>respetuosos</strong> con tu salud, tus superficies y el planeta.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;