import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Wand2,
  BookOpen,
  Search,
  Filter,
  Flame,
  Droplets,
  Mountain,
  Shield,
  CircleDot,
  Check
} from 'lucide-react';
import {
  ContainedSpell,
  SpellLevel,
  RechargeType,
  CompatibilityType
} from '../types/papa';
import {
  SPELL_LEVEL_DATA,
  RECHARGE_FACTORS,
  COMPATIBILITY_ADJUSTMENT
} from '../data/papaData';
import {
  OFFICIAL_GRIMOIRE_SPELLS,
  MAGIC_ENERGIES,
  MAGIC_AFFINITIES,
  OfficialGrimoireSpell,
  MagicEnergy
} from '../data/papaSpells';
import { calculateSpellCost } from '../utils/calculator';

interface SpellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (spell: ContainedSpell) => void;
  initialSpell?: ContainedSpell | null;
}

export const SpellModal: React.FC<SpellModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSpell
}) => {
  // Mode: 'catalog' | 'custom'
  const [activeTab, setActiveTab] = useState<'catalog' | 'custom'>('catalog');

  // Fields for spell builder
  const [name, setName] = useState('');
  const [level, setLevel] = useState<SpellLevel>(1);
  const [charges, setCharges] = useState(1);
  const [recharge, setRecharge] = useState<RechargeType>('descanso_largo');
  const [compatibility, setCompatibility] = useState<CompatibilityType>('compatible');
  const [energy, setEnergy] = useState<MagicEnergy>('Destrucción');
  const [affinity, setAffinity] = useState('Sin Afinidad');
  const [spellType, setSpellType] = useState('Ataque');
  const [range, setRange] = useState('Cerca');
  const [effect, setEffect] = useState('');

  // Catalog search / filter state
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedEnergyFilter, setSelectedEnergyFilter] = useState<string>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');
  const [selectedGrimoireSpell, setSelectedGrimoireSpell] = useState<OfficialGrimoireSpell | null>(null);

  useEffect(() => {
    if (initialSpell) {
      setName(initialSpell.name);
      setLevel(initialSpell.level);
      setCharges(initialSpell.charges);
      setRecharge(initialSpell.recharge);
      setCompatibility(initialSpell.compatibility);
      setSpellType(initialSpell.spellType);
      setEffect(initialSpell.effect);
      setActiveTab('custom'); // Editing existing spell opens in custom form
    } else {
      setName('');
      setLevel(1);
      setCharges(1);
      setRecharge('descanso_largo');
      setCompatibility('compatible');
      setEnergy('Destrucción');
      setAffinity('Sin Afinidad');
      setSpellType('Ataque');
      setRange('Cerca');
      setEffect('');
      setSelectedGrimoireSpell(null);
      setActiveTab('catalog');
    }
  }, [initialSpell, isOpen]);

  if (!isOpen) return null;

  const currentLevelData = SPELL_LEVEL_DATA[level];
  const currentRechargeData = RECHARGE_FACTORS[recharge];
  const currentCompatibilityData = COMPATIBILITY_ADJUSTMENT[compatibility];

  const calculatedPf = calculateSpellCost({
    id: 'preview',
    name,
    level,
    charges,
    recharge,
    compatibility,
    energyAffinity: `${energy} / ${affinity}`,
    spellType: `${spellType} (${range})`,
    effect,
    saveDc: currentLevelData.saveDc,
    calculatedPf: 0
  });

  const handleSelectFromGrimoire = (spell: OfficialGrimoireSpell) => {
    setSelectedGrimoireSpell(spell);
    setName(spell.name);
    setLevel(spell.level);
    setEnergy(spell.energy);
    setAffinity(spell.affinity);
    setSpellType(spell.type);
    setRange(spell.range);
    setEffect(spell.effect);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: initialSpell?.id || 'spell-' + Date.now(),
      name: name.trim(),
      level,
      charges: recharge === 'libre' ? 1 : Math.max(1, charges),
      recharge,
      compatibility,
      energyAffinity: `${energy} · ${affinity}`,
      spellType: `${spellType} (${range})`,
      effect: effect.trim(),
      saveDc: currentLevelData.saveDc,
      calculatedPf
    });
    onClose();
  };

  const filteredGrimoire = OFFICIAL_GRIMOIRE_SPELLS.filter((s) => {
    const matchesEnergy = selectedEnergyFilter === 'all' || s.energy === selectedEnergyFilter;
    const matchesLevel = selectedLevelFilter === 'all' || s.level === selectedLevelFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      s.effect.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      s.flavor.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      s.affinity.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchesEnergy && matchesLevel && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E02B69]/15 border border-[#E02B69]/30 text-[#E02B69]">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#E5CB7D]">
                {initialSpell ? 'Editar Conjuro Contenido' : 'Añadir Conjuro Contenido'}
              </h2>
              <p className="text-xs text-stone-400">
                Selecciona del Grimorio Oficial del Manual (págs. 48–64) o forja un conjuro personalizado
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Grimorio vs Personalizado) */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/5 bg-[#18181B]">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'catalog'
                ? 'border-[#E5CB7D] text-[#E5CB7D]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#E02B69]" />
            Grimorio Oficial del Manual ({OFFICIAL_GRIMOIRE_SPELLS.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'custom'
                ? 'border-[#E5CB7D] text-[#E5CB7D]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E5CB7D]" />
            Conjuro Personalizado a Medida
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[62vh] space-y-5 text-sm">
          {activeTab === 'catalog' ? (
            /* ================= Grimorio Catalog Mode ================= */
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Buscar por nombre, efecto, sabor o afinidad..."
                    className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                  />
                </div>
                {/* Level selector */}
                <div className="flex items-center gap-1 overflow-x-auto text-xs">
                  <button
                    onClick={() => setSelectedLevelFilter('all')}
                    className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                      selectedLevelFilter === 'all'
                        ? 'bg-[#E5CB7D] text-stone-900 border-[#E5CB7D] font-bold'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    Todos
                  </button>
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevelFilter(lvl)}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        selectedLevelFilter === lvl
                          ? 'bg-[#E5CB7D] text-stone-900 border-[#E5CB7D] font-bold'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      Nivel {lvl === 1 ? 'I' : lvl === 2 ? 'II' : lvl === 3 ? 'III' : lvl === 4 ? 'IV' : 'V'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setSelectedEnergyFilter('all')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    selectedEnergyFilter === 'all'
                      ? 'bg-[#E02B69] text-white font-semibold'
                      : 'bg-white/5 text-stone-400 hover:text-white'
                  }`}
                >
                  Todas las Energías
                </button>
                {MAGIC_ENERGIES.map((e) => (
                  <button
                    key={e.name}
                    onClick={() => setSelectedEnergyFilter(e.name)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      selectedEnergyFilter === e.name
                        ? 'text-white font-semibold'
                        : 'bg-white/5 text-stone-400 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: selectedEnergyFilter === e.name ? e.color : undefined
                    }}
                  >
                    {e.name}
                  </button>
                ))}
              </div>

              {/* Grid of Grimoire Spells */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1">
                {filteredGrimoire.map((s) => {
                  const isSelected = selectedGrimoireSpell?.id === s.id;
                  const energyObj = MAGIC_ENERGIES.find((e) => e.name === s.energy);

                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSelectFromGrimoire(s)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-black/80 border-[#E5CB7D] ring-2 ring-[#E5CB7D]/40'
                          : 'bg-black/30 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-bold text-sm text-white block">
                            {s.name}
                          </span>
                          <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                            <span
                              className="font-semibold"
                              style={{ color: energyObj?.color || '#E5CB7D' }}
                            >
                              {s.energy}
                            </span>
                            <span className="text-stone-500">·</span>
                            <span className="text-stone-400 font-mono">
                              Nivel {s.level === 1 ? 'I' : s.level === 2 ? 'II' : s.level === 3 ? 'III' : s.level === 4 ? 'IV' : 'V'}
                            </span>
                            <span className="text-stone-500">·</span>
                            <span className="text-stone-400">{s.affinity}</span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#E5CB7D]">
                          ND {s.saveDc}
                        </span>
                      </div>

                      {s.flavor && (
                        <p className="text-[11px] text-[#E5CB7D]/80 italic mt-1.5 line-clamp-1">
                          «{s.flavor}»
                        </p>
                      )}

                      <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                        {s.effect}
                      </p>

                      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-400">
                        <span>Tipo: <strong className="text-stone-300">{s.type}</strong> ({s.range})</span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <Check className="w-3.5 h-3.5" /> Seleccionado
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedGrimoireSpell && (
                <div className="p-3 bg-[#E5CB7D]/10 border border-[#E5CB7D]/30 rounded-lg text-xs text-[#E5CB7D]">
                  Has elegido <strong>{selectedGrimoireSpell.name}</strong> ({selectedGrimoireSpell.energy}, Nivel {selectedGrimoireSpell.level}). Ajusta abajo cuántas cargas y cómo recarga el objeto.
                </div>
              )}
            </div>
          ) : (
            /* ================= Custom Spell Form ================= */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Nombre del Conjuro *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Torrente Helado, Ojo de la Tormenta..."
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Energía Dominante
                  </label>
                  <select
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value as MagicEnergy)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                  >
                    {MAGIC_ENERGIES.map((en) => (
                      <option key={en.name} value={en.name}>
                        {en.name} ({en.desc.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Nivel del Conjuro
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(parseInt(e.target.value) as SpellLevel)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                  >
                    <option value={1}>Nivel I (Salvación ND 9, Base 2 PF)</option>
                    <option value={2}>Nivel II (Salvación ND 12, Base 4 PF)</option>
                    <option value={3}>Nivel III (Salvación ND 14, Base 7 PF)</option>
                    <option value={4}>Nivel IV (Salvación ND 16, Base 11 PF)</option>
                    <option value={5}>Nivel V (Salvación ND 18, Base 16 PF)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Afinidad Elemental
                  </label>
                  <select
                    value={affinity}
                    onChange={(e) => setAffinity(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                  >
                    {MAGIC_AFFINITIES.map((af) => (
                      <option key={af} value={af}>
                        {af}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Tipo / Uso
                  </label>
                  <select
                    value={spellType}
                    onChange={(e) => setSpellType(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                  >
                    <option value="Ataque">Ataque (Acción Principal / Salvación)</option>
                    <option value="Apoyo">Apoyo (Beneficia al aliado o usuario)</option>
                    <option value="Reacción">Reacción (Respuesta a evento)</option>
                    <option value="Utilidad">Utilidad (Exploración / Fuera de combate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Efecto Mecánico Concreto
                </label>
                <textarea
                  rows={2}
                  value={effect}
                  onChange={(e) => setEffect(e.target.value)}
                  placeholder="Describe daño, alcance en bandas (Contacto/Cerca/Lejos/Distante) y efectos de estado si aplica..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                />
              </div>
            </div>
          )}

          {/* ================= Common Section: Cargas, Recarga y Balance de PF ================= */}
          <div className="border-t border-white/10 pt-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5CB7D] font-serif flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E02B69]" />
              Parámetros del Objeto Portador (Cargas, Recarga y Afinidad)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Cargas Disponibles
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    disabled={recharge === 'libre'}
                    value={recharge === 'libre' ? 1 : charges}
                    onChange={(e) => setCharges(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono text-center disabled:opacity-40 focus:outline-none focus:border-[#E5CB7D]"
                  />
                  <span className="text-xs text-stone-400">
                    {recharge === 'libre'
                      ? '(Libre ignora cargas)'
                      : charges === 1
                      ? '1 carga (sin extras)'
                      : `+${(charges - 1) * currentLevelData.extraChargePf} PF por cargas adicionales`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Método de Recarga
                </label>
                <select
                  value={recharge}
                  onChange={(e) => setRecharge(e.target.value as RechargeType)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                >
                  <option value="nunca">Nunca (se destruye al agotarse) — Factor ×1</option>
                  <option value="descanso_largo">Por Descanso Largo — Factor ×2</option>
                  <option value="descanso_corto">Por Descanso Corto — Factor ×3</option>
                  <option value="libre">Libre / Ilimitada bajo condición — Factor ×5</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Compatibilidad con la Senda / Portador
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {(['compatible', 'neutral', 'incompatible'] as CompatibilityType[]).map((c) => {
                  const info = COMPATIBILITY_ADJUSTMENT[c];
                  const isSelected = compatibility === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCompatibility(c)}
                      className={`p-2.5 text-left rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-[#E02B69]/15 border-[#E02B69] text-white font-medium'
                          : 'bg-black/30 border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span>{c === 'compatible' ? 'Compatible' : c === 'neutral' ? 'Neutral' : 'Incompatible'}</span>
                        <span className="text-stone-300 font-mono">+{info.cost} PF</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-1 line-clamp-2">
                        {info.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Calculation Banner */}
            <div className="p-3.5 bg-black/50 border border-[#E5CB7D]/30 rounded-lg flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-[#E5CB7D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E02B69]" />
                  Fórmula Oficial P.A.P.A.:
                </div>
                <div className="text-xs font-mono text-stone-300">
                  Factor ({currentRechargeData.factor}) × [Base ({currentLevelData.basePf}) + Extra ({recharge === 'libre' ? 0 : (charges - 1) * currentLevelData.extraChargePf})] + Afinidad ({currentCompatibilityData.cost})
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Coste Total</span>
                <span className="text-2xl font-bold font-mono text-[#E5CB7D]">
                  {calculatedPf} <span className="text-xs font-normal text-stone-400">PF</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#161618]">
          <span className="text-xs text-stone-400">
            Salvación fijada: <strong className="text-white">ND {currentLevelData.saveDc}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="px-5 py-2 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] disabled:opacity-40 rounded-lg transition-colors"
            >
              {initialSpell ? 'Actualizar Conjuro' : 'Añadir Conjuro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
