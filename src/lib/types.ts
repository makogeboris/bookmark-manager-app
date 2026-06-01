import { ReactNode } from "react";

export interface Bookmark {
  id: number;
  title: string;
  url: string;
  tags: string[];
  views: number;
  favicon: string;
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
