# Character Sprites

This directory contains pixel art character sprites for the combat tracker.

## Directory Structure

```
sprites/
├── player/         # Player character sprites
└── enemy/          # Enemy character sprites
```

## Adding Sprites

### File Requirements
- **Format**: PNG with transparency recommended
- **Size**: 48x48 to 128x128 pixels (will be scaled to fit 60x60px display)
- **Style**: Pixel art (matching JRPG aesthetics like Final Fantasy VI)

### Default Sprite Names
The form expects these sprite filenames by default:

**Players:**
- `warrior.png`
- `mage.png`
- `rogue.png`
- `healer.png`
- `default.png`

**Enemies:**
- `grasswyrm.png`
- `goblin.png`
- `dragon.png`
- `slime.png`
- `default.png`

### Where to Find Sprites

**Free Resources:**
1. **OpenGameArt.org** - Search for "RPG character sprites" or "pixel art"
2. **Itch.io** - Filter for "Free" + "Sprites" + "RPG"
3. **Kenney.nl** - Free game assets including character sprites
4. **Sprite Database** - spriters-resource.com (check licenses)

**Example Searches:**
- "16x16 RPG character sprites"
- "pixel art JRPG sprites"
- "Final Fantasy style sprites"

### Adding Custom Sprites

1. Save your PNG files to the appropriate folder (`player/` or `enemy/`)
2. Update the sprite name lists in `src/components/AddCombatant.tsx`:
   ```typescript
   const PLAYER_SPRITES = ['warrior.png', 'your-sprite.png', ...];
   const ENEMY_SPRITES = ['monster1.png', 'your-monster.png', ...];
   ```
3. Sprites will appear in the dropdown when adding combatants

### Tips
- Keep file sizes small (under 50KB per sprite)
- Use transparent backgrounds
- Square dimensions work best (e.g., 64x64, 128x128)
- Test sprites by adding a combatant in the app
