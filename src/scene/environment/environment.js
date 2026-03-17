import * as THREE from 'three';
import { scene } from '../../utils/renderer';
import { config } from '../../config';

export function setupEnvironment() {
  const { background, fog } = config.environment;

  if (background !== undefined) {
    scene.background = new THREE.Color(background);
  }

  if (fog) {
    scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
  }
}
