"use client";

import { LogOutIcon, Palette } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemTheme,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle ";
import Link from "next/link";

export default function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="[&:focus-visible>span]:ring-ring rounded-full focus-visible:outline-none [&:focus-visible>span]:rounded-full [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-offset-2"
        >
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-full" align="end">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-card-foreground text-sm font-semibold">
              Emily Carter
            </p>
            <p className="text-muted-foreground text-sm font-semibold">
              emily101@gmail.com
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItemTheme
          onSelect={(e) => e.preventDefault()}
          className="text-muted-foreground flex justify-between font-semibold"
        >
          <div className="flex items-center gap-3">
            <Palette className="text-muted-foreground" />
            Theme
          </div>
          <ThemeToggle />
        </DropdownMenuItemTheme>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-muted-foreground cursor-pointer font-semibold"
        >
          <LogOutIcon className="text-muted-foreground" />
          <Link href="/login">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
