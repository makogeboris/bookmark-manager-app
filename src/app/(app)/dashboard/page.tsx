import { Metadata } from "next";
import BookmarkGrid from "@/components/dashboard/BookmarkGrid";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { DashboardProvider } from "@/lib/dashboard-context";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { Bookmark } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const raw = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: {
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const bookmarks: Bookmark[] = raw.map((b) => ({
    id: b.id,
    title: b.title,
    url: b.url,
    favicon: b.favicon ?? "",
    description: b.description ?? "",
    tags: b.tags.map((bt) => bt.tag.name),
    pinned: b.pinned,
    isArchived: b.isArchived,
    visitCount: b.visitCount,
    createdAt: b.createdAt.toISOString(),
    lastVisited: b.lastVisited ? b.lastVisited.toISOString() : null,
  }));

  return (
    <DashboardProvider>
      <DashboardShell bookmarks={bookmarks}>
        <BookmarkGrid bookmarks={bookmarks} />
      </DashboardShell>
    </DashboardProvider>
  );
}
