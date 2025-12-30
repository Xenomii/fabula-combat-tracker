# Quick Start Guide

## Running Locally

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser** to the URL shown (usually http://localhost:5173)

3. **Start tracking combat!**

## Basic Workflow

### 1. Add Combatants
- Click the "Add Combatant" button
- Fill in the form:
  - **Name**: Character or enemy name
  - **Type**: Player (blue) or Enemy (red)
  - **Initiative**: Their initiative roll
  - **Max HP/MP**: Maximum health and magic points
- Click "Add"

### 2. Manage Combat
- **Next Turn**: Advances to the next combatant in initiative order
- **Current Turn**: Highlighted with a gold border
- **Round Counter**: Displayed in the top right

### 3. Track Damage & Healing
- Use **-1/-5** buttons to deal damage
- Use **+1/+5** buttons to heal
- Numbers will animate on the card (red for damage, green for healing)
- HP/MP bars update in real-time

### 4. Status Effects
- Click any status button to toggle it on/off
- Active status effects glow orange
- Available effects: Slow, Dazed, Weak, Shaken, Enraged, Poisoned

### 5. Flying Status
- Click the flying button to toggle
- Flying combatants have a floating animation
- Shows 🪽 Flying or ⬇️ Grounded

### 6. Other Actions
- **Click a name** to edit it
- **X button** to remove a combatant
- **Reset Health** to restore all HP/MP to max
- **Reset Combat** to clear all combatants

## Tips

- **Auto-save**: Everything is saved automatically in your browser
- **Dead combatants**: When HP reaches 0, card becomes grayed out
- **Mobile friendly**: Works on phones and tablets
- **No account needed**: Everything runs in your browser

## Keyboard Shortcuts

Currently there are no keyboard shortcuts, but they could be added in the future!

## Troubleshooting

**Combat state not saving?**
- Make sure you're using the same browser
- Check that cookies/localStorage are enabled

**Page looks broken?**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

**Need to share with players?**
- See DEPLOYMENT.md for hosting instructions
- Once deployed, share the URL with your group!

## Support

For issues or feature requests, please create an issue on the GitHub repository.
