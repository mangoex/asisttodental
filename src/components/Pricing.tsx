"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Pro",
    price: 97,
    tagline: "El que la mayoría escoge.",
    features: [
      "WhatsApp automático 24/7",
      "Agenda con calendario",
      "Recordatorios automáticos",
      "Soporte para hasta 3 usuarios",
      "FAQs y captura de prospectos",
      "Campañas básicas de difusión",
    ],
    cta: "Contratar",
    href: "https://pay.hotmart.com/R105359230P?off=43g79ufq",
    featured: true,
  },
  {
    name: "Ejecutivo",
    price: null,
    tagline: "Para negocios con necesidades avanzadas.",
    features: [
      "Todo lo de Pro",
      "Conexión por API a sistemas, CRM, ERP",
      "Múltiples sucursales",
      "Seguimiento a contactos inactivos",
      "Dashboards completos",
      "Soporte prioritario",
    ],
    cta: "Hablar con ventas",
    href: "https://wa.me/5216741251648?text=Hola%2C%20me%20interesa%20el%20plan%20Ejecutivo%20de%20Asistto",
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
              Todos los planes son mes a mes. Cancelas cuando quieras. La primera demo es gratis y te queda la configuración.
            </p>
          </div>
        </div>

        {/* Garantía banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-center justify-center gap-4 rounded-2xl border border-mint/25 bg-mint/5 px-6 py-4"
        >
          <span className="text-2xl" aria-hidden>🛡️</span>
          <div>
            <p className="font-display font-semibold text-cream">
              Garantía de satisfacción — 7 días
            </p>
            <p className="text-sm text-cream/60">
              Si en los primeros 7 días no estás conforme, te devolvemos el 100% de tu dinero. Sin preguntas.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative rounded-3xl border flex flex-col",
                p.featured
                  ? "border-mint/50 bg-gradient-to-b from-mint/5 to-transparent shadow-[0_0_80px_-20px_rgba(148,229,192,0.45)] p-8 md:py-16 md:px-10"
                  : "border-line bg-bg-elev/40 p-8 md:py-10 md:px-8"
              )}
            >
              {p.featured && (
                <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-mint text-bg px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                  <span className="size-1 rounded-full bg-bg" aria-hidden />
                  Más popular
                </div>
              )}

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <span className="font-mono text-xs text-muted uppercase">0{i + 1}</span>
              </div>
              <p className="text-sm text-cream/60 mb-8">{p.tagline}</p>

              <div className="flex items-baseline gap-2 mb-8 min-h-[72px]">
                {p.price !== null ? (
                  <>
                    <span className="font-display text-6xl font-semibold tracking-tight">
                      ${p.price}
                    </span>
                    <span className="text-muted text-sm">USD/mes</span>
                  </>
                ) : (
                  <span className="font-display text-4xl font-semibold tracking-tight text-cream">
                    A la medida
                  </span>
                )}
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
                href={p.href}
                target="_blank"
                rel="noreferrer"
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