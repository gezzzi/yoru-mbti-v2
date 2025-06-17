'use client';

import React from 'react';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName } from '../data/personalityTypes';
import { Heart, Users, Sparkles, RefreshCw, Download, Share2 } from 'lucide-react';

interface ResultsProps {
  result: TestResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const { type } = result;

  const getAxisName = (axis: string) => {
    switch (axis) {
      case 'E': return '外向性';
      case 'D': return '主導性';
      case 'T': return '刺激志向';
      case 'R': return '羞恥体制';
      case 'A': return '愛着傾向';
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

          {/* Personality Bars */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">性格特性の詳細分析</h3>
            
            <div className="space-y-6">
              {['E', 'D', 'T', 'R', 'A'].map((axis) => {
                const value = getAxisValue(axis);
                const percentage = ((value + 2) / 4) * 100;
                const isPositive = value > 0;
                
                return (
                  <div key={axis} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{getAxisName(axis)}</span>
                      <span className="text-sm text-gray-500">{Math.abs(value * 50).toFixed(0)}%</span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                            isPositive ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      
                      {/* Center line */}
                      <div className="absolute top-0 left-1/2 w-px h-3 bg-gray-400 transform -translate-x-1/2"></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>低い</span>
                      <span>高い</span>
                    </div>
                  </div>
                );
              })}
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
    </div>
  );
};

export default Results; 