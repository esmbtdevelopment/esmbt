import { Sora, Manrope, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { getTranslations as getNextIntlTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { TranslationDebugProvider } from '@/lib/contexts/TranslationDebugContext';
import { getTranslations } from '@/lib/translations/server';
// TODO: Fix AuthContext provider before enabling
// import TranslationDebugToggle from '@/components/TranslationDebugToggle';

const locales = ['en', 'tr'];

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getNextIntlTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Providing all messages to the client side (from Firestore via our server function)
  const messages = await getTranslations(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <TranslationDebugProvider>
        <div className={`${sora.variable} ${manrope.variable} ${montserrat.variable} antialiased font-manrope`}>
          <Navbar />
          {children}
          <Footer />
          {/* TODO: Add AuthProvider before enabling TranslationDebugToggle */}
          {/* <TranslationDebugToggle /> */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                style: {
                  background: "#10b981",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                },
              },
            }}
          />
        </div>
      </TranslationDebugProvider>
    </NextIntlClientProvider>
  );
}
