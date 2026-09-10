import type { Metadata } from "next";
import { Archivo_Narrow, Inter_Tight } from "next/font/google";
import { Navbar } from "@/components/ui/kalslo/Navbar";
import { OnboardingModal } from "@/components/ui/kalslo/OnboardingModal";
import { Toaster } from "@/components/ui/toast";
import { QueryProvider } from "@/components/QueryProvider";
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

// Anti-flash : applique le thème stocké AVANT le premier rendu React.
// Dark par défaut si rien n'est stocké (premier passage, ou localStorage indisponible).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("kalslo-theme-storage");
    var theme = "dark";
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed && parsed.state && parsed.state.theme) {
        theme = parsed.state.theme;
      }
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Asap+Sharp:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${archivoNarrow.variable} ${interTight.variable} antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <Navbar />
          {children}
          <OnboardingModal />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}