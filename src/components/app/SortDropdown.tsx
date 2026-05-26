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
import { Icons } from "./Icons";

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
            className=" items-center gap-2.5 p-3 hidden md:flex"
            variant="outlineMenu"
          >
            {Icons.sort}
            <span className="text-base font-semibold text-foreground">
              Sort by
            </span>
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-full mt-1 p-1 min-w-45 md:min-w-50"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="sr-only">Sort By</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            <DropdownMenuRadioItem
              value="recentlyAdded"
              className="flex items-center justify-between gap-4 font-semibold text-muted-foreground px-2!"
            >
              Recently added
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="recentlyVisited"
              className="flex items-center justify-between gap-4 font-semibold text-muted-foreground px-2!"
            >
              Recently visited
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="mostlyVisited"
              className="flex items-center justify-between gap-4 font-semibold text-muted-foreground px-2!"
            >
              Mostly visited
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
