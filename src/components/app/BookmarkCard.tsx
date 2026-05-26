import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "./Icons";
import { Separator } from "../ui/separator";
import ActionsDropdown from "./ActionsDropdown";

interface BookmarkCardProps {
  title: string;
  url: string;
  favicon?: string;
  description?: string;
  tags?: string[];
  views?: number;
  dateAdded?: string;
  dateVisited?: string;
  pinned?: boolean;
  onMenuClick?: () => void;
  onPinClick?: () => void;
}

export default function BookmarkCard({
  title,
  url,
  favicon,
  description,
  tags = [],
  views,
  dateAdded,
  dateVisited,
  pinned = false,
  onPinClick,
}: BookmarkCardProps) {
  const displayUrl = url.replace(/^https?:\/\//, "");

  return (
    <Card className="bg-card radius-12 card-shadow shadow-none border-transparent pb-0">
      <CardContent className="flex flex-col gap-4 px-0">
        <div className="px-4 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3 ">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 shrink-0 rounded-md border border-accent bg-background flex items-center justify-center overflow-hidden">
                {favicon ? (
                  <Image
                    width={44}
                    height={44}
                    src="/images/favicon-frontend-mentor.png"
                    alt={title}
                  />
                ) : (
                  <span className="text-xs font-bold text-muted-foreground">
                    {title.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-bold text-card-foreground leading-snug truncate">
                  {title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground truncate">
                  {displayUrl}
                </p>
              </div>
            </div>

            <ActionsDropdown />
          </div>

          <Separator />

          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-xs px-2 py-1 text-xs font-medium bg-secondary text-accent-foreground border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <CardFooter className="px-4 border-t border-t-accent flex items-center justify-between py-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            {views !== undefined && (
              <span className="flex items-center gap-1.5">
                {Icons.eye}
                {views}
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

          <Button
            size="icon"
            variant="ghost"
            onClick={onPinClick}
            className={`shrink-0 size-4 text-muted-foreground hover:text-foreground hover:bg-none ${
              pinned ? "text-foreground" : ""
            }`}
          >
            {Icons.pin}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
