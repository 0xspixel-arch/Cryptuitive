# HTML PWA Meta Tags & Implementation Guide

Complete reference for all HTML meta tags and links needed for full PWA support across all platforms.

## Complete HTML Head Section

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Character Encoding & Viewport -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Document Metadata -->
    <meta name="description" content="CryptoInsight - Real-time cryptocurrency market analysis with AI-powered insights" />
    <meta name="author" content="CryptoInsight Team" />
    <meta name="keywords" content="cryptocurrency, crypto, blockchain, trading, analysis" />

    <!-- Theme & Colors -->
    <meta name="theme-color" content="#2196F3" />
    <meta name="msapplication-TileColor" content="#2196F3" />

    <!-- Mobile Web App (Android) -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="CryptoInsight" />

    <!-- Windows -->
    <meta name="msapplication-TileImage" content="/icon-144.png" />
    <meta name="msapplication-config" content="/browserconfig.xml" />

    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="apple-touch-icon" href="/icon-180.png" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <!-- Preconnect to External Domains -->
    <link rel="preconnect" href="https://api.coingecko.com" />
    <link rel="dns-prefetch" href="https://api.coingecko.com" />

    <!-- Base Stylesheet -->
    <link rel="stylesheet" href="/src/styles/index.css" />

    <!-- Page Title -->
    <title>CryptoInsight - Cryptocurrency Market Analysis</title>
  </head>
  <body>
    <div id="root"></div>

    <!-- Main App Script -->
    <script type="module" src="/src/main.jsx"></script>

    <!-- Service Worker Registration -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
              console.log('Service Worker registered:', registration);

              // Check for updates periodically
              setInterval(() => {
                registration.update();
              }, 60000);
            })
            .catch(error => {
              console.error('Service Worker registration failed:', error);
            });
        });
      }
    </script>

    <!-- Install Prompt Handling -->
    <script>
      let deferredPrompt;

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
      });

      window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        deferredPrompt = null;
        hideInstallButton();
      });

      function showInstallButton() {
        const btn = document.getElementById('install-btn');
        if (btn) btn.style.display = 'block';
      }

      function hideInstallButton() {
        const btn = document.getElementById('install-btn');
        if (btn) btn.style.display = 'none';
      }

      // Optional: Auto-show after user interacts
      document.addEventListener('click', () => {
        showInstallButton();
      }, { once: true });
    </script>

    <!-- Network Status Tracking -->
    <script>
      window.addEventListener('online', () => {
        console.log('App is online');
        window.dispatchEvent(new Event('app-online'));
      });

      window.addEventListener('offline', () => {
        console.log('App is offline');
        window.dispatchEvent(new Event('app-offline'));
      });
    </script>
  </body>
</html>
```

## Meta Tag Reference

### Core Meta Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `charset` | Character encoding | `<meta charset="UTF-8" />` |
| `viewport` | Mobile scaling | `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` |
| `description` | Page description | `<meta name="description" content="..." />` |

### Theme & Colors

| Meta Tag | Purpose | Browser | Example Value |
|----------|---------|---------|---------|
| `theme-color` | Address bar color | Chrome, Edge, Opera | `#2196F3` |
| `apple-mobile-web-app-status-bar-style` | iOS status bar | Safari on iOS | `black-translucent`, `black`, `default` |
| `msapplication-TileColor` | Windows tile color | Windows | `#2196F3` |

### Mobile Web App Flags

```html
<!-- Enable fullscreen mode on Android -->
<meta name="mobile-web-app-capable" content="yes" />

<!-- Enable fullscreen mode on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- iOS status bar appearance -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- iOS app name (12 chars max recommended) -->
<meta name="apple-mobile-web-app-title" content="CryptoInsight" />
```

### Windows Configuration

```html
<!-- Windows tile image -->
<meta name="msapplication-TileImage" content="/icon-144.png" />

<!-- Windows tile color -->
<meta name="msapplication-TileColor" content="#2196F3" />

<!-- Windows browser config (optional) -->
<meta name="msapplication-config" content="/browserconfig.xml" />
```

## Link Tags

### Manifest & Icons

```html
<!-- PWA Manifest (REQUIRED for PWA) -->
<link rel="manifest" href="/manifest.json" />

<!-- Favicon (modern SVG) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Favicon (fallback PNG sizes) -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />

<!-- Apple touch icon (for home screen on iOS) -->
<link rel="apple-touch-icon" href="/icon-180.png" />

<!-- Legacy favicon -->
<link rel="shortcut icon" href="/favicon.ico" />
```

### Performance Links

```html
<!-- Preconnect to external API domains -->
<link rel="preconnect" href="https://api.coingecko.com" />

<!-- DNS prefetch for external services -->
<link rel="dns-prefetch" href="https://api.coingecko.com" />

<!-- Prefetch for resources loaded on other pages -->
<link rel="prefetch" href="/static/resource.js" />

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
```

## Service Worker Registration

### Basic Registration

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  });
}
```

### Registration with Updates

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered');

        // Check for updates every minute
        setInterval(() => {
          registration.update();
        }, 60000);

        // Listen for controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New Service Worker activated');
          // Optional: Notify user to reload
        });
      });
  });
}
```

## Install Prompt Handling

### Detect Install Prompt

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();

  // Store the prompt for later use
  deferredPrompt = e;

  // Show your custom install button
  document.getElementById('install-btn').style.display = 'block';
});

// Handle install button click
document.getElementById('install-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferred prompt
    deferredPrompt = null;
  }
});

// Listen for app installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
  // Hide install button
  document.getElementById('install-btn').style.display = 'none';
});
```

## Network Status

### Track Online/Offline Status

```javascript
// Listen for online status
window.addEventListener('online', () => {
  console.log('App is online');
  document.body.classList.remove('offline');
  document.body.classList.add('online');

  // Trigger data sync
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SYNC_DATA'
    });
  }
});

// Listen for offline status
window.addEventListener('offline', () => {
  console.log('App is offline');
  document.body.classList.remove('online');
  document.body.classList.add('offline');
});

// Check current status
console.log('Is online?', navigator.onLine);
```

## Performance Optimizations

### Preconnect Strategy

```html
<!-- For APIs used immediately -->
<link rel="preconnect" href="https://api.coingecko.com" />

<!-- For secondary resources -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />

<!-- For optional/deferred resources -->
<link rel="prefetch" href="/images/optional-image.png" />
```

### Resource Preloading

```html
<!-- Critical fonts -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />

<!-- Critical CSS -->
<link rel="preload" href="/styles/critical.css" as="style" />
<link rel="stylesheet" href="/styles/critical.css" />

<!-- Critical JavaScript -->
<script src="/js/critical.js"></script>

<!-- Deferred resources -->
<script defer src="/js/app.js"></script>
```

## Complete File Structure

```
public/
├── index.html                   # Main entry point
├── manifest.json               # PWA manifest
├── sw.js                        # Service Worker
├── browserconfig.xml            # Windows config (optional)
├── favicon.svg                  # Vector favicon
├── favicon.ico                  # Legacy favicon
├── favicon-16.png              # 16x16 favicon
├── favicon-32.png              # 32x32 favicon
├── icon-96.png                 # 96x96 icon
├── icon-144.png                # Windows tile
├── icon-180.png                # Apple touch icon
├── icon-192.png                # Android home
├── icon-192-maskable.png       # Android adaptive
├── icon-512.png                # App store
├── icon-512-maskable.png       # Adaptive icon
├── screenshot-1.png            # Mobile screenshot
└── screenshot-2.png            # Desktop screenshot
```

## Validation

### Check Manifest

```javascript
// In browser console
fetch('/manifest.json')
  .then(r => r.json())
  .then(manifest => {
    console.log('Manifest valid:', manifest);
    console.log('Icons:', manifest.icons);
    console.log('Display:', manifest.display);
  });
```

### Verify Service Worker

```javascript
// In browser console
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    console.log('Service Worker registered:', registrations.length > 0);
    registrations.forEach(reg => {
      console.log('State:', reg.active?.state || reg.installing?.state);
    });
  });
```

### Lighthouse Audit

```bash
# Chrome DevTools
1. F12 → Lighthouse tab
2. Select "PWA"
3. Click "Analyze page load"
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Service Worker | ✅ 40+ | ✅ 44+ | ⚠️ 11.1+ | ✅ 17+ |
| Web Manifest | ✅ 39+ | ✅ 49+ | ❌ No | ✅ 79+ |
| Install Prompt | ✅ 68+ | ❌ No | ❌ No | ✅ 79+ |
| Apple Touch Icon | ✅ | ✅ | ✅ | ✅ |
| Meta Tags | ✅ All | ✅ All | ✅ All | ✅ All |

## Common Issues & Solutions

### Manifest not found
```
✓ Check path in <link rel="manifest">
✓ Ensure manifest.json exists in public/
✓ Check MIME type: application/json
✓ Verify manifest.json is valid JSON
```

### Icons not showing
```
✓ Icons must be square PNG files
✓ Minimum size: 192x192px
✓ Paths must be absolute (/icon.png)
✓ Verify "sizes" matches actual dimensions
```

### Service Worker not registering
```
✓ Must be HTTPS (or localhost)
✓ sw.js must be served with correct MIME type
✓ Service Worker must be at root or same scope
✓ Check console for CORS errors
```

### Install prompt not appearing
```
✓ Site must be HTTPS
✓ Manifest must be valid and linked
✓ Service Worker must be registered
✓ Icons must be present and valid
✓ beforeinstallprompt event must fire
```
