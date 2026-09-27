export type RarityKey = 'poco_comun' | 'raro' | 'muy_raro' | 'legendario' | 'artefacto';

export interface RarityInfo {
  id: RarityKey;
  name: string;
  minPf: number;
  maxPf: number;
  maxPowerWithoutCurse: number;
  maxPowerWithCurse: number;
  priceRange: string;
  availability: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  attributeLimit: string;
  combatBonusLimit: string;
  hpLimit: string;
}

export type PropertyCategory = 
  | 'atributos'
  | 'combate'
  | 'resistencia_movimiento'
  | 'salvaciones_conceptos'
  | 'ventaja_tiradas'
  | 'sentidos_resistencias'
  | 'equipo_herramientas'
  | 'sociales_almacenamiento'
  | 'personalizada';

export interface CatalogProperty {
  id: string;
  category: PropertyCategory;
  name: string;
  cost: number;
  notes: string;
  minRarity?: RarityKey;
  requiresInput?: string; // Prompt for custom detail (e.g. "Elegir Atributo: Cuerpo, Destreza o Aura")
}

export interface SelectedProperty {
  instanceId: string;
  propertyId: string;
  name: string;
  cost: number;
  category: PropertyCategory;
  notes: string;
  customDetail?: string;
}

export type SpellLevel = 1 | 2 | 3 | 4 | 5;
export type RechargeType = 'nunca' | 'descanso_largo' | 'descanso_corto' | 'libre';
export type CompatibilityType = 'compatible' | 'neutral' | 'incompatible';

export interface ContainedSpell {
  id: string;
  name: string;
  level: SpellLevel;
  charges: number;
  recharge: RechargeType;
  compatibility: CompatibilityType;
  energyAffinity: string; // Ej: Destrucción/Metal, Orden, Caos/Agua
  spellType: string;      // Ej: Ataque, Área Cerca, Contacto, Teletransporte
  effect: string;         // Descripción del efecto
  saveDc: number;         // 9, 12, 14, 16, 18
  calculatedPf: number;
}

export interface CatalogRequirement {
  id: string;
  name: string;
  reduction: number; // Positive number (e.g. 1, 2, 3, 4)
  notes?: string;
  requiresInput?: string;
}

export interface SelectedRequirement {
  instanceId: string;
  requirementId: string;
  name: string;
  reduction: number;
  customDetail?: string;
}

export type CurseIntensity = 'menor' | 'media' | 'mayor' | 'legendaria';

export interface CatalogCurse {
  id: string;
  intensity: CurseIntensity;
  name: string;
  bonusCap: number; // +1, +2, +3, +5 (legendary: 4-7)
  effect: string;
}

export interface SelectedCurse {
  instanceId: string;
  curseId: string;
  name: string;
  intensity: CurseIntensity;
  bonusCap: number;
  effect: string;
  customDetail?: string;
}

export interface ChecklistAnswers {
  hasClearStory: boolean;
  powerReflectsAll: boolean;
  requirementsReallyLimit: boolean;
  curseMattersInGame: boolean;
  respectsRarityLimits: boolean;
  doesNotReplaceCharacter: boolean;
  usableWithoutImprovRules: boolean;
}

export interface BaseEquipmentConfig {
  baseEquipmentType: 'none' | 'weapon' | 'armor' | 'shield';
  baseId?: string;
  baseName?: string;
  baseDamage?: string;
  damageType?: string;
  defenseBonus?: number;
  quality: number; // -3 to +3
  baseProperties: string[];
  baseCostL: number;
}

export interface PapaItem {
  id: string;
  name: string;
  type: string; // Arma, Armadura, Escudo, Accesorio, Herramienta, Reliquia, Foco, Otro
  targetRarity: RarityKey;
  concept: string; // Concepto o arquetipo
  baseEquipment?: BaseEquipmentConfig;
  properties: SelectedProperty[];
  spells: ContainedSpell[];
  requirements: SelectedRequirement[];
  curses: SelectedCurse[];
  customPrice?: string;
  descriptionWhat: string; // ¿Qué hace? Función mecánica y sensaciones
  descriptionWhy: string;  // ¿Por qué existe? Historia, creador, tradición
  descriptionPrice: string; // ¿Qué precio tiene? Balance narrativo, social, espiritual
  fullDescription: string; // Texto narrativo completo
  checklist: ChecklistAnswers;
  createdAt: number;
  updatedAt: number;
}

export interface CalculationResult {
  pfPowerProps: number;
  pfPowerSpells: number;
  pfPowerTotal: number;
  rawReduction: number;
  maxAllowedReduction: number;
  effectiveReduction: number;
  reductionCapped: boolean;
  pfEffective: number;
  maxPowerAllowed: number;
  curseCapBonus: number;
  rarityMatch: boolean;
  suggestedRarity: RarityKey;
  suggestedPrice: string;
  warnings: string[];
  errors: string[];
}
