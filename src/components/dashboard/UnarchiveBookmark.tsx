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
import { unarchiveBookmarkAction } from "@/lib/actions/bookmarks";
import { Icons } from "../shared/Icons";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface UnarchiveProps {
  bookmarkId: string;
  isDemo?: boolean;
}

export function UnarchiveBookmark({
  bookmarkId,
  isDemo = false,
}: UnarchiveProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUnarchive() {
    // Demo — toast and close dialog without hitting the DB
    if (isDemo) {
      toast("Bookmark restored.", { icon: Icons.unarchive });
      return;
    }

    setLoading(true);
    const result = await unarchiveBookmarkAction(bookmarkId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message ?? "Failed to restore bookmark.");
      return;
    }

    toast("Bookmark restored.", { icon: Icons.unarchive });
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
        >
          {Icons.unarchive}
          Unarchive
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unarchive bookmark</AlertDialogTitle>
          <AlertDialogDescription>
            Move this bookmark back to your active list?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUnarchive} disabled={loading}>
            <span className="flex items-center gap-2">
              {loading && <Spinner data-icon="inline-start" />}
              <span>{loading ? "Restoring..." : "Unarchive"}</span>
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
