import type { Metadata } from "next";
import { Fraunces, Pinyon_Script, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { kontakt, meta } from "@/content/copy.de";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { ScrollProgress } from "@/components/layout/scroll-progress";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  // Kein später Font-Swap-Repaint (LCP): auf langsamen Verbindungen bleibt
  // der metrisch angepasste Fallback stehen.
  display: "optional",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.permanentreich.info"),
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    locale: "de_DE",
    type: "website",
    images: ["/media/og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: kontakt.name,
  description: meta.description,
  founder: kontakt.inhaberin,
  telephone: "+4915678338712",
  address: {
    "@type": "PostalAddress",
    streetAddress: kontakt.strasse,
    addressLocality: "Wiehl",
    postalCode: "51674",
    addressCountry: "DE",
  },
  url: "https://www.permanentreich.info",
  sameAs: [kontakt.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${pinyon.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="has-custom-cursor min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
