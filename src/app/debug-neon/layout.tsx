import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'デバッグ - ネオンテキスト',
  description: 'ネオンテキストのデバッグページ',
  robots: 'noindex, nofollow'
};

export default function DebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}