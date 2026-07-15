import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function DashboardSkeleton() {
  return (
    <div className="bg-background flex min-h-screen">
      <SidebarSkeleton />

      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderSkeleton />

        <main className="flex-1">
          <BookmarkGridSkeleton />
        </main>
      </div>
    </div>
  );
}

interface SidebarSkeletonProps {
  open?: boolean;
}

export function SidebarSkeleton({ open = false }: SidebarSkeletonProps) {
  const content = (
    <>
      {/* Header */}
      <div className="relative px-5 pt-5 pb-3 sm:px-5">
        {/* Logo */}
        <Skeleton className="h-8 w-53 rounded-md" />
      </div>

      {/* Navigation */}
      <nav className="w-full space-y-px px-4 py-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex h-12 w-full items-center justify-between gap-2.5 rounded-sm px-3"
          >
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-5 rounded-sm" />

              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        ))}
      </nav>

      {/* Tags */}
      <div className="flex min-h-0 flex-1 flex-col px-3">
        <div className="flex min-h-8.5 items-center justify-between pr-2 pb-2.5 pl-3">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-12" />
        </div>

        <ul className="space-y-px overflow-hidden pb-12">
          {Array.from({ length: 16 }).map((_, i) => (
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
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="bg-sidebar border-sidebar-border sticky top-0 hidden h-screen w-74 shrink-0 flex-col overflow-hidden border-r lg:flex">
        {content}
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile */}
      <aside
        className={`bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-50 flex w-70 flex-col overflow-hidden border-r transition-transform duration-300 ease-in-out sm:w-75 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar loading"
      >
        {content}
      </aside>
    </>
  );
}

export function HeaderSkeleton() {
  return (
    <header>
      <div className="bg-sidebar border-sidebar-border flex items-center justify-between gap-2.5 border-b px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex w-full items-center gap-2.5 sm:gap-4">
          <Skeleton className="size-10 rounded-xl sm:size-11 lg:hidden" />

          <Skeleton className="h-10 w-full max-w-65 sm:h-11 md:max-w-[320px]" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <Skeleton className="size-10 rounded-xl sm:size-11" />

          <Skeleton className="size-10 rounded-full sm:size-11" />
        </div>
      </div>
    </header>
  );
}
export function BookmarkGridSkeleton() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6 sm:p-8">
      {/* Heading + sort row */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40 rounded-md" />
        <Skeleton className="size-10 rounded-lg sm:h-10.5 sm:w-26" />
      </div>

      {/* Cards + pagination */}
      <BookmarkCardsSkeleton />
    </div>
  );
}

export function BookmarkCardsSkeleton() {
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
