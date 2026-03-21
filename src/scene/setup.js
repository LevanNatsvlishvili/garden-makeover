import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import models from '@/store/models';
import spawnHouse, { housePoint } from '@/gameplay/spawn/assets/house';
// Load Starter Models
import character from './models/other/character';
import tree from './models/other/tree';
// import house from './models/structures/house';
import well from './models/structures/well';
import house from './models/structures/house';

// Load Starter Models
const loadStarterModels = async () => {
  models.houseModel = await house(housePoint);
  models.characterModel = await character();
  // models.treeModel = await tree();

  scene.add(models.characterModel);
};

export async function setupScene() {
  setupEnvironment();

  await loadStarterModels();
  spawnHouse();

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
