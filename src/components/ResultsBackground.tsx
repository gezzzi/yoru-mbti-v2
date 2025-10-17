import type { FC } from 'react';

const sectionColors = ['#0f172a', '#18233f', '#223356', '#2b426d', '#344881'];
const baseColor = '#0c1220';
const wavePathDown = 'M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,80 L0,80 Z';
const wavePathUp = 'M0,20 Q150,60 300,20 T600,20 T900,20 T1200,20 L1200,80 L0,80 Z';

type GradientStops = {
  topEnd?: string;
  baseEnd?: string;
};

interface ResultsBackgroundProps {
  className?: string;
  gradientStops?: GradientStops;
}

const buildGradient = ({ topEnd = '35%', baseEnd = '65%' }: GradientStops = {}) => {
  const topColor = sectionColors[0];
  const bottomColor = sectionColors[sectionColors.length - 1];

  return `linear-gradient(to bottom, ${topColor} 0%, ${topColor} ${topEnd}, ${baseColor} ${topEnd}, ${baseColor} ${baseEnd}, ${bottomColor} ${baseEnd}, ${bottomColor} 100%)`;
};

const ResultsBackground: FC<ResultsBackgroundProps> = ({ className = '', gradientStops }) => {
  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 -z-20 ${className}`.trim()}
        style={{
          background: buildGradient(gradientStops),
        }}
      />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="flex h-full flex-col">
          {sectionColors.map((color, index) => {
            const nextColor = sectionColors[index + 1] ?? color;

            return (
              <div
                key={`wave-section-${index}`}
                className="relative flex-1"
                style={{
                  backgroundColor: color,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04), transparent 45%)',
                  }}
                />
                {index < sectionColors.length - 1 && (
                  <svg
                    className="pointer-events-none absolute -bottom-[1px] left-0 h-24 w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 80"
                  >
                    <path
                      d={index % 2 === 0 ? wavePathDown : wavePathUp}
                      fill={nextColor}
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ResultsBackground;
export { sectionColors, baseColor };
