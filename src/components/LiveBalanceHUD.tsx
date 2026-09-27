import React from 'react';
import {
  Scale,
  Sparkles,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Coins,
  MapPin,
  Save,
  Eye,
  RotateCcw
} from 'lucide-react';
import { PapaItem, CalculationResult } from '../types/papa';
import { RARITIES } from '../data/papaData';

interface LiveBalanceHUDProps {
  item: PapaItem;
  calc: CalculationResult;
  onSave: () => void;
  onViewSheet: () => void;
  onReset: () => void;
  isSheetActive: boolean;
}

export const LiveBalanceHUD: React.FC<LiveBalanceHUDProps> = ({
  item,
  calc,
  onSave,
  onViewSheet,
  onReset,
  isSheetActive
}) => {
  const targetRarity = RARITIES[item.targetRarity] || RARITIES.poco_comun;
  const suggestedRarity = RARITIES[calc.suggestedRarity] || RARITIES.poco_comun;

  return (
    <div className="bg-[#1E1E22] border border-[#E5CB7D]/30 rounded-xl p-5 shadow-xl space-y-5 sticky top-20 no-print">
      {/* Header of HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#E5CB7D]" />
          <h3 className="text-sm font-bold font-serif text-[#E5CB7D]">
            Balance de Forja P.A.P.A.
          </h3>
        </div>
        <span
          className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border"
          style={{
            backgroundColor: targetRarity.badgeBg,
            borderColor: targetRarity.badgeBorder,
            color: targetRarity.color
          }}
        >
          {targetRarity.name}
        </span>
      </div>

      {/* Main PF Counters */}
      <div className="grid grid-cols-2 gap-3">
        {/* PF de Poder */}
        <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span>PF de Poder</span>
            <span className="text-stone-500 font-mono">
              máx {calc.maxPowerAllowed}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-[#E02B69]">
              {calc.pfPowerTotal}
            </span>
            <span className="text-xs text-stone-400">PF</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1 truncate">
            Propiedades ({calc.pfPowerProps}) + Conjuros ({calc.pfPowerSpells})
          </div>
        </div>

        {/* PF Efectivos */}
        <div className="p-3 bg-black/40 border border-[#E5CB7D]/30 rounded-lg">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span>PF Efectivos</span>
            <span className="text-[#E5CB7D] font-mono">
              {targetRarity.id === 'artefacto' ? '26+' : `${targetRarity.minPf}–${targetRarity.maxPf}`}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-[#E5CB7D]">
              {calc.pfEffective}
            </span>
            <span className="text-xs text-stone-400">PF</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1 truncate">
            {calc.effectiveReduction > 0 ? `Reducción: −${calc.effectiveReduction} PF` : 'Sin requisitos'}
          </div>
        </div>
      </div>

      {/* Step Formula Visualizer */}
      <div className="p-3 bg-black/50 border border-white/5 rounded-lg text-xs space-y-1 font-mono">
        <div className="flex justify-between text-stone-300">
          <span>Paso 1: PF de Poder</span>
          <span className="font-bold text-[#E02B69]">{calc.pfPowerTotal} PF</span>
        </div>
        <div className="flex justify-between text-stone-300">
          <span>Paso 2: − Requisitos</span>
          <span className="text-[#E02B69]">
            −{calc.effectiveReduction} PF
            {calc.reductionCapped && <span className="text-[10px] text-amber-400 ml-1">(topado 50%)</span>}
          </span>
        </div>
        <div className="border-t border-white/10 pt-1 flex justify-between font-bold text-white">
          <span>= PF Efectivos</span>
          <span className="text-[#E5CB7D]">{calc.pfEffective} PF</span>
        </div>
      </div>

      {/* Status & Validation Alerts */}
      <div className="space-y-2">
        {calc.errors.map((err, idx) => (
          <div
            key={idx}
            className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-lg flex items-start gap-2 text-xs text-rose-200"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{err}</span>
          </div>
        ))}

        {calc.warnings.map((warn, idx) => (
          <div
            key={idx}
            className="p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-lg flex items-start gap-2 text-xs text-amber-200"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{warn}</span>
          </div>
        ))}

        {calc.errors.length === 0 && calc.warnings.length === 0 && (
          <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>¡Objeto perfectamente balanceado para {targetRarity.name}!</span>
          </div>
        )}
      </div>

      {/* Rarity & Economy info */}
      <div className="border-t border-white/10 pt-3 space-y-2 text-xs text-stone-300">
        <div className="flex items-start gap-2">
          <Coins className="w-4 h-4 text-[#E5CB7D] shrink-0 mt-0.5" />
          <div>
            <span className="text-stone-400 block text-[11px]">Precio Aprox:</span>
            <strong className="text-white font-mono">{targetRarity.priceRange}</strong>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[#7D8085] shrink-0 mt-0.5" />
          <div>
            <span className="text-stone-400 block text-[11px]">Disponibilidad:</span>
            <span className="text-stone-300 text-[11px] leading-tight block">
              {targetRarity.availability}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <button
          onClick={onSave}
          className="w-full py-2.5 px-4 bg-[#E02B69] hover:bg-[#B91C50] text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Save className="w-4 h-4" />
          Guardar en Forja
        </button>

        <button
          onClick={onViewSheet}
          className={`w-full py-2 px-4 border text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${
            isSheetActive
              ? 'bg-[#E5CB7D] text-stone-900 border-[#E5CB7D]'
              : 'bg-white/5 border-white/10 text-stone-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Eye className="w-4 h-4" />
          {isSheetActive ? 'Volver al Taller de Edición' : 'Ver Ficha de Juego Completa'}
        </button>

        <button
          onClick={onReset}
          className="w-full py-1.5 text-[11px] text-stone-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reiniciar Taller
        </button>
      </div>
    </div>
  );
};
