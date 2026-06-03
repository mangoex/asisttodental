"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function WordsPullUp({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const MULTIPLIER = 3;

export default function HeroScrub() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.45, 0.65, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.8, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
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
      <div className="sticky top-0 h-screen w-full p-3 md:p-5">
        {/* Inset rounded container */}
        <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">

          {/* Video background */}
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />

          {/* Noise overlay */}
          <div
            className="noise-overlay absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{ opacity: 0.65 }}
            aria-hidden
          />

          {/* Gradient overlay — darkens bottom for text legibility */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none"
            style={{ opacity: overlayOpacity }}
            aria-hidden
          />

          {/* Bottom-aligned content */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="relative z-10 h-full flex flex-col justify-end pb-10 md:pb-14"
          >
            <div className="w-full px-6 md:px-10">
              {/* Live badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-black/40 backdrop-blur px-3 py-1 text-xs text-mint font-mono uppercase tracking-widest">
                <span className="size-1.5 rounded-full bg-mint pulse-dot" aria-hidden />
                Disponible 24/7
              </div>

              {/* 12-col grid: headline left, description+cta right */}
              <div className="grid grid-cols-12 items-end gap-x-8 gap-y-6">

                {/* Left: giant headline */}
                <div className="col-span-12 lg:col-span-8">
                  <h1
                    className="font-display font-bold leading-[0.9] tracking-tight"
                    style={{ color: "#E1E0CC", fontSize: "clamp(2.6rem, 7vw, 7.5rem)" }}
                  >
                    <WordsPullUp text="Nunca pierdas un contacto por" />
                    {" "}
                    <span className="text-mint">
                      <WordsPullUp text="no responder" />
                    </span>
                    {" "}
                    <WordsPullUp text="WhatsApp." />
                  </h1>
                </div>

                {/* Right: description + CTAs */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 pb-0.5">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm md:text-base leading-[1.4]"
                    style={{ color: "rgba(225, 224, 204, 0.7)" }}
                  >
                    Asistto agenda citas, responde preguntas y trabaja 24/7.
                    Tu equipo se enfoca en lo que importa: atender al cliente y hacer crecer tu negocio.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <a
                      href="https://wa.me/5216741251648?text=Hola%2C%20quiero%20hacer%20una%20prueba%20de%20Asistto"
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="cta"
                      className="group inline-flex items-center gap-3 rounded-full bg-mint text-bg px-6 py-3 text-sm font-medium transition-all hover:gap-4"
                    >
                      <span>Haz una prueba</span>
                      <span className="inline-flex items-center justify-center size-9 rounded-full bg-black transition-transform group-hover:scale-110">
                        <span className="text-mint text-sm">→</span>
                      </span>
                    </a>
                    <a
                      href="#planes"
                      className="text-sm transition-colors hover:underline underline-offset-4"
                      style={{ color: "rgba(225, 224, 204, 0.55)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(225,224,204,0.9)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225,224,204,0.55)")}
                    >
                      Ver planes desde $47/mes
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-3"
            style={{ color: "rgba(225, 224, 204, 0.45)" }}
            aria-hidden
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
              Scroll
            </span>
            <span className="scroll-line" />
          </div>

          {/* Scroll progress bar */}
          <div
            className="absolute top-0 left-0 right-0 z-20 h-[2px]"
            style={{ background: "rgba(225,224,204,0.08)" }}
            aria-hidden
          >
            <div
              className="h-full bg-gradient-to-r from-mint to-coral transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
