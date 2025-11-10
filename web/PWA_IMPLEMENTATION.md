# PWA Implementation Guide

This document explains the complete PWA implementation for CryptoInsight Web.

## What is a Progressive Web App?

A PWA is a web application that uses modern web capabilities to deliver an app-like experience:
- **Progressive**: Works for every user, regardless of browser
- **Responsive**: Fits any form factor (desktop, tablet, mobile)
- **Connectivity independent**: Functions offline or on low-quality networks
- **App-like**: Uses the app shell model to provide navigation and interactions
- **Fresh**: Always up-to-date via service workers
- **Safe**: Served over HTTPS
- **Discoverable**: Identified as an "application" by manifest
- **Re-engageable**: Can send notifications and use web push
- **Installable**: Can be added to home screen without app store

## Key Files

### 1. **public/manifest.json**

The web app manifest is a JSON file that describes your app.

**Key Properties:**
```json
{
  "name": "Full app name",
  "short_name": "Short name (12 chars max)",
  "description": "App description",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#2196F3",
  "icons": [...]
}
```

**Icons Configuration:**
- Minimum 192x192px (required)
- 512x512px recommended
- Multiple sizes for different platforms
- Maskable icons for adaptive icons (Android 13+)

**Screenshots:**
- Used by app stores and installation prompts
- Narrow (540x720px) and wide (1280x720px) formats
- Help users understand app functionality

### 2. **public/sw.js**

The Service Worker is a JavaScript worker that runs in the background and manages caching and offline functionality.

**Lifecycle:**

```
Registration → Installation → Activation → Fetch/Message Events
```

**Stages:**

1. **Installation (`install` event)**
   - Triggered when worker is first registered
   - Pre-cache essential resources
   - Skip waiting to activate immediately

2. **Activation (`activate` event)**
   - Triggered when worker takes control
   - Clean up old cache versions
   - Claim all clients

3. **Fetch (`fetch` event)**
   - Triggered for all network requests
   - Implement caching strategies
   - Offline fallback

**Caching Strategies Implemented:**

- **Network First** (APIs):
  ```
  Network → Success → Cache → Return
  Network → Fail → Check Cache → Return or Error
  ```
  Best for: API calls that need fresh data

- **Cache First** (Static assets):
  ```
  Cache → Hit → Return
  Cache → Miss → Network → Return and Cache
  ```
  Best for: Static assets that rarely change

**Update Mechanism:**
- Service workers update in the background
- Old cache versions are cleaned on activation
- Users get fresh content on next visit

### 3. **public/index.html**

HTML entry point with PWA-specific meta tags and configurations.

**Essential Meta Tags:**

```html
<!-- Mobile Web App -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#2196F3" />
<meta name="msapplication-TileColor" content="#2196F3" />

<!-- Manifest -->
<link rel="manifest" href="/manifest.json" />

<!-- Icons -->
<link rel="apple-touch-icon" href="/icon-180.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
```

**Service Worker Registration:**

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
```

**Install Prompt Handling:**

```javascript
let deferredPrompt;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
  // Show install button
});

// Later, when user clicks install button:
if (deferredPrompt) {
  deferredPrompt.prompt();
}
```

## Icon Requirements

### Standard Icons

| Size | Purpose | Format |
|------|---------|--------|
| 16x16 | Favicon (browsers) | PNG |
| 32x32 | Favicon (high DPI) | PNG |
| 96x96 | App shortcuts | PNG |
| 144x144 | Windows tile | PNG |
| 180x180 | Apple touch icon | PNG |
| 192x192 | Android home screen | PNG |
| 512x512 | App stores, splash screens | PNG |

### Maskable Icons (Android 13+)

Adaptive icons that work with different device shapes:
- Same dimensions as regular icons
- Kept within a 'safe zone' (center 2/3)
- Allowed to extend to edges for creative designs
- Marked with `"purpose": "maskable"` in manifest

**Design Guidelines:**
- Create 192x192 and 512x512 versions
- Keep important content in center
- Test on different backgrounds
- Use contrasting colors

### Icon Creation Tools

- **Figma**: Design with plugins
- **Photoshop**: Manual creation
- **Online Tools**:
  - https://www.favicon-generator.org/
  - https://www.pwabuilder.com/ (PWA Builder has icon generator)
  - https://www.simpleicon.com/

## HTML Meta Tags Explained

```html
<!-- Viewport: Ensures proper scaling on mobile devices -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Apple: Makes Safari treat as web app (home screen only) -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- Apple: Custom status bar color for home screen app -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- Apple: App name on home screen -->
<meta name="apple-mobile-web-app-title" content="CryptoInsight" />

<!-- Theme: Address bar color on Android -->
<meta name="theme-color" content="#2196F3" />

<!-- Windows: Tile color for pinned start menu tile -->
<meta name="msapplication-TileColor" content="#2196F3" />
<meta name="msapplication-TileImage" content="/icon-144.png" />

<!-- Standard: Mobile web app capable -->
<meta name="mobile-web-app-capable" content="yes" />

<!-- Description: For app stores and search engines -->
<meta name="description" content="App description" />
```

## Caching Strategy Details

### API Requests (Network First)

```
1. Check network
2. If successful, cache and return
3. If failed, return from cache
4. If nothing cached, show error
```

**Used for:**
- CoinGecko API calls
- LLM API requests
- Real-time data

### Static Assets (Cache First)

```
1. Check cache
2. If found, return immediately
3. If not found, fetch from network
4. Cache and return
```

**Used for:**
- HTML, CSS, JavaScript
- Images
- Manifest
- Static resources

### Hybrid Approach

Some requests use both strategies:
- Serve from cache immediately
- Fetch fresh version in background
- Update cache when new data arrives
- Notify user when update available

## Testing PWA Features

### Desktop

**Chrome/Edge:**
1. Open DevTools (F12)
2. Go to Application tab
3. Check Service Workers section
4. Install via browser menu

**Firefox:**
1. Open DevTools (F12)
2. Storage tab → Service Workers
3. Check status and updates

### Mobile

**Android:**
1. Open in Chrome
2. Tap three dots → "Install app"
3. Confirm installation
4. App appears on home screen

**iOS:**
1. Open in Safari
2. Tap Share button
3. "Add to Home Screen"
4. Note: Limited PWA support, no service worker

### Testing Offline

**Chrome:**
1. DevTools → Network
2. Check "Offline" checkbox
3. Test app functionality

**Firefox:**
1. Tools → Web Developer → Work Offline
2. Test functionality

## Performance Monitoring

### Lighthouse Audit

```bash
# In Chrome DevTools
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select "PWA"
4. Click "Analyze"
```

**Scoring:**
- 90+: Excellent PWA
- 50-89: Good, needs improvement
- <50: Significant work needed

**Key Metrics:**
- Manifest present and valid
- Service worker registered
- HTTPS enabled
- Responsive design
- Fast load time

### Key Metrics to Monitor

1. **First Contentful Paint (FCP)**: < 1.8s
2. **Largest Contentful Paint (LCP)**: < 2.5s
3. **Cumulative Layout Shift (CLS)**: < 0.1
4. **Total Blocking Time (TBT)**: < 200ms

## Security Considerations

### HTTPS Required

PWAs require HTTPS (except localhost for development):
- Service workers only register over HTTPS
- Manifest requires secure context
- APIs enforce secure origin

### Content Security Policy

Recommend CSP headers:
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https:;
```

### API Security

- Never expose API keys in client code
- Use environment variables
- Proxy sensitive requests through backend
- Implement CORS properly

## Deployment Checklist

- [ ] HTTPS enabled
- [ ] Manifest.json valid and accessible
- [ ] Service worker registered
- [ ] All required icons present
- [ ] Icons have correct sizes
- [ ] Meta tags in HTML
- [ ] Lighthouse PWA score ≥ 90
- [ ] Works offline
- [ ] Install prompt appears
- [ ] App works when installed
- [ ] Theme colors correct
- [ ] Orientation works as expected
- [ ] CORS headers configured
- [ ] No console errors
- [ ] Mobile responsive

## Troubleshooting

### Service Worker not working

**Problem**: Service worker not registering
- Check HTTPS is enabled
- Verify `/sw.js` is accessible
- Check browser console for errors
- Clear cache and reload

**Problem**: Old version still showing
- Unregister service worker in DevTools
- Clear storage
- Hard refresh (Ctrl+Shift+R)
- Uninstall and reinstall app

### Icons not showing

**Problem**: Icon not appearing on home screen
- Verify icon files exist
- Check sizes (192x192 minimum)
- Verify manifest.json paths
- PNG format must be valid
- Check icon purpose field

### Install prompt not appearing

**Problem**: "Add to Home Screen" not showing
- Must be on HTTPS
- Service worker must be registered
- Manifest must be valid
- Show at least 2 screens first (Android)
- Check beforeinstallprompt event

### Offline not working

**Problem**: App doesn't work offline
- Check service worker activation
- Verify fetch event handlers
- Check cache in DevTools
- Monitor network requests
- Check for CORS errors

## Resources

- [MDN PWA Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google PWA Checklist](https://developers.google.com/web/progressive-web-apps/checklist)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [Service Worker Spec](https://w3c.github.io/ServiceWorker/)
