import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import state from '@/store/state';
import { actionTomato } from './spawn/assets/tomato';
import { actionCucumber } from './spawn/assets/cucumber';
import { actionVine } from './spawn/assets/vine';
import { placeWell } from './spawn/assets/well';
import { registerButton } from './buttonManager';
import { ambientLight, directionalLight } from '@/scene/lights/lights';
import { config } from '@/config/config';
import { torchLight } from '@/scene/models/other/character';
import models from '@/store/models';

export async function loadPlacementTools() {
  const allPlants = () => [...state.tomatoes, ...state.cucumbers, ...state.vines];

  const { intensity: defaultAmbient } = config.lights.ambient;
  const { intensity: defaultDirectional } = config.lights.directional;

  const actions = {
    placeTomato: actionTomato,
    placeCucumber: actionCucumber,
    placeVine: actionVine,
    placeWell: placeWell,
    logState: () => console.log(state),
    ripenAll: () => allPlants().forEach((p) => p.ripenHarvest()),
    takeHarvest: () => allPlants().forEach((p) => p.takeHarvest()),
    finishDay: () => {
      const isDay = state.isDay;
      state.isDay = !state.isDay;
      torchLight.intensity = state.isDay ? 0 : 1.5;
      ambientLight.intensity = isDay ? 0.5 : defaultAmbient;
      directionalLight.intensity = isDay ? defaultDirectional : 1;
      if (models.houseModel) {
        models.houseModel.material.color.setScalar(isDay ? 0.4 : 1);
      }
    },
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

  const finishDayCtrl = gui.add(actions, 'finishDay').name('🔍 Finish Day').enable(true);
  registerButton(finishDayCtrl, () => true);

  gui.add(state, 'money').name('💰 Money').listen().disable();

  const harvestCtrl = gui.add(actions, 'takeHarvest').name('🌾 Take Harvest').enable(false);
  registerButton(harvestCtrl, () => allPlants().some((p) => p.status === 'ripe'));

  const ripenCtrl = gui.add(actions, 'ripenAll').name('☀️ Ripen All').enable(false);
  registerButton(
    ripenCtrl,
    () => allPlants().length > 0 && allPlants().some((p) => p.status === 'growing')
  );

  gui.add(actions, 'logState').name('🔍 Log State');
}
