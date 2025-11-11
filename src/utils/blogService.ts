import type { BlogPost, BlogPostPreview } from "@/types/blog";
import { sanityClient } from "@/utils/sanityClient";
import {
  blogPostBySlugQuery,
  blogPostListQuery,
  blogPostSlugsQuery,
} from "@/utils/sanityQueries";

export async function fetchBlogPosts(): Promise<BlogPostPreview[]> {
  if (!sanityClient) return [];

  return sanityClient.fetch<BlogPostPreview[]>(blogPostListQuery);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) return null;

  return sanityClient.fetch<BlogPost | null>(blogPostBySlugQuery, { slug });
}

export async function fetchBlogPostSlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  const result = await sanityClient.fetch<{ slug: string }[]>(blogPostSlugsQuery);
  return result.map((entry) => entry.slug).filter(Boolean);
}
