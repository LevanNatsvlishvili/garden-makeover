import * as THREE from 'three';
import { camera, renderer, scene } from './utils/renderer';
import { controls } from './utils/controls/controls';
import windowResizer from './utils/windowResizer';
import { setupScene, loadPlacementTools, characterModel, houseModel } from './scene/scene';
import { updateCharacter } from './utils/controls/characterController';
import { config } from './config/config';
import { assetConfig } from './config/assetConfig';
import './styles/style.css';

const raycaster = new THREE.Raycaster();
const screenPos = new THREE.Vector2();
const charNDC = new THREE.Vector3();

function isCharBehindSprite(sprite, charModel) {
  charNDC.copy(charModel.position).project(camera);
  screenPos.set(charNDC.x, charNDC.y);

  raycaster.setFromCamera(screenPos, camera);
  const hits = raycaster.intersectObject(sprite);

  if (hits.length === 0) return false;

  const charDist = camera.position.distanceTo(charModel.position);
  return hits[0].distance < charDist;
}

async function init() {
  scene.add(camera);
  windowResizer(camera, renderer);

  await setupScene();

  const frameDuration = 1000 / config.fps.limit;
  let lastTime = 0;

  const tick = (now) => {
    window.requestAnimationFrame(tick);

    if (!lastTime) {
      lastTime = now;
    }

    const delta = now - lastTime;

    if (delta < frameDuration) {
      return;
    }

    lastTime = now - (delta % frameDuration);

    const deltaSec = delta / 1000;

    if (characterModel) {
      updateCharacter(characterModel, deltaSec);

      if (houseModel) {
        const houseRightEdge = houseModel.position.x + houseModel.scale.x * 0.5;
        const charBehindX = characterModel.position.x < houseRightEdge;
        const behind = charBehindX && isCharBehindSprite(houseModel, characterModel);
        const target = behind ? 0.3 : 1.0;
        const mat = houseModel.material;
        mat.opacity += (target - mat.opacity) * 0.1;
      }
    }

    controls.update();
    renderer.render(scene, camera);
  };
  window.requestAnimationFrame(tick);

  loadPlacementTools();
}
init().catch((err) => {
  console.error(
    'An error occurred during loading, please restart the webpage and start again:',
    err
  );
});
