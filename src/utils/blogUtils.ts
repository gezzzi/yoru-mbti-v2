import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * MDファイルから全ブログ記事のメタデータを取得
 */
export function getAllPosts(): BlogPostMeta[] {
  // ディレクトリが存在しない場合は空配列を返す
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
        author: data.author || '匿名',
        date: data.date || '',
        readTime: data.readTime || '5分で読了',
        tags: data.tags || [],
        imageUrl: data.imageUrl,
      } as BlogPostMeta;
    });

  // 日付順でソート（新しい順）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

/**
 * 特定のslugからブログ記事の詳細を取得
 */
export function getPostBySlug(slug: string): BlogPost | null {
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
    author: data.author || '匿名',
    date: data.date || '',
    readTime: data.readTime || '5分で読了',
    tags: data.tags || [],
    imageUrl: data.imageUrl,
  };
}

/**
 * 全ブログ記事のslugを取得（静的生成用）
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * 前後の記事を取得
 */
export function getAdjacentPosts(currentSlug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // allPostsは新しい順にソートされているので、
  // prev = より新しい記事（currentIndex - 1）
  // next = より古い記事（currentIndex + 1）
  const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { prev, next };
}

