import "./styles/globals.css";
import type { Metadata } from "next";
import { manrope } from "./styles/fonts";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s - Bookmark Manager",
    default: "Bookmark Manager",
  },
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${manrope.variable} antialiased`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
