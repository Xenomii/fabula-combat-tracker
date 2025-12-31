import type { Combatant } from '../types';

export interface Encounter {
  id: string;
  name: string;
  description: string;
  players: Omit<Combatant, 'id'>[];
  enemies: Omit<Combatant, 'id'>[];
}

// Fabula Ultima Starter Set - "The Pilgrims on the Path"
export const starterAdventureEncounter: Encounter = {
  id: 'starter-encounter',
  name: 'Starter Adventure',
  description: 'The Pilgrims on the Path - Combat encounter',
  players: [
    {
      name: 'Blair Clarimonde',
      type: 'player',
      sprite: 'blair clarimonde.webp',
      initiative: 10,
      maxHp: 45,
      currentHp: 45,
      maxMp: 30,
      currentMp: 30,
      isFlying: false,
      statusEffects: [],
      isDead: false,
      hasActedThisRound: false,
    },
    {
      name: 'Cassandra',
      type: 'player',
      sprite: 'cassandra.webp',
      initiative: 12,
      maxHp: 40,
      currentHp: 40,
      maxMp: 35,
      currentMp: 35,
      isFlying: false,
      statusEffects: [],
      isDead: false,
      hasActedThisRound: false,
    },
    {
      name: 'Desdemona Perses',
      type: 'player',
      sprite: 'desdemona-perses.webp',
      initiative: 11,
      maxHp: 50,
      currentHp: 50,
      maxMp: 25,
      currentMp: 25,
      isFlying: false,
      statusEffects: [],
      isDead: false,
      hasActedThisRound: false,
    },
    {
      name: 'Edgar',
      type: 'player',
      sprite: 'edgar.webp',
      initiative: 9,
      maxHp: 48,
      currentHp: 48,
      maxMp: 28,
      currentMp: 28,
      isFlying: false,
      statusEffects: [],
      isDead: false,
      hasActedThisRound: false,
    },
    {
      name: 'Lavigne Fallbright',
      type: 'player',
      sprite: 'lavigne-fallbright.webp',
      initiative: 13,
      maxHp: 42,
      currentHp: 42,
      maxMp: 32,
      currentMp: 32,
      isFlying: false,
      statusEffects: [],
      isDead: false,
      hasActedThisRound: false,
    },
  ],
  enemies: [
    {
      name: 'Elonian Trooper',
      type: 'enemy',
      sprite: 'elonian-trooper.webp',
      initiative: 8,
      maxHp: 40,
      currentHp: 40,
      maxMp: 20,
      currentMp: 20,
      isFlying: false,
      statusEffects: [],
      isDead: false,
    },
    {
      name: 'Elonian Trooper',
      type: 'enemy',
      sprite: 'elonian-trooper.webp',
      initiative: 7,
      maxHp: 40,
      currentHp: 40,
      maxMp: 20,
      currentMp: 20,
      isFlying: false,
      statusEffects: [],
      isDead: false,
    },
    {
      name: 'Hexeye',
      type: 'enemy',
      sprite: 'hexeye.webp',
      initiative: 10,
      maxHp: 50,
      currentHp: 50,
      maxMp: 30,
      currentMp: 30,
      isFlying: true,
      statusEffects: [],
      isDead: false,
    },
    {
      name: 'Hexeye',
      type: 'enemy',
      sprite: 'hexeye.webp',
      initiative: 9,
      maxHp: 50,
      currentHp: 50,
      maxMp: 30,
      currentMp: 30,
      isFlying: true,
      statusEffects: [],
      isDead: false,
    },
  ],
};

// Helper function to convert encounter to combatants with unique IDs
export function loadEncounter(encounter: Encounter): Combatant[] {
  const allCombatants = [...encounter.players, ...encounter.enemies];
  return allCombatants.map((c, index) => ({
    ...c,
    id: `${encounter.id}-${index}-${Math.random().toString(36).substr(2, 9)}`,
  }));
}
