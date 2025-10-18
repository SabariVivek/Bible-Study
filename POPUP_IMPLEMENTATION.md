# Passages Popup Implementation

## Overview
This implementation allows users to click on verse badges in the Life of Jesus cards to view the full passage content in a popup window.

## Features Implemented

### 1. Clickable Verse Badges
- All verse badges in `life-of-jesus-cards.html` are now clickable
- Visual hover effects indicate interactivity:
  - Slight upward movement on hover
  - Shadow effect for depth
  - Color darkening for each gospel type

### 2. Dynamic Popup Loading
- Clicking a verse badge opens a popup window with the passage content
- Popup window is centered on screen (800x600px)
- Uses the `passages-popup.html` template

### 3. Smart Data Handling
- **First two cards (Luke 1:5-25 and Luke 1:26-38)**: Display full Tamil text from `passages.js`
- **Remaining cards**: Display "Data yet to be seeded" message when passage data is not available

### 4. Verse Reference to Key Conversion
The system automatically converts verse references to passage keys:
- Example: "Luke 1:5-25" → "luke_1_5_25"
- Handles Tamil and English text
- Normalizes formatting (spaces, colons, hyphens)

## File Changes

### 1. `passages-popup.html`
- Updated script source path to `scripts/data/passages.js`
- Added support for URL parameters (`?passage=key`)
- Added localStorage fallback for passage key storage
- Displays "Data yet to be seeded" for missing passages
- Shows verse reference even when data is missing

### 2. `life-of-jesus-cards.html`
- Added CSS hover effects for badges
- Made badges clickable with event listeners
- Added `verseToPassageKey()` function to normalize verse references
- Added `openPassagePopup()` function to open popup window
- Stores passage data in localStorage for popup access

## How It Works

1. **User clicks a verse badge** (e.g., "Luke 1:5-25")
2. **System converts reference** to key format ("luke_1_5_25")
3. **Stores data** in localStorage:
   - `currentPassage`: The normalized key
   - `verseReference`: The original verse text
4. **Opens popup window** with URL parameter
5. **Popup loads and checks** if passage exists in `passages.js`:
   - **If exists**: Displays full Tamil verses
   - **If not exists**: Shows "Data yet to be seeded" message

## Adding New Passages

To add more passage data, edit `scripts/data/passages.js`:

```javascript
const passages = {
  "luke_1_5_25": { ... },
  "luke_1_26_38": { ... },
  // Add new passages here
  "luke_1_39_56": {
    "reference": "லூக்கா 1:39-56",
    "badgeLabel": "லூக்கா 1:39-56",
    "verses": [
      "39. அந்நாட்களில் மரியாள்...",
      // Add all verses
    ]
  }
};
```

## Testing

1. Open `life-of-jesus-cards.html` in a browser
2. Click on "Luke 1:5-25" badge → Should show full Tamil passage
3. Click on "Luke 1:26-38" badge → Should show full Tamil passage
4. Click on any other verse badge → Should show "Data yet to be seeded"

## Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled
- Popup blockers must allow popups from the site
