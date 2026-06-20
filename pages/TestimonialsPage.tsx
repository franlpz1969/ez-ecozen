import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { getTestimonials, addTestimonial } from '../services/testimonialService';
import { UserIcon } from '../components/icons/UserIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { XIcon } from '../components/icons/XIcon';
import Spinner from '../components/Spinner';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <StarIcon 
                key={i} 
                className={`w-5 h-5 ${i <= rating ? 'text-secondary' : 'text-gray-300'}`} 
            />
        );
    }
    return <div className="flex justify-center items-center gap-1">{stars}</div>;
};

const TestimonialsPage: React.FC = () => {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [newReview, setNewReview] = useState({
    quote: '',
    author: '',
    location: '',
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const testimonials = await getTestimonials();
        setAllTestimonials(testimonials);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido al cargar las reseñas.';
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const openReviewModal = () => {
    // Reset form state each time the modal is opened for a clean slate.
    setNewReview({ quote: '', author: '', location: '', rating: 0 });
    setSubmissionError(null);
    setHoverRating(0);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newReview.author || !newReview.quote || newReview.rating === 0) {
      return; // Button is disabled, so this is a safeguard.
    }
    
    setIsSubmitting(true);
    setSubmissionError(null);
    const reviewWithDefaults: Testimonial = {
        ...newReview,
        location: newReview.location || 'Ubicación no especificada',
    };

    try {
        await addTestimonial(reviewWithDefaults);
        
        setAllTestimonials(prev => [reviewWithDefaults, ...prev]);
        
        setIsModalOpen(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
        console.error("Error al añadir la reseña:", err);
        setSubmissionError(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="bg-light py-10 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">Qué dicen nuestros clientes</h1>
          <p className="mt-2 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            La satisfacción y el bienestar de quienes confían en nosotros es nuestra mayor recompensa.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          {loading && (
             <div className="flex justify-center items-center py-20">
                <Spinner text="Cargando reseñas..." />
             </div>
          )}
          {error && (
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
                <p className="font-bold">Error al cargar las reseñas</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          {!loading && !error && allTestimonials.length === 0 && (
            <div className="text-center">
              <p className="text-lg text-gray-600">Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!</p>
            </div>
          )}
           {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allTestimonials.filter(Boolean).map((testimonial, index) => (
                <div 
                  key={`${index}-${testimonial.author}`} 
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 border-2 border-secondary">
                    <UserIcon className="w-8 h-8 text-primary" />
                  </div>
                  <blockquote className="text-base text-gray-600 italic flex-grow">
                    <p>"{testimonial.quote}"</p>
                  </blockquote>
                  <div className="my-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <div>
                    <p className="font-bold text-dark text-base">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Add Review Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          {submitted ? (
             <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md animate-fade-in" role="alert">
              <p className="font-bold text-lg">¡Gracias por tu reseña!</p>
              <p>Tu valoración ha sido añadida. Agradecemos mucho tu tiempo.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">Comparte tu experiencia</h2>
              <p className="text-base md:text-lg text-gray-700 mb-8">
                Tu opinión nos ayuda a mejorar y a que otros conozcan nuestro servicio.
              </p>
              <button
                onClick={openReviewModal}
                className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
              >
                Escribe tu reseña
              </button>
            </>
          )}
        </div>
      </section>
      
      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-lg relative animate-fade-in">
            <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                aria-label="Cerrar modal"
                disabled={isSubmitting}
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h3 className="text-xl md:text-2xl font-bold text-dark mb-6 text-center">Deja tu valoración</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
                  <input type="text" name="author" id="author" required value={newReview.author} onChange={handleInputChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" placeholder="Ej: Ana García" />
                </div>
                 <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Tu Localidad (Opcional)</label>
                  <input type="text" name="location" id="location" value={newReview.location} onChange={handleInputChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" placeholder="Ej: Madrid" />
                </div>
                <div>
                  <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-1">Tu Reseña</label>
                  <textarea name="quote" id="quote" rows={4} required value={newReview.quote} onChange={handleInputChange} className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-dark placeholder-gray-500" placeholder="Cuéntanos qué te ha parecido el servicio..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tu Valoración</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-gray-300 transition-colors duration-150 focus:outline-none"
                        aria-label={`Valorar con ${star} estrellas`}
                      >
                        <StarIcon className={`w-8 h-8 cursor-pointer ${star <= (hoverRating || newReview.rating) ? 'text-secondary' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {submissionError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
                       <p><strong className="font-bold">Error al enviar:</strong> {submissionError}</p>
                    </div>
                )}
                
                <div>
                  <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 text-lg disabled:bg-green-300 disabled:cursor-not-allowed mt-2"
                    disabled={!newReview.author || !newReview.quote || newReview.rating === 0 || isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Valoración'}
                  </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;