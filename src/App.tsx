import { useState, useEffect } from 'react';
import type { Combatant } from './types';
import { CombatantCard } from './components/CombatantCard';
import { AddCombatant } from './components/AddCombatant';
import './App.css';

function App() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [background, setBackground] = useState('default');
  const [customBg, setCustomBg] = useState('');

  // Sort combatants by initiative (highest first)
  const sortedCombatants = [...combatants].sort((a, b) => b.initiative - a.initiative);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fabula-combat-tracker');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCombatants(data.combatants || []);
        setCurrentTurnIndex(data.currentTurnIndex || 0);
        setRound(data.round || 1);
        setBackground(data.background || 'default');
        setCustomBg(data.customBg || '');
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fabula-combat-tracker', JSON.stringify({
      combatants,
      currentTurnIndex,
      round,
      background,
      customBg
    }));
  }, [combatants, currentTurnIndex, round, background, customBg]);

  const addCombatant = (combatant: Combatant) => {
    setCombatants(prev => [...prev, combatant]);
  };

  const updateCombatant = (updated: Combatant) => {
    setCombatants(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const removeCombatant = (id: string) => {
    setCombatants(prev => prev.filter(c => c.id !== id));
    if (currentTurnIndex >= sortedCombatants.length - 1) {
      setCurrentTurnIndex(0);
    }
  };

  const nextTurn = () => {
    const aliveCombatants = sortedCombatants.filter(c => !c.isDead);
    if (aliveCombatants.length === 0) return;

    let nextIndex = currentTurnIndex + 1;
    if (nextIndex >= sortedCombatants.length) {
      nextIndex = 0;
      setRound(prev => prev + 1);
    }

    // Skip dead combatants
    while (sortedCombatants[nextIndex]?.isDead && nextIndex < sortedCombatants.length) {
      nextIndex++;
      if (nextIndex >= sortedCombatants.length) {
        nextIndex = 0;
        setRound(prev => prev + 1);
      }
    }

    setCurrentTurnIndex(nextIndex);
  };

  const resetCombat = () => {
    if (confirm('Reset combat? This will clear all combatants.')) {
      setCombatants([]);
      setCurrentTurnIndex(0);
      setRound(1);
    }
  };

  const resetHealth = () => {
    setCombatants(prev => prev.map(c => ({
      ...c,
      currentHp: c.maxHp,
      currentMp: c.maxMp,
      isDead: false,
      statusEffects: [],
      isFlying: false
    })));
    setCurrentTurnIndex(0);
    setRound(1);
  };

  const currentCombatant = sortedCombatants[currentTurnIndex];

  const enemies = sortedCombatants.filter(c => c.type === 'enemy');
  const players = sortedCombatants.filter(c => c.type === 'player');

  const handleBgChange = (bg: string) => {
    setBackground(bg);
  };

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomBg(result);
        setBackground('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const getBgStyle = () => {
    if (background === 'custom' && customBg) {
      return { backgroundImage: `url(${customBg})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return {};
  };

  return (
    <div className={`app bg-${background}`} style={getBgStyle()}>
      <div className="battle-header">
        <button className="bg-toggle-btn" onClick={() => document.querySelector('.background-modal')?.classList.add('show')} title="Change Background">
          🎨
        </button>
        <div className="round-display">Round {round}</div>
      </div>

      {sortedCombatants.length === 0 ? (
        <div className="setup-screen">
          <div className="title-with-logo">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Fabula Ultima" className="logo-image" />
            <h1>Fabula Ultima Combat Tracker</h1>
          </div>
          <p>Add combatants to begin battle!</p>
          <button className="setup-bg-btn" onClick={() => document.querySelector('.background-modal')?.classList.add('show')}>
            🎨 Choose Background
          </button>
          <AddCombatant onAdd={addCombatant} />
        </div>
      ) : (
        <>
          <div className="battlefield">
            <div className="enemies-area">
              {enemies.map((combatant) => (
                <CombatantCard
                  key={combatant.id}
                  combatant={combatant}
                  isActive={currentCombatant?.id === combatant.id}
                  onUpdate={updateCombatant}
                  onRemove={removeCombatant}
                />
              ))}
            </div>

            <div className="players-area">
              {players.map((combatant) => (
                <CombatantCard
                  key={combatant.id}
                  combatant={combatant}
                  isActive={currentCombatant?.id === combatant.id}
                  onUpdate={updateCombatant}
                  onRemove={removeCombatant}
                />
              ))}
            </div>
          </div>

          <div className="battle-menu">
            <div className="menu-left">
              <div className="turn-info">
                {currentCombatant && (
                  <div className="current-turn">
                    <span className="turn-label">Current Turn:</span>
                    <span className="turn-name">{currentCombatant.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="menu-actions">
              <button className="action-btn next-turn" onClick={nextTurn}>
                Next Turn
              </button>
              <button className="action-btn" onClick={() => document.querySelector('.add-combatant-modal')?.classList.add('show')}>
                Add Combatant
              </button>
              <button className="action-btn" onClick={resetHealth}>
                Reset Health
              </button>
              <button className="action-btn danger" onClick={resetCombat}>
                Reset Combat
              </button>
            </div>
          </div>

          <div className="add-combatant-modal">
            <div className="modal-content">
              <button className="modal-close" onClick={() => document.querySelector('.add-combatant-modal')?.classList.remove('show')}>
                ×
              </button>
              <AddCombatant onAdd={(c) => { addCombatant(c); document.querySelector('.add-combatant-modal')?.classList.remove('show'); }} />
            </div>
          </div>
        </>
      )}

      <div className="background-modal">
        <div className="modal-content">
          <button className="modal-close" onClick={() => document.querySelector('.background-modal')?.classList.remove('show')}>
            ×
          </button>
          <div className="background-selector">
            <h3>Choose Background</h3>
            <div className="bg-presets">
              <button 
                className={`bg-option ${background === 'default' ? 'active' : ''}`}
                onClick={() => handleBgChange('default')}
              >
                Default Sky
              </button>
              <button 
                className={`bg-option ${background === 'forest' ? 'active' : ''}`}
                onClick={() => handleBgChange('forest')}
              >
                Forest
              </button>
              <button 
                className={`bg-option ${background === 'cave' ? 'active' : ''}`}
                onClick={() => handleBgChange('cave')}
              >
                Cave
              </button>
              <button 
                className={`bg-option ${background === 'desert' ? 'active' : ''}`}
                onClick={() => handleBgChange('desert')}
              >
                Desert
              </button>
              <button 
                className={`bg-option ${background === 'ocean' ? 'active' : ''}`}
                onClick={() => handleBgChange('ocean')}
              >
                Ocean
              </button>
              <button 
                className={`bg-option ${background === 'volcano' ? 'active' : ''}`}
                onClick={() => handleBgChange('volcano')}
              >
                Volcano
              </button>
            </div>
            <div className="custom-bg">
              <label htmlFor="bg-upload" className="upload-label">
                Upload Custom Background
              </label>
              <input 
                id="bg-upload"
                type="file" 
                accept="image/*"
                onChange={handleCustomBgUpload}
                className="file-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
