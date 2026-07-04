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
import { Spinner } from "../ui/spinner";

export default function AvatarDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
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
    try {
      setIsSigningOut(true);

      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } finally {
      setIsSigningOut(false);
    }
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
              <AvatarImage
                src={user?.image ?? "/images/image-avatar.webp"}
                alt={user?.name ?? ""}
              />
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
              <AvatarImage
                src={user?.image ?? "/images/image-avatar.webp"}
                alt={user?.name ?? ""}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-card-foreground text-sm font-semibold">
                {user?.name ?? "Demo User"}
              </p>
              <p className="text-muted-foreground text-sm font-semibold">
                {user?.email ?? "demo@bookmark.app"}
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
            disabled={isSigningOut}
            onSelect={(e) => {
              e.preventDefault();

              if (!isSigningOut) {
                handleSignOut();
              }
            }}
            className="text-muted-foreground cursor-pointer font-semibold"
          >
            <span className="flex items-center gap-2">
              {isSigningOut ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <LogOutIcon className="text-muted-foreground" />
              )}

              <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ManageProfile open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
