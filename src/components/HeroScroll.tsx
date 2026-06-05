"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { CheckCircle2, ShieldCheck, Zap, Sparkles, MessageSquareDot } from "lucide-react";

const phoneMessages = [
  { from: "user", text: "Hola, me interesa agendar una consultoría para mi negocio." },
  { from: "bot", text: "¡Hola! Claro que sí, con gusto te ayudo a agendar en segundos. 🚀" },
  { from: "bot", text: "Tenemos estos horarios disponibles esta semana:\n\n📅 Lunes 10:00 am\n📅 Martes 3:00 pm\n📅 Jueves 11:30 am\n\n¿Cuál prefieres?" },
  { from: "user", text: "El lunes a las 10:00 am por favor." },
  { from: "bot", text: "¡Perfecto! Cita agendada para el lunes a las 10:00 am. Te enviaré un recordatorio automático por aquí un día antes. 👍" },
  { from: "user", text: "Excelente, ¡qué rápido y fácil!" },
  { from: "bot", text: "¡De nada! Estamos para servirte 24/7. De forma segura y sin complicaciones. 😉" }
];

export default function HeroScroll() {
  const [visibleMessages, setVisibleMessages] = useState<typeof phoneMessages>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-playing phone chat animation loop
  useEffect(() => {
    let active = true;

    const runAnimation = async () => {
      while (active) {
        setVisibleMessages([]);
        setIsTyping(false);
        await new Promise((r) => setTimeout(r, 1000));
        if (!active) break;

        for (let i = 0; i < phoneMessages.length; i++) {
          const msg = phoneMessages[i];
          if (msg.from === "bot") {
            setIsTyping(true);
            const typingTime = Math.max(1000, msg.text.length * 12);
            await new Promise((r) => setTimeout(r, typingTime));
            if (!active) break;
            setIsTyping(false);
          } else {
            await new Promise((r) => setTimeout(r, 800));
            if (!active) break;
          }

          setVisibleMessages((prev) => [...prev, msg]);
          
          // Wait after displaying message
          await new Promise((r) => setTimeout(r, 1400));
          if (!active) break;
        }

        // Wait at the end of loop before restarting
        await new Promise((r) => setTimeout(r, 5000));
      }
    };

    runAnimation();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative w-full bg-bg pt-20 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-mint/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-mint/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center px-4">
            {/* Meta Partner Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 text-xs text-mint font-mono uppercase tracking-widest"
            >
              <CheckCircle2 className="size-4 text-mint fill-bg" />
              Meta Tech Partner Oficial
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-extrabold leading-[1.05] tracking-tight text-cream text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl"
            >
              Tu asistente de WhatsApp <br />
              <span className="text-mint font-serif italic">24/7 para tu negocio</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base md:text-lg max-w-3xl text-cream/70 leading-relaxed"
            >
              Consigue más prospectos, agenda citas y atiende clientes de forma{" "}
              <span className="text-white font-semibold">fácil, rápida y segura</span>. Sin riesgo de bloqueos y listo en 24 horas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-4 relative z-20"
            >
              <a
                href="https://wa.me/5216741251648?text=Hola%2C%20quiero%20hacer%20una%20prueba%20de%20Asistto"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-mint text-bg px-6 py-3.5 text-sm font-medium hover:scale-[1.02] transition-transform cursor-none"
                data-cursor="cta"
              >
                <span>Haz una prueba gratis</span>
                <span className="inline-flex items-center justify-center size-7 rounded-full bg-black transition-transform group-hover:scale-110">
                  <span className="text-mint text-xs">→</span>
                </span>
              </a>
              <a
                href="#planes"
                className="inline-flex items-center justify-center rounded-full border border-line bg-bg-elev/40 px-6 py-3.5 text-sm font-medium text-cream hover:bg-bg-elev transition-colors cursor-none"
                data-cursor="cta"
              >
                Ver planes
              </a>
            </motion.div>
          </div>
        }
      >
        {/* Landscape content inside Aceternity card */}
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-6 gap-6 bg-[#09090B]">
          
          {/* Left Column: Easy and Fast */}
          <div className="hidden md:flex flex-col gap-6 text-left">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-bg-elev/30 border border-line p-5 rounded-2xl max-w-[220px] shadow-lg backdrop-blur-sm"
            >
              <div className="size-9 rounded-xl bg-mint/10 border border-mint/20 flex items-center justify-center mb-3">
                <Sparkles className="size-4.5 text-mint" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">100% Fácil</h3>
              <p className="text-xs text-cream/60 leading-relaxed">
                Instalación guiada sin necesidad de código ni conocimientos técnicos.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-bg-elev/30 border border-line p-5 rounded-2xl max-w-[220px] shadow-lg backdrop-blur-sm"
            >
              <div className="size-9 rounded-xl bg-mint/10 border border-mint/20 flex items-center justify-center mb-3">
                <Zap className="size-4.5 text-mint" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Súper Rápido</h3>
              <p className="text-xs text-cream/60 leading-relaxed">
                Tu asistente configurado, entrenado y respondiendo en 24 horas.
              </p>
            </motion.div>
          </div>

          {/* Center Column: Phone Mockup */}
          <div className="relative w-[280px] h-[340px] md:h-full border-[6px] border-[#3F3F46]/80 rounded-[38px] bg-[#0B0B0C] shadow-2xl overflow-hidden flex flex-col shrink-0">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#18181B] rounded-b-xl z-20 flex justify-center items-center">
              <div className="w-8 h-1 bg-[#27272A] rounded-full mb-1" />
            </div>

            {/* WhatsApp Phone Header */}
            <div className="bg-[#1F2C34] pt-5 pb-2.5 px-3 flex items-center gap-2 border-b border-zinc-900 select-none">
              <div className="size-7 rounded-full bg-gradient-to-br from-mint to-mint-soft flex items-center justify-center text-bg text-[10px] font-bold">
                A
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-medium text-white">Asistto</p>
                  <span className="text-[9px] text-[#00A884]" title="Oficial">✓</span>
                </div>
                <p className="text-[8px] text-[#8696A0]">Cuenta comercial oficial</p>
              </div>
            </div>

            {/* WhatsApp Chat Area */}
            <div className="bg-[#0B141A] flex-1 p-3 overflow-y-auto space-y-2.5 text-[11px] text-left chat-scroll flex flex-col">
              
              {/* Info text */}
              <div className="self-center bg-[#182229] text-[#8696A0] text-[8px] rounded px-2 py-0.5 mb-2 select-none text-center">
                🔒 Mensajes cifrados de forma segura
              </div>

              {/* Message List */}
              {visibleMessages.map((m, i) => (
                <div
                  key={i}
                  className={`flex w-full ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-[85%] leading-relaxed shadow-sm ${
                      m.from === "user"
                        ? "bg-[#005C4B] text-white rounded-tr-none text-left"
                        : "bg-[#202C33] text-[#E9EDEF] rounded-tl-none text-left border border-zinc-800"
                    }`}
                  >
                    <p className="whitespace-pre-line text-[10.5px]">{m.text}</p>
                  </div>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#202C33] rounded-lg rounded-tl-none p-2 w-[55px] flex items-center justify-center gap-1 shadow-sm border border-zinc-800">
                    <span className="size-1 rounded-full bg-mint animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="size-1 rounded-full bg-mint animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="size-1 rounded-full bg-mint animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Safe and Certified */}
          <div className="hidden md:flex flex-col gap-6 text-left">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-bg-elev/30 border border-line p-5 rounded-2xl max-w-[220px] shadow-lg backdrop-blur-sm"
            >
              <div className="size-9 rounded-xl bg-mint/10 border border-mint/20 flex items-center justify-center mb-3">
                <ShieldCheck className="size-4.5 text-mint" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Totalmente Seguro</h3>
              <p className="text-xs text-cream/60 leading-relaxed">
                Utiliza la API oficial de WhatsApp Cloud. Cero riesgo de bloqueos o suspensiones.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-bg-elev/30 border border-line p-5 rounded-2xl max-w-[220px] shadow-lg backdrop-blur-sm"
            >
              <div className="size-9 rounded-xl bg-mint/10 border border-mint/20 flex items-center justify-center mb-3">
                <MessageSquareDot className="size-4.5 text-mint" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Tecnología Oficial</h3>
              <p className="text-xs text-cream/60 leading-relaxed">
                Respaldado por un Meta Tech Partner oficial, garantizando estabilidad y privacidad.
              </p>
            </motion.div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
