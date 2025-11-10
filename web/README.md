# CryptoInsight Web - Progressive Web App

A modern web version of CryptoInsight with full Progressive Web App (PWA) support for offline functionality, app installation, and responsive design.

## Features

### PWA Capabilities
- **Installable**: Add to home screen on mobile or desktop
- **Offline Support**: Works offline with cached data via Service Worker
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Fast**: Vite-powered fast development and build process
- **Secure**: HTTPS-ready with proper service worker caching strategies

### Application Features
- Real-time cryptocurrency market data from CoinGecko API
- AI-powered chat assistant with multiple LLM provider support
- Backtesting engine with technical trading strategies
- Detailed coin information and market analysis

## Installation

### Prerequisites
- Node.js 18+
- npm

### Setup

1. **Navigate to web directory**:
   ```bash
   cd web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

4. **Build for production**:
   ```bash
   npm run build
   ```

   Output will be in the `dist/` directory

## PWA Implementation Details

### Manifest Configuration (`public/manifest.json`)

The app manifest defines:
- **App Identity**: Name, description, theme colors
- **Display**: Standalone mode (full-screen app experience)
- **Orientation**: Portrait primary with landscape support
- **Icons**: Multiple sizes and purposes (adaptive icons, masked icons)
- **Shortcuts**: Quick access to app sections
- **Screenshots**: App preview images
- **Share Target**: Share content to the app

### Service Worker (`public/sw.js`)

Handles:
- **Installation**: Cache essential static assets
- **Network Strategy**:
  - API calls: Network first, cache fallback
  - Static assets: Cache first, network fallback
- **Background Sync**: Retry failed requests when online
- **Push Notifications**: Display and handle notifications
- **Cache Management**: Auto-cleanup of old cache versions

### HTML Integration (`public/index.html`)

Includes:
- Meta tags for mobile web app capability
- Apple-specific configuration
- Windows tile image
- Manifest link and icon declarations
- Service worker registration script
- Install prompt handling

## LLM Configuration

Configure your preferred LLM provider in the app:

### Ollama (Local)
```javascript
// src/api/llm.js - setLLMProvider('ollama')
// Ensure Ollama is running on http://localhost:11434
```

### Hugging Face API
```javascript
// Set environment variable:
// VITE_HUGGINGFACE_API_KEY=your_api_key
```

### OpenAI
```javascript
// Set environment variable:
// VITE_OPENAI_API_KEY=your_api_key
```

## Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents to your web server
3. Ensure HTTPS is enabled (required for PWA)
4. Configure CORS headers if needed for API calls

## PWA Installation

### On Mobile (Android)
1. Open the app in Chrome
2. Tap menu (three dots) → "Install app" or "Add to Home screen"
3. Confirm installation

### On Mobile (iOS)
1. Open the app in Safari
2. Tap Share → "Add to Home Screen"
3. Name the shortcut and add

### On Desktop (Windows)
1. Open the app in Edge or Chrome
2. Click install button in the address bar
3. Confirm installation

### On Desktop (Mac)
1. Open the app in Chrome
2. Click menu (three dots) → "Install app"
3. Confirm installation

## Offline Support

The app automatically caches:
- HTML and static assets
- API responses (with TTL)
- UI resources (images, styles)

When offline:
- Market data shows cached prices
- Chat may be limited (depends on provider)
- Backtesting uses cached historical data

Background sync attempts to refresh data when connection is restored.

## Performance Optimization

- Code splitting via Vite
- Lazy-loaded components
- Optimized service worker caching
- Minimal JavaScript bundle
- CSS-in-JS where necessary

## Browser Support

- Chrome/Edge 76+
- Firefox 67+
- Safari 12.1+
- Samsung Internet 6+

PWA features require browsers with:
- Service Worker support
- Cache API support
- IndexedDB (optional, for larger datasets)

## Development Tips

- Use Firefox DevTools → Storage to inspect Service Worker cache
- Check Chrome DevTools → Application → Service Workers for status
- Test offline mode: DevTools → Network → Offline
- Lighthouse audit: DevTools → Lighthouse for PWA scoring

## File Structure

```
web/
├── public/
│   ├── index.html          # Main HTML entry point
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   ├── icon-*.png          # App icons
│   └── favicon.*            # Favicon variants
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component
│   ├── screens/            # Page components
│   ├── api/                # API integration
│   ├── services/           # Business logic
│   └── styles/             # Global and component styles
├── package.json
├── vite.config.js
└── README.md
```

## Troubleshooting

### Service Worker not updating
- Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Uninstall and reinstall the app

### App icon not showing
- Verify icon files exist in `public/`
- Check manifest.json icon paths
- Icon files should be at least 192x192px (512x512px recommended)

### Offline data not syncing
- Check network connectivity
- Review Service Worker logs in DevTools
- Ensure API endpoints are configured correctly

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
1. Check browser console for errors
2. Verify API configurations
3. Test in different browsers
4. Check Service Worker status in DevTools
