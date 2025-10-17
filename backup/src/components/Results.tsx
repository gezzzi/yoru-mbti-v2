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

        {/* Career Paths Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">あなたのキャリアパス</h2>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">適職の例:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• クリエイティブディレクター</li>
                  <li>• 心理カウンセラー</li>
                  <li>• 研究者・学者</li>
                  <li>• アーティスト・デザイナー</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">職場での強み:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 独創的なアイデアの創出</li>
                  <li>• 深い洞察力と分析力</li>
                  <li>• 他者への共感と理解</li>
                  <li>• 長期的な視点での計画</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Relationships Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">あなたの自己成長</h2>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">成長のポイント:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 自分の価値観を大切にする</li>
                  <li>• 創造性を活かす機会を見つける</li>
                  <li>• 深い人間関係を築く</li>
                  <li>• 完璧主義を和らげる</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">注意すべき点:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 過度な理想主義</li>
                  <li>• 批判に対する敏感さ</li>
                  <li>• 決断の先延ばし</li>
                  <li>• 孤立しがちな傾向</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all font-medium">
              プレミアム版を見る
            </button>
            <button
              onClick={onRestart}
              className="border border-green-500 text-green-500 px-8 py-3 rounded-lg hover:bg-green-50 transition-all font-medium flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>もう一度テストする</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            この結果をシェアして、友達や同僚と比較してみましょう
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Premium Profile</a></li>
                <li><a href="#" className="hover:text-green-600">Team Assessments</a></li>
                <li><a href="#" className="hover:text-green-600">Reports for Professionals</a></li>
                <li><a href="#" className="hover:text-green-600">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Personality Test</a></li>
                <li><a href="#" className="hover:text-green-600">Personality Types</a></li>
                <li><a href="#" className="hover:text-green-600">Articles</a></li>
                <li><a href="#" className="hover:text-green-600">Our Framework</a></li>
                <li><a href="#" className="hover:text-green-600">Country Profiles</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-600">FAQ</a></li>
                <li><a href="#" className="hover:text-green-600">Your Orders</a></li>
                <li><a href="#" className="hover:text-green-600">Change Language</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Our Other Creations</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-green-600">NPQE®</a></li>
                <li><a href="#" className="hover:text-green-600">MindTrackers®</a></li>
                <li><a href="#" className="hover:text-green-600">Leadership by 16Personalities</a></li>
                <li><a href="#" className="hover:text-green-600">INFJ by 16Personalities</a></li>
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

export default Results;