import data from "@/lib/data/data.json";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { Bookmark } from "@/lib/types";
import { DashboardProvider } from "@/lib/dashboard-context";
import BookmarkGrid from "@/components/dashboard/BookmarkGrid";

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

export default function DemoPage() {
  return (
    <DashboardProvider>
      <DashboardShell bookmarks={bookmarks} isDemo>
        <BookmarkGrid bookmarks={bookmarks} isDemo />
      </DashboardShell>
    </DashboardProvider>
  );
}
