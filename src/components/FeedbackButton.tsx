"use client";
import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg px-5 py-3 font-bold text-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        style={{ boxShadow: "0 4px 24px 0 rgba(236,72,153,0.2)" }}
        aria-label="フィードバックを送る"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-5.4-1.9L3 21l1.9-4.1A8.38 8.38 0 0 1 3 11.5a8.5 8.5 0 0 1 3.1-6.6A8.38 8.38 0 0 1 11.5 3h1A8.5 8.5 0 0 1 21 11.5Z"></path></svg>
        フィードバック
      </button>
      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}
