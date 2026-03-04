import { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllEnPosts } from '@/utils/enBlogUtils';
import NeonText from '@/components/NeonText';
import BlogPostsList from '@/components/BlogPostsList';

export const metadata: Metadata = {
  title: 'Intimate Personality & Relationship Blog | Night Personality Test',
  description: 'Expert articles on intimate personality types, couple compatibility, bedroom communication, and relationship improvement tips. Discover how your personality affects your love life.',
  keywords: 'intimate personality blog, relationship advice, couple compatibility tips, bedroom personality articles, love style guide, romantic personality insights',
  openGraph: {
    title: 'Intimate Personality & Relationship Blog | Night Personality',
    description: 'Expert articles on intimate personality types, couple compatibility, and relationship improvement tips.',
    url: 'https://nightpersonality.com/en/blog',
    siteName: 'Night Personality Test',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nightpersonality.com/en/blog',
    languages: {
      'ja': 'https://nightpersonality.com/blog',
      'en': 'https://nightpersonality.com/en/blog',
    },
  },
};

export default function EnBlogPage() {
  const posts = getAllEnPosts();

  return (
    <div className="min-h-screen text-white relative overflow-hidden w-full">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 pt-24 select-none">
            <NeonText text="Blog" />
          </h1>
        </header>

        {/* Posts List with Filter & Sort */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-xl sm:text-2xl">No articles yet.</p>
          </div>
        ) : (
          <Suspense fallback={<div className="text-center py-20 text-white/60">Loading...</div>}>
            <BlogPostsList posts={posts} basePath="/en/blog" />
          </Suspense>
        )}
      </div>
    </div>
  );
}
