"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Conectas tu WhatsApp",
    body: "En menos de 10 minutos. Usamos tu numero actual o uno nuevo, tu eliges. Nada de cambios en la rutina de tu negocio.",
  },
  {
    n: "02",
    title: "Entrenas a Asistto con tus FAQs",
    body: "Precios, horarios, ubicacion, que aceptas, que no. Hablamos en una llamada y queda listo. No necesitas saber de tecnologia.",
  },
  {
    n: "03",
    title: "Asistto trabaja por ti",
    body: "Responde, agenda, recuerda y te avisa solo cuando hay que poner ojo. Tu ves todo desde un panel simple.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="relative py-32 md:py-40 border-t border-line bg-bg-soft"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
              02 / Como funciona
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Tres pasos. <span className="text-muted">Listo en una tarde.</span>
            </h2>
          </div>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
          <div
            className="absolute top-12 left-0 right-0 h-px bg-line hidden md:block"
            aria-hidden
          />
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute top-12 left-0 right-0 h-px bg-mint origin-left hidden md:block"
            aria-hidden
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex md:block items-center gap-6 mb-6 md:mb-8">
                <div className="relative size-12 rounded-full border border-mint/40 bg-bg flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs text-mint">{s.n}</span>
                </div>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">{s.title}</h3>
              <p className="text-cream/65 leading-relaxed max-w-sm">{s.body}</p>
            </motion.div>
          ))}

          {/* Mobile vertical line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-6 w-px bg-mint origin-top md:hidden"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
