"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative px-6 py-24" style={{ zIndex: 1 }}>
      <div className="mx-auto max-w-3xl text-center">
        <div className="border-primary bg-card relative overflow-hidden rounded-2xl border p-12 shadow-[0_20px_60px_color-mix(in_srgb,var(--primary)_15%,transparent)]">
          {/* Decorative orbs */}
          <div
            className="pointer-events-none absolute -top-15 -right-15 h-60 w-60 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--primary) 20%, transparent) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-15 -left-15 h-50 w-50 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--primary) 15%, transparent) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <Image
              width={48}
              height={48}
              src="/images/icon-site.svg"
              alt=""
              className="mx-auto mb-5"
            />

            <h2
              className="text-foreground mb-4 font-extrabold tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Start saving smarter today
            </h2>

            <p className="text-muted-foreground mx-auto mb-8 max-w-lg">
              Free forever for personal use. No credit card required. Join
              thousands of developers who never lose a link.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="text-primary-foreground hover:bg-primary/80 flex items-center justify-center rounded-md bg-teal-700 px-5 py-2.5 text-center text-sm font-semibold transition-all duration-200"
              >
                Create free account
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-accent bg-transparent font-semibold transition-all duration-200"
              >
                Install extension
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
