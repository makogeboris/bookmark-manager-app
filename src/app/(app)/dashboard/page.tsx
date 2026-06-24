import { Metadata } from "next";
import BookmarkGrid from "@/components/dashboard/BookmarkGrid";
import { DashboardProvider } from "@/lib/dashboard-context";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <BookmarkGrid bookmarks={[]} />
    </DashboardProvider>
  );
}
