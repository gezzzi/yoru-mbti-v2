import React from 'react';
import { personalityTypes, getCategoryColor, getCategoryName } from '../data/personalityTypes';
import { PersonalityType } from '../types/personality';

interface PersonalityGridProps {
  onShowTypes?: () => void;
}

const PersonalityGrid: React.FC<PersonalityGridProps> = ({ onShowTypes }) => {
  const categories = {
    dom: personalityTypes.filter(type => type.category === 'dom'),
    sub: personalityTypes.filter(type => type.category === 'sub'),
    introvert: personalityTypes.filter(type => type.category === 'introvert'),
    fantasy: personalityTypes.filter(type => type.category === 'fantasy')
  };

  const renderTypeCard = (type: PersonalityType) => (
    <div
      key={type.code}
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(type.category)} rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform`}>
          {type.emoji}
        </div>
        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          {type.code}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{type.name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{type.description}</p>
      
      <div className="flex flex-wrap gap-1">
        {type.traits.slice(0, 3).map((trait, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
          >
            {trait}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-full border border-gray-200 mb-6">
            <span className="text-sm font-medium text-gray-700">16のパーソナリティタイプ</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            あなたはどのタイプ？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            4つのカテゴリーに分かれた16の独特なパーソナリティタイプから、あなたの真の姿を発見してください。
          </p>
          
          {onShowTypes && (
            <button
              onClick={onShowTypes}
              className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              すべてのタイプを見る
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <div className="space-y-16">
          {Object.entries(categories).map(([categoryKey, types]) => (
            <div key={categoryKey}>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className={`w-1 h-8 bg-gradient-to-b ${getCategoryColor(categoryKey as PersonalityType['category'])} rounded mr-4`}></div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {getCategoryName(categoryKey as PersonalityType['category'])}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {types.map(renderTypeCard)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityGrid;