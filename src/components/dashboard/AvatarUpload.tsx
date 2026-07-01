"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAvatarAction } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

interface AvatarUploadProps {
  currentImage?: string | null;
  initials: string;
  onUploaded?: (url: string) => void;
}

export function AvatarUpload({
  currentImage,
  initials,
  onUploaded,
}: AvatarUploadProps) {
  const { refetch } = useSession();

  return (
    <CldUploadWidget
      // For signed uploads: signatureEndpoint only, no uploadPreset
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        folder: "bookmark-manager/avatars",
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        sources: ["local", "camera"],
        multiple: false,
        maxFileSize: 5_000_000,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      }}
      onError={(error) => {
        console.error("Cloudinary widget error:", error);
        toast.error("Upload failed. Please try again.");
      }}
      onSuccess={async (result) => {
        if (typeof result.info !== "object" || !result.info) return;
        const info = result.info as { secure_url: string };
        const url = info.secure_url;

        const res = await updateAvatarAction(url);
        if (res.success) {
          toast.success("Avatar updated.");
          onUploaded?.(url);
          refetch();
        } else {
          toast.error(res.message ?? "Failed to update avatar.");
        }
      }}
    >
      {({ open, isLoading }) => (
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            if (!isLoading) open();
          }}
          className="group relative shrink-0 disabled:opacity-50"
          aria-label="Change avatar"
        >
          <Avatar size="lg" className="size-14">
            <AvatarImage
              src={currentImage ?? "/images/image-avatar.webp"}
              alt="Avatar"
            />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-xs font-semibold text-white">
              {isLoading ? "Loading..." : "Edit"}
            </span>
          </div>
        </button>
      )}
    </CldUploadWidget>
  );
}
