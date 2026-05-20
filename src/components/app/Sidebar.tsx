"use client";

import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Icons } from "./Icons";

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
      <div className="px-5 pt-5 pb-3 sm:px-5 relative">
        <Link href="/">
          <div className="h-8 w-auto dark:hidden">
            <Image
              src="/images/logo-light-theme.svg"
              alt="Bookmark Manager"
              width={160}
              height={32}
              className="h-full w-auto"
            />
          </div>
          <div className="h-8 w-auto hidden dark:block">
            <Image
              src="/images/logo-dark-theme.svg"
              alt="Bookmark Manager"
              width={160}
              height={32}
              className="h-full w-auto"
            />
          </div>
        </Link>

        <Button
          size="icon-xs"
          variant="ghost"
          onClick={close}
          aria-label="Close sidebar"
          className="md:hidden absolute flex items-center justify-center rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors duration-150 top-3 right-3"
        >
          {Icons.close}
        </Button>
      </div>

      {/* Nav items */}
      <nav className="px-4 space-y-px py-4">
        <Button
          variant="ghostSide"
          size="xl"
          onClick={() => {
            onNavChange?.("home");
            close();
          }}
          className={`group w-full flex items-center justify-start gap-2.5 px-3 py-2.75 rounded-sm text-base font-medium transition-colors duration-150
            ${
              activeNav === "home"
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            }
          `}
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
          className={`group w-full flex justify-start gap-2.5 px-3 py-2.75 rounded-lg text-base font-medium transition-colors duration-150
            ${
              activeNav === "archived"
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            }
          `}
        >
          {Icons.archive}
          <span>Archived</span>
        </Button>
      </nav>

      {/* Tags */}
      <div className="px-3 flex flex-col min-h-0 flex-1">
        <p className="px-3 pb-2.5 text-xs font-bold uppercase tracking-widest text-sidebar-foreground/80 select-none">
          Tags
        </p>

        <ul className="flex-1 overflow-y-auto space-y-px pr-0.5 pb-12 scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent">
          {tags.map((tag) => {
            const checked = selectedTags.includes(tag.name);
            return (
              <li key={tag.name} className="w-full">
                <label className="flex items-center gap-2 px-3 py-2 rounded-sm text-base font-semibold cursor-pointer text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors duration-150 group">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => onTagToggle?.(tag.name)}
                  />
                  <span className="flex-1">{tag.name}</span>
                  <span className="min-w-5 h-5 px-1.5 flex items-center border border-sidebar-border justify-center rounded-full text-xs font-medium bg-sidebar-accent text-sidebar-foreground/60">
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
      <aside className="hidden md:flex flex-col w-74 shrink-0 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border overflow-hidden">
        {content}
      </aside>

      {/* Mobile overlay backdrop */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-70 sm:w-75 bg-sidebar border-r border-sidebar-border overflow-hidden md:hidden transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Sidebar navigation"
      >
        {content}
      </aside>
    </>
  );
}
