import React from 'react';
import { X, FolderOpen, Trash2, ArrowRight, Calendar } from 'lucide-react';
import { PapaItem } from '../types/papa';
import { RARITIES } from '../data/papaData';
import { calculateItemPF } from '../utils/calculator';

interface SavedItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: PapaItem[];
  onLoadItem: (item: PapaItem) => void;
  onDeleteItem: (id: string) => void;
}

export const SavedItemsModal: React.FC<SavedItemsModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onLoadItem,
  onDeleteItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-stone-300">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#E5CB7D]">
                Mis Creaciones Guardadas ({savedItems.length})
              </h2>
              <p className="text-xs text-stone-400">
                Almacenados localmente en tu navegador
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

        {/* List */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
          {savedItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-stone-400 text-sm">No tienes objetos guardados todavía.</p>
              <p className="text-stone-500 text-xs">
                Crea un objeto en el taller y pulsa «Guardar en Forja» para conservarlo aquí.
              </p>
            </div>
          ) : (
            savedItems.map((it) => {
              const rarity = RARITIES[it.targetRarity] || RARITIES.poco_comun;
              const calc = calculateItemPF(it);
              const dateStr = new Date(it.updatedAt || it.createdAt).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={it.id}
                  className="p-4 bg-black/40 border border-white/10 rounded-xl hover:border-[#E5CB7D]/40 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border"
                        style={{
                          backgroundColor: rarity.badgeBg,
                          borderColor: rarity.badgeBorder,
                          color: rarity.color
                        }}
                      >
                        {rarity.name}
                      </span>
                      <span className="text-xs text-stone-400 font-medium truncate">
                        {it.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white truncate">
                      {it.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-stone-400 mt-1">
                      <span className="text-[#E5CB7D] font-mono">
                        {calc.pfEffective} PF Efectivos
                      </span>
                      <span>·</span>
                      <span>{it.properties.length} propiedades</span>
                      {it.spells.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-[#E02B69]">{it.spells.length} conjuro(s)</span>
                        </>
                      )}
                      <span>·</span>
                      <span className="flex items-center gap-1 text-stone-500">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onDeleteItem(it.id)}
                      className="p-2 text-stone-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
                      title="Eliminar de la lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onLoadItem(it);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors"
                    >
                      <span>Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
