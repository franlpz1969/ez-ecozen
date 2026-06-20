import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form data submitted:', formData);
        setSubmitted(true);
        // Reset form after submission for demo purposes
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setSubmitted(false);
        }, 5000);
    };

  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="bg-light py-10 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">Contacto</h1>
          <p className="mt-2 text-base md:text-lg text-gray-700">Estamos aquí para ayudarte. Pide tu presupuesto sin compromiso.</p>
        </div>
      </section>

      {/* Contact Form & Map/Info */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">Envíanos un mensaje</h2>
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
                  <strong className="font-bold">¡Gracias!</strong>
                  <span className="block sm:inline"> Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" />
                  </div>
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                    <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 text-lg">
                      Enviar Presupuesto
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Map and Info */}
            <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Nuestra Zona de Actuación</h2>
                 <p className="text-base md:text-lg text-gray-700 mb-8">
                   Ofrecemos nuestros servicios principalmente en la <strong>zona Oeste y Noroeste de Madrid</strong>.
                 </p>
                <div className="rounded-lg shadow-xl overflow-hidden border-4 border-white mb-12">
                    <iframe
                        title="Zona de actuación de EcoZen"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d155308.2327708518!2d-3.901509148437492!3d40.48512686817293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1716382942475!5m2!1ses!2ses"
                        className="w-full h-96"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        // FIX: Corrected invalid referrerPolicy value.
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;