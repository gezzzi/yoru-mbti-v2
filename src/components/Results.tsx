'use client';

import React, { useState } from 'react';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName } from '../data/personalityTypes';
import { Heart, Users, Sparkles, RefreshCw, Download, Share2, User, Shield, Zap, Eye } from 'lucide-react';
import Footer from './Footer';

interface PersonalityDimension {
  id: string;
  leftLabel: string;
  rightLabel: string;
  percentage: number;
  color: string;
  resultLabel: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

interface ResultsProps {
  result: TestResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const { type } = result;
  const [hoveredDimension, setHoveredDimension] = useState<PersonalityDimension | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<PersonalityDimension | null>(null);

  const getAxisName = (axis: string, value: number) => {
    const isPositive = value >= 50;
    
    switch (axis) {
      case 'E': return isPositive ? '外向性' : '内向性';
      case 'D': return isPositive ? '主導性' : '服従性';
      case 'T': return isPositive ? '刺激志向' : '安心志向';
      case 'R': return isPositive ? '羞恥体制' : '羞恥敏感';
      case 'A': return isPositive ? '愛着傾向' : '非愛着傾向';
      default: return axis;
    }
  };

  const getAxisValue = (axis: string) => {
    switch (axis) {
      case 'E': return result.E;
      case 'D': return result.D;
      case 'T': return result.T;
      case 'R': return result.R;
      case 'A': return result.A;
      default: return 0;
    }
  };

  const dimensions: PersonalityDimension[] = [
    {
      id: 'extraversion',
      leftLabel: '外向性(E)',
      rightLabel: '内向性(I)',
      percentage: result.E >= 50 ? result.E : (100 - result.E),
      color: 'bg-blue-500',
      resultLabel: result.E >= 50 ? '外向性(E)' : '内向性(I)',
      icon: <User className="w-4 h-4" />,
      description: result.E >= 50 
        ? '外向型の人は社交的で活動的、エネルギッシュな環境を好みます。'
        : '内向型の人は深く有意義で、かつ刺激でない交流を好みます。また、落ち着いた環境に惹かれる傾向にあります。',
      category: 'エネルギー'
    },
    {
      id: 'dominance',
      leftLabel: '主導(D)',
      rightLabel: '服従(S)',
      percentage: result.D >= 50 ? result.D : (100 - result.D),
      color: 'bg-orange-500',
      resultLabel: result.D >= 50 ? '主導(D)' : '服従(S)',
      icon: <Shield className="w-4 h-4" />,
      description: result.D >= 50
        ? '主導型の人はリーダーシップを発揮し、積極的に物事を進める傾向があります。決断力があり、チームを引っ張る力を持っています。'
        : '服従型の人は協調性を重視し、チームワークを大切にします。他者をサポートし、調和を保つことを得意とします。',
      category: 'リーダーシップ'
    },
    {
      id: 'stimulation',
      leftLabel: '刺激志向(T)',
      rightLabel: '安心志向(S)',
      percentage: result.T >= 50 ? result.T : (100 - result.T),
      color: 'bg-green-500',
      resultLabel: result.T >= 50 ? '刺激志向(T)' : '安心志向(S)',
      icon: <Zap className="w-4 h-4" />,
      description: result.T >= 50
        ? '刺激志向の人は新しい体験や冒険を求める傾向があります。変化を楽しみ、チャレンジングな状況を好みます。'
        : '安心志向の人は安定性と予測可能性を重視します。慣れ親しんだ環境や確実性を好む傾向があります。',
      category: '刺激'
    },
    {
      id: 'attachment',
      leftLabel: '愛着傾向(A)',
      rightLabel: '非愛着傾向(N)',
      percentage: result.A >= 50 ? result.A : (100 - result.A),
      color: 'bg-purple-500',
      resultLabel: result.A >= 50 ? '愛着傾向(A)' : '非愛着傾向(N)',
      icon: <Heart className="w-4 h-4" />,
      description: result.A >= 50
        ? '愛着傾向の人は深い人間関係を重視し、親密な絆を築くことを大切にします。感情的なつながりを求める傾向があります。'
        : '非愛着傾向の人は独立性を重視し、自立した関係を好みます。個人的な空間と自由を大切にします。',
      category: '愛着'
    },
    {
      id: 'shame',
      leftLabel: '羞恥体制(R)',
      rightLabel: '羞恥敏感(H)',
      percentage: result.R >= 50 ? result.R : (100 - result.R),
      color: 'bg-red-500',
      resultLabel: result.R >= 50 ? '羞恥体制(R)' : '羞恥敏感(H)',
      icon: <Eye className="w-4 h-4" />,
      description: result.R >= 50
        ? '羞恥体制の人は他人の評価に対して比較的強い耐性を持ち、自分の行動に自信を持って取り組む傾向があります。'
        : '羞恥敏感の人は他人の評価や反応に敏感で、周囲との調和を重視する傾向があります。',
      category: '羞恥'
    }
  ];

  // Default to the first dimension (extraversion), then to selected, then to hovered
  const currentDimension = hoveredDimension || selectedDimension || dimensions[0];

  const getResultColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'text-blue-600',
      'bg-orange-500': 'text-orange-600',
      'bg-green-500': 'text-green-600',
      'bg-purple-500': 'text-purple-600',
      'bg-red-500': 'text-red-600'
    };
    return colorMap[color] || 'text-gray-600';
  };

  const getBackgroundColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-500',
      'bg-orange-500': 'bg-orange-500',
      'bg-green-500': 'bg-green-500',
      'bg-purple-500': 'bg-purple-500',
      'bg-red-500': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getIndicatorCenterColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-500',
      'bg-orange-500': 'bg-orange-500',
      'bg-green-500': 'bg-green-500',
      'bg-purple-500': 'bg-purple-500',
      'bg-red-500': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getGradientColors = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'from-blue-50 to-blue-100',
      'bg-orange-500': 'from-orange-50 to-orange-100',
      'bg-green-500': 'from-green-50 to-green-100',
      'bg-purple-500': 'from-purple-50 to-purple-100',
      'bg-red-500': 'from-red-50 to-red-100'
    };
    return colorMap[color] || 'from-blue-50 to-purple-50';
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section with Green Background */}
      <div className="bg-gradient-to-r from-green-400 to-teal-500 relative overflow-hidden">
        {/* Background illustration */}
        <div className="absolute inset-0">
          {/* Mountains */}
          <svg viewBox="0 0 800 400" className="absolute bottom-0 w-full h-full">
            <polygon points="0,400 200,150 400,200 600,100 800,150 800,400" fill="rgba(255,255,255,0.1)" />
            <polygon points="0,400 150,200 350,250 550,150 750,200 800,400" fill="rgba(255,255,255,0.05)" />
          </svg>
          
          {/* Trees */}
          <div className="absolute bottom-20 left-1/4 w-6 h-16 bg-green-600/60 transform rotate-12"></div>
          <div className="absolute bottom-20 left-1/3 w-6 h-20 bg-green-700/60"></div>
          <div className="absolute bottom-20 right-1/3 w-6 h-16 bg-green-600/60 transform -rotate-12"></div>
          <div className="absolute bottom-20 right-1/4 w-6 h-18 bg-green-700/60"></div>
          
          {/* Character illustration */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex items-end space-x-12">
              {/* Main character */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-300 rounded-full mb-2 relative">
                  <div className="absolute top-2 left-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute top-2 right-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
                </div>
                <div className="w-12 h-24 bg-green-500 rounded-sm mb-2"></div>
                <div className="w-4 h-8 bg-brown-600"></div>
              </div>
              
              {/* Side characters */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-300 rounded-full mb-2"></div>
                <div className="w-10 h-20 bg-blue-500 rounded-sm mb-2"></div>
                <div className="w-3 h-6 bg-brown-600"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-pink-300 rounded-full mb-2"></div>
                <div className="w-10 h-20 bg-purple-500 rounded-sm mb-2"></div>
                <div className="w-3 h-6 bg-brown-600"></div>
              </div>
            </div>
          </div>
          
          {/* Scattered objects */}
          <div className="absolute bottom-12 left-1/4 w-4 h-4 bg-gray-500/60 rounded-sm transform rotate-45"></div>
          <div className="absolute bottom-14 right-1/4 w-6 h-3 bg-yellow-500/60 rounded-sm"></div>
          <div className="absolute bottom-10 left-2/3 w-3 h-3 bg-red-500/60 rounded-full"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="mb-6">
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                あなたの性格タイプ:
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">{type.name}</h1>
            <p className="text-xl mb-6 opacity-90">{type.code}</p>
            
            <div className="flex justify-center space-x-4 mb-8">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>結果をダウンロード</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>結果をシェア</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-900">性格特性</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              {type.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">主な特徴:</h3>
                <ul className="space-y-2">
                  {type.traits.map((trait, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">相性の良いタイプ:</h3>
                <ul className="space-y-2">
                  {type.compatibility.map((compatType, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-mono">{compatType}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* New Graph Design */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Personality Dimensions */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">性格診断結果</h2>
                
                {dimensions.map((dimension) => (
                  <div 
                    key={dimension.id} 
                    className={`space-y-3 cursor-pointer transition-all duration-200 hover:scale-105 py-2 px-3 rounded-lg ${
                      currentDimension.id === dimension.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredDimension(dimension)}
                    onMouseLeave={() => {
                      setHoveredDimension(null);
                      setSelectedDimension(dimension);
                    }}
                  >
                    <div className="relative py-3">
                      {/* Percentage text above the graph */}
                      {(() => {
                        // Determine if this is a "reverse" axis (I, S, N, H)
                        const isReverse = dimension.resultLabel.includes('内向性') || 
                                        dimension.resultLabel.includes('服従') || 
                                        dimension.resultLabel.includes('安心志向') ||
                                        dimension.resultLabel.includes('非愛着傾向') || 
                                        dimension.resultLabel.includes('羞恥敏感');
                        
                        // For reverse axes, position text from the opposite side
                        const textPosition = isReverse ? (100 - dimension.percentage) : dimension.percentage;
                        
                        return (
                          <div 
                            className="absolute -top-6 transform -translate-x-1/2"
                            style={{ left: `${textPosition}%` }}
                          >
                            <span className={`text-sm font-bold ${getResultColor(dimension.color)}`}>
                              {dimension.percentage}% {dimension.resultLabel}
                            </span>
                          </div>
                        );
                      })()}
                      
                      <div className={`w-full ${getBackgroundColor(dimension.color)} rounded-full h-4 overflow-hidden relative transition-all duration-200 ${hoveredDimension?.id === dimension.id ? 'shadow-lg' : ''}`}>
                        <div className="absolute inset-0 bg-white/20"></div>
                        {(() => {
                          // Determine if this is a "reverse" axis (I, S, N, H)
                          const isReverse = dimension.resultLabel.includes('内向性') || 
                                          dimension.resultLabel.includes('服従') || 
                                          dimension.resultLabel.includes('安心志向') ||
                                          dimension.resultLabel.includes('非愛着傾向') || 
                                          dimension.resultLabel.includes('羞恥敏感');
                          
                          // For reverse axes, we need to position the circle from the opposite side
                          const circlePosition = isReverse ? (100 - dimension.percentage) : dimension.percentage;
                          
                          return (
                            <div 
                              className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-white transition-all duration-300 flex items-center justify-center ${hoveredDimension?.id === dimension.id ? 'scale-125' : 'hover:scale-110'}`}
                              style={{ left: `calc(${circlePosition}% - 10px)` }}
                            >
                              <div className={`w-3 h-3 ${getIndicatorCenterColor(dimension.color)} rounded-full`}></div>
                            </div>
                          );
                        })()}
                      </div>
                      
                      {/* Labels below the graph */}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-medium text-gray-600">
                          {dimension.leftLabel}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {dimension.rightLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Character & Results - Now on the right side */}
              <div className="flex flex-col justify-center">
                <div className={`bg-gradient-to-br ${getGradientColors(currentDimension.color)} rounded-xl p-6 text-center transition-all duration-300`}>
                  <div className="mb-4">
                    <span className={`text-sm font-medium ${getResultColor(currentDimension.color)}`}>
                      {currentDimension.category}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-6 ${getResultColor(currentDimension.color)}`}>
                    {currentDimension.percentage}% {currentDimension.resultLabel}
                  </h3>
                  
                  {/* Character Illustration Placeholder */}
                  <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${getGradientColors(currentDimension.color)} rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}>
                    <div className={`w-24 h-24 ${getBackgroundColor(currentDimension.color)} rounded-full flex items-center justify-center`}>
                      <div className="text-white text-3xl">
                        {currentDimension.icon}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed mb-6 transition-all duration-300">
                    {currentDimension.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">長所と短所</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                長所
              </h3>
              <ul className="space-y-2">
                {type.strengths.map((strength, index) => (
                  <li key={index} className="text-green-700 flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                改善点
              </h3>
              <ul className="space-y-2">
                {type.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-red-700 flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Career Paths */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">適職</h2>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {type.careers.map((career, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center border border-purple-100 hover:border-purple-300 transition-colors">
                  <span className="text-purple-700 font-medium">{career}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relationships */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              4
            </div>
            <h2 className="text-2xl font-bold text-gray-900">人間関係</h2>
          </div>
          
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
            <h3 className="font-semibold text-pink-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              相性の良いタイプ
            </h3>
            <div className="flex flex-wrap gap-2">
              {type.compatibility.map((compatType, index) => (
                <span
                  key={index}
                  className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-mono"
                >
                  {compatType}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">診断を再び受けますか？</h3>
            <p className="mb-6 opacity-90">
              時間が経つにつれて、あなたの性格や考え方も変化する可能性があります。
            </p>
            <button
              onClick={onRestart}
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              もう一度診断する
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Results; 