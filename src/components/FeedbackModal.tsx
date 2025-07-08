"use client";
import React, { useState, FormEvent } from "react";

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDone(false);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email }),
      });
      if (res.ok) {
        setDone(true);
        setMessage("");
        setEmail("");
      } else {
        setError("送信に失敗しました。しばらくしてから再度お試しください。");
      }
    } catch {
      setError("送信に失敗しました。ネットワークをご確認ください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="閉じる"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">フィードバック</h2>
        {done ? (
          <div className="text-green-600 text-center py-8 font-bold">送信ありがとうございました！</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full border rounded p-2 min-h-[100px]"
              placeholder="ご意見・ご感想・不具合報告など自由にお書きください"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
            <input
              className="w-full border rounded p-2"
              type="email"
              placeholder="メールアドレス（任意）"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white rounded px-4 py-2 w-full font-bold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "送信中..." : "送信"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
