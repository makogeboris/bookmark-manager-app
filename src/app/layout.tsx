import "./styles/globals.css";
import { manrope } from "./styles/fonts";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/app/ThemeProvider";

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
    <html
      lang="en"
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
