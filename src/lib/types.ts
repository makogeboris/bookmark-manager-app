import { ReactNode } from "react";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string | null;
}

export interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  body: string;
  stars: number;
}

export interface Step {
  step: string;
  title: string;
  desc: string;
}
