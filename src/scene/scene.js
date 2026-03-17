import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import tree from './models/tree';

export async function setupScene() {
  setupEnvironment();

  const treeModel = await tree();
  scene.add(treeModel);

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
