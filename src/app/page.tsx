import Nav from "@/components/Nav";
import HeroScroll from "@/components/HeroScroll";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import StatsBanner from "@/components/StatsBanner";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroScroll />
        <Benefits />
        <HowItWorks />
        <StatsBanner />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

