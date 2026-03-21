import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import state from '@/store/state';
import { actionTomato } from '../spawn/assets/tomato';
import { actionCucumber } from '../spawn/assets/cucumber';
import { actionVine } from '../spawn/assets/vine';
import { placeWell } from '../spawn/assets/well';
import { registerButton } from '../buttonManager';
import { ambientLight, directionalLight } from '@/scene/lights/lights';
import { config } from '@/config/config';
import { torchLight } from '@/scene/models/other/character';
import models from '@/store/models';
import { turnDay } from './turnDay';

export async function actions() {
  const allPlants = () => [...state.tomatoes, ...state.cucumbers, ...state.vines];

  const actions = {
    placeTomato: actionTomato,
    placeCucumber: actionCucumber,
    placeVine: actionVine,
    placeWell: placeWell,
    logState: () => console.log(state),
    takeHarvest: () => allPlants().forEach((p) => p.takeHarvest()),
    turnDay: () => turnDay(),
  };

  const wellCtrl = gui
    .add(actions, 'placeWell')
    .name('⛲ Well')
    .enable(state.money >= assetConfig.well.price && !state.isWellPlaced);
  registerButton(wellCtrl, () => state.money >= assetConfig.well.price && !state.isWellPlaced);

  const tomatoCtrl = gui
    .add(actions, 'placeTomato')
    .name('🍅 Tomato')
    .enable(state.money >= assetConfig.tomato.price && state.isWellPlaced);
  registerButton(tomatoCtrl, () => state.money >= assetConfig.tomato.price && state.isWellPlaced);

  const cucumberCtrl = gui
    .add(actions, 'placeCucumber')
    .name('🥒 Cucumber')
    .enable(state.money >= assetConfig.cucumber.price && state.isWellPlaced);
  registerButton(
    cucumberCtrl,
    () => state.money >= assetConfig.cucumber.price && state.isWellPlaced
  );

  const vineCtrl = gui
    .add(actions, 'placeVine')
    .name('🍇 Vine')
    .enable(state.money >= assetConfig.vine.price && state.isWellPlaced);
  registerButton(vineCtrl, () => state.money >= assetConfig.vine.price && state.isWellPlaced);

  const turnDayCtrl = gui.add(actions, 'turnDay').name('🌙 Turn Day').enable(true);
  registerButton(turnDayCtrl, () => true);

  gui.add(state, 'money').name('💰 Money').listen().disable();

  const harvestCtrl = gui.add(actions, 'takeHarvest').name('🌾 Take Harvest').enable(false);
  registerButton(harvestCtrl, () => allPlants().some((p) => p.status === 'ripe'));

  gui.add(actions, 'logState').name('🔍 Log State');
}
