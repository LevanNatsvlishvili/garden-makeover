import { assetConfig } from '@/config/assetConfig';
import { config } from '@/config/config';

const state = {
  money: assetConfig.global.startingMoney,
  tomatoes: [],
  cucumbers: [],
  vines: [],
  trees: [],
  isWellPlaced: false,
  isPlantPlaced: false,
  isTutorialFinished: false,
  isDay: true,
  characterHealth: config.character.health,
  monsters: [],
};

export default state;
