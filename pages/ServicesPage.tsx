import React from 'react';
import { NavLink } from 'react-router-dom';
import { Service } from '../types';
import { DropletIcon, PlanetIcon, SparklesIcon } from '../components/icons/FeatureIcons';
import { LeafIcon } from '../components/icons/LeafIcon';
import { CheckIcon } from '../components/icons/CheckIcon';

const services: Service[] = [
  {
    title: "Limpieza de Hogares",
    description: "Nuestro servicio de limpieza de hogares va más allá de lo superficial. Transformamos tu casa en un santuario de <strong>paz</strong> y <strong>bienestar</strong>. Utilizamos exclusivamente productos <strong>ecológicos certificados</strong> que son <strong>seguros</strong> para tu familia, mascotas y plantas. Nos enfocamos en cada detalle, desde la purificación del aire con aceites esenciales hasta la revitalización de tus espacios, para que al volver a casa sientas una atmósfera de <strong>calma</strong>, <strong>frescura</strong> y <strong>armonía total</strong>.",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: SparklesIcon
  },
  {
    title: "Limpieza de Oficinas y Negocios",
    description: "Un entorno de trabajo limpio y ordenado es clave para la <strong>productividad</strong> y el <strong>bienestar</strong> del equipo. En EcoZen, creamos espacios laborales que inspiran <strong>claridad</strong> y <strong>eficiencia</strong>. Nos encargamos de mantener tus oficinas impecables, utilizando productos no tóxicos que mejoran la calidad del aire interior. Proyecta una imagen profesional y cuida de la salud de tus empleados con un ambiente <strong>sano</strong>, <strong>fresco</strong> y <strong>energéticamente equilibrado</strong>.",
    imageUrl: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: LeafIcon
  },
  {
    title: "Limpieza de Empresas y Locales Comerciales",
    description: "La primera impresión es crucial. Nos aseguramos de que tu local comercial, tienda o restaurante refleje la <strong>excelencia</strong> de tu marca. Ofrecemos un servicio de limpieza detallado que garantiza un ambiente <strong>higiénico</strong>, <strong>acogedor</strong> y <strong>profesional</strong> para tus clientes y tu equipo. Desde la desinfección de superficies hasta el brillo de los escaparates, cuidamos cada rincón para que tu negocio destaque por su <strong>impecable presentación</strong>.",
    imageUrl: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: PlanetIcon
  },
   {
    title: "Limpiezas de Fin de Obra",
    description: "Una reforma o construcción genera una gran cantidad de suciedad difícil de eliminar. Nuestro equipo especializado se encarga de la limpieza <strong>profunda</strong> post-obra, eliminando polvo, restos de pintura, cemento y cualquier residuo. Dejamos el espacio completamente <strong>listo</strong> para ser habitado o inaugurado, con un nivel de limpieza <strong>exhaustivo</strong> que te permitirá disfrutar de tu nuevo proyecto desde el primer momento, sin preocuparte por nada.",
    imageUrl: "https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    icon: DropletIcon
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="bg-light py-10 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">Servicios de Limpieza Ecológica</h1>
          <p className="mt-2 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">Soluciones profesionales para cada tipo de espacio.</p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 space-y-16 md:space-y-20">
          {services.map((service, index) => (
            <div key={service.title} className="grid md:grid-cols-5 gap-12 items-center">
              <div className={`md:col-span-2 ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                <img src={service.imageUrl} alt={service.title} className="rounded-lg shadow-2xl w-full aspect-video object-cover" />
              </div>
              <div className="md:col-span-3">
                 <service.icon className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">{service.title}</h2>
                <p className="text-base md:text-lg text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: service.description }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">¿Listo para transformar tu espacio?</h2>
            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">Contacta con nosotros para obtener un presupuesto personalizado y sin compromiso. Descubre cómo la limpieza ecológica puede crear un ambiente de <strong>paz</strong> y <strong>bienestar</strong> en tu hogar o negocio.</p>
            <NavLink to="/contacto" className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 text-lg">
                Solicitar Información Ahora
            </NavLink>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;