"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "../shared/Icons";

export type SortOption = "recently-added" | "recently-visited" | "most-visited";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outlineMenu"
          size="xl"
          aria-label="Sort bookmarks"
          className="size-10 px-3 md:h-12 md:w-auto md:gap-2.5 md:p-3"
        >
          {Icons.sort}

          <span className="sr-only md:not-sr-only md:text-base md:font-semibold">
            Sort by
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-1 w-full min-w-45 p-1 md:min-w-50"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="sr-only">Sort By</DropdownMenuLabel>

          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(v) => onChange(v as SortOption)}
          >
            <DropdownMenuRadioItem
              value="recently-added"
              className="text-muted-foreground flex items-center justify-between gap-4 px-2! font-semibold"
            >
              Recently added
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value="recently-visited"
              className="text-muted-foreground flex items-center justify-between gap-4 px-2! font-semibold"
            >
              Recently visited
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value="most-visited"
              className="text-muted-foreground flex items-center justify-between gap-4 px-2! font-semibold"
            >
              Mostly visited
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
