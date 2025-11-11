import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

export interface BlogAuthor {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: Image;
}

export interface BlogTag {
  _id: string;
  title: string;
  slug?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  thumbnail?: Image;
  content?: PortableTextBlock[];
  author?: BlogAuthor;
  tags?: BlogTag[];
}

export type BlogPostPreview = Omit<BlogPost, "content">;
