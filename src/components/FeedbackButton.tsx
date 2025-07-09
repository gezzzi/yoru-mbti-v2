"use client";
import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 via-blue-400 to-green-400 text-white shadow-xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 flex items-center justify-center text-2xl overflow-hidden"
        style={{ 
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
        }}
        aria-label="フィードバックを送る"
      >
        <svg className="relative z-10 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}