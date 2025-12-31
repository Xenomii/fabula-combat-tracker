export type CombatantType = 'player' | 'enemy';

export type StatusEffect = 'slow' | 'dazed' | 'weak' | 'shaken' | 'enraged' | 'poisoned';

export interface Combatant {
  id: string;
  name: string;
  type: CombatantType;
  sprite?: string; // Optional sprite filename (e.g., 'warrior.png')
  initiative: number;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
  isFlying: boolean;
  statusEffects: StatusEffect[];
  isDead: boolean;
  hasActedThisRound?: boolean; // Track if player has acted this round
}

export interface DamageAnimation {
  id: string;
  amount: number;
  type: 'damage' | 'healing';
  timestamp: number;
}
