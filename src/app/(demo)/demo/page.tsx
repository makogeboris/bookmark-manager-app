import { Metadata } from "next";
import data from "@/lib/data/data.json";
import type { Bookmark } from "@/lib/types";

import { DashboardProvider } from "@/lib/dashboard-context";
import DemoDashboard from "@/components/dashboard/DemoDashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DemoPage() {
  const bookmarks: Bookmark[] = data.bookmarks.map((b) => ({
    id: b.id,
    title: b.title,
    url: b.url,
    favicon: b.favicon,
    description: b.description,
    tags: b.tags,
    pinned: b.pinned,
    isArchived: b.isArchived,
    visitCount: b.visitCount,
    createdAt: b.createdAt,
    lastVisited: b.lastVisited ?? null,
  }));

  return (
    <DashboardProvider>
      <DemoDashboard initialBookmarks={bookmarks} />
    </DashboardProvider>
  );
}
