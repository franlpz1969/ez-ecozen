const TIPS_BY_KEYWORD: Record<string, string> = {
  café: 'Para manchas de café, mezcla bicarbonato con unas gotas de agua hasta formar una pasta. Aplica sobre la mancha, deja actuar 15 minutos y enjuaga con agua tibia. El bicarbonato neutraliza el ácido del café sin dañar las fibras.',
  vino: 'Esparce sal gorda sobre la mancha de vino tinto recién hecha para absorber el líquido. Después, aplica una mezcla de agua oxigenada y jabón neutro. Evita frotar con fuerza para no fijar la mancha.',
  grasa: 'El vinagre blanco diluido en agua tibia (1:1) disuelve la grasa de cocina de forma natural. Rocía la superficie, espera 10 minutos y limpia con un paño de microfibra.',
  horno: 'Haz una pasta con bicarbonato y agua, extiéndela por el interior del horno y deja reposar toda la noche. Al día siguiente, retira con un paño húmedo. Sin químicos agresivos y con resultados excelentes.',
  baño: 'Mezcla vinagre blanco y agua en partes iguales en un pulverizador. Rocía azulejos y grifería, deja actuar 5 minutos y seca con un paño. El vinagre elimina cal y bacterias de forma ecológica.',
  cristal: 'Limpia cristales con una solución de agua, vinagre blanco y unas gotas de zumo de limón. Usa papel de periódico o un paño de microfibra para un acabado sin rayas.',
  suelo: 'Añade media taza de vinagre blanco al cubo de fregado para suelos. El vinagre desinfecta y deja un brillo natural sin residuos químicos.',
  alfombra: 'Espolvorea bicarbonato sobre la alfombra y deja reposar 30 minutos antes de aspirar. Neutraliza olores y refresca las fibras sin productos sintéticos.',
  microondas: 'Coloca un bol con agua y rodajas de limón dentro del microondas. Calienta 3 minutos: el vapor ablanda la suciedad y el limón desodoriza. Limpia con un paño húmedo.',
  nevera: 'Limpia el interior con una mezcla de agua tibia y bicarbonato. Elimina olores y manchas sin dejar residuos tóxicos cerca de los alimentos.',
  moho: 'Aplica vinagre blanco puro sobre la zona afectada y deja actuar una hora. El vinagre inhibe el moho de forma natural. Ventila bien el espacio después.',
  juntas: 'Haz una pasta de bicarbonato y agua oxigenada, aplícala en las juntas del baño con un cepillo de dientes viejo y deja actuar 30 minutos antes de enjuagar.',
  plancha: 'Pasa una mezcla de sal y vinagre caliente por la base de la plancha para eliminar residuos. Funciona sin productos abrasivos.',
  plata: 'Limpia la plata con una pasta de bicarbonato y agua, frotando suavemente con un paño suave. Recupera el brillo sin químicos agresivos.',
  madera: 'Limpia muebles de madera con un paño humedecido en una mezcla de aceite de oliva y limón (2:1). Nutre la madera y le da un acabado natural.',
};

const GENERAL_TIPS = [
  'Mezcla vinagre blanco y agua en partes iguales en un pulverizador reutilizable. Es un limpiador multiusos ecológico ideal para la mayoría de superficies del hogar.',
  'El bicarbonato de sodio es tu mejor aliado: neutraliza olores, desengrasa suavemente y funciona como abrasivo suave. Guárdalo en un bote hermético cerca de la cocina.',
  'El zumo de limón fresco combina poder desinfectante y aroma natural. Úsalo en superficies no porosas y siempre enjuaga después.',
  'La sal gorda absorbe líquidos derramados al instante. Tenla a mano en la cocina para emergencias con vino, café o salsa.',
  'Los paños de microfibra reducen el uso de productos químicos: capturan polvo y suciedad con solo agua. Lávalos sin suavizante para mantener su efectividad.',
];

function findTipForTopic(topic: string): string | null {
  const normalized = topic.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

  for (const [keyword, tip] of Object.entries(TIPS_BY_KEYWORD)) {
    const normalizedKeyword = keyword.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    if (normalized.includes(normalizedKeyword)) {
      return tip;
    }
  }

  return null;
}

export async function generateCleaningTip(topic: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const matchedTip = findTipForTopic(topic);
  if (matchedTip) {
    return matchedTip;
  }

  const genericTip = GENERAL_TIPS[Math.floor(Math.random() * GENERAL_TIPS.length)];
  return `Para "${topic}", te recomendamos empezar con una solución suave de vinagre blanco diluido en agua tibia. Prueba primero en una zona pequeña. ${genericTip}`;
}