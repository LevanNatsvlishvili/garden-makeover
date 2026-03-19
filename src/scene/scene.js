import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import character from './models/starter/character';
import { spawnHouse } from '@/utils/spawnTool';

export let characterModel = null;

export async function setupScene() {
  setupEnvironment();

  spawnHouse();

  characterModel = await character();
  scene.add(characterModel);

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

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
  } = await import('@/utils/spawnTool');

  const actions = {
    placeTomato: () => spawnActivator(ground, spawnTomato, assetConfig.tomato.blockSize),
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
  gui.add(actions, 'placeTomato').name('🍅 Tomato');
  gui.add(actions, 'placeCucumber').name('🥒 Cucumber');
  gui.add(actions, 'placeVine').name('🍇 Vine');
  gui.add(actions, 'placeRose').name('🌹 Red Rose');
  gui.add(actions, 'placeYellowRose').name('🌹 Yellow Rose');
  gui.add(actions, 'placeStatue').name('🗿 Statue 1');
  gui.add(actions, 'placeStatue2').name('🗿 Statue 2');
  gui.add(actions, 'placeStatue3').name('🗿 Statue 3');
  gui.add(actions, 'placeWell').name('⛲ Well');
  gui.add(actions, 'placeHouse').name('🏠 House');
}

export default setupScene;
