import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ForgeWorkbench } from './components/ForgeWorkbench';
import { LiveBalanceHUD } from './components/LiveBalanceHUD';
import { ItemSheetView } from './components/ItemSheetView';
import { RulesGuideModal } from './components/RulesGuideModal';
import { ExamplesModal } from './components/ExamplesModal';
import { SavedItemsModal } from './components/SavedItemsModal';
import { PropertyPickerModal } from './components/PropertyPickerModal';
import { SpellModal } from './components/SpellModal';
import { RequirementModal } from './components/RequirementModal';
import { CurseModal } from './components/CurseModal';
import { EquipmentPickerModal } from './components/EquipmentPickerModal';
import { PapaItem, ContainedSpell, SelectedProperty, SelectedRequirement, SelectedCurse, BaseEquipmentConfig } from './types/papa';
import { calculateItemPF, createEmptyItem } from './utils/calculator';
import { OFFICIAL_EXAMPLES } from './data/papaData';
import { Sparkles, Hammer, FileText, CheckCircle2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'papa_forge_creations_v2';

export default function App() {
  const [item, setItem] = useState<PapaItem>(() => {
    // Default to first example or empty item
    return OFFICIAL_EXAMPLES[1] || createEmptyItem();
  });

  const [savedItems, setSavedItems] = useState<PapaItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading saved items from localStorage', e);
    }
    return OFFICIAL_EXAMPLES.slice(0, 3);
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'sheet'>('editor');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isEquipmentPickerOpen, setIsEquipmentPickerOpen] = useState(false);
  const [isPropertyPickerOpen, setIsPropertyPickerOpen] = useState(false);
  const [isSpellModalOpen, setIsSpellModalOpen] = useState(false);
  const [spellToEdit, setSpellToEdit] = useState<ContainedSpell | null>(null);
  const [isRequirementPickerOpen, setIsRequirementPickerOpen] = useState(false);
  const [isCursePickerOpen, setIsCursePickerOpen] = useState(false);

  const calc = calculateItemPF(item);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedItems));
    } catch (e) {
      console.error('Error saving items', e);
    }
  }, [savedItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveCurrentItem = () => {
    const existingIndex = savedItems.findIndex((s) => s.id === item.id);
    const updated = {
      ...item,
      name: item.name.trim() || 'Objeto sin Nombre',
      updatedAt: Date.now()
    };

    if (existingIndex >= 0) {
      const copy = [...savedItems];
      copy[existingIndex] = updated;
      setSavedItems(copy);
      showToast(`¡«${updated.name}» actualizado en Mis Creaciones!`);
    } else {
      setSavedItems([updated, ...savedItems]);
      showToast(`¡«${updated.name}» guardado con éxito!`);
    }
  };

  const handleNewItem = () => {
    const newItem = createEmptyItem();
    setItem(newItem);
    setActiveTab('editor');
    showToast('Nuevo taller de objeto iniciado.');
  };

  const handleSelectExample = (example: PapaItem) => {
    const cloned: PapaItem = {
      ...example,
      id: 'item-' + Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setItem(cloned);
    setActiveTab('editor');
    showToast(`Ejemplo oficial «${example.name}» cargado.`);
  };

  const handleLoadSavedItem = (saved: PapaItem) => {
    setItem(saved);
    setActiveTab('editor');
    showToast(`Objeto «${saved.name}» abierto.`);
  };

  const handleDeleteSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Objeto eliminado de la lista.');
  };

  const handleAddProperty = (prop: SelectedProperty) => {
    setItem((prev) => ({
      ...prev,
      properties: [...prev.properties, prop],
      updatedAt: Date.now()
    }));
    showToast(`Propiedad «${prop.name}» agregada.`);
  };

  const handleSaveSpell = (spell: ContainedSpell) => {
    if (spellToEdit) {
      setItem((prev) => ({
        ...prev,
        spells: prev.spells.map((s) => (s.id === spell.id ? spell : s)),
        updatedAt: Date.now()
      }));
      showToast(`Conjuro «${spell.name}» actualizado.`);
    } else {
      setItem((prev) => ({
        ...prev,
        spells: [...prev.spells, spell],
        updatedAt: Date.now()
      }));
      showToast(`Conjuro «${spell.name}» forjado (+${spell.calculatedPf} PF).`);
    }
    setSpellToEdit(null);
  };

  const handleAddRequirement = (req: SelectedRequirement) => {
    setItem((prev) => ({
      ...prev,
      requirements: [...prev.requirements, req],
      updatedAt: Date.now()
    }));
    showToast(`Requisito «${req.name}» añadido (−${req.reduction} PF).`);
  };

  const handleAddCurse = (curse: SelectedCurse) => {
    setItem((prev) => ({
      ...prev,
      curses: [...prev.curses, curse],
      updatedAt: Date.now()
    }));
    showToast(`Maldición «${curse.name}» añadida.`);
  };

  const handleChecklistToggle = (key: keyof PapaItem['checklist']) => {
    setItem((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [key]: !prev.checklist[key]
      }
    }));
  };

  const handleSelectBaseEquipment = (config: BaseEquipmentConfig, defaultItemName: string) => {
    setItem((prev) => {
      let updatedType = prev.type;
      if (config.baseEquipmentType === 'weapon') {
        updatedType = 'Arma (Cuerpo a cuerpo)';
      } else if (config.baseEquipmentType === 'armor') {
        updatedType = 'Armadura';
      } else if (config.baseEquipmentType === 'shield') {
        updatedType = 'Escudo';
      }

      const shouldUpdateName = !prev.name || prev.name === 'Nueva Creación';

      return {
        ...prev,
        type: updatedType,
        name: shouldUpdateName ? defaultItemName : prev.name,
        baseEquipment: config,
        customPrice: `${config.baseCostL} L (base) + valor mágico`,
        updatedAt: Date.now()
      };
    });
    showToast(`Base «${config.baseName}» aplicada.`);
  };

  return (
    <div className="min-h-screen bg-[#141416] text-[#ECEBED] flex flex-col font-sans selection:bg-[#E02B69] selection:text-white">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E22] border border-[#E5CB7D]/40 text-[#E5CB7D] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#E02B69]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onNewItem={handleNewItem}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenExamples={() => setIsExamplesOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedItems.length}
      />

      {/* Mode Sub-nav / Mobile switcher */}
      <div className="bg-[#18181B] border-b border-white/5 px-4 sm:px-6 py-2.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-lg">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'editor'
                  ? 'bg-[#E5CB7D] text-stone-900 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              Taller de Forja
            </button>
            <button
              onClick={() => setActiveTab('sheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'sheet'
                  ? 'bg-[#E5CB7D] text-stone-900 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Ficha del Objeto & Exportación
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="text-stone-400 font-serif">
              Objeto actual: <strong className="text-white">{item.name || 'Sin nombre'}</strong>
            </span>
            <span className="text-stone-500">·</span>
            <span className="font-mono text-[#E5CB7D]">
              {calc.pfEffective} PF Efectivos
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'editor' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 columns: Forge Workbench Form */}
            <div className="lg:col-span-8">
              <ForgeWorkbench
                item={item}
                calc={calc}
                onChange={setItem}
                onOpenEquipmentPicker={() => setIsEquipmentPickerOpen(true)}
                onOpenPropertyPicker={() => setIsPropertyPickerOpen(true)}
                onOpenSpellModal={(spell) => {
                  setSpellToEdit(spell || null);
                  setIsSpellModalOpen(true);
                }}
                onOpenRequirementPicker={() => setIsRequirementPickerOpen(true)}
                onOpenCursePicker={() => setIsCursePickerOpen(true)}
              />
            </div>

            {/* Right 4 columns: Live Balance HUD */}
            <div className="lg:col-span-4">
              <LiveBalanceHUD
                item={item}
                calc={calc}
                onSave={handleSaveCurrentItem}
                onViewSheet={() => setActiveTab('sheet')}
                onReset={handleNewItem}
                isSheetActive={false}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <ItemSheetView
              item={item}
              calc={calc}
              onChecklistToggle={handleChecklistToggle}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#101012] py-6 px-4 text-center text-xs text-stone-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-serif font-semibold">Sistema P.A.P.A.</span>
            <span>—</span>
            <span>Objetos Generales · Revisión 2</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Puntos de Forja (PF) · Distancias por banda (Cerca / Lejos / Distante) · Conjuros Contenidos
          </p>
        </div>
      </footer>

      {/* Modals */}
      <EquipmentPickerModal
        isOpen={isEquipmentPickerOpen}
        onClose={() => setIsEquipmentPickerOpen(false)}
        onSelectBaseEquipment={handleSelectBaseEquipment}
      />

      <RulesGuideModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <ExamplesModal
        isOpen={isExamplesOpen}
        onClose={() => setIsExamplesOpen(false)}
        onSelectExample={handleSelectExample}
      />

      <SavedItemsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedItems={savedItems}
        onLoadItem={handleLoadSavedItem}
        onDeleteItem={handleDeleteSavedItem}
      />

      <PropertyPickerModal
        isOpen={isPropertyPickerOpen}
        onClose={() => setIsPropertyPickerOpen(false)}
        onAddProperty={handleAddProperty}
      />

      <SpellModal
        isOpen={isSpellModalOpen}
        onClose={() => {
          setIsSpellModalOpen(false);
          setSpellToEdit(null);
        }}
        onSave={handleSaveSpell}
        initialSpell={spellToEdit}
      />

      <RequirementModal
        isOpen={isRequirementPickerOpen}
        onClose={() => setIsRequirementPickerOpen(false)}
        onAddRequirement={handleAddRequirement}
      />

      <CurseModal
        isOpen={isCursePickerOpen}
        onClose={() => setIsCursePickerOpen(false)}
        onAddCurse={handleAddCurse}
      />
    </div>
  );
}
