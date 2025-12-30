# ⚔️ Fabula Ultima Combat Tracker

A web-based combat tracker for Fabula Ultima tabletop RPG sessions. Track initiative order, HP/MP, status effects, and visualize combat with animations.

## Features

- **Initiative Tracking**: Automatically sorts combatants by initiative value
- **Turn Management**: Navigate through combat rounds with visual indicators for active combatant
- **HP/MP Management**: Quick buttons for damage and healing with animated feedback
- **Status Effects**: Track common status effects (slow, dazed, weak, shaken, enraged, poisoned)
- **Flying State**: Toggle flying/grounded status with floating animation
- **Persistent State**: Combat state saved to browser localStorage
- **Player & Enemy Support**: Color-coded cards for easy identification
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Add Combatants**: Click "Add Combatant" to add players and enemies
2. **Set Initiative**: Enter initiative values when creating combatants
3. **Track Combat**: Use "Next Turn" to progress through initiative order
4. **Manage HP/MP**: Use +/- buttons to adjust health and magic points
5. **Toggle Status**: Click status effect buttons to track conditions
6. **Flying State**: Toggle flying status which adds a floating animation

## Deployment

This project can be easily deployed to free hosting platforms:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### GitHub Pages

1. Update `vite.config.ts` with your repository name as the base
2. Run `npm run build`
3. Deploy the `dist` folder to GitHub Pages

## Project Structure

```
src/
├── components/
│   ├── CombatantCard.tsx      # Individual combatant display
│   ├── CombatantCard.css
│   ├── AddCombatant.tsx       # Form for adding combatants
│   └── AddCombatant.css
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main application component
├── App.css
├── index.css                  # Global styles
└── main.tsx                   # Application entry point
```

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations

## License

MIT

## Contributing

Feel free to open issues or submit pull requests!
