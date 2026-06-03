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
  title: "Asistto Dental — Tu asistente digital 24/7 para tu clinica",
  description:
    "Asistto Dental responde WhatsApp, agenda citas y trabaja por ti las 24 horas. Nunca pierdas un paciente por no contestar a tiempo.",
  metadataBase: new URL("https://asistto.humanio.digital"),
  openGraph: {
    title: "Asistto Dental — Tu asistente digital",
    description:
      "Agenda citas, responde preguntas y trabaja 24/7. Por Humanio.",
    type: "website",
    locale: "es_MX",
    siteName: "Asistto Dental",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asistto Dental",
    description: "Tu asistente digital 24/7 para clinicas dentales.",
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
