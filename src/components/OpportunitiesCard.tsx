/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp } from 'lucide-react';

interface OpportunitiesCardProps {
  opportunities: string[];
}

export default function OpportunitiesCard({ opportunities }: OpportunitiesCardProps) {
  return (
    <div id="opportunities-card" className="bg-[#111827] p-6 rounded-3xl border border-green-900/20 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/10 rounded-lg">
          <TrendingUp className="text-green-500 w-5 h-5" />
        </div>
        <h3 className="text-white font-bold text-lg">Opportunities</h3>
      </div>
      <ul className="space-y-4">
        {opportunities.map((opp, index) => (
          <li key={index} className="flex gap-4 items-start">
            <span className="text-green-500 font-mono text-sm mt-1">{(index + 1).toString().padStart(2, '0')}</span>
            <p className="text-gray-400 text-sm leading-relaxed">{opp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
