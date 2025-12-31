# Character Sprites - Quick Start Guide

## What Was Added

Your Fabula combat tracker now supports custom pixel art character sprites similar to classic JRPGs!

### New Features
✅ Sprite selection dropdown when adding combatants
✅ Separate sprite directories for players and enemies
✅ Automatic fallback to emoji if sprite is missing
✅ Pixel-perfect rendering (no blurry scaling)
✅ Support for transparent PNG sprites

## How to Use

### 1. Add Sprite Images

Place your PNG sprite files in:
- **Player sprites**: `public/sprites/player/`
- **Enemy sprites**: `public/sprites/enemy/`

### 2. File Naming

The dropdown currently lists these sprite names:

**Players:**
- warrior.png
- mage.png
- rogue.png
- healer.png
- default.png

**Enemies:**
- grasswyrm.png
- goblin.png
- dragon.png
- slime.png
- default.png

### 3. Create Combatants with Sprites

1. Click "Add Combatant"
2. Enter name and select type (Player/Enemy)
3. Choose a sprite from the dropdown
4. If you select "Default (Emoji)", it will show the emoji placeholder (⚔️ or 👹)

### 4. Adding More Sprites

To add your own custom sprites:

1. Save PNG files to `public/sprites/player/` or `public/sprites/enemy/`
2. Edit `src/components/AddCombatant.tsx`:
   ```typescript
   const PLAYER_SPRITES = [
     'warrior.png', 
     'mage.png', 
     'your-custom-sprite.png',  // Add here
     ...
   ];
   ```

## Recommended Sprite Dimensions

- **Size**: 48x48 to 128x128 pixels
- **Format**: PNG with transparency
- **Style**: Pixel art (like Final Fantasy VI shown in your reference)

## Where to Find Free Sprites

1. **OpenGameArt.org** - Search "RPG character sprites"
2. **Itch.io** - Filter: Free + Sprites + RPG
3. **Kenney.nl** - Free game assets
4. **The Spriters Resource** - Game sprite database (check licenses)

## Testing

After adding sprites:
1. Run `npm run dev`
2. Add a new combatant
3. Select your sprite from the dropdown
4. The sprite should appear in the character card

If a sprite fails to load, it automatically falls back to the emoji placeholder.

## Example Workflow

```bash
# 1. Download a warrior sprite (64x64 PNG)
# 2. Save as: public/sprites/player/warrior.png
# 3. Start dev server
npm run dev
# 4. Add combatant, select "warrior" sprite
# 5. See your pixel art character!
```

## Notes

- Sprites are automatically scaled to 60x60px display size
- `image-rendering: pixelated` keeps pixel art sharp
- Missing sprites won't break the app - emoji fallback works
- You can mix sprites and emojis in the same combat
