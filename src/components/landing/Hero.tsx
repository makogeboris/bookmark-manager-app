"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function HeroSection() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<"signup" | "demo" | null>(
    null,
  );

  const [isPending, startTransition] = useTransition();

  function handleSignup() {
    setPendingRoute("signup");

    startTransition(() => {
      router.push("/signup");
    });
  }

  function handleDemo() {
    setPendingRoute("demo");

    startTransition(() => {
      router.push("/demo");
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden px-6 pt-40 pb-24"
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
            <Button
              size="xl"
              type="button"
              onClick={handleSignup}
              disabled={isPending}
            >
              <span className="flex items-center gap-2">
                {pendingRoute === "signup" && (
                  <Spinner data-icon="inline-start" />
                )}

                <span>
                  {pendingRoute === "signup" ? "Loading..." : "Start for free"}
                </span>
              </span>
            </Button>

            <Button
              size="xl"
              type="button"
              variant="outline"
              onClick={handleDemo}
              disabled={isPending}
            >
              <span className="flex items-center gap-2">
                {pendingRoute === "demo" && (
                  <Spinner data-icon="inline-start" />
                )}

                <span>
                  {pendingRoute === "demo" ? "Loading demo..." : "View demo"}
                </span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
