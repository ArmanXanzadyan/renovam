import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans, fontHeading } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MessengerCluster } from "@/components/layout/MessengerCluster";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Բնակարանների և տների վերանորոգում Երևանում՝ ֆիքսված գնով, ժամանակին և երաշխիքով։ Ներկարարություն, սալիկապատում, էլեկտրական և սանտեխնիկական աշխատանքներ։",
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "hy_AM",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: "Վերանորոգում Երևանում՝ ֆիքսված գնով և երաշխիքով։",
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12566B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.tagline,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    areaServed: "Երևան, Հայաստան",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Երևան",
      addressCountry: "AM",
    },
  };
  return (
    <html lang="hy" className={cn(fontSans.variable, fontHeading.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
        <MessengerCluster />
      </body>
    </html>
  );
}
