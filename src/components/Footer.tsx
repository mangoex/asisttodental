export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <a href="#" className="flex items-center gap-2 font-display font-semibold text-cream">
              <span className="inline-block size-2 rounded-full bg-mint" aria-hidden />
              Asistto
              <span className="text-muted text-sm font-mono">/dental</span>
            </a>
            <p className="mt-4 text-sm text-cream/55 max-w-sm leading-relaxed">
              Tu asistente digital para clinicas dentales. Trabajamos para que ningun paciente se quede sin respuesta.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
              Producto
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#beneficios" className="hover:text-cream transition-colors">Beneficios</a></li>
              <li><a href="#como-funciona" className="hover:text-cream transition-colors">Como funciona</a></li>
              <li><a href="#planes" className="hover:text-cream transition-colors">Planes</a></li>
              <li><a href="#faq" className="hover:text-cream transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
              Hablemos
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a
                  href="https://wa.me/5215555555555"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  WhatsApp directo
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@humanio.digital"
                  className="hover:text-cream transition-colors"
                >
                  hola@humanio.digital
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted">
          <p>© {year} Asistto Dental. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            Asistto de
            <a
              href="https://www.humanio.digital"
              target="_blank"
              rel="noreferrer"
              className="text-cream hover:text-mint transition-colors font-medium"
            >
              Humanio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
