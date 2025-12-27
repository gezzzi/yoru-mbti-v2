import { Metadata } from "next";

export const metadata: Metadata = {
  title: "夜の性格診断8｜質問に答えて性格・セックス相性をチェック",
  description: "40個の質問に答えて、あなたの夜の性格タイプを診断。パートナーとの相性もチェックできます。匿名・無料で利用可能。",
  openGraph: {
    title: "夜の性格診断8｜質問に答えて性格・セックス相性をチェック",
    description: "40個の質問に答えて、あなたの夜の性格タイプを診断。パートナーとの相性もチェックできます。",
    url: "https://nightpersonality.com/test",
    siteName: "夜の性格診断8",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "夜の性格診断8｜質問に答えて性格・セックス相性をチェック",
    description: "40個の質問に答えて、あなたの夜の性格タイプを診断します。",
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
