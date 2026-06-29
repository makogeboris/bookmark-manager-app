import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import ActionsDropdown from "./ActionsDropdown";
import { Icons } from "../shared/Icons";
import type { Bookmark } from "@/lib/types";

interface BookmarkCardProps {
  title: string;
  url: string;
  favicon?: string;
  description?: string;
  tags?: string[];
  visitCount?: number;
  dateAdded?: string;
  dateVisited?: string;
  pinned?: boolean;
  isArchived?: boolean;
  onPinClick?: () => void;
  bookmark: Bookmark;
  isDemo?: boolean;
}

export default function BookmarkCard({
  title,
  url,
  favicon,
  description,
  tags = [],
  visitCount,
  dateAdded,
  dateVisited,
  pinned,
  onPinClick,
  bookmark,
  isDemo = false,
}: BookmarkCardProps) {
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <Card className="bg-card card-shadow rounded-10 border-transparent pb-0 shadow-none">
      <CardContent className="flex min-h-full flex-col justify-between gap-4 px-0">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="border-accent bg-background flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                {favicon ? (
                  // ← plain <img> avoids next/image domain whitelist issues for favicons
                  <img
                    width={44}
                    height={44}
                    src={favicon}
                    alt={title}
                    className="size-6 object-contain"
                    onError={(e) => {
                      // Hide broken favicon, show letter fallback
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-muted-foreground text-xs font-bold">${title.charAt(0).toUpperCase()}</span>`;
                      }
                    }}
                  />
                ) : (
                  <span className="text-muted-foreground text-xs font-bold">
                    {title.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-card-foreground truncate text-xl leading-snug font-bold">
                  {title}
                </h3>
                <p className="text-muted-foreground truncate text-xs font-medium">
                  {displayUrl}
                </p>
              </div>
            </div>

            <ActionsDropdown bookmark={bookmark} isDemo={isDemo} />
          </div>

          <Separator />

          {description && (
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-secondary text-accent-foreground rounded-xs border-0 px-2 py-1 text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <CardFooter className="border-t-accent flex items-center justify-between border-t px-4 py-3">
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            {visitCount !== undefined && (
              <span className="flex items-center gap-1.5">
                {Icons.eye}
                {visitCount}
              </span>
            )}
            {dateAdded && (
              <span className="flex items-center gap-1.5">
                {Icons.clock}
                {dateAdded}
              </span>
            )}
            {dateVisited && (
              <span className="flex items-center gap-1.5">
                {Icons.calendar}
                {dateVisited}
              </span>
            )}
          </div>

          {pinned && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onPinClick}
              className="text-foreground hover:text-foreground size-4 shrink-0 hover:bg-none"
            >
              {Icons.pin}
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
