"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck2, PhoneOff, Sparkles, Zap } from "lucide-react";

const benefits = [
  {
    icon: CalendarCheck2,
    title: "Mas citas",
    detail: "Convierte cada conversacion en un agendamiento. Sin formularios largos, sin volverte loco.",
    metric: "+38%",
    metricLabel: "agendas confirmadas",
  },
  {
    icon: PhoneOff,
    title: "Menos llamadas",
    detail: "El asistente filtra lo rutinario. Tu recepcion contesta lo que de verdad importa.",
    metric: "−62%",
    metricLabel: "llamadas repetitivas",
  },
  {
    icon: Sparkles,
    title: "Mejor imagen",
    detail: "Respuestas claras, en segundos, todos los dias. La clinica se ve moderna porque lo es.",
    metric: "4.9",
    metricLabel: "rating promedio",
  },
  {
    icon: Zap,
    title: "Atencion inmediata",
    detail: "El paciente escribe a las 11 pm un domingo. Le contestas igual. Eso ya no se discute.",
    metric: "24/7",
    metricLabel: "sin pausas",
  },
];

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="beneficios"
      ref={ref}
      className="relative py-32 md:py-40 border-t border-line"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          style={{ y: headerY }}
          className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24"
        >
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
              01 / Beneficios
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Lo que cambia el primer mes <span className="text-muted">— y no se nota hasta que mides.</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  detail,
  metric,
  metricLabel,
  index,
}: {
  icon: typeof CalendarCheck2;
  title: string;
  detail: string;
  metric: string;
  metricLabel: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-bg p-8 lg:p-10 hover:bg-bg-elev transition-colors duration-500"
    >
      <div className="flex items-start justify-between mb-12">
        <div className="size-11 rounded-xl border border-line flex items-center justify-center group-hover:border-mint/40 group-hover:bg-mint/5 transition-colors">
          <Icon className="size-5 text-mint" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
          0{index + 1}
        </span>
      </div>

      <h3 className="font-display text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-cream/65 leading-relaxed mb-8">{detail}</p>

      <div className="flex items-baseline gap-2 pt-6 border-t border-line">
        <span className="font-display text-3xl font-semibold text-mint">{metric}</span>
        <span className="text-xs text-muted">{metricLabel}</span>
      </div>
    </motion.div>
  );
}
