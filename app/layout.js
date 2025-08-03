import { Sora, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ESM - Digital Transformation & Technology Solutions",
  description:
    "SAP solutions, digital transformation consultancy and enterprise software development services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light-esm">
      <body
        className={`${sora.variable} ${manrope.variable} ${montserrat.variable} antialiased font-manrope`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
