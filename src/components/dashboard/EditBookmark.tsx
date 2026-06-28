"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Icons } from "../shared/Icons";
import { Spinner } from "@/components/ui/spinner";
import {
  bookmarkSchema,
  type BookmarkSchema,
} from "@/lib/validations/bookmarks";
import { editBookmarkAction } from "@/lib/actions/bookmarks";
import { toast } from "sonner";
import type { Bookmark } from "@/lib/types";

const MAX_DESCRIPTION = 280;

interface EditBookmarkProps {
  bookmark: Bookmark;
  isDemo?: boolean;
}

export default function EditBookmark({
  bookmark,
  isDemo = false,
}: EditBookmarkProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Tags are stored as string[] on Bookmark — join for the input
  const defaultTags = bookmark.tags.join(", ");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookmarkSchema>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      tags: defaultTags,
    },
  });

  const description = watch("description") ?? "";

  async function onSubmit(values: BookmarkSchema) {
    // Demo mode — block save
    if (isDemo) {
      toast.error("Editing is disabled in demo mode.");
      return;
    }

    const result = await editBookmarkAction(bookmark.id, {
      ...values,
      tags: values.tags ?? "",
    });

    if (!result.success) {
      toast.error(result.message ?? "Failed to save changes.");
      return;
    }

    toast.success("Changes saved.", { icon: Icons.check });
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
        >
          {Icons.edit}
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="gap-6 sm:max-w-xl md:gap-8"
      >
        <DialogHeader className="gap-2 md:gap-2.5">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Edit bookmark
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm font-medium">
            Update your saved link details — change the title, description, URL,
            or tags anytime.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="edit-title"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Title <span className="text-ring">*</span>
              </Label>
              <Input
                id="edit-title"
                disabled={isSubmitting}
                className="h-11"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-destructive text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="edit-description"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Description <span className="text-ring">*</span>
              </Label>
              <Textarea
                id="edit-description"
                disabled={isSubmitting}
                maxLength={MAX_DESCRIPTION}
                className="min-h-23 resize-none"
                {...register("description")}
              />
              <p className="text-muted-foreground text-right text-xs">
                {description.length}/{MAX_DESCRIPTION}
              </p>
              {errors.description && (
                <p className="text-destructive text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* URL */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="edit-url"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Website URL <span className="text-ring">*</span>
              </Label>
              <Input
                id="edit-url"
                type="url"
                disabled={isSubmitting}
                className="h-11"
                {...register("url")}
              />
              {errors.url && (
                <p className="text-destructive text-xs">{errors.url.message}</p>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="edit-tags"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Tags
              </Label>
              <Input
                id="edit-tags"
                placeholder="e.g. design, learning, tools"
                disabled={isSubmitting}
                className="h-11"
                {...register("tags")}
              />
            </div>
          </div>

          <DialogFooter className="gap-3 md:gap-4">
            <DialogClose asChild>
              <Button
                size="lg"
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="border-input bg-transparent px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
            >
              <span className="flex items-center gap-2">
                {isSubmitting && <Spinner data-icon="inline-start" />}
                <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
