import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asistto — Tu asistente digital 24/7 para tu negocio",
  description:
    "Asistto responde WhatsApp, agenda citas y trabaja por ti las 24 horas. Nunca pierdas un contacto por no contestar a tiempo.",
  metadataBase: new URL("https://asistto.humanio.digital"),
  openGraph: {
    title: "Asistto — Tu asistente digital 24/7",
    description:
      "Agenda citas, responde preguntas y trabaja 24/7. Por Humanio.",
    type: "website",
    locale: "es_MX",
    siteName: "Asistto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asistto",
    description: "Tu asistente digital 24/7 para tu negocio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${almarai.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="grain min-h-screen flex flex-col">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
