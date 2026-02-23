import type { ReactNode } from 'react';
import ResultsLayout from '@/app/(ja)/(results)/results/layout';

export default function CompatibilityResultsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <ResultsLayout>{children}</ResultsLayout>;
}
