import { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BookmarkGrid from "@/components/dashboard/BookmarkGrid";
import { DashboardProvider } from "@/lib/dashboard-context";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  // For now renders empty — CRUD wiring comes next
  return (
    <DashboardProvider>
      <DashboardShell bookmarks={[]}>
        <BookmarkGrid bookmarks={[]} />
      </DashboardShell>
    </DashboardProvider>
  );
}
