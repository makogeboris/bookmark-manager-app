import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import type { Bookmark } from "@/lib/types";
import { DashboardProvider } from "@/lib/dashboard-context";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BookmarkGrid from "@/components/dashboard/BookmarkGrid";
import BookmarkGridSkeleton from "@/components/dashboard/BookmarkGridSkeleton";

export const metadata: Metadata = { title: "Dashboard" };

async function BookmarkGridLoader() {
  const session = await getSession();
  if (!session) redirect("/login");

  const raw = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: { tags: { include: { tag: true } } },
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

  return <BookmarkGrid bookmarks={bookmarks} />;
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const raw = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    include: { tags: { include: { tag: true } } },
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
        <Suspense fallback={<BookmarkGridSkeleton />}>
          <BookmarkGridLoader />
        </Suspense>
      </DashboardShell>
    </DashboardProvider>
  );
}
