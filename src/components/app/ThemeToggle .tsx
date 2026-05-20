"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const active = resolvedTheme ?? theme;

  return (
    <div className="flex items-center rounded-xs bg-accent p-px">
      <Button
        onClick={() => setTheme("light")}
        variant="ghost"
        size="icon-sm"
        aria-label="Light mode"
        className={cn(
          "rounded-xs",
          active === "light" && "bg-popover shadow-sm",
        )}
      >
        <Sun className="text-foreground" />
      </Button>

      <Button
        onClick={() => setTheme("dark")}
        variant="ghost"
        size="icon-sm"
        aria-label="Dark mode"
        className={cn(
          "rounded-xs",
          active === "dark" && "bg-popover shadow-sm",
        )}
      >
        <Moon className="text-foreground" />
      </Button>
    </div>
  );
}
