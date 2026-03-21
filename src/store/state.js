import { assetConfig } from '@/config/assetConfig';

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
};

export default state;
