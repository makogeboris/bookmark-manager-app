"use client";

import { Step } from "@/lib/types";
import { useState, useEffect, useRef } from "react";

const STEPS: Step[] = [
  {
    step: "01",
    title: "Paste your URL",
    desc: "Drop in any link. We automatically fetch the favicon, title, and description for you.",
  },
  {
    step: "02",
    title: "Add tags",
    desc: "Label it with one or more tags. Filter and find it exactly when you need it later.",
  },
  {
    step: "03",
    title: "Access anywhere",
    desc: "From the web app or browser extension — your bookmarks are always a keystroke away.",
  },
];

interface StepCardProps extends Step {
  index: number;
}

function StepCard({ step, title, desc, index }: StepCardProps) {
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
      className="border-border bg-card rounded-xl border p-6 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="text-primary mb-4 text-4xl leading-none font-black opacity-60">
        {step}
      </div>
      <h3 className="text-foreground mb-2 text-lg font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="relative px-6 py-24" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
            Simple by design
          </p>
          <h2
            className="text-foreground font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Up and running in 60 seconds
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            No complicated setup. No lengthy onboarding. Just start saving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <StepCard key={s.step} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
