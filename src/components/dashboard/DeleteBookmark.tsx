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
import { deleteBookmarkAction } from "@/lib/actions/bookmarks";
import { Icons } from "../shared/Icons";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface DeleteProps {
  bookmarkId: string;
  isDemo?: boolean;
}

export function DeleteBookmark({ bookmarkId, isDemo = false }: DeleteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deleteBookmarkAction(bookmarkId);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message ?? "Failed to delete bookmark.");
      return;
    }

    toast("Bookmark deleted.", { icon: Icons.delete });
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          disabled={isDemo}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {Icons.delete}
          Delete Permanently
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete bookmark</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This bookmark will be permanently deleted and cannot
            be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            <span className="flex items-center gap-2">
              {loading && <Spinner data-icon="inline-start" />}
              <span>{loading ? "Deleting..." : "Delete permanently"}</span>
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
