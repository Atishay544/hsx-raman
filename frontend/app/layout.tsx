import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-PNV9D2JEP4'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.layerfactory.in'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HighStreetExpress — 10-Minute Food Delivery UK",
    template: "%s | HighStreetExpress",
  },
  icons: {
    icon: [
      { url: '/hsx.jpeg', type: 'image/jpeg' },
    ],
    apple: '/hsx.jpeg',
    shortcut: '/hsx.jpeg',
  },
  description: "UK's fastest food delivery. Order fresh food, meals & groceries and get them delivered to your door in 10 minutes. HighStreetExpress — taste the speed.",
  keywords: [
    "10 minute food delivery UK", "fast food delivery", "quick food delivery UK",
    "HighStreetExpress", "HSX", "express food delivery", "instant food delivery",
    "food delivery UK", "10 min delivery", "quick commerce UK",
    "ultra-fast food delivery", "meal delivery UK", "grocery delivery UK",
    "same day food delivery", "rapid food delivery UK",
  ],
  authors: [{ name: "HighStreetExpress", url: BASE_URL }],
  creator: "HighStreetExpress",
  publisher: "HighStreetExpress",
  category: "ecommerce",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "HighStreetExpress",
    title: "HighStreetExpress — 10-Minute Food Delivery UK",
    description: "Order fresh food, meals & groceries and get them delivered to your door in 10 minutes. Free delivery above £20.",
    images: [
      {
        url: `/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HighStreetExpress — 10-Minute Food Delivery UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HighStreetExpress — 10-Minute Food Delivery UK",
    description: "Order fresh food, meals & groceries and get them delivered to your door in 10 minutes.",
    images: [`/opengraph-image`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here once you have it
    // google: 'your-verification-token',
  },
};

// Organization + WebSite + OnlineStore JSON-LD
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "OnlineStore"],
      "@id": `${BASE_URL}/#organization`,
      name: "HighStreetExpress",
      alternateName: ["HSX", "highstreetexpresss.vercel.app"],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE_URL}/#logo`,
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        caption: "HighStreetExpress",
      },
      image: { "@id": `${BASE_URL}/#logo` },
      description: "UK's fastest food delivery. Order fresh food, meals & groceries in seconds, delivered to your door in 10 minutes. Free delivery above £20.",
      founder: { "@type": "Person", name: "Vivek Saxena" },
      foundingDate: "2024",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "riders@highstreetexpress.com",
          contactType: "customer support",
          availableLanguage: ["English"],
          areaServed: "GB",
        },
        {
          "@type": "ContactPoint",
          email: "orders@aitalk247.com",
          contactType: "sales",
          availableLanguage: ["English", "Hindi"],
          areaServed: "IN",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Marble Temples & Spiritual Decor",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Marble Temples & Mandirs", url: `${BASE_URL}/products` },
          { "@type": "OfferCatalog", name: "Divine Sculptures", url: `${BASE_URL}/products` },
          { "@type": "OfferCatalog", name: "Spiritual Home Decor", url: `${BASE_URL}/products` },
          { "@type": "OfferCatalog", name: "Pooja Accessories", url: `${BASE_URL}/products` },
        ],
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "HighStreetExpress",
      description: "UK's fastest food delivery. Order fresh food, meals & groceries in seconds, delivered to your door in 10 minutes.",
      inLanguage: "en-GB",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: true });
      `}} />
    </html>
  );
}
