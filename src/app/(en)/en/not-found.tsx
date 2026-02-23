import Link from "next/link";

export default function EnNotFound() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">404 Not Found</p>
        <h1 className="text-4xl md:text-5xl font-bold">This page has dissolved into the night sky</h1>
        <p className="text-base md:text-lg text-white/80">
          The URL may be incorrect, or the page may have been moved or deleted.
          Please use the links below to navigate back.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/en"
            className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Home
          </Link>
          <Link
            href="/en/test"
            className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Take the Test
          </Link>
          <Link
            href="/en/compatibility"
            className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Compatibility Test
          </Link>
        </div>
      </div>
    </div>
  );
}
