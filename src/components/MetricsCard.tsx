/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, Radio, BarChart3 } from 'lucide-react';

interface MetricsCardProps {
  metrics: {
    momentum: string;
    news_volume: string;
    analyst_outlook: string;
  };
}

export default function MetricsCard({ metrics }: MetricsCardProps) {
  const getBadgeColor = (val: string) => {
    const v = val.toLowerCase();
    if (['strong', 'high', 'positive'].includes(v)) return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (['weak', 'low', 'negative'].includes(v)) return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
  };

  return (
    <div id="metrics-card" className="bg-[#111827] p-6 rounded-3xl border border-gray-800 h-full">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Market Vitals</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-900/50 border border-gray-800">
          <div className="flex items-center gap-3">
            <Activity className="text-gray-500 w-4 h-4" />
            <span className="text-gray-400 text-sm">Momentum</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getBadgeColor(metrics.momentum)}`}>
            {metrics.momentum}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-900/50 border border-gray-800">
          <div className="flex items-center gap-3">
            <Radio className="text-gray-500 w-4 h-4" />
            <span className="text-gray-400 text-sm">News Volume</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getBadgeColor(metrics.news_volume)}`}>
            {metrics.news_volume}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-900/50 border border-gray-800">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-gray-500 w-4 h-4" />
            <span className="text-gray-400 text-sm">Analyst Outlook</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getBadgeColor(metrics.analyst_outlook)}`}>
            {metrics.analyst_outlook}
          </span>
        </div>
      </div>
    </div>
  );
}
