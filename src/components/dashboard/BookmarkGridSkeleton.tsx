import DashboardSkeleton from "@/components/dashboard/Skeletons";
import { Skeleton } from "../ui/skeleton";

export default function BookmarkGridSkeleton() {
  return (
    <div className="flex flex-col gap-5 px-4 py-6 sm:p-8">
      {/* Heading + sort row */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40 rounded-md" />
        <Skeleton className="size-10 rounded-lg sm:h-10.5 sm:w-26" />
      </div>

      {/* Cards + pagination */}
      <DashboardSkeleton />
    </div>
  );
}
