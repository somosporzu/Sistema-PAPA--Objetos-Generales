import {
  PapaItem,
  CalculationResult,
  ContainedSpell,
  RarityKey
} from '../types/papa';
import {
  RARITIES,
  SPELL_LEVEL_DATA,
  RECHARGE_FACTORS,
  COMPATIBILITY_ADJUSTMENT
} from '../data/papaData';

export function calculateSpellCost(spell: ContainedSpell): number {
  const levelInfo = SPELL_LEVEL_DATA[spell.level] || SPELL_LEVEL_DATA[1];
  const rechargeInfo = RECHARGE_FACTORS[spell.recharge] || RECHARGE_FACTORS.descanso_largo;
  const compatibilityInfo = COMPATIBILITY_ADJUSTMENT[spell.compatibility] || COMPATIBILITY_ADJUSTMENT.compatible;

  let basePlusExtra = levelInfo.basePf;
  if (spell.recharge === 'libre') {
    // Libre / ilimitada ignora el campo cargas según la regla oficial
    basePlusExtra = levelInfo.basePf;
  } else {
    const extraCharges = Math.max(0, (spell.charges || 1) - 1);
    basePlusExtra = levelInfo.basePf + (extraCharges * levelInfo.extraChargePf);
  }

  const spellPf = (rechargeInfo.factor * basePlusExtra) + compatibilityInfo.cost;
  return spellPf;
}

export function determineRarityFromPf(pfEffective: number): RarityKey {
  if (pfEffective <= 5) return 'poco_comun';
  if (pfEffective <= 10) return 'raro';
  if (pfEffective <= 15) return 'muy_raro';
  if (pfEffective <= 25) return 'legendario';
  return 'artefacto';
}

export function calculateItemPF(item: PapaItem): CalculationResult {
  const properties = item?.properties || [];
  const spells = item?.spells || [];
  const requirements = item?.requirements || [];
  const curses = item?.curses || [];

  // 1. PF de Poder por Propiedades
  const pfPowerProps = properties.reduce((sum, p) => sum + (p?.cost || 0), 0);

  // 2. PF de Poder por Conjuros Contenidos
  const pfPowerSpells = spells.reduce((sum, s) => {
    return sum + (s?.calculatedPf || (s ? calculateSpellCost(s) : 0));
  }, 0);

  const pfPowerTotal = pfPowerProps + pfPowerSpells;

  // 3. Requisitos y Reducción
  const rawReduction = requirements.reduce((sum, r) => sum + (r?.reduction || 0), 0);

  // Regla oficial: Los requisitos no pueden reducir el PF efectivo por debajo de la mitad del PF de Poder, redondeado hacia arriba.
  // Por tanto, el PF efectivo mínimo permitido es Math.ceil(pfPowerTotal / 2).
  // La reducción máxima permitida es pfPowerTotal - Math.ceil(pfPowerTotal / 2) = Math.floor(pfPowerTotal / 2).
  const maxAllowedReduction = Math.floor(pfPowerTotal / 2);
  const reductionCapped = rawReduction > maxAllowedReduction;
  const effectiveReduction = Math.min(rawReduction, maxAllowedReduction);

  // 4. PF Efectivos
  const pfEffective = Math.max(0, pfPowerTotal - effectiveReduction);

  // 5. Maldiciones y límite de poder
  const targetRarityInfo = RARITIES[item?.targetRarity] || RARITIES.poco_comun;
  const curseCapBonus = curses.reduce((sum, c) => sum + (c?.bonusCap || 0), 0);
  
  // Límite de poder máximo permitido con o sin maldiciones
  let maxPowerAllowed = targetRarityInfo.maxPowerWithoutCurse;
  if (curses.length > 0 && targetRarityInfo.id !== 'artefacto') {
    maxPowerAllowed = Math.min(
      targetRarityInfo.maxPowerWithCurse,
      targetRarityInfo.maxPowerWithoutCurse + curseCapBonus
    );
  }

  // 6. Validación de Rareza
  const suggestedRarity = determineRarityFromPf(pfEffective);
  const rarityMatch =
    targetRarityInfo.id === 'artefacto'
      ? pfEffective >= 26
      : pfEffective >= targetRarityInfo.minPf && pfEffective <= targetRarityInfo.maxPf;

  const warnings: string[] = [];
  const errors: string[] = [];

  // Chequeo de rango de rareza
  if (!rarityMatch) {
    if (pfEffective < targetRarityInfo.minPf) {
      warnings.push(
        `El PF efectivo (${pfEffective} PF) está por debajo del mínimo para ${targetRarityInfo.name} (${targetRarityInfo.minPf}–${targetRarityInfo.maxPf} PF). Podrías catalogarlo como ${RARITIES[suggestedRarity].name}.`
      );
    } else if (pfEffective > targetRarityInfo.maxPf && targetRarityInfo.id !== 'artefacto') {
      warnings.push(
        `El PF efectivo (${pfEffective} PF) supera el máximo para ${targetRarityInfo.name} (máx. ${targetRarityInfo.maxPf} PF). Debería elevarse a ${RARITIES[suggestedRarity].name} o añadir más requisitos.`
      );
    }
  }

  // Chequeo de límite de PF de Poder (Paso 1 antes de requisitos)
  if (targetRarityInfo.id !== 'artefacto' && pfPowerTotal > maxPowerAllowed) {
    if (curses.length === 0) {
      errors.push(
        `El PF de Poder (${pfPowerTotal} PF) supera el límite de ${targetRarityInfo.maxPowerWithoutCurse} PF para ${targetRarityInfo.name} sin maldición. Agrega una maldición o reduce propiedades.`
      );
    } else {
      errors.push(
        `El PF de Poder (${pfPowerTotal} PF) excede incluso el tope ampliado con maldición (${maxPowerAllowed} PF) para ${targetRarityInfo.name}.`
      );
    }
  }

  // Chequeo de reducción topada
  if (reductionCapped) {
    warnings.push(
      `Los requisitos suman −${rawReduction} PF, pero según la regla oficial no pueden reducir el PF efectivo por debajo del 50% del Poder (${Math.ceil(pfPowerTotal / 2)} PF). Se aplican −${effectiveReduction} PF.`
    );
  }

  // Chequeo de límites de bonos según rareza
  // Atributos
  const hasAttr3 = properties.some(p => p?.propertyId === 'attr_3_specific');
  const hasAttr2 = properties.some(p => p?.propertyId === 'attr_2_specific' || p?.propertyId === 'attr_1_two');
  if (hasAttr3 && item.targetRarity !== 'legendario' && item.targetRarity !== 'artefacto') {
    errors.push(`+3 a un Atributo solo está permitido en rareza Legendario o Artefacto.`);
  }
  if (hasAttr2 && (item.targetRarity === 'poco_comun' || item.targetRarity === 'raro')) {
    errors.push(`Bonos de +2 o a múltiples Atributos requieren al menos rareza Muy Raro.`);
  }

  return {
    pfPowerProps,
    pfPowerSpells,
    pfPowerTotal,
    rawReduction,
    maxAllowedReduction,
    effectiveReduction,
    reductionCapped,
    pfEffective,
    maxPowerAllowed,
    curseCapBonus,
    rarityMatch,
    suggestedRarity,
    suggestedPrice: targetRarityInfo.priceRange,
    warnings,
    errors
  };
}

export function createEmptyItem(): PapaItem {
  return {
    id: 'item-' + Date.now(),
    name: 'Nueva Creación',
    type: 'Arma (Cuerpo a cuerpo)',
    targetRarity: 'raro',
    concept: '',
    descriptionWhat: '',
    descriptionWhy: '',
    descriptionPrice: '',
    fullDescription: '',
    properties: [],
    spells: [],
    requirements: [],
    curses: [],
    checklist: {
      hasClearStory: false,
      powerReflectsAll: false,
      requirementsReallyLimit: false,
      curseMattersInGame: false,
      respectsRarityLimits: false,
      doesNotReplaceCharacter: false,
      usableWithoutImprovRules: false
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}
