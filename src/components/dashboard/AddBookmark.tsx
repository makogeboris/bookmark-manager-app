"use client";

import { useEffect, useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "../shared/Icons";
import AutoGenerate from "./AutoGenerate";
import { Spinner } from "@/components/ui/spinner";
import {
  bookmarkSchema,
  type BookmarkSchema,
} from "@/lib/validations/bookmarks";
import { addBookmarkAction } from "@/lib/actions/bookmarks";
import { toast } from "sonner";

const MAX_DESCRIPTION = 280;

interface AddBookmarkProps {
  isDemo?: boolean;
}

export default function AddBookmark({ isDemo = false }: AddBookmarkProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [favicon, setFavicon] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookmarkSchema>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: { title: "", description: "", url: "", tags: "" },
  });

  const description = watch("description") ?? "";

  function handleGenerated(data: {
    title: string;
    description: string;
    url: string;
    favicon: string;
    tags: string;
  }) {
    setValue("title", data.title, { shouldValidate: true });
    setValue("description", data.description, { shouldValidate: true });
    setValue("url", data.url, { shouldValidate: true });
    setValue("tags", data.tags, { shouldValidate: true });
    setFavicon(data.favicon);
  }

  async function onSubmit(values: BookmarkSchema) {
    const result = await addBookmarkAction({
      ...values,
      tags: values.tags ?? "",
      favicon,
    });

    if (!result.success) {
      toast.error(result.message ?? "Failed to add bookmark.");
      return;
    }

    toast.success("Bookmark added successfully.", { icon: Icons.check });
    reset();
    setFavicon("");
    setOpen(false);
    router.refresh();
  }

  const url = watch("url");

  useEffect(() => {
    if (!url) return;
    try {
      const hostname = new URL(url).hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`);
    } catch {}
  }, [url]);

  if (isDemo) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="flex cursor-not-allowed">
              <Button
                type="button"
                size="icon-lg"
                disabled
                aria-disabled
                className="pointer-events-none md:hidden"
              >
                {Icons.plus}
              </Button>
              <Button
                type="button"
                size="xxl"
                disabled
                aria-disabled
                className="pointer-events-none hidden md:flex"
              >
                {Icons.plus}
                <span>Add Bookmark</span>
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Adding bookmarks is disabled in demo mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="xxl"
          className="px-3 md:px-5"
          aria-label="Add bookmark"
        >
          {Icons.plus}

          <span className="sr-only md:not-sr-only">Add Bookmark</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6 sm:max-w-xl md:gap-8">
        <DialogHeader className="gap-2 md:gap-2.5">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-foreground text-2xl font-bold">
              Add a Bookmark
            </DialogTitle>
            <AutoGenerate onGenerated={handleGenerated} />
          </div>
          <DialogDescription className="text-muted-foreground text-sm font-medium">
            Save a link with details to keep your collection organized.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="add-title"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Title <span className="text-ring">*</span>
              </Label>
              <Input
                id="add-title"
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

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="add-description"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Description <span className="text-ring">*</span>
              </Label>
              <Textarea
                id="add-description"
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

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="add-url"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Website URL <span className="text-ring">*</span>
              </Label>
              <Input
                id="add-url"
                type="url"
                disabled={isSubmitting}
                className="h-11"
                {...register("url")}
              />
              {errors.url && (
                <p className="text-destructive text-xs">{errors.url.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="add-tags"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Tags
              </Label>
              <Input
                id="add-tags"
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
                <span>{isSubmitting ? "Adding..." : "Add Bookmark"}</span>
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
