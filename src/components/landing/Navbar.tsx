"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import Logo from "@/components/shared/Logo";

const NAV_LINKS = ["Features", "Showcase", "Testimonials"] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 border-border border-b backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Main bar */}
      <nav className="mx-auto flex items-center justify-between px-6 py-4 lg:px-16">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="border-input text-foreground hover:bg-input/10 inline-flex items-center justify-center rounded-md border px-5 py-2.25 text-center text-sm font-semibold transition-all duration-200"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={clsx(
                "bg-foreground block h-0.5 w-6 transition-all duration-300",
                menuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={clsx(
                "bg-foreground block h-0.5 w-6 transition-all duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={clsx(
                "bg-foreground block h-0.5 w-6 transition-all duration-300",
                menuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          "overflow-hidden border-b transition-all duration-300 md:hidden",
          "bg-background/95 backdrop-blur-md",
          menuOpen
            ? "border-border max-h-72 opacity-100"
            : "max-h-0 border-transparent opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2.5 text-center text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}

          <div className="border-border mt-3 flex flex-col gap-2 border-t pt-4">
            <Link
              href="/login"
              className="text-foreground hover:bg-accent rounded-md border px-3 py-2.5 text-center text-sm font-semibold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground rounded-md px-3 py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
              onClick={() => setMenuOpen(false)}
            >
              Get started free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
