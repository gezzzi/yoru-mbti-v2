import React from 'react';
import { personalityTypes, getCategoryColor, getCategoryName } from '../data/personalityTypes';
import { PersonalityType } from '../types/personality';

const PersonalityTypesPage: React.FC = () => {
  const categories = {
    dom: personalityTypes.filter(type => type.category === 'dom'),
    sub: personalityTypes.filter(type => type.category === 'sub'),
    introvert: personalityTypes.filter(type => type.category === 'introvert'),
    fantasy: personalityTypes.filter(type => type.category === 'fantasy')
  };

  const getCategoryBackgroundColor = (category: PersonalityType['category']) => {
    switch (category) {
      case 'dom':
        return 'bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400';
      case 'sub':
        return 'bg-gradient-to-r from-green-200 via-green-300 to-green-400';
      case 'introvert':
        return 'bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400';
      case 'fantasy':
        return 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400';
      default:
        return 'bg-gray-200';
    }
  };

  const getCategoryJapaneseTitle = (category: PersonalityType['category']) => {
    switch (category) {
      case 'dom':
        return '分析家';
      case 'sub':
        return '外交官';
      case 'introvert':
        return '番人';
      case 'fantasy':
        return '探検家';
      default:
        return '';
    }
  };

  const renderTypeCard = (type: PersonalityType, index: number) => (
    <div key={type.code} className="flex flex-col items-center text-center p-6">
      {/* Character Illustration */}
      <div className="relative mb-6">
        <div className="w-32 h-32 mb-4 relative">
          {/* Simple character representation */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center">
              {/* Head */}
              <div className="w-12 h-12 bg-orange-300 rounded-full mb-1 relative">
                <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-black rounded-full"></div>
              </div>
              
              {/* Body */}
              <div className={`w-8 h-16 rounded-sm mb-1 ${
                type.category === 'dom' ? 'bg-purple-500' :
                type.category === 'sub' ? 'bg-green-500' :
                type.category === 'introvert' ? 'bg-blue-500' :
                'bg-yellow-500'
              }`}></div>
              
              {/* Legs */}
              <div className="w-2 h-6 bg-brown-600"></div>
            </div>
          </div>
          
          {/* Props/accessories based on type */}
          {index === 0 && (
            <div className="absolute top-4 right-4 w-4 h-4 bg-gray-600 rounded-sm transform rotate-12"></div>
          )}
          {index === 1 && (
            <div className="absolute top-2 left-2 w-3 h-6 bg-brown-400 rounded-sm"></div>
          )}
          {index === 2 && (
            <div className="absolute bottom-8 right-2 w-2 h-4 bg-red-500 rounded-sm"></div>
          )}
          {index === 3 && (
            <div className="absolute top-6 right-0 w-6 h-2 bg-gray-500 rounded-sm"></div>
          )}
        </div>
      </div>

      {/* Type Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
        <p className="text-sm font-mono text-gray-600">{type.code}</p>
        <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
          {type.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">性格タイプ</h1>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-0">
        {Object.entries(categories).map(([categoryKey, types]) => (
          <div key={categoryKey} className="relative">
            {/* Category Background */}
            <div className={`${getCategoryBackgroundColor(categoryKey as PersonalityType['category'])} relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0">
                {/* Mountains/waves pattern */}
                <svg viewBox="0 0 1200 400" className="absolute bottom-0 w-full h-full opacity-20">
                  <polygon points="0,400 200,200 400,250 600,150 800,200 1000,100 1200,150 1200,400" fill="rgba(255,255,255,0.3)" />
                  <polygon points="0,400 150,250 350,300 550,200 750,250 950,150 1150,200 1200,400" fill="rgba(255,255,255,0.2)" />
                </svg>
                
                {/* Decorative elements */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full"></div>
                <div className="absolute top-40 right-32 w-6 h-6 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-32 left-40 w-3 h-3 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-5 h-5 bg-white/25 rounded-full"></div>
              </div>

              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Category Title */}
                <div className="text-center mb-12">
                  <h2 className="text-6xl font-bold text-white mb-4 opacity-90">
                    {getCategoryJapaneseTitle(categoryKey as PersonalityType['category'])}
                  </h2>
                </div>

                {/* Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {types.map((type, index) => renderTypeCard(type, index))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Premium Profile</a></li>
                <li><a href="#" className="hover:text-teal-600">Team Assessments</a></li>
                <li><a href="#" className="hover:text-teal-600">Reports for Professionals</a></li>
                <li><a href="#" className="hover:text-teal-600">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Personality Test</a></li>
                <li><a href="#" className="hover:text-teal-600">Personality Types</a></li>
                <li><a href="#" className="hover:text-teal-600">Articles</a></li>
                <li><a href="#" className="hover:text-teal-600">Our Framework</a></li>
                <li><a href="#" className="hover:text-teal-600">Country Profiles</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-teal-600">FAQ</a></li>
                <li><a href="#" className="hover:text-teal-600">Your Orders</a></li>
                <li><a href="#" className="hover:text-teal-600">Change Language</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Our Other Creations</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">NPQE®</a></li>
                <li><a href="#" className="hover:text-teal-600">MindTrackers®</a></li>
                <li><a href="#" className="hover:text-teal-600">Leadership by 16Personalities</a></li>
                <li><a href="#" className="hover:text-teal-600">INFJ by 16Personalities</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2011-2025 NERIS Analytics Limited
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Discord</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Facebook</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Instagram</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Twitter</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTypesPage;