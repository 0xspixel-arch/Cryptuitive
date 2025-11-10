# HTML PWA Examples - Copy & Use

Ready-to-use HTML code snippets for PWA implementation.

## Complete Minimal PWA HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="CryptoInsight - Cryptocurrency Market Analysis" />
    <meta name="theme-color" content="#2196F3" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/icon-180.png" />
    <title>CryptoInsight</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
      }
    </script>
  </body>
</html>
```

## Complete Full-Featured PWA HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Character Encoding & Viewport -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="color-scheme" content="light dark" />

    <!-- Document Metadata -->
    <meta name="description" content="CryptoInsight - Real-time cryptocurrency market analysis with AI-powered insights" />
    <meta name="author" content="CryptoInsight Team" />
    <meta name="keywords" content="cryptocurrency, crypto, blockchain, trading, analysis, AI" />

    <!-- Theme & Colors -->
    <meta name="theme-color" content="#2196F3" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#1976D2" media="(prefers-color-scheme: dark)" />

    <!-- Mobile Web App Configuration -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="CryptoInsight" />

    <!-- Windows Configuration -->
    <meta name="msapplication-TileColor" content="#2196F3" />
    <meta name="msapplication-TileImage" content="/icon-144.png" />

    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <!-- Favicons - All Variants -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" href="/icon-180.png" />

    <!-- Performance: Preconnect to External APIs -->
    <link rel="preconnect" href="https://api.coingecko.com" />
    <link rel="dns-prefetch" href="https://api.coingecko.com" />

    <!-- Main Stylesheet -->
    <link rel="stylesheet" href="/src/styles/index.css" />

    <!-- Page Title -->
    <title>CryptoInsight - Cryptocurrency Market Analysis</title>
  </head>

  <body>
    <!-- React App Container -->
    <div id="root"></div>

    <!-- App Scripts -->
    <script type="module" src="/src/main.jsx"></script>

    <!-- Service Worker Registration -->
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
              console.log('Service Worker registered:', registration);

              // Check for updates periodically (every 60 seconds)
              setInterval(() => {
                registration.update();
              }, 60000);

              // Listen for controller changes (new SW activated)
              let refreshing;
              navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (refreshing) return;
                refreshing = true;
                // Optionally notify user: location.reload();
              });
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

      // Detect install prompt availability
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Store event for later use
        deferredPrompt = e;
        // Show install button
        showInstallButton();
      });

      // Handle install button click
      function installApp() {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      }

      // Listen for app installation
      window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        deferredPrompt = null;
        hideInstallButton();
      });

      function showInstallButton() {
        const btn = document.getElementById('install-btn');
        if (btn) {
          btn.style.display = 'flex';
          btn.addEventListener('click', installApp);
        }
      }

      function hideInstallButton() {
        const btn = document.getElementById('install-btn');
        if (btn) {
          btn.style.display = 'none';
        }
      }
    </script>

    <!-- Online/Offline Status Tracking -->
    <script>
      // Track online status
      window.addEventListener('online', () => {
        console.log('App is online');
        document.body.classList.remove('offline');
        window.dispatchEvent(new Event('app-online'));
      });

      // Track offline status
      window.addEventListener('offline', () => {
        console.log('App is offline');
        document.body.classList.add('offline');
        window.dispatchEvent(new Event('app-offline'));
      });

      // Initial status
      if (!navigator.onLine) {
        document.body.classList.add('offline');
      }
    </script>
  </body>
</html>
```

## Meta Tags by Category

### Mobile Web App Tags

```html
<!-- Enable app mode on Android -->
<meta name="mobile-web-app-capable" content="yes" />

<!-- Enable app mode on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- iOS status bar appearance options:
     - black-translucent (recommended)
     - black
     - default
-->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- App name on iOS home screen (12 chars max) -->
<meta name="apple-mobile-web-app-title" content="CryptoInsight" />
```

### Theme & Colors

```html
<!-- Address bar color (Chrome, Edge, Opera) -->
<meta name="theme-color" content="#2196F3" />

<!-- Dark mode support -->
<meta name="theme-color" content="#2196F3" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#1976D2" media="(prefers-color-scheme: dark)" />

<!-- Windows tile color -->
<meta name="msapplication-TileColor" content="#2196F3" />

<!-- Windows tile image (144x144) -->
<meta name="msapplication-TileImage" content="/icon-144.png" />
```

### Icon Links

```html
<!-- Vector favicon (scalable, preferred) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Raster favicons (fallback) -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />

<!-- Legacy favicon -->
<link rel="shortcut icon" href="/favicon.ico" />

<!-- Apple touch icon (iOS home screen) -->
<link rel="apple-touch-icon" href="/icon-180.png" />

<!-- Alternative sizes for Apple -->
<link rel="apple-touch-icon" sizes="152x152" href="/icon-152.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/icon-167.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png" />
```

### Performance Links

```html
<!-- Preconnect to critical external domains -->
<link rel="preconnect" href="https://api.coingecko.com" />

<!-- DNS prefetch for non-critical external domains -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />

<!-- Prefetch resources loaded on other pages -->
<link rel="prefetch" href="/images/optional-image.png" />

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
```

## Service Worker Registration Patterns

### Simple Registration

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### Registration with Error Handling

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log('Service Worker registered successfully');
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
```

### Registration with Auto-Update

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      // Check for updates every 60 seconds
      setInterval(() => {
        registration.update();
      }, 60000);

      // Listen for new SW activation
      let refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    });
  });
}
```

## Install Prompt Patterns

### Defer Install Prompt

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-btn').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User response: ${outcome}`);
  deferredPrompt = null;
});
```

### Auto-Install After Interaction

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Show install after first user interaction
document.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  }
}, { once: true });
```

## Online/Offline Handling

### Basic Status Tracking

```javascript
// Listen for online
window.addEventListener('online', () => {
  console.log('App is online');
  document.body.classList.remove('offline');
});

// Listen for offline
window.addEventListener('offline', () => {
  console.log('App is offline');
  document.body.classList.add('offline');
});
```

### With Custom Events

```javascript
window.addEventListener('online', () => {
  window.dispatchEvent(new Event('app-online'));
  // Trigger data sync
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SYNC_DATA'
    });
  }
});

window.addEventListener('offline', () => {
  window.dispatchEvent(new Event('app-offline'));
});

// Listen for app events
window.addEventListener('app-online', () => {
  console.log('Application came online');
  // Show/hide offline UI
});

window.addEventListener('app-offline', () => {
  console.log('Application went offline');
  // Show offline UI
});
```

## Install Button Component

### HTML

```html
<button id="install-btn" style="display: none;">
  <span>📱 Install App</span>
</button>
```

### CSS

```css
#install-btn {
  padding: 12px 24px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 200ms;
}

#install-btn:hover {
  background-color: #1976D2;
}

#install-btn:active {
  transform: scale(0.98);
}
```

## Offline Status Banner

### HTML

```html
<div id="offline-banner" style="display: none;">
  <span>⚠️ You are offline - using cached data</span>
</div>
```

### CSS

```css
#offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: #FFC107;
  color: #000;
  text-align: center;
  font-weight: 600;
  z-index: 1000;
  animation: slideDown 300ms ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
```

### JavaScript

```javascript
const banner = document.getElementById('offline-banner');

window.addEventListener('online', () => {
  banner.style.display = 'none';
});

window.addEventListener('offline', () => {
  banner.style.display = 'block';
});
```

## Manifest Link

```html
<!-- Basic -->
<link rel="manifest" href="/manifest.json" />

<!-- With media query -->
<link rel="manifest" href="/manifest.json" media="(display-mode: standalone)" />
```

## CSP Headers (Server Configuration)

If using a backend, add these headers:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' https:;
  connect-src 'self' https://api.coingecko.com;
```

## Validation Script

Add to verify manifest loads correctly:

```javascript
// Verify manifest
fetch('/manifest.json')
  .then(r => r.json())
  .then(manifest => {
    console.log('✅ Manifest valid');
    console.log('App name:', manifest.name);
    console.log('Icons:', manifest.icons.length);
    console.log('Display mode:', manifest.display);
  })
  .catch(err => console.log('❌ Manifest error:', err));

// Verify Service Worker
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    if (registrations.length > 0) {
      console.log('✅ Service Worker registered');
      registrations.forEach(reg => {
        console.log('State:', reg.active?.state);
      });
    } else {
      console.log('❌ No Service Workers found');
    }
  });

// Verify icons exist
const iconURLs = [
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.svg'
];

iconURLs.forEach(url => {
  const img = new Image();
  img.src = url;
  img.onload = () => console.log(`✅ ${url} found`);
  img.onerror = () => console.log(`❌ ${url} not found`);
});
```

## Common Questions

### Which meta tags are required for PWA?

**Minimum required:**
- `<meta name="viewport">`
- `<link rel="manifest">`
- Service Worker registration

**Strongly recommended:**
- `<meta name="theme-color">`
- `<meta name="mobile-web-app-capable">`
- `<meta name="apple-mobile-web-app-capable">`
- `<link rel="icon">` (favicon)

### Do I need all icon sizes?

**Required:**
- 192x192 (Android minimum)
- 512x512 (recommended for stores)

**Recommended:**
- 180x180 (Apple)
- 32x32 (favicon)
- Maskable versions for Android 13+

### How do I test the install prompt?

**Desktop:**
1. Open DevTools (F12)
2. Application tab → Manifest
3. Check requirements are met
4. Install button appears in address bar

**Mobile:**
1. Open in Chrome
2. Tap menu (three dots)
3. See "Install app" option
4. Tap to install

## Copy-Paste Checklist

- ✅ Copy HTML structure
- ✅ Update `<title>` for your app
- ✅ Update `<meta name="description">`
- ✅ Update icon paths
- ✅ Update manifest.json path
- ✅ Verify Service Worker path is `/sw.js`
- ✅ Place in `index.html`
- ✅ Generate and add icon files
- ✅ Test in DevTools
- ✅ Deploy with HTTPS enabled

Done! Your PWA HTML is ready.
