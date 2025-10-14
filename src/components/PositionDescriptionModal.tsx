'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Position48 } from '../data/positions48';

interface PositionDescriptionModalProps {
  position: Position48 | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PositionDescriptionModal: React.FC<PositionDescriptionModalProps> = ({ position, isOpen, onClose }) => {
  if (!isOpen || !position) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const difficultyHearts = position.difficulty === 'easy'
    ? '♥♡♡'
    : position.difficulty === 'medium'
      ? '♥♥♡'
      : '♥♥♥';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <p className="text-xs text-white/70 tracking-wider mb-1">{position.kana}</p>
          <h3 className="text-2xl font-bold text-white mb-4">{position.name}</h3>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
              No.{position.id}
            </span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/90">
              難易度: {difficultyHearts}
            </span>
          </div>

          <p className="text-white/90 text-base leading-relaxed mb-4">
            {position.description || '説明が準備中です。'}
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {position.moods.map(mood => {
              const moodLabels = {
                'romantic': 'ロマンチック',
                'wild': 'ワイルド',
                'playful': 'プレイフル',
                'technical': 'テクニカル',
                'foreplay': '愛撫'
              };
              const moodColors = {
                'romantic': 'bg-pink-500/30 border-pink-400 text-pink-200',
                'wild': 'bg-red-500/30 border-red-400 text-red-200',
                'playful': 'bg-yellow-500/30 border-yellow-400 text-yellow-200',
                'technical': 'bg-purple-500/30 border-purple-400 text-purple-200',
                'foreplay': 'bg-blue-500/30 border-blue-400 text-blue-200'
              };
              return (
                <span
                  key={mood}
                  className={`px-3 py-1 text-xs rounded-full border ${moodColors[mood]}`}
                >
                  {moodLabels[mood]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
