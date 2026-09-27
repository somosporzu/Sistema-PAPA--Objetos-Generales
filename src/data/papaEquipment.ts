export interface BaseWeapon {
  id: string;
  name: string;
  category: 'puño' | 'daga' | 'maza' | 'lanza' | 'arrojadiza' | 'hacha' | 'espada' | 'arco' | 'ballesta' | 'asta' | 'improvisada';
  damage: string; // e.g. "1d6 - 2", "1d6 + 1"
  damageType: 'Cortante' | 'Penetrante' | 'Contundente' | 'Variable';
  isMartial: boolean;
  properties: string[]; // e.g. ['Ligera', 'Arrojadiza Cerca/Lejos']
  costL: number;
}

export interface BaseArmor {
  id: string;
  name: string;
  defenseBonus: number;
  properties: string[]; // e.g. ['Ligera', 'Media', 'Pesada', 'Ruidosa', 'Ata al suelo']
  costL: number;
}

export interface BaseShield {
  id: string;
  name: string;
  defenseBonus: number;
  properties: string[]; // e.g. ['Ligera', 'Pesado', 'Cobertura parcial si se planta']
  costL: number;
}

export const BASE_WEAPONS: BaseWeapon[] = [
  {
    id: 'w_improvisada',
    name: 'Arma improvisada',
    category: 'improvisada',
    damage: '1d6 − 3',
    damageType: 'Variable',
    isMartial: false,
    properties: ['Frágil'],
    costL: 0
  },
  {
    id: 'w_puno_desnudo',
    name: 'Puño desnudo',
    category: 'puño',
    damage: '1d6 − 4',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['Ligera'],
    costL: 0
  },
  {
    id: 'w_daga',
    name: 'Daga o cuchillo',
    category: 'daga',
    damage: '1d6 − 2',
    damageType: 'Penetrante',
    isMartial: false,
    properties: ['Ligera', 'Arrojadiza Cerca/Lejos'],
    costL: 4
  },
  {
    id: 'w_baston',
    name: 'Bastón',
    category: 'maza',
    damage: '1d6 − 1',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['A dos manos'],
    costL: 1
  },
  {
    id: 'w_garrote',
    name: 'Garrote',
    category: 'maza',
    damage: '1d6 − 1',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['Ligera'],
    costL: 2
  },
  {
    id: 'w_maza_ligera',
    name: 'Maza ligera',
    category: 'maza',
    damage: '1d6',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['Ligera'],
    costL: 20
  },
  {
    id: 'w_hoz',
    name: 'Hoz',
    category: 'daga',
    damage: '1d6 − 1',
    damageType: 'Cortante',
    isMartial: false,
    properties: ['Ligera'],
    costL: 5
  },
  {
    id: 'w_lanza_corta',
    name: 'Lanza corta',
    category: 'lanza',
    damage: '1d6',
    damageType: 'Penetrante',
    isMartial: false,
    properties: ['Arrojadiza Cerca/Lejos (10/20)'],
    costL: 10
  },
  {
    id: 'w_jabalina',
    name: 'Jabalina',
    category: 'lanza',
    damage: '1d6 − 1',
    damageType: 'Penetrante',
    isMartial: false,
    properties: ['Arrojadiza Cerca/Lejos (15/30)'],
    costL: 8
  },
  {
    id: 'w_honda',
    name: 'Honda',
    category: 'arrojadiza',
    damage: '1d6 − 2',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['Distancia Cerca/Lejos (15/30)'],
    costL: 3
  },
  {
    id: 'w_hacha_mano',
    name: 'Hacha de mano',
    category: 'hacha',
    damage: '1d6',
    damageType: 'Cortante',
    isMartial: false,
    properties: ['Ligera', 'Arrojadiza Cerca/Lejos'],
    costL: 12
  },
  {
    id: 'w_espada_corta',
    name: 'Espada corta',
    category: 'espada',
    damage: '1d6',
    damageType: 'Cortante',
    isMartial: false,
    properties: ['Ligera'],
    costL: 25
  },
  {
    id: 'w_sai',
    name: 'Sai',
    category: 'puño',
    damage: '1d6 − 1',
    damageType: 'Penetrante',
    isMartial: true,
    properties: ['Ligera', 'Paradora'],
    costL: 18
  },
  {
    id: 'w_manopla_hierro',
    name: 'Manopla de hierro',
    category: 'puño',
    damage: '1d6 − 2',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['Ligera', 'Integrada'],
    costL: 8
  },
  {
    id: 'w_tekko',
    name: 'Tekko',
    category: 'puño',
    damage: '1d6 − 2',
    damageType: 'Contundente',
    isMartial: false,
    properties: ['Ligera'],
    costL: 5
  },
  {
    id: 'w_katar',
    name: 'Katar',
    category: 'puño',
    damage: '1d6 − 1',
    damageType: 'Penetrante',
    isMartial: true,
    properties: ['Ligera', 'Integrada', 'Perforante'],
    costL: 20
  },
  {
    id: 'w_espada_larga',
    name: 'Espada larga',
    category: 'espada',
    damage: '1d6 + 1',
    damageType: 'Cortante',
    isMartial: true,
    properties: ['Marcial'],
    costL: 50
  },
  {
    id: 'w_hacha_batalla',
    name: 'Hacha de batalla',
    category: 'hacha',
    damage: '1d6 + 1',
    damageType: 'Cortante',
    isMartial: true,
    properties: ['Marcial'],
    costL: 45
  },
  {
    id: 'w_maza_pesada',
    name: 'Maza pesada',
    category: 'maza',
    damage: '1d6 + 1',
    damageType: 'Contundente',
    isMartial: true,
    properties: ['Pesada'],
    costL: 40
  },
  {
    id: 'w_martillo_guerra',
    name: 'Martillo de guerra',
    category: 'maza',
    damage: '1d6 + 1',
    damageType: 'Contundente',
    isMartial: true,
    properties: ['Pesada'],
    costL: 55
  },
  {
    id: 'w_lanza_larga',
    name: 'Lanza larga',
    category: 'lanza',
    damage: '1d6 + 1',
    damageType: 'Penetrante',
    isMartial: true,
    properties: ['A dos manos', 'Alcance'],
    costL: 35
  },
  {
    id: 'w_arco_corto',
    name: 'Arco corto',
    category: 'arco',
    damage: '1d6',
    damageType: 'Penetrante',
    isMartial: false,
    properties: ['Distancia Cerca/Lejos', 'A dos manos'],
    costL: 30
  },
  {
    id: 'w_ballesta_ligera',
    name: 'Ballesta ligera',
    category: 'ballesta',
    damage: '1d6 + 1',
    damageType: 'Penetrante',
    isMartial: false,
    properties: ['Distancia Cerca/Lejos', 'Recarga'],
    costL: 50
  },
  {
    id: 'w_guantelete_combate',
    name: 'Guantelete de combate',
    category: 'puño',
    damage: '1d6',
    damageType: 'Contundente',
    isMartial: true,
    properties: ['Integrada'],
    costL: 30
  },
  {
    id: 'w_guantelete_garras',
    name: 'Guantelete con garras',
    category: 'puño',
    damage: '1d6',
    damageType: 'Cortante',
    isMartial: true,
    properties: ['Integrada'],
    costL: 35
  },
  {
    id: 'w_katar_doble',
    name: 'Katar doble',
    category: 'puño',
    damage: '1d6',
    damageType: 'Penetrante',
    isMartial: true,
    properties: ['Integrada', 'Doble hoja'],
    costL: 40
  },
  {
    id: 'w_arco_largo',
    name: 'Arco largo',
    category: 'arco',
    damage: '1d6 + 1',
    damageType: 'Penetrante',
    isMartial: true,
    properties: ['Distancia Lejos/Distante', 'A dos manos'],
    costL: 75
  },
  {
    id: 'w_ballesta_pesada',
    name: 'Ballesta pesada',
    category: 'ballesta',
    damage: '1d6 + 2',
    damageType: 'Penetrante',
    isMartial: true,
    properties: ['Distancia Lejos/Distante', 'Recarga', 'Pesada'],
    costL: 100
  },
  {
    id: 'w_alabarda',
    name: 'Alabarda',
    category: 'asta',
    damage: '1d6 + 2',
    damageType: 'Cortante',
    isMartial: true,
    properties: ['A dos manos', 'Alcance', 'Pesada'],
    costL: 90
  },
  {
    id: 'w_gran_hacha',
    name: 'Gran hacha',
    category: 'hacha',
    damage: '1d6 + 2',
    damageType: 'Cortante',
    isMartial: true,
    properties: ['A dos manos', 'Pesada'],
    costL: 80
  },
  {
    id: 'w_mandoble',
    name: 'Mandoble',
    category: 'espada',
    damage: '1d6 + 2',
    damageType: 'Cortante',
    isMartial: true,
    properties: ['A dos manos', 'Pesada'],
    costL: 100
  },
  {
    id: 'w_puno_hierro_pesado',
    name: 'Puño de hierro pesado',
    category: 'puño',
    damage: '1d6 + 1',
    damageType: 'Contundente',
    isMartial: true,
    properties: ['Pesada', 'Integrada'],
    costL: 50
  }
];

export const BASE_ARMORS: BaseArmor[] = [
  {
    id: 'arm_ropa_comun',
    name: 'Ropa común',
    defenseBonus: 0,
    properties: ['Sin protección'],
    costL: 0
  },
  {
    id: 'arm_ropa_acolchada',
    name: 'Ropa acolchada',
    defenseBonus: 1,
    properties: ['Ligera'],
    costL: 15
  },
  {
    id: 'arm_cuero_reforzado',
    name: 'Cuero reforzado',
    defenseBonus: 2,
    properties: ['Ligera'],
    costL: 45
  },
  {
    id: 'arm_cota_malla',
    name: 'Cota de malla',
    defenseBonus: 3,
    properties: ['Media'],
    costL: 120
  },
  {
    id: 'arm_coraza_laminar',
    name: 'Coraza laminar',
    defenseBonus: 3,
    properties: ['Media', 'Ruidosa'],
    costL: 160
  },
  {
    id: 'arm_placas_parciales',
    name: 'Placas parciales',
    defenseBonus: 4,
    properties: ['Pesada', 'Ruidosa'],
    costL: 300
  },
  {
    id: 'arm_armadura_completa',
    name: 'Armadura completa',
    defenseBonus: 5,
    properties: ['Pesada', 'Ruidosa', 'Ata al suelo'],
    costL: 600
  }
];

export const BASE_SHIELDS: BaseShield[] = [
  {
    id: 'sh_rodela',
    name: 'Rodela',
    defenseBonus: 1,
    properties: ['Ligera'],
    costL: 15
  },
  {
    id: 'sh_escudo_comun',
    name: 'Escudo común',
    defenseBonus: 1,
    properties: ['Estándar'],
    costL: 25
  },
  {
    id: 'sh_escudo_reforzado',
    name: 'Escudo reforzado',
    defenseBonus: 2,
    properties: ['Pesado'],
    costL: 60
  },
  {
    id: 'sh_paves',
    name: 'Pavés',
    defenseBonus: 2,
    properties: ['Pesado', 'Cobertura parcial si se planta'],
    costL: 100
  }
];

export const QUALITY_LEVELS = [
  { val: -3, label: 'Calidad −3 (Casi inútil, roto)', modText: '−3 Ataque/Daño o −3 Defensa', priceMultiplier: 0.25 },
  { val: -2, label: 'Calidad −2 (Muy pobre o dañado)', modText: '−2 Ataque/Daño o −2 Defensa', priceMultiplier: 0.5 },
  { val: -1, label: 'Calidad −1 (Gastado, baja calidad)', modText: '−1 Ataque/Daño o −1 Defensa', priceMultiplier: 0.75 },
  { val: 0, label: 'Calidad 0 (Común, estándar)', modText: 'Sin modificadores de calidad', priceMultiplier: 1 },
  { val: 1, label: 'Calidad +1 (Bien hecho, cuidado)', modText: '+1 Ataque/Daño o +1 Defensa', priceMultiplier: 1.5 },
  { val: 2, label: 'Calidad +2 (Excelente, obra de maestro)', modText: '+2 Ataque/Daño o +2 Defensa', priceMultiplier: 2.0 },
  { val: 3, label: 'Calidad +3 (Excepcional, raro)', modText: '+3 Ataque/Daño o +3 Defensa', priceMultiplier: 2.5 }
];
