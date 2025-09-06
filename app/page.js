import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Partners from "@/components/landing/Partners";
import Customers from "@/components/landing/Customers";
import Services from "@/components/landing/Services";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <div className="min-h-screen overflow-hidden">
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
