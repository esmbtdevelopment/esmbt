import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="w-full">
      <div className="h-screen overflow-hidden">
        <Hero />
      </div>
      <About />
    </main>
  );
}
