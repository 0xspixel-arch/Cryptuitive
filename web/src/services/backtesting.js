import { fetchMarketChart } from '../api/coingecko';

export const runBacktest = async (strategy, coinId, days) => {
  const coinMap = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    cardano: 'cardano',
  };

  const chartData = await fetchMarketChart(coinMap[coinId], days);
  const prices = chartData.prices.map(p => p[1]);

  let results;
  switch (strategy) {
    case 'buyhold':
      results = backtestBuyHold(prices);
      break;
    case 'sma':
      results = backtestSMAStrategy(prices);
      break;
    case 'rsi':
      results = backtestRSIStrategy(prices);
      break;
    default:
      results = backtestBuyHold(prices);
  }

  return results;
};

const backtestBuyHold = (prices) => {
  const initialPrice = prices[0];
  const finalPrice = prices[prices.length - 1];
  const totalReturn = ((finalPrice - initialPrice) / initialPrice) * 100;

  const returns = calculateReturns(prices);
  const sharpeRatio = calculateSharpeRatio(returns);
  const maxDrawdown = calculateMaxDrawdown(prices);

  return {
    totalReturn,
    sharpeRatio,
    maxDrawdown,
    winRate: totalReturn > 0 ? 100 : 0,
    totalTrades: 1,
    winningTrades: totalReturn > 0 ? 1 : 0,
  };
};

const backtestSMAStrategy = (prices) => {
  const short = 10;
  const long = 20;

  const shortSMA = calculateSMA(prices, short);
  const longSMA = calculateSMA(prices, long);

  let trades = 0;
  let winningTrades = 0;
  let positions = [];
  let entryPrice = null;

  for (let i = long; i < prices.length; i++) {
    if (shortSMA[i] > longSMA[i] && !entryPrice) {
      entryPrice = prices[i];
    } else if (shortSMA[i] < longSMA[i] && entryPrice) {
      trades++;
      if (prices[i] > entryPrice) {
        winningTrades++;
      }
      positions.push({
        entry: entryPrice,
        exit: prices[i],
        return: ((prices[i] - entryPrice) / entryPrice) * 100,
      });
      entryPrice = null;
    }
  }

  if (entryPrice) {
    const finalReturn = ((prices[prices.length - 1] - entryPrice) / entryPrice) * 100;
    positions.push({
      entry: entryPrice,
      exit: prices[prices.length - 1],
      return: finalReturn,
    });
    if (finalReturn > 0) winningTrades++;
  }

  const totalReturn = positions.reduce((sum, p) => sum + p.return, 0) / Math.max(1, positions.length);
  const returns = prices.map((p, i) => i > 0 ? ((p - prices[i - 1]) / prices[i - 1]) * 100 : 0);
  const sharpeRatio = calculateSharpeRatio(returns);
  const maxDrawdown = calculateMaxDrawdown(prices);

  return {
    totalReturn,
    sharpeRatio,
    maxDrawdown,
    winRate: trades > 0 ? (winningTrades / trades) * 100 : 0,
    totalTrades: trades,
    winningTrades,
  };
};

const backtestRSIStrategy = (prices) => {
  const period = 14;
  const overbought = 70;
  const oversold = 30;

  const rsi = calculateRSI(prices, period);

  let trades = 0;
  let winningTrades = 0;
  let entryPrice = null;

  for (let i = period + 1; i < rsi.length; i++) {
    if (rsi[i] < oversold && !entryPrice) {
      entryPrice = prices[i];
    } else if (rsi[i] > overbought && entryPrice) {
      trades++;
      if (prices[i] > entryPrice) {
        winningTrades++;
      }
      entryPrice = null;
    }
  }

  const returns = prices.map((p, i) => i > 0 ? ((p - prices[i - 1]) / prices[i - 1]) * 100 : 0);
  const totalReturn = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;
  const sharpeRatio = calculateSharpeRatio(returns);
  const maxDrawdown = calculateMaxDrawdown(prices);

  return {
    totalReturn,
    sharpeRatio,
    maxDrawdown,
    winRate: trades > 0 ? (winningTrades / trades) * 100 : 0,
    totalTrades: trades,
    winningTrades,
  };
};

const calculateSMA = (prices, period) => {
  const sma = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      sma.push(null);
    } else {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
  }
  return sma;
};

const calculateRSI = (prices, period = 14) => {
  const rsi = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) {
      gains += change;
    } else {
      losses -= change;
    }

    if (i === period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsi.push(100 - (100 / (1 + rs)));
    } else if (i > period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsi.push(100 - (100 / (1 + rs)));
    }
  }

  return rsi;
};

const calculateReturns = (prices) => {
  return prices.map((p, i) => i > 0 ? ((p - prices[i - 1]) / prices[i - 1]) * 100 : 0);
};

const calculateSharpeRatio = (returns, riskFreeRate = 0.02) => {
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  return stdDev === 0 ? 0 : (avgReturn - riskFreeRate) / stdDev;
};

const calculateMaxDrawdown = (prices) => {
  let maxPrice = prices[0];
  let maxDrawdown = 0;

  for (let i = 1; i < prices.length; i++) {
    maxPrice = Math.max(maxPrice, prices[i]);
    const drawdown = ((prices[i] - maxPrice) / maxPrice) * 100;
    maxDrawdown = Math.min(maxDrawdown, drawdown);
  }

  return maxDrawdown;
};
