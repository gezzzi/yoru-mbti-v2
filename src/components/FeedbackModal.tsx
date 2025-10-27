"use client";
import React, { useState, FormEvent } from "react";

const QUICK_OPTIONS = [
  { id: "ui-ux", label: "UI/UX" },
  { id: "performance", label: "パフォーマンス" },
  { id: "functionality", label: "機能性" },
  { id: "bug", label: "バグ報告" },
  { id: "other", label: "その他" }
];

const RATING_LABELS = [
  "とても悪い",
  "悪い", 
  "普通",
  "良い",
  "とても良い"
];

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    // バリデーション
    if (rating === 0) {
      setError("評価を選択してください。");
      return;
    }
    
    if (selectedCategories.length === 0) {
      setError("カテゴリを選択してください。");
      return;
    }
    
    if (message.trim() === "") {
      setError("詳細を入力してください。");
      return;
    }
    
    setLoading(true);
    setError("");
    setDone(false);
    try {
      let feedbackMessage = "";
      
      if (rating > 0) {
        feedbackMessage += `評価: ${rating}/5 (${RATING_LABELS[rating - 1]})\n`;
      }
      
      if (selectedCategories.length > 0) {
        feedbackMessage += `カテゴリ: ${selectedCategories.join(", ")}\n`;
      }
      
      if (feedbackMessage) {
        feedbackMessage += "\n";
      }
      
      feedbackMessage += message;
      
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: feedbackMessage }),
      });
      if (res.ok) {
        setDone(true);
        setMessage("");
        setRating(0);
        setSelectedCategories([]);
      } else {
        setError("送信に失敗しました。しばらくしてから再度お試しください。");
      }
    } catch {
      setError("送信に失敗しました。ネットワークをご確認ください。");
    } finally {
      setLoading(false);
    }
  }

  function toggleCategory(categoryId: string) {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-white p-5 flex justify-between items-center">
          <span className="font-semibold text-lg">フィードバックをお聞かせください</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-2xl"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* ボディ */}
        {done ? (
          <div className="text-center py-10 px-5">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="text-gray-800 text-lg font-medium">フィードバックを送信しました！</div>
            <div className="text-gray-500 text-sm mt-2">貴重なご意見をありがとうございます</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* 5段階評価 */}
            <div className="mb-5">
              <p className="text-gray-700 font-medium mb-3">アプリのご利用ありがとうございます！</p>
              <p className="text-gray-700 font-medium mb-3">総合的な満足度を教えてください</p>
              <div className="flex justify-center items-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`text-3xl font-bold transition-all duration-200 transform hover:scale-110 ${
                      star <= rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    onClick={() => {
                      setRating(star);
                      setError("");
                    }}
                    aria-label={`${star}つ星`}
                  >
                    ★
                  </button>
                ))}
              </div>

            </div>

            <p className="text-gray-700 font-medium mb-3">どの機能についてのフィードバックですか？</p>
            
            {/* クイックオプション */}
            <div className="flex flex-wrap gap-2 mb-5">
              {QUICK_OPTIONS.map(option => (
                <button
                  type="button"
                  key={option.id}
                  className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition-all duration-300 transform ${
                    selectedCategories.includes(option.id)
                      ? 'bg-blue-400 text-white border-blue-400 -translate-y-1 shadow-lg'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-400 hover:-translate-y-1 hover:shadow-md'
                  }`}
                  onClick={() => {
                    toggleCategory(option.id);
                    setError("");
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <p className="text-gray-700 font-medium mb-3">詳細や感想を自由にお書きください</p>
            <textarea
              className="w-full border-2 border-gray-300 rounded-lg p-3 min-h-[100px] text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:shadow-lg transition-all duration-300 resize-none"
              placeholder="使いやすさ、改善点、ご感想など"
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              required
            />
            
            {error && <div className="text-red-600 text-sm">{error}</div>}
            
            <button
              type="submit"
              className={`w-full rounded-lg py-3 font-semibold text-base transition-all duration-300 ${
                rating > 0 && selectedCategories.length > 0 && message.trim() !== "" && !loading
                  ? 'bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-white hover:-translate-y-1 hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={rating === 0 || selectedCategories.length === 0 || message.trim() === "" || loading}
            >
              {loading ? "送信中..." : "送信"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
