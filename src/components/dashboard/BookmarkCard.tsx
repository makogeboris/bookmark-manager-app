import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";
import ActionsDropdown from "./ActionsDropdown";
import { Icons } from "../shared/Icons";
import type { Bookmark } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  bookmark: Bookmark;
  isDemo?: boolean;
  onPin?: (bookmarkId: string) => void;
  onArchive?: (bookmarkId: string) => void;
  onUnarchive?: (bookmarkId: string) => void;
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
  bookmark,
  isDemo = false,
  onPin,
  onArchive,
  onUnarchive,
}: BookmarkCardProps) {
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <TooltipProvider>
      <Card className="bg-card card-shadow rounded-10 border-transparent pb-0 shadow-none">
        <CardContent className="flex min-h-full flex-col justify-between gap-4 px-0">
          <div className="flex flex-col gap-4 px-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-accent bg-background flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                  {favicon ? (
                    <img
                      width={44}
                      height={44}
                      src={favicon}
                      alt={title}
                      className="size-11 object-contain"
                      onError={(e) => {
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

              <ActionsDropdown
                bookmark={bookmark}
                isDemo={isDemo}
                onPin={onPin}
                onArchive={onArchive}
                onUnarchive={onUnarchive}
              />
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex cursor-default items-center gap-1.5">
                      {Icons.eye}
                      {visitCount}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {visitCount === 1 ? "1 visit" : `${visitCount} visits`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}

              {dateAdded && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex cursor-default items-center gap-1.5">
                      {Icons.clock}
                      {dateAdded}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Added {dateAdded}</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {dateVisited && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex cursor-default items-center gap-1.5">
                      {Icons.calendar}
                      {dateVisited}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Last visited {dateVisited}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {pinned && (
              <span className="text-foreground size-4 shrink-0">
                {Icons.pin}
              </span>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
