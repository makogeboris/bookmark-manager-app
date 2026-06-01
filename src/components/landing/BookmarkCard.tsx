"use client";

import { useState, useEffect, useRef } from "react";
import { Icons } from "../shared/Icons";
import { Bookmark } from "@/lib/types";
import Image from "next/image";

interface BookmarkCardProps {
  bookmark: Bookmark;
  index: number;
}

export function BookmarkCard({ bookmark, index }: BookmarkCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="border-border bg-card group card-shadow rounded-xl border p-4 transition-all duration-700 hover:scale-[1.02] hover:shadow-lg"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="border-accent flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-xs border bg-transparent">
            <Image
              width={20}
              height={20}
              src={bookmark.favicon}
              alt=""
              className="size-6 rounded-xs"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <p className="text-foreground text-sm leading-tight font-semibold">
              {bookmark.title}
            </p>
            <p className="text-muted-foreground text-xs">{bookmark.url}</p>
          </div>
        </div>
        <button
          className="text-muted-foreground rounded p-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="More options"
        >
          {Icons.dots}
        </button>
      </div>

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className="bg-accent text-muted-foreground rounded-xs px-1.5 py-0.5 text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="text-muted-foreground flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1">
          {Icons.eye}
          {bookmark.views}
        </span>
        <span className="flex items-center gap-1">
          {Icons.clock}
          23 Sep
        </span>
      </div>
    </div>
  );
}
