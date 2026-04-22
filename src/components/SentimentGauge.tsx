/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface SentimentGaugeProps {
  score: number; // -100 to +100
}

export default function SentimentGauge({ score }: SentimentGaugeProps) {
  // Normalize score from [-100, 100] to [0, 100] for display if needed, 
  // but Recharts RadialBar can handle start/end angles.
  // Converting -100..100 to 0..180 degrees for a half circle.
  // Actually, we'll just map the percentage.
  
  const data = [
    {
      name: 'Sentiment',
      value: score + 100, // Range 0 to 200
      fill: score > 30 ? '#10B981' : score < -30 ? '#EF4444' : '#F59E0B',
    },
  ];

  return (
    <div id="sentiment-gauge-container" className="bg-[#111827] p-6 rounded-3xl border border-gray-800 flex flex-col items-center justify-center h-full min-h-[300px]">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Market Sentiment</h3>
      <div className="relative w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="80%"
            outerRadius="120%"
            barSize={15}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 200]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: '#1F2937' }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-4xl font-bold font-mono text-white tracking-tighter">
            {score > 0 ? `+${score}` : score}
          </span>
          <span className="text-xs text-gray-400 uppercase font-mono tracking-widest mt-1">
            Score
          </span>
        </div>
      </div>
      <div className="flex justify-between w-full px-4 mt-4">
        <span className="text-red-500 font-mono text-xs uppercase">Bearish</span>
        <span className="text-gray-500 font-mono text-xs uppercase">Neutral</span>
        <span className="text-green-500 font-mono text-xs uppercase">Bullish</span>
      </div>
    </div>
  );
}
