import React from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Wand2,
  Shield,
  Skull,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Edit2,
  Sword,
  ShieldCheck
} from 'lucide-react';
import {
  PapaItem,
  CalculationResult,
  SelectedProperty,
  ContainedSpell,
  SelectedRequirement,
  SelectedCurse,
  RarityKey
} from '../types/papa';
import {
  RARITIES,
  ITEM_TYPES,
  RECHARGE_FACTORS
} from '../data/papaData';

interface ForgeWorkbenchProps {
  item: PapaItem;
  calc: CalculationResult;
  onChange: (updatedItem: PapaItem) => void;
  onOpenEquipmentPicker: () => void;
  onOpenPropertyPicker: () => void;
  onOpenSpellModal: (spellToEdit?: ContainedSpell) => void;
  onOpenRequirementPicker: () => void;
  onOpenCursePicker: () => void;
}

export const ForgeWorkbench: React.FC<ForgeWorkbenchProps> = ({
  item,
  calc,
  onChange,
  onOpenEquipmentPicker,
  onOpenPropertyPicker,
  onOpenSpellModal,
  onOpenRequirementPicker,
  onOpenCursePicker
}) => {
  const currentRarity = RARITIES[item.targetRarity] || RARITIES.poco_comun;

  const updateField = <K extends keyof PapaItem>(field: K, value: PapaItem[K]) => {
    onChange({
      ...item,
      [field]: value,
      updatedAt: Date.now()
    });
  };

  const removeProperty = (instanceId: string) => {
    updateField(
      'properties',
      item.properties.filter((p) => p.instanceId !== instanceId)
    );
  };

  const updatePropertyDetail = (instanceId: string, customDetail: string) => {
    updateField(
      'properties',
      item.properties.map((p) => (p.instanceId === instanceId ? { ...p, customDetail } : p))
    );
  };

  const removeSpell = (id: string) => {
    updateField(
      'spells',
      item.spells.filter((s) => s.id !== id)
    );
  };

  const removeRequirement = (instanceId: string) => {
    updateField(
      'requirements',
      item.requirements.filter((r) => r.instanceId !== instanceId)
    );
  };

  const removeCurse = (instanceId: string) => {
    updateField(
      'curses',
      item.curses.filter((c) => c.instanceId !== instanceId)
    );
  };

  const clearBaseEquipment = () => {
    updateField('baseEquipment', undefined);
  };

  return (
    <div className="space-y-6">
      {/* 0. Base de Equipo Oficial (Armas / Armaduras / Escudos del Manual) */}
      <section className="bg-[#1E1E22] border border-[#E5CB7D]/30 rounded-xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sword className="w-5 h-5 text-[#E02B69]" />
            <div>
              <h2 className="text-base font-bold font-serif text-[#E5CB7D]">
                Equipo Base del Manual PAPA (Opcional)
              </h2>
              <p className="text-[11px] text-stone-400">
                Basar el objeto en un arma, armadura o escudo estándar de las tablas del manual
              </p>
            </div>
          </div>
          <button
            onClick={onOpenEquipmentPicker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors self-start sm:self-auto"
          >
            <Sword className="w-3.5 h-3.5" />
            {item.baseEquipment ? 'Cambiar Equipo Base' : 'Elegir Arma / Armadura Base'}
          </button>
        </div>

        {item.baseEquipment ? (
          <div className="p-3.5 bg-black/40 border border-[#E5CB7D]/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {item.baseEquipment.baseName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#E5CB7D] font-mono">
                  Calidad {item.baseEquipment.quality > 0 ? `+${item.baseEquipment.quality}` : item.baseEquipment.quality}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Coste base: {item.baseEquipment.baseCostL} L
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
                {item.baseEquipment.baseDamage && (
                  <span>
                    Daño: <strong className="text-[#E02B69]">{item.baseEquipment.baseDamage}</strong> ({item.baseEquipment.damageType})
                  </span>
                )}
                {item.baseEquipment.defenseBonus !== undefined && (
                  <span>
                    Defensa: <strong className="text-[#4FA3E3]">+{item.baseEquipment.defenseBonus}</strong>
                  </span>
                )}
                {item.baseEquipment.baseProperties.length > 0 && (
                  <span className="text-stone-400">
                    Propiedades: {item.baseEquipment.baseProperties.join(', ')}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={clearBaseEquipment}
              className="text-xs text-stone-400 hover:text-rose-400 self-end sm:self-center transition-colors"
            >
              Quitar base
            </button>
          </div>
        ) : (
          <div className="text-xs text-stone-400 italic">
            Ningún equipo base seleccionado. El objeto se creará como una pieza o accesorio libre sin perfil de arma/armadura común.
          </div>
        )}
      </section>

      {/* 1. Identidad y Concepto */}
      <section className="bg-[#1E1E22] border border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold font-serif text-[#E5CB7D] flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#E5CB7D]/20 text-[#E5CB7D] text-xs font-sans font-bold flex items-center justify-center">
              1
            </span>
            Identidad del Objeto
          </h2>
          <span className="text-xs text-stone-400">
            Nombre, tipo y rareza objetivo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Nombre del Objeto *
            </label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Ej. Espada de la Aurora Final, Manto del Umbral..."
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-serif text-sm placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Tipo de Objeto
            </label>
            <select
              value={item.type}
              onChange={(e) => updateField('type', e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#E5CB7D]"
            >
              {ITEM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selector de Rareza Objetivo */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1.5">
            Rareza Objetivo (Presupuesto de PF)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(Object.keys(RARITIES) as RarityKey[]).map((rKey) => {
              const r = RARITIES[rKey];
              const isSelected = item.targetRarity === rKey;
              return (
                <button
                  key={rKey}
                  type="button"
                  onClick={() => updateField('targetRarity', rKey)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-white/80 shadow-md ring-1 ring-white/30'
                      : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                  style={{
                    backgroundColor: isSelected ? r.badgeBg : undefined,
                    borderColor: isSelected ? r.color : undefined
                  }}
                >
                  <div className="font-semibold text-xs truncate" style={{ color: r.color }}>
                    {r.name}
                  </div>
                  <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                    {rKey === 'artefacto' ? '26+ PF' : `${r.minPf}–${r.maxPf} PF`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1">
            Concepto del Objeto (Arquetipo / Frase Guía)
          </label>
          <input
            type="text"
            value={item.concept}
            onChange={(e) => updateField('concept', e.target.value)}
            placeholder="Ej. Baluarte defensivo inquebrantable, Daga de asesino de la noche..."
            className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
          />
        </div>
      </section>

      {/* 2. Propiedades Pasivas y Bonificadores */}
      <section className="bg-[#1E1E22] border border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#E5CB7D]/20 text-[#E5CB7D] text-xs font-sans font-bold flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold font-serif text-[#E5CB7D]">
                Propiedades Pasivas ({item.properties.length})
              </h2>
              <p className="text-[11px] text-stone-400">
                Capacidades permanentes que no exigen tirada ni gasto de Resistencia
              </p>
            </div>
          </div>
          <button
            onClick={onOpenPropertyPicker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir Propiedad
          </button>
        </div>

        {item.properties.length === 0 ? (
          <div className="p-6 bg-black/30 border border-dashed border-white/10 rounded-lg text-center space-y-2">
            <p className="text-xs text-stone-400">No hay propiedades añadidas todavía.</p>
            <button
              onClick={onOpenPropertyPicker}
              className="text-xs text-[#E5CB7D] hover:underline inline-flex items-center gap-1"
            >
              Explorar el catálogo oficial (+1 Atributos, Combate, Movimiento, Salvaciones...)
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {item.properties.map((prop) => (
              <div
                key={prop.instanceId}
                className="p-3 bg-black/30 border border-white/10 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{prop.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        prop.cost < 0
                          ? 'bg-emerald-950/60 text-emerald-400'
                          : 'bg-[#E5CB7D]/15 text-[#E5CB7D]'
                      }`}
                    >
                      {prop.cost >= 0 ? `+${prop.cost} PF` : `${prop.cost} PF`}
                    </span>
                  </div>
                  {prop.notes && (
                    <p className="text-xs text-stone-400 mt-0.5">{prop.notes}</p>
                  )}
                  {/* Inline edit of custom detail if applicable */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="text"
                      value={prop.customDetail || ''}
                      onChange={(e) => updatePropertyDetail(prop.instanceId, e.target.value)}
                      placeholder="Detalle o condición concreta (ej. Cuerpo, en penumbra, fuego...)"
                      className="px-2 py-1 text-xs bg-black/60 border border-white/10 rounded text-stone-300 placeholder-stone-600 focus:outline-none focus:border-[#E5CB7D] w-full max-w-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => removeProperty(prop.instanceId)}
                  className="self-end sm:self-center p-1.5 text-stone-500 hover:text-rose-400 rounded hover:bg-white/5 transition-colors"
                  title="Eliminar propiedad"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Conjuros Contenidos */}
      <section className="bg-[#1E1E22] border border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#E02B69]/20 text-[#E02B69] text-xs font-sans font-bold flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold font-serif text-[#E02B69]">
                Conjuros Contenidos ({item.spells.length})
              </h2>
              <p className="text-[11px] text-stone-400">
                Poderes arcanos que el portador activa sin gastar PX ni conocer el conjuro
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenSpellModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#E02B69] hover:bg-[#B91C50] rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Forjar Conjuro
          </button>
        </div>

        {item.spells.length === 0 ? (
          <div className="p-6 bg-black/30 border border-dashed border-white/10 rounded-lg text-center space-y-2">
            <p className="text-xs text-stone-400">No hay conjuros contenidos en este objeto.</p>
            <button
              onClick={() => onOpenSpellModal()}
              className="text-xs text-[#E02B69] hover:underline inline-flex items-center gap-1"
            >
              + Añadir un conjuro (Nivel I a V con fórmula exacta de cargas y recarga)
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {item.spells.map((s) => (
              <div
                key={s.id}
                className="p-3.5 bg-black/30 border border-[#E02B69]/25 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{s.name}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#E02B69]/20 text-[#E02B69]">
                      +{s.calculatedPf} PF
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      Nivel {s.level === 1 ? 'I' : s.level === 2 ? 'II' : s.level === 3 ? 'III' : s.level === 4 ? 'IV' : 'V'} (ND {s.saveDc})
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-stone-400">Afinidad:</span>
                    <strong className="text-stone-200">{s.energyAffinity}</strong>
                    <span className="text-stone-500">·</span>
                    <span className="text-stone-400">Recarga:</span>
                    <span className="text-[#E5CB7D]">
                      {s.recharge === 'libre'
                        ? 'Libre / Ilimitada'
                        : `${s.charges} carga(s) (${RECHARGE_FACTORS[s.recharge]?.label})`}
                    </span>
                  </div>

                  {s.effect && (
                    <p className="text-xs text-stone-400 mt-1 italic">
                      {s.effect}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onOpenSpellModal(s)}
                    className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                    title="Editar conjuro"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeSpell(s.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-400 rounded hover:bg-white/5 transition-colors"
                    title="Eliminar conjuro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Requisitos de Uso (Abaratar PF) */}
      <section className="bg-[#1E1E22] border border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#E5CB7D]/20 text-[#E5CB7D] text-xs font-sans font-bold flex items-center justify-center">
              4
            </span>
            <div>
              <h2 className="text-base font-bold font-serif text-[#E5CB7D]">
                Requisitos de Uso ({item.requirements.length})
              </h2>
              <p className="text-[11px] text-stone-400">
                Reducen los PF efectivos porque limitan quién o cuándo se usa el objeto
              </p>
            </div>
          </div>
          <button
            onClick={onOpenRequirementPicker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir Requisito
          </button>
        </div>

        {/* 50% Rule Warning if applicable */}
        {calc.reductionCapped && (
          <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-amber-300">
                Límite de reducción del 50% alcanzado:
              </strong>
              Los requisitos suman −{calc.rawReduction} PF, pero el sistema P.A.P.A. estipula que los requisitos no pueden reducir el PF efectivo por debajo de la mitad del Poder ({Math.ceil(calc.pfPowerTotal / 2)} PF). Reducción aplicada: −{calc.effectiveReduction} PF.
            </div>
          </div>
        )}

        {item.requirements.length === 0 ? (
          <div className="p-4 bg-black/30 border border-dashed border-white/10 rounded-lg text-center text-xs text-stone-400">
            Sin requisitos. El objeto puede ser empuñado libremente por cualquiera.
          </div>
        ) : (
          <div className="space-y-2">
            {item.requirements.map((req) => (
              <div
                key={req.instanceId}
                className="p-3 bg-black/30 border border-white/10 rounded-lg flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{req.name}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#E02B69]/15 text-[#E02B69]">
                      −{req.reduction} PF
                    </span>
                  </div>
                  {req.customDetail && (
                    <p className="text-xs text-stone-400 mt-0.5">{req.customDetail}</p>
                  )}
                </div>
                <button
                  onClick={() => removeRequirement(req.instanceId)}
                  className="p-1.5 text-stone-500 hover:text-rose-400 rounded hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Cargas y Maldiciones */}
      <section className="bg-[#1E1E22] border border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#C26D74]/20 text-[#C26D74] text-xs font-sans font-bold flex items-center justify-center">
              5
            </span>
            <div>
              <h2 className="text-base font-bold font-serif text-[#C26D74]">
                Cargas y Maldiciones ({item.curses.length})
              </h2>
              <p className="text-[11px] text-stone-400">
                No alteran el PF efectivo; permiten exceder el límite de Poder de la rareza
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCursePicker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#C26D74] hover:bg-[#D4848B] rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir Maldición
          </button>
        </div>

        {item.curses.length === 0 ? (
          <div className="p-4 bg-black/30 border border-dashed border-white/10 rounded-lg text-center text-xs text-stone-400">
            Sin maldiciones. El tope de Poder es el estándar de {currentRarity.name} ({currentRarity.maxPowerWithoutCurse} PF).
          </div>
        ) : (
          <div className="space-y-2">
            {item.curses.map((c) => (
              <div
                key={c.instanceId}
                className="p-3 bg-black/30 border border-[#C26D74]/20 rounded-lg flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{c.name}</span>
                    <span className="text-[10px] uppercase font-bold text-[#C26D74] bg-[#C26D74]/15 px-2 py-0.5 rounded border border-[#C26D74]/30">
                      {c.intensity} (+{c.bonusCap} Límite)
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 mt-1">{c.effect}</p>
                </div>
                <button
                  onClick={() => removeCurse(c.instanceId)}
                  className="p-1.5 text-stone-500 hover:text-rose-400 rounded hover:bg-white/5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Historia y Las 3 Preguntas de P.A.P.A. */}
      <section className="bg-[#1E1E22] border border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#E5CB7D]/20 text-[#E5CB7D] text-xs font-sans font-bold flex items-center justify-center">
              6
            </span>
            <div>
              <h2 className="text-base font-bold font-serif text-[#E5CB7D]">
                Historia y Principios de Diseño
              </h2>
              <p className="text-[11px] text-stone-400">
                Principio 1: Cada objeto cuenta una historia. Nombre, descripción y mecánica deben apuntar en la misma dirección.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#E02B69] mb-1">
              ¿Qué hace? (Función mecánica clara y sensaciones en mesa)
            </label>
            <textarea
              rows={2}
              value={item.descriptionWhat}
              onChange={(e) => updateField('descriptionWhat', e.target.value)}
              placeholder="Ej. Proteger, atacar, curar, guardar un conjuro o permitir algo normalmente imposible..."
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E5CB7D] mb-1">
              ¿Por qué existe? (Origen, creador, cultura o catástrofe que le dio origen)
            </label>
            <textarea
              rows={2}
              value={item.descriptionWhy}
              onChange={(e) => updateField('descriptionWhy', e.target.value)}
              placeholder="Ej. Quién lo forjó, para qué propósito histórico o qué tradición..."
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C26D74] mb-1">
              ¿Qué precio tiene? (Balance económico, social, narrativo o espiritual)
            </label>
            <textarea
              rows={2}
              value={item.descriptionPrice}
              onChange={(e) => updateField('descriptionPrice', e.target.value)}
              placeholder="Ej. Consecuencia social, juramento exigido, precio en coronas o estigma..."
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Descripción Narrativa para el Jugador / Director
            </label>
            <textarea
              rows={2}
              value={item.fullDescription}
              onChange={(e) => updateField('fullDescription', e.target.value)}
              placeholder="Texto poético de ambientación (ej. «Su luz no embellece: muestra cicatrices, mentiras y sombras escondidas.»)"
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
