# Crypto Insight App

**Two versions available:**
- **React Native Android** - Native mobile app
- **Progressive Web App (PWA)** - Web-based with offline support (see `web/` folder)

A comprehensive cryptocurrency market analysis platform with AI-powered chat and backtesting trading strategies.

## Features

### 🏠 Market Overview
- Real-time cryptocurrency data from CoinGecko API
- Browse top cryptocurrencies with current prices
- Detailed coin information including market cap, 24h changes, and descriptions

### 🤖 AI Chat Assistant
- Interactive chat with configurable open-source LLM support
- Multiple LLM provider options:
  - **Ollama** (local deployment)
  - **Hugging Face API** (cloud-based)
  - **OpenAI-compatible endpoints** (custom deployments)
- Crypto-focused AI assistant for market analysis and trading advice

### 📊 Backtesting Engine
- Test trading strategies against historical data
- Multiple strategy options:
  - **Buy & Hold**: Simple buy and hold strategy
  - **SMA Crossover**: Moving average crossover signals
  - **RSI Strategy**: Relative Strength Index based trading
- Comprehensive performance metrics:
  - Total return and Sharpe ratio
  - Maximum drawdown analysis
  - Win rate and trade statistics

## Technical Stack

- **Framework**: React Native 0.80.2
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **API Integration**: Axios for HTTP requests
- **Data Source**: CoinGecko API (free tier)
- **Target**: Android SDK 24+

## Architecture

```
src/
├── api/
│   ├── coingecko.ts      # Cryptocurrency data API
│   └── llm.ts            # LLM service integration
├── screens/
│   ├── HomeScreen.tsx    # Market overview
│   ├── CoinDetailScreen.tsx # Individual coin details
│   ├── ChatScreen.tsx    # AI chat interface
│   └── BacktestScreen.tsx # Strategy backtesting
└── services/
    └── backtesting.ts    # Backtesting engine
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- React Native development environment
- Android Studio and SDK
- Android device or emulator

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd CryptoInsightApp
   npm install
   ```

2. **Configure LLM Provider** (Optional):
   Edit `src/api/llm.ts` to configure your preferred LLM provider:
   
   **For Ollama (Local)**:
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Pull a model
   ollama pull llama2
   
   # Start Ollama server
   ollama serve
   ```
   
   **For Hugging Face**:
   - Get API key from https://huggingface.co/settings/tokens
   - Update `defaultConfigs.huggingface.apiKey` in `src/api/llm.ts`

3. **Run the application**:
   ```bash
   # Start Metro bundler
   npx react-native start
   
   # Run on Android (in another terminal)
   npx react-native run-android
   ```

## LLM Configuration

The app supports multiple open-source LLM providers:

### Ollama (Recommended for Local Development)
- **Pros**: Free, private, runs locally
- **Cons**: Requires local setup and resources
- **Setup**: Install Ollama and pull models like `llama2`, `mistral`, or `codellama`

### Hugging Face Inference API
- **Pros**: Cloud-based, no local setup
- **Cons**: Rate limits on free tier
- **Setup**: Get free API key and configure endpoint

### OpenAI-Compatible APIs
- **Examples**: LocalAI, FastChat, vLLM
- **Setup**: Deploy your own API server and configure endpoint

## API Integration

### CoinGecko API
- **Free tier**: 50 calls/minute
- **Endpoints used**:
  - `/coins/list` - Cryptocurrency list
  - `/coins/{id}` - Detailed coin data
  - `/coins/{id}/market_chart` - Historical price data

### Backtesting Data
- Historical price data from CoinGecko
- Supports custom date ranges
- Multiple timeframes for strategy testing

## Performance Considerations

- **API Rate Limits**: CoinGecko free tier has rate limits
- **LLM Response Time**: Varies by provider and model size
- **Backtesting**: Large date ranges may take longer to process
- **Memory Usage**: Historical data is cached for performance

## Development Notes

- **TypeScript**: Fully typed for better development experience
- **Error Handling**: Comprehensive error handling for API failures
- **Responsive Design**: Optimized for various Android screen sizes
- **Offline Support**: Basic caching for improved offline experience

## Future Enhancements

- [ ] Portfolio tracking and management
- [ ] Real-time price alerts and notifications
- [ ] Advanced charting with technical indicators
- [ ] Social sentiment analysis integration
- [ ] Custom strategy builder interface
- [ ] Export backtesting results to CSV/PDF
- [ ] Multi-exchange data aggregation
- [ ] DeFi protocol integration

## License

This project is open source and available under the MIT License.

## Disclaimer

This application is for educational and research purposes only. Cryptocurrency trading involves significant risk, and past performance does not guarantee future results. Always do your own research and consider consulting with financial advisors before making investment decisions.
