"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const stats = [
  {
    num: "$550",
    label: "USD/mes salario mínimo",
    hoverText: "Ahorra más del 90%. Asistto automatiza tu atención desde $47/mes, sin nóminas, prestaciones ni ausencias."
  },
  {
    num: "68%",
    label: "prefieren escribir por WhatsApp",
    hoverText: "Tus clientes eligen mensajería directa por comodidad. Si no respondes rápido, le escribirán a tu competencia."
  },
  {
    num: "80%",
    label: "menos conversión tras 5 min",
    hoverText: "La probabilidad de cerrar una venta cae un 80% si tardas más de 5 minutos en responder. El tiempo es dinero."
  },
  {
    num: "78%",
    label: "compran al primero en responder",
    hoverText: "El 78% de los consumidores concretan con el primer negocio que les contesta. Asistto asegura tu venta al instante."
  }
];

export default function StatsBanner() {
  return (
    <section className="relative py-16 md:py-24 border-t border-line bg-bg-soft">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ num, label, hoverText, index }: { num: string; label: string; hoverText: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-[180px] rounded-2xl border border-line bg-bg-elev/40 backdrop-blur-md p-6 overflow-hidden flex flex-col justify-center items-center text-center cursor-none transition-colors duration-300 hover:border-mint/30 hover:bg-bg-elev/60"
      data-cursor="cta"
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        {/* Default view */}
        <motion.div
          animate={{
            opacity: hovered ? 0 : 1,
            scale: hovered ? 0.9 : 1,
            y: hovered ? -10 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col justify-center items-center"
        >
          <span className="font-display text-4xl md:text-5xl font-extrabold text-mint tracking-tight drop-shadow-[0_0_15px_rgba(148,229,192,0.15)]">
            {num}
          </span>
          <span className="mt-3 text-xs md:text-sm text-cream/70 font-medium px-2 leading-relaxed">
            {label}
          </span>
        </motion.div>

        {/* Hover view */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 15,
            scale: hovered ? 1 : 0.95
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <p className="text-xs md:text-sm text-cream leading-relaxed font-normal px-2">
            {hoverText}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
