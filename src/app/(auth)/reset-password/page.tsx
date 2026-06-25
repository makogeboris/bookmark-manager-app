import { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { ResetPasswordSkeleton } from "@/components/auth/AuthFormSkeleton";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Suspense fallback={<ResetPasswordSkeleton />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
