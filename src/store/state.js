import { assetConfig } from '@/config/assetConfig';
import { config } from '@/config/config';

const state = {
  tomatoes: [],
  cucumbers: [],
  vines: [],
  trees: [],
  // Global
  money: 10 || assetConfig.global.startingMoney,
  characterCurrentHealth: config.character.health,
  characterMaxHealth: config.character.health,
  monsterHealth: config.monster.health,
  monsters: [],
  potions: 0,
  attackDamage: config.character.attackDamage,
  // Tutorial
  isWellPlaced: false,
  isPlantPlaced: false,
  isFirstHarvestTaken: false,
  isFirstDay: true,
  isSecondDay: false,
  isTutorialFinished: false,
  isCharacterUpgraded: false,
  isDay: true,
};

export default state;
