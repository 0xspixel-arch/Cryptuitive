import React, { useState, useEffect } from 'react';
import { fetchCoins, fetchCoinDetail } from '../api/coingecko';
import '../styles/screens.css';

export default function HomeScreen() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    loadCoins();
  }, []);

  const loadCoins = async () => {
    try {
      setLoading(true);
      const data = await fetchCoins();
      setCoins(data.slice(0, 50));
      setError(null);
    } catch (err) {
      setError('Failed to load cryptocurrency data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinClick = async coin => {
    try {
      setDetailLoading(true);
      const detail = await fetchCoinDetail(coin.id);
      setSelectedCoin(detail);
    } catch (err) {
      console.error('Failed to load coin detail:', err);
    } finally {
      setDetailLoading(false);
    }
  };

  if (selectedCoin) {
    return (
      <div className="screen">
        <div className="coin-detail">
          <button
            className="back-button"
            onClick={() => setSelectedCoin(null)}
          >
            ← Back
          </button>

          <div className="coin-header">
            {selectedCoin.image?.large && (
              <img src={selectedCoin.image.large} alt={selectedCoin.name} />
            )}
            <div>
              <h1>{selectedCoin.name}</h1>
              <p className="symbol">{selectedCoin.symbol?.toUpperCase()}</p>
            </div>
          </div>

          <div className="coin-stats">
            <div className="stat">
              <span className="label">Current Price</span>
              <span className="value">
                ${selectedCoin.market_data?.current_price?.usd?.toFixed(2) || 'N/A'}
              </span>
            </div>
            <div className="stat">
              <span className="label">Market Cap</span>
              <span className="value">
                ${selectedCoin.market_data?.market_cap?.usd
                  ? (selectedCoin.market_data.market_cap.usd / 1e9).toFixed(2) + 'B'
                  : 'N/A'}
              </span>
            </div>
            <div className="stat">
              <span className="label">24h Change</span>
              <span className={`value ${selectedCoin.market_data?.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                {selectedCoin.market_data?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
            <div className="stat">
              <span className="label">All-Time High</span>
              <span className="value">
                ${selectedCoin.market_data?.ath?.usd?.toFixed(2) || 'N/A'}
              </span>
            </div>
          </div>

          {selectedCoin.description?.en && (
            <div className="description">
              <h3>About</h3>
              <p>{selectedCoin.description.en.slice(0, 300)}...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Market Overview</h1>
        <button className="refresh-btn" onClick={loadCoins} disabled={loading}>
          ↻ Refresh
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading cryptocurrencies...</div>
      ) : (
        <div className="coins-list">
          {coins.map(coin => (
            <button
              key={coin.id}
              className="coin-item"
              onClick={() => handleCoinClick(coin)}
            >
              <div className="coin-info">
                {coin.image && (
                  <img src={coin.image} alt={coin.name} className="coin-icon" />
                )}
                <div className="coin-details">
                  <h3>{coin.name}</h3>
                  <p className="symbol">{coin.symbol?.toUpperCase()}</p>
                </div>
              </div>
              <div className="coin-price">
                <p className="price">${coin.current_price?.toFixed(2) || 'N/A'}</p>
                <p
                  className={`change ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
