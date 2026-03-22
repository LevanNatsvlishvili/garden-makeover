import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import state from '@/store/state';
import { actionTomato } from '../spawn/assets/spawnTomato';
import { actionCucumber } from '../spawn/assets/spawnCucumber';
import { actionVine } from '../spawn/assets/spawnVine';
import { placeWell } from '../spawn/assets/spawnWell';
import { registerButton } from '../buttonManager';
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
    .enable(state.money >= assetConfig.well.price && !state.isWellPlaced && state.isDay);
  registerButton(
    wellCtrl,
    () => state.money >= assetConfig.well.price && !state.isWellPlaced && state.isDay
  );

  const tomatoCtrl = gui
    .add(actions, 'placeTomato')
    .name('🍅 Tomato')
    .enable(state.money >= assetConfig.tomato.price && state.isWellPlaced && state.isDay);
  registerButton(
    tomatoCtrl,
    () => state.money >= assetConfig.tomato.price && state.isWellPlaced && state.isDay
  );

  const cucumberCtrl = gui
    .add(actions, 'placeCucumber')
    .name('🥒 Cucumber')
    .enable(state.money >= assetConfig.cucumber.price && state.isWellPlaced && state.isDay);
  registerButton(
    cucumberCtrl,
    () => state.money >= assetConfig.cucumber.price && state.isWellPlaced && state.isDay
  );

  const vineCtrl = gui
    .add(actions, 'placeVine')
    .name('🍇 Vine')
    .enable(state.money >= assetConfig.vine.price && state.isWellPlaced && state.isDay);
  registerButton(
    vineCtrl,
    () => state.money >= assetConfig.vine.price && state.isWellPlaced && state.isDay
  );

  const turnDayCtrl = gui
    .add(actions, 'turnDay')
    .name('🌙 Turn Day')
    .enable(state.isWellPlaced && state.isPlantPlaced);
  registerButton(turnDayCtrl, () => state.isWellPlaced && state.isPlantPlaced);

  gui.add(state, 'money').name('💰 Money').listen().disable();

  const harvestCtrl = gui
    .add(actions, 'takeHarvest')
    .name('🌾 Take Harvest')
    .enable(state.isDay && allPlants().some((p) => p.status === 'ripe'));
  registerButton(harvestCtrl, () => state.isDay && allPlants().some((p) => p.status === 'ripe'));

  gui.add(actions, 'logState').name('🔍 Log State');
}
