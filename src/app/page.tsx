import Nav from "@/components/Nav";
import HeroScrub from "@/components/HeroScrub";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Showcase from "@/components/Showcase";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroScrub />
        <Benefits />
        <HowItWorks />
        <Showcase />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
