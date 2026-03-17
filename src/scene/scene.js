import { scene } from '../utils/renderer';
import { ground } from './ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';

export function setupScene() {
  setupEnvironment();
  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}
