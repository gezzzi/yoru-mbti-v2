import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/utils/blogUtils';
import NeonText from '@/components/NeonText';

export const metadata: Metadata = {
  title: 'ブログ | 夜の性格診断',
  description: '夜の性格診断に関する記事やコラムをお届けします。',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen text-indigo-100 font-serif relative overflow-hidden w-full">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 pt-24 select-none">
            <NeonText text="夜ブログ" />
          </h1>
        </header>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-300/60 text-lg">まだ記事がありません。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:-translate-y-1"
              >
                {/* Image */}
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] to-transparent z-10 opacity-80"></div>
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50" />
                  )}
                </div>

                {/* Content */}
                <div className="p-8 relative z-20 -mt-12">
                  {/* Tags */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest text-purple-300 border border-purple-500/30 px-2 py-1 rounded-sm bg-[#1a0b2e]/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-serif text-purple-50 mb-3 group-hover:text-white transition-colors leading-tight drop-shadow-md">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-purple-200/60 text-sm font-sans leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-purple-400/50 uppercase tracking-widest font-sans border-t border-white/5 pt-4">
                    <span>{post.date}</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

