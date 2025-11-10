import React, { useState } from 'react';
import { runBacktest } from '../services/backtesting';
import '../styles/screens.css';

const STRATEGIES = [
  { id: 'buyhold', name: 'Buy & Hold' },
  { id: 'sma', name: 'SMA Crossover' },
  { id: 'rsi', name: 'RSI Strategy' },
];

const COINS = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'cardano', name: 'Cardano' },
];

export default function BacktestScreen() {
  const [strategy, setStrategy] = useState('buyhold');
  const [coin, setCoin] = useState('bitcoin');
  const [days, setDays] = useState('30');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleBacktest = async () => {
    try {
      setLoading(true);
      setError(null);
      const backTestResults = await runBacktest(strategy, coin, parseInt(days));
      setResults(backTestResults);
    } catch (err) {
      setError('Failed to run backtest. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Backtest Strategies</h1>
      </div>

      <div className="backtest-form">
        <div className="form-group">
          <label>Strategy</label>
          <select
            value={strategy}
            onChange={e => setStrategy(e.target.value)}
            disabled={loading}
          >
            {STRATEGIES.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cryptocurrency</label>
          <select
            value={coin}
            onChange={e => setCoin(e.target.value)}
            disabled={loading}
          >
            {COINS.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Period (days)</label>
          <input
            type="number"
            value={days}
            onChange={e => setDays(e.target.value)}
            min="1"
            max="365"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleBacktest}
          disabled={loading}
          className="backtest-button"
        >
          {loading ? 'Running...' : 'Run Backtest'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results && (
        <div className="results">
          <h3>Results</h3>
          <div className="results-grid">
            <div className="result-item">
              <span className="label">Total Return</span>
              <span className={`value ${results.totalReturn >= 0 ? 'positive' : 'negative'}`}>
                {results.totalReturn.toFixed(2)}%
              </span>
            </div>
            <div className="result-item">
              <span className="label">Sharpe Ratio</span>
              <span className="value">{results.sharpeRatio.toFixed(2)}</span>
            </div>
            <div className="result-item">
              <span className="label">Max Drawdown</span>
              <span className={`value ${results.maxDrawdown >= 0 ? 'positive' : 'negative'}`}>
                {results.maxDrawdown.toFixed(2)}%
              </span>
            </div>
            <div className="result-item">
              <span className="label">Win Rate</span>
              <span className="value">{results.winRate.toFixed(2)}%</span>
            </div>
            <div className="result-item">
              <span className="label">Total Trades</span>
              <span className="value">{results.totalTrades}</span>
            </div>
            <div className="result-item">
              <span className="label">Winning Trades</span>
              <span className="value positive">{results.winningTrades}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
