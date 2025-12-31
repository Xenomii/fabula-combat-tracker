import { useState } from 'react';
import type { Combatant, CombatantType } from '../types';
import './AddCombatant.css';

interface AddCombatantProps {
  onAdd: (combatant: Combatant) => void;
}

const PLAYER_SPRITES = [
  'blair clarimonde.webp',
  'cassandra.webp',
  'desdemona-perses.webp',
  'edgar.webp',
  'lavigne-fallbright.webp'
];
const ENEMY_SPRITES = [
  'elonian-trooper.webp',
  'hexeye.webp'
];

export function AddCombatant({ onAdd }: AddCombatantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<CombatantType>('player');
  const [sprite, setSprite] = useState('');
  const [initiative, setInitiative] = useState(10);
  const [maxHp, setMaxHp] = useState(50);
  const [maxMp, setMaxMp] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCombatant: Combatant = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      type,
      sprite: sprite || undefined,
      initiative,
      maxHp,
      currentHp: maxHp,
      maxMp,
      currentMp: maxMp,
      isFlying: false,
      statusEffects: [],
      isDead: false,
    };

    onAdd(newCombatant);
    
    // Reset form
    setName('');
    setSprite('');
    setInitiative(10);
    setMaxHp(50);
    setMaxMp(30);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="add-combatant-btn" onClick={() => setIsOpen(true)}>
        + Add Combatant
      </button>
    );
  }

  return (
    <div className="add-combatant-form">
      <h3>Add New Combatant</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <div className="type-selector">
            <button
              type="button"
              className={type === 'player' ? 'active' : ''}
              onClick={() => { setType('player'); setSprite(''); }}
            >
              Player
            </button>
            <button
              type="button"
              className={type === 'enemy' ? 'active' : ''}
              onClick={() => { setType('enemy'); setSprite(''); }}
            >
              Enemy
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Sprite:</label>
          <select value={sprite} onChange={(e) => setSprite(e.target.value)}>
            <option value="">Default (Emoji)</option>
            {(type === 'player' ? PLAYER_SPRITES : ENEMY_SPRITES).map(s => (
              <option key={s} value={s}>
                {s.replace('.webp', '').replace('.png', '').replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Initiative:</label>
          <input
            type="number"
            value={initiative}
            onChange={(e) => setInitiative(Number(e.target.value))}
            min="0"
            max="99"
          />
        </div>

        <div className="form-group">
          <label>Max HP:</label>
          <input
            type="number"
            value={maxHp}
            onChange={(e) => setMaxHp(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Max MP:</label>
          <input
            type="number"
            value={maxMp}
            onChange={(e) => setMaxMp(Number(e.target.value))}
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add</button>
          <button type="button" className="cancel-btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
