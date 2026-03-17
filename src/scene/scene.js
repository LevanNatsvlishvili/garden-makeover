import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import tree from './models/tree';
import house from './models/house';

export async function setupScene() {
  setupEnvironment();

  const treeModel = await tree();
  const houseModel = await house();
  scene.add(treeModel);
  scene.add(houseModel);

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
