"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);
    try {
      // 1 — get signature from our API route
      const timestamp = Math.round(Date.now() / 1000);
      const paramsToSign = {
        timestamp,
        folder: "bookmark-manager/avatars",
      };

      const sigRes = await fetch("/api/sign-cloudinary-params", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paramsToSign }),
      });

      if (!sigRes.ok) throw new Error("Failed to get upload signature");
      const { signature, api_key } = await sigRes.json();

      // 2 — upload directly to Cloudinary REST API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", "bookmark-manager/avatars");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
      const uploadData = await uploadRes.json();
      const url: string = uploadData.secure_url;

      // 3 — persist the URL to the user record
      const result = await updateAvatarAction(url);
      if (!result.success) throw new Error(result.message);

      toast.success("Avatar updated.");
      onUploaded?.(url);
      refetch();
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error("Failed to upload avatar. Please try again.");
      setPreview(null);
    } finally {
      setUploading(false);
      // Reset input so the same file can be selected again
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const displayImage = preview ?? currentImage ?? undefined;

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      disabled={uploading}
      className="group relative shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
      aria-label="Change avatar"
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <Avatar size="lg" className="size-14">
        <AvatarImage src={displayImage} alt="" />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        {uploading ? (
          <Spinner className="size-4 text-white" />
        ) : (
          <span className="text-xs font-semibold text-white">Edit</span>
        )}
      </div>
    </button>
  );
}
