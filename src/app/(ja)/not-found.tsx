import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">404 Not Found</p>
        <h1 className="text-4xl md:text-5xl font-bold">お探しのページは夜空に溶けてしまいました</h1>
        <p className="text-base md:text-lg text-white/80">
          URLが間違っているか、ページが移動・削除された可能性があります。
          下のリンクから診断やトップページに戻ってください。
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/"
            className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            ホームへ戻る
          </Link>
          <Link
            href="/test"
            className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            性格診断を受ける
          </Link>
          <Link
            href="/compatibility"
            className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            相性診断を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
