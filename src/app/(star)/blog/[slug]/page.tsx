import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPortableText } from "@/components/blog/BlogPortableText";
import { fetchBlogPostBySlug, fetchBlogPostSlugs } from "@/utils/blogService";
import { isSanityConfigured } from "@/utils/sanityClient";
import { urlForImage } from "@/utils/sanityImage";

interface BlogDetailPageProps {
  params: { slug: string };
}

const formatDate = (input?: string) => {
  if (!input) return "未公開";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(input));
};

export const revalidate = 60;

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];

  const slugs = await fetchBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  if (!isSanityConfigured) {
    return {
      title: "ブログ | 夜の性格診断",
    };
  }

  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "記事が見つかりませんでした | 夜の性格診断",
    };
  }

  const title = `${post.title} | 夜の性格診断`;
  const description = post.excerpt || "夜の性格診断ブログ";
  const ogImage = urlForImage(post.thumbnail)?.width(1200).height(630).url();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      type: "article",
    },
    alternates: {
      canonical: `https://nightpersonality.com/blog/${params.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
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

  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const heroImage = urlForImage(post.thumbnail)?.width(1800).height(1000).fit("crop").url();

  return (
    <article className="w-full px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200">BLOG</p>
          <h1 className="text-4xl font-semibold leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
            <span>{formatDate(post.publishedAt)}</span>
            {post.author && (
              <span className="text-slate-200">{post.author.name}</span>
            )}
          </div>
          {post.tags?.length ? (
            <div className="flex flex-wrap justify-center gap-2 text-xs text-purple-100">
              {post.tags.map((tag) => (
                <span key={tag._id} className="rounded-full border border-purple-400/40 px-3 py-1">
                  #{tag.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {heroImage && (
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={heroImage}
              alt={post.title}
              width={1800}
              height={1000}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-8 rounded-3xl border border-white/10 bg-slate-900/60 px-8 py-10">
          {post.excerpt && (
            <p className="text-lg font-medium text-slate-100">{post.excerpt}</p>
          )}
          <BlogPortableText value={post.content} />
        </div>
      </div>
    </article>
  );
}
