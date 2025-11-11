import Image from "next/image";
import Link from "next/link";

import type { BlogPostPreview } from "@/types/blog";
import { urlForImage } from "@/utils/sanityImage";

const formatDate = (input?: string) => {
  if (!input) return "未公開";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(input));
};

export function BlogCard({ post }: { post: BlogPostPreview }) {
  const imageUrl = urlForImage(post.thumbnail)
    ?.width(1200)
    .height(800)
    .fit("crop")
    .quality(80)
    .url();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur"
    >
      {imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 400px, 100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-300">
          <span>{formatDate(post.publishedAt)}</span>
          {post.tags?.length ? (
            <span className="inline-flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="rounded-full bg-purple-900/60 px-2 py-0.5 text-[11px] text-purple-100"
                >
                  {tag.title}
                </span>
              ))}
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-purple-200">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
          )}
        </div>

        {post.author && (
          <div className="mt-auto text-sm text-slate-400">
            {post.author.name}
            {post.author.role ? ` ・ ${post.author.role}` : ""}
          </div>
        )}
      </div>
    </Link>
  );
}
