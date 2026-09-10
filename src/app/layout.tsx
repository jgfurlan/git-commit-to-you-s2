import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#08070A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "O Grimório Eterno • A Guardiã do Nosso Amor",
  description: "Um santuário sagrado forjado por uma devoção que desafia o tempo.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "O Grimório",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full bg-[#08070A]">
      <body className="min-h-full flex flex-col bg-[#08070A] text-[#FAF6EE]">
        {children}
      </body>
    </html>
  );
}
