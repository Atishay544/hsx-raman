import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "HighStreetExpress", template: "%s | HighStreetExpress" },
  description: "Shop quality products at HighStreetExpress. Free shipping on orders above £50.",
  keywords: ["ecommerce", "shop", "online store", "buy online", "UK shopping"],
  authors: [{ name: "HighStreetExpress" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "HighStreetExpress",
    title: "HighStreetExpress",
    description: "Shop quality products at HighStreetExpress. Free shipping on orders above £50.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HighStreetExpress",
    description: "Shop quality products at HighStreetExpress. Free shipping on orders above £50.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
