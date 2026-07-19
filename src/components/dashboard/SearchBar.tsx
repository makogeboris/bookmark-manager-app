"use client";

import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useDashboard } from "@/lib/dashboard-context";
import { useRef, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function SearchBar() {
  const { search, setSearch } = useDashboard();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;

    startTransition(() => {
      setSearch(next);
    });
  }

  function handleClear() {
    setSearch("");
    inputRef.current?.focus();
  }

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
            {isPending ? (
              <Spinner className="text-muted-foreground pointer-events-none size-4" />
            ) : search ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            ) : null}
          </span>
        </div>
      </Field>
    </form>
  );
}
