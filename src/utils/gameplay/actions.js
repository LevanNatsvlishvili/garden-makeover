import ground from '@/scene/environment/ground';
import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import state from '@/state/state';
import { actionTomato } from './tomato';

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
    placeCucumber: () => spawnActivator(ground, spawnCucumber, assetConfig.cucumber.blockSize),
    placeVine: () => spawnActivator(ground, spawnVine, assetConfig.vine.blockSize),
    placeRose: () => spawnActivator(ground, spawnRedRose, assetConfig.rose.blockSize),
    placeYellowRose: () =>
      spawnActivator(ground, (point) => spawnRedRose(point, 'yellow'), assetConfig.rose.blockSize),
    placeStatue: () =>
      spawnActivator(ground, (point) => spawnStatue(point, 1), assetConfig.statue.blockSize),
    placeStatue2: () =>
      spawnActivator(ground, (point) => spawnStatue(point, 2), assetConfig.statue.blockSize),
    placeStatue3: () =>
      spawnActivator(ground, (point) => spawnStatue(point, 3), assetConfig.statue.blockSize),
    placeWell: () => spawnActivator(ground, spawnWell, assetConfig.well.blockSize),
    placeHouse: () =>
      spawnActivator(ground, spawnHouse, {
        x: assetConfig.house.xBlocks,
        z: assetConfig.house.yBlocks,
      }),
  };
  // Disable tomato button if state money is less than 3
  gui
    .add(actions, 'placeTomato')
    .name('🍅 Tomato')
    .enable(state.money >= assetConfig.tomato.price);
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
  gui
    .add(actions, 'placeWell')
    .name('⛲ Well')
    .enable(state.money >= 10);

  // add number in gui to keep track of money
  gui.add(state, 'money').name('💰 Money').listen().disable();
}
