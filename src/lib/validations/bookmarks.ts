import { z } from "zod";

export const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(280),
  url: z.string().url("Please enter a valid URL"),
  tags: z.string().optional(),
});

export type BookmarkSchema = z.infer<typeof bookmarkSchema>;
