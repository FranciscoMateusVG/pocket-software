import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
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
  title: "Pocket Software — Software Built Exclusively For You",
  description:
    "We build custom software that only your company has. Every line of code, written for your problem alone. Tailor-made solutions for businesses that refuse to settle.",
  openGraph: {
    title: "Pocket Software — Software Built Exclusively For You",
    description:
      "We build custom software that only your company has. Every line of code, written for your problem alone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text font-body">{children}</body>
    </html>
  );
}
