import { assetConfig } from '@/config/assetConfig';

const state = {
  money: assetConfig.global.startingMoney,
  tomatoes: [],
  cucumbers: [],
  vines: [],
  isWellPlaced: false,
  isTutorialFinished: false,
};

export default state;
