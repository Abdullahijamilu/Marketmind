/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle } from 'lucide-react';

interface RisksCardProps {
  risks: string[];
}

export default function RisksCard({ risks }: RisksCardProps) {
  return (
    <div id="risks-card" className="bg-[#111827] p-6 rounded-3xl border border-red-900/20 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/10 rounded-lg">
          <AlertTriangle className="text-red-500 w-5 h-5" />
        </div>
        <h3 className="text-white font-bold text-lg">Key Risks</h3>
      </div>
      <ul className="space-y-4">
        {risks.map((risk, index) => (
          <li key={index} className="flex gap-4 items-start">
            <span className="text-red-500 font-mono text-sm mt-1">{(index + 1).toString().padStart(2, '0')}</span>
            <p className="text-gray-400 text-sm leading-relaxed">{risk}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
