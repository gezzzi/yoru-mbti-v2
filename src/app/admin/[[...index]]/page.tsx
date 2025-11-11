import type { Metadata } from "next";

import { Studio } from "./Studio";
import { isSanityConfigured } from "@/utils/sanityClient";

export const metadata: Metadata = {
  title: "Sanity Studio | 夜の性格診断",
  description: "ブログ記事を管理するための Sanity Studio",
};

export default function AdminStudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-slate-950 px-6 py-12 text-center text-white">
        <p className="text-lg font-semibold">Sanity の環境変数が設定されていません。</p>
        <p className="text-sm opacity-80">
          NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET を .env.local に追加してからアクセスしてください。
        </p>
      </div>
    );
  }

  return <Studio />;
}
