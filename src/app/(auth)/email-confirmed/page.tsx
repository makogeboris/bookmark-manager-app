import { Metadata } from "next";
import { EmailConfirmed } from "@/components/auth/EmailConfirmed";

export const metadata: Metadata = {
  title: "Email Confirmed",
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <EmailConfirmed />
      </div>
    </div>
  );
}
