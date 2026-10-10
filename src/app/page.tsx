
import {
  Navbar,
  Hero,
  About,
  Projects,
  Skills,
  Achievements,
  Contact,
  Footer,
} from "@/components/portfolio";
import BackgroundDots from "@/components/BackgroundDots";

export default function Home() {
  return (
    <>
      <BackgroundDots />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
