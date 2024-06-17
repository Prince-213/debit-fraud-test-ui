"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TanStackProvider from "@/provider/TanStackProvider";
import { ShoppingBasket } from "lucide-react";
import { AvatarDemo } from "@/components/custom/avatar";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/custom/header";

const space = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <html lang="en">
      <body className={space.className}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
