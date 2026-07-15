import { Metadata } from "next";
import data from "@/lib/data/data.json";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { Bookmark } from "@/lib/types";
import { DashboardProvider } from "@/lib/dashboard-context";
import DemoBookmarkGrid from "@/components/dashboard/DemoBookmarkGrid";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DEMO_DELAY_MS = 8000;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function DemoPage() {
  await delay(DEMO_DELAY_MS);

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
      <DashboardShell bookmarks={bookmarks} isDemo>
        <DemoBookmarkGrid initialBookmarks={bookmarks} />
      </DashboardShell>
    </DashboardProvider>
  );
}
