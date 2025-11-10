# Quick Start Guide - CryptoInsight Web PWA

Get your PWA up and running in minutes.

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd web
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app opens at `http://localhost:3000`

### 3. Verify PWA Features
- Open DevTools (F12) → Application tab
- See Service Worker registered
- Check Manifest tab
- Offline mode: Network tab → Offline checkbox

### 4. Test Installation
- **Desktop**: Click address bar install button
- **Android**: Chrome menu → "Install app"
- **iOS**: Share → "Add to Home Screen"

## Project Structure

```
web/
├── public/              # Static files
│   ├── index.html      # Entry point with PWA setup
│   ├── manifest.json   # App manifest (icons, metadata)
│   ├── sw.js           # Service Worker (offline support)
│   └── icon-*.png      # App icons
├── src/                # React app
│   ├── App.jsx         # Main app component
│   ├── screens/        # Page components
│   ├── api/            # API calls
│   ├── services/       # Business logic
│   └── styles/         # CSS
└── vite.config.js      # Vite configuration
```

## Key Files Explained

### 1. `manifest.json` - App Identity
Tells browsers how to display your app:
- App name and icon
- Display mode (standalone = full screen)
- Theme colors
- Shortcuts to app sections

### 2. `sw.js` - Offline Support
Service Worker that:
- Caches app files for offline use
- Updates cache automatically
- Falls back to cache when offline
- Handles background sync

### 3. `index.html` - PWA Registration
- Meta tags for mobile devices
- Service Worker registration
- Icon declarations
- Install prompt handling

## Configuration

### Environment Variables
Create `.env` for optional LLM providers:

```bash
# Hugging Face API (optional)
VITE_HUGGINGFACE_API_KEY=your_key

# OpenAI API (optional)
VITE_OPENAI_API_KEY=your_key
```

See `.env.example` for all options.

## Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run build
# Upload dist/ folder to hosting
```

## PWA Checklist

Before deploying:

- [ ] Run `npm run build` without errors
- [ ] Icons in `public/` match manifest.json
- [ ] Test offline mode in DevTools
- [ ] Lighthouse score ≥ 90 (DevTools → Lighthouse)
- [ ] Works when installed on phone
- [ ] Theme colors display correctly
- [ ] No console errors

## Testing

### Check Service Worker
1. Open DevTools (F12)
2. Application → Service Workers
3. Should show "running"

### Test Offline
1. DevTools → Network
2. Check "Offline"
3. App should still work
4. Uncheck "Offline"
5. Data refreshes automatically

### Lighthouse PWA Audit
1. DevTools → Lighthouse
2. Select "PWA"
3. Click "Analyze page"
4. Fix issues if score < 90

## Common Issues

### Service Worker not registered?
```
✓ Using HTTPS or localhost
✓ /sw.js file exists
✓ Check browser console for errors
→ Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
```

### Install button not showing?
```
✓ Using HTTPS (not http)
✓ Service worker registered
✓ manifest.json valid
✓ Icons present (192x192 minimum)
→ Clear browser storage and reload
```

### Offline not working?
```
✓ Service worker running (check DevTools)
✓ Check DevTools → Application → Cache
✓ Look for errors in sw.js
→ Clear cache and reload
```

## Deployment

### Quick Deploy to Vercel
```bash
npm install -g vercel
cd web
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
cd web
netlify deploy --prod --dir=dist
```

### Manual Deploy (any host)
```bash
npm run build
# Upload entire 'dist' folder to your web server
# Ensure HTTPS is enabled
```

## Next Steps

1. **Add Icons**: Replace placeholder icons in `public/`
   - Create 192x192 and 512x512 PNG files
   - Update `manifest.json` icon paths

2. **Customize Theme**: Edit `public/manifest.json`
   - Change `theme_color` for address bar color
   - Change `background_color` for splash screen

3. **Configure LLM**: Set up AI chat
   - Add API key to `.env` file
   - See README for options

4. **Deploy**: Upload to hosting
   - Ensure HTTPS enabled
   - Monitor Lighthouse score

## Documentation

- **Full PWA Guide**: See `PWA_IMPLEMENTATION.md`
- **App README**: See `README.md`
- **Vite Docs**: https://vitejs.dev/

## Support

### Verify Installation
1. Open app on phone
2. Tap browser menu
3. See "CryptoInsight" in installed apps

### Monitor Performance
- Chrome DevTools → Lighthouse
- Check Core Web Vitals score
- Monitor offline functionality

### Debug Issues
- Check browser console (F12)
- Check Service Worker logs
- Verify manifest.json validity
- Test offline mode
- Monitor network requests

## You're All Set!

Your PWA is ready. Users can now:
- Install app from browser
- Use offline
- Receive notifications
- Share data
- Get fast, app-like experience

Questions? Check `PWA_IMPLEMENTATION.md` or browser DevTools Application tab.
