"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { archiveBookmarkAction } from "@/lib/actions/bookmarks";
import { Icons } from "../shared/Icons";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface ArchiveProps {
  bookmarkId: string;
  isDemo?: boolean;
}

export function ArchiveBookmark({ bookmarkId, isDemo = false }: ArchiveProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleArchive() {
    // Demo — toast and close dialog without hitting the DB
    if (isDemo) {
      toast("Bookmark archived.", { icon: Icons.archive });
      return;
    }

    setLoading(true);
    const result = await archiveBookmarkAction(bookmarkId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message ?? "Failed to archive bookmark.");
      return;
    }

    toast("Bookmark archived.", { icon: Icons.archive });
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
        >
          {Icons.archive}
          Archive
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive bookmark</AlertDialogTitle>
          <AlertDialogDescription>
            This bookmark will be moved to your archive. You can restore it
            anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchive} disabled={loading}>
            <span className="flex items-center gap-2">
              {loading && <Spinner data-icon="inline-start" />}
              <span>{loading ? "Archiving..." : "Archive"}</span>
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
