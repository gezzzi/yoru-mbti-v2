import { ReactNode } from 'react';
import MobileInterstitialScript from '@/components/MobileInterstitialScript';

export default function CompatibilityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MobileInterstitialScript />
    </>
  );
}
