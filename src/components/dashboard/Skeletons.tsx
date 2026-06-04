import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(338px,1fr))] gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <BookmarkCard key={i} />
        ))}
      </div>

      <PaginationSkeleton />
    </div>
  );
}

export function BookmarkCard() {
  return (
    <Card className="bg-card card-shadow rounded-10 border-transparent pb-0 shadow-none">
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="flex flex-col gap-4 px-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* Favicon */}
              <Skeleton className="size-10 shrink-0 rounded-md" />

              {/* Title + URL */}
              <div className="flex min-w-0 flex-col gap-1.5">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            {/* Actions menu */}
            <Skeleton className="size-8 shrink-0 rounded-lg" />
          </div>

          <Separator />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-xs" />
            <Skeleton className="h-6 w-20 rounded-xs" />
            <Skeleton className="h-6 w-14 rounded-xs" />
          </div>
        </div>

        <CardFooter className="border-t-accent flex items-center justify-between border-t px-4 py-3">
          {/* Meta — views, date added, date visited */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Pin */}
          <Skeleton className="size-4 rounded-sm" />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between gap-1">
      {/* Previous */}
      <Skeleton className="bg-border/60 dark:bg-accent/40 h-9 w-9 rounded-lg sm:w-20" />

      {/* Page numbers */}
      <div className="flex gap-1">
        <Skeleton className="bg-border/60 dark:bg-accent/40 size-9 rounded-lg" />
        <Skeleton className="bg-border/60 dark:bg-accent/40 size-9 rounded-lg" />
        <Skeleton className="bg-border/60 dark:bg-accent/40 size-9 rounded-lg" />
        <Skeleton className="bg-border/60 dark:bg-accent/40 size-9 rounded-lg" />
      </div>

      {/* Next */}
      <Skeleton className="bg-border/60 dark:bg-accent/40 h-9 w-9 rounded-lg sm:w-20" />
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <ul className="flex-1 space-y-px pr-0.5 pb-12">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i} className="flex items-center gap-2 px-3 py-2">
          {/* Checkbox */}
          <Skeleton className="size-4 shrink-0 rounded-xs" />
          {/* Tag name */}
          <Skeleton className="h-4 flex-1 rounded-sm" />
          {/* Count badge */}
          <Skeleton className="h-5 w-6 rounded-full" />
        </li>
      ))}
    </ul>
  );
}
