import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ShareInstall } from "@/components/ShareInstall";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Perkin — Content Creator & Student Entrepreneur",
    template: "%s | Perkin — Content Creator & Student Entrepreneur",
  },
  description: "Content creator and student entrepreneur passionate about blending storytelling, technology, and design. Exploring AI, creativity, and the student founder experience.",
  keywords: ["content creator", "student entrepreneur", "storytelling", "technology", "design", "AI", "cinematic", "YouTube", "creative projects"],
  authors: [{ name: "Perkin" }],
  creator: "Perkin",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://perkin.dev",
    title: "Perkin — Content Creator & Student Entrepreneur",
    description: "Content creator and student entrepreneur passionate about blending storytelling, technology, and design. Exploring AI, creativity, and the student founder experience.",
    siteName: "Perkin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perkin — Content Creator & Student Entrepreneur",
    description: "Content creator and student entrepreneur passionate about blending storytelling, technology, and design. Exploring AI, creativity, and the student founder experience.",
    creator: "@perkin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Perkin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0B0B0C" />
        <meta name="msapplication-TileColor" content="#0B0B0C" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-gradient-cinematic`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="relative min-h-screen">
              <Navigation />
              <main className="relative z-10">
                {children}
              </main>
              <Footer />
              <ShareInstall />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
