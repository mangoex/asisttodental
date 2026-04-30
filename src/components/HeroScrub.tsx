"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MULTIPLIER = 3;

export default function HeroScrub() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.5, 0.7, 0.95]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.8, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    const onMeta = () => {
      video.pause();
      video.currentTime = 0;
    };
    video.addEventListener("loadedmetadata", onMeta, { once: true });

    let raf = 0;
    let lastT = -1;
    const tick = () => {
      const dur = video.duration;
      if (dur > 0 && Number.isFinite(dur)) {
        const p = scrollYProgress.get();
        const t = Math.min(Math.max(p * dur, 0), dur - 0.05);
        if (Math.abs(t - lastT) > 0.02) {
          video.currentTime = t;
          lastT = t;
          setProgress(p);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${(1 + MULTIPLIER) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/60 to-bg"
          style={{ opacity: overlayOpacity }}
          aria-hidden
        />
        <div
          className="absolute inset-0 grid-bg opacity-40"
          aria-hidden
        />

        <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <motion.div
              style={{ y: headlineY, opacity: headlineOpacity }}
              className="max-w-4xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-bg-elev/40 backdrop-blur px-3 py-1 text-xs text-mint font-mono uppercase tracking-widest">
                <span className="size-1.5 rounded-full bg-mint pulse-dot" aria-hidden />
                Disponible 24/7
              </div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-cream">
                Nunca pierdas un paciente por
                <span className="relative inline-block ml-3">
                  <span className="relative z-10 text-mint">no responder</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-mint/15 -z-0"
                    aria-hidden
                  />
                </span>
                <br />
                WhatsApp.
              </h1>
            </motion.div>

            <motion.p
              style={{ y: subY }}
              className="mt-8 max-w-xl text-lg text-cream/70 leading-relaxed"
            >
              Asistto Dental agenda citas, responde preguntas y trabaja 24/7. <br className="hidden sm:block" />
              Tu equipo se enfoca en lo que importa: atender al paciente que ya esta en el sillon.
            </motion.p>

            <motion.div
              style={{ y: ctaY }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://wa.me/5216741251648?text=Hola%2C%20quiero%20hacer%20una%20prueba%20de%20Asistto%20Dental"
                target="_blank"
                rel="noreferrer"
                data-cursor="cta"
                className="group relative inline-flex items-center gap-3 rounded-full bg-mint text-bg px-7 py-4 text-base font-medium transition-transform hover:scale-[1.02] shadow-[0_0_60px_-10px_rgba(148,229,192,0.45)]"
              >
                <span>Haz una prueba</span>
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href="#planes"
                className="text-sm text-cream/60 hover:text-cream transition-colors underline-offset-4 hover:underline"
              >
                Ver planes desde $47/mes
              </a>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute bottom-8 right-6 lg:right-10 z-20 flex flex-col items-center gap-3 text-cream/50"
          aria-hidden
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="scroll-line" />
        </div>

        <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-line" aria-hidden>
          <div
            className="h-full bg-gradient-to-r from-mint to-coral transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}