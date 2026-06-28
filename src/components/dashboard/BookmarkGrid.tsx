"use client";

import { useMemo, useState } from "react";
import BookmarkCard from "@/components/dashboard/BookmarkCard";
import SortDropdown from "@/components/dashboard/SortDropdown";
import PaginationComponent from "./Pagination";
import { useDashboard } from "@/lib/dashboard-context";
import type { Bookmark } from "@/lib/types";
import { format, parseISO } from "date-fns";

const PER_PAGE = 9;

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  isDemo?: boolean;
}

function formatDate(dateStr: string | null): string | undefined {
  if (!dateStr) return undefined;
  try {
    return format(parseISO(dateStr), "d MMM");
  } catch {
    return undefined;
  }
}

export default function BookmarkGrid({
  bookmarks,
  isDemo = false,
}: BookmarkGridProps) {
  const { selectedTags, showArchived, search, sort, setSort } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);

  const filterKey = `${selectedTags.join(",")}-${showArchived}-${search}-${sort}`;

  const filtered = useMemo(() => {
    let result = bookmarks.filter((b) =>
      showArchived ? b.isArchived : !b.isArchived,
    );

    if (selectedTags.length > 0) {
      result = result.filter((b) =>
        selectedTags.every((t) => b.tags.includes(t)),
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q));
    }

    result = [...result].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      if (sort === "recently-added") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sort === "most-visited") {
        return b.visitCount - a.visitCount;
      }
      if (sort === "recently-visited") {
        const aTime = a.lastVisited ? new Date(a.lastVisited).getTime() : 0;
        const bTime = b.lastVisited ? new Date(b.lastVisited).getTime() : 0;
        return bTime - aTime;
      }
      return 0;
    });

    return result;
  }, [bookmarks, selectedTags, search, sort, showArchived]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-5 px-4 py-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h1 className="xs:text-2xl text-foreground text-xl font-bold">
          {showArchived ? "Archived bookmarks" : "All bookmarks"}
        </h1>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
          <p className="text-foreground text-xl font-medium">
            No bookmarks found
          </p>
          <p className="text-sm">
            {selectedTags.length > 0
              ? "Try clearing your tag filters."
              : showArchived
                ? "Nothing archived yet."
                : "Add your first bookmark to get started."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-8">
            {paginated.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                title={bookmark.title}
                url={bookmark.url}
                favicon={bookmark.favicon}
                description={bookmark.description}
                tags={bookmark.tags}
                visitCount={bookmark.visitCount}
                dateAdded={formatDate(bookmark.createdAt)}
                dateVisited={formatDate(bookmark.lastVisited)}
                pinned={bookmark.pinned}
                isArchived={bookmark.isArchived}
                isDemo={isDemo}
              />
            ))}
          </div>

          <PaginationComponent
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
