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

export default function SortDropdown() {
  const [selected, setSelected] = React.useState("Recently added");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button variant="outlineMenu" size="icon-lg" className="md:hidden">
            {Icons.sort}
          </Button>

          <Button
            size="xl"
            className="hidden items-center gap-2.5 p-3 md:flex"
            variant="outlineMenu"
          >
            {Icons.sort}
            <span className="text-foreground text-base font-semibold">
              Sort by
            </span>
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-1 w-full min-w-45 p-1 md:min-w-50"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="sr-only">Sort By</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            <DropdownMenuRadioItem
              value="recentlyAdded"
              className="text-muted-foreground flex items-center justify-between gap-4 px-2! font-semibold"
            >
              Recently added
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="recentlyVisited"
              className="text-muted-foreground flex items-center justify-between gap-4 px-2! font-semibold"
            >
              Recently visited
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="mostlyVisited"
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
