import type { Metadata } from "next";

import { BlogCard } from "@/components/blog/BlogCard";
import { fetchBlogPosts } from "@/utils/blogService";
import { isSanityConfigured } from "@/utils/sanityClient";

export const metadata: Metadata = {
  title: "ブログ | 夜の性格診断",
  description: "診断コンテンツの活用方法やアップデート情報をお届けします",
};

export const revalidate = 60;

export default async function BlogPage() {
  if (!isSanityConfigured) {
    return (
      <section className="w-full px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-white/20 bg-slate-900/60 px-8 py-12">
          <p className="text-lg font-semibold">Sanity がまだ設定されていません。</p>
          <p className="mt-4 text-sm text-slate-300">
            NEXT_PUBLIC_SANITY_PROJECT_ID と NEXT_PUBLIC_SANITY_DATASET を設定し、Sanity プロジェクトを作成するとブログを公開できます。
          </p>
        </div>
      </section>
    );
  }

  const posts = await fetchBlogPosts();

  return (
    <section className="w-full px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200">BLOG</p>
          <h1 className="text-4xl font-semibold">星空のように広がる夜のトピック</h1>
          <p className="text-base text-slate-200">
            診断の活用アイデアやアップデート情報、制作の裏側を発信していきます。
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 px-8 py-16 text-center text-slate-300">
            まだ記事がありません。Sanity Studio から最初の記事を公開してください。
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
