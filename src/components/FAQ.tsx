"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Necesito cambiar mi numero de WhatsApp?",
    a: "No es obligatorio. Si quieres seguir con el numero actual, lo conectamos. Si prefieres uno nuevo dedicado para Asistto, tambien lo armamos. Te asesoramos en la primera llamada.",
  },
  {
    q: "Cuanto tarda en arrancar?",
    a: "Una sola tarde. La parte tecnica se resuelve en menos de una hora. El resto es entrenarlo con tus FAQs, que es una llamada de 30 a 45 minutos contigo o con tu recepcion.",
  },
  {
    q: "Que pasa si Asistto no sabe responder algo?",
    a: "Te lo deriva al instante. El paciente no se queda esperando: recibe un aviso de que un humano responde en breve y a ti te llega la conversacion completa para retomarla.",
  },
  {
    q: "Puedo cancelar cuando quiera?",
    a: "Si. Todos los planes son mes a mes. No hay contratos forzados. Solo te pedimos avisar antes del corte para que no se te cobre el siguiente periodo.",
  },
  {
    q: "Funciona con mi sistema de citas actual?",
    a: "Si usas Google Calendar, listo. Si tienes otro software dental, lo revisamos en la demo. Casi siempre se conecta.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 md:py-40 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
              05 / FAQ
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">
              Preguntas que <span className="text-muted">siempre nos hacen.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl font-medium pr-8 group-hover:text-mint transition-colors">
                    {f.q}
                  </span>
                  <span
                    className="size-9 rounded-full border border-line flex items-center justify-center shrink-0 group-hover:border-mint/50 transition-colors"
                    aria-hidden
                  >
                    <Plus
                      className={`size-4 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-mint" : "text-cream/70"
                      }`}
                      strokeWidth={1.5}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-12 text-cream/65 leading-relaxed max-w-2xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
