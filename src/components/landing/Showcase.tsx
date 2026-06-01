import { BookmarkCard } from "./BookmarkCard";
import { Bookmark } from "@/lib/types";
import { Search } from "lucide-react";
import { Icons } from "../shared/Icons";
import Logo from "../shared/Logo";

const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: 1,
    title: "Frontend Mentor",
    url: "frontendmentor.io",
    tags: ["Practice", "Learning"],
    views: 47,
    favicon: "/images/favicon-frontend-mentor.png",
  },
  {
    id: 2,
    title: "MDN Web Docs",
    url: "developer.mozilla.org",
    tags: ["Reference", "HTML", "CSS"],
    views: 152,
    favicon: "/images/favicon-mdn.png",
  },
  {
    id: 3,
    title: "React Docs",
    url: "react.dev",
    tags: ["JavaScript", "Framework"],
    views: 0,
    favicon: "/images/favicon-react-docs.png",
  },
  {
    id: 4,
    title: "Tailwind CSS",
    url: "tailwindcss.com",
    tags: ["CSS", "Framework"],
    views: 52,
    favicon: "/images/favicon-tailwind.png",
  },
  {
    id: 5,
    title: "GitHub",
    url: "github.com",
    tags: ["Git", "Tools"],
    views: 210,
    favicon: "/images/favicon-github.png",
  },
  {
    id: 6,
    title: "freeCodeCamp",
    url: "freecodecamp.org",
    tags: ["Learning", "Tutorial"],
    views: 88,
    favicon: "/images/favicon-freecodecamp.png",
  },
];

const SIDEBAR_TAGS: { label: string; count: number }[] = [
  { label: "CSS", count: 6 },
  { label: "JavaScript", count: 3 },
  { label: "Learning", count: 6 },
  { label: "Tools", count: 4 },
  { label: "Reference", count: 4 },
];

export function ShowcaseSection() {
  return (
    <section
      id="showcase"
      className="relative px-6 pb-24"
      style={{ zIndex: 1 }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Browser frame — no hover animation */}
        <div className="border-border bg-card rounded-2xl border p-1 shadow-[0_40px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_0_80px_color-mix(in_srgb,var(--primary)_12%,transparent),0_40px_80px_rgba(0,0,0,0.4)]">
          {/* Window chrome */}
          <div className="border-border flex items-center gap-2 rounded-t-xl border-b px-4 py-3">
            <span className="bg-destructive h-3 w-3 rounded-full" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <div className="mx-4 flex-1">
              <div className="bg-accent text-muted-foreground mx-auto flex h-5 max-w-xs items-center justify-center rounded-md text-xs">
                bookmark.app/dashboard
              </div>
            </div>
          </div>

          {/* App layout */}
          <div className="flex min-h-100 overflow-hidden rounded-b-xl" inert>
            {/* Sidebar */}
            <div className="border-border bg-card hidden w-52 shrink-0 border-r p-4 md:block">
              <div className="mb-6 flex items-center gap-2">
                <Logo />
              </div>

              {[
                { label: "Home", icon: Icons.home, active: true },
                { label: "Archived", icon: Icons.archive, active: false },
              ].map(({ label, icon, active }) => (
                <div
                  key={label}
                  className={[
                    "mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                    active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {icon}
                  {label}
                </div>
              ))}

              <div className="mt-4">
                <p className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-widest uppercase">
                  Tags
                </p>
                {SIDEBAR_TAGS.map(({ label, count }) => (
                  <div
                    key={label}
                    className="text-muted-foreground flex items-center justify-between px-3 py-1.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="border-border h-3 w-3 shrink-0 rounded border" />
                      {label}
                    </div>
                    <span className="opacity-60">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-foreground text-base font-bold">
                  All bookmarks
                </h2>
                <div className="border-border bg-accent text-muted-foreground flex h-8 items-center gap-2 rounded-lg border px-3 text-xs">
                  <Search className="size-3" />
                  <span>Search by title...</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_BOOKMARKS.map((bm, i) => (
                  <BookmarkCard key={bm.id} bookmark={bm} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
