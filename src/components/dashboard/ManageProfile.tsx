"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ManageProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManageProfile({
  open,
  onOpenChange,
}: ManageProfileProps) {
  const [name, setName] = useState("Emily Carter");
  const [email, setEmail] = useState("emily101@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDeleteAccount = () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-6 sm:max-w-lg">
        {/* Header */}
        <DialogHeader className="gap-1.5 pb-6">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Manage Profile
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Update your personal information and account settings.
          </DialogDescription>
        </DialogHeader>

        <div className="scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent flex max-h-[70vh] flex-col gap-6 overflow-y-auto px-6 pb-6 pl-1">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="size-14">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Emily Carter"
              />
              <AvatarFallback className="text-lg">EC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground text-sm font-semibold">{name}</p>
              <p className="text-muted-foreground text-xs">{email}</p>
            </div>
          </div>

          <Separator />

          {/* Profile Info */}
          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
            <p className="text-foreground text-lg font-bold">
              Personal Information
            </p>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="name"
                className="text-foreground text-sm font-semibold"
              >
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-foreground text-sm font-semibold"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            <Button type="submit" className="self-end">
              Save Changes
            </Button>
          </form>

          <Separator />

          {/* Password */}
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <p className="text-foreground text-lg font-bold">Change Password</p>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="current-password"
                className="text-foreground text-sm font-semibold"
              >
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="new-password"
                className="text-foreground text-sm font-semibold"
              >
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="confirm-password"
                className="text-foreground text-sm font-semibold"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <Button type="submit" className="self-end">
              Update Password
            </Button>
          </form>

          <Separator />

          {/* Delete Account */}
          <div className="flex flex-col gap-3">
            <p className="text-foreground text-lg font-bold">Danger Zone</p>
            <p className="text-muted-foreground text-sm">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            {!showDeleteConfirm ? (
              <Button
                type="button"
                variant="destructive"
                className="self-start"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </Button>
            ) : (
              <div className="border-destructive/30 bg-destructive/5 flex flex-col gap-3 rounded-lg border p-4">
                <p className="text-foreground text-sm font-semibold">
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteAccount}
                  >
                    Yes, delete my account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
