"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planes", label: "Planes" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-14" : "h-20"
          )}
        >
          <a href="#" className="flex items-center gap-2 font-display font-semibold text-cream">
            <span
              className="inline-block size-2 rounded-full bg-mint pulse-dot"
              aria-hidden
            />
            <span className="tracking-tight">Asistto</span>
            <span className="text-muted text-sm font-mono">/dental</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-cream/70">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-cream transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#planes"
              className="text-sm text-cream/70 hover:text-cream transition-colors"
            >
              Ver planes
            </a>
            <a
              href="#demo"
              data-cursor="cta"
              className="group relative inline-flex items-center gap-2 rounded-full bg-mint text-bg px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]"
            >
              <span>Solicita demo gratis</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          <button
            className="md:hidden text-cream"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-6 border-t border-cream" />
            <span className="block w-6 border-t border-cream mt-1.5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-bg/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-cream/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="rounded-full bg-mint text-bg px-5 py-2.5 text-center font-medium"
            >
              Solicita demo gratis
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
