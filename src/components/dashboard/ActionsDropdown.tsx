"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "../shared/Icons";
import EditBookmark from "./EditBookmark";
import {
  pinBookmarkAction,
  visitBookmarkAction,
} from "@/lib/actions/bookmarks";
import type { Bookmark } from "@/lib/types";
import { UnarchiveBookmark } from "./UnarchiveBookmark";
import { DeleteBookmark } from "./DeleteBookmark";
import { ArchiveBookmark } from "./ArchiveBookmark";
import { toast } from "sonner";

interface ActionsDropdownProps {
  bookmark: Bookmark;
  isDemo?: boolean;
  onPin?: (bookmarkId: string) => void;
  onArchive?: (bookmarkId: string) => void;
  onUnarchive?: (bookmarkId: string) => void;
}

export default function ActionsDropdown({
  bookmark,
  isDemo = false,
  onPin,
  onArchive,
  onUnarchive,
}: ActionsDropdownProps) {
  const router = useRouter();
  const [pinLoading, setPinLoading] = useState(false);

  async function handleVisit() {
    if (!isDemo) {
      await visitBookmarkAction(bookmark.id);
      router.refresh();
    }
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(bookmark.url);
    toast("Link copied to clipboard.", { icon: Icons.copyIcon });
  }

  async function handlePin() {
    if (isDemo) {
      onPin?.(bookmark.id);

      toast(
        bookmark.pinned ? "Bookmark unpinned." : "Bookmark pinned to top.",
        {
          icon: Icons.pinIcon,
        },
      );

      return;
    }

    setPinLoading(true);
    const newPinned = !bookmark.pinned;
    const result = await pinBookmarkAction(bookmark.id, newPinned);
    setPinLoading(false);

    if (!result.success) {
      toast.error(result.message ?? "Failed to update pin.");
      return;
    }

    toast(newPinned ? "Bookmark pinned to top." : "Bookmark unpinned.", {
      icon: Icons.pinIcon,
    });
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-border text-muted-foreground hover:text-foreground hover:bg-accent size-8 shrink-0 rounded-md bg-transparent"
        >
          {Icons.dots}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="mt-1 w-full p-1 md:min-w-50">
        <DropdownMenuItem
          onClick={handleVisit}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
        >
          {Icons.visit}
          Visit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleCopy}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
        >
          {Icons.copy}
          Copy URL
        </DropdownMenuItem>

        {!bookmark.isArchived && (
          <>
            <DropdownMenuItem
              onClick={handlePin}
              disabled={pinLoading}
              className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
            >
              {Icons.pin}
              {bookmark.pinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>

            <EditBookmark bookmark={bookmark} isDemo={isDemo} />

            <ArchiveBookmark bookmarkId={bookmark.id} isDemo={isDemo} />
          </>
        )}

        {bookmark.isArchived && (
          <>
            <UnarchiveBookmark bookmarkId={bookmark.id} isDemo={isDemo} />

            <DeleteBookmark bookmarkId={bookmark.id} isDemo={isDemo} />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
