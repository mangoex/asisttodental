"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { trackMetaEvent } from "@/lib/meta";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <section
      id="demo"
      ref={ref}
      className="relative py-32 md:py-44 border-t border-line overflow-hidden"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[60%] bg-mint/10 blur-3xl rounded-full"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
          06 / Demo gratis
        </span>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight mt-6">
          Veelo trabajando <br />
          <span className="text-mint">con tu propia clinica.</span>
        </h2>
        <p className="mt-8 text-cream/65 text-lg max-w-xl mx-auto">
          Te montamos una demo con tus FAQs reales. Sin tarjeta, sin compromiso. Si te late, lo dejamos puesto el mismo dia.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/5216741251648?text=Hola%2C%20quiero%20hacer%20una%20prueba%20de%20Asistto%20Dental"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackMetaEvent("Lead", {
                content_name: "Demo gratis Asistto Dental",
                content_category: "whatsapp",
              })
            }
            data-cursor="cta"
            className="group inline-flex items-center gap-3 rounded-full bg-mint text-bg px-8 py-4 text-base font-medium hover:scale-[1.02] transition-transform shadow-[0_0_60px_-10px_rgba(148,229,192,0.5)]"
          >
            <span>Haz una prueba</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="mailto:contacto@humanio.digital?subject=Demo%20Asistto%20Dental"
            onClick={() =>
              trackMetaEvent("Contact", {
                content_name: "Email demo Asistto Dental",
                content_category: "email",
              })
            }
            className="text-sm text-cream/60 hover:text-cream transition-colors underline-offset-4 hover:underline"
          >
            o escribe a contacto@humanio.digital
          </a>
        </div>
      </div>
    </section>
  );
}
