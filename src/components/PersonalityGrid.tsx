'use client';

import { personalityTypes, getCategoryColor, getCategoryName } from '@/data/personalityTypes';
import { ArrowRight } from 'lucide-react';

interface PersonalityGridProps {
  onShowTypes: () => void;
}

export default function PersonalityGrid({ onShowTypes }: PersonalityGridProps) {
  const categories = ['dom', 'sub', 'introvert', 'fantasy'] as const;

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            16の性格タイプ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            あなたはどのタイプに当てはまるでしょうか？各カテゴリーには4つのユニークな性格タイプがあります。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories.map((category) => {
            const categoryTypes = personalityTypes.filter(type => type.category === category);
            
            return (
              <div key={category} className="space-y-4">
                <div className={`p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} text-white text-center`}>
                  <h3 className="text-xl font-bold mb-2">
                    {getCategoryName(category)}
                  </h3>
                  <p className="text-sm opacity-90">
                    {category === 'dom' && '主導権を握りたいタイプ'}
                    {category === 'sub' && '受け身で従うタイプ'}
                    {category === 'introvert' && '内向的で控えめなタイプ'}
                    {category === 'fantasy' && '妄想的で逃避傾向のタイプ'}
                  </p>
                </div>

                <div className="space-y-3">
                  {categoryTypes.map((type) => (
                    <div 
                      key={type.code}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{type.emoji}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{type.name}</div>
                          <div className="text-xs text-gray-500">{type.code}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onShowTypes}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
          >
            すべてのタイプを詳しく見る
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
} 