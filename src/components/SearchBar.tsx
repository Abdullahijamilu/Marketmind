/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (company: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form id="search-form" onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          id="company-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter company name or ticker (e.g., Apple, TSLA)..."
          className="w-full bg-[#111827] text-white border-2 border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 focus:border-[#10B981] focus:outline-none transition-all duration-300 placeholder-gray-500 font-sans"
          disabled={isLoading}
        />
        <Search className="absolute left-4 text-gray-500 w-5 h-5" />
        <button
          id="search-button"
          type="submit"
          disabled={isLoading}
          className={`absolute right-2 px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
            isLoading 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-[#10B981] text-[#0A0F1E] hover:bg-[#10B981]/90 active:scale-95'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
}
