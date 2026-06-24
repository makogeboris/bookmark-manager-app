import { BookmarkCard } from "./BookmarkCard";
import { Bookmark } from "@/lib/types";
import { Search } from "lucide-react";
import { Icons } from "../shared/Icons";
import Logo from "../shared/Logo";

const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: "bm-005",
    title: "Frontend Mentor",
    url: "https://www.frontendmentor.io",
    favicon: "/images/favicon-frontend-mentor.png",
    description:
      "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Community"],
    pinned: true,
    isArchived: false,
    visitCount: 47,
    createdAt: "2024-01-15T10:30:00Z",
    lastVisited: "2025-09-23T14:45:00Z",
  },
  {
    id: "bm-003",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    favicon: "/images/favicon-mdn.png",
    description:
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
    tags: ["Reference", "HTML", "CSS", "JavaScript"],
    pinned: true,
    isArchived: false,
    visitCount: 152,
    createdAt: "2024-01-10T08:15:00Z",
    lastVisited: "2025-09-24T09:20:00Z",
  },
  {
    id: "bm-017",
    title: "React Docs",
    url: "https://react.dev",
    favicon: "/images/favicon-react-docs.png",
    description:
      "The library for web and native user interfaces. Build user interfaces out of individual pieces called components.",
    tags: ["JavaScript", "Framework", "Reference"],
    pinned: false,
    isArchived: false,
    visitCount: 0,
    createdAt: "2024-02-20T14:30:00Z",
    lastVisited: null,
  },
  {
    id: "bm-014",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    favicon: "/images/favicon-tailwind.png",
    description:
      "A utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.",
    tags: ["CSS", "Framework", "Tools"],
    pinned: false,
    isArchived: false,
    visitCount: 52,
    createdAt: "2024-02-12T09:45:00Z",
    lastVisited: "2025-09-19T16:10:00Z",
  },
  {
    id: "bm-001",
    title: "GitHub",
    url: "https://github.com",
    favicon: "/images/favicon-github.png",
    description:
      "Where the world builds software. Millions of developers and companies build, ship, and maintain their software on GitHub.",
    tags: ["Tools", "Community", "Git"],
    pinned: false,
    isArchived: false,
    visitCount: 198,
    createdAt: "2024-01-05T06:00:00Z",
    lastVisited: "2025-09-24T15:30:00Z",
  },
  {
    id: "bm-011",
    title: "freeCodeCamp",
    url: "https://www.freecodecamp.org",
    favicon: "/images/favicon-freecodecamp.png",
    description:
      "Learn to code for free. Build projects. Earn certifications. An open source community that helps you learn to code with free online courses and certifications.",
    tags: ["Learning", "Practice", "Community"],
    pinned: false,
    isArchived: false,
    visitCount: 28,
    createdAt: "2024-02-05T10:20:00Z",
    lastVisited: "2025-08-30T13:40:00Z",
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
