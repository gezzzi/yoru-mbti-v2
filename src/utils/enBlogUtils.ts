import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog-en');

/**
 * Get all English blog post metadata from MD files
 */
export function getAllEnPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        author: data.author || 'Night Personality Test',
        date: data.date || '',
        readTime: data.readTime || '5 min read',
        tags: data.tags || [],
        imageUrl: data.imageUrl,
      } as BlogPostMeta;
    });

  // Sort by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

/**
 * Get a specific English blog post by slug
 */
export function getEnPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    content,
    author: data.author || 'Night Personality Test',
    date: data.date || '',
    readTime: data.readTime || '5 min read',
    tags: data.tags || [],
    imageUrl: data.imageUrl,
  };
}

/**
 * Get all English blog post slugs (for static generation)
 */
export function getAllEnPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * Get adjacent (previous/next) English blog posts
 */
export function getAdjacentEnPosts(currentSlug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const allPosts = getAllEnPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // allPosts is sorted newest first, so:
  // prev = newer article (currentIndex - 1)
  // next = older article (currentIndex + 1)
  const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prev, next };
}
