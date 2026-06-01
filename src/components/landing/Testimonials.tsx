"use client";

import { useState, useEffect, useRef } from "react";
import { Testimonial } from "@/lib/types";
import { Icons } from "../shared/Icons";
import Image from "next/image";

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah K.",
    avatar: "/images/yuna-kim.jpg",
    role: "Frontend Developer",
    stars: 5,
    body: "I've tried every bookmark manager out there. This is the first one I've actually stuck with. The auto-metadata fetch alone saves me 10 minutes a day.",
  },
  {
    name: "Marcus T.",
    avatar: "/images/liam-hughes.jpg",
    role: "UX Designer",
    stars: 5,
    body: "The tagging system is exactly what I needed. I can filter by multiple tags simultaneously and the UI is just gorgeous in dark mode.",
  },
  {
    name: "Priya M.",
    avatar: "/images/harper-edwards.jpg",
    role: "Full-Stack Engineer",
    stars: 5,
    body: "The browser extension is seamless. I save pages mid-research without breaking my flow. Duplicate detection is a lifesaver. Absolutely love it.",
  },
];

interface TestimonialCardProps extends Testimonial {
  index: number;
}

function TestimonialCard({
  name,
  avatar,
  role,
  body,
  stars,
  index,
}: TestimonialCardProps) {
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
      className="border-border bg-card card-shadow rounded-xl border p-6 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-4 flex gap-0.5 text-yellow-400">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i}>{Icons.star}</span>
        ))}
      </div>
      <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
        &quot;{body}&quot;
      </p>
      <div className="flex items-center gap-3">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt=""
          className="size-8 rounded-full"
        />
        <div>
          <p className="text-foreground text-sm leading-tight font-semibold">
            {name}
          </p>
          <p className="text-muted-foreground text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative px-6 py-24"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
            Loved by developers
          </p>
          <h2
            className="text-foreground font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            What people are saying
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Trusted by developers, designers, and researchers who live in their
            browser.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
