import * as THREE from 'three';
import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import tree from './models/tree';
import house from './models/house';
import fence from './models/fence';
import tomato from './models/plants/tomato';
import cucumber from './models/plants/cucumber';
import vine from './models/plants/vine';
import rose from './models/decoration/rose';
import statue from './models/decoration/statue';
import well from './models/assets/well';
import gui from '@/utils/gui';
import textureLoader from '@/utils/loader/textureLoader';
import { activate } from '../utils/placementTool';
import { config as globalConfig } from '../config/config';
import { assetConfig } from '@/config/assetConfig';

function spawnTomato(point) {
  const blockSide = assetConfig.tomato.blockSize * globalConfig.grid.cellSize;

  const tex = textureLoader.load('./sprite/tomato/growing.png');
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(blockSide, blockSide, blockSide);
  sprite.position.set(point.x, blockSide * 0.25, point.z);
  scene.add(sprite);
}

export async function setupScene() {
  setupEnvironment();

  const treeModel = await tree();
  const houseModel = await house();
  const fenceModel = await fence();
  const tomatoModel = await tomato();
  const cucumberModel = await cucumber();
  const vineModel = await vine();
  const roseModel = await rose();
  const statueModel = await statue();
  const wellModel = await well();
  // scene.add(treeModel);
  scene.add(houseModel);
  // scene.add(fenceModel);
  // scene.add(wellModel);
  scene.add(tomatoModel);
  // scene.add(cucumberModel);
  // scene.add(vineModel);
  // scene.add(roseModel);
  // scene.add(statueModel);

  scene.add(ground);

  scene.add(ambientLight);
  scene.add(directionalLight);

  const actions = {
    placeTomato: () => activate(ground, spawnTomato, assetConfig.tomato.blockSize),
  };
  gui.add(actions, 'placeTomato').name('🍅 Tomato');
}

export default setupScene;
