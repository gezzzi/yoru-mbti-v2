// import React, { useState } from 'react';
// import { User, Heart, Zap, Shield, Eye } from 'lucide-react';

// interface PersonalityDimension {
//   id: string;
//   leftLabel: string;
//   rightLabel: string;
//   percentage: number;
//   color: string;
//   resultLabel: string;
//   icon: React.ReactNode;
//   description: string;
//   category: string;
// }

// const PersonalityResults: React.FC = () => {
//   const [hoveredDimension, setHoveredDimension] = useState<PersonalityDimension | null>(null);

//   const dimensions: PersonalityDimension[] = [
//     {
//       id: 'extraversion',
//       leftLabel: '外向性(E)',
//       rightLabel: '内向性(I)',
//       percentage: 51,
//       color: 'bg-blue-500',
//       resultLabel: '内向性(I)',
//       icon: <User className="w-4 h-4" />,
//       description: '内向型の人は深く有意義で、かつ刺激でない交流を好みます。また、落ち着いた環境に惹かれる傾向にあります。',
//       category: 'エネルギー'
//     },
//     {
//       id: 'dominance',
//       leftLabel: '主導(D)',
//       rightLabel: '服従(S)',
//       percentage: 51,
//       color: 'bg-orange-500',
//       resultLabel: '主導(D)',
//       icon: <Shield className="w-4 h-4" />,
//       description: '主導型の人はリーダーシップを発揮し、積極的に物事を進める傾向があります。決断力があり、チームを引っ張る力を持っています。',
//       category: 'リーダーシップ'
//     },
//     {
//       id: 'stimulation',
//       leftLabel: '刺激志向(T)',
//       rightLabel: '安心志向(S)',
//       percentage: 55,
//       color: 'bg-green-500',
//       resultLabel: '刺激志向(T)',
//       icon: <Zap className="w-4 h-4" />,
//       description: '刺激志向の人は新しい体験や冒険を求める傾向があります。変化を楽しみ、チャレンジングな状況を好みます。',
//       category: '刺激'
//     },
//     {
//       id: 'attachment',
//       leftLabel: '愛着傾向(A)',
//       rightLabel: '非愛着傾向(N)',
//       percentage: 53,
//       color: 'bg-purple-500',
//       resultLabel: '愛着傾向(A)',
//       icon: <Heart className="w-4 h-4" />,
//       description: '愛着傾向の人は深い人間関係を重視し、親密な絆を築くことを大切にします。感情的なつながりを求める傾向があります。',
//       category: '愛着'
//     },
//     {
//       id: 'shame',
//       leftLabel: '羞恥体制(R)',
//       rightLabel: '羞恥敏感(H)',
//       percentage: 51,
//       color: 'bg-red-500',
//       resultLabel: '羞恥体制(R)',
//       icon: <Eye className="w-4 h-4" />,
//       description: '羞恥体制の人は他人の評価に対して比較的強い耐性を持ち、自分の行動に自信を持って取り組む傾向があります。',
//       category: '羞恥'
//     }
//   ];

//   // Default to the first dimension (extraversion)
//   const currentDimension = hoveredDimension || dimensions[0];

//   const getResultColor = (color: string) => {
//     const colorMap: { [key: string]: string } = {
//       'bg-blue-500': 'text-blue-600',
//       'bg-orange-500': 'text-orange-600',
//       'bg-green-500': 'text-green-600',
//       'bg-purple-500': 'text-purple-600',
//       'bg-red-500': 'text-red-600'
//     };
//     return colorMap[color] || 'text-gray-600';
//   };

//   const getBackgroundColor = (color: string) => {
//     const colorMap: { [key: string]: string } = {
//       'bg-blue-500': 'bg-blue-500',
//       'bg-orange-500': 'bg-orange-500',
//       'bg-green-500': 'bg-green-500',
//       'bg-purple-500': 'bg-purple-500',
//       'bg-red-500': 'bg-red-500'
//     };
//     return colorMap[color] || 'bg-gray-500';
//   };

//   const getIndicatorCenterColor = (color: string) => {
//     const colorMap: { [key: string]: string } = {
//       'bg-blue-500': 'bg-blue-500',
//       'bg-orange-500': 'bg-orange-500',
//       'bg-green-500': 'bg-green-500',
//       'bg-purple-500': 'bg-purple-500',
//       'bg-red-500': 'bg-red-500'
//     };
//     return colorMap[color] || 'bg-gray-500';
//   };

//   const getGradientColors = (color: string) => {
//     const colorMap: { [key: string]: string } = {
//       'bg-blue-500': 'from-blue-50 to-blue-100',
//       'bg-orange-500': 'from-orange-50 to-orange-100',
//       'bg-green-500': 'from-green-50 to-green-100',
//       'bg-purple-500': 'from-purple-50 to-purple-100',
//       'bg-red-500': 'from-red-50 to-red-100'
//     };
//     return colorMap[color] || 'from-blue-50 to-purple-50';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Personality Dimensions */}
//             <div className="space-y-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-8">性格診断結果</h2>
              
//               {dimensions.map((dimension) => (
//                 <div 
//                   key={dimension.id} 
//                   className="space-y-3 cursor-pointer transition-all duration-200 hover:scale-105"
//                   onMouseEnter={() => setHoveredDimension(dimension)}
//                   onMouseLeave={() => setHoveredDimension(null)}
//                 >
//                   <div className="relative">
//                     {/* Percentage text above the graph */}
//                     <div 
//                       className="absolute -top-8 transform -translate-x-1/2"
//                       style={{ left: `${dimension.percentage}%` }}
//                     >
//                       <span className={`text-sm font-bold ${getResultColor(dimension.color)}`}>
//                         {dimension.percentage}% {dimension.resultLabel}
//                       </span>
//                     </div>
                    
//                     <div className={`w-full ${getBackgroundColor(dimension.color)} rounded-full h-4 overflow-hidden relative transition-all duration-200 ${hoveredDimension?.id === dimension.id ? 'shadow-lg' : ''}`}>
//                       <div className="absolute inset-0 bg-white/20"></div>
//                       <div 
//                         className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-white transition-all duration-300 flex items-center justify-center ${hoveredDimension?.id === dimension.id ? 'scale-125' : 'hover:scale-110'}`}
//                         style={{ left: `calc(${dimension.percentage}% - 10px)` }}
//                       >
//                         <div className={`w-3 h-3 ${getIndicatorCenterColor(dimension.color)} rounded-full`}></div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Labels below the graph */}
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-sm font-medium text-gray-600">
//                       {dimension.leftLabel}
//                     </span>
//                     <span className="text-sm font-medium text-gray-600">
//                       {dimension.rightLabel}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Character & Results - Now on the right side */}
//             <div className="flex flex-col justify-center">
//               <div className={`bg-gradient-to-br ${getGradientColors(currentDimension.color)} rounded-xl p-6 text-center transition-all duration-300`}>
//                 <div className="mb-4">
//                   <span className={`text-sm font-medium ${getResultColor(currentDimension.color)}`}>
//                     {currentDimension.category}
//                   </span>
//                 </div>
                
//                 <h3 className={`text-2xl font-bold mb-6 ${getResultColor(currentDimension.color)}`}>
//                   {currentDimension.percentage}% {currentDimension.resultLabel}
//                 </h3>
                
//                 {/* Character Illustration Placeholder */}
//                 <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-br ${getGradientColors(currentDimension.color)} rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}>
//                   <div className={`w-24 h-24 ${getBackgroundColor(currentDimension.color)} rounded-full flex items-center justify-center`}>
//                     <div className="text-white text-3xl">
//                       {currentDimension.icon}
//                     </div>
//                   </div>
//                 </div>
                
//                 <p className="text-sm text-gray-700 leading-relaxed mb-6 transition-all duration-300">
//                   {currentDimension.description}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Section */}
//           <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//             <p className="text-gray-600 text-sm mb-4">
//               性格概要に移る前に、結果をあなたのメールアドレスに送りましょうか？
//             </p>
            
//             <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 mx-auto">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//               結果を送る
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalityResults;