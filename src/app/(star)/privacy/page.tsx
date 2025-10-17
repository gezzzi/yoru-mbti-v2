import type { Metadata } from 'next'
import PrivacyPage from '@/components/PrivacyPage'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 夜の性格診断',
  description: '夜の性格診断のプライバシーポリシーです。個人情報の取り扱いについて説明しています。',
}

export default function Privacy() {
  return <PrivacyPage />
}