"use client";

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import type { Bookmark } from "@/lib/types";
import { useDashboard } from "@/lib/dashboard-context";

interface DashboardShellProps {
  children: React.ReactNode;
  bookmarks?: Bookmark[];
  isDemo?: boolean;
}

export default function DashboardShell({
  children,
  bookmarks = [],
  isDemo = false,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedTags, toggleTag, clearTags, showArchived, setShowArchived } =
    useDashboard();

  const tagCounts: Record<string, number> = {};
  let homeCount = 0;
  let archivedCount = 0;

  bookmarks.forEach((bookmark) => {
    if (bookmark.isArchived) {
      archivedCount++;
      return;
    }
    homeCount++;
    bookmark.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    });
  });

  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        activeNav={showArchived ? "archived" : "home"}
        onNavChange={(nav) => {
          setShowArchived(nav === "archived");
          setSidebarOpen(false);
        }}
        selectedTags={selectedTags}
        onTagToggle={toggleTag}
        onClearTags={clearTags}
        tags={tags}
        homeCount={homeCount}
        archivedCount={archivedCount}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} isDemo={isDemo} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
