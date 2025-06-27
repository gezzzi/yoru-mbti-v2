import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from '@/components/NavigationWrapper';

export const metadata: Metadata = {
  title: "夜の性格診断",
  description: "あなたの隠された夜の性格を診断します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-white">
          <NavigationWrapper />
          {children}
        </div>
      </body>
    </html>
  );
} 