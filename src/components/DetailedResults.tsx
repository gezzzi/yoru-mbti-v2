'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TestResult } from '../types/personality';
import { personalityTypes } from '../data/personalityTypes';
import { Heart, RefreshCw } from 'lucide-react';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';

interface DetailedResultsProps {
  result: TestResult;
}

const DetailedResults: React.FC<DetailedResultsProps> = ({ result }) => {
  const { type } = result;
  const [activeTab, setActiveTab] = useState('basic');
  
  // コードから基本の4文字を抽出（例：ILSL-O → ILSL）
  const baseTypeCode = type.code.split('-')[0];
  
  // personalityTypesから直接rubyプロパティを取得
  const basePersonalityType = personalityTypes.find(pt => pt.code === baseTypeCode);
  const typeWithRuby = {
    ...type,
    ruby: basePersonalityType?.ruby
  };

  const tabs = [
    { id: 'basic', label: '基本性格' },
    { id: 'style', label: 'スタイル・体位' },
    { id: 'compatibility', label: '相性診断' },
    { id: 'preference', label: 'こだわり' },
    { id: 'advice', label: 'アドバイス' }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* タイトル */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
              <NeonText text="結果詳細" specialCharIndex={1} className="gap-1" />
            </h1>
          </div>
        </ScrollAnimation>

        {/* タブナビゲーション */}
        <ScrollAnimation animation="fadeIn" duration={800} delay={200}>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-8 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 rounded-full transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'bg-white/10 text-[#e0e7ff]/80 hover:bg-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* タブコンテンツ */}
        <ScrollAnimation animation="fadeInUp" duration={800} delay={400}>
          <div className="space-y-6">
            {/* 基本性格タブ */}
            {activeTab === 'basic' && (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">🧠</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">夜の性格</h3>
                  </div>
                  <div className="text-[#e0e7ff] leading-relaxed space-y-2">
                    {type.nightPersonality ? (
                      type.nightPersonality.split(/(?=本番：|アフター：)/).map((text, index) => (
                        <p key={index}>{text.trim()}</p>
                      ))
                    ) : (
                      <p>理性はあるけど、ベッドでは全部脱ぐタイプ。欲しいものは自分で奪う。</p>
                    )}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">😈</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">S or M 傾向</h3>
                  </div>
                  <p className="text-lg text-[#e0e7ff] font-bold mb-2">
                    {result.additionalResults?.smTendency === 'S' 
                      ? 'S'
                      : result.additionalResults?.smTendency === 'M'
                      ? 'M' 
                      : '中立'}
                  </p>
                  <p className="text-[#e0e7ff]">
                    {result.additionalResults?.smTendency === 'S' 
                      ? '支配したい気持ちが強く、相手をリードすることに喜びを感じます。'
                      : result.additionalResults?.smTendency === 'M'
                      ? '委ねることに安心感を覚え、相手に導かれることを好みます。'
                      : '相手や気分によって自在に立場を変えられる柔軟性があります。'}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">🎭</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">夜のギャップ度</h3>
                  </div>
                  <p className="text-[#e0e7ff]">
                    {type.nightGapLevel || '昼は静か、夜は獣。いつも冷静な人ほど豹変すると燃える。'}
                  </p>
                </div>
              </>
            )}

            {/* スタイル・体位タブ */}
            {activeTab === 'style' && (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">💋</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">性欲レベル</h3>
                  </div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-2xl ${star <= (result.additionalResults?.libidoLevel || 3) ? 'text-pink-500' : 'text-gray-600'}`}>
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-[#e0e7ff]">
                      {result.additionalResults?.libidoLevel === 5 ? '（とても強い）' :
                       result.additionalResults?.libidoLevel === 4 ? '（強い）' :
                       result.additionalResults?.libidoLevel === 3 ? '（普通）' :
                       result.additionalResults?.libidoLevel === 2 ? '（控えめ）' : '（穏やか）'}
                    </span>
                  </div>
                  <p className="text-[#e0e7ff] text-sm">
                    {result.additionalResults?.libidoLevel && result.additionalResults.libidoLevel >= 4 
                      ? '平常時でも妄想が止まらないタイプ。'
                      : '気分やシチュエーションによって変化するタイプ。'}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">🍑</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">おすすめの体位（48手）</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {(type.recommendedPositions || ['正常位', '騎乗位', '後背位', '駅弁', '対面座位', '寝バック', '立位']).map((position, index) => (
                      <div key={index} className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center text-[#e0e7ff]">
                        {position}
                      </div>
                    ))}
                  </div>
                  <p className="text-[#e0e7ff] text-sm italic">
                    {result.additionalResults?.smTendency === 'S' 
                      ? '「深く」「支配的」「見下ろすように愛したい」'
                      : result.additionalResults?.smTendency === 'M'
                      ? '「深く」「受け身で」「見上げるように愛されたい」'
                      : '「深く」「情熱的に」「互いに求め合いたい」'}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">👁</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">自分の体に対する自信</h3>
                  </div>
                  <p className="text-[#e0e7ff] mb-2">
                    <span className="font-bold text-lg">{type.bodyConfidence?.level || 'ある'}</span>
                    {type.bodyConfidence?.parts && type.bodyConfidence.parts.length > 0 && (
                      <span className="ml-2">（自信のある部位：{type.bodyConfidence.parts.join('と')}）</span>
                    )}
                  </p>
                  <p className="text-[#e0e7ff] text-sm">
                    {type.bodyConfidence?.parts?.includes('腰') && '腰使いは"無意識でエロい"と言われがち。'}
                  </p>
                </div>
              </>
            )}

            {/* 相性診断タブ */}
            {activeTab === 'compatibility' && (
              <>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">💘</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">相性のいいタイプ</h3>
                  </div>
                  {type.compatibleTraits?.map((trait, index) => (
                    <p key={index} className="text-[#e0e7ff] mb-2">
                      {trait}
                    </p>
                  )) || <p className="text-[#e0e7ff]">感度が高く、甘え上手な人。自分のリードを委ねてくれる相手に惹かれる。</p>}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">🚫</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">相性が悪いタイプ</h3>
                  </div>
                  {type.incompatibleTraits?.map((trait, index) => (
                    <p key={index} className="text-[#e0e7ff] mb-2">
                      {trait}
                    </p>
                  )) || <p className="text-[#e0e7ff]">ノリが合わない堅物系、リアクションが薄い人。受け身すぎる or 無反応な相手には温度差を感じやすい。</p>}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <span className="text-2xl mr-3">🔄</span>
                    <h3 className="text-xl font-bold text-[#e0e7ff]">関係性の理想スタイル</h3>
                  </div>
                  <p className="text-[#e0e7ff]">
                    {type.relationshipStyle || '気が合えば専属で深く繋がりたい。"身体の相性"から心も通わせていくのが理想。'}
                  </p>
                </div>
              </>
            )}

            {/* こだわりタブ */}
            {activeTab === 'preference' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🔍</span>
                  <h3 className="text-xl font-bold text-[#e0e7ff]">セックスでのこだわり</h3>
                </div>
                <ul className="text-[#e0e7ff] space-y-2">
                  {type.sexualPreferences?.map((pref, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-pink-500">♥</span>
                      <span>{pref}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start">
                        <span className="mr-3 text-pink-500">♥</span>
                        <span>前戯が濃厚じゃないと冷める</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-pink-500">♥</span>
                        <span>キスは必須。なければ温度が下がる</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-3 text-pink-500">♥</span>
                        <span>指先の絡ませ合いが好き</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {/* アドバイスタブ */}
            {activeTab === 'advice' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⚠️</span>
                  <h3 className="text-xl font-bold text-[#e0e7ff]">あなたの短所とアドバイス</h3>
                </div>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-[#e0e7ff] mb-3">
                    <span className="font-bold text-pink-500">短所：</span>
                    {type.shortcomingsAdvice?.shortcoming || '気分屋な面があり、急に冷めることも。'}
                  </p>
                  <p className="text-[#e0e7ff]">
                    <span className="font-bold text-pink-500">→ アドバイス：</span>
                    {type.shortcomingsAdvice?.advice || '信頼関係と温度管理を大切にすれば長く愛される。'}
                  </p>
                </div>
                <h4 className="text-lg font-bold text-[#e0e7ff] mb-3">より良い関係を築くための3つのヒント</h4>
                <ul className="text-[#e0e7ff] space-y-2">
                  <li className="flex items-start">
                    <span className="mr-3 text-pink-500">♥</span>
                    <span>自分の気分を素直に伝える習慣をつける</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-pink-500">♥</span>
                    <span>相手のペースも尊重し、バランスを取る</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-pink-500">♥</span>
                    <span>定期的に新しい刺激を取り入れてマンネリを防ぐ</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* アクションボタン */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Link
              href="/results"
              className="bg-white/10 text-[#e0e7ff] px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center border border-white/20 w-full sm:w-auto justify-center"
            >
              サマリーに戻る
            </Link>
            <Link
              href="/test"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center w-full sm:w-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              もう一度診断する
            </Link>
            <Link
              href="/compatibility"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center w-full sm:w-auto"
            >
              <Heart className="w-5 h-5 mr-2" />
              相性診断をする
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedResults;