"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">500 Error</p>
        <h1 className="text-4xl md:text-5xl font-bold">ただいま星空を調整しています</h1>
        <p className="text-base md:text-lg text-white/80">
          予期しないエラーが発生しました。ページを再読み込みするか、少し時間をおいてから再度アクセスしてください。
          続くようであれば、お手数ですがお問い合わせください。
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            もう一度試す
          </button>
          <Link
            href="/"
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            ホームへ戻る
          </Link>
          <Link
            href="/contact"
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            お問い合わせ
          </Link>
        </div>

        {error?.digest && (
          <p className="text-xs text-white/50">エラーコード: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
