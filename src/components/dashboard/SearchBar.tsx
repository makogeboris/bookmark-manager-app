"use client";

import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useDashboard } from "@/lib/dashboard-context";
import { useRef, useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { AnimatePresence, motion } from "motion/react";

export default function SearchBar() {
  const { search, setSearch } = useDashboard();
  const [showSpinner, setShowSpinner] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const spinnerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;

    setSearch(next);

    // Show spinner after a small delay if there's text
    if (spinnerTimeoutRef.current) {
      clearTimeout(spinnerTimeoutRef.current);
    }

    if (next.trim()) {
      spinnerTimeoutRef.current = setTimeout(() => {
        setShowSpinner(true);
      }, 200);
    } else {
      setShowSpinner(false);
    }
  }

  function handleClear() {
    setSearch("");
    setShowSpinner(false);
    if (spinnerTimeoutRef.current) {
      clearTimeout(spinnerTimeoutRef.current);
    }
    inputRef.current?.focus();
  }

  // Hide spinner after search completes (when results are shown)
  useEffect(() => {
    // If there's text and we're showing the spinner, hide it after a short delay
    if (showSpinner && search.trim()) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [search, showSpinner]);

  useEffect(() => {
    return () => {
      if (spinnerTimeoutRef.current) {
        clearTimeout(spinnerTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form
      className="w-full max-w-65 md:max-w-[320px]"
      onSubmit={(e) => e.preventDefault()}
    >
      <Field>
        <Label className="sr-only" htmlFor="search">
          Search by title
        </Label>
        <div className="relative w-full">
          <Input
            ref={inputRef}
            id="search"
            className="border-accent pr-8 pl-10"
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={handleChange}
          />

          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
            size={16}
          />

          <span className="absolute top-1/2 right-3 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {showSpinner && search.trim() && (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <Spinner className="text-muted-foreground pointer-events-none size-4" />
                </motion.div>
              )}
              {!showSpinner && search && (
                <motion.button
                  key="clear"
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </span>
        </div>
      </Field>
    </form>
  );
}
