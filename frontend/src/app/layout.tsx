import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { satoshi, romagothicbold } from "../lib/fonts";

const geist = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Cavos AEGIS",
  description: "Invisible Crypto Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} ${romagothicbold.variable} bg-[#000000] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
