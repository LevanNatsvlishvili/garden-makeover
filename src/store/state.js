import { assetConfig } from '@/config/assetConfig';
import { config } from '@/config/config';

const state = {
  money: 20 || assetConfig.global.startingMoney,
  tomatoes: [],
  cucumbers: [],
  vines: [],
  trees: [],
  isWellPlaced: false,
  isPlantPlaced: false,
  isFirstHarvestTaken: true,
  isTutorialFinished: false,
  isDay: true,
  characterCurrentHealth: config.character.health,
  characterMaxHealth: config.character.health,
  monsterHealth: config.monster.health,
  monsters: [],
  potions: 0,
  attackDamage: config.character.attackDamage,
};

export default state;
