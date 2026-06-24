"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden px-6 pt-32 pb-24"
      style={{ zIndex: 1 }}
    >
      <div
        className="pointer-events-none absolute top-[10%] left-1/2 h-150 w-150 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 15%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div
          className="transition-all duration-1000"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="border-border bg-accent text-ring mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold">
            <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
            Now with browser extension support
          </div>

          <h1
            className="text-foreground mb-6 font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Your bookmarks,{" "}
            <span className="text-primary">finally organized.</span>
          </h1>

          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed">
            Stop losing links in a sea of unorganized bookmarks. Bookmark
            manager gives you instant search, smart tagging, and automatic
            metadata — so every saved page is findable in seconds.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center rounded-md px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200"
            >
              Start for free
              <ChevronRight />
            </Link>
            <Link
              href="/demo"
              className="border-input text-foreground hover:bg-input/10 inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200"
            >
              View demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
