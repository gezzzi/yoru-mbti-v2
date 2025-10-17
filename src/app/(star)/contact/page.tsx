import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'お問い合わせ | 夜の性格診断',
  description: '夜の性格診断へのお問い合わせページです。ご質問やご意見をお寄せください。',
}

export default function Contact() {
  return <ContactPage />
}