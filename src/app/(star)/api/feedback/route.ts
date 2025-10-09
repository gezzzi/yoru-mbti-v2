import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.FEEDBACK_TO!;
const FROM = process.env.FEEDBACK_FROM!;

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'メッセージは必須です' }, { status: 400 });
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: 'ユーザーフィードバック',
      text: message,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'メール送信に失敗しました' }, { status: 500 });
  }
}
