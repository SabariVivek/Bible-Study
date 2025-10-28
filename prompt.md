# 📜 Prompt: Format Bible Chapter into Data Structure (STRICT – NO CHANGE IN DATA)

You must convert the given Bible chapter explanation into a **JavaScript data object** exactly like the structure below.

---

## 🔸 RULES (Follow Strictly)

1. **DO NOT CHANGE ANY DATA.**
   - ❌ No trimming  
   - ❌ No rewording  
   - ❌ No sentence reordering  
   - ❌ No grammar or punctuation edits  
   - ✅ Keep every line, paragraph, and word exactly as in the input text.

2. **Each verse or paragraph** must become one object inside the array, using this format:
   ```javascript
   {
       section: "Main Section Title <span class='verse-badge luke'>Verse X</span>",
       text: "Full text explanation here..."
   }

3. **Create section name accordingly matches with the given Verse numbers**

4. **Also whenever you see a word starts with *, mark it as html bold block, that only for a single word**

5. **Also if you see any points content, add it to the list and make it as bullet points, bullet points should be created inside the text content itself, also add the bullet points with the tab space in the screen**
