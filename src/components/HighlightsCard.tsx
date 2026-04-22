/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Zap } from 'lucide-react';

interface HighlightsCardProps {
  highlights: string[];
}

export default function HighlightsCard({ highlights }: HighlightsCardProps) {
  return (
    <div id="highlights-card" className="bg-[#111827] p-6 rounded-3xl border border-gray-800 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
          <Zap className="text-[#F59E0B] w-5 h-5 fill-[#F59E0B]/20" />
        </div>
        <h3 className="text-white font-bold text-lg">Recent Highlights</h3>
      </div>
      <div className="space-y-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#F59E0B] before:rounded-full before:shadow-[0_0_8px_#F59E0B]">
            <p className="text-gray-300 text-sm leading-snug">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
