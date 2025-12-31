# Starter Adventure - Quick Load

## Overview

The combat tracker now includes a **"Load Starter Adventure"** button that instantly sets up a pre-configured encounter from the Fabula Ultima starter set "The Pilgrims on the Path".

## Features

✅ One-click setup for starter adventure encounter
✅ Pre-loaded player characters with sprites
✅ Pre-loaded enemies with sprites
✅ Initiative values automatically set
✅ All stats (HP/MP) configured

## Encounter Details

### Player Characters (5)
1. **Blair Clarimonde** - Initiative 10, HP 45, MP 30
2. **Cassandra** - Initiative 12, HP 40, MP 35
3. **Desdemona Perses** - Initiative 11, HP 50, MP 25
4. **Edgar** - Initiative 9, HP 48, MP 28
5. **Lavigne Fallbright** - Initiative 13, HP 42, MP 32

### Enemies (4)
1. **Elonian Trooper** (×2) - Initiative 8/7, HP 40, MP 20
2. **Hexeye** (×2) - Initiative 10/9, HP 50, MP 30, Flying

## How to Use

### On Setup Screen
1. Click the **📖 Load Starter Adventure** button
2. The encounter loads instantly with all combatants ready
3. Battle begins automatically sorted by initiative

### After Loading
- All combatants appear on the battlefield with their sprites
- Initiative order is automatically sorted (highest first)
- Use "Next Turn" to progress through combat
- Hexeyes start with Flying status active

## Customization

### Modifying the Encounter

To customize the starter adventure encounter, edit:
```
src/data/starterAdventure.ts
```

You can adjust:
- Initiative values
- HP/MP values
- Number of enemies
- Status effects
- Flying state

### Example Modification

```typescript
{
  name: 'Hexeye',
  type: 'enemy',
  sprite: 'hexeye.webp',
  initiative: 10,
  maxHp: 60,        // Increase HP
  currentHp: 60,
  maxMp: 40,        // Increase MP
  currentMp: 40,
  isFlying: true,
  statusEffects: ['enraged'], // Add status effect
  isDead: false,
}
```

## Sprites Location

Character sprites are located in:
- **Players**: `public/sprites/player/`
- **Enemies**: `public/sprites/enemy/`

The encounter automatically uses these sprites:
- `blair clarimonde.webp`
- `cassandra.webp`
- `desdemona-perses.webp`
- `edgar.webp`
- `lavigne-fallbright.webp`
- `elonian-trooper.webp`
- `hexeye.webp`

## Technical Details

### File Structure
```
src/
└── data/
    └── starterAdventure.ts    # Encounter data
```

### Loading Process
1. Click button triggers `loadStarterAdventure()`
2. `loadEncounter()` generates unique IDs for all combatants
3. Combatants are added to state
4. Initiative is auto-sorted
5. Round counter resets to 1

### Unique ID Generation
Each time you load the encounter, combatants get unique IDs to prevent conflicts if you load multiple times in one session.

## Tips

- Load the starter adventure to quickly test the combat tracker
- Use this as a template to create your own pre-configured encounters
- The encounter can be loaded multiple times (new unique IDs each time)
- Modify stats as needed during combat using the character cards
