"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Icons } from "../shared/Icons";
import { Feature } from "@/lib/types";

const FEATURES: Feature[] = [
  {
    icon: Icons.search,
    title: "Instant Search",
    desc: "Find any bookmark by title in milliseconds. No more digging through browser history.",
  },
  {
    icon: Icons.tag,
    title: "Smart Tagging",
    desc: "Organize with custom tags and filter across multiple categories at once.",
  },
  {
    icon: Icons.zap,
    title: "Auto Metadata",
    desc: "Paste a URL and we fetch the favicon, title, and description automatically.",
  },
  {
    icon: Icons.archive,
    title: "Archive & Unarchive",
    desc: "Clean up your workspace without losing anything. Archive bookmarks with one click.",
  },
  {
    icon: Icons.pinIcon,
    title: "Pin Essentials",
    desc: "Keep your most-used bookmarks front and center, always within reach.",
  },
  {
    icon: Icons.globe,
    title: "Browser Extension",
    desc: "Save any page instantly with our extension without ever leaving your current tab.",
  },
  {
    icon: Icons.copyIcon,
    title: "Quick Copy",
    desc: "Copy any bookmark URL to clipboard in a single click. Paste it anywhere.",
  },
  {
    icon: Icons.puzzle,
    title: "Duplicate Detection",
    desc: "Smart deduplication prevents saving the same URL twice. Stay clean by default.",
  },
];

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  index: number;
}

function FeatureCard({ icon, title, desc, index }: FeatureCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border-border bg-card group card-shadow cursor-default rounded-xl border p-5 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 60}ms`,
      }}
    >
      <div className="bg-accent text-primary mb-3 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-foreground mb-1.5 text-sm font-bold">{title}</h3>
      <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative px-6 py-24"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
            Everything you need
          </p>
          <h2
            className="text-foreground font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Built for how you actually work
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Every feature was designed to reduce friction and keep your saved
            links useful — not just saved.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
