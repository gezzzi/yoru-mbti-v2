import type { ReactNode } from 'react';
import ResultsLayout from '@/app/(results)/results/layout';

export default function CompatibilityResultsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ResultsLayout>{children}</ResultsLayout>;
}
