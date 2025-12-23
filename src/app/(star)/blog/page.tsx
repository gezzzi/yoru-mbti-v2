import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllPosts } from '@/utils/blogUtils';
import NeonText from '@/components/NeonText';
import BlogPostsList from '@/components/BlogPostsList';

export const metadata: Metadata = {
  title: 'ブログ | 夜の性格診断',
  description: '夜の性格診断に関する記事やコラムをお届けします。',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen text-white relative overflow-hidden w-full">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 pt-24 select-none">
            <NeonText text="夜ブログ" />
          </h1>
        </header>

        {/* Posts List with Filter & Sort */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-xl sm:text-2xl">まだ記事がありません。</p>
          </div>
        ) : (
          <Suspense fallback={<div className="text-center py-20 text-white/60">読み込み中...</div>}>
            <BlogPostsList posts={posts} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

