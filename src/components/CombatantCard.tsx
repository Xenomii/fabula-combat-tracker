import { useState, useEffect } from 'react';
import type { Combatant, DamageAnimation } from '../types';
import './CombatantCard.css';

interface CombatantCardProps {
  combatant: Combatant;
  isActive: boolean;
  onUpdate: (combatant: Combatant) => void;
  onRemove: (id: string) => void;
}

export function CombatantCard({ combatant, isActive, onUpdate, onRemove }: CombatantCardProps) {
  const [animations, setAnimations] = useState<DamageAnimation[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (animations.length > 0) {
      const timer = setTimeout(() => {
        setAnimations(prev => prev.filter(a => Date.now() - a.timestamp < 1000));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animations]);

  const handleHpChange = (delta: number) => {
    const newHp = Math.max(0, Math.min(combatant.maxHp, combatant.currentHp + delta));
    const isDead = newHp === 0;
    onUpdate({ ...combatant, currentHp: newHp, isDead });

    if (delta !== 0) {
      setAnimations(prev => [...prev, {
        id: Math.random().toString(),
        amount: Math.abs(delta),
        type: delta > 0 ? 'healing' : 'damage',
        timestamp: Date.now()
      }]);
    }
  };

  const handleMpChange = (delta: number) => {
    const newMp = Math.max(0, Math.min(combatant.maxMp, combatant.currentMp + delta));
    onUpdate({ ...combatant, currentMp: newMp });
  };

  const toggleFlying = () => {
    onUpdate({ ...combatant, isFlying: !combatant.isFlying });
  };

  const toggleStatusEffect = (effect: string) => {
    const hasEffect = combatant.statusEffects.includes(effect as any);
    const newEffects = hasEffect
      ? combatant.statusEffects.filter(e => e !== effect)
      : [...combatant.statusEffects, effect as any];
    onUpdate({ ...combatant, statusEffects: newEffects });
  };

  const hpPercent = (combatant.currentHp / combatant.maxHp) * 100;
  const mpPercent = (combatant.currentMp / combatant.maxMp) * 100;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className={`combatant-card ${combatant.type} ${isActive ? 'active' : ''} ${combatant.isDead ? 'dead' : ''} ${combatant.isFlying ? 'flying' : ''}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="card-main">
        <div className="sprite-placeholder">
          {combatant.type === 'enemy' ? '👹' : '⚔️'}
        </div>
        
        <div className="combatant-info">
          {editMode ? (
            <input
              type="text"
              value={combatant.name}
              onChange={(e) => onUpdate({ ...combatant, name: e.target.value })}
              onBlur={() => setEditMode(false)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <div className="name" onClick={(e) => { e.stopPropagation(); setEditMode(true); }}>
              {combatant.name}
            </div>
          )}
          
          <div className="hp-display">
            <span className="label">HP</span>
            <div className="bar-bg">
              <div className="bar hp" style={{ width: `${hpPercent}%` }}></div>
            </div>
            <span className="value">{combatant.currentHp}/{combatant.maxHp}</span>
          </div>
          
          <div className="mp-display">
            <span className="label">MP</span>
            <div className="bar-bg">
              <div className="bar mp" style={{ width: `${mpPercent}%` }}></div>
            </div>
            <span className="value">{combatant.currentMp}/{combatant.maxMp}</span>
          </div>

          {combatant.statusEffects.length > 0 && (
            <div className="active-statuses">
              {combatant.statusEffects.map(effect => (
                <span key={effect} className="status-badge">{effect.slice(0, 3).toUpperCase()}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="card-details" onClick={(e) => e.stopPropagation()}>
          <button className="close-details" onClick={() => setShowDetails(false)}>Close</button>
          <button className="remove-btn" onClick={() => onRemove(combatant.id)}>Remove</button>
          
          <div className="detail-controls">
            <div className="control-group">
              <label>HP</label>
              <div className="button-group">
                <button onClick={() => handleHpChange(-10)}>-10</button>
                <button onClick={() => handleHpChange(-5)}>-5</button>
                <button onClick={() => handleHpChange(-1)}>-1</button>
                <button onClick={() => handleHpChange(1)}>+1</button>
                <button onClick={() => handleHpChange(5)}>+5</button>
                <button onClick={() => handleHpChange(10)}>+10</button>
              </div>
            </div>

            <div className="control-group">
              <label>MP</label>
              <div className="button-group">
                <button onClick={() => handleMpChange(-10)}>-10</button>
                <button onClick={() => handleMpChange(-5)}>-5</button>
                <button onClick={() => handleMpChange(-1)}>-1</button>
                <button onClick={() => handleMpChange(1)}>+1</button>
                <button onClick={() => handleMpChange(5)}>+5</button>
                <button onClick={() => handleMpChange(10)}>+10</button>
              </div>
            </div>

            <div className="control-group">
              <label>Status</label>
              <button
                className={`toggle-btn ${combatant.isFlying ? 'active' : ''}`}
                onClick={toggleFlying}
              >
                {combatant.isFlying ? '🪽 Flying' : '⬇️ Grounded'}
              </button>
            </div>

            <div className="control-group">
              <label>Conditions</label>
              <div className="status-grid">
                {['slow', 'dazed', 'weak', 'shaken', 'enraged', 'poisoned'].map(effect => (
                  <button
                    key={effect}
                    className={`status-btn ${combatant.statusEffects.includes(effect as any) ? 'active' : ''}`}
                    onClick={() => toggleStatusEffect(effect)}
                  >
                    {effect}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="animations-container">
        {animations.map(anim => (
          <div key={anim.id} className={`damage-animation ${anim.type}`}>
            {anim.type === 'damage' ? '-' : '+'}{anim.amount}
          </div>
        ))}
      </div>
    </div>
  );
}
