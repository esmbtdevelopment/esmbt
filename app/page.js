import Hero from "@/components/Hero";
import About from "@/components/About";
import Partners from "@/components/Partners";
import Customers from "@/components/Customers";

export default function Home() {
  return (
    <main className="w-full">
      <div className="h-screen overflow-hidden">
        <Hero />
      </div>
      <About />
      <Partners />
      <Customers />
    </main>
  );
}
