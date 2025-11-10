import axios from 'axios';

const API_BASE = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async () => {
  try {
    const response = await axios.get(`${API_BASE}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch coins: ${error.message}`);
  }
};

export const fetchCoinDetail = async (coinId) => {
  try {
    const response = await axios.get(`${API_BASE}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch coin detail: ${error.message}`);
  }
};

export const fetchMarketChart = async (coinId, days = 30) => {
  try {
    const response = await axios.get(`${API_BASE}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
        interval: 'daily',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch market chart: ${error.message}`);
  }
};
