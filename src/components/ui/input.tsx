import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:outline-ring aria-invalid:border-destructive dark:bg-input/20 dark:aria-invalid:border-destructive/50 h-10 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-sm font-semibold shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sm placeholder:font-normal focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-11.5 md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
