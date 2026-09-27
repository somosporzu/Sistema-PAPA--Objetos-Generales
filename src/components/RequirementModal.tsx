import React, { useState } from 'react';
import { X, Search, Plus, ShieldCheck } from 'lucide-react';
import { SelectedRequirement, CatalogRequirement } from '../types/papa';
import { CATALOG_REQUIREMENTS } from '../data/papaData';

interface RequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRequirement: (req: SelectedRequirement) => void;
}

export const RequirementModal: React.FC<RequirementModalProps> = ({
  isOpen,
  onClose,
  onAddRequirement
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customDetailInput, setCustomDetailInput] = useState<Record<string, string>>({});

  // Custom requirement
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customReduction, setCustomReduction] = useState(1);
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const filteredRequirements = CATALOG_REQUIREMENTS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.notes && r.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectCatalog = (catItem: CatalogRequirement) => {
    const detail = customDetailInput[catItem.id] || '';
    onAddRequirement({
      instanceId: 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      requirementId: catItem.id,
      name: catItem.name,
      reduction: catItem.reduction,
      customDetail: detail || catItem.notes
    });
  };

  const handleCreateCustom = () => {
    if (!customName.trim()) return;
    onAddRequirement({
      instanceId: 'req-custom-' + Date.now(),
      requirementId: 'custom_req_' + Date.now(),
      name: customName.trim(),
      reduction: Math.max(1, Number(customReduction)),
      customDetail: customNotes.trim()
    });
    setCustomName('');
    setCustomReduction(1);
    setCustomNotes('');
    setIsCustomMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E5CB7D]/10 border border-[#E5CB7D]/30 text-[#E5CB7D]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#E5CB7D]">
                Añadir Requisito de Uso
              </h2>
              <p className="text-xs text-stone-400">
                Los requisitos limitan quién o cuándo se usa el objeto, reduciendo su PF efectivo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isCustomMode
                  ? 'bg-[#E02B69] border-[#E02B69] text-white'
                  : 'bg-white/5 border-white/10 text-[#E5CB7D] hover:bg-white/10'
              }`}
            >
              {isCustomMode ? 'Ver Catálogo Oficial' : '+ Requisito Personalizado'}
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
            <div className="p-4 bg-black/40 border border-[#E5CB7D]/20 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-[#E5CB7D]">
                Requisito Personalizado
              </h3>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Nombre del Requisito *
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ej. Juramento de no mentir jamás, Estirpe de los Valles..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Reducción en PF (1 a 4)
                </label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={customReduction}
                  onChange={(e) => setCustomReduction(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-[#E5CB7D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Justificación / Detalle
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="¿Por qué limita de verdad al portador?"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#E5CB7D]"
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
                  className="px-5 py-2 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] disabled:opacity-40 rounded-lg"
                >
                  Añadir Requisito
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="p-4 border-b border-white/10 bg-[#161618]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar requisitos oficiales (Concepto, Naturaleza, Atributo, Senda, Entorno...)"
                  className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                />
              </div>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
              {filteredRequirements.map((req) => {
                const currentInputValue = customDetailInput[req.id] || '';
                return (
                  <div
                    key={req.id}
                    className="p-3 bg-black/30 border border-white/10 rounded-lg hover:border-[#E5CB7D]/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{req.name}</span>
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#E02B69]/15 text-[#E02B69] border border-[#E02B69]/30">
                          −{req.reduction} PF
                        </span>
                      </div>
                      {req.notes && (
                        <p className="text-xs text-stone-400 mt-0.5">{req.notes}</p>
                      )}
                      {req.requiresInput && (
                        <input
                          type="text"
                          placeholder={req.requiresInput}
                          value={currentInputValue}
                          onChange={(e) =>
                            setCustomDetailInput({
                              ...customDetailInput,
                              [req.id]: e.target.value
                            })
                          }
                          className="mt-1.5 w-full max-w-md px-2.5 py-1 text-xs bg-black/60 border border-white/15 rounded text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleSelectCatalog(req)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-md transition-colors shrink-0"
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
            Recordatorio: Los requisitos no pueden reducir el PF efectivo por debajo del 50% del Poder.
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
