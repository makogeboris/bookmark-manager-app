"use client";

import { useState } from "react";

import DashboardShell from "./DashboardShell";
import BookmarkGrid from "./BookmarkGrid";

import type { Bookmark } from "@/lib/types";

interface Props {
  initialBookmarks: Bookmark[];
}

export default function DemoDashboard({ initialBookmarks }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  function handlePin(bookmarkId: string) {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === bookmarkId
          ? {
              ...bookmark,
              pinned: !bookmark.pinned,
            }
          : bookmark,
      ),
    );
  }

  function handleArchive(bookmarkId: string) {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === bookmarkId
          ? {
              ...bookmark,
              isArchived: true,
            }
          : bookmark,
      ),
    );
  }

  function handleUnarchive(bookmarkId: string) {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === bookmarkId
          ? {
              ...bookmark,
              isArchived: false,
            }
          : bookmark,
      ),
    );
  }

  return (
    <DashboardShell bookmarks={bookmarks} isDemo>
      <BookmarkGrid
        bookmarks={bookmarks}
        isDemo
        onPin={handlePin}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
      />
    </DashboardShell>
  );
}
