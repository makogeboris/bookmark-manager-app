"use client";

import { useState } from "react";
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
import { ThemeToggle } from "../shared/ThemeToggle ";
import ManageProfile from "./ManageProfile";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AvatarDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="[&:focus-visible>span]:ring-ring rounded-full focus-visible:outline-none [&:focus-visible>span]:rounded-full [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-offset-2"
          >
            <Avatar size="lg">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2 w-full" align="end">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setProfileOpen(true);
            }}
            className="cursor-pointer"
          >
            <Avatar size="lg">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-card-foreground text-sm font-semibold">
                {user?.name ?? "—"}
              </p>
              <p className="text-muted-foreground text-sm font-semibold">
                {user?.email ?? "—"}
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
            onSelect={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
            className="text-muted-foreground cursor-pointer font-semibold"
          >
            <LogOutIcon className="text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ManageProfile open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
