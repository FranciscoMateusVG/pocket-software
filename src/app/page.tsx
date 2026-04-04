import StickyHeader from "@/components/StickyHeader";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import Hero from "@/components/Hero";
import SpeedStatement from "@/components/SpeedStatement";
import CapacitySignal from "@/components/CapacitySignal";
import Pain from "@/components/Pain";
import Difference from "@/components/Difference";
import Process from "@/components/Process";
import Proof from "@/components/Proof";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-bg focus:px-4 focus:py-2 focus:font-body focus:font-semibold"
      >
        Pular para o conteúdo
      </a>
      <StickyHeader />
      <AnalyticsProvider />
      <main id="main-content">
        <Hero />
        <SpeedStatement />
        <CapacitySignal />
        <Pain />
        <Difference />
        <Process />
        <Proof />
        <Contact />
      </main>
      <footer className="py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)] text-center">
          <p className="text-text-dim text-sm">
            &copy; {new Date().getFullYear()} Pocket Software. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
