"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  id: string;
  className?: string;
}

export default function PasswordInput({
  id,
  className,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={show ? "text" : "password"}
        className={cn("pr-12", className)}
        {...props}
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="text-muted-foreground hover:text-foreground focus-visible:outline-primary/80 absolute top-1/2 right-4 -translate-y-1/2 rounded-xs transition-colors focus-visible:outline-2"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
      </button>
    </div>
  );
}
