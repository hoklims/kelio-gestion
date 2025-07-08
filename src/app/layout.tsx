import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ToastProvider } from "@/components/toast-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kelio Gestion - Gestion des clients et missions",
  description: "Application de gestion des clients, missions et finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
