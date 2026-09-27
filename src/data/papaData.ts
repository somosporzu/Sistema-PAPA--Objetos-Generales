import {
  RarityKey,
  RarityInfo,
  CatalogProperty,
  CatalogRequirement,
  CatalogCurse,
  SpellLevel,
  RechargeType,
  CompatibilityType,
  PapaItem
} from '../types/papa';

export const RARITIES: Record<RarityKey, RarityInfo> = {
  poco_comun: {
    id: 'poco_comun',
    name: 'Poco Común',
    minPf: 3,
    maxPf: 5,
    maxPowerWithoutCurse: 5,
    maxPowerWithCurse: 7,
    priceRange: '200 – 500 L',
    availability: 'Ciudades medianas, gremios o mercados especializados',
    color: '#8CA568',
    badgeBg: 'rgba(140, 165, 104, 0.15)',
    badgeBorder: 'rgba(140, 165, 104, 0.4)',
    attributeLimit: '+1 total',
    combatBonusLimit: '+1 (Ataque, Daño, Defensa), +2 Iniciativa',
    hpLimit: '+5 Resistencia máx'
  },
  raro: {
    id: 'raro',
    name: 'Raro',
    minPf: 6,
    maxPf: 10,
    maxPowerWithoutCurse: 10,
    maxPowerWithCurse: 13,
    priceRange: '500 – 2.000 L',
    availability: 'Ciudades grandes, casas nobles, templos o talleres famosos',
    color: '#4FA3E3',
    badgeBg: 'rgba(79, 163, 227, 0.15)',
    badgeBorder: 'rgba(79, 163, 227, 0.4)',
    attributeLimit: '+1 total',
    combatBonusLimit: '+1 (Ataque, Daño, Defensa), +2 Iniciativa',
    hpLimit: '+5 Resistencia máx'
  },
  muy_raro: {
    id: 'muy_raro',
    name: 'Muy Raro',
    minPf: 11,
    maxPf: 15,
    maxPowerWithoutCurse: 15,
    maxPowerWithCurse: 19,
    priceRange: '2.000 – 10.000 L',
    availability: 'Uno por región, reino, orden, templo mayor o tradición',
    color: '#B574D8',
    badgeBg: 'rgba(181, 116, 216, 0.15)',
    badgeBorder: 'rgba(181, 116, 216, 0.4)',
    attributeLimit: '+2 total (+1 a dos o +2 específico)',
    combatBonusLimit: '+2 (Ataque, Daño, Defensa), +4 Iniciativa',
    hpLimit: '+10 Resistencia máx'
  },
  legendario: {
    id: 'legendario',
    name: 'Legendario',
    minPf: 16,
    maxPf: 25,
    maxPowerWithoutCurse: 25,
    maxPowerWithCurse: 32,
    priceRange: 'No suele tener precio',
    availability: 'Único o casi único; ligado a héroes, guerras o linajes',
    color: '#E5CB7D',
    badgeBg: 'rgba(229, 203, 125, 0.18)',
    badgeBorder: 'rgba(229, 203, 125, 0.5)',
    attributeLimit: '+3 total (+1 a tres o +3 específico con requisito/maldición)',
    combatBonusLimit: '+3 (Ataque, Daño, Defensa), +6 Iniciativa',
    hpLimit: '+15 Resistencia máx'
  },
  artefacto: {
    id: 'artefacto',
    name: 'Artefacto',
    minPf: 26,
    maxPf: 999,
    maxPowerWithoutCurse: 999,
    maxPowerWithCurse: 999,
    priceRange: 'No se puede comprar',
    availability: 'Único, cosmológico o de importancia histórica extrema',
    color: '#E02B69',
    badgeBg: 'rgba(224, 43, 105, 0.2)',
    badgeBorder: 'rgba(224, 43, 105, 0.6)',
    attributeLimit: 'Sin límite fijo (centro de campaña)',
    combatBonusLimit: '+3+ (centro de campaña)',
    hpLimit: '+15+ Resistencia máx'
  }
};

export const SPELL_LEVEL_DATA: Record<SpellLevel, { basePf: number; extraChargePf: number; saveDc: number }> = {
  1: { basePf: 2, extraChargePf: 1, saveDc: 9 },
  2: { basePf: 4, extraChargePf: 2, saveDc: 12 },
  3: { basePf: 7, extraChargePf: 4, saveDc: 14 },
  4: { basePf: 11, extraChargePf: 6, saveDc: 16 },
  5: { basePf: 16, extraChargePf: 8, saveDc: 18 }
};

export const RECHARGE_FACTORS: Record<RechargeType, { factor: number; label: string; desc: string }> = {
  nunca: {
    factor: 1,
    label: 'Nunca',
    desc: 'Se rompe o pierde la función al agotar cargas (×1)'
  },
  descanso_largo: {
    factor: 2,
    label: 'Por Descanso Largo',
    desc: 'Recupera las cargas tras un Descanso Largo (×2)'
  },
  descanso_corto: {
    factor: 3,
    label: 'Por Descanso Corto',
    desc: 'Recupera las cargas tras un Descanso Corto (×3)'
  },
  libre: {
    factor: 5,
    label: 'Libre / Ilimitada',
    desc: 'Activación libre bajo condición narrativa clara (×5, ignora cargas)'
  }
};

export const COMPATIBILITY_ADJUSTMENT: Record<CompatibilityType, { cost: number; label: string; desc: string }> = {
  compatible: {
    cost: 0,
    label: 'Compatible (+0 PF)',
    desc: 'Energía afín a la Senda del portador o encaja claramente con su identidad'
  },
  neutral: {
    cost: 1,
    label: 'Neutral (+1 PF)',
    desc: 'No pertenece a una Energía afín, pero tampoco la contradice'
  },
  incompatible: {
    cost: 2,
    label: 'Incompatible (+2 PF o requisito fuerte)',
    desc: 'Contradice Senda, Naturaleza, Herencia, juramento o Energía contraria'
  }
};

export const PROPERTY_CATEGORIES = [
  { id: 'atributos', name: 'Atributos' },
  { id: 'combate', name: 'Combate' },
  { id: 'resistencia_movimiento', name: 'Resistencia y Movimiento' },
  { id: 'salvaciones_conceptos', name: 'Salvaciones, Conceptos y Naturalezas' },
  { id: 'ventaja_tiradas', name: 'Ventaja en Tiradas' },
  { id: 'sentidos_resistencias', name: 'Sentidos y Resistencias' },
  { id: 'equipo_herramientas', name: 'Armas, Armaduras y Herramientas' },
  { id: 'sociales_almacenamiento', name: 'Social, Almacenaje y Utilidad' },
] as const;

export const CATALOG_PROPERTIES: CatalogProperty[] = [
  // Bonificadores a Atributos
  {
    id: 'attr_1_specific',
    category: 'atributos',
    name: '+1 a un Atributo específico',
    cost: 4,
    notes: 'Elegir Cuerpo, Destreza o Aura al crear el objeto.',
    requiresInput: '¿Qué Atributo? (Cuerpo, Destreza o Aura)'
  },
  {
    id: 'attr_1_condition',
    category: 'atributos',
    name: '+1 a un Atributo bajo condición concreta',
    cost: 2,
    notes: 'La condición debe ser frecuente pero limitada (ej. Cuerpo solo al levantar/empujar; Destreza solo al trepar/equilibrio; Aura solo al resistir miedo).',
    requiresInput: 'Atributo y condición específica'
  },
  {
    id: 'attr_1_two',
    category: 'atributos',
    name: '+1 a dos Atributos',
    cost: 7,
    notes: 'Solo Muy Raro o superior.',
    minRarity: 'muy_raro',
    requiresInput: 'Los dos Atributos elegidos'
  },
  {
    id: 'attr_1_three',
    category: 'atributos',
    name: '+1 a los tres Atributos',
    cost: 12,
    notes: 'Solo Legendario o superior.',
    minRarity: 'legendario'
  },
  {
    id: 'attr_2_specific',
    category: 'atributos',
    name: '+2 a un Atributo específico',
    cost: 10,
    notes: 'Solo Muy Raro+. Cuenta como bono mayor.',
    minRarity: 'muy_raro',
    requiresInput: '¿Qué Atributo? (Cuerpo, Destreza o Aura)'
  },
  {
    id: 'attr_3_specific',
    category: 'atributos',
    name: '+3 a un Atributo específico',
    cost: 18,
    notes: 'Solo Legendario+. Requiere requisito o maldición fuerte.',
    minRarity: 'legendario',
    requiresInput: '¿Qué Atributo?'
  },

  // Bonificadores de combate
  {
    id: 'combat_atk_1',
    category: 'combate',
    name: '+1 a tiradas de ataque',
    cost: 3,
    notes: 'Solo armas o focos ofensivos.'
  },
  {
    id: 'combat_dmg_1',
    category: 'combate',
    name: '+1 al daño',
    cost: 3,
    notes: 'Solo armas o focos ofensivos.'
  },
  {
    id: 'combat_atk_1_cond',
    category: 'combate',
    name: '+1 a tiradas de ataque bajo condición',
    cost: 2,
    notes: 'Requiere condición concreta (ej. contra objetivos no detectados, en penumbra).',
    requiresInput: 'Condición de ataque'
  },
  {
    id: 'combat_dmg_1_cond',
    category: 'combate',
    name: '+1 al daño bajo condición',
    cost: 2,
    notes: 'Requiere condición concreta (ej. contra no-muertos, al golpear por la espalda).',
    requiresInput: 'Condición de daño'
  },
  {
    id: 'combat_def_1',
    category: 'combate',
    name: '+1 a Defensa',
    cost: 3,
    notes: 'Armaduras, escudos o accesorios defensivos.'
  },
  {
    id: 'combat_def_1_cond',
    category: 'combate',
    name: '+1 a Defensa bajo condición',
    cost: 2,
    notes: 'Requiere condición clara (ej. si no te moviste voluntariamente).',
    requiresInput: 'Condición de defensa'
  },
  {
    id: 'combat_init_2',
    category: 'combate',
    name: '+2 a Iniciativa',
    cost: 2,
    notes: 'Accesorios, armas ligeras o calzado especial.'
  },
  {
    id: 'combat_init_2_cond',
    category: 'combate',
    name: '+2 a Iniciativa bajo condición',
    cost: 1,
    notes: 'Requiere condición clara.',
    requiresInput: 'Condición de iniciativa'
  },

  // Resistencia y movimiento
  {
    id: 'res_max_3',
    category: 'resistencia_movimiento',
    name: '+3 Resistencia máxima',
    cost: 2,
    notes: 'Adecuado para Poco Común.'
  },
  {
    id: 'res_max_5',
    category: 'resistencia_movimiento',
    name: '+5 Resistencia máxima',
    cost: 3,
    notes: 'Límite normal en Raro o inferior.'
  },
  {
    id: 'res_max_10',
    category: 'resistencia_movimiento',
    name: '+10 Resistencia máxima',
    cost: 7,
    notes: 'Solo Muy Raro+.',
    minRarity: 'muy_raro'
  },
  {
    id: 'res_max_15',
    category: 'resistencia_movimiento',
    name: '+15 Resistencia máxima',
    cost: 12,
    notes: 'Solo Legendario+.',
    minRarity: 'legendario'
  },
  {
    id: 'mov_impulso',
    category: 'resistencia_movimiento',
    name: 'Impulso adicional',
    cost: 3,
    notes: 'Una vez por turno, podés moverte 1 banda adicional sin gastar tu Movimiento normal.'
  },
  {
    id: 'mov_impulso_cond',
    category: 'resistencia_movimiento',
    name: 'Impulso adicional bajo condición',
    cost: 1,
    notes: 'Moverse 1 banda extra, pero solo bajo una condición concreta y frecuente.',
    requiresInput: 'Condición del impulso'
  },
  {
    id: 'mov_zancada_mayor',
    category: 'resistencia_movimiento',
    name: 'Zancada mayor',
    cost: 6,
    notes: 'Solo Muy Raro+. Tu Movimiento máximo sube una categoría (Cerca→Lejos, o Lejos→Distante) mientras portes el objeto.',
    minRarity: 'muy_raro'
  },
  {
    id: 'mov_ignorar_terreno',
    category: 'resistencia_movimiento',
    name: 'Ignorar terreno difícil específico',
    cost: 2,
    notes: 'Elegir tipo de terreno (ej. nieve, barro, escombros, agua poco profunda).',
    requiresInput: 'Tipo de terreno'
  },
  {
    id: 'mov_trepar',
    category: 'resistencia_movimiento',
    name: 'Velocidad de trepar igual al movimiento',
    cost: 4,
    notes: 'Requiere objeto adecuado (guantes con garras, botas adherentes).'
  },
  {
    id: 'mov_nado',
    category: 'resistencia_movimiento',
    name: 'Velocidad de nado igual al movimiento',
    cost: 3,
    notes: 'Requiere objeto adecuado (aletas, manto marino).'
  },
  {
    id: 'mov_caida_segura',
    category: 'resistencia_movimiento',
    name: 'Caída segura de banda Cerca o menor',
    cost: 2,
    notes: 'Ignora el daño de esa caída. No permite volar.'
  },
  {
    id: 'mov_planeo',
    category: 'resistencia_movimiento',
    name: 'Planeo limitado',
    cost: 3,
    notes: 'Requiere altura inicial.'
  },
  {
    id: 'mov_vuelo_sostenido',
    category: 'resistencia_movimiento',
    name: 'Vuelo sostenido',
    cost: 10,
    notes: 'Solo Muy Raro+. Debe tener límite, requisito o activación.',
    minRarity: 'muy_raro',
    requiresInput: 'Límite o modo de activación'
  },

  // Salvaciones, Conceptos y Naturalezas
  {
    id: 'salv_1_esp',
    category: 'salvaciones_conceptos',
    name: '+1 a una Salvación específica',
    cost: 2,
    notes: 'Cuerpo, Destreza o Aura.',
    requiresInput: 'Salvación (Cuerpo, Destreza o Aura)'
  },
  {
    id: 'salv_2_esp',
    category: 'salvaciones_conceptos',
    name: '+2 a una Salvación específica',
    cost: 5,
    notes: 'Solo Raro+.',
    minRarity: 'raro',
    requiresInput: 'Salvación (Cuerpo, Destreza o Aura)'
  },
  {
    id: 'salv_1_todas',
    category: 'salvaciones_conceptos',
    name: '+1 a todas las Salvaciones',
    cost: 6,
    notes: 'Solo Muy Raro+.',
    minRarity: 'muy_raro'
  },
  {
    id: 'salv_ventaja_fuente',
    category: 'salvaciones_conceptos',
    name: 'Ventaja contra una fuente concreta',
    cost: 3,
    notes: 'Venenos, miedo, fuego, enfermedades, etc.',
    requiresInput: 'Fuente concreta (ej. veneno, fuego)'
  },
  {
    id: 'inm_efecto_menor',
    category: 'salvaciones_conceptos',
    name: 'Inmunidad a un efecto menor específico',
    cost: 4,
    notes: 'Humo común, polvo, frío ambiental leve, etc.',
    requiresInput: 'Efecto menor'
  },
  {
    id: 'inm_estado_alterado',
    category: 'salvaciones_conceptos',
    name: 'Inmunidad a un estado alterado específico',
    cost: 8,
    notes: 'Solo Muy Raro+. Ej. Aturdido, Cegado, Paralizado.',
    minRarity: 'muy_raro',
    requiresInput: 'Estado alterado'
  },
  {
    id: 'concepto_1',
    category: 'salvaciones_conceptos',
    name: '+1 a un Concepto específico',
    cost: 3,
    notes: 'No otorga el Concepto, solo suma bonificador a tiradas con él.',
    requiresInput: 'Concepto (ej. Alquimista, Cazador)'
  },
  {
    id: 'concepto_2',
    category: 'salvaciones_conceptos',
    name: '+2 a un Concepto específico',
    cost: 7,
    notes: 'Solo Muy Raro+.',
    minRarity: 'muy_raro',
    requiresInput: 'Concepto'
  },
  {
    id: 'naturaleza_1',
    category: 'salvaciones_conceptos',
    name: '+1 a una Naturaleza específica',
    cost: 3,
    notes: 'Elegir Naturaleza al crear el objeto.',
    requiresInput: 'Naturaleza (ej. Astutamente, Ferozmente)'
  },
  {
    id: 'naturaleza_2',
    category: 'salvaciones_conceptos',
    name: '+2 a una Naturaleza específica',
    cost: 7,
    notes: 'Solo Muy Raro+.',
    minRarity: 'muy_raro',
    requiresInput: 'Naturaleza'
  },

  // Ventaja en tiradas concretas
  {
    id: 'ventaja_tirada_especifica',
    category: 'ventaja_tiradas',
    name: 'Ventaja en una tirada muy específica',
    cost: 2,
    notes: 'Ej: Abrir cerraduras simples, detectar veneno en comida.',
    requiresInput: 'Tirada específica'
  },
  {
    id: 'ventaja_familia_estrecha',
    category: 'ventaja_tiradas',
    name: 'Ventaja en una familia estrecha de tiradas',
    cost: 3,
    notes: 'Ej: Rastrear en nieve, trepar piedra, recordar historia militar.',
    requiresInput: 'Familia estrecha'
  },
  {
    id: 'ventaja_familia_amplia',
    category: 'ventaja_tiradas',
    name: 'Ventaja en una familia amplia de tiradas',
    cost: 5,
    notes: 'Ej: Rastrear criaturas, negociar precios, descifrar escrituras arcanas.',
    requiresInput: 'Familia amplia'
  },
  {
    id: 'ventaja_categoria_completa',
    category: 'ventaja_tiradas',
    name: 'Ventaja en una categoría completa de escenas',
    cost: 8,
    notes: 'Solo Muy Raro+. Ventaja en un ámbito completo de juego.',
    minRarity: 'muy_raro',
    requiresInput: 'Categoría de escenas'
  },

  // Sentidos, Resistencias e Inmunidades
  {
    id: 'sentido_penumbra',
    category: 'sentidos_resistencias',
    name: 'Visión en penumbra',
    cost: 2,
    notes: 'No permite ver en oscuridad total.'
  },
  {
    id: 'sentido_oscuridad_cerca',
    category: 'sentidos_resistencias',
    name: 'Visión en oscuridad total en banda Cerca',
    cost: 4,
    notes: 'No revela color ni detalles finos.'
  },
  {
    id: 'sentido_termico_cerca',
    category: 'sentidos_resistencias',
    name: 'Sentido térmico en banda Cerca',
    cost: 5,
    notes: 'No atraviesa muros gruesos.'
  },
  {
    id: 'sentido_ciego_cerca',
    category: 'sentidos_resistencias',
    name: 'Sentido ciego en banda Cerca',
    cost: 6,
    notes: 'Requiere sonido, vibración, eco o mecanismo definido.',
    requiresInput: 'Mecanismo (sonido, vibración, eco...)'
  },
  {
    id: 'detectar_magia_cerca',
    category: 'sentidos_resistencias',
    name: 'Detectar magia, energía o corrupción en banda Cerca',
    cost: 4,
    notes: 'Requiere Acción Principal o concentración breve.'
  },
  {
    id: 'reducir_dano_1_fuente',
    category: 'sentidos_resistencias',
    name: 'Reducir 1 daño de una fuente específica',
    cost: 3,
    notes: 'Fuego, veneno, armas cortantes, frío, etc.',
    requiresInput: 'Fuente de daño'
  },
  {
    id: 'reducir_dano_1_todas',
    category: 'sentidos_resistencias',
    name: 'Reducir 1 daño de todas las fuentes',
    cost: 7,
    notes: 'Solo Muy Raro+.',
    minRarity: 'muy_raro'
  },
  {
    id: 'resistencia_dano_especifico',
    category: 'sentidos_resistencias',
    name: 'Resistencia a un tipo de daño específico',
    cost: 6,
    notes: 'Solo Raro+.',
    minRarity: 'raro',
    requiresInput: 'Tipo de daño (ej. fuego, eléctrico)'
  },
  {
    id: 'inmunidad_dano_especifico',
    category: 'sentidos_resistencias',
    name: 'Inmunidad a un tipo de daño',
    cost: 14,
    notes: 'Solo Legendario+.',
    minRarity: 'legendario',
    requiresInput: 'Tipo de daño'
  },

  // Propiedades de arma, armadura, escudo y herramientas
  {
    id: 'eq_integrada',
    category: 'equipo_herramientas',
    name: 'Integrada',
    cost: 1,
    notes: 'No puede ser desarmada, pero ocupa esa mano.'
  },
  {
    id: 'eq_perforante',
    category: 'equipo_herramientas',
    name: 'Perforante',
    cost: 2,
    notes: 'Ignora 1 punto de Armadura del objetivo.'
  },
  {
    id: 'eq_paradora',
    category: 'equipo_herramientas',
    name: 'Paradora',
    cost: 2,
    notes: '1 vez por ronda, Reacción para +2 Defensa contra ataque cuerpo a cuerpo.'
  },
  {
    id: 'eq_doble_hoja',
    category: 'equipo_herramientas',
    name: 'Doble Hoja',
    cost: 2,
    notes: 'Si superas Defensa por 4 o más, +1 daño adicional.'
  },
  {
    id: 'eq_ligera',
    category: 'equipo_herramientas',
    name: 'Ligera',
    cost: 1,
    notes: 'Facilita maniobras rápidas o lucha cerrada.'
  },
  {
    id: 'eq_pesada',
    category: 'equipo_herramientas',
    name: 'Pesada',
    cost: -1,
    notes: 'Requiere Cuerpo adecuado o causa Desventaja en uso prolongado. (-1 PF al coste).'
  },
  {
    id: 'eq_retornante',
    category: 'equipo_herramientas',
    name: 'Retornante',
    cost: 3,
    notes: 'Si se lanza, vuelve al final del turno.'
  },
  {
    id: 'eq_cambio_dano',
    category: 'equipo_herramientas',
    name: 'Cambio de tipo de daño',
    cost: 2,
    notes: 'Tipo alternativo coherente (ej. de cortante a contundente o fuego).',
    requiresInput: 'Tipo alternativo'
  },
  {
    id: 'eq_mas_armadura',
    category: 'equipo_herramientas',
    name: '+1 a Armadura',
    cost: 3,
    notes: 'Cuenta dentro del límite de Defensa/protección.'
  },
  {
    id: 'eq_armadura_silenciosa',
    category: 'equipo_herramientas',
    name: 'Armadura silenciosa',
    cost: 3,
    notes: 'No impone Desventaja al Sigilo por ruido.'
  },
  {
    id: 'eq_escudo_anclado',
    category: 'equipo_herramientas',
    name: 'Escudo anclado',
    cost: 2,
    notes: 'Ventaja para resistir Empujes.'
  },
  {
    id: 'eq_herramienta_precisa',
    category: 'equipo_herramientas',
    name: 'Herramienta precisa',
    cost: 2,
    notes: '+1 a una tarea concreta del oficio.',
    requiresInput: 'Tarea concreta del oficio'
  },
  {
    id: 'eq_herramienta_maestra',
    category: 'equipo_herramientas',
    name: 'Herramienta maestra',
    cost: 3,
    notes: 'Ventaja en una tarea concreta del oficio.',
    requiresInput: 'Tarea concreta del oficio'
  },
  {
    id: 'eq_trabajo_sin_taller',
    category: 'equipo_herramientas',
    name: 'Trabajo sin taller',
    cost: 5,
    notes: 'Permite realizar una tarea de oficio sin taller completo, con límites.'
  },

  // Propiedades sociales, almacenamiento y activación menor
  {
    id: 'soc_apariencia_distinguida',
    category: 'sociales_almacenamiento',
    name: 'Apariencia distinguida',
    cost: 2,
    notes: '+1 para causar buena impresión en contexto específico.',
    requiresInput: 'Contexto de la impresión'
  },
  {
    id: 'soc_disfraz_esable',
    category: 'sociales_almacenamiento',
    name: 'Disfraz estable',
    cost: 3,
    notes: 'Ventaja para sostener una identidad concreta.',
    requiresInput: 'Identidad que sostiene'
  },
  {
    id: 'soc_insignia_reconocida',
    category: 'sociales_almacenamiento',
    name: 'Insignia reconocida',
    cost: 2,
    notes: 'Permite acceso social limitado si el símbolo tiene autoridad local.'
  },
  {
    id: 'soc_aura_intimidante',
    category: 'sociales_almacenamiento',
    name: 'Aura intimidante',
    cost: 3,
    notes: '+1 o Ventaja para intimidar bajo condición clara.',
    requiresInput: 'Condición para intimidar'
  },
  {
    id: 'soc_presencia_tranquilizadora',
    category: 'sociales_almacenamiento',
    name: 'Presencia tranquilizadora',
    cost: 3,
    notes: '+1 o Ventaja para calmar o mediar.'
  },
  {
    id: 'soc_compartimento_pequeno',
    category: 'sociales_almacenamiento',
    name: 'Compartimento oculto pequeño',
    cost: 1,
    notes: 'Oculta un objeto diminuto (anillo, gema, mensaje clave).'
  },
  {
    id: 'soc_compartimento_mediano',
    category: 'sociales_almacenamiento',
    name: 'Compartimento oculto mediano',
    cost: 2,
    notes: 'Oculta arma pequeña, documento o frasco.'
  },
  {
    id: 'soc_espacio_ampliado_menor',
    category: 'sociales_almacenamiento',
    name: 'Espacio ampliado menor',
    cost: 5,
    notes: 'Límite claro de peso y volumen interior superior al exterior.'
  },
  {
    id: 'soc_espacio_ampliado_mayor',
    category: 'sociales_almacenamiento',
    name: 'Espacio ampliado mayor',
    cost: 10,
    notes: 'Solo Muy Raro+. Almacena gran volumen y peso sin sobrecargar.',
    minRarity: 'muy_raro'
  },
  {
    id: 'soc_luz_tenue',
    category: 'sociales_almacenamiento',
    name: 'Luz tenue en banda Cerca',
    cost: 1,
    notes: 'Activación libre.'
  },
  {
    id: 'soc_luz_clara',
    category: 'sociales_almacenamiento',
    name: 'Luz clara en banda Cerca',
    cost: 2,
    notes: 'Activación libre o Acción Rápida.'
  },
  {
    id: 'soc_mensaje_pregrabado',
    category: 'sociales_almacenamiento',
    name: 'Mensaje breve pregrabado',
    cost: 2,
    notes: 'No permite comunicación libre; reproduce un mensaje específico.'
  }
];

export const CATALOG_REQUIREMENTS: CatalogRequirement[] = [
  { id: 'req_concepto_amplio', name: 'Concepto amplio relacionado', reduction: 1, notes: 'El portador debe tener un concepto general afín (ej. Explorador, Erudito).' },
  { id: 'req_concepto_especifico', name: 'Concepto específico', reduction: 2, notes: 'Ej. Herrero de Armas, Cazador de Sombras, Alquimista Real.' },
  { id: 'req_concepto_potenciado', name: 'Concepto específico potenciado +1', reduction: 3, notes: 'Requiere tener el concepto con al menos +1.' },
  { id: 'req_naturaleza_coherente', name: 'Naturaleza coherente', reduction: 1, notes: 'Actuar acorde a una Naturaleza general del objeto.' },
  { id: 'req_naturaleza_especifica', name: 'Naturaleza específica', reduction: 2, notes: 'Ej. Devotamente, Ferozmente, Pacientemente.' },
  { id: 'req_naturaleza_potenciada', name: 'Naturaleza específica potenciada +1', reduction: 3, notes: 'Requiere tener la Naturaleza con +1.' },
  { id: 'req_atributo_2', name: 'Atributo +2 o superior', reduction: 1, notes: 'Cuerpo, Destreza o Aura +2 o superior.', requiresInput: '¿Qué Atributo? (Cuerpo / Destreza / Aura)' },
  { id: 'req_atributo_3', name: 'Atributo +3 o superior', reduction: 2, notes: 'Cuerpo, Destreza o Aura +3 o superior.', requiresInput: '¿Qué Atributo?' },
  { id: 'req_atributo_4', name: 'Atributo +4 o superior', reduction: 3, notes: 'Cuerpo, Destreza o Aura +4 o superior.', requiresInput: '¿Qué Atributo?' },
  { id: 'req_senda_concreta', name: 'Senda concreta', reduction: 2, notes: 'Pertenecer a una Senda específica del sistema.' },
  { id: 'req_senda_habilidad', name: 'Habilidad concreta de Senda', reduction: 3, notes: 'Conocer una habilidad de senda específica.' },
  { id: 'req_senda_avanzada', name: 'Senda concreta y nivel avanzado', reduction: 4, notes: 'Portador de alto rango dentro de la Senda.' },
  { id: 'req_herencia_concreta', name: 'Requiere una Herencia concreta', reduction: 2, notes: 'Solo miembros de una estirpe o especie particular.' },
  { id: 'req_no_herencia', name: 'Requiere no ser de una Herencia concreta', reduction: 2, notes: 'Debe tener justificación narrativa (enemistad histórica, incompatibilidad biológica, etc.).' },
  { id: 'req_organizacion_amplia', name: 'Organización amplia', reduction: 1, notes: 'Miembro de un gremio, facción o ejército.' },
  { id: 'req_orden_templo', name: 'Orden, casa o templo específico', reduction: 2, notes: 'Iniciado o miembro juramentado de dicha institución.' },
  { id: 'req_juramento_activo', name: 'Juramento activo', reduction: 2, notes: 'Voto sagrado de no dañar inocentes, lealtad o voto de silencio.' },
  { id: 'req_linaje_sangre', name: 'Linaje, sangre o reconocimiento ritual', reduction: 3, notes: 'Vínculo sanguíneo o ritual de iniciación profunda.' },
  { id: 'req_entorno_comun', name: 'Entorno común pero no constante', reduction: 1, notes: 'Bajo cielo abierto, en tierra firme, de día.' },
  { id: 'req_entorno_especifico', name: 'Entorno específico', reduction: 2, notes: 'En contacto con agua natural, dentro de un bosque, en penumbra total.' },
  { id: 'req_entorno_raro', name: 'Entorno raro o difícil', reduction: 3, notes: 'Bajo tormenta eléctrica, en suelo consagrado, al amanecer exacto.' },
  { id: 'req_prep_1min', name: '1 minuto de preparación', reduction: 1, notes: 'Requiere concentración o preparativos antes del uso.' },
  { id: 'req_prep_10min', name: '10 minutos de preparación', reduction: 2, notes: 'Ritual breve de enfoque previo.' },
  { id: 'req_prep_1h', name: '1 hora de preparación', reduction: 3, notes: 'Alineación o recarga ritual extendida.' },
  { id: 'req_prep_descanso_largo', name: 'Preparación durante descanso largo', reduction: 4, notes: 'Debe meditarse o configurarse en cada descanso largo.' },
  { id: 'req_sintonia_simple', name: 'Sintonía simple', reduction: 1, notes: 'Ocupa un espacio de sintonía del personaje.' },
  { id: 'req_sintonia_coste_narrativo', name: 'Sintonía con coste narrativo', reduction: 2, notes: 'Exige una prueba personal, promesa o marca.' },
  { id: 'req_sintonia_exclusiva', name: 'Sintonía exclusiva', reduction: 3, notes: 'Impide sintonizar cualquier otro objeto de poder a la vez.' }
];

export const CATALOG_CURSES: CatalogCurse[] = [
  // Menores (+1 PF de Poder máx)
  {
    id: 'curse_marca_visible',
    intensity: 'menor',
    name: 'Marca visible',
    bonusCap: 1,
    effect: 'Deja una señal física o espiritual reconocible en el portador.'
  },
  {
    id: 'curse_voz_inquietante',
    intensity: 'menor',
    name: 'Voz inquietante',
    bonusCap: 1,
    effect: 'Susurra o vibra y puede delatar al portador en momentos inoportunos.'
  },
  {
    id: 'curse_rechazo_social_leve',
    intensity: 'menor',
    name: 'Rechazo social leve',
    bonusCap: 1,
    effect: 'Ciertos grupos desconfían abiertamente del portador si ven el objeto.'
  },
  {
    id: 'curse_hambre_menor',
    intensity: 'menor',
    name: 'Hambre menor',
    bonusCap: 1,
    effect: 'Exige una pequeña ofrenda, gota de sangre o gesto ritual diario.'
  },
  {
    id: 'curse_atraccion_menor',
    intensity: 'menor',
    name: 'Atracción menor',
    bonusCap: 1,
    effect: 'Criaturas o curiosos relacionados con el objeto pueden percibirlo a corta distancia.'
  },

  // Medias (+2 PF de Poder máx)
  {
    id: 'curse_penalizacion_naturaleza',
    intensity: 'media',
    name: 'Penalización de Naturaleza',
    bonusCap: 2,
    effect: '−1 al actuar con la Naturaleza opuesta a la del objeto.'
  },
  {
    id: 'curse_desventaja_social',
    intensity: 'media',
    name: 'Desventaja social concreta',
    bonusCap: 2,
    effect: 'Desventaja en interacciones frente a un grupo importante que reconoce el objeto.'
  },
  {
    id: 'curse_coste_resistencia',
    intensity: 'media',
    name: 'Coste de Resistencia',
    bonusCap: 2,
    effect: 'Cada activación mayor del objeto causa 1d6 Resistencia no reducible.'
  },
  {
    id: 'curse_impulso_compulsivo',
    intensity: 'media',
    name: 'Impulso compulsivo',
    bonusCap: 2,
    effect: 'Salvación de Aura ND 12 al usarlo o verte obligado a actuar según el impulso del objeto.'
  },
  {
    id: 'curse_fatiga_vinculo',
    intensity: 'media',
    name: 'Fatiga del vínculo',
    bonusCap: 2,
    effect: 'Si usas el poder mayor más de una vez entre descansos largos, ganas 1 Fatiga.'
  },
  {
    id: 'curse_eco_espiritual',
    intensity: 'media',
    name: 'Eco espiritual',
    bonusCap: 2,
    effect: 'Cada uso importante atrae atención espiritual, divina o corrupta en la zona.'
  },

  // Mayores (+3 PF de Poder máx)
  {
    id: 'curse_dano_inevitable',
    intensity: 'mayor',
    name: 'Daño inevitable',
    bonusCap: 3,
    effect: 'Cada activación principal causa 2d6 daño no reducible al portador.'
  },
  {
    id: 'curse_perdida_control',
    intensity: 'mayor',
    name: 'Pérdida de control',
    bonusCap: 3,
    effect: 'Salvación de Aura ND 13 o un impulso incontrolable toma el mando hasta el final del próximo turno.'
  },
  {
    id: 'curse_vulnerabilidad_marcada',
    intensity: 'mayor',
    name: 'Vulnerabilidad marcada',
    bonusCap: 3,
    effect: 'Mientras el objeto esté activo, recibes +2 daño de una fuente concreta (ej. fuego, radiante).'
  },
  {
    id: 'curse_entidad_vinculada',
    intensity: 'mayor',
    name: 'Entidad vinculada',
    bonusCap: 3,
    effect: 'Una entidad consciente e intrusiva habita dentro del objeto y disputa tus decisiones.'
  },

  // Legendarias (+4 a +7 PF de Poder máx)
  {
    id: 'curse_corrupcion_progresiva',
    intensity: 'legendaria',
    name: 'Corrupción progresiva',
    bonusCap: 5,
    effect: 'Cada uso mayor deja una marca o alteración permanente e irreversible.'
  },
  {
    id: 'curse_juramento_irreversible',
    intensity: 'legendaria',
    name: 'Juramento irreversible',
    bonusCap: 6,
    effect: 'Romper la causa, código o voto del objeto conlleva consecuencias destructivas inmediatas.'
  },
  {
    id: 'curse_precio_vida',
    intensity: 'legendaria',
    name: 'Precio de vida',
    bonusCap: 7,
    effect: 'Sacrifica años de vida, recuerdos esenciales, vínculos, Naturalezas, Conceptos o fragmentos del alma.'
  }
];

export const OFFICIAL_EXAMPLES: PapaItem[] = [
  {
    id: 'ex-botas-paso-largo',
    name: 'Botas del Paso Largo',
    type: 'Accesorio (Calzado)',
    targetRarity: 'poco_comun',
    concept: 'Equipo de explorador y mensajero veloz',
    descriptionWhat: 'Permite un impulso adicional de movimiento y una marcha cómoda que no fatiga.',
    descriptionWhy: 'Creadas para mensajeros de frontera y exploradores de terrenos agrestes.',
    descriptionPrice: 'Accesible para gremios organizados y exploradores contratados.',
    fullDescription: 'Botas de viaje para mensajeros y exploradores de frontera.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'mov_impulso',
        name: 'Impulso adicional',
        cost: 3,
        category: 'resistencia_movimiento',
        notes: 'Una vez por turno, podés moverte 1 banda adicional sin gastar tu Movimiento normal.'
      },
      {
        instanceId: 'p2',
        propertyId: 'custom_marcha',
        name: 'Marcha cómoda',
        cost: 1,
        category: 'resistencia_movimiento',
        notes: 'Marcha cómoda prolongada sin sufrir fatiga leve por caminata.'
      }
    ],
    spells: [],
    requirements: [],
    curses: [],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-cuchillo-mano-callada',
    name: 'Cuchillo de la Mano Callada',
    type: 'Arma (Daga)',
    targetRarity: 'raro',
    concept: 'Daga de asesino y espía de la noche',
    descriptionWhat: 'Ataques demoledores contra quienes no han detectado al portador, fácil de ocultar.',
    descriptionWhy: 'No fue creado para duelos honorables, sino para el instante en que nadie mira.',
    descriptionPrice: 'Prohibido en la mayoría de ciudades civilizadas; muy codiciado en el bajo mundo.',
    fullDescription: 'No fue creado para duelos honorables, sino para el instante en que nadie mira.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'combat_dmg_1_cond',
        name: '+1 daño bajo condición',
        cost: 2,
        category: 'combate',
        notes: 'Contra objetivo no detectado.',
        customDetail: 'Contra objetivo no detectado'
      },
      {
        instanceId: 'p2',
        propertyId: 'ventaja_tirada_especifica',
        name: 'Ventaja en una tirada muy específica',
        cost: 2,
        category: 'ventaja_tiradas',
        notes: 'Ventaja para ocultar el cuchillo en la ropa o equipo.',
        customDetail: 'Para ocultar el arma'
      },
      {
        instanceId: 'p3',
        propertyId: 'eq_ligera',
        name: 'Ligera',
        cost: 1,
        category: 'equipo_herramientas',
        notes: 'Facilita maniobras rápidas o lucha cerrada.'
      }
    ],
    spells: [
      {
        id: 's1',
        name: 'Filo que no se Anuncia',
        level: 1,
        charges: 1,
        recharge: 'descanso_largo',
        compatibility: 'compatible',
        energyAffinity: 'Destrucción / Metal',
        spellType: 'Contacto / Ataque',
        effect: '+1d6 daño si el objetivo no detectó al atacante.',
        saveDc: 9,
        calculatedPf: 4
      }
    ],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'custom_sigilo',
        name: 'Actuar Silenciosamente o Sutilmente',
        reduction: 1,
        customDetail: 'Requiere actuar Silenciosamente o Sutilmente para activar el Conjuro'
      }
    ],
    curses: [],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-escudo-umbral-azul',
    name: 'Escudo del Umbral Azul',
    type: 'Escudo',
    targetRarity: 'raro',
    concept: 'Baluarte defensivo inquebrantable',
    descriptionWhat: 'Al plantar los pies, ofrece una defensa inexpugnable e irradia una barrera ralentizante.',
    descriptionWhy: 'Cuando el portador planta los pies, el escudo pesa como una muralla.',
    descriptionPrice: 'Reliquia de guardianes de fortalezas de la guardia azul.',
    fullDescription: 'Cuando el portador planta los pies, el escudo pesa como una muralla.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'combat_def_1_cond',
        name: '+1 a Defensa bajo condición',
        cost: 2,
        category: 'combate',
        notes: 'Si no te moviste voluntariamente en tu último turno.',
        customDetail: 'Si no te moviste voluntariamente'
      },
      {
        instanceId: 'p2',
        propertyId: 'eq_escudo_anclado',
        name: 'Escudo anclado',
        cost: 2,
        category: 'equipo_herramientas',
        notes: 'Ventaja contra Empujes.'
      }
    ],
    spells: [
      {
        id: 's1',
        name: 'Guardia de Umbral',
        level: 1,
        charges: 1,
        recharge: 'descanso_largo',
        compatibility: 'compatible',
        energyAffinity: 'Orden',
        spellType: 'Área Cerca',
        effect: 'Alcance Cerca, Salvación de Cuerpo ND 9 o Ralentizado.',
        saveDc: 9,
        calculatedPf: 4
      }
    ],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'custom_quieto',
        name: 'Postura inamovible',
        reduction: 1,
        customDetail: 'No haberse movido voluntariamente desde el inicio del último turno'
      }
    ],
    curses: [],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-martillo-herrero-ausente',
    name: 'Martillo del Herrero Ausente',
    type: 'Herramienta (Martillo)',
    targetRarity: 'raro',
    concept: 'Herramienta de forja legendaria portátil',
    descriptionWhat: 'Permite reparar armaduras y forjar metales sin necesidad de un taller completo.',
    descriptionWhy: 'Golpea metal con un sonido limpio, como si respondiera a un ritmo secreto.',
    descriptionPrice: 'Perteneció a un maestro herrero errante que desapareció en las montañas.',
    fullDescription: 'Golpea metal con un sonido limpio, como si respondiera a un ritmo secreto.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'eq_herramienta_maestra',
        name: 'Herramienta maestra',
        cost: 3,
        category: 'equipo_herramientas',
        notes: 'Ventaja en Herrero para reparar armas o armaduras metálicas.',
        customDetail: 'Ventaja en Herrero para reparar armas o armaduras metálicas'
      },
      {
        instanceId: 'p2',
        propertyId: 'eq_trabajo_sin_taller',
        name: 'Trabajo sin taller',
        cost: 5,
        category: 'equipo_herramientas',
        notes: 'Permite realizar tareas de forja sin taller completo, con límites.'
      }
    ],
    spells: [],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'req_concepto_especifico',
        name: 'Concepto específico: Herrero',
        reduction: 2,
        customDetail: 'Requiere Concepto Herrero'
      }
    ],
    curses: [],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-mascara-profeta-ahogado',
    name: 'Máscara del Profeta Ahogado',
    type: 'Accesorio (Máscara)',
    targetRarity: 'muy_raro',
    concept: 'Reliquia abisal de adivinación e inundación',
    descriptionWhat: 'Permite respirar bajo el agua y convocar los ecos del abismo para confundir mentes.',
    descriptionWhy: 'Huele a sal vieja y hace oír agua detrás de los pensamientos.',
    descriptionPrice: 'Causa visiones inquietantes y rechazo social.',
    fullDescription: 'Huele a sal vieja y hace oír agua detrás de los pensamientos.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'custom_respirar_agua',
        name: 'Respirar bajo el agua',
        cost: 3,
        category: 'sentidos_resistencias',
        notes: 'Inmunidad a la asfixia por inmersión acuática.'
      },
      {
        instanceId: 'p2',
        propertyId: 'attr_1_condition',
        name: '+1 a un Atributo bajo condición',
        cost: 2,
        category: 'atributos',
        notes: '+1 Aura para visiones acuáticas y misterios de las profundidades.',
        customDetail: '+1 Aura para visiones acuáticas'
      }
    ],
    spells: [
      {
        id: 's1',
        name: 'Llamado del Fondo',
        level: 2,
        charges: 1,
        recharge: 'descanso_largo',
        compatibility: 'compatible',
        energyAffinity: 'Caos / Agua',
        spellType: 'Alcance Cerca',
        effect: 'Salvación de Aura ND 12 o Confundido.',
        saveDc: 12,
        calculatedPf: 8
      }
    ],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'req_entorno_especifico',
        name: 'Entorno específico: Agua natural',
        reduction: 2,
        customDetail: 'Debe estar en contacto con agua natural o vinculada al lugar'
      }
    ],
    curses: [
      {
        instanceId: 'c1',
        curseId: 'curse_obsesion_fondo',
        name: 'Obsesión del Fondo',
        intensity: 'media',
        bonusCap: 2,
        effect: 'Salvación de Aura ND 12 al despertar o sufrir Desventaja social no relacionada hasta el próximo descanso largo.'
      }
    ],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-lanza-quebracolmillos',
    name: 'Lanza Quebracolmillos',
    type: 'Arma (Lanza)',
    targetRarity: 'muy_raro',
    concept: 'Arma de caza de bestias colosales',
    descriptionWhat: 'Penetra corazas monstruosas y ejecuta un quiebre devastador que ignora resistencia.',
    descriptionWhy: 'Herramienta para obligar a un monstruo a quedarse donde el cazador quiere.',
    descriptionPrice: 'Arma de guerra forjada por los cazadores del norte.',
    fullDescription: 'Herramienta para obligar a un monstruo a quedarse donde el cazador quiere.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'custom_caza_gigantes',
        name: '+1 ataque y +1 daño contra tamaño Grande+',
        cost: 4,
        category: 'combate',
        notes: 'Bono combinado ofensivo contra criaturas grandes o superiores.'
      },
      {
        instanceId: 'p2',
        propertyId: 'eq_perforante',
        name: 'Perforante',
        cost: 2,
        category: 'equipo_herramientas',
        notes: 'Ignora 1 punto de Armadura del objetivo.'
      }
    ],
    spells: [
      {
        id: 's1',
        name: 'Quiebre de Colmillo',
        level: 2,
        charges: 1,
        recharge: 'descanso_largo',
        compatibility: 'compatible',
        energyAffinity: 'Destrucción / Metal',
        spellType: 'Contacto',
        effect: '+1d6 daño e ignora Resistencia del objetivo.',
        saveDc: 12,
        calculatedPf: 8
      }
    ],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'req_atributo_2',
        name: 'Atributo +2 o superior: Cuerpo',
        reduction: 1,
        customDetail: 'Requiere Cuerpo +2 o superior'
      }
    ],
    curses: [],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-corona-ceniza-devota',
    name: 'Corona de Ceniza Devota',
    type: 'Reliquia / Accesorio (Corona)',
    targetRarity: 'legendario',
    concept: 'Corona sagrada de mártires y guardianes',
    descriptionWhat: 'Eleva el Aura a cotas trascendentes y proyecta un Juramento que ampara a los aliados.',
    descriptionWhy: 'Madera quemada, hueso y metal ennegrecido; arde cuando el portador habla con fe.',
    descriptionPrice: 'No tolera a los cobardes ni a los traidores.',
    fullDescription: 'Madera quemada, hueso y metal ennegrecido; arde cuando el portador habla con fe.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'attr_1_specific',
        name: '+1 a un Atributo: Aura',
        cost: 4,
        category: 'atributos',
        notes: '+1 a Aura permanente.'
      },
      {
        instanceId: 'p2',
        propertyId: 'naturaleza_1',
        name: '+1 Devotamente en resistencia espiritual',
        cost: 2,
        category: 'salvaciones_conceptos',
        notes: 'Bono bajo condición en resistencia espiritual.'
      },
      {
        instanceId: 'p3',
        propertyId: 'salv_1_esp',
        name: '+1 a Salvación de Aura',
        cost: 2,
        category: 'salvaciones_conceptos',
        notes: '+1 en Salvaciones de Aura.'
      }
    ],
    spells: [
      {
        id: 's1',
        name: 'Juramento Encendido',
        level: 3,
        charges: 1,
        recharge: 'descanso_largo',
        compatibility: 'compatible',
        energyAffinity: 'Orden',
        spellType: 'Área Aura tamaño Cerca',
        effect: '+1 a todas las Salvaciones de los aliados dentro.',
        saveDc: 14,
        calculatedPf: 14
      }
    ],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'req_atributo_4',
        name: 'Atributo +4 o superior: Aura',
        reduction: 3,
        customDetail: 'Aura +4 o superior'
      },
      {
        instanceId: 'r2',
        requirementId: 'req_naturaleza_especifica',
        name: 'Naturaleza específica: Devotamente',
        reduction: 2,
        customDetail: 'Naturaleza Devotamente'
      }
    ],
    curses: [
      {
        instanceId: 'c1',
        curseId: 'curse_no_tolera_cobardes',
        name: 'La Corona No Tolera Cobardes',
        intensity: 'mayor',
        bonusCap: 3,
        effect: 'Se apaga totalmente su poder si abandonas a un aliado o rompes un juramento pronunciado ante ella.'
      }
    ],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ex-espada-aurora-final',
    name: 'Espada de la Aurora Final',
    type: 'Arma (Espada Sagrada)',
    targetRarity: 'legendario',
    concept: 'Hoja solar aniquiladora de oscuridades',
    descriptionWhat: 'Corta tinieblas y desata un Estallido del Alba radiante devastador.',
    descriptionWhy: 'Su luz no embellece: muestra cicatrices, mentiras y sombras escondidas.',
    descriptionPrice: 'Cada destello de su fulgor atrae la mirada de entidades ancestrales del abismo.',
    fullDescription: 'Su luz no embellece: muestra cicatrices, mentiras y sombras escondidas.',
    properties: [
      {
        instanceId: 'p1',
        propertyId: 'combat_dmg_1_cond',
        name: '+1 daño contra Corruptos/No-Muertos',
        cost: 2,
        category: 'combate',
        notes: '+1 daño contra Corruptos y No-Muertos.'
      }
    ],
    spells: [
      {
        id: 's1',
        name: 'Estallido del Alba',
        level: 3,
        charges: 2,
        recharge: 'descanso_largo',
        compatibility: 'compatible',
        energyAffinity: 'Destrucción / Luz Solar',
        spellType: 'Área / Daño Radiante',
        effect: 'Daño radiante demoledor en área.',
        saveDc: 14,
        calculatedPf: 22
      }
    ],
    requirements: [
      {
        instanceId: 'r1',
        requirementId: 'req_no_herencia',
        name: 'No ser de Herencia corrupta',
        reduction: 2,
        customDetail: 'No ser de Herencia corrupta'
      },
      {
        instanceId: 'r2',
        requirementId: 'req_juramento_activo',
        name: 'Juramento activo',
        reduction: 2,
        customDetail: 'Juramento sagrado de no usarla contra inocentes'
      }
    ],
    curses: [
      {
        instanceId: 'c1',
        curseId: 'curse_sol_revela',
        name: 'El Sol También Revela al Portador',
        intensity: 'legendaria',
        bonusCap: 5,
        effect: 'Cada uso mayor revela la ubicación exacta del portador a una entidad primigenia de oscuridad.'
      }
    ],
    checklist: {
      hasClearStory: true,
      powerReflectsAll: true,
      requirementsReallyLimit: true,
      curseMattersInGame: true,
      respectsRarityLimits: true,
      doesNotReplaceCharacter: true,
      usableWithoutImprovRules: true
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

export const ITEM_TYPES = [
  'Arma (Cuerpo a cuerpo)',
  'Arma (A distancia)',
  'Armadura',
  'Escudo',
  'Accesorio (Anillo / Amuleto / Corona)',
  'Accesorio (Capa / Botas / Guantes)',
  'Herramienta de Oficio',
  'Foco Mágico / Reliquia',
  'Consumible / Vial Especial',
  'Vehículo / Artefacto de Transporte',
  'Otro'
];
