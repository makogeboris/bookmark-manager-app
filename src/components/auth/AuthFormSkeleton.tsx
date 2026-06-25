import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LoginSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
        <CardHeader className="gap-6 sm:px-8">
          {/* Logo */}
          <Skeleton className="h-8 w-32" />

          {/* Title & description */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        </CardHeader>

        <CardContent className="sm:px-8">
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Buttons */}
            <div className="mt-2 flex flex-col gap-3">
              <Skeleton className="h-11 w-full rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Sign up text */}
            <div className="mt-2 flex justify-center">
              <Skeleton className="h-4 w-56" />
            </div>

            {/* Separator */}
            <Skeleton className="my-2 h-px w-full sm:my-3" />

            {/* Demo button */}
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ResetPasswordSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="card-shadow dark:border-border gap-8 border border-transparent sm:py-8">
        <CardHeader className="gap-6 sm:px-8">
          {/* Logo */}
          <Skeleton className="h-8 w-32" />

          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-full max-w-xs" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardHeader>

        <CardContent className="sm:px-8">
          <div className="flex flex-col gap-6">
            {/* New password */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-3 w-44" />
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Submit button */}
            <div className="mt-2">
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Back to login */}
            <div className="mt-2 flex justify-center">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
