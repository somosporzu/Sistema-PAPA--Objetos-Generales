import React, { useState } from 'react';
import {
  X,
  Search,
  Sword,
  Shield,
  ShieldCheck,
  Check,
  ArrowRight,
  Filter
} from 'lucide-react';
import {
  BASE_WEAPONS,
  BASE_ARMORS,
  BASE_SHIELDS,
  QUALITY_LEVELS,
  BaseWeapon,
  BaseArmor,
  BaseShield
} from '../data/papaEquipment';
import { BaseEquipmentConfig } from '../types/papa';

interface EquipmentPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBaseEquipment: (config: BaseEquipmentConfig, defaultItemName: string) => void;
}

export const EquipmentPickerModal: React.FC<EquipmentPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectBaseEquipment
}) => {
  const [tab, setTab] = useState<'weapons' | 'armors' | 'shields'>('weapons');
  const [search, setSearch] = useState('');
  const [quality, setQuality] = useState<number>(0);

  if (!isOpen) return null;

  const currentQuality = QUALITY_LEVELS.find((q) => q.val === quality) || QUALITY_LEVELS[3];

  const handlePickWeapon = (w: BaseWeapon) => {
    const finalCost = Math.round(w.costL * currentQuality.priceMultiplier);
    onSelectBaseEquipment(
      {
        baseEquipmentType: 'weapon',
        baseId: w.id,
        baseName: w.name,
        baseDamage: w.damage,
        damageType: w.damageType,
        quality,
        baseProperties: [...w.properties],
        baseCostL: finalCost
      },
      quality === 0 ? w.name : `${w.name} (${quality > 0 ? `+${quality}` : quality})`
    );
    onClose();
  };

  const handlePickArmor = (a: BaseArmor) => {
    const finalCost = Math.round(a.costL * currentQuality.priceMultiplier);
    const finalDef = Math.max(0, a.defenseBonus + quality);
    onSelectBaseEquipment(
      {
        baseEquipmentType: 'armor',
        baseId: a.id,
        baseName: a.name,
        defenseBonus: finalDef,
        quality,
        baseProperties: [...a.properties],
        baseCostL: finalCost
      },
      quality === 0 ? a.name : `${a.name} (${quality > 0 ? `+${quality}` : quality})`
    );
    onClose();
  };

  const handlePickShield = (s: BaseShield) => {
    const finalCost = Math.round(s.costL * currentQuality.priceMultiplier);
    const finalDef = Math.max(0, s.defenseBonus + quality);
    onSelectBaseEquipment(
      {
        baseEquipmentType: 'shield',
        baseId: s.id,
        baseName: s.name,
        defenseBonus: finalDef,
        quality,
        baseProperties: [...s.properties],
        baseCostL: finalCost
      },
      quality === 0 ? s.name : `${s.name} (${quality > 0 ? `+${quality}` : quality})`
    );
    onClose();
  };

  const filteredWeapons = BASE_WEAPONS.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.damageType.toLowerCase().includes(search.toLowerCase()) ||
      w.properties.some((p) => p.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredArmors = BASE_ARMORS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.properties.some((p) => p.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredShields = BASE_SHIELDS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E5CB7D]/15 border border-[#E5CB7D]/30 text-[#E5CB7D]">
              <Sword className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#E5CB7D]">
                Equipo Base del Manual PAPA
              </h2>
              <p className="text-xs text-stone-400">
                Selecciona un arma, armadura o escudo de referencia para imbuir con magia y propiedades
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

        {/* Quality selector bar */}
        <div className="p-4 border-b border-white/10 bg-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-300">Calidad Base (−3 a +3):</span>
            <select
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="px-3 py-1.5 bg-black/50 border border-white/15 rounded-lg text-xs font-semibold text-[#E5CB7D] focus:outline-none focus:border-[#E5CB7D]"
            >
              {QUALITY_LEVELS.map((q) => (
                <option key={q.val} value={q.val}>
                  {q.label}
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">
            {currentQuality.modText} · Precio base {Math.round(currentQuality.priceMultiplier * 100)}%
          </span>
        </div>

        {/* Category Tabs & Search */}
        <div className="p-4 border-b border-white/5 bg-[#161618] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setTab('weapons')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                tab === 'weapons'
                  ? 'bg-[#E02B69] text-white shadow-sm'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <Sword className="w-3.5 h-3.5" />
              Armas ({BASE_WEAPONS.length})
            </button>
            <button
              onClick={() => setTab('armors')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                tab === 'armors'
                  ? 'bg-[#E02B69] text-white shadow-sm'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Armaduras ({BASE_ARMORS.length})
            </button>
            <button
              onClick={() => setTab('shields')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                tab === 'shields'
                  ? 'bg-[#E02B69] text-white shadow-sm'
                  : 'bg-white/5 text-stone-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Escudos ({BASE_SHIELDS.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por nombre o propiedad..."
              className="w-full pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
            />
          </div>
        </div>

        {/* Equipment List */}
        <div className="p-6 overflow-y-auto max-h-[58vh] grid grid-cols-1 md:grid-cols-2 gap-3">
          {tab === 'weapons' &&
            filteredWeapons.map((w) => {
              const adjustedCost = Math.round(w.costL * currentQuality.priceMultiplier);
              return (
                <div
                  key={w.id}
                  className="p-3.5 bg-black/30 border border-white/10 rounded-xl hover:border-[#E5CB7D]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-white">{w.name}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#E02B69]/15 text-[#E02B69]">
                        {w.damage}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                      <span className="text-stone-300">{w.damageType}</span>
                      <span>·</span>
                      <span className={w.isMartial ? 'text-amber-400 font-semibold' : 'text-stone-400'}>
                        {w.isMartial ? 'Arma Marcial' : 'Arma Simple'}
                      </span>
                      <span>·</span>
                      <span className="font-mono text-[#E5CB7D]">{adjustedCost} L</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {w.properties.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-stone-300"
                        >
                          {p}
                        </span>
                      ))}
                      {quality !== 0 && (
                        <span className="px-2 py-0.5 rounded bg-[#E5CB7D]/15 border border-[#E5CB7D]/30 text-[10px] text-[#E5CB7D] font-mono">
                          {quality > 0 ? `+${quality}` : quality} Ataque/Daño
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => handlePickWeapon(w)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors"
                    >
                      <span>Usar de Base</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

          {tab === 'armors' &&
            filteredArmors.map((a) => {
              const adjustedCost = Math.round(a.costL * currentQuality.priceMultiplier);
              const finalDef = Math.max(0, a.defenseBonus + quality);
              return (
                <div
                  key={a.id}
                  className="p-3.5 bg-black/30 border border-white/10 rounded-xl hover:border-[#E5CB7D]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-white">{a.name}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#4FA3E3]/20 text-[#4FA3E3]">
                        +{finalDef} Defensa
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                      <span className="font-mono text-[#E5CB7D]">{adjustedCost} L</span>
                      <span>·</span>
                      <span>Base manual pág. 39</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {a.properties.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-stone-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => handlePickArmor(a)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors"
                    >
                      <span>Usar de Base</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

          {tab === 'shields' &&
            filteredShields.map((s) => {
              const adjustedCost = Math.round(s.costL * currentQuality.priceMultiplier);
              const finalDef = Math.max(0, s.defenseBonus + quality);
              return (
                <div
                  key={s.id}
                  className="p-3.5 bg-black/30 border border-white/10 rounded-xl hover:border-[#E5CB7D]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-white">{s.name}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#4FA3E3]/20 text-[#4FA3E3]">
                        +{finalDef} Defensa
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                      <span className="font-mono text-[#E5CB7D]">{adjustedCost} L</span>
                      <span>·</span>
                      <span>Base manual pág. 40</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {s.properties.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-stone-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => handlePickShield(s)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors"
                    >
                      <span>Usar de Base</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161618] flex items-center justify-between text-xs text-stone-400">
          <span>
            Los objetos especiales de PAPA pueden forjarse a partir de un arma o armadura común del manual.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
