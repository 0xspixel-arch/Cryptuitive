# Icon Setup Guide for CryptoInsight PWA

Complete guide for creating and configuring icons for your PWA.

## Icon Files Needed

Create these PNG files and place them in the `public/` folder:

### Essential Icons

1. **favicon.svg** - Vector favicon (optional but recommended)
   - Format: SVG
   - Size: Scalable

2. **favicon-16.png** - Browser tab icon (small)
   - Size: 16x16px
   - Used in browser tabs

3. **favicon-32.png** - Browser tab icon (high DPI)
   - Size: 32x32px
   - Used in browser tabs on high-DPI displays

4. **icon-96.png** - App shortcuts
   - Size: 96x96px
   - Used in shortcut menus

5. **icon-144.png** - Windows tile
   - Size: 144x144px
   - Windows Start menu tile

6. **icon-180.png** - Apple touch icon
   - Size: 180x180px
   - iOS home screen
   - Used by Safari

7. **icon-192.png** - Android home screen
   - Size: 192x192px
   - Primary app icon for Android
   - Minimum required for PWA

8. **icon-192-maskable.png** - Adaptive icon
   - Size: 192x192px
   - Android 13+ adaptive icons
   - Keep important content in center

9. **icon-512.png** - App stores and splash screens
   - Size: 512x512px
   - Used in app stores
   - Splash screen background

10. **icon-512-maskable.png** - Adaptive icon (large)
    - Size: 512x512px
    - Large adaptive icon

### Screenshot Files (Optional)

1. **screenshot-1.png** - Mobile screenshot
   - Size: 540x720px
   - Portrait orientation
   - Shows app on mobile

2. **screenshot-2.png** - Desktop screenshot
   - Size: 1280x720px
   - Landscape orientation
   - Shows app on desktop

## Icon Design Guidelines

### Standard Icons (Any Purpose)

- **Format**: PNG with transparency
- **Shape**: Square (must be exact dimensions)
- **Background**: Include background or transparency
- **Colors**: Match brand colors (use primary blue #2196F3)
- **Text**: Keep minimal or clear
- **Edges**: Can have curves, corners

### Maskable Icons (Android 13+)

Special adaptive icons that work with device shapes.

**Design Requirements**:
- Same dimensions as regular icons
- Keep important content in center "safe zone"
- Allow design to extend to edges for creativity
- Works with rounded corners, squircles, circles
- 80px safe zone for 192x192 icons
- 200px safe zone for 512x512 icons

**Safe Zone Calculation**:
```
Safe Zone Radius = 40% of icon size
- For 192x192: 77px radius circle in center
- For 512x512: 205px radius circle in center
```

**Example Safe Zones**:
- 192x192: 57.6px-134.4px (center area)
- 512x512: 153.6px-358.4px (center area)

## Creating Icons

### Option 1: Figma (Recommended)

1. Create 512x512px canvas
2. Design icon with primary blue background
3. For maskable: Keep content in center 80%
4. Export as PNG (512x512)
5. Use online tool to generate sizes

### Option 2: Adobe Illustrator/Photoshop

1. Create 512x512px document
2. Design at 100% (no scaling)
3. Color space: sRGB
4. Export as PNG 24-bit
5. Generate smaller sizes

### Option 3: Online Tools

**Favicon Generator**:
- https://www.favicon-generator.org/
- Upload image → auto-generates all sizes
- Download ZIP

**PWA Builder Icon Generator**:
- https://www.pwabuilder.com/
- Upload image or design in-browser
- Generate all required sizes

**Icon Generator**:
- https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
- Create adaptive icons
- Generate for multiple platforms

### Option 4: Command Line Tools

```bash
# Using ImageMagick
convert icon-512.png -resize 192x192 icon-192.png
convert icon-512.png -resize 180x180 icon-180.png
convert icon-512.png -resize 144x144 icon-144.png
convert icon-512.png -resize 96x96 icon-96.png
convert icon-512.png -resize 32x32 icon-32.png
convert icon-512.png -resize 16x16 icon-16.png

# Using ImageMagick for maskable versions
convert icon-512.png -resize 512x512 icon-512-maskable.png
convert icon-512.png -resize 192x192 icon-192-maskable.png
```

## Icon File Placement

Place all generated PNG files in `web/public/`:

```
web/
└── public/
    ├── favicon.svg              # Vector favicon
    ├── favicon-16.png           # Browser tab small
    ├── favicon-32.png           # Browser tab
    ├── icon-96.png              # Shortcuts
    ├── icon-144.png             # Windows tile
    ├── icon-180.png             # Apple touch
    ├── icon-192.png             # Android (required)
    ├── icon-192-maskable.png    # Adaptive icon
    ├── icon-512.png             # Store/splash
    ├── icon-512-maskable.png    # Adaptive large
    ├── screenshot-1.png         # Mobile screenshot
    ├── screenshot-2.png         # Desktop screenshot
    ├── manifest.json            # (already here)
    ├── sw.js                    # (already here)
    └── index.html               # (already here)
```

## Update manifest.json

The manifest already includes icon references. Verify they match your file names:

```json
{
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Icon Verification

Check manifest validity:

```bash
cd web/public
# Validate JSON
cat manifest.json | python -m json.tool > /dev/null && echo "Valid JSON"
```

In browser console:

```javascript
// Verify manifest loads
fetch('/manifest.json')
  .then(r => r.json())
  .then(m => {
    console.log('Manifest icons:', m.icons);
    m.icons.forEach(icon => {
      const img = new Image();
      img.src = icon.src;
      img.onload = () => console.log(`✓ ${icon.src} (${icon.sizes})`);
      img.onerror = () => console.log(`✗ ${icon.src} - not found`);
    });
  });
```

## Update HTML Links

The HTML already includes icon links, but verify they exist:

```html
<!-- In index.html and public/index.html -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="apple-touch-icon" href="/icon-180.png" />
```

## Testing Icons

### Desktop Browser

1. Open DevTools (F12)
2. Application → Manifest
3. View icon preview
4. Icons should display correctly

### Mobile Android

1. Open Chrome
2. Tap three dots → Install app
3. Icon should show in install dialog
4. Check home screen icon after install

### iOS Safari

1. Open Safari
2. Tap Share → Add to Home Screen
3. Icon should show on home screen

### Lighthouse Audit

```
DevTools → Lighthouse → PWA
✓ Icon 192x192 found
✓ Icon 512x512 found
✓ Icons valid PNG
```

## Icon Quality Checklist

- ✅ All files are PNG format
- ✅ Sizes exactly match dimensions (no scaling)
- ✅ No broken transparency
- ✅ Clear, recognizable at all sizes
- ✅ Consistent colors
- ✅ Maskable versions have safe content area
- ✅ No text too small (unreadable at 16x16)
- ✅ File names match manifest.json
- ✅ All files in `public/` folder
- ✅ Manifest valid JSON

## Troubleshooting

### Icons not showing

**Check**:
```bash
# Verify files exist
ls -la web/public/icon-*.png
ls -la web/public/favicon*

# Verify manifest paths
grep -o '"src": "[^"]*"' web/public/manifest.json
```

**Fix**:
1. Ensure file names match manifest exactly
2. Use absolute paths starting with `/`
3. All files must be in `public/` folder
4. PNG files must be valid images

### Icon wrong size displayed

**Check**:
- Actual file dimensions (use `identify` command or open in image viewer)
- Manifest lists correct sizes

**Fix**:
```bash
# Check actual dimensions
identify web/public/icon-192.png
# Should output: 192x192

# Resize if needed
convert icon-192.png -resize 192x192! icon-192.png
```

### Maskable icons look wrong

**Check**:
- Important content must be in center 80%
- Check for lost important details at edges

**Fix**:
1. Redesign to keep content more centered
2. Use safe zone guidelines (40% radius)
3. Test on different device shapes

### Lighthouse PWA score low

**Check in DevTools**:
1. Lighthouse → PWA
2. Look for icon warnings
3. Check manifest validity

**Common issues**:
- Missing 192x192 icon (REQUIRED)
- Manifest path incorrect
- Icon files not found
- Invalid PNG format

## Quick Icon Generator Commands

### Using ffmpeg

```bash
# Scale 512 to smaller sizes
ffmpeg -i icon-512.png -vf scale=192:192 icon-192.png
ffmpeg -i icon-512.png -vf scale=180:180 icon-180.png
ffmpeg -i icon-512.png -vf scale=144:144 icon-144.png
ffmpeg -i icon-512.png -vf scale=96:96 icon-96.png
ffmpeg -i icon-512.png -vf scale=32:32 icon-32.png
ffmpeg -i icon-512.png -vf scale=16:16 icon-16.png
```

### Using Python PIL

```python
from PIL import Image

# Load 512x512 image
img = Image.open('icon-512.png')

# Generate sizes
sizes = [192, 180, 144, 96, 32, 16]
for size in sizes:
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(f'icon-{size}.png')

print("Icons generated successfully!")
```

## Resources

- **Icon Guidelines**: https://web.dev/add-manifest/
- **Favicon Best Practices**: https://evilmartians.com/chronicles/how-to-favicon-in-2021
- **Adaptive Icons**: https://www.w3.org/TR/appmanifest/#icon-masks
- **PWA Icon Generator**: https://www.pwabuilder.com/
- **Favicon Generator**: https://www.favicon-generator.org/

## Summary

1. ✅ Create 512x512 PNG icon with brand colors
2. ✅ Generate smaller sizes (192, 180, 144, 96, 32, 16)
3. ✅ Create maskable versions (192, 512)
4. ✅ Place all files in `public/` folder
5. ✅ Verify manifest.json icon paths
6. ✅ Test in DevTools Application tab
7. ✅ Check with Lighthouse audit
8. ✅ Test install on mobile devices

Your icons are critical for PWA installability and visual branding!
