import Hero from "@/components/Hero";
import About from "@/components/About";
import Partners from "@/components/Partners";
import Customers from "@/components/Customers";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <div className="h-screen overflow-hidden">
        <Hero />
      </div>
      <About />
      <Services />
      <Partners />
      <Customers />
      <Contact />
    </main>
  );
}
