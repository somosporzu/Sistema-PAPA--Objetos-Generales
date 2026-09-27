import React from 'react';
import { X, BookOpen, Shield, Sparkles, AlertTriangle, Scale, Compass } from 'lucide-react';
import { RARITIES } from '../data/papaData';

interface RulesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesGuideModal: React.FC<RulesGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1E1E22] border border-[#E5CB7D]/30 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161618]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#E02B69]/10 border border-[#E02B69]/30 text-[#E02B69]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-[#E5CB7D]">
                Reglamento P.A.P.A. — Revisión 2
              </h2>
              <p className="text-xs text-[#7D8085]">
                Distancias por banda, Presupuesto de PF y Conjuros Contenidos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 text-sm text-[#D1D0D5] leading-relaxed">
          {/* 1. Filosofía */}
          <section className="space-y-3">
            <h3 className="text-base font-semibold text-[#E5CB7D] flex items-center gap-2 font-serif">
              <Compass className="w-4 h-4 text-[#E02B69]" />
              1. Las Tres Preguntas de un Objeto Especial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-black/30 rounded-lg border border-white/5">
                <span className="text-xs font-semibold text-[#E02B69] block mb-1">¿Qué hace?</span>
                <p className="text-xs text-stone-300">
                  Define su función mecánica: proteger, atacar, curar, guardar un Conjuro o permitir algo normalmente imposible.
                </p>
              </div>
              <div className="p-3.5 bg-black/30 rounded-lg border border-white/5">
                <span className="text-xs font-semibold text-[#E5CB7D] block mb-1">¿Por qué existe?</span>
                <p className="text-xs text-stone-300">
                  Define su historia: quién lo forjó, para qué propósito y qué tradición, fuerza o catástrofe le dio origen.
                </p>
              </div>
              <div className="p-3.5 bg-black/30 rounded-lg border border-white/5">
                <span className="text-xs font-semibold text-[#C26D74] block mb-1">¿Qué precio tiene?</span>
                <p className="text-xs text-stone-300">
                  Define su balance: mecánico, narrativo, económico, social, espiritual o una combinación de varios.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Tabla de Presupuesto */}
          <section className="space-y-3">
            <h3 className="text-base font-semibold text-[#E5CB7D] flex items-center gap-2 font-serif">
              <Scale className="w-4 h-4 text-[#E02B69]" />
              2. Tabla de Rarezas y Presupuesto de PF
            </h3>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#141416] text-[#E5CB7D] font-medium border-b border-white/10">
                  <tr>
                    <th className="py-2.5 px-3">Rareza</th>
                    <th className="py-2.5 px-3">PF Efectivos</th>
                    <th className="py-2.5 px-3">Poder Máx (Sin / Con Maldición)</th>
                    <th className="py-2.5 px-3">Disponibilidad</th>
                    <th className="py-2.5 px-3">Precio Aprox.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-black/20">
                  {Object.values(RARITIES).map((r) => (
                    <tr key={r.id} className="hover:bg-white/5">
                      <td className="py-2 px-3 font-semibold" style={{ color: r.color }}>
                        {r.name}
                      </td>
                      <td className="py-2 px-3 font-mono">
                        {r.id === 'artefacto' ? '26+ PF' : `${r.minPf}–${r.maxPf} PF`}
                      </td>
                      <td className="py-2 px-3 font-mono">
                        {r.id === 'artefacto' ? 'Sin límite' : `${r.maxPowerWithoutCurse} / ${r.maxPowerWithCurse} PF`}
                      </td>
                      <td className="py-2 px-3 text-stone-400">{r.availability}</td>
                      <td className="py-2 px-3 text-[#E5CB7D] font-mono">{r.priceRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Fórmulas Oficiales */}
          <section className="space-y-3">
            <h3 className="text-base font-semibold text-[#E5CB7D] flex items-center gap-2 font-serif">
              <Sparkles className="w-4 h-4 text-[#E02B69]" />
              3. Fórmulas de Cálculo y Reglas Clave
            </h3>
            <div className="space-y-2 bg-black/40 p-4 rounded-lg border border-white/10 font-mono text-xs">
              <p className="text-white">
                <strong className="text-[#E02B69]">Paso 1:</strong> PF de Poder = Propiedades + Conjuros Contenidos + Efectos Especiales.
              </p>
              <p className="text-white">
                <strong className="text-[#E5CB7D]">Paso 2:</strong> PF efectivos = PF de Poder − Requisitos.
              </p>
              <div className="pt-2 text-stone-300 text-xs font-sans space-y-1">
                <p>
                  <strong className="text-amber-400">Regla del 50%:</strong> Los requisitos <span className="underline">no pueden</span> reducir el PF efectivo por debajo de la mitad del PF de Poder (redondeado hacia arriba).
                </p>
                <p>
                  <strong className="text-rose-400">Regla de Maldiciones:</strong> Las maldiciones <span className="underline">no entran en la resta de PF</span>. Solo permiten que el PF de Poder exceda el tope de la rareza (+1 Menor, +2 Media, +3 Mayor, +4..+7 Legendaria).
                </p>
                <p>
                  <strong className="text-emerald-400">Fórmula de Conjuros Contenidos:</strong> PF = Factor de Recarga × [Base(Nivel) + (Cargas − 1) × Incremento(Nivel)] + Ajuste de Afinidad.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Distancias por Banda */}
          <section className="space-y-3">
            <h3 className="text-base font-semibold text-[#E5CB7D] flex items-center gap-2 font-serif">
              <Shield className="w-4 h-4 text-[#E02B69]" />
              4. Distancias por Banda (Revisión 2)
            </h3>
            <p className="text-xs text-stone-300">
              En el Sistema P.A.P.A., las distancias ya no se miden en metros, sino en bandas relativas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="font-semibold text-white block">Banda Cerca</span>
                <span className="text-[11px] text-stone-400">Movimiento base de todo personaje. Rango de combate inmediato.</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="font-semibold text-white block">Banda Lejos</span>
                <span className="text-[11px] text-stone-400">Alcanzable con zancada mayor, carrera o proyectiles medios.</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="font-semibold text-white block">Banda Distante</span>
                <span className="text-[11px] text-stone-400">Extremo del horizonte visible o conjuros de nivel V.</span>
              </div>
            </div>
          </section>

          {/* 5. Prohibiciones */}
          <section className="p-4 bg-red-950/20 border border-red-500/30 rounded-lg text-xs space-y-2">
            <h4 className="font-semibold text-red-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Propiedades Prohibidas como Pasivas Comunes
            </h4>
            <p className="text-red-200/80">
              Ataque adicional permanente, Acción Principal o Reacción adicional permanente, inmunidad total a todo daño físico, curación automática ilimitada, Conjuro Nivel IV o V sin límite ni coste, control mental sin tirada, bonos generales a todas las tiradas.
            </p>
            <p className="text-stone-400 pt-1">
              <em>Resurrección, detener el tiempo, teletransporte libre e inmortalidad quedan reservados exclusivamente para Artefactos de centro de campaña.</em>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#161618] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-[#E5CB7D] hover:bg-[#F0DD9E] rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
