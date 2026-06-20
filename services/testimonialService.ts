import { Testimonial } from "../types";

// IMPORTANTE: URL de la aplicación web de Google Apps Script.
// Pega aquí la URL de tu script publicado para conectar con Google Sheets.
// Si se deja en blanco, la aplicación usará datos de prueba y funcionará en modo local.
const SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbyP5sUFZWbyMlDW0TXVp111TQskYRTt3Yqy-Pk8rK3gbg27qLmwviBs9GEeheSZvdCHbg/exec';

/**
 * Obtiene todas las reseñas desde el backend de Google Sheets.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!SCRIPT_URL) {
    console.warn("MODO DE PRUEBA: Usando datos de ejemplo porque la URL del Apps Script no está configurada en services/testimonialService.ts.");
    // Devuelve datos de ejemplo para desarrollo si la URL no está configurada.
    return [
        { quote: "El equipo de EcoZen ha transformado mi hogar. No es solo una limpieza, es una renovación de la energía del espacio. Vuelvo a casa y siento una paz increíble. ¡Gracias!", author: "Marta S.", location: "Aravaca", rating: 5 },
        { quote: "Servicio impecable y muy profesional. Dejaron nuestro piso de fin de obra listo para entrar a vivir, eliminando hasta la última mota de polvo. El trato fue excelente.", author: "David L.", location: "Torrelodones", rating: 5 },
        { quote: "Como madre, valoro muchísimo que utilicen productos 100% naturales. La casa queda reluciente y huele a limpio de verdad, no a químicos. Totalmente recomendables.", author: "Isabel C.", location: "Villaviciosa de Odón", rating: 5 },
        { quote: "Contratamos la limpieza para nuestra tienda y la diferencia es abismal. Los clientes han notado el cambio. Aporta una imagen de cuidado y profesionalidad que buscábamos.", author: "Javier F.", location: "Madrid Centro", rating: 5 },
        { quote: "Puntualidad, eficiencia y un cuidado por los detalles que se agradece. Son un equipo fantástico y muy respetuoso. Se han convertido en un imprescindible para nosotros.", author: "Laura V.", location: "Pozuelo de Alarcón", rating: 5 },
        { quote: "Al principio era escéptico con lo de la 'limpieza energética', pero el resultado me ha sorprendido. El ambiente se siente más ligero y armonioso. Es una experiencia que va más allá de la limpieza.", author: "Miguel R.", location: "Majadahonda", rating: 5 }
    ].reverse();
  }

  try {
    const response = await fetch(SCRIPT_URL);
    if (!response.ok) {
      throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      if (data && data.error) {
        // Este error específico de Google Sheets indica que la hoja está vacía (no tiene filas de datos).
        // En lugar de tratarlo como un error fatal, lo interpretamos como un estado válido (no hay reseñas)
        // y devolvemos un array vacío para que la UI muestre el mensaje correspondiente.
        if (typeof data.error === 'string' && data.error.includes("The number of rows in the range must be at least 1")) {
          console.log("La hoja de Google Sheets no contiene reseñas. Se mostrará la lista vacía.");
          return [];
        }
        // Para cualquier otro error del script, lo lanzamos para que se muestre al usuario.
        throw new Error(`Error devuelto por el script de Google: ${data.error}`);
      }
      throw new Error("El formato de los datos recibidos desde Google Sheets no es un array válido.");
    }

    // FIX: Se reimplementa la validación de datos con un patrón map-then-filter para mayor robustez.
    // Este enfoque sanea cada elemento de la hoja de Google de forma individual, convierte los elementos válidos
    // en objetos Testimonial y descarta cualquier entrada mal formada o incompleta (como filas vacías)
    // antes de que puedan causar un error en la aplicación.
    const testimonials: Testimonial[] = data
      .map((item: any): Testimonial | null => {
        // Un elemento solo es válido si es un objeto con las propiedades y tipos requeridos.
        if (
          !item ||
          typeof item !== 'object' ||
          typeof item.quote !== 'string' || item.quote.trim() === '' ||
          typeof item.author !== 'string' || item.author.trim() === '' ||
          typeof item.rating !== 'number' || item.rating < 1 || item.rating > 5
        ) {
          // Descarta elementos inválidos devolviendo null.
          return null;
        }

        // Crea el objeto Testimonial válido.
        return {
          quote: item.quote.trim(),
          author: item.author.trim(),
          rating: item.rating,
          location: (item.location && typeof item.location === 'string' && item.location.trim() !== '') 
                      ? item.location.trim() 
                      : 'Ubicación no especificada',
        };
      })
      // Elimina todas las entradas nulas, resultando en un array limpio de objetos Testimonial válidos.
      .filter((testimonial): testimonial is Testimonial => testimonial !== null);
    
    // La hoja de cálculo devuelve las reseñas en orden cronológico (antiguas primero).
    // Las invertimos para mostrar las más nuevas primero.
    return testimonials.reverse();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
    console.error("Error al obtener testimonios desde Google Sheets:", errorMessage);

    if (errorMessage.includes("Cannot read properties of null (reading 'getRange')")) {
        throw new Error("El script de Google no puede encontrar la hoja de cálculo. Por favor, revisa que la variable 'SHEET_NAME' en tu script coincida exactamente con el nombre de la pestaña en tu archivo de Google Sheets. También verifica que 'SPREADSHEET_ID' sea correcto.");
    }

    throw new Error(`No se pudieron cargar las reseñas. Esto puede deberse a un problema de CORS o de red. Detalle: ${errorMessage}`);
  }
}

/**
 * Añade una nueva reseña enviándola al backend de Google Sheets.
 * @param review La nueva reseña a añadir.
 * @returns Una promesa que se resuelve a `true` si fue exitoso.
 */
export async function addTestimonial(review: Testimonial): Promise<boolean> {
  if (!SCRIPT_URL) {
    console.warn("MODO DE PRUEBA: La URL de Google Apps Script no está configurada. La reseña se añadirá localmente pero no se guardará de forma persistente. Para guardar reseñas, edita `services/testimonialService.ts` y añade tu URL en la constante SCRIPT_URL.");
    // En modo de prueba, simulamos que la operación fue exitosa para que la UI funcione.
    return true;
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Cuerpo de la respuesta de error del servidor:", errorBody);
      throw new Error(`El servidor respondió con un error: ${response.status} ${response.statusText}`);
    }

    // Un script de Google bien diseñado devolverá una respuesta JSON.
    // La parseamos para verificar si la operación tuvo éxito en el servidor.
    const result = await response.json();

    if (result && result.result === 'error') {
      console.error("Error comunicado por el script de Google:", result.message);
      throw new Error(result.message || 'El script de Google devolvió un error no especificado.');
    }

    return true;

  } catch (error) {
    console.error("Error al añadir la reseña:", error);

    const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido.";

    // Errores de red o CORS a menudo se manifiestan como 'Failed to fetch'.
    if (errorMessage.includes('Failed to fetch')) {
        throw new Error("No se pudo guardar la reseña. Verifica tu conexión a internet. Si el problema persiste, puede ser un error de configuración de CORS en el script de Google. Asegúrate de que el script esté desplegado para acceso anónimo y pueda recibir peticiones POST.");
    }

    // Si el error es de JSON (porque la respuesta no fue JSON), damos una pista.
    if (errorMessage.includes('Unexpected token')) {
       throw new Error("La respuesta del servidor no era un JSON válido. Revisa el script de Google para asegurarte de que devuelve una respuesta JSON correcta, incluso en caso de error.");
    }
    
    // Re-lanzamos el error para que sea manejado por el componente.
    throw new Error(`Error al añadir la reseña: ${errorMessage}`);
  }
}
