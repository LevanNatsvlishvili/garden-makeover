import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import state from '@/store/state';
import { actionCucumber } from '../spawn/assets/spawnCucumber';
import { actionVine } from '../spawn/assets/spawnVine';
import { registerButton } from '../buttonManager';

export async function actions() {
  const allPlants = () => [...state.tomatoes, ...state.cucumbers, ...state.vines];

  const actions = {
    placeCucumber: actionCucumber,
    placeVine: actionVine,
    logState: () => console.log(state),
    takeHarvest: () => allPlants().forEach((p) => p.takeHarvest()),
    turnDay: () => turnDay(),
  };

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

  // const canTurnDay = () => {
  //   if (!state.isDay && state.monsters.length === 0) return true;
  //   if (state.isDay && state.isWellPlaced && state.isPlantPlaced) return true;
  //   return false;
  // };

  // const turnDayCtrl = gui.add(actions, 'turnDay').name('🌙 Turn Day').enable(canTurnDay());
  // registerButton(turnDayCtrl, canTurnDay);

  gui.add(state, 'money').name('💰 Money').listen().disable();

  const harvestCtrl = gui
    .add(actions, 'takeHarvest')
    .name('🌾 Take Harvest')
    .enable(state.isDay && allPlants().some((p) => p.status === 'ripe'));
  registerButton(harvestCtrl, () => state.isDay && allPlants().some((p) => p.status === 'ripe'));

  gui.add(actions, 'logState').name('🔍 Log State');
}
