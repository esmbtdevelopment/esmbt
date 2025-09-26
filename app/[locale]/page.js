"use client";
import { useEffect } from "react";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Partners from "@/components/landing/Partners";
import Customers from "@/components/landing/Customers";
import Services from "@/components/landing/Services";
import Contact from "@/components/contact/Contact";
import { handleHashNavigation } from "@/utils/navigation";

export default function Home() {
  useEffect(() => {
    // Handle hash-based navigation when page loads
    handleHashNavigation();
  }, []);

  return (
    <main className="w-full">
      <div className="min-h-screen overflow-hidden">
        <Hero />
      </div>
      <About />
      <Services />
      <Partners />
      <Contact />
    </main>
  );
}
