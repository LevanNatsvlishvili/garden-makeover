import { assetConfig } from '@/config/assetConfig';
import { config } from '@/config/config';

const state = {
  tomatoes: [],
  cucumbers: [],
  vines: [],
  trees: [],
  // Global
  money: assetConfig.global.startingMoney,
  characterCurrentHealth: config.character.health,
  characterMaxHealth: config.character.health,
  monsterHealth: config.monster.health,
  monsters: [],
  potions: 1,
  attackDamage: config.character.attackDamage,
  wellModel: null,
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
