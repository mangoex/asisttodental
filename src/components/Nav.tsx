"use client";

import { useState } from "react";
import { trackMetaEvent } from "@/lib/meta";
import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "FAQ" },
];

const flags = [
  { emoji: "🇲🇽", label: "México" },
  { emoji: "🇨🇴", label: "Colombia" },
  { emoji: "🇵🇪", label: "Perú" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 flex items-start justify-between">

        {/* Logo — left */}
        <div className="flex items-center h-16 shrink-0">
          <a
            href="#"
            className="flex items-center gap-2 font-semibold"
            style={{ color: "#E1E0CC" }}
          >
            <Image
              src="/logo.svg"
              alt="Asistto Dental logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="tracking-tight">Asistto</span>
            <span className="text-sm opacity-40">/dental</span>
          </a>
        </div>

        {/* Center pill — hangs from the top edge */}
        <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2">
          <div className="flex items-center gap-6 lg:gap-10 bg-black rounded-b-2xl md:rounded-b-3xl px-5 py-2.5 md:px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap"
                style={{ color: "rgba(225, 224, 204, 0.75)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#E1E0CC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")
                }
              >
                {l.label}
              </a>
            ))}

            {/* Divider */}
            <span
              className="w-px h-3 shrink-0"
              style={{ background: "rgba(225,224,204,0.2)" }}
              aria-hidden
            />

            {/* Country flags */}
            {flags.map((f) => (
              <span
                key={f.label}
                role="img"
                aria-label={f.label}
                title={f.label}
                className="text-base leading-none cursor-default select-none"
              >
                {f.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* CTA — right */}
        <div className="hidden md:flex items-center h-16 shrink-0">
          <a
            href="https://wa.me/5216741251648?text=Hola%2C%20quiero%20hacer%20una%20prueba%20de%20Asistto%20Dental"
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackMetaEvent("Lead", {
                content_name: "Demo gratis Asistto Dental",
                content_category: "nav_whatsapp",
              })
            }
            data-cursor="cta"
            className="group inline-flex items-center gap-2 rounded-full bg-mint text-bg px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]"
          >
            <span>Haz una prueba</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 h-16"
          aria-label="Menu"
          style={{ color: "#E1E0CC" }}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 border-t border-current" />
          <span className="block w-6 border-t border-current" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden border-t backdrop-blur-xl"
          style={{ background: "rgba(0,0,0,0.95)", borderColor: "rgba(225,224,204,0.08)" }}
        >
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
              >
                {l.label}
              </a>
            ))}

            {/* Flags row in mobile */}
            <div className="flex items-center gap-3 py-1">
              {flags.map((f) => (
                <span
                  key={f.label}
                  role="img"
                  aria-label={f.label}
                  title={f.label}
                  className="text-xl cursor-default select-none"
                >
                  {f.emoji}
                </span>
              ))}
            </div>

            <a
              href="https://wa.me/5216741251648?text=Hola%2C%20quiero%20hacer%20una%20prueba%20de%20Asistto%20Dental"
              onClick={() => {
                setOpen(false);
                trackMetaEvent("Lead", {
                  content_name: "Demo gratis Asistto Dental",
                  content_category: "mobile_nav_whatsapp",
                });
              }}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-mint text-bg px-5 py-2.5 text-center font-medium"
            >
              Haz una prueba
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
