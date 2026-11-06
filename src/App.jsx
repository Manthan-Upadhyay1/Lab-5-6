import { useEffect, useRef } from "react";
import DemoModal from "./components/demo/DemoModal";
import FloatingActions from "./components/layout/FloatingActions";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About";
import Features from "./components/sections/Features";
import Hero from "./components/sections/Hero";
import HowItWorks from "./components/sections/HowItWorks";
import Problem from "./components/sections/Problem";
import ProfilesSection from "./components/sections/ProfilesSection";
import Travellers from "./components/sections/Travellers";
import { DemoProvider, useDemo } from "./context/DemoContext";
import { ProfilesProvider } from "./context/ProfilesContext";
import { useGsap } from "./hooks/useGsap";
import { gsap, ScrollTrigger } from "./lib/gsap";

function Page() {
  const mainRef = useRef(null);
  const { open } = useDemo();

  // Section headings + intro paragraphs fade up as they scroll into view
  useGsap(mainRef, () => {
    gsap.utils.toArray("h2").forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none reverse" },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
      });
    });
    gsap.utils.toArray("h2 + p").forEach((text) => {
      gsap.from(text, {
        scrollTrigger: { trigger: text, start: "top 88%", toggleActions: "play none none reverse" },
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.1,
        ease: "power2.out",
      });
    });
    gsap.from("footer", {
      scrollTrigger: { trigger: "footer", start: "top 90%", toggleActions: "play none none reverse" },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  // Recalculate scroll positions once fonts/images have settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Loader onDone={() => ScrollTrigger.refresh()} />
      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Travellers />
        <About />
        <ProfilesSection />
      </main>
      <Footer />
      <FloatingActions />
      {open && <DemoModal />}
    </>
  );
}

export default function App() {
  return (
    <ProfilesProvider>
      <DemoProvider>
        <Page />
      </DemoProvider>
    </ProfilesProvider>
  );
}
