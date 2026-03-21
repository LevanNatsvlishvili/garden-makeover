import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import models from '@/store/models';

// Load Starter Models
import character from './models/other/character';
import tree from './models/other/tree';
import house from './models/structures/house';
import well from './models/structures/well';

// Load Starter Models
const loadStarterModels = async () => {
  models.houseModel = await house();
  models.characterModel = await character();
  models.treeModel = await tree();
  models.wellModel = await well();
  scene.add(models.characterModel);
  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
};

export async function setupScene() {
  setupEnvironment();

  loadStarterModels();

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
