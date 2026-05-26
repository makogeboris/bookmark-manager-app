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

export default function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full focus-visible:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-ring [&:focus-visible>span]:ring-offset-2 [&:focus-visible>span]:rounded-full"
        >
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full mt-2" align="end">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-card-foreground font-semibold text-sm">
              Emily Carter
            </p>
            <p className="text-muted-foreground font-semibold text-sm">
              emily101@gmail.com
            </p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItemTheme
          onSelect={(e) => e.preventDefault()}
          className="flex justify-between text-muted-foreground font-semibold"
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
          className="cursor-pointer text-muted-foreground font-semibold"
        >
          <LogOutIcon className="text-muted-foreground" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
