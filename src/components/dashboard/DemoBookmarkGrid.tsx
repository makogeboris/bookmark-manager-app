"use client";

import { useState } from "react";
import BookmarkGrid from "./BookmarkGrid";
import type { Bookmark } from "@/lib/types";

interface Props {
  initialBookmarks: Bookmark[];
}

export default function DemoBookmarkGrid({ initialBookmarks }: Props) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

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
    <BookmarkGrid
      bookmarks={bookmarks}
      isDemo
      onPin={handlePin}
      onArchive={handleArchive}
      onUnarchive={handleUnarchive}
    />
  );
}
