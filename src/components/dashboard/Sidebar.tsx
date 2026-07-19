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
  onClearTags?: () => void;
  tags?: Tag[];
  homeCount?: number;
  archivedCount?: number;
}

export default function Sidebar({
  open = false,
  onOpenChange,
  activeNav = "home",
  onNavChange,
  selectedTags = [],
  onTagToggle,
  onClearTags,
  tags,
  homeCount = 0,
  archivedCount = 0,
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
          }`}
        >
          {Icons.home}
          <div className="flex w-full items-center justify-between">
            <span>Home</span>
            {homeCount > 0 && (
              <span className="border-sidebar-border bg-sidebar-accent flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-xs font-medium">
                {homeCount}
              </span>
            )}
          </div>
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
          }`}
        >
          {Icons.archive}
          <div className="flex w-full items-center justify-between">
            <span>Archived</span>
            {archivedCount > 0 && (
              <span className="border-sidebar-border bg-sidebar-accent flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-xs font-medium">
                {archivedCount}
              </span>
            )}
          </div>
        </Button>
      </nav>

      {/* Tags */}
      <div className="flex min-h-0 flex-1 flex-col px-3">
        <div className="flex min-h-8.5 items-center justify-between pr-2 pb-2.5 pl-3">
          <p className="text-sidebar-foreground/80 text-xs font-bold tracking-widest uppercase select-none">
            Tags
          </p>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              onClick={onClearTags}
              className="text-muted-foreground/90 h-auto p-0 text-xs font-medium underline underline-offset-2 hover:bg-transparent"
            >
              Reset
            </Button>
          )}
        </div>

        <ul className="scrollbar-thumb-sidebar-border flex-1 scrollbar-thin scrollbar-track-transparent space-y-px overflow-y-auto pr-0.5 pb-12">
          {!tags || tags.length === 0 ? (
            <li className="text-muted-foreground px-3 py-4 text-sm">
              No tags yet. Add tags to your bookmarks to see them here.
            </li>
          ) : (
            tags.map((tag) => {
              const checked = selectedTags.includes(tag.name);
              const checkboxId = `tag-${tag.name}`;

              return (
                <li key={tag.name} className="w-full">
                  <div className="text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground flex items-center gap-2 rounded-sm px-3 py-2 transition-colors">
                    <Checkbox
                      id={checkboxId}
                      checked={checked}
                      onCheckedChange={() => onTagToggle?.(tag.name)}
                    />

                    <label
                      htmlFor={checkboxId}
                      className="flex flex-1 cursor-pointer items-center justify-between text-base font-semibold"
                    >
                      <span>{tag.name}</span>

                      <span className="border-sidebar-border bg-sidebar-accent text-sidebar-foreground/60 flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-xs font-medium">
                        {tag.count}
                      </span>
                    </label>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <aside className="bg-sidebar border-sidebar-border sticky top-0 hidden h-screen w-74 shrink-0 flex-col overflow-hidden border-r lg:flex">
        {content}
      </aside>

      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-50 flex w-70 flex-col overflow-hidden border-r transition-transform duration-300 ease-in-out sm:w-75 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar navigation"
      >
        {content}
      </aside>
    </>
  );
}
