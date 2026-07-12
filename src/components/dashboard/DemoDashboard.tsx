"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BookmarkGrid from "@/components/dashboard/BookmarkGrid";
import type { Bookmark } from "@/lib/types";

interface DemoDashboardProps {
  initialBookmarks: Bookmark[];
}

export default function DemoDashboard({
  initialBookmarks,
}: DemoDashboardProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  // Local mutation handlers
  function handlePin(bookmarkId: string) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === bookmarkId ? { ...b, pinned: !b.pinned } : b)),
    );
  }

  function handleArchive(bookmarkId: string) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === bookmarkId ? { ...b, isArchived: true } : b)),
    );
  }

  function handleUnarchive(bookmarkId: string) {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === bookmarkId ? { ...b, isArchived: false } : b)),
    );
  }

  return (
    // <DashboardShell bookmarks={bookmarks} isDemo>
    <BookmarkGrid
      bookmarks={bookmarks}
      isDemo
      onPin={handlePin}
      onArchive={handleArchive}
      onUnarchive={handleUnarchive}
    />
    // </DashboardShell>
  );
}
