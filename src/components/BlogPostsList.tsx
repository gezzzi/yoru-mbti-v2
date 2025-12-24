'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X } from 'lucide-react';
import { BlogPostMeta } from '@/types/blog';

interface BlogPostsListProps {
  posts: BlogPostMeta[];
}

type SortOrder = 'newest' | 'oldest';

export default function BlogPostsList({ posts }: BlogPostsListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tagFromUrl = searchParams.get('tag');
  
  const [selectedTag, setSelectedTag] = useState<string | null>(tagFromUrl);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [centeredSlug, setCenteredSlug] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 中央のカードを検出（横スクロール用）
  useEffect(() => {
    if (!isMobile) {
      setCenteredSlug(null);
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.left + containerRect.width / 2;
      let closestSlug: string | null = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((element, slug) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSlug = slug;
          }
        }
      });

      setCenteredSlug(closestSlug);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // URLパラメータが変更されたら状態を更新
  useEffect(() => {
    setSelectedTag(tagFromUrl);
  }, [tagFromUrl]);

  // カードの参照を設定するコールバック
  const setCardRef = useCallback((slug: string) => (el: HTMLAnchorElement | null) => {
    if (el) {
      cardRefs.current.set(slug, el);
    } else {
      cardRefs.current.delete(slug);
    }
  }, []);

  // タグ選択時にURLも更新
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`, { scroll: false });
    } else {
      router.push('/blog', { scroll: false });
    }
  };

  // 全タグを抽出（重複なし）
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // フィルタリング＆ソート
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // タグフィルター
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // ソート
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, selectedTag, sortOrder]);

  return (
    <div>
      {/* Filter & Sort Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Tag Filter */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-pink-300/30 rounded-lg text-white hover:bg-white/20 transition-all"
          >
            <span>{selectedTag ? `タグ: ${selectedTag}` : 'タグで絞り込み'}</span>
            <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 max-h-64 overflow-y-auto bg-slate-800 border border-pink-300/30 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  handleTagSelect(null);
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors ${
                  !selectedTag ? 'bg-pink-500/20 text-pink-200' : ''
                }`}
              >
                すべて表示
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    handleTagSelect(tag);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors ${
                    selectedTag === tag ? 'bg-pink-500/20 text-pink-200' : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">並び替え:</span>
          <button
            onClick={() => setSortOrder('newest')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              sortOrder === 'newest'
                ? 'bg-pink-500/30 text-pink-200 border border-pink-300/50'
                : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
            }`}
          >
            新しい順
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              sortOrder === 'oldest'
                ? 'bg-pink-500/30 text-pink-200 border border-pink-300/50'
                : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
            }`}
          >
            古い順
          </button>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-white/60 text-sm mb-6">
        {filteredPosts.length}件の記事
      </p>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/60 text-xl sm:text-2xl">該当する記事がありません。</p>
          <button
            onClick={() => handleTagSelect(null)}
            className="mt-4 px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
          >
            フィルターをクリア
          </button>
        </div>
      ) : isMobile ? (
        <>
          {/* Mobile: Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 -mx-6 px-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredPosts.map((post) => {
              const isCentered = centeredSlug === post.slug;
              return (
                <Link
                  key={post.slug}
                  ref={setCardRef(post.slug)}
                  href={`/blog/${post.slug}`}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 block flex-shrink-0 w-[85vw] snap-center ${
                    isCentered ? 'scale-105' : 'scale-95 opacity-70'
                  }`}
                >
                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141e30] to-transparent z-10 opacity-80"></div>
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-900/50 to-indigo-900/50" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-20 -mt-10">
                    {/* Tags */}
                    <div className="flex gap-2 mb-3 flex-wrap relative z-30">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleTagSelect(tag);
                          }}
                          className="text-[10px] uppercase tracking-widest text-pink-200 border border-pink-300/30 px-2 py-1 rounded-sm bg-[#141e30]/50 hover:bg-pink-500/20 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold mb-2 text-white leading-tight drop-shadow-md">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-3">
                      <span>{post.date}</span>
                      <span className="text-pink-200">
                        続きを読む →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile: Scroll Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  centeredSlug === post.slug
                    ? 'w-6 bg-pink-400'
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        /* Desktop: Single Column Layout */
        <div className="flex flex-col gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 block hover:-translate-y-1 hover:bg-white/15 hover:border-white/30"
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#141e30] to-transparent z-10 opacity-80"></div>
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-900/50 to-indigo-900/50" />
                )}
              </div>

              {/* Content */}
              <div className="p-6 relative z-20 -mt-8">
                {/* Tags */}
                <div className="flex gap-2 mb-3 flex-wrap relative z-30">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleTagSelect(tag);
                      }}
                      className="text-[10px] uppercase tracking-widest text-pink-200 border border-pink-300/30 px-2 py-1 rounded-sm bg-[#141e30]/50 hover:bg-pink-500/20 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors leading-tight drop-shadow-md">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-white/70 text-base leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-white/60 border-t border-white/10 pt-3">
                  <span>{post.date}</span>
                  <span className="group-hover:translate-x-1 transition-transform text-pink-200">
                    続きを読む →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

