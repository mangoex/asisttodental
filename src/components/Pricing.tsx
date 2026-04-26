"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Inicio",
    price: 49,
    tagline: "Para arrancar sin complicarte.",
    features: [
      "WhatsApp automatico",
      "FAQs personalizadas",
      "Captura de leads",
      "Panel basico",
      "1 usuario",
    ],
    cta: "Empezar con Inicio",
    featured: false,
  },
  {
    name: "Pro",
    price: 99,
    tagline: "El que la mayoria escoge.",
    features: [
      "Todo lo de Inicio",
      "Agenda con calendario",
      "Recordatorios automaticos",
      "Hasta 3 usuarios",
      "Reportes mensuales",
      "Campanas basicas",
    ],
    cta: "Quiero el Pro",
    featured: true,
  },
  {
    name: "Premium",
    price: 149,
    tagline: "Para clinicas con sucursales.",
    features: [
      "Todo lo de Pro",
      "Multiples sucursales",
      "Seguimiento a pacientes inactivos",
      "Dashboards completos",
      "Soporte prioritario",
    ],
    cta: "Hablar con ventas",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="planes"
      className="relative py-32 md:py-40 border-t border-line"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
              04 / Planes
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Precios honestos. <span className="text-muted">Sin letras chicas.</span>
            </h2>
            <p className="mt-6 text-cream/65 max-w-xl">
              Todos los planes son mes a mes. Cancelas cuando quieras. La primera demo es gratis y te queda la configuracion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative rounded-3xl border p-8 lg:p-10 flex flex-col",
                p.featured
                  ? "border-mint/50 bg-gradient-to-b from-mint/5 to-transparent shadow-[0_0_80px_-20px_rgba(148,229,192,0.45)]"
                  : "border-line bg-bg-elev/40"
              )}
            >
              {p.featured && (
                <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-mint text-bg px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                  <span className="size-1 rounded-full bg-bg" aria-hidden />
                  Mas popular
                </div>
              )}

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <span className="font-mono text-xs text-muted uppercase">0{i + 1}</span>
              </div>
              <p className="text-sm text-cream/60 mb-8">{p.tagline}</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-display text-6xl font-semibold tracking-tight">
                  ${p.price}
                </span>
                <span className="text-muted text-sm">USD/mes</span>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0",
                        p.featured ? "bg-mint text-bg" : "bg-bg border border-line text-mint"
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-cream/85">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#demo"
                data-cursor="cta"
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all",
                  p.featured
                    ? "bg-mint text-bg hover:scale-[1.02]"
                    : "border border-line text-cream hover:border-cream/40 hover:bg-bg-elev"
                )}
              >
                <span>{p.cta}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
