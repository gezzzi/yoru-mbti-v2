import type { CSSProperties } from "react";
import Link from "next/link";
import { TestTube, FileText, HeartHandshake, ArrowRight } from "lucide-react";

interface TestFlowReminderProps {
  title: string;
  description: string;
  highlightStep?: 1 | 2 | 3;
}

const steps = [
  {
    id: 1 as const,
    title: "性格診断テストを受ける",
    description: "約5分で完了する診断を受けて、あなたの夜のタイプを知りましょう。",
    href: "/test",
    Icon: TestTube,
  },
  {
    id: 2 as const,
    title: "診断結果を表示",
    description: "診断結果ページで、詳細なプロフィールやおすすめの過ごし方をチェックできます。",
    href: "/results",
    Icon: FileText,
  },
  {
    id: 3 as const,
    title: "相性診断を受ける",
    description: "自分と気になる相手の診断結果を組み合わせて、相性を確認しましょう。",
    href: "/compatibility",
    Icon: HeartHandshake,
  },
];

export default function TestFlowReminder({
  title,
  description,
  highlightStep,
}: TestFlowReminderProps) {
  const titleLetters = Array.from(title);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-6 pt-24 pb-16 text-white animate-fadeIn">
      <div className="max-w-3xl w-full space-y-10 md:space-y-8">
        <div className="text-center space-y-3 md:space-y-2 md:-translate-y-16 md:transform">
          <p className="text-base uppercase tracking-[0.35em] text-white/50 animate-fadeInJump">
            Heads up
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-pink-300">
            <span className="sr-only">{title}</span>
            {titleLetters.map((char, index) => (
              <span
                aria-hidden="true"
                className="fade-in-letter"
                style={{ animationDelay: `${index * 0.05}s` }}
                key={`${char}-${index}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-white/75 leading-relaxed">{description}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(({ id, title: stepTitle, description: stepDescription, href, Icon }) => {
            const isHighlighted = highlightStep === id;
            const isPrimaryStep = id === 1;
            const delayStyle: CSSProperties = { animationDelay: `${0.2 * id}s` };
            const content = (
              <div
                className={`group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.08] p-6 transition-transform duration-300 ${
                  isHighlighted ? "ring-2 ring-pink-400/80 shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:-translate-y-1 hover:bg-white/[0.12] cursor-pointer" : "cursor-default"
                } ${isPrimaryStep ? "pb-24" : ""} animate-fadeIn`}
                style={delayStyle}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.15] ${isHighlighted ? "bg-pink-500/20" : ""}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-white/70">STEP {id}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">{stepTitle}</h2>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{stepDescription}</p>
                {isPrimaryStep && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(236,72,153,0.45)]"
                  >
                    <span>タップして診断開始</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );

            if (id === 1) {
              return (
                <Link key={id} href={href} className="block">
                  {content}
                </Link>
              );
            }

            return (
              <div key={id} className="block">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
