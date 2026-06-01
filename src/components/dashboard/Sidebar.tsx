"use client";

import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Icons } from "../shared/Icons";
import Logo from "../shared/Logo";

interface Tag {
  name: string;
  count: number;
}

interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeNav?: "home" | "archived";
  onNavChange?: (nav: "home" | "archived") => void;
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
  tags?: Tag[];
}

const DEFAULT_TAGS: Tag[] = [
  { name: "Ai", count: 1 },
  { name: "Community", count: 5 },
  { name: "Compatibility", count: 1 },
  { name: "CSS", count: 6 },
  { name: "Design", count: 1 },
  { name: "Framework", count: 2 },
  { name: "Git", count: 1 },
  { name: "HTML", count: 2 },
  { name: "JavaScript", count: 3 },
  { name: "Layout", count: 3 },
  { name: "Learning", count: 6 },
  { name: "Performance", count: 2 },
  { name: "Practice", count: 5 },
  { name: "Reference", count: 4 },
  { name: "Tips", count: 4 },
  { name: "Tools", count: 4 },
  { name: "Tutorial", count: 3 },
];

export default function Sidebar({
  open = false,
  onOpenChange,
  activeNav = "home",
  onNavChange,
  selectedTags = [],
  onTagToggle,
  tags = DEFAULT_TAGS,
}: SidebarProps) {
  const close = () => onOpenChange?.(false);

  const content = (
    <>
      <div className="relative px-5 pt-5 pb-3 sm:px-5">
        <Link href="/">
          <Logo />
        </Link>

        <Button
          size="icon-xs"
          variant="ghost"
          onClick={close}
          aria-label="Close sidebar"
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground absolute top-3 right-3 flex items-center justify-center rounded-md transition-colors duration-150 lg:hidden"
        >
          {Icons.close}
        </Button>
      </div>

      {/* Nav items */}
      <nav className="space-y-px px-4 py-4">
        <Button
          variant="ghostSide"
          size="xl"
          onClick={() => {
            onNavChange?.("home");
            close();
          }}
          className={`group flex w-full items-center justify-start gap-2.5 rounded-sm px-3 py-2.75 text-base font-medium transition-colors duration-150 ${
            activeNav === "home"
              ? "bg-sidebar-accent text-sidebar-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          } `}
        >
          {Icons.home}
          <span>Home</span>
        </Button>

        <Button
          variant="ghostSide"
          size="xl"
          onClick={() => {
            onNavChange?.("archived");
            close();
          }}
          className={`group flex w-full justify-start gap-2.5 rounded-lg px-3 py-2.75 text-base font-medium transition-colors duration-150 ${
            activeNav === "archived"
              ? "bg-sidebar-accent text-sidebar-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          } `}
        >
          {Icons.archive}
          <span>Archived</span>
        </Button>
      </nav>

      {/* Tags */}
      <div className="flex min-h-0 flex-1 flex-col px-3">
        <div className="flex items-center justify-between pr-2 pb-2.5 pl-3">
          <p className="text-sidebar-foreground/80 text-xs font-bold tracking-widest uppercase select-none">
            Tags
          </p>

          <Button
            variant="ghost"
            className="text-muted-foreground/90 text-xs font-medium underline underline-offset-2 hover:bg-transparent"
          >
            Reset
          </Button>
        </div>

        <ul className="scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent flex-1 space-y-px overflow-y-auto pr-0.5 pb-12">
          {tags.map((tag) => {
            const checked = selectedTags.includes(tag.name);
            return (
              <li key={tag.name} className="w-full">
                <label className="text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground group flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-base font-semibold transition-colors duration-150">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => onTagToggle?.(tag.name)}
                  />
                  <span className="flex-1">{tag.name}</span>
                  <span className="border-sidebar-border bg-sidebar-accent text-sidebar-foreground/60 flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-xs font-medium">
                    {tag.count}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <aside className="bg-sidebar border-sidebar-border sticky top-0 hidden h-screen w-74 shrink-0 flex-col overflow-hidden border-r lg:flex">
        {content}
      </aside>

      {/* Mobile overlay backdrop */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-50 flex w-70 flex-col overflow-hidden border-r transition-transform duration-300 ease-in-out sm:w-75 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"} `}
        aria-label="Sidebar navigation"
      >
        {content}
      </aside>
    </>
  );
}
