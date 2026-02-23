"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function EnGlobalError({
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
        <h1 className="text-4xl md:text-5xl font-bold">Adjusting the Night Sky</h1>
        <p className="text-base md:text-lg text-white/80">
          An unexpected error occurred. Please reload the page or try again later.
          If the issue persists, please contact us.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Try Again
          </button>
          <Link
            href="/en"
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Back to Home
          </Link>
          <Link
            href="/en/contact"
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Contact Us
          </Link>
        </div>

        {error?.digest && (
          <p className="text-xs text-white/50">Error code: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
