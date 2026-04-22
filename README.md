# MarketMind — Expert Financial Analyst AI

MarketMind is an institutional-grade financial intelligence platform that provides real-time stock sentiment analysis and market insights. Powered by Google's Gemini 2.0 Flash model, it analyzes market data to generate comprehensive reports including sentiment scores, risk assessments, and growth opportunities.

## Tech Stack
- **Frontend:** React 18 (Vite)
- **AI Engine:** Google Gemini 2.0 Flash
- **Styling:** Tailwind CSS v4
- **Animations:** Motion
- **Data Vis:** Recharts (Radial Sentiment Gauge)
- **Icons:** Lucide React

## Features
- **Intelligent Sentiment Analysis:** Score-based appraisal from -100 to +100.
- **Risk & Opportunity Modeling:** Clear categorical breakdowns of market forces.
- **Dynamic Dashboard:** Information-dense layout optimized for financial data.
- **Real-time Processing:** Direct browser-to-AI communication via the Gemini SDK.
- **Animated Interface:** Smooth state transitions and loading skeletons.

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Gemini API Integration
This project uses the `@google/genai` SDK to interface directly with `gemini-2.0-flash`. The application sends structured system instructions to ensure consistent JSON responses, allowing the frontend to parse complex financial analysis into scannable UI components.

---
**Hackathon Submission Note:**
*Built for Knowvy Technologies Hackathon, Bhopal — May 2, 2025*

## License
MIT
