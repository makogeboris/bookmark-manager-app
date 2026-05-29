"use client";

import { useState } from "react";
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
import { Icons } from "./Icons";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const MAX_DESCRIPTION = 280;

export default function EditBookmark() {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle submit
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-muted-foreground flex items-center gap-2.5 px-2! font-semibold"
        >
          {Icons.edit}
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="gap-6 sm:max-w-xl md:gap-8">
        <DialogHeader className="gap-2 md:gap-2.5">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Edit bookmark
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm font-medium">
            Update your saved link details — change the title, description, URL,
            or tags anytime.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="title"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Title <span className="text-ring">*</span>
              </Label>
              <Input id="title" name="title" required className="h-11" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="description"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Description <span className="text-ring">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                required
                maxLength={MAX_DESCRIPTION}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-23 resize-none"
              />
              <p className="text-muted-foreground text-right text-xs">
                {description.length}/{MAX_DESCRIPTION}
              </p>
            </div>

            {/* Website URL */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="url"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Website URL <span className="text-ring">*</span>
              </Label>
              <Input id="url" name="url" type="url" required className="h-11" />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="tags"
                className="text-foreground gap-0.5 text-sm font-semibold"
              >
                Tags <span className="text-ring">*</span>
              </Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g. design, learning, tools"
                className="h-11"
              />
            </div>
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
              Add Bookmark
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
