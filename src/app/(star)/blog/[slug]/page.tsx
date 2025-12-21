import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronLeft, User, Clock } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs } from '@/utils/blogUtils';
import BlogContent from '@/components/blog/BlogContent';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません | 夜の性格診断',
    };
  }

  return {
    title: `${post.title} | 夜の性格診断`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen text-purple-50 font-serif relative w-full">
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141e30]/50 to-[#141e30] z-20"></div>
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-60"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-indigo-900/30" />
          )}
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-30 text-center">
            <div className="mb-4 text-purple-300/80 tracking-[0.3em] uppercase text-sm font-sans flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500/50"></span>
              {post.readTime}
              <span className="w-8 h-px bg-purple-500/50"></span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-200 drop-shadow-lg mb-8 max-w-4xl leading-tight">
              {post.title}
            </h1>
            <div className="flex gap-4 font-sans text-sm text-purple-300/60">
              <span className="flex items-center gap-2">
                <User size={14} /> {post.author}
              </span>
              <span>&bull;</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-6 pb-24 relative">
          {/* Back Link */}
          <Link
            href="/blog"
            className="absolute top-[-3rem] left-6 text-purple-300/50 hover:text-white transition-colors flex items-center gap-2 font-sans text-sm z-40"
          >
            <ChevronLeft size={16} /> Back
          </Link>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg prose-p:text-purple-100/70 prose-headings:text-purple-100 prose-headings:font-serif prose-a:text-purple-300 prose-strong:text-white/90 font-sans tracking-wide leading-loose max-w-none">
            <BlogContent content={post.content} />
          </div>

          {/* Tags */}
          <div className="mt-20 flex justify-center">
            <div className="flex gap-3 flex-wrap justify-center">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="px-6 py-2 rounded-full border border-purple-500/30 text-purple-300 bg-purple-900/10 backdrop-blur text-sm hover:bg-purple-500/20 transition-colors cursor-pointer"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

