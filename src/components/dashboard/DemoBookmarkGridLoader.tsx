import type { Bookmark } from "@/lib/types";
import DemoDashboard from "./DemoDashboard";

interface Props {
  initialBookmarks: Bookmark[];
}

const DEMO_DELAY_MS = 8000;

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function DemoBookmarkGridLoader({
  initialBookmarks,
}: Props) {
  await delay(DEMO_DELAY_MS);
  return <DemoDashboard initialBookmarks={initialBookmarks} />;
}
