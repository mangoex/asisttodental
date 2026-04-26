"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const messages = [
  { from: "user", text: "Hola, quiero agendar una limpieza. Tienen cupo el sabado?" },
  { from: "bot", text: "Hola! Si, tenemos disponibilidad el sabado. Te muestro los horarios:" },
  { from: "bot", text: "🕐 10:00 am · 12:30 pm · 4:00 pm\n\nCual te queda mejor?" },
  { from: "user", text: "12:30 esta perfecto" },
  { from: "bot", text: "Listo. Confirmada tu cita para el sab 27 a las 12:30 pm con la Dra. Mendoza. Te recuerdo un dia antes 👍" },
];

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 border-t border-line overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div style={{ x: x2 }} className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
              03 / En vivo
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight mt-6">
              Asi se ve una conversacion <span className="text-muted">de verdad.</span>
            </h2>
            <p className="text-cream/65 leading-relaxed mt-6 max-w-md">
              Sin sonar a robot. Sin cinco preguntas antes de la primera respuesta. Solo lo que el paciente necesita, cuando lo necesita.
            </p>
            <ul className="mt-10 space-y-4 text-sm text-cream/70">
              {[
                "Detecta intencion de agendar",
                "Ofrece horarios reales de tu calendario",
                "Confirma y guarda en tu agenda",
                "Recuerda un dia antes y el mismo dia",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="size-1.5 rounded-full bg-mint mt-2 shrink-0" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            style={{ x }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-8 bg-mint/5 blur-3xl rounded-full" aria-hidden />
            <div className="relative rounded-3xl border border-line bg-bg-elev/60 backdrop-blur-sm p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-line">
                <div className="size-10 rounded-full bg-gradient-to-br from-mint to-mint-soft flex items-center justify-center text-bg font-display font-semibold">
                  AD
                </div>
                <div>
                  <p className="text-sm font-medium">Asistto Dental</p>
                  <p className="text-xs text-muted flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-mint pulse-dot" aria-hidden />
                    En linea · responde en segundos
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${
                        m.from === "user"
                          ? "bg-mint text-bg rounded-br-sm"
                          : "bg-bg/80 text-cream rounded-bl-sm border border-line"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: messages.length * 0.15 + 0.2 }}
                  className="flex items-center gap-1.5 pt-2 pl-2"
                >
                  <span className="size-1.5 rounded-full bg-muted animate-bounce" />
                  <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:120ms]" />
                  <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:240ms]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
