"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { AvatarUpload } from "./AvatarUpload";
import {
  updateProfileAction,
  changePasswordAction,
  deleteAccountAction,
} from "@/lib/actions/auth";
import PasswordInput from "../auth/PasswordInput";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

// Schemas
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const changeEmailSchema = z.object({
  newEmail: z.string().email("Invalid email address"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileSchema = z.infer<typeof profileSchema>;
type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
type PasswordSchema = z.infer<typeof passwordSchema>;

// Demo defaults
const DEMO_NAME = "Demo User";
const DEMO_EMAIL = "demo@bookmark.app";
const DEMO_AVATAR = "/images/image-avatar.webp";

interface ManageProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDemo?: boolean;
}

export default function ManageProfile({
  open,
  onOpenChange,
  isDemo = false,
}: ManageProfileProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // For demo use placeholder values, for auth use real session values
  const displayName = isDemo ? DEMO_NAME : (user?.name ?? "—");
  const displayEmail = isDemo ? DEMO_EMAIL : (user?.email ?? "—");
  const displayImage = isDemo
    ? DEMO_AVATAR
    : (avatarUrl ?? user?.image ?? null);

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Profile form
  const profileForm = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (isDemo) {
      profileForm.reset({ name: DEMO_NAME });
    } else if (user) {
      profileForm.reset({ name: user.name });
    }
  }, [user?.name, isDemo]);

  async function onProfileSubmit(values: ProfileSchema) {
    if (isDemo) {
      toast.error("Profile editing is disabled in demo mode.");
      return;
    }
    const result = await updateProfileAction(values);
    if (result.success) {
      toast.success("Name updated successfully.");
      return;
    }
    toast.error(result.message);
  }

  // Change email form
  const emailForm = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: "" },
  });

  async function onEmailSubmit(values: ChangeEmailSchema) {
    if (isDemo) {
      toast.error("Email editing is disabled in demo mode.");
      return;
    }
    const { error } = await authClient.changeEmail({
      newEmail: values.newEmail,
      callbackURL: "/dashboard",
    });
    if (error) {
      toast.error(error.message ?? "Something went wrong.");
      return;
    }
    toast.success("Confirmation email sent to your new address.");
    emailForm.reset();
  }

  // Password form
  const passwordForm = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  });

  async function onPasswordSubmit(values: PasswordSchema) {
    if (isDemo) {
      toast.error("Password editing is disabled in demo mode.");
      return;
    }
    const result = await changePasswordAction({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    if (result.success) {
      toast.success(result.message ?? "Password updated.");
      passwordForm.reset();
      return;
    }
    toast.error(result.message ?? "Unable to update password.");
  }

  // Delete account
  async function handleDeleteAccount() {
    if (isDemo) {
      toast.error("Account deletion is disabled in demo mode.");
      return;
    }
    try {
      setIsDeleting(true);
      const result = await deleteAccountAction();
      if (result.success) {
        toast.success("Account deleted.");
        onOpenChange(false);
        router.push("/");
        router.refresh();
        return;
      }
      toast.error(result.message ?? "Failed to delete account.");
    } finally {
      setIsDeleting(false);
    }
  }

  const authInProgress =
    profileForm.formState.isSubmitting ||
    emailForm.formState.isSubmitting ||
    passwordForm.formState.isSubmitting ||
    isDeleting;

  const formDisabled = isDemo || authInProgress;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="gap-0 overflow-hidden p-6 sm:max-w-lg"
      >
        <DialogHeader className="gap-1.5 pb-6">
          <DialogTitle className="text-foreground text-2xl font-bold">
            Manage Profile
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {isDemo
              ? "You are viewing a demo profile. Sign up to manage your own account."
              : "Update your personal information and account settings."}
          </DialogDescription>
        </DialogHeader>

        <div className="scrollbar-thumb-sidebar-border flex max-h-[70vh] scrollbar-thin scrollbar-track-transparent flex-col gap-6 overflow-y-auto px-6 pb-6 pl-1">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            {isDemo ? (
              // Demo
              <Avatar size="lg" className="size-14">
                <AvatarImage src={DEMO_AVATAR} alt="" />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
            ) : (
              // Auth
              <AvatarUpload
                currentImage={displayImage}
                initials={initials}
                onUploaded={(url) => setAvatarUrl(url)}
              />
            )}
            <div>
              <p className="text-foreground text-sm font-semibold">
                {displayName}
              </p>
              <p className="text-muted-foreground text-xs">{displayEmail}</p>
              {!isDemo && (
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Click your avatar to change it
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Name form */}
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="flex flex-col gap-4"
          >
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
                className="h-11"
                disabled={formDisabled}
                {...profileForm.register("name")}
              />
              {profileForm.formState.errors.name && (
                <p className="text-destructive text-xs">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <Button type="submit" className="self-end" disabled={formDisabled}>
              <span className="flex items-center gap-2">
                {profileForm.formState.isSubmitting && (
                  <Spinner data-icon="inline-start" />
                )}
                <span>
                  {profileForm.formState.isSubmitting
                    ? "Saving..."
                    : "Save Changes"}
                </span>
              </span>
            </Button>
          </form>

          <Separator />

          {/* Change email form */}
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="flex flex-col gap-4"
          >
            <p className="text-foreground text-lg font-bold">Change Email</p>
            <p className="text-muted-foreground text-sm">
              Current:{" "}
              <span className="text-foreground font-medium">
                {displayEmail}
              </span>
            </p>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="new-email"
                className="text-foreground text-sm font-semibold"
              >
                New Email Address
              </Label>
              <Input
                id="new-email"
                type="email"
                className="h-11"
                disabled={formDisabled}
                {...emailForm.register("newEmail")}
              />
              {emailForm.formState.errors.newEmail && (
                <p className="text-destructive text-xs">
                  {emailForm.formState.errors.newEmail.message}
                </p>
              )}
            </div>

            <Button type="submit" className="self-end" disabled={formDisabled}>
              <span className="flex items-center gap-2">
                {emailForm.formState.isSubmitting && (
                  <Spinner data-icon="inline-start" />
                )}
                <span>
                  {emailForm.formState.isSubmitting
                    ? "Sending..."
                    : "Send Confirmation"}
                </span>
              </span>
            </Button>
          </form>

          <Separator />

          {/* Password form */}
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="flex flex-col gap-4"
          >
            <p className="text-foreground text-lg font-bold">Change Password</p>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="current-password"
                className="text-foreground text-sm font-semibold"
              >
                Current Password
              </Label>
              <PasswordInput
                id="current-password"
                disabled={formDisabled}
                {...passwordForm.register("currentPassword")}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-destructive text-xs">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="new-password"
                className="text-foreground text-sm font-semibold"
              >
                New Password
              </Label>
              <PasswordInput
                id="new-password"
                disabled={formDisabled}
                {...passwordForm.register("newPassword")}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-destructive text-xs">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="confirm-password"
                className="text-foreground text-sm font-semibold"
              >
                Confirm New Password
              </Label>
              <PasswordInput
                id="confirm-password"
                disabled={formDisabled}
                {...passwordForm.register("confirmPassword")}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-destructive text-xs">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" className="self-end" disabled={formDisabled}>
              <span className="flex items-center gap-2">
                {passwordForm.formState.isSubmitting && (
                  <Spinner data-icon="inline-start" />
                )}
                <span>
                  {passwordForm.formState.isSubmitting
                    ? "Updating..."
                    : "Update Password"}
                </span>
              </span>
            </Button>
          </form>

          <Separator />

          {/* Danger zone */}
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
                disabled={formDisabled}
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
                    disabled={formDisabled}
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={formDisabled}
                    onClick={handleDeleteAccount}
                  >
                    <span className="flex items-center gap-2">
                      {isDeleting && <Spinner data-icon="inline-start" />}
                      <span>
                        {isDeleting ? "Deleting..." : "Yes, delete my account"}
                      </span>
                    </span>
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
