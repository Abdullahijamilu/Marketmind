/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Brain, LayoutDashboard, RefreshCw, AlertCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import SentimentGauge from './components/SentimentGauge';
import SummaryCard from './components/SummaryCard';
import RisksCard from './components/RisksCard';
import OpportunitiesCard from './components/OpportunitiesCard';
import MetricsCard from './components/MetricsCard';
import HighlightsCard from './components/HighlightsCard';

// Model configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

interface AnalysisResult {
  company: string;
  ticker: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  sentiment_score: number;
  summary: string;
  risks: string[];
  opportunities: string[];
  key_metrics: {
    momentum: 'Strong' | 'Moderate' | 'Weak';
    news_volume: 'High' | 'Medium' | 'Low';
    analyst_outlook: 'Positive' | 'Mixed' | 'Negative';
  };
  recent_highlights: string[];
  one_liner: string;
}

const SYSTEM_PROMPT = `You are MarketMind, an expert financial analyst AI. 
Analyze the given company or stock and respond ONLY with a valid raw JSON object.
Be honest in sentiment analysis. If company is unrecognized, set sentiment to "Neutral", score to 0, explain in summary.

EXACT JSON FORMAT:
{
  "company": "Full Company Name",
  "ticker": "TICKER",
  "sentiment": "Bullish" | "Bearish" | "Neutral",
  "sentiment_score": number from -100 to +100,
  "summary": "<2-3 sentence overview>",
  "risks": ["Risk 1", "Risk 2", "Risk 3"],
  "opportunities": ["Opp 1", "Opp 2", "Opp 3"],
  "key_metrics": {
    "momentum": "Strong" | "Moderate" | "Weak",
    "news_volume": "High" | "Medium" | "Low",
    "analyst_outlook": "Positive" | "Mixed" | "Negative"
  },
  "recent_highlights": ["Highlight 1", "Highlight 2"],
  "one_liner": "<One punchy sentence>"
}`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeStock = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              ticker: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ['Bullish', 'Bearish', 'Neutral'] },
              sentiment_score: { type: Type.NUMBER },
              summary: { type: Type.STRING },
              risks: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              key_metrics: {
                type: Type.OBJECT,
                properties: {
                  momentum: { type: Type.STRING, enum: ['Strong', 'Moderate', 'Weak'] },
                  news_volume: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  analyst_outlook: { type: Type.STRING, enum: ['Positive', 'Mixed', 'Negative'] }
                }
              },
              recent_highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
              one_liner: { type: Type.STRING }
            },
            required: ['company', 'ticker', 'sentiment', 'sentiment_score', 'summary', 'risks', 'opportunities', 'key_metrics', 'recent_highlights', 'one_liner']
          }
        }
      });

      const data = JSON.parse(response.text);
      setResult(data);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Market analysis failed. Please check your API key or try a different company name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white selection:bg-[#10B981]/30">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Brain className="text-[#0A0F1E] w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MarketMind</h1>
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest -mt-1">Financial Intelligence AI</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Markets</a>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Trends</a>
            <a href="#" className="text-sm font-medium text-[#10B981] flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Terminal
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Live Engine</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4 tracking-tighter"
          >
            Institutional <span className="text-[#10B981]">Intelligence</span> <br />for every investor.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Real-time stock sentiment, risk modeling, and opportunity analysis powered by Gemini 2.0 Flash thinking.
          </motion.p>
        </div>

        {/* Search */}
        <SearchBar onSearch={analyzeStock} isLoading={loading} />

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 mb-8 max-w-2xl mx-auto"
            >
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-64 bg-[#111827] rounded-3xl animate-pulse border border-gray-800" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64 bg-[#111827] rounded-3xl animate-pulse border border-gray-800" />
                <div className="h-64 bg-[#111827] rounded-3xl animate-pulse border border-gray-800" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="h-80 bg-[#111827] rounded-3xl animate-pulse border border-gray-800" />
              <div className="h-48 bg-[#111827] rounded-3xl animate-pulse border border-gray-800" />
              <div className="h-48 bg-[#111827] rounded-3xl animate-pulse border border-gray-800" />
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Left Column (Main Analysis) */}
            <div className="lg:col-span-2 space-y-8">
              <SummaryCard 
                company={result.company}
                ticker={result.ticker}
                summary={result.summary}
                oneLiner={result.one_liner}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RisksCard risks={result.risks} />
                <OpportunitiesCard opportunities={result.opportunities} />
              </div>
            </div>

            {/* Right Column (Metrics & Highlights) */}
            <div className="space-y-8">
              <SentimentGauge score={result.sentiment_score} />
              <MetricsCard metrics={result.key_metrics} />
              <HighlightsCard highlights={result.recent_highlights} />
            </div>
          </motion.div>
        )}

        {/* Initial Empty State */}
        {!loading && !result && !error && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mb-6">
              <RefreshCw className="text-gray-500 w-10 h-10" />
            </div>
            <p className="text-gray-500 font-medium">Terminal awaiting input...</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="text-[#10B981] w-5 h-5" />
            <span className="text-gray-400 font-bold tracking-tight">MarketMind</span>
          </div>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
            Built for Knowvy Technologies Hackathon, Bhopal — May 2, 2025
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">API Status</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
