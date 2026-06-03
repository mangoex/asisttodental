"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface Message {
  from: "user" | "bot";
  text: string;
  time: string;
}

interface DialogOption {
  text: string;
  nextNodeId: string;
}

interface DialogNode {
  botMessages: string[];
  options: DialogOption[];
}

const DIALOG_TREE: Record<string, DialogNode> = {
  inicio: {
    botMessages: [
      "¡Hola! Bienvenido a Asistto. 🤖",
      "Soy el asistente inteligente 24/7 de tu negocio. Respondo dudas, agendo reuniones y califico prospectos por WhatsApp.",
      "Prueba interactuar conmigo seleccionando alguna de las siguientes opciones:"
    ],
    options: [
      { text: "🗓️ ¿Tienen citas libres esta semana?", nextNodeId: "citas_semana" },
      { text: "💰 ¿Qué servicios ofrecen y sus precios?", nextNodeId: "precios" },
      { text: "📍 ¿Dónde están ubicados?", nextNodeId: "ubicacion" }
    ]
  },
  citas_semana: {
    botMessages: [
      "¡Sí, claro! Tenemos disponibilidad esta semana. 📅",
      "Te muestro los horarios libres de nuestro calendario:\n\n🕐 Lunes 10:00 am · Martes 2:30 pm · Miércoles 4:00 pm",
      "¿Cuál de estos te queda mejor?"
    ],
    options: [
      { text: "👉 Lunes 10:00 am está perfecto", nextNodeId: "cita_confirmada" },
      { text: "👤 ¿Quién me atenderá?", nextNodeId: "equipo" },
      { text: "🔙 Ver otras dudas", nextNodeId: "inicio" }
    ]
  },
  cita_confirmada: {
    botMessages: [
      "¡Listo! Cita confirmada para el lunes a las 10:00 am. 🚀",
      "Te llegará un recordatorio automático por WhatsApp un día antes para reconfirmar. 👍",
      "¿Te gustaría consultar algo más?"
    ],
    options: [
      { text: "📍 ¿Cómo llego a sus oficinas?", nextNodeId: "ubicacion" },
      { text: "💳 ¿Qué formas de pago aceptan?", nextNodeId: "tarjetas" },
      { text: "🔄 Reiniciar simulación", nextNodeId: "inicio" }
    ]
  },
  equipo: {
    botMessages: [
      "Te atenderá uno de nuestros asesores especializados según las necesidades de tu proyecto. 🤝",
      "Todos cuentan con amplia trayectoria y te guiarán paso a paso en tu sesión de consultoría inicial."
    ],
    options: [
      { text: "🗓️ Agendar el lunes a las 10:00 am", nextNodeId: "cita_confirmada" },
      { text: "💰 Ver precios de servicios", nextNodeId: "precios" },
      { text: "🔙 Volver al inicio", nextNodeId: "inicio" }
    ]
  },
  precios: {
    botMessages: [
      "Ofrecemos consultorías iniciales de diagnóstico gratis y planes de automatización a la medida. 📈",
      "Nuestros servicios mensuales de asistencia con Inteligencia Artificial comienzan desde $47 USD. ¿Te gustaría agendar una llamada de diagnóstico?"
    ],
    options: [
      { text: "🗓️ Sí, quiero agendar llamada", nextNodeId: "citas_semana" },
      { text: "💳 ¿Qué formas de pago aceptan?", nextNodeId: "tarjetas" },
      { text: "🔙 Volver al inicio", nextNodeId: "inicio" }
    ]
  },
  tarjetas: {
    botMessages: [
      "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex), transferencia bancaria directa y PayPal. 💳",
      "Emitimos factura fiscal de inmediato por cada pago recibido."
    ],
    options: [
      { text: "🗓️ Agendar cita esta semana", nextNodeId: "citas_semana" },
      { text: "📍 ¿Dónde están ubicados?", nextNodeId: "ubicacion" },
      { text: "🔄 Reiniciar simulación", nextNodeId: "inicio" }
    ]
  },
  ubicacion: {
    botMessages: [
      "Nuestras oficinas principales están en Av. Reforma 405, Piso 2, Colonia Roma Norte, CDMX. 📍",
      "También realizamos todas las reuniones por videollamada (Zoom o Google Meet) si lo prefieres.",
      "Atendemos de Lunes a Sábado de 9:00 am a 7:00 pm."
    ],
    options: [
      { text: "🗓️ Ver citas para esta semana", nextNodeId: "citas_semana" },
      { text: "💰 Ver precios y servicios", nextNodeId: "precios" },
      { text: "🔄 Reiniciar simulación", nextNodeId: "inicio" }
    ]
  }
};

const getFormattedTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const isInView = useInView(ref, { once: true, amount: 0.25 });

  // Conversation States
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<DialogOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const sequenceRef = useRef(0);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Trigger initial chat sequence when component is visible
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      restartConversation();
    }
  }, [isInView, hasStarted]);

  const restartConversation = async () => {
    const currentSeq = ++sequenceRef.current;
    
    // Clear everything
    setMessages([]);
    setOptions([]);
    setIsTyping(true);
    
    // Initial wait
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (currentSeq !== sequenceRef.current) return;

    const node = DIALOG_TREE.inicio;
    for (let i = 0; i < node.botMessages.length; i++) {
      setIsTyping(true);
      
      // Simulate typing speed proportional to message length
      const delay = Math.max(800, node.botMessages[i].length * 15);
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (currentSeq !== sequenceRef.current) return;
      
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: node.botMessages[i], time: getFormattedTime() }
      ]);
    }
    
    setIsTyping(false);
    setOptions(node.options);
  };

  const handleOptionClick = async (opt: DialogOption) => {
    const currentSeq = ++sequenceRef.current;
    
    // 1. Add User Message
    setMessages((prev) => [
      ...prev,
      { from: "user", text: opt.text, time: getFormattedTime() }
    ]);
    setOptions([]); // Hide options during bot reply simulation

    // 2. Start Typing Animation
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (currentSeq !== sequenceRef.current) return;

    if (opt.nextNodeId === "inicio") {
      restartConversation();
      return;
    }

    // 3. Load Target Dialog Node
    const node = DIALOG_TREE[opt.nextNodeId];
    if (!node) {
      setIsTyping(false);
      return;
    }

    for (let i = 0; i < node.botMessages.length; i++) {
      setIsTyping(true);
      
      const delay = Math.max(900, node.botMessages[i].length * 15);
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (currentSeq !== sequenceRef.current) return;
      
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: node.botMessages[i], time: getFormattedTime() }
      ]);
    }

    setIsTyping(false);
    setOptions(node.options);
  };

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 border-t border-line overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left info column */}
          <motion.div style={{ x: x2 }} className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint">
              03 / En vivo
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight mt-6">
              Asi se ve una conversacion <span className="font-serif italic text-muted">de verdad.</span>
            </h2>
            <p className="text-cream/65 leading-relaxed mt-6 max-w-md">
              Sin sonar a robot. Sin cinco preguntas antes de la primera respuesta. Solo lo que tu contacto necesita, cuando lo necesita.
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

          {/* Right chat simulator column */}
          <motion.div
            style={{ x }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-8 bg-mint/5 blur-3xl rounded-full" aria-hidden />
            <div className="relative rounded-3xl border border-line bg-bg-elev/60 backdrop-blur-sm p-4 md:p-6 shadow-2xl overflow-hidden">
              
              {/* WhatsApp Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-mint to-mint-soft flex items-center justify-center text-bg font-display font-semibold select-none">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-medium">Asistto</p>
                    <p className="text-xs text-muted flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-mint pulse-dot" aria-hidden />
                      En linea · responde en segundos
                    </p>
                  </div>
                </div>
                
                {/* Reset button */}
                <button
                  onClick={restartConversation}
                  title="Reiniciar chat"
                  className="size-8 rounded-full border border-line flex items-center justify-center text-cream/60 hover:text-mint hover:border-mint/30 hover:bg-mint/5 transition-all active:scale-95 cursor-none"
                  data-cursor="cta"
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>

              {/* Messages Container (Fixed Scroll Area) */}
              <div 
                ref={chatContainerRef}
                className="chat-scroll h-[320px] md:h-[350px] overflow-y-auto pr-1.5 space-y-3.5 scroll-smooth"
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                        m.from === "user"
                          ? "bg-mint text-bg rounded-br-sm pr-14 pb-2"
                          : "bg-bg/85 text-cream rounded-bl-sm border border-line pr-14 pb-2"
                      }`}
                    >
                      <span>{m.text}</span>
                      
                      {/* Message meta (time + checkmarks) */}
                      <span 
                        className={`absolute bottom-0.5 right-2 flex items-center gap-0.5 text-[9px] font-mono select-none ${
                          m.from === "user" ? "text-bg/60" : "text-muted"
                        }`}
                      >
                        {m.time}
                        {m.from === "user" && (
                          <span className="text-bg font-bold font-sans">✓✓</span>
                        )}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Bouncing Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-bg/85 text-cream rounded-2xl rounded-bl-sm border border-line px-4 py-3 shadow-sm flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-mint animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="size-1.5 rounded-full bg-mint animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="size-1.5 rounded-full bg-mint animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Input Area / Interactive Quick Replies */}
              <div className="border-t border-line pt-4 mt-4">
                <AnimatePresence mode="wait">
                  {options.length > 0 ? (
                    <motion.div 
                      key="options"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex flex-wrap gap-2 justify-center"
                    >
                      {options.map((opt) => (
                        <motion.button
                          key={opt.text}
                          whileHover={{ scale: 1.02, backgroundColor: "rgba(148, 229, 192, 0.1)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOptionClick(opt)}
                          className="rounded-full border border-mint/30 bg-mint/5 px-4 py-2 text-xs text-mint transition-colors duration-200 cursor-none select-none"
                          data-cursor="cta"
                        >
                          {opt.text}
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    !isTyping && messages.length > 0 && (
                      <motion.div
                        key="reset-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xs text-muted py-2 select-none"
                      >
                        Simulación terminada. Puedes reiniciarla arriba.
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
