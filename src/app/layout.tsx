import type { Metadata } from "next";
import { Archivo_Narrow, Inter_Tight } from "next/font/google";
import { Navbar } from "@/components/ui/kalslo/Navbar";
import "./globals.css";

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo-narrow",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Kalslo — The live state of global commerce",
  description: "Track what is moving, what is blocked and what settles next.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivoNarrow.variable} ${interTight.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}