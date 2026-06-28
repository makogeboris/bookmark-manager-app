"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  return session;
}

// Add bookmark
export async function addBookmarkAction(values: {
  title: string;
  description: string;
  url: string;
  tags: string;
  favicon?: string;
}) {
  try {
    const session = await requireSession();

    //  Duplicate detection
    const normalizedUrl = values.url.replace(/\/$/, "");

    const existing = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        url: {
          in: [normalizedUrl, `${normalizedUrl}/`],
        },
      },
    });

    if (existing) {
      return {
        success: false,
        duplicate: true,
        message: "You've already saved this URL.",
      };
    }

    const tagNames = values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const tagRecords = await Promise.all(
      tagNames.map((name) =>
        prisma.tag.upsert({
          where: { name_userId: { name, userId: session.user.id } },
          update: {},
          create: { name, userId: session.user.id },
        }),
      ),
    );

    await prisma.bookmark.create({
      data: {
        title: values.title,
        description: values.description,
        url: normalizedUrl,
        favicon: values.favicon ?? null,
        userId: session.user.id,
        tags: {
          create: tagRecords.map((tag) => ({ tagId: tag.id })),
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("addBookmarkAction error:", error);
    return { success: false, message: "Failed to add bookmark." };
  }
}

// Edit bookmark
export async function editBookmarkAction(
  bookmarkId: string,
  values: {
    title: string;
    description: string;
    url: string;
    tags: string;
  },
) {
  try {
    const session = await requireSession();

    // Verify ownership
    const existing = await prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId: session.user.id },
    });
    if (!existing) return { success: false, message: "Bookmark not found." };

    const tagNames = values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const tagRecords = await Promise.all(
      tagNames.map((name) =>
        prisma.tag.upsert({
          where: { name_userId: { name, userId: session.user.id } },
          update: {},
          create: { name, userId: session.user.id },
        }),
      ),
    );

    // Replace all tags on the bookmark
    await prisma.bookmark.update({
      where: { id: bookmarkId },
      data: {
        title: values.title,
        description: values.description,
        url: values.url,
        tags: {
          deleteMany: {},
          create: tagRecords.map((tag) => ({ tagId: tag.id })),
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("editBookmarkAction error:", error);
    return { success: false, message: "Failed to save changes." };
  }
}

// Delete bookmark
export async function deleteBookmarkAction(bookmarkId: string) {
  try {
    const session = await requireSession();

    await prisma.bookmark.deleteMany({
      where: { id: bookmarkId, userId: session.user.id },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("deleteBookmarkAction error:", error);
    return { success: false, message: "Failed to delete bookmark." };
  }
}

// Archive bookmark
export async function archiveBookmarkAction(bookmarkId: string) {
  try {
    const session = await requireSession();

    await prisma.bookmark.updateMany({
      where: { id: bookmarkId, userId: session.user.id },
      data: { isArchived: true },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("archiveBookmarkAction error:", error);
    return { success: false, message: "Failed to archive bookmark." };
  }
}

// Unarchive bookmark
export async function unarchiveBookmarkAction(bookmarkId: string) {
  try {
    const session = await requireSession();

    await prisma.bookmark.updateMany({
      where: { id: bookmarkId, userId: session.user.id },
      data: { isArchived: false },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("unarchiveBookmarkAction error:", error);
    return { success: false, message: "Failed to unarchive bookmark." };
  }
}

// Pin / unpin bookmark
export async function pinBookmarkAction(bookmarkId: string, pinned: boolean) {
  try {
    const session = await requireSession();

    await prisma.bookmark.updateMany({
      where: { id: bookmarkId, userId: session.user.id },
      data: { pinned },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("pinBookmarkAction error:", error);
    return { success: false, message: "Failed to update pin." };
  }
}

// Increment visit count
export async function visitBookmarkAction(bookmarkId: string) {
  try {
    const session = await requireSession();

    await prisma.bookmark.updateMany({
      where: { id: bookmarkId, userId: session.user.id },
      data: {
        visitCount: { increment: 1 },
        lastVisited: new Date(),
      },
    });

    // No revalidatePath here
    return { success: true };
  } catch (error) {
    console.error("visitBookmarkAction error:", error);
    return { success: false };
  }
}

// AI autogenerate metadata
// This replaces the generateMetadataAction in actions-bookmarks.ts
export async function generateMetadataAction(url: string) {
  try {
    new URL(url); // validate URL

    // Step 1 — fetch metadata via microlink
    const encoded = encodeURIComponent(url);
    const res = await fetch(
      `https://api.microlink.io/?url=${encoded}&meta=true`,
    );
    const json = await res.json();

    if (json.status !== "success") {
      return {
        success: false,
        message: "Could not fetch metadata for this URL.",
      };
    }

    const title = json.data.title ?? "";
    const description = json.data.description ?? "";
    const favicon = json.data.logo?.url ?? "";

    // Step 2 — use Claude to generate relevant tags
    let tags = "";
    try {
      const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 100,
          messages: [
            {
              role: "user",
              content: `Based on this bookmark:
Title: ${title}
Description: ${description}
URL: ${url}

Generate 3-5 concise, single-word or two-word tags that categorize this bookmark.
Reply with ONLY a comma-separated list of tags, nothing else.
Example: JavaScript, Tutorial, Frontend, Learning`,
            },
          ],
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        tags = aiData.content?.[0]?.text?.trim() ?? "";
      }
    } catch {
      // Tags generation failed silently — title/description still returned
    }

    return { success: true, title, description, favicon, tags };
  } catch {
    return {
      success: false,
      message: "Could not fetch metadata for this URL.",
    };
  }
}
