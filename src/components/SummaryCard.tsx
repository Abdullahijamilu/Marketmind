/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote } from 'lucide-react';

interface SummaryCardProps {
  company: string;
  ticker: string;
  summary: string;
  oneLiner: string;
}

export default function SummaryCard({ company, ticker, summary, oneLiner }: SummaryCardProps) {
  return (
    <div id="summary-card" className="bg-[#111827] p-8 rounded-3xl border border-gray-800 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">{company}</h2>
          <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1 rounded-full text-sm font-mono font-bold border border-[#10B981]/20">
            {ticker}
          </span>
        </div>
        <p className="text-gray-300 leading-relaxed text-lg mb-8 font-sans">
          {summary}
        </p>
      </div>
      
      <div className="relative pt-6 border-t border-gray-800">
        <Quote className="absolute -top-3 left-4 text-[#10B981] fill-[#10B981]/20 w-8 h-8 opacity-50" />
        <p className="text-xl font-medium text-white italic pl-6 font-sans leading-tight">
          "{oneLiner}"
        </p>
      </div>
    </div>
  );
}
