import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Pocket Software — Software Feito Exclusivamente Para Você",
  description:
    "Desenvolvemos software sob medida que só a sua empresa tem. Cada linha de código, escrita para resolver o seu problema. Soluções exclusivas para empresas que não aceitam o padrão.",
  openGraph: {
    title: "Pocket Software — Software Feito Exclusivamente Para Você",
    description:
      "Desenvolvemos software sob medida que só a sua empresa tem. Cada linha de código, escrita para resolver o seu problema.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="pt-BR"
      className={`${dmSerif.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text font-body">
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
