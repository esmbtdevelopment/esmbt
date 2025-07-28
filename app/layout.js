import { Sora, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "ESMBT - Digital Transformation & Technology Solutions",
  description:
    "SAP solutions, digital transformation consultancy and enterprise software development services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${manrope.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
