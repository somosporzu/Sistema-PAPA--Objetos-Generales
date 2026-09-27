import React from 'react';
import { X, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { PapaItem } from '../types/papa';
import { OFFICIAL_EXAMPLES, RARITIES } from '../data/papaData';
import { calculateItemPF } from '../utils/calculator';

interface ExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExample: (example: PapaItem) => void;
}

export const ExamplesModal: React.FC<ExamplesModalProps> = ({
  isOpen,
  onClose,
  onSelectExample
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E5CB7D]/10 border border-[#E5CB7D]/30 text-[#E5CB7D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#E5CB7D]">
                Ejemplos Oficiales del Manual P.A.P.A.
              </h2>
              <p className="text-xs text-stone-400">
                8 objetos canónicos de la Sección 6 del documento para explorar, editar y usar como base
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_EXAMPLES.map((ex) => {
            const rarity = RARITIES[ex.targetRarity];
            const calc = calculateItemPF(ex);

            return (
              <div
                key={ex.id}
                className="p-4 bg-black/40 border border-white/10 rounded-xl hover:border-[#E5CB7D]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border"
                      style={{
                        backgroundColor: rarity.badgeBg,
                        borderColor: rarity.badgeBorder,
                        color: rarity.color
                      }}
                    >
                      {rarity.name}
                    </span>
                    <span className="text-xs font-mono text-[#E5CB7D]">
                      Poder {calc.pfPowerTotal} PF · Efectivo {calc.pfEffective} PF
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-white group-hover:text-[#E5CB7D] transition-colors">
                    {ex.name}
                  </h3>
                  <span className="text-xs text-stone-400 block mb-2">{ex.type}</span>

                  <p className="text-xs text-stone-300 italic mb-3">
                    «{ex.fullDescription}»
                  </p>

                  <div className="space-y-1 text-xs text-stone-400 border-t border-white/5 pt-2">
                    <div>
                      <strong className="text-stone-300">Propiedades:</strong>{' '}
                      {ex.properties.map((p) => p.name).join(', ') || 'Ninguna'}
                    </div>
                    {ex.spells.length > 0 && (
                      <div>
                        <strong className="text-[#E02B69]">Conjuro:</strong>{' '}
                        {ex.spells.map((s) => `${s.name} (Nivel ${s.level})`).join(', ')}
                      </div>
                    )}
                    {ex.requirements.length > 0 && (
                      <div>
                        <strong className="text-stone-300">Requisito:</strong>{' '}
                        {ex.requirements.map((r) => r.name).join(', ')}
                      </div>
                    )}
                    {ex.curses.length > 0 && (
                      <div>
                        <strong className="text-[#C26D74]">Maldición:</strong>{' '}
                        {ex.curses.map((c) => c.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">
                    {rarity.priceRange}
                  </span>
                  <button
                    onClick={() => {
                      onSelectExample(ex);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors"
                  >
                    <span>Cargar en Forja</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
