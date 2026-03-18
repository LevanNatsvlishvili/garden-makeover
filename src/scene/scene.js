import * as THREE from 'three';
import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import tree from './models/tree';
import house from './models/house';
import fence from './models/fence';
// import tomato from './models/plants/tomato';
// import cucumber from './models/plants/cucumber';
// import vine from './models/plants/vine';
import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import { spawnTomato, spawnCucumber, spawnVine, spawnRose, spawnStatue, spawnWell, spawnActivator } from '@/utils/spawnTool';

export async function setupScene() {
  setupEnvironment();

  // add red zone for spawn tool to not place place on each other

  // const treeModel = await tree();
  const houseModel = await house();
  // const fenceModel = await fence();

  // scene.add(treeModel);
  scene.add(houseModel);
  // scene.add(fenceModel);

  scene.add(ground);

  scene.add(ambientLight);
  scene.add(directionalLight);

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
