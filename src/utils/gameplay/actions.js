import ground from '@/scene/environment/ground';
import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import state from '@/state/state';
import { actionTomato } from './tomato';
import { actionWell } from './well';
import { registerButton } from './buttonManager';

export async function loadPlacementTools() {
  const {
    spawnTomato,
    spawnCucumber,
    spawnVine,
    spawnRedRose,
    spawnStatue,
    spawnWell,
    spawnActivator,
    spawnHouse,
  } = await import('@/utils/gameplay/spawnTool');

  const actions = {
    placeTomato: actionTomato,
    placeWell: actionWell,
    logState: () => console.log(state),
    changeTomatoStatus: () =>
      state.tomatoes.map((tomato) =>
        tomato.setStatus(tomato.status === 'ripe' ? 'growing' : 'ripe')
      ),
    ripenTomato: () => state.tomatoes.map((tomato) => tomato.ripenHarvest()),
    takeHarvest: () => state.tomatoes.map((tomato) => tomato.takeHarvest()),
    // state.tomatoes.map.setStatus(state.tomatoes[0]?.status === 'ripe' ? 'growing' : 'ripe'),

    // placeCucumber: () => spawnActivator(ground, spawnCucumber, assetConfig.cucumber.blockSize),
    // placeVine: () => spawnActivator(ground, spawnVine, assetConfig.vine.blockSize),
    // placeRose: () => spawnActivator(ground, spawnRedRose, assetConfig.rose.blockSize),
    // placeYellowRose: () =>
    //   spawnActivator(ground, (point) => spawnRedRose(point, 'yellow'), assetConfig.rose.blockSize),
    // placeStatue: () =>
    //   spawnActivator(ground, (point) => spawnStatue(point, 1), assetConfig.statue.blockSize),
    // placeStatue2: () =>
    //   spawnActivator(ground, (point) => spawnStatue(point, 2), assetConfig.statue.blockSize),
    // placeStatue3: () =>
    //   spawnActivator(ground, (point) => spawnStatue(point, 3), assetConfig.statue.blockSize),
    // placeHouse: () =>
    //   spawnActivator(ground, spawnHouse, {
    //     x: assetConfig.house.xBlocks,
    //     z: assetConfig.house.yBlocks,
    //   }),
  };

  const tomatoCtrl = gui
    .add(actions, 'placeTomato')
    .name('🍅 Tomato')
    .enable(state.money >= assetConfig.tomato.price && state.isWellPlaced);
  registerButton(tomatoCtrl, () => state.money >= assetConfig.tomato.price && state.isWellPlaced);

  const wellCtrl = gui
    .add(actions, 'placeWell')
    .name('⛲ Well')
    .enable(state.money >= assetConfig.well.price && !state.isWellPlaced);
  registerButton(wellCtrl, () => state.money >= assetConfig.well.price && !state.isWellPlaced);

  gui.add(state, 'money').name('💰 Money').listen().disable();

  const harvestCtrl = gui
    .add(actions, 'takeHarvest')
    .name('🍅 Take Harvest')
    .enable(state.tomatoes.some((tomato) => tomato.status === 'ripe'));
  registerButton(harvestCtrl, () => state.tomatoes.some((tomato) => tomato.status === 'ripe'));
  console.log(state.tomatoes.some((tomato) => tomato.status === 'ripe'));

  const ripenTomatoCtrl = gui.add(actions, 'ripenTomato').name('🍅 Ripen Tomato').enable(false);
  registerButton(
    ripenTomatoCtrl,
    () => state.tomatoes.length > 0 && state.tomatoes.some((tomato) => tomato.status === 'growing')
  );

  // setTomatoController(tomatoCtrl);
  // gui
  //   .add(actions, 'placeCucumber')
  //   .name('🥒 Cucumber')
  //   .enable(state.money >= 5);
  // gui
  //   .add(actions, 'placeVine')
  //   .name('🍇 Vine')
  //   .enable(state.money >= 7);
  // gui.add(actions, 'placeRose').name('🌹 Red Rose');
  // gui.add(actions, 'placeYellowRose').name('🌹 Yellow Rose');
  // gui.add(actions, 'placeStatue').name('🗿 Statue 1');
  // gui.add(actions, 'placeStatue2').name('🗿 Statue 2');
  // gui.add(actions, 'placeStatue3').name('🗿 Statue 3');

  // add number in gui to keep track of money
  gui.add(actions, 'logState').name('🔍 Log State');
  // gui.add(actions, 'changeTomatoStatus').name('🍅 Change Status Tomato');
  // gui.add(actions, 'ripenTomato').name('🍅 Ripen Tomato');
  // gui.add(actions, 'takeHarvest').name('🍅 Take Harvest');
}
