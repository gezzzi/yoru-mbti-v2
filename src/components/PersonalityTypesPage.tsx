'use client';

import { personalityTypes, getCategoryColor, getCategoryName } from '@/data/personalityTypes';
import { PersonalityType } from '@/types/personality';

export default function PersonalityTypesPage() {
  const categories = ['dom', 'sub', 'introvert', 'fantasy'] as const;

  const renderPersonalityType = (type: PersonalityType) => (
    <div key={type.code} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getCategoryColor(type.category)} p-6 text-white`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{type.emoji}</span>
          <div>
            <h3 className="text-2xl font-bold">{type.name}</h3>
            <p className="text-lg opacity-90">{type.code}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 leading-relaxed">
          {type.description}
        </p>

        {/* Traits */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">主な特徴</h4>
          <div className="flex flex-wrap gap-2">
            {type.traits.map((trait, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${getCategoryColor(type.category)} text-white`}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Compatibility */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">相性の良いタイプ</h4>
          <div className="flex flex-wrap gap-2">
            {type.compatibility.map((compat, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800 border border-pink-200"
              >
                {compat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            16の性格タイプ詳細
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            各タイプの詳細な特徴と相性を確認して、自分や相手への理解を深めましょう。
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const categoryTypes = personalityTypes.filter(type => type.category === category);
          
          return (
            <div key={category} className="mb-16">
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(category)} rounded-2xl p-8 mb-8 text-white`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {getCategoryName(category)}
                </h2>
                <p className="text-xl opacity-90">
                  {category === 'dom' && '主導権を握り、相手をリードすることを好むタイプ。積極的で支配的な傾向があります。'}
                  {category === 'sub' && '受け身で、相手に従うことを好むタイプ。協調的で従属的な傾向があります。'}
                  {category === 'introvert' && '内向的で控えめなタイプ。静かで深く考える傾向があります。'}
                  {category === 'fantasy' && '妄想的で現実逃避の傾向があるタイプ。想像力豊かで独自の世界を持ちます。'}
                </p>
              </div>

              {/* Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryTypes.map(renderPersonalityType)}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            自分のタイプを知りたい？
          </h3>
          <p className="text-gray-600 mb-6">
            診断テストを受けて、あなたの本当の性格タイプを発見しましょう。
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            診断テストを受ける
          </a>
        </div>
      </div>
    </div>
  );
} 