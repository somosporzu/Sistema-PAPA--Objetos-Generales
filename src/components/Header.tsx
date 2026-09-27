import React from 'react';
import { Sparkles, BookOpen, Plus, FolderOpen, Wand2 } from 'lucide-react';
import { PorzuuLogo } from './PorzuuLogo';

interface HeaderProps {
  onNewItem: () => void;
  onOpenRules: () => void;
  onOpenExamples: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNewItem,
  onOpenRules,
  onOpenExamples,
  onOpenSaved,
  savedCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#141416]/95 backdrop-blur border-b border-white/10 px-4 sm:px-6 py-3 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element / Brand lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <PorzuuLogo className="w-9 h-9" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold font-serif tracking-tight text-[#E5CB7D]">
              Forja P.A.P.A.
            </span>
            <span className="text-[10px] text-[#7D8085] hidden sm:inline -mt-0.5">
              Taller de Creación y Balance de Objetos
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation / Quick Modes */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-300">
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 hover:text-[#E5CB7D] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E02B69]" />
            Reglamento Oficial
          </button>
          <button
            onClick={onOpenExamples}
            className="flex items-center gap-1.5 hover:text-[#E5CB7D] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5CB7D]" />
            Ejemplos del Manual (8)
          </button>
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 hover:text-[#E5CB7D] transition-colors"
          >
            <FolderOpen className="w-3.5 h-3.5 text-stone-400" />
            Mis Creaciones ({savedCount})
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExamples}
            className="md:hidden p-2 text-xs font-medium text-stone-300 hover:text-white bg-white/5 border border-white/10 rounded-lg"
            title="Ejemplos del Manual"
          >
            <Sparkles className="w-4 h-4 text-[#E5CB7D]" />
          </button>
          <button
            onClick={onOpenRules}
            className="md:hidden p-2 text-xs font-medium text-stone-300 hover:text-white bg-white/5 border border-white/10 rounded-lg"
            title="Reglamento"
          >
            <BookOpen className="w-4 h-4 text-[#E02B69]" />
          </button>
          <button
            onClick={onNewItem}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Nuevo Objeto
          </button>
        </div>
      </div>
    </header>
  );
};
