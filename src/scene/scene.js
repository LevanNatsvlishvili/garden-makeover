import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import tree from './models/tree';
import house from './models/house';
import bush from './models/bush';
import fence from './models/fence';
import well from './models/well';

export async function setupScene() {
  setupEnvironment();

  const treeModel = await tree();
  const houseModel = await house();
  const bushModel = await bush();
  const fenceModel = await fence();
  const wellModel = await well();
  scene.add(treeModel);
  scene.add(houseModel);
  scene.add(bushModel);
  scene.add(fenceModel);
  scene.add(wellModel);

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
