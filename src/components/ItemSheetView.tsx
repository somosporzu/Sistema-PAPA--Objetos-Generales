import React, { useState, useRef } from 'react';
import {
  Copy,
  Check,
  Printer,
  Sparkles,
  Shield,
  Wand2,
  Skull,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Download,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { PapaItem, CalculationResult } from '../types/papa';
import { RARITIES, RECHARGE_FACTORS } from '../data/papaData';
import { PorzuuLogo } from './PorzuuLogo';

interface ItemSheetViewProps {
  item: PapaItem;
  calc: CalculationResult;
  onChecklistToggle?: (key: keyof PapaItem['checklist']) => void;
}

export const ItemSheetView: React.FC<ItemSheetViewProps> = ({
  item,
  calc,
  onChecklistToggle
}) => {
  const [copied, setCopied] = useState(false);
  const rarityInfo = RARITIES[item.targetRarity] || RARITIES.poco_comun;

  const checklistItems: Array<{ key: keyof PapaItem['checklist']; label: string }> = [
    { key: 'hasClearStory', label: '¿El objeto tiene historia y función claras?' },
    { key: 'powerReflectsAll', label: '¿El PF de Poder refleja todo lo que hace?' },
    { key: 'requirementsReallyLimit', label: '¿Los requisitos limitan de verdad?' },
    { key: 'curseMattersInGame', label: '¿La maldición pesa en partida?' },
    { key: 'respectsRarityLimits', label: '¿Respeta la rareza y los límites de bonos?' },
    { key: 'doesNotReplaceCharacter', label: '¿No reemplaza una Senda, Herencia, Concepto o Conjuro?' },
    { key: 'usableWithoutImprovRules', label: '¿Se puede usar en mesa sin improvisar reglas nuevas?' }
  ];

  const handleCopyMarkdown = () => {
    let md = `## ${item.name || 'Objeto sin nombre'}\n`;
    md += `**Tipo:** ${item.type}\n`;
    md += `**Rareza objetivo:** ${rarityInfo.name}\n`;
    md += `**Concepto:** ${item.concept || '—'}\n\n`;

    md += `### Propiedades:\n`;
    if (item.properties.length === 0) {
      md += `- Ninguna\n`;
    } else {
      item.properties.forEach((p) => {
        md += `- ${p.name} (${p.cost >= 0 ? '+' : ''}${p.cost} PF)${p.customDetail ? `: ${p.customDetail}` : ''}\n`;
      });
    }

    md += `\n### Conjuros Contenidos:\n`;
    if (item.spells.length === 0) {
      md += `- Ninguno\n`;
    } else {
      item.spells.forEach((s) => {
        const rech = RECHARGE_FACTORS[s.recharge]?.label || s.recharge;
        md += `- ${s.name} (Nivel ${s.level}, ${s.energyAffinity || 'Afinidad'}, ${s.spellType || 'Tipo'}, ${s.charges} carga(s), ${rech}, ${s.calculatedPf} PF)\n`;
      });
    }

    md += `\n### Requisitos:\n`;
    if (item.requirements.length === 0) {
      md += `- Ninguno\n`;
    } else {
      item.requirements.forEach((r) => {
        md += `- ${r.name} (−${r.reduction} PF)${r.customDetail ? `: ${r.customDetail}` : ''}\n`;
      });
    }

    md += `\n### Maldición:\n`;
    if (item.curses.length === 0) {
      md += `- Ninguna\n`;
    } else {
      item.curses.forEach((c) => {
        md += `- ${c.name} (${c.intensity}, +${c.bonusCap} límite de poder): ${c.effect}\n`;
      });
    }

    md += `\n**PF de Poder:** ${calc.pfPowerTotal}\n`;
    md += `**PF efectivos:** ${calc.pfEffective}\n`;
    md += `**Precio aproximado:** ${item.customPrice || rarityInfo.priceRange}\n\n`;

    md += `### Descripción e Historia:\n`;
    if (item.descriptionWhat) md += `*¿Qué hace?:* ${item.descriptionWhat}\n`;
    if (item.descriptionWhy) md += `*¿Por qué existe?:* ${item.descriptionWhy}\n`;
    if (item.descriptionPrice) md += `*¿Qué precio tiene?:* ${item.descriptionPrice}\n`;
    if (item.fullDescription) md += `\n${item.fullDescription}\n`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${item.name.replace(/\s+/g, '_').toLowerCase() || 'objeto_papa'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const [isExportingImage, setIsExportingImage] = useState(false);

  const handleExportImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExportingImage(true);
      // Wait brief tick for any pending fonts/renders
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution crisp export for tabletop cards
        backgroundColor: '#1A1A1E'
      });

      const link = document.createElement('a');
      link.download = `${item.name.replace(/\s+/g, '_').toLowerCase() || 'objeto_papa'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error al exportar imagen de la ficha', err);
    } finally {
      setIsExportingImage(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#1E1E22] border border-white/10 rounded-xl no-print">
        <div className="flex items-center gap-2">
          <PorzuuLogo className="w-6 h-6" />
          <span className="text-xs font-semibold text-[#E5CB7D]">Ficha Oficial de Objeto P.A.P.A.</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
            title="Copiar en formato texto / markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-stone-400" />}
            {copied ? '¡Copiado!' : 'Copiar Texto'}
          </button>
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
            title="Descargar archivo JSON"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            JSON
          </button>
          <button
            onClick={handleExportImage}
            disabled={isExportingImage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#E02B69] hover:bg-[#B91C50] text-white rounded-lg transition-colors shadow-sm disabled:opacity-50"
            title="Exportar tarjeta del objeto como imagen PNG en alta resolución"
          >
            {isExportingImage ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5" />
            )}
            {isExportingImage ? 'Generando PNG...' : 'Exportar Imagen (PNG)'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#E5CB7D] hover:bg-[#F0DD9E] text-stone-900 font-semibold rounded-lg transition-colors"
            title="Imprimir o guardar como PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Official Game Card / Item Sheet */}
      <div
        ref={cardRef}
        className="relative bg-[#1A1A1E] border-2 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden print:p-0 print:border-none print:bg-white print:text-black"
        style={{ borderColor: rarityInfo.color }}
      >
        {/* Decorative corner crest */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-10">
          <PorzuuLogo className="w-full h-full" />
        </div>

        {/* Card Header */}
        <div className="border-b border-white/10 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border"
                  style={{
                    backgroundColor: rarityInfo.badgeBg,
                    borderColor: rarityInfo.badgeBorder,
                    color: rarityInfo.color
                  }}
                >
                  {rarityInfo.name}
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {item.type || 'Tipo de Objeto'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-wide">
                {item.name || 'Objeto sin Nombre'}
              </h1>
              {item.concept && (
                <p className="text-sm text-[#E5CB7D] italic mt-1">
                  «{item.concept}»
                </p>
              )}

              {/* Base equipment badge if present */}
              {item.baseEquipment && (
                <div className="mt-2.5 inline-flex flex-wrap items-center gap-2 p-2 rounded-lg bg-black/40 border border-[#E5CB7D]/30 text-xs">
                  <span className="text-stone-400">Equipo base del manual:</span>
                  <strong className="text-white">{item.baseEquipment.baseName}</strong>
                  {item.baseEquipment.quality !== 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-[#E5CB7D]/20 text-[#E5CB7D] font-mono text-[11px]">
                      Calidad {item.baseEquipment.quality > 0 ? `+${item.baseEquipment.quality}` : item.baseEquipment.quality}
                    </span>
                  )}
                  {item.baseEquipment.baseDamage && (
                    <span className="text-[#E02B69] font-mono font-bold">
                      {item.baseEquipment.baseDamage} ({item.baseEquipment.damageType})
                    </span>
                  )}
                  {item.baseEquipment.defenseBonus !== undefined && (
                    <span className="text-[#4FA3E3] font-mono font-bold">
                      +{item.baseEquipment.defenseBonus} Defensa
                    </span>
                  )}
                  {item.baseEquipment.baseProperties.length > 0 && (
                    <span className="text-stone-400">
                      [{item.baseEquipment.baseProperties.join(', ')}]
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* PF Summary Badge */}
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Poder</span>
                <span className="text-lg font-mono font-bold text-[#E02B69]">
                  {calc.pfPowerTotal} <span className="text-xs font-normal">PF</span>
                </span>
              </div>
              <div className="h-7 w-[1px] bg-white/10" />
              <div className="text-center">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Efectivo</span>
                <span className="text-lg font-mono font-bold text-[#E5CB7D]">
                  {calc.pfEffective} <span className="text-xs font-normal">PF</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-6 text-sm">
          {/* Section: Propiedades */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5CB7D] mb-2.5 flex items-center gap-1.5 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-[#E02B69]" />
              Propiedades Pasivas y Capacidades
            </h3>
            {item.properties.length === 0 ? (
              <p className="text-xs text-stone-500 italic">Sin propiedades asignadas.</p>
            ) : (
              <ul className="space-y-2">
                {item.properties.map((p) => (
                  <li
                    key={p.instanceId}
                    className="p-2.5 bg-black/30 border border-white/5 rounded-lg flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold text-white">
                        {p.name}
                        {p.customDetail && (
                          <span className="font-normal text-stone-300 ml-1.5">
                            — {p.customDetail}
                          </span>
                        )}
                      </div>
                      {p.notes && (
                        <p className="text-xs text-stone-400 mt-0.5">{p.notes}</p>
                      )}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold shrink-0 ${
                        p.cost < 0
                          ? 'bg-emerald-950/60 text-emerald-400'
                          : 'bg-[#E5CB7D]/15 text-[#E5CB7D]'
                      }`}
                    >
                      {p.cost >= 0 ? `+${p.cost} PF` : `${p.cost} PF`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section: Conjuros Contenidos */}
          {item.spells.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5CB7D] mb-2.5 flex items-center gap-1.5 font-serif">
                <Wand2 className="w-3.5 h-3.5 text-[#E02B69]" />
                Conjuros Contenidos
              </h3>
              <div className="space-y-2.5">
                {item.spells.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 bg-black/30 border border-[#E02B69]/20 rounded-lg space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{s.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#E5CB7D] font-mono">
                          Nivel {s.level === 1 ? 'I' : s.level === 2 ? 'II' : s.level === 3 ? 'III' : s.level === 4 ? 'IV' : 'V'} · Salvación ND {s.saveDc}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#E02B69]/15 text-[#E02B69]">
                        +{s.calculatedPf} PF
                      </span>
                    </div>

                    <div className="text-xs text-stone-300 flex flex-wrap items-center gap-2">
                      <span className="text-stone-400">Afinidad:</span>
                      <strong className="text-white">{s.energyAffinity}</strong>
                      <span className="text-stone-500">·</span>
                      <span className="text-stone-400">Tipo:</span>
                      <span className="text-white">{s.spellType}</span>
                      <span className="text-stone-500">·</span>
                      <span className="text-stone-400">Activaciones:</span>
                      <span className="text-[#E5CB7D]">
                        {s.recharge === 'libre'
                          ? 'Libre / Ilimitada'
                          : `${s.charges} carga(s) (${RECHARGE_FACTORS[s.recharge]?.label})`}
                      </span>
                    </div>

                    {s.effect && (
                      <p className="text-xs text-stone-300 bg-black/40 p-2 rounded border border-white/5">
                        {s.effect}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Requisitos y Maldiciones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Requisitos */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5CB7D] mb-2 flex items-center gap-1.5 font-serif">
                <Shield className="w-3.5 h-3.5 text-[#E5CB7D]" />
                Requisitos de Uso
              </h3>
              {item.requirements.length === 0 ? (
                <p className="text-xs text-stone-500 italic">Ninguno (uso irrestricto).</p>
              ) : (
                <ul className="space-y-1.5">
                  {item.requirements.map((r) => (
                    <li
                      key={r.instanceId}
                      className="p-2 bg-black/30 border border-white/5 rounded flex items-start justify-between gap-2"
                    >
                      <div className="text-xs">
                        <span className="font-semibold text-white">{r.name}</span>
                        {r.customDetail && (
                          <span className="text-stone-400 block text-[11px] mt-0.5">
                            {r.customDetail}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#E02B69]">
                        −{r.reduction} PF
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Maldición */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C26D74] mb-2 flex items-center gap-1.5 font-serif">
                <Skull className="w-3.5 h-3.5 text-[#C26D74]" />
                Cargas y Maldiciones
              </h3>
              {item.curses.length === 0 ? (
                <p className="text-xs text-stone-500 italic">Ninguna (objeto libre de estigma).</p>
              ) : (
                <ul className="space-y-1.5">
                  {item.curses.map((c) => (
                    <li
                      key={c.instanceId}
                      className="p-2 bg-black/30 border border-[#C26D74]/20 rounded space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{c.name}</span>
                        <span className="text-[10px] uppercase font-bold text-[#C26D74]">
                          {c.intensity} (+{c.bonusCap} Límite)
                        </span>
                      </div>
                      <p className="text-stone-300 text-[11px]">{c.effect}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Section: Lore / 3 Preguntas */}
          <div className="border-t border-white/10 pt-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5CB7D] font-serif">
              Historia y Balance Narrativo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[11px] font-bold text-[#E02B69] block mb-1 uppercase tracking-wide">
                  ¿Qué hace? (Mecánica y sensaciones)
                </span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  {item.descriptionWhat || 'Define su función en juego...'}
                </p>
              </div>

              <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[11px] font-bold text-[#E5CB7D] block mb-1 uppercase tracking-wide">
                  ¿Por qué existe? (Historia y origen)
                </span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  {item.descriptionWhy || 'Quién lo creó y con qué fin...'}
                </p>
              </div>

              <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                <span className="text-[11px] font-bold text-[#C26D74] block mb-1 uppercase tracking-wide">
                  ¿Qué precio tiene? (Consecuencias)
                </span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  {item.descriptionPrice || 'Balance económico, narrativo o social...'}
                </p>
              </div>
            </div>

            {item.fullDescription && (
              <p className="text-xs text-stone-300 italic pt-1 leading-relaxed border-l-2 border-[#E5CB7D] pl-3">
                «{item.fullDescription}»
              </p>
            )}
          </div>

          {/* Card Footer Details */}
          <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
            <div>
              <span className="text-stone-500">Precio Sugerido:</span>{' '}
              <strong className="text-[#E5CB7D] font-mono">
                {item.customPrice || rarityInfo.priceRange}
              </strong>
            </div>
            <div>
              <span className="text-stone-500">Disponibilidad:</span>{' '}
              <span className="text-stone-300">{rarityInfo.availability}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Oficial del Diseñador */}
      <div className="p-5 bg-[#1E1E22] border border-white/10 rounded-xl space-y-3 no-print">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#E5CB7D]" />
            <h3 className="text-sm font-bold font-serif text-[#E5CB7D]">
              Lista de Control del Diseñador (P.A.P.A.)
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-400">
            {Object.values(item.checklist).filter(Boolean).length} / {checklistItems.length} verificados
          </span>
        </div>
        <p className="text-xs text-stone-400">
          Antes de introducir el objeto en tu campaña, valida cada principio oficial del sistema:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {checklistItems.map((chk) => {
            const isChecked = item.checklist[chk.key];
            return (
              <button
                key={chk.key}
                type="button"
                onClick={() => onChecklistToggle && onChecklistToggle(chk.key)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-start gap-2.5 ${
                  isChecked
                    ? 'bg-[#E5CB7D]/10 border-[#E5CB7D]/40 text-stone-200'
                    : 'bg-black/30 border-white/5 text-stone-400 hover:text-stone-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked
                      ? 'bg-[#E5CB7D] border-[#E5CB7D] text-stone-900'
                      : 'border-stone-600 bg-transparent'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{chk.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
