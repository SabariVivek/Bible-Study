# Verse Badge Visual Design Guide

## Updated Badge Style

### Color Scheme
The badges now use a **blue color theme** that matches modern Bible app designs:

- **Background**: Light blue (#e7f0ff) 
- **Text**: Royal blue (#2563eb)
- **Border**: Light blue border (#bfdbfe)
- **Hover Background**: Slightly darker blue (#dbeafe)
- **Hover Border**: Medium blue (#93c5fd)

### Design Specifications

```css
.verse-badge {
    /* Layout */
    display: inline-block;
    padding: 4px 12px;          /* Comfortable padding */
    margin: 2px 4px;            /* Breathing room between badges */
    
    /* Colors */
    background-color: #e7f0ff;  /* Light blue background */
    color: #2563eb;             /* Royal blue text */
    border: 1px solid #bfdbfe;  /* Light border for definition */
    
    /* Shape */
    border-radius: 6px;         /* Subtle rounded corners */
    
    /* Typography */
    font-size: 0.9rem;          /* Slightly smaller than body */
    font-weight: 500;           /* Medium weight */
    letter-spacing: 0.2px;      /* Slight spacing for readability */
    white-space: nowrap;        /* Keep references together */
    
    /* Effects */
    transition: all 0.2s ease;  /* Smooth hover transition */
}
```

## Visual Examples

### Single Verse Reference
```
Text: "...referred to the Christ (Matthew 22:41-46)."
Result: ...referred to the Christ ( Matthew 22:41-46 ).
         ┌─────────────────────┐
         │  Matthew 22:41-46   │  ← Blue badge with light background
         └─────────────────────┘
```

### Multiple Verse References
```
Text: "(Matthew 9:27, 12:23, 15:22, 20:30, 21:9, 21:15)"
Result: ( Matthew 9:27  Matthew 12:23  Matthew 15:22  Matthew 20:30  Matthew 21:9  Matthew 21:15 )
         ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐  ┌───────────┐
         │Matthew...│  │Matthew... │  │Matthew... │  │Matthew... │  │Matthew...│  │Matthew... │
         └──────────┘  └───────────┘  └───────────┘  └───────────┘  └──────────┘  └───────────┘
         Each reference gets its own blue badge
```

### Chapter-Only Reference
```
Text: "...is in Genesis chapter 38."
Result: ...is in  Genesis 38 .
                 ┌───────────┐
                 │ Genesis 38│  ← Simplified chapter reference
                 └───────────┘
```

### Multi-Word Book Reference
```
Text: "(1 Chronicles 3:11-12)"
Result: ( 1 Chronicles 3:11-12 )
         ┌─────────────────────┐
         │1 Chronicles 3:11-12 │  ← Handles books with numbers
         └─────────────────────┘
```

## Pattern Matching

The updated regex handles these patterns:

### Pattern 1: Parenthesized Multiple References
**Input:** `(Matthew 9:27, 12:23, 15:22, 20:30, 21:9, 21:15)`

**Process:**
1. Detects book name: "Matthew"
2. Splits verse list by comma: "9:27", "12:23", "15:22", etc.
3. Creates separate badge for each: "Matthew 9:27", "Matthew 12:23", etc.

**Output:** `(` + `<badge>Matthew 9:27</badge>` + `<badge>Matthew 12:23</badge>` + ... + `)`

### Pattern 2: Chapter Reference
**Input:** `Genesis chapter 38`

**Output:** `<badge>Genesis 38</badge>`

### Pattern 3: Standard Verse Reference
**Input:** `Matthew 22:41-46`

**Output:** `<badge>Matthew 22:41-46</badge>`

## Before vs After Comparison

### Before (Grey Badges)
```
┌──────────────────────────┐
│  Matthew 22:41-46        │  Grey background (#6c757d)
│                          │  White text
│  Large rounded corners   │  
└──────────────────────────┘
```

### After (Blue Badges)
```
┌────────────────────┐
│ Matthew 22:41-46   │  Light blue background (#e7f0ff)
│                    │  Blue text (#2563eb)
│ Subtle border      │  Smaller, cleaner design
└────────────────────┘
```

## Interactive States

### Normal State
- **Background**: #e7f0ff (light blue)
- **Border**: #bfdbfe (very light blue)
- **Text**: #2563eb (royal blue)

### Hover State
- **Background**: #dbeafe (slightly darker blue)
- **Border**: #93c5fd (medium blue)
- **Shadow**: 0 1px 3px rgba(37, 99, 235, 0.15)
- **Cursor**: Pointer (default)

## Spacing & Layout

```
Text flow example:
┌────────────────────────────────────────────────────────────┐
│ The Jews understood that 'the son of David' referred to    │
│ the Christ ( Matthew 22:41-46 ). In Jesus' day, many       │
│                ┌───────────────┐                            │
│ Jews expected ( Matthew 9:27  Matthew 12:23 ) the Christ   │
│                 ┌──────────┐  ┌───────────┐                │
│ to come.                                                    │
└────────────────────────────────────────────────────────────┘
```

## Advantages of New Design

✅ **Better Readability**
- Blue on light blue has better contrast than white on grey
- Larger font size (0.9rem vs 0.85rem)
- More padding for comfortable reading

✅ **Modern Aesthetic**
- Matches popular Bible apps (YouVersion, Blue Letter Bible)
- Cleaner, less bulky appearance
- Professional blue color scheme

✅ **Better Integration**
- Doesn't overpower the main text
- Subtle border provides definition without being heavy
- Light background blends better with white content area

✅ **Improved Functionality**
- Handles complex multi-reference patterns
- Each verse in a list gets its own badge
- Better visual separation between references

## Implementation Notes

### Order of Pattern Matching
1. **First**: Parenthesized multiple references (most complex)
2. **Second**: Chapter-only references
3. **Third**: Standard verse references

This order prevents conflicts and ensures proper badge creation.

### Regex Explanation

```javascript
// Pattern for: (Matthew 9:27, 12:23, 15:22)
/\(([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(\d+:\d+(?:-\d+)?(?:,\s*\d+:\d+(?:-\d+)?)*)\)/g

Breakdown:
- \( → Opening parenthesis
- ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?) → Book name (capture group 1)
- \s+ → Space(s)
- (\d+:\d+(?:-\d+)?(?:,\s*\d+:\d+(?:-\d+)?)*) → Verse list (capture group 2)
  - \d+:\d+ → First chapter:verse
  - (?:-\d+)? → Optional verse range
  - (?:,\s*\d+:\d+(?:-\d+)?)* → Repeated comma-separated verses
- \) → Closing parenthesis
```

## Testing Scenarios

✅ **Single reference**: `(Matthew 1:2-6)`
✅ **Multiple references**: `(Matthew 9:27, 12:23, 15:22, 20:30, 21:9, 21:15)`
✅ **Chapter only**: `Genesis chapter 38`
✅ **With ranges**: `1 Chronicles 3:11-12`
✅ **Revelation**: `Revelation 1:4`
✅ **Two-word books**: `2 Samuel 11:14-26`
✅ **Mixed in text**: `God would bless all nations (Genesis 22:18).`

## Browser Compatibility

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support  
- ✅ Safari: Full support
- ✅ Mobile: Responsive design
