import { SpellLevel } from '../types/papa';

export type MagicEnergy = 'Destrucción' | 'Creación' | 'Transformación' | 'Conservación' | 'Orden' | 'Caos';

export interface OfficialGrimoireSpell {
  id: string;
  name: string;
  energy: MagicEnergy;
  level: SpellLevel;
  affinity: string; // Fuego, Agua, Tierra, Metal, Madera, Sin Afinidad
  type: 'Ataque' | 'Apoyo' | 'Reacción' | 'Utilidad';
  costResistence: number; // 3, 6, 9, 12, 15
  range: string; // Contacto, Cerca, Lejos, Distante, Radio Cerca, etc.
  saveDc: number; // 9, 12, 14, 16, 18
  saveType?: 'Cuerpo' | 'Destreza' | 'Aura';
  flavor: string;
  effect: string;
  duration?: string;
}

export const OFFICIAL_GRIMOIRE_SPELLS: OfficialGrimoireSpell[] = [
  // ================= DESTRUCCIÓN =================
  // Nivel I
  {
    id: 'des_1_golpe_ruptura',
    name: 'Golpe de Ruptura',
    energy: 'Destrucción',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Un golpe seco y directo, sin ceremonia. La fuerza bruta convertida en dogma.',
    effect: 'Realizás un ataque cuerpo a cuerpo cuyo daño es 1d6+2 de daño Contundente.'
  },
  {
    id: 'des_1_dardo_cortante',
    name: 'Dardo Cortante',
    energy: 'Destrucción',
    level: 1,
    affinity: 'Metal',
    type: 'Ataque',
    costResistence: 3,
    range: 'Cerca',
    saveDc: 9,
    flavor: 'El metal responde a tu voluntad como si siempre hubiera querido cortar.',
    effect: 'Realizás un ataque a distancia cuyo daño es 1d6 de daño Cortante.'
  },
  {
    id: 'des_1_fisura',
    name: 'Fisura',
    energy: 'Destrucción',
    level: 1,
    affinity: 'Tierra',
    type: 'Utilidad',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Encontrás la grieta que ya existía. Solo hacía falta mostrarla.',
    effect: 'Agrieta un objeto u obstáculo menor no portado (candado simple, rama, piedra pequeña), facilitando romperlo por medios físicos normales.'
  },
  {
    id: 'des_1_represalia',
    name: 'Represalia',
    energy: 'Destrucción',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Quien falla en atacarte paga el error con su propio impulso.',
    effect: 'Cuando un enemigo adyacente falla un ataque cuerpo a cuerpo contra vos, infligís 1d6 de daño Contundente.'
  },
  {
    id: 'des_1_voluntad_quebrantada',
    name: 'Voluntad Quebrantada',
    energy: 'Destrucción',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Marcás el punto exacto donde algo va a ceder, para quien sepa buscarlo.',
    effect: 'Un objeto u obstáculo tocado queda marcado: la próxima vez que alguien intente romperlo por medios físicos, obtiene Ventaja.'
  },

  // Nivel II
  {
    id: 'des_2_lanza_fuego',
    name: 'Lanza de Fuego',
    energy: 'Destrucción',
    level: 2,
    affinity: 'Fuego',
    type: 'Ataque',
    costResistence: 6,
    range: 'Cerca',
    saveDc: 12,
    flavor: 'El fuego no pregunta, solo avanza.',
    effect: 'Realizás un ataque a distancia cuyo daño es 2d6 de daño de Fuego.'
  },
  {
    id: 'des_2_grieta_profunda',
    name: 'Grieta Profunda',
    energy: 'Destrucción',
    level: 2,
    affinity: 'Tierra',
    type: 'Utilidad',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    duration: '10 minutos',
    flavor: 'La piedra cede donde vos decidís que ceda.',
    effect: 'Abre una grieta estable en una pared u obstáculo de piedra o tierra, suficiente para pasar agachado.'
  },
  {
    id: 'des_2_golpe_rompe',
    name: 'Golpe que Rompe',
    energy: 'Destrucción',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    flavor: 'Ninguna defensa importa cuando el golpe ya decidió atravesarla.',
    effect: 'Realizás un ataque cuerpo a cuerpo que ignora la Reducción de daño del objetivo, cuyo daño es 1d6+2 de daño Contundente.'
  },
  {
    id: 'des_2_rotura_diferida',
    name: 'Rotura Diferida',
    energy: 'Destrucción',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    flavor: 'El primer golpe abre la grieta. El tuyo la termina.',
    effect: 'Cuando un objeto o estructura recibe daño, le infligís 1d6 de daño Contundente adicional.'
  },

  // Nivel III
  {
    id: 'des_3_estallido_voluntad',
    name: 'Estallido de Voluntad',
    energy: 'Destrucción',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 9,
    range: 'Contacto',
    saveDc: 14,
    flavor: 'La mente cede antes que el cuerpo, porque el ataque no busca carne.',
    effect: 'Realizás un ataque cuerpo a cuerpo cuyo daño es 3d6 + Aura de daño Mental.'
  },
  {
    id: 'des_3_ruptura_cadenas',
    name: 'Ruptura de Cadenas',
    energy: 'Destrucción',
    level: 3,
    affinity: 'Metal',
    type: 'Utilidad',
    costResistence: 9,
    range: 'Contacto',
    saveDc: 14,
    flavor: 'Nada atado permanece atado por mucho tiempo cerca tuyo.',
    effect: 'Rompe cualquier atadura, cerradura o mecanismo de dificultad normal sin tirada.'
  },
  {
    id: 'des_3_lluvia_esquirlas',
    name: 'Lluvia de Esquirlas',
    energy: 'Destrucción',
    level: 3,
    affinity: 'Metal',
    type: 'Ataque',
    costResistence: 9,
    range: 'Área Cerca dentro de Cerca',
    saveDc: 14,
    saveType: 'Destreza',
    flavor: 'El metal se fragmenta en el aire y cae como si lloviera filo.',
    effect: 'Provocás una explosión de tamaño Cerca dentro de Cerca. Cada criatura en el área sufre 3d6 de daño Cortante (Salvación Destreza ND 14 para reducir a la mitad).'
  },
  {
    id: 'des_3_filo_responde',
    name: 'Filo que Responde',
    energy: 'Destrucción',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 9,
    range: 'Contacto',
    saveDc: 14,
    flavor: 'Cada golpe cuerpo a cuerpo contra vos tiene un costo que el atacante no esperaba.',
    effect: 'Cuando recibís daño cuerpo a cuerpo, infligís 2d6 de daño al atacante.'
  },

  // Nivel IV & V
  {
    id: 'des_4_lanza_juicio',
    name: 'Lanza del Juicio',
    energy: 'Destrucción',
    level: 4,
    affinity: 'Fuego',
    type: 'Ataque',
    costResistence: 12,
    range: 'Lejos',
    saveDc: 16,
    flavor: 'El fuego no negocia con lo que se supone que debería protegerlo.',
    effect: 'Realizás un ataque a distancia cuyo daño es 4d6 de daño de Fuego, ignorando la Resistencia del objetivo.'
  },
  {
    id: 'des_5_juicio_cenizas',
    name: 'Juicio de Cenizas',
    energy: 'Destrucción',
    level: 5,
    affinity: 'Fuego',
    type: 'Ataque',
    costResistence: 15,
    range: 'Distante',
    saveDc: 18,
    flavor: 'El fuego deja de ser fuego. Se vuelve juicio.',
    effect: 'Provocás una explosión de tamaño Distante dentro de Distante. Cada criatura en el área sufre 8d6 de daño de Fuego, ignorando Resistencia e Inmunidad.'
  },

  // ================= CREACIÓN =================
  // Nivel I
  {
    id: 'cre_1_filo_improvisado',
    name: 'Filo Improvisado',
    energy: 'Creación',
    level: 1,
    affinity: 'Metal',
    type: 'Ataque',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'El arma aparece completa en tu mano, como si siempre hubiera estado ahí esperando.',
    effect: 'Manifestás un arma Simple en tu mano y realizás un ataque cuerpo a cuerpo con ella; el ataque inflige el daño de su tipo.'
  },
  {
    id: 'cre_1_luz_vigilia',
    name: 'Luz de Vigilia',
    energy: 'Creación',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 3,
    range: 'Radio Cerca',
    saveDc: 9,
    duration: '10 minutos',
    flavor: 'Una luz estable y sin parpadeo, hecha para quien necesita ver sin ser visto.',
    effect: 'Manifestás luz clara en radio Cerca durante 10 minutos.'
  },
  {
    id: 'cre_1_cerrojo_repentino',
    name: 'Cerrojo Repentino',
    energy: 'Creación',
    level: 1,
    affinity: 'Metal',
    type: 'Reacción',
    costResistence: 3,
    range: 'Cerca',
    saveDc: 9,
    flavor: 'El metal se cierra solo, un instante antes de que alguien lo note.',
    effect: 'Cuando una puerta o cofre cercano está a punto de abrirse contra tu voluntad, manifestás un cerrojo simple que la sella hasta que alguien lo fuerce.'
  },
  {
    id: 'cre_1_escudo_improvisado',
    name: 'Escudo Improvisado',
    energy: 'Creación',
    level: 1,
    affinity: 'Madera',
    type: 'Apoyo',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Madera que se forma en el aire y cae justo donde el golpe iba a llegar.',
    effect: 'Manifestás un escudo en el brazo de un aliado; obtiene +1 a Defensa hasta el final de tu próximo turno.'
  },

  // Nivel II
  {
    id: 'cre_2_muro_improvisado',
    name: 'Muro Improvisado',
    energy: 'Creación',
    level: 2,
    affinity: 'Tierra',
    type: 'Utilidad',
    costResistence: 6,
    range: 'Cerca',
    saveDc: 12,
    duration: '3 rondas',
    flavor: 'Tierra que se levanta justo a tiempo para cubrir la espalda de alguien.',
    effect: 'Manifestás una Barrera menor (10 Resistencia estructural, Defensa 7) en un punto dentro de Cerca.'
  },
  {
    id: 'cre_2_arma_instante',
    name: 'Arma del Instante',
    energy: 'Creación',
    level: 2,
    affinity: 'Metal',
    type: 'Ataque',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    flavor: 'El acero aparece completo, con filo, con peso, con historia prestada.',
    effect: 'Manifestás un arma Marcial en tu mano y realizás un ataque cuerpo a cuerpo con ella; el ataque inflige el daño de su tipo.'
  },
  {
    id: 'cre_2_guardian_improvisado',
    name: 'Guardián Improvisado',
    energy: 'Creación',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    flavor: 'Algo se interpone entre vos y el golpe, aunque un segundo antes no existía.',
    effect: 'Cuando un enemigo entra en contacto con vos, manifestás un objeto interpuesto que absorbe el primer golpe.'
  },

  // Nivel III
  {
    id: 'cre_3_bastion_instantaneo',
    name: 'Bastión Instantáneo',
    energy: 'Creación',
    level: 3,
    affinity: 'Metal',
    type: 'Utilidad',
    costResistence: 9,
    range: 'Cerca',
    saveDc: 14,
    duration: '10 minutos',
    flavor: 'El metal se pliega sobre sí mismo hasta volverse muro.',
    effect: 'Manifestás una Barrera reforzada (+5 Resistencia estructural, cobertura total) en un punto dentro de Cerca.'
  },
  {
    id: 'cre_3_armeria_emergencia',
    name: 'Armería de Emergencia',
    energy: 'Creación',
    level: 3,
    affinity: 'Metal',
    type: 'Apoyo',
    costResistence: 9,
    range: 'Contacto',
    saveDc: 14,
    duration: '1 hora',
    flavor: 'Las armas aparecen justo cuando las manos las necesitan.',
    effect: 'Hasta 2 aliados reciben un arma Marcial manifestada durante 1 hora.'
  },
  {
    id: 'cre_3_puente_luz',
    name: 'Puente de Luz',
    energy: 'Creación',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 9,
    range: '6 metros',
    saveDc: 14,
    duration: '3 rondas',
    flavor: 'Un camino que no debería existir, sostenido por pura voluntad.',
    effect: 'Manifestás una superficie sólida temporal de hasta 6 metros de longitud.'
  },

  // Nivel IV & V
  {
    id: 'cre_4_fortaleza_instantanea',
    name: 'Fortaleza Instantánea',
    energy: 'Creación',
    level: 4,
    affinity: 'Metal',
    type: 'Utilidad',
    costResistence: 12,
    range: 'Cerca',
    saveDc: 16,
    flavor: 'El metal se levanta como si siempre hubiera estado ahí, esperando ser necesitado.',
    effect: 'Manifestás una Barrera (25 Resistencia estructural, Defensa 7, 9 m de largo, cobertura total) en un punto dentro de Cerca.'
  },
  {
    id: 'cre_5_refugio_absoluto',
    name: 'Refugio Absoluto',
    energy: 'Creación',
    level: 5,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 15,
    range: 'Área Cerca',
    saveDc: 18,
    flavor: 'Un domo se cierra alrededor del grupo, un instante antes del golpe que debía partirlos.',
    effect: 'Cuando vos o un aliado dentro de Cerca reciba daño que reduzca su Resistencia al 50% o menos, generás una Barrera de 35 Resistencia y Defensa 9 con cobertura total.'
  },

  // ================= TRANSFORMACIÓN =================
  // Nivel I
  {
    id: 'tra_1_piel_roca',
    name: 'Piel de Roca',
    energy: 'Transformación',
    level: 1,
    affinity: 'Tierra',
    type: 'Apoyo',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Por un instante, la carne recuerda la dureza de la piedra.',
    effect: 'El objetivo gana Resistencia a daño Contundente hasta el final de su próximo turno.'
  },
  {
    id: 'tra_1_agua_hielo',
    name: 'Agua en Hielo',
    energy: 'Transformación',
    level: 1,
    affinity: 'Agua',
    type: 'Utilidad',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    duration: '10 minutos',
    flavor: 'El agua obedece, cambiando de forma sin perder su naturaleza.',
    effect: 'Transformás hasta 1 m³ de agua en hielo, o viceversa.'
  },
  {
    id: 'tra_1_filo_cambiante',
    name: 'Filo Cambiante',
    energy: 'Transformación',
    level: 1,
    affinity: 'Metal',
    type: 'Apoyo',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'El filo olvida su forma anterior y adopta la que necesitás.',
    effect: 'Un arma tocada cambia su tipo de daño (Cortante/Penetrante/Contundente) hasta el final de tu próximo turno.'
  },
  {
    id: 'tra_1_paso_firme',
    name: 'Paso Firme',
    energy: 'Transformación',
    level: 1,
    affinity: 'Tierra',
    type: 'Reacción',
    costResistence: 3,
    range: 'Personal',
    saveDc: 9,
    flavor: 'El suelo se rinde antes que vos.',
    effect: 'Cuando pisás terreno inestable, lo endurecés bajo tus pies para evitar caer o resbalar.'
  },

  // Nivel II
  {
    id: 'tra_2_piedra_lodo',
    name: 'Piedra en Lodo',
    energy: 'Transformación',
    level: 2,
    affinity: 'Tierra',
    type: 'Ataque',
    costResistence: 6,
    range: 'Cerca',
    saveDc: 12,
    saveType: 'Destreza',
    flavor: 'El suelo firme deja de serlo, y el paso se vuelve una trampa.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Destreza ND 12 o queda Ralentizado.'
  },
  {
    id: 'tra_2_segunda_piel',
    name: 'Segunda Piel',
    energy: 'Transformación',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    duration: '3 rondas',
    flavor: 'El cuerpo aprende, por un rato, a ser otra cosa.',
    effect: 'El objetivo gana un arma natural simple, o Resistencia a un tipo de daño elegido durante 3 rondas.'
  },

  // Nivel III
  {
    id: 'tra_3_forma_bestia',
    name: 'Forma de la Bestia',
    energy: 'Transformación',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 9,
    range: 'Personal',
    saveDc: 14,
    duration: '3 rondas',
    flavor: 'El cuerpo humano es solo una de las formas disponibles.',
    effect: 'Cambiás tu forma por completo a la de una criatura de tamaño similar durante 3 rondas.'
  },
  {
    id: 'tra_3_paso_sombras',
    name: 'Paso entre Sombras',
    energy: 'Transformación',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 9,
    range: 'Lejos',
    saveDc: 14,
    flavor: 'El espacio entre un lugar y otro deja de importar.',
    effect: 'Te teletransportás a un punto visible dentro de Lejos.'
  },

  // Nivel IV & V
  {
    id: 'tra_4_carne_piedra',
    name: 'Carne en Piedra',
    energy: 'Transformación',
    level: 4,
    affinity: 'Tierra',
    type: 'Ataque',
    costResistence: 12,
    range: 'Contacto',
    saveDc: 16,
    saveType: 'Cuerpo',
    duration: '3 rondas',
    flavor: 'El cuerpo se detiene, y por un momento, deja de ser cuerpo.',
    effect: 'Tu ataque cuerpo a cuerpo obliga al objetivo a superar una Salvación de Cuerpo ND 16 o queda transformado en una estatua de piedra inerte durante 3 rondas.'
  },
  {
    id: 'tra_5_sentencia_piedra',
    name: 'Sentencia de Piedra',
    energy: 'Transformación',
    level: 5,
    affinity: 'Tierra',
    type: 'Ataque',
    costResistence: 15,
    range: 'Contacto',
    saveDc: 18,
    saveType: 'Cuerpo',
    flavor: 'Esta vez, la piedra no vuelve a soltar lo que atrapó.',
    effect: 'Tu ataque cuerpo a cuerpo obliga al objetivo a superar una Salvación de Cuerpo ND 18 o queda transformado en una estatua de piedra inerte de forma permanente.'
  },

  // ================= CONSERVACIÓN =================
  // Nivel I
  {
    id: 'con_1_manos_sanan',
    name: 'Manos que Sanan',
    energy: 'Conservación',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'El calor vuelve a la herida como si nunca se hubiera ido.',
    effect: 'El objetivo recupera 2+1d6 de Resistencia.'
  },
  {
    id: 'con_1_aliento_firme',
    name: 'Aliento Firme',
    energy: 'Conservación',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Un respiro que no debería estar ahí, pero se sostiene.',
    effect: 'Estabilizás a una criatura en 0 de Resistencia sin necesidad de tirada.'
  },
  {
    id: 'con_1_guardia_reflejada',
    name: 'Guardia Reflejada',
    energy: 'Conservación',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'El golpe llega, pero encuentra menos de lo que esperaba.',
    effect: 'Cuando el objetivo recibe daño, reducís ese daño en 2.'
  },

  // Nivel II
  {
    id: 'con_2_balsamo_reconfortante',
    name: 'Bálsamo Reconfortante',
    energy: 'Conservación',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    flavor: 'El cuerpo se cierra como si nunca se hubiera abierto.',
    effect: 'El objetivo recupera 2+2d6 de Resistencia.'
  },
  {
    id: 'con_2_manto_piedra',
    name: 'Manto de Piedra',
    energy: 'Conservación',
    level: 2,
    affinity: 'Tierra',
    type: 'Apoyo',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    duration: '3 rondas',
    flavor: 'La piel se endurece, por un momento, con la paciencia de la roca.',
    effect: 'El objetivo obtiene +1 a Defensa y Resistencia a daño Contundente durante 3 rondas.'
  },
  {
    id: 'con_2_respiro',
    name: 'Respiro',
    energy: 'Conservación',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    flavor: 'Un momento de calma, robado al cansancio.',
    effect: 'Reduce 1 nivel de Fatiga del objetivo.'
  },

  // Nivel III
  {
    id: 'con_3_restauracion',
    name: 'Restauración',
    energy: 'Conservación',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 9,
    range: 'Contacto',
    saveDc: 14,
    flavor: 'Las heridas se cierran como si el tiempo mismo retrocediera un poco.',
    effect: 'El objetivo recupera 3d6+4 de Resistencia.'
  },
  {
    id: 'con_3_reflejo_vida',
    name: 'Reflejo de Vida',
    energy: 'Conservación',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 9,
    range: 'Contacto',
    saveDc: 14,
    flavor: 'Nadie cae del todo mientras vos estés cerca para sostenerlo.',
    effect: 'Cuando un aliado adyacente caería a 0 de Resistencia, queda en 1 en su lugar.'
  },

  // Nivel IV & V
  {
    id: 'con_4_manantial_vida',
    name: 'Manantial de Vida',
    energy: 'Conservación',
    level: 4,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 12,
    range: 'Área Cerca',
    saveDc: 16,
    flavor: 'La energía se derrama sobre el grupo entero, sin pedir nada a cambio.',
    effect: 'Generás un Aura de tamaño Cerca centrada en vos. Todos los aliados dentro recuperan 3d6+4 de Resistencia y eliminan todos sus estados.'
  },
  {
    id: 'con_5_renacer',
    name: 'Renacer',
    energy: 'Conservación',
    level: 5,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 15,
    range: 'Contacto',
    saveDc: 18,
    flavor: 'La muerte se acerca y se va con las manos vacías.',
    effect: 'El objetivo recupera 8+8d6 de Resistencia; si el daño de este turno lo hubiera reducido a 0, queda en 1.'
  },

  // ================= ORDEN =================
  // Nivel I
  {
    id: 'ord_1_marca_quietud',
    name: 'Marca de Quietud',
    energy: 'Orden',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 3,
    range: 'Cerca',
    saveDc: 9,
    flavor: 'Una palabra basta para quebrar la concentración de otro.',
    effect: 'Realizás un ataque a distancia; si impacta, el objetivo sufre −1 a su próxima tirada.'
  },
  {
    id: 'ord_1_palabra_verdad',
    name: 'Palabra de Verdad',
    energy: 'Orden',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Utilidad',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    duration: '10 minutos',
    flavor: 'Todo idioma se vuelve el mismo bajo esta ley.',
    effect: 'Entendés cualquier idioma hablado o escrito mientras dure (10 minutos).'
  },
  {
    id: 'ord_1_disciplina',
    name: 'Disciplina',
    energy: 'Orden',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Un instante de claridad, prestado a quien lo necesita.',
    effect: 'Un aliado obtiene +1 a su próxima tirada.'
  },

  // Nivel II
  {
    id: 'ord_2_grito_paraliza',
    name: 'Grito que Paraliza',
    energy: 'Orden',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 6,
    range: 'Cerca',
    saveDc: 12,
    saveType: 'Aura',
    flavor: 'Una orden que el cuerpo obedece antes de que la mente proteste.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Aura ND 12 o queda Derribado.'
  },
  {
    id: 'ord_2_firmeza',
    name: 'Firmeza',
    energy: 'Orden',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 6,
    range: 'Contacto',
    saveDc: 12,
    duration: '3 rondas',
    flavor: 'La voluntad se endereza, y con ella, el cuerpo entero.',
    effect: 'El objetivo obtiene +1 a todas las Salvaciones durante 3 rondas.'
  },

  // Nivel III
  {
    id: 'ord_3_sello_detencion',
    name: 'Sello de Detención',
    energy: 'Orden',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 9,
    range: 'Cerca',
    saveDc: 14,
    saveType: 'Aura',
    flavor: 'El cuerpo obedece la orden de quedarse quieto, aunque la mente proteste.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Aura ND 14 o queda Inmovilizado.'
  },
  {
    id: 'ord_3_circulo_ley',
    name: 'Círculo de Ley',
    energy: 'Orden',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 9,
    range: 'Área Cerca',
    saveDc: 14,
    duration: '3 rondas',
    flavor: 'Dentro de este límite, la voluntad se sostiene sola.',
    effect: 'Generás un Aura de tamaño Cerca centrada en vos. Los aliados dentro obtienen +1 a todas las Salvaciones mientras dure.'
  },

  // Nivel IV & V
  {
    id: 'ord_4_mandato_absoluto',
    name: 'Mandato Absoluto',
    energy: 'Orden',
    level: 4,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 12,
    range: 'Lejos',
    saveDc: 16,
    saveType: 'Aura',
    flavor: 'La orden no admite matices. El cuerpo simplemente se detiene.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Aura ND 16 o queda Incapacitado.'
  },
  {
    id: 'ord_5_ley_absoluta',
    name: 'Ley Absoluta',
    energy: 'Orden',
    level: 5,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 15,
    range: 'Distante',
    saveDc: 18,
    saveType: 'Aura',
    flavor: 'No hay negociación posible con una ley absoluta.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Aura ND 18 o queda Inconsciente.'
  },

  // ================= CAOS =================
  // Nivel I
  {
    id: 'cao_1_chispa_erratica',
    name: 'Chispa Errática',
    energy: 'Caos',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'La energía salta sin patrón, pero siempre encuentra un blanco.',
    effect: 'Realizás un ataque cuerpo a cuerpo cuyo daño es 1d6+2 de daño Eléctrico.'
  },
  {
    id: 'cao_1_segunda_oportunidad',
    name: 'Segunda Oportunidad',
    energy: 'Caos',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 3,
    range: 'Personal',
    saveDc: 9,
    flavor: 'A veces no podés fallar. Canalizás tu voluntad para intentarlo otra vez.',
    effect: 'Cuando fallás una Salvación de Destreza, podés repetirla de inmediato y quedarte con el segundo resultado.'
  },
  {
    id: 'cao_1_idea_prestada',
    name: 'Idea Prestada',
    energy: 'Caos',
    level: 1,
    affinity: 'Sin Afinidad',
    type: 'Apoyo',
    costResistence: 3,
    range: 'Contacto',
    saveDc: 9,
    flavor: 'Una certeza que no es tuya, pero funciona igual.',
    effect: 'El objetivo obtiene Ventaja en su próxima tirada de un tipo estrecho, elegido al lanzar (ej. trepar, detectar mentiras).'
  },

  // Nivel II
  {
    id: 'cao_2_vapor_corrosivo',
    name: 'Vapor Corrosivo',
    energy: 'Caos',
    level: 2,
    affinity: 'Agua',
    type: 'Ataque',
    costResistence: 6,
    range: 'Cerca',
    saveDc: 12,
    saveType: 'Cuerpo',
    flavor: 'El aire mismo se vuelve hostil, y respirar ya es un riesgo.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Cuerpo ND 12 o queda Envenenado.'
  },
  {
    id: 'cao_2_desvio_instintivo',
    name: 'Desvío Instintivo',
    energy: 'Caos',
    level: 2,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 6,
    range: 'Personal',
    saveDc: 12,
    flavor: 'El cuerpo se aparta del peligro antes de que la mente termine de reconocerlo.',
    effect: 'Cuando estás a punto de realizar una Salvación, antes de tirar los dados, podés declarar que la realizás con Ventaja.'
  },

  // Nivel III
  {
    id: 'cao_3_nube_fermento',
    name: 'Nube de Fermento',
    energy: 'Caos',
    level: 3,
    affinity: 'Agua',
    type: 'Ataque',
    costResistence: 9,
    range: 'Área Cerca',
    saveDc: 14,
    saveType: 'Cuerpo',
    flavor: 'El aire se agria, y respirarlo ya es suficiente.',
    effect: 'Provocás una explosión de tamaño Cerca dentro de Cerca. Cada criatura en el área debe superar una Salvación de Cuerpo ND 14 o queda Envenenada.'
  },
  {
    id: 'cao_3_azar_violento',
    name: 'Azar Violento',
    energy: 'Caos',
    level: 3,
    affinity: 'Sin Afinidad',
    type: 'Ataque',
    costResistence: 9,
    range: 'Cerca',
    saveDc: 14,
    saveType: 'Aura',
    flavor: 'No hay patrón en lo que golpea la mente del objetivo, y por eso funciona.',
    effect: 'Tu ataque a distancia obliga al objetivo a superar una Salvación de Aura ND 14 o queda Confundido.'
  },

  // Nivel IV & V
  {
    id: 'cao_4_estallido_podredumbre',
    name: 'Estallido de Podredumbre',
    energy: 'Caos',
    level: 4,
    affinity: 'Agua',
    type: 'Ataque',
    costResistence: 12,
    range: 'Área Lejos',
    saveDc: 16,
    saveType: 'Cuerpo',
    flavor: 'La podredumbre no distingue entre quienes merecen caer y quienes no.',
    effect: 'Provocás una explosión de tamaño Lejos dentro de Cerca. Cada criatura en el área sufre 4d6 de daño Corrosivo y queda Envenenada (Salvación Cuerpo ND 16 para mitad).'
  },
  {
    id: 'cao_5_ultima_replica',
    name: 'Última Réplica',
    energy: 'Caos',
    level: 5,
    affinity: 'Sin Afinidad',
    type: 'Reacción',
    costResistence: 15,
    range: 'Personal',
    saveDc: 18,
    flavor: 'El cuerpo cae, pero algo se niega a quedarse abajo.',
    effect: 'Cuando morirías o quedarías Inconsciente, quedás en pie con 1 de Resistencia. No podés volver a lanzarlo hasta completar un Descanso Largo.'
  }
];

export const MAGIC_ENERGIES: Array<{ name: MagicEnergy; desc: string; color: string }> = [
  { name: 'Destrucción', desc: 'Rotura, daño directo, desgaste, ruina y fuerza.', color: '#E02B69' },
  { name: 'Creación', desc: 'Manifestación de materia, estructuras, armas y objetos.', color: '#4FA3E3' },
  { name: 'Transformación', desc: 'Cambio de forma, de estado o de naturaleza.', color: '#B574D8' },
  { name: 'Conservación', desc: 'Curación, protección, estabilidad y aguante.', color: '#8CA568' },
  { name: 'Orden', desc: 'Control, ley, restricción, verdad y mandato.', color: '#E5CB7D' },
  { name: 'Caos', desc: 'Azar, corrupción, distorsión, presagio y cambio brusco.', color: '#E67E22' }
];

export const MAGIC_AFFINITIES = [
  'Sin Afinidad',
  'Fuego',
  'Agua',
  'Tierra',
  'Metal',
  'Madera'
] as const;
