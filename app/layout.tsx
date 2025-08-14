import type React from "react";
import type { Metadata } from "next";
import { JotaiProvider } from "../lib/jotai-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fernet Barato",
  description: "Encuentra los mejores precios de Fernet en Argentina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
