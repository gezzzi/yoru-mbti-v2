import type { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: '運営者情報 | 夜の性格診断8',
  description: '夜の性格診断8の運営者情報です。サイト概要と運営者についての情報を掲載しています。',
}

export default function About() {
  return <AboutPage />
}