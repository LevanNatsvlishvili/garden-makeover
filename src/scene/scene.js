import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import house from './models/house';
import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';

export async function setupScene() {
  setupEnvironment();

  const houseModel = await house();
  scene.add(houseModel);

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export async function loadPlacementTools() {
  const { spawnTomato, spawnCucumber, spawnVine, spawnRose, spawnStatue, spawnWell, spawnActivator } =
    await import('@/utils/spawnTool');

  const actions = {
    placeTomato: () => spawnActivator(ground, spawnTomato, assetConfig.tomato.blockSize),
    placeCucumber: () => spawnActivator(ground, spawnCucumber, assetConfig.cucumber.blockSize),
    placeVine: () => spawnActivator(ground, spawnVine, assetConfig.vine.blockSize),
    placeRose: () => spawnActivator(ground, spawnRose, assetConfig.rose.blockSize),
    placeStatue: () => spawnActivator(ground, spawnStatue, assetConfig.statue.blockSize),
    placeWell: () => spawnActivator(ground, spawnWell, assetConfig.well.blockSize),
  };
  gui.add(actions, 'placeTomato').name('🍅 Tomato');
  gui.add(actions, 'placeCucumber').name('🥒 Cucumber');
  gui.add(actions, 'placeVine').name('🍇 Vine');
  gui.add(actions, 'placeRose').name('🌹 Rose');
  gui.add(actions, 'placeStatue').name('🗿 Statue');
  gui.add(actions, 'placeWell').name('⛲ Well');
}

export default setupScene;
