import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubhankar & Shourya — Wedding Invitation",
  description: "To celebrate the wedding of Shubhankar & Shourya on Saturday, 21st November 2026 in Gurgaon. Save the Date!",
  openGraph: {
    title: "Shubhankar & Shourya — 3D Wedding Invitation",
    description: "To celebrate the wedding of Shubhankar & Shourya on Saturday, 21st November 2026 in Gurgaon.",
    url: "https://shubhankar-shourya-invite.vercel.app",
    siteName: "Shubhankar & Shourya Wedding",
    images: [
      {
        url: "https://shubhankar-shourya-invite.vercel.app/og-image-shesaidyes.jpg",
        width: 1200,
        height: 630,
        alt: "Shubhankar & Shourya — She Said Yes Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhankar & Shourya — 3D Wedding Invitation",
    description: "To celebrate the wedding of Shubhankar & Shourya on Saturday, 21st November 2026 in Gurgaon.",
    images: ["https://shubhankar-shourya-invite.vercel.app/og-image-shesaidyes.jpg"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable}`}>
      <body className="bg-ivory text-maroon font-serif antialiased selection:bg-gold selection:text-ivory">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
