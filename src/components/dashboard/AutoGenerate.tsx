"use client";

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

export default function AutoGenerate() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle submit
  };

  return (
    <Dialog>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="url"
              className="text-foreground gap-0.5 text-sm font-semibold"
            >
              Website URL <span className="text-ring">*</span>
            </Label>
            <Input id="url" name="url" type="url" required className="h-11" />
          </div>

          <DialogFooter className="gap-3 md:gap-4">
            <DialogClose asChild>
              <Button
                size="lg"
                type="button"
                variant="outline"
                className="border-input bg-transparent px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="lg"
              type="submit"
              className="px-4 py-5 text-sm sm:px-6 sm:py-5.5 sm:text-base"
            >
              Generate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
