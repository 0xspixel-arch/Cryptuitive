import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import BacktestScreen from './screens/BacktestScreen';
import './styles/app.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('market');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'market':
        return <HomeScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'backtest':
        return <BacktestScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app">
      <div className="app-content">
        {renderPage()}
      </div>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${currentPage === 'market' ? 'active' : ''}`}
          onClick={() => setCurrentPage('market')}
          title="Market Overview"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-2h2v20h-2zm4 4h2v16h-2z" />
          </svg>
          <span>Market</span>
        </button>

        <button
          className={`nav-item ${currentPage === 'chat' ? 'active' : ''}`}
          onClick={() => setCurrentPage('chat')}
          title="AI Chat"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Chat</span>
        </button>

        <button
          className={`nav-item ${currentPage === 'backtest' ? 'active' : ''}`}
          onClick={() => setCurrentPage('backtest')}
          title="Backtest Strategies"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M21 21H3V3h9V1H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9h-2v9z" />
            <path d="M21 1v7h-7" />
            <path d="M21 1L9 13" />
          </svg>
          <span>Backtest</span>
        </button>
      </nav>

      {!isOnline && (
        <div className="offline-banner">
          <span>You are offline - using cached data</span>
        </div>
      )}
    </div>
  );
}
