import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import gui from '@/utils/gui';
import { assetConfig } from '@/config/assetConfig';
import character from './models/starter/character';
import { spawnHouse } from '@/utils/gameplay/spawnTool';
import state from '@/state/state';

export let characterModel = null;
export let houseModel = null;

export async function setupScene() {
  setupEnvironment();

  console.log(state);

  houseModel = await spawnHouse();

  characterModel = await character();
  scene.add(characterModel);

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
