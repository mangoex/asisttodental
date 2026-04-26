# Asistto Dental — Landing

Landing page de **Asistto Dental, tu Asistente Digital** — un servicio de Humanio para clínicas dentales.

Stack: Next.js 16 (App Router) + Tailwind v4 + Framer Motion + TypeScript.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploy

Conectado a Vercel. Cada push a `main` despliega automáticamente cuando se conecta el repo desde el dashboard.

## Estructura

```
src/
├── app/
│   ├── layout.tsx     # Root layout, fuentes, metadata
│   ├── page.tsx       # Composición de la landing
│   └── globals.css    # Tema futurista (Tailwind v4)
├── components/
│   ├── HeroScrub.tsx  # Hero con video sincronizado al scroll
│   ├── Cursor.tsx     # Cursor custom (mouse rollout)
│   ├── Nav.tsx
│   ├── Benefits.tsx
│   ├── HowItWorks.tsx
│   ├── Showcase.tsx   # Demo de chat WhatsApp
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
└── lib/
    └── utils.ts
```

## Hero video

`public/hero.mp4` — el timeline del video se sincroniza al scroll (scroll abajo = avanza, scroll arriba = retrocede). Para cambiar el video, reemplaza el archivo manteniendo el mismo nombre.

## Marca

Asistto de [Humanio](https://www.humanio.digital).
