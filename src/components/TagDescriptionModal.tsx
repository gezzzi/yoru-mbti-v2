'use client';

import React from 'react';
import { X } from 'lucide-react';

interface TagDescriptionModalProps {
  tag: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TagDescriptionModal: React.FC<TagDescriptionModalProps> = ({ 
  tag, 
  description, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-900/95 rounded-2xl p-6 max-w-sm w-full border border-white/20 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[#e0e7ff] flex-1 text-center pr-5">{tag}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[#e0e7ff]/80 text-base leading-relaxed text-center">
          {description}
        </p>
      </div>
    </div>
  );
};