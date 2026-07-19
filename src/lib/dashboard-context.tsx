"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";

const SORT_OPTIONS = [
  "recently-added",
  "recently-visited",
  "most-visited",
] as const;

type Sort = (typeof SORT_OPTIONS)[number];

const VIEW_OPTIONS = ["home", "archived"] as const;

interface DashboardContextValue {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;

  showArchived: boolean;
  setShowArchived: (value: boolean) => void;

  search: string;
  setSearch: (value: string) => void;

  sort: Sort;
  setSort: (value: Sort) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedTags, setSelectedTags] = useQueryState(
    "tag",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(SORT_OPTIONS).withDefault("recently-added"),
  );

  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral(VIEW_OPTIONS).withDefault("home"),
  );

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  function setShowArchived(value: boolean) {
    setView(value ? "archived" : "home");
  }

  return (
    <DashboardContext.Provider
      value={{
        selectedTags,
        toggleTag,
        clearTags,
        showArchived: view === "archived",
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

  if (!ctx) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return ctx;
}
