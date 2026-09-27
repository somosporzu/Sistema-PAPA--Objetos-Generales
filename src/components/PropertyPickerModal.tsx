import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Filter, Sparkles } from 'lucide-react';
import {
  CatalogProperty,
  PropertyCategory,
  SelectedProperty
} from '../types/papa';
import {
  CATALOG_PROPERTIES,
  PROPERTY_CATEGORIES
} from '../data/papaData';

interface PropertyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (prop: SelectedProperty) => void;
}

export const PropertyPickerModal: React.FC<PropertyPickerModalProps> = ({
  isOpen,
  onClose,
  onAddProperty
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customDetailInput, setCustomDetailInput] = useState<Record<string, string>>({});

  // Custom property builder state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCost, setCustomCost] = useState(2);
  const [customCategory, setCustomCategory] = useState<PropertyCategory>('combate');
  const [customNotes, setCustomNotes] = useState('');

  const filteredProperties = useMemo(() => {
    return CATALOG_PROPERTIES.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.notes.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  const handleSelectCatalog = (catalogItem: CatalogProperty) => {
    const detail = customDetailInput[catalogItem.id] || '';
    onAddProperty({
      instanceId: 'prop-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      propertyId: catalogItem.id,
      name: catalogItem.name,
      cost: catalogItem.cost,
      category: catalogItem.category,
      notes: catalogItem.notes,
      customDetail: detail
    });
  };

  const handleCreateCustom = () => {
    if (!customName.trim()) return;
    onAddProperty({
      instanceId: 'prop-custom-' + Date.now(),
      propertyId: 'custom_' + Date.now(),
      name: customName.trim(),
      cost: Number(customCost),
      category: customCategory,
      notes: customNotes.trim() || 'Propiedad personalizada creada para el objeto.',
      customDetail: ''
    });
    setCustomName('');
    setCustomCost(2);
    setCustomNotes('');
    setIsCustomMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/40 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div>
            <h2 className="text-lg font-bold font-serif text-[#E5CB7D]">
              Catálogo de Propiedades P.A.P.A.
            </h2>
            <p className="text-xs text-stone-400">
              Selecciona propiedades del manual oficial o crea una a medida
            </p>
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
              {isCustomMode ? 'Ver Catálogo Oficial' : '+ Propiedad a Medida'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isCustomMode ? (
          /* Custom Property Form */
          <div className="p-6 space-y-4 max-w-xl mx-auto w-full">
            <div className="p-4 bg-black/40 border border-[#E5CB7D]/20 rounded-xl space-y-4">
              <h3 className="text-sm font-semibold text-[#E5CB7D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E02B69]" />
                Crear Propiedad Personalizada
              </h3>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Nombre de la Propiedad *
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ej. Marcha del Viento, Empuñadura de Hueso..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Coste en PF
                  </label>
                  <input
                    type="number"
                    value={customCost}
                    onChange={(e) => setCustomCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-[#E5CB7D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as PropertyCategory)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#E5CB7D]"
                  >
                    {PROPERTY_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Descripción / Notas de Regla
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Explica qué hace y bajo qué condiciones opera."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#E5CB7D]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white"
                >
                  Volver al Catálogo
                </button>
                <button
                  type="button"
                  onClick={handleCreateCustom}
                  disabled={!customName.trim()}
                  className="px-5 py-2 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] disabled:opacity-40 rounded-lg transition-colors"
                >
                  Añadir Propiedad
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Catalog View */
          <>
            {/* Filters Bar */}
            <div className="p-4 border-b border-white/10 bg-[#161618] space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar propiedades por nombre o efecto..."
                    className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-stone-400 hover:text-white text-xs"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills/Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#E5CB7D] text-stone-900 font-semibold'
                      : 'bg-white/5 text-stone-400 hover:text-white'
                  }`}
                >
                  Todas ({CATALOG_PROPERTIES.length})
                </button>
                {PROPERTY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#E5CB7D] text-stone-900 font-semibold'
                        : 'bg-white/5 text-stone-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Properties List */}
            <div className="p-4 overflow-y-auto max-h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredProperties.map((prop) => {
                const requiresInput = prop.requiresInput;
                const currentInputValue = customDetailInput[prop.id] || '';

                return (
                  <div
                    key={prop.id}
                    className="p-3.5 bg-black/30 border border-white/10 rounded-lg hover:border-[#E5CB7D]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {prop.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-mono font-bold shrink-0 ${
                            prop.cost < 0
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                              : 'bg-[#E5CB7D]/15 text-[#E5CB7D] border border-[#E5CB7D]/30'
                          }`}
                        >
                          {prop.cost > 0 ? `+${prop.cost} PF` : `${prop.cost} PF`}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        {prop.notes}
                      </p>
                      {prop.minRarity && (
                        <span className="inline-block mt-1 text-[10px] text-[#C26D74] font-medium">
                          Restricción: Mínimo rareza {prop.minRarity.replace('_', ' ')}
                        </span>
                      )}
                      {requiresInput && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder={requiresInput}
                            value={currentInputValue}
                            onChange={(e) =>
                              setCustomDetailInput({
                                ...customDetailInput,
                                [prop.id]: e.target.value
                              })
                            }
                            className="w-full px-2.5 py-1 text-xs bg-black/60 border border-white/15 rounded text-white placeholder-stone-500 focus:outline-none focus:border-[#E5CB7D]"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end">
                      <button
                        onClick={() => handleSelectCatalog(prop)}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-md transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Añadir a la Forja
                      </button>
                    </div>
                  </div>
                );
              })}
              {filteredProperties.length === 0 && (
                <div className="col-span-2 py-12 text-center text-stone-500 text-xs">
                  No se encontraron propiedades con ese término de búsqueda.
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161618] flex items-center justify-between text-xs text-stone-400">
          <span>
            Las propiedades son acumulables según los límites del tipo de bono.
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
