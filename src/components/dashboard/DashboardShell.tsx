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

  const tagCounts = bookmarks
    .filter((b) => !b.isArchived)
    .flatMap((b) => b.tags)
    .reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {});

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
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
