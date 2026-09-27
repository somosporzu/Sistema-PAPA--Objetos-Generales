import React, { useState } from 'react';
import { X, Skull, Plus, AlertOctagon } from 'lucide-react';
import { SelectedCurse, CatalogCurse, CurseIntensity } from '../types/papa';
import { CATALOG_CURSES } from '../data/papaData';

interface CurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCurse: (curse: SelectedCurse) => void;
}

export const CurseModal: React.FC<CurseModalProps> = ({
  isOpen,
  onClose,
  onAddCurse
}) => {
  const [selectedIntensity, setSelectedIntensity] = useState<string>('all');
  const [customDetailInput, setCustomDetailInput] = useState<Record<string, string>>({});

  // Custom curse state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customIntensity, setCustomIntensity] = useState<CurseIntensity>('media');
  const [customBonusCap, setCustomBonusCap] = useState(2);
  const [customEffect, setCustomEffect] = useState('');

  if (!isOpen) return null;

  const filteredCurses = CATALOG_CURSES.filter(
    (c) => selectedIntensity === 'all' || c.intensity === selectedIntensity
  );

  const handleSelectCatalog = (catItem: CatalogCurse) => {
    const detail = customDetailInput[catItem.id] || '';
    onAddCurse({
      instanceId: 'curse-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      curseId: catItem.id,
      name: catItem.name,
      intensity: catItem.intensity,
      bonusCap: catItem.bonusCap,
      effect: catItem.effect,
      customDetail: detail
    });
  };

  const handleCreateCustom = () => {
    if (!customName.trim()) return;
    onAddCurse({
      instanceId: 'curse-custom-' + Date.now(),
      curseId: 'custom_curse_' + Date.now(),
      name: customName.trim(),
      intensity: customIntensity,
      bonusCap: Number(customBonusCap),
      effect: customEffect.trim() || 'Efecto perjudicial tangible en juego.'
    });
    setCustomName('');
    setCustomBonusCap(2);
    setCustomEffect('');
    setIsCustomMode(false);
  };

  const intensityColorMap: Record<CurseIntensity, { text: string; bg: string; border: string }> = {
    menor: { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
    media: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
    mayor: { text: 'text-[#C26D74]', bg: 'bg-[#C26D74]/15', border: 'border-[#C26D74]/40' },
    legendaria: { text: 'text-[#E02B69]', bg: 'bg-[#E02B69]/15', border: 'border-[#E02B69]/40' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#1E1E22] border border-[#C26D74]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C26D74]/10 border border-[#C26D74]/30 text-[#C26D74]">
              <Skull className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#C26D74]">
                Carga por Maldición
              </h2>
              <p className="text-xs text-stone-400">
                Las maldiciones no reducen PF efectivo: permiten exceder el límite de Poder de la rareza
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isCustomMode
                  ? 'bg-[#E02B69] border-[#E02B69] text-white'
                  : 'bg-white/5 border-white/10 text-[#C26D74] hover:bg-white/10'
              }`}
            >
              {isCustomMode ? 'Ver Catálogo' : '+ Maldición a Medida'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isCustomMode ? (
          <div className="p-6 space-y-4 max-w-lg mx-auto w-full">
            <div className="p-4 bg-black/40 border border-[#C26D74]/30 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-[#C26D74]">
                Crear Maldición Personalizada
              </h3>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Nombre de la Maldición *
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ej. Sed de Venganza, Vínculo de Almas..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C26D74]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Intensidad
                  </label>
                  <select
                    value={customIntensity}
                    onChange={(e) => {
                      const int = e.target.value as CurseIntensity;
                      setCustomIntensity(int);
                      setCustomBonusCap(int === 'menor' ? 1 : int === 'media' ? 2 : int === 'mayor' ? 3 : 5);
                    }}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#C26D74]"
                  >
                    <option value="menor">Menor (+1 PF de Poder máx)</option>
                    <option value="media">Media (+2 PF de Poder máx)</option>
                    <option value="mayor">Mayor (+3 PF de Poder máx)</option>
                    <option value="legendaria">Legendaria (+4 a +7 PF máx)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Bono a Límite de Poder
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={customBonusCap}
                    onChange={(e) => setCustomBonusCap(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-[#C26D74]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Efecto Perjudicial Real
                </label>
                <textarea
                  rows={2}
                  value={customEffect}
                  onChange={(e) => setCustomEffect(e.target.value)}
                  placeholder="Debe generar consecuencias frecuentes y claras en juego para ser válida."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#C26D74]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleCreateCustom}
                  disabled={!customName.trim()}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#C26D74] hover:bg-[#D4848B] disabled:opacity-40 rounded-lg"
                >
                  Añadir Maldición
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Filter Pills */}
            <div className="p-4 border-b border-white/10 bg-[#161618] flex items-center gap-2 overflow-x-auto text-xs">
              <button
                onClick={() => setSelectedIntensity('all')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedIntensity === 'all'
                    ? 'bg-[#C26D74] text-white font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                Todas ({CATALOG_CURSES.length})
              </button>
              <button
                onClick={() => setSelectedIntensity('menor')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedIntensity === 'menor'
                    ? 'bg-amber-400 text-stone-900 font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                Menores (+1 PF máx)
              </button>
              <button
                onClick={() => setSelectedIntensity('media')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedIntensity === 'media'
                    ? 'bg-orange-400 text-stone-900 font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                Medias (+2 PF máx)
              </button>
              <button
                onClick={() => setSelectedIntensity('mayor')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedIntensity === 'mayor'
                    ? 'bg-[#C26D74] text-white font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                Mayores (+3 PF máx)
              </button>
              <button
                onClick={() => setSelectedIntensity('legendaria')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedIntensity === 'legendaria'
                    ? 'bg-[#E02B69] text-white font-semibold'
                    : 'bg-white/5 text-stone-400 hover:text-white'
                }`}
              >
                Legendarias (+4 a +7)
              </button>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2.5">
              {filteredCurses.map((curse) => {
                const colors = intensityColorMap[curse.intensity];
                return (
                  <div
                    key={curse.id}
                    className="p-3.5 bg-black/30 border border-white/10 rounded-lg hover:border-[#C26D74]/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{curse.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase border ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {curse.intensity}
                        </span>
                        <span className="text-xs font-mono text-[#E5CB7D]">
                          +{curse.bonusCap} Límite Poder
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        {curse.effect}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectCatalog(curse)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#C26D74] hover:bg-[#D4848B] rounded-md transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Añadir
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161618] flex items-center justify-between text-xs text-stone-400">
          <span>
            Regla: Una maldición solo cuenta si afecta de verdad al uso normal del objeto en juego.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
