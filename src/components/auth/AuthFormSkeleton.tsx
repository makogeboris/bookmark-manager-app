import { Skeleton } from "@/components/ui/skeleton";

export default function AuthFormSkeleton() {
  return (
    <div className="card-shadow dark:border-border bg-card gap-8 rounded-xl border border-transparent px-8 py-10">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-32 rounded-md" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-4 w-56 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-11 rounded-lg" />
          <Skeleton className="h-11 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
