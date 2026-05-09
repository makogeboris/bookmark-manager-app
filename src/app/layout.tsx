import type { Metadata } from "next";
import "./styles/globals.css";
import { manrope } from "./styles/fonts";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description:
    "Save, organize, and access your favorite bookmarks from anywhere.",
  appleWebApp: {
    title: "Bookmark Manager",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", manrope.variable, "font-sans", inter.variable)}>
      <body>{children}</body>
    </html>
  );
}
