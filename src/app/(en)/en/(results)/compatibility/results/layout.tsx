import type { ReactNode } from 'react';
import EnResultsLayout from '@/app/(en)/en/(results)/results/layout';

export default function EnCompatibilityResultsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <EnResultsLayout>{children}</EnResultsLayout>;
}
