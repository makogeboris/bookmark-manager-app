"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextValue {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  showArchived: boolean;
  setShowArchived: (v: boolean) => void;
  search: string;
  setSearch: (v: string) => void;
  sort: "recently-added" | "recently-visited" | "most-visited";
  setSort: (v: "recently-added" | "recently-visited" | "most-visited") => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<
    "recently-added" | "recently-visited" | "most-visited"
  >("recently-added");

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  const clearTags = () => setSelectedTags([]);

  return (
    <DashboardContext.Provider
      value={{
        selectedTags,
        toggleTag,
        clearTags,
        showArchived,
        setShowArchived,
        search,
        setSearch,
        sort,
        setSort,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}
