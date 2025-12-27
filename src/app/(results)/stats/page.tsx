'use client';

import { useState, useEffect } from 'react';
import { personalityTypes } from '@/data/personalityTypes';
import NeonText from '@/components/NeonText';
import { ScrollAnimation } from '@/components/ScrollAnimation';

// 仮データ - 8タイプの割合（%）
const typeDistribution = [
  { code: 'FAL', percentage: 35.4, color: '#69db7c' },
  { code: 'FSL', percentage: 17.0, color: '#74c0fc' },
  { code: 'LAL', percentage: 16.5, color: '#ff6b6b' },
  { code: 'FAF', percentage: 10.1, color: '#4ecdc4' },
  { code: 'LAF', percentage: 8.8, color: '#ff8e72' },
  { code: 'LSL', percentage: 7.7, color: '#ffa94d' },
  { code: 'FSF', percentage: 3.0, color: '#b197fc' },
  { code: 'LSF', percentage: 1.6, color: '#ffd43b' },
];

// 仮データ - 男女比率
const genderDistribution = {
  male: 72,
  female: 25,
  other: 3,
};

// 仮データ - 回答者数
const totalResponses = 26847;

// 棒グラフコンポーネント
const BarChart = ({ data }: { data: typeof typeDistribution }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const maxPercentage = Math.max(...data.map(d => d.percentage));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const type = personalityTypes.find(t => t.code === item.code);
        return (
          <div key={item.code} className="group">
            <div className="mb-1 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">{type?.emoji}</span>
                <span className="font-medium text-white/90">
                  {item.code}：{type?.name}
                </span>
              </div>
              <span className="font-mono text-white/80">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-8 w-full overflow-hidden rounded-lg bg-white/10">
              <div
                className="h-full rounded-lg transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${(item.percentage / maxPercentage) * 100}%` : '0%',
                  background: `linear-gradient(90deg, ${item.color}cc, ${item.color}99)`,
                  transitionDelay: `${index * 80}ms`,
                  boxShadow: `0 0 20px ${item.color}40`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 円グラフコンポーネント
const PieChart = ({ data }: { data: typeof genderDistribution }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  const total = data.male + data.female + data.other;
  const maleAngle = (data.male / total) * 360;
  const femaleAngle = (data.female / total) * 360;
  const otherAngle = (data.other / total) * 360;
  
  // SVG円グラフの計算
  const createArc = (startAngle: number, endAngle: number, radius: number = 80) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = 100 + radius * Math.cos(startRad);
    const y1 = 100 + radius * Math.sin(startRad);
    const x2 = 100 + radius * Math.cos(endRad);
    const y2 = 100 + radius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };
  
  const segments = [
    { 
      path: createArc(0, maleAngle), 
      color: '#4ecdc4', 
      label: '男性', 
      percentage: data.male,
      icon: '♂'
    },
    { 
      path: createArc(maleAngle, maleAngle + femaleAngle), 
      color: '#ff6b9d', 
      label: '女性', 
      percentage: data.female,
      icon: '♀'
    },
    { 
      path: createArc(maleAngle + femaleAngle, 360), 
      color: '#a855f7', 
      label: 'その他', 
      percentage: data.other,
      icon: '⚧'
    },
  ];
  
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-12">
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          className="h-56 w-56 drop-shadow-2xl sm:h-72 sm:w-72"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))',
          }}
        >
          {segments.map((segment, index) => (
            <path
              key={segment.label}
              d={segment.path}
              fill={segment.color}
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'scale(1)' : 'scale(0)',
                transformOrigin: '100px 100px',
                transitionDelay: `${index * 150}ms`,
              }}
            />
          ))}
          {/* 中心の穴（ドーナツチャート風） */}
          <circle cx="100" cy="100" r="40" fill="#0f172a" />
          <text
            x="100"
            y="95"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
          >
            回答者
          </text>
          <text
            x="100"
            y="115"
            textAnchor="middle"
            fill="#a855f7"
            fontSize="14"
            fontWeight="bold"
          >
            {totalResponses.toLocaleString()}人
          </text>
        </svg>
      </div>
      
      <div className="flex flex-col gap-4">
        {segments.map((segment, index) => (
          <div
            key={segment.label}
            className="flex items-center gap-3 transition-all duration-500"
            style={{
              opacity: animated ? 1 : 0,
              transform: animated ? 'translateX(0)' : 'translateX(-20px)',
              transitionDelay: `${(index + 3) * 150}ms`,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg"
              style={{ backgroundColor: segment.color }}
            >
              {segment.icon}
            </div>
            <div>
              <div className="font-medium text-white">{segment.label}</div>
              <div className="text-sm text-white/60">{segment.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 統計カード
const StatCard = ({ 
  title, 
  value, 
  subtitle,
  delay = 0 
}: { 
  title: string; 
  value: string | number; 
  subtitle?: string;
  delay?: number;
}) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-700"
      style={{
        opacity: animated ? 1 : 0,
        transform: animated ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="text-sm text-white/80">{title}</div>
      <div className="mt-1 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{value}</div>
      {subtitle && <div className="mt-1 text-xs text-white/60">{subtitle}</div>}
    </div>
  );
};

export default function StatsPage() {
  return (
    <div className="w-full max-w-4xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
      {/* ヘッダー */}
      <div className="mb-12 text-center">
        <ScrollAnimation animation="fadeIn" duration={800}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 select-none">
            <NeonText text="統計データ" specialCharIndex={2} className="flex justify-center gap-1" />
          </h1>
        </ScrollAnimation>
      </div>
      
      {/* サマリーカード */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard 
          title="総回答者数" 
          value={totalResponses.toLocaleString()} 
          delay={100}
        />
        <StatCard 
          title="最多タイプ" 
          value="FAL" 
          subtitle="寄り添い珍坊"
          delay={200}
        />
        <StatCard 
          title="平均回答時間" 
          value="3分24秒" 
          delay={300}
        />
        <StatCard 
          title="相性診断数" 
          value="4,521" 
          delay={400}
        />
      </div>
      
      {/* 8タイプ分布 */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-400 to-pink-500" />
          <h2 className="font-head text-xl font-bold text-white sm:text-2xl">
            8タイプ分布
          </h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <BarChart data={typeDistribution} />
        </div>
      </section>
      
      {/* 男女比率 */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
          <h2 className="font-head text-xl font-bold text-white sm:text-2xl">
            男女比率
          </h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <PieChart data={genderDistribution} />
        </div>
      </section>
      
    </div>
  );
}

