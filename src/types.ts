export type CombatantType = 'player' | 'enemy';

export type StatusEffect = 'slow' | 'dazed' | 'weak' | 'shaken' | 'enraged' | 'poisoned';

export interface Combatant {
  id: string;
  name: string;
  type: CombatantType;
  initiative: number;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
  isFlying: boolean;
  statusEffects: StatusEffect[];
  isDead: boolean;
}

export interface DamageAnimation {
  id: string;
  amount: number;
  type: 'damage' | 'healing';
  timestamp: number;
}
