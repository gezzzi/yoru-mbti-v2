import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, User, Clock } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts } from '@/utils/blogUtils';
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
  const { prev, next } = getAdjacentPosts(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen text-white relative w-full">
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
            <div className="mb-4 text-pink-200/80 tracking-[0.3em] uppercase text-sm flex items-center gap-3">
              <span className="w-8 h-px bg-pink-300/50"></span>
              {post.readTime}
              <span className="w-8 h-px bg-pink-300/50"></span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-pink-200 drop-shadow-lg mb-8 max-w-4xl leading-tight">
              {post.title}
            </h1>
            <div className="flex gap-4 text-sm text-white/80">
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
            className="absolute top-[-3rem] left-6 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm z-40"
          >
            <ChevronLeft size={16} /> 戻る
          </Link>

          {/* Article Content */}
          <div className="text-white text-xl sm:text-2xl leading-relaxed [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:font-semibold [&_h1]:text-pink-200 [&_h1]:mt-16 [&_h1]:mb-8 [&_h2]:text-3xl [&_h2]:sm:text-4xl [&_h2]:font-semibold [&_h2]:text-pink-200 [&_h2]:mt-20 [&_h2]:mb-6 [&_h3]:text-2xl [&_h3]:sm:text-3xl [&_h3]:font-semibold [&_h3]:text-pink-200 [&_h3]:mt-10 [&_h3]:mb-4 [&_a]:text-pink-300 [&_a]:underline [&_strong]:text-white [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:text-white [&_p]:text-white [&_p]:mb-6">
            <BlogContent content={post.content} />
          </div>

          {/* Tags */}
          <div className="mt-20 flex justify-center">
            <div className="flex gap-3 flex-wrap justify-center">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-6 py-2 rounded-full border border-pink-300/30 text-pink-200 bg-pink-900/10 backdrop-blur text-sm hover:bg-pink-500/20 transition-colors cursor-pointer"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-16 flex justify-between items-stretch gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 group bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <ChevronLeft size={16} />
                  <span>前の記事</span>
                </div>
                <p className="text-white font-semibold text-lg group-hover:text-pink-200 transition-colors line-clamp-2">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="flex-1 group bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all text-right"
              >
                <div className="flex items-center justify-end gap-2 text-white/70 text-sm mb-2">
                  <span>次の記事</span>
                  <ChevronRight size={16} />
                </div>
                <p className="text-white font-semibold text-lg group-hover:text-pink-200 transition-colors line-clamp-2">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Back to Blog List */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={16} />
              <span>記事一覧に戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

