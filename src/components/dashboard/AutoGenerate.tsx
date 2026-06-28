"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Spinner } from "@/components/ui/spinner";
import { generateMetadataAction } from "@/lib/actions/bookmarks";
import { toast } from "sonner";

const schema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

type Schema = z.infer<typeof schema>;

interface AutoGenerateProps {
  onGenerated: (data: {
    title: string;
    description: string;
    url: string;
    favicon: string;
  }) => void;
}

export default function AutoGenerate({ onGenerated }: AutoGenerateProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Schema) {
    const result = await generateMetadataAction(values.url);

    if (!result.success) {
      toast.error(result.message ?? "Could not fetch metadata.");
      return;
    }

    onGenerated({
      title: result.title ?? "",
      description: result.description ?? "",
      url: values.url,
      favicon: result.favicon ?? "",
    });

    toast.success("Metadata generated successfully.");
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-auto p-0 pr-5 text-xs font-medium"
        >
          Auto generate
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6 sm:max-w-xl md:gap-8">
        <DialogHeader className="gap-2 md:gap-2.5">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Generate Bookmark Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm font-medium">
            Enter a URL and let AI automatically generate metadata for your
            bookmark.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 md:gap-8"
        >
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="generate-url"
              className="text-foreground gap-0.5 text-sm font-semibold"
            >
              Website URL <span className="text-ring">*</span>
            </Label>
            <Input
              id="generate-url"
              type="url"
              disabled={isSubmitting}
              className="h-11"
              {...register("url")}
            />
            {errors.url && (
              <p className="text-destructive text-xs">{errors.url.message}</p>
            )}
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
                <span>{isSubmitting ? "Generating..." : "Generate"}</span>
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
