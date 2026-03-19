import { camera, renderer, scene } from './utils/renderer';
import { controls } from './utils/controls/controls';
import windowResizer from './utils/windowResizer';
import { setupScene, loadPlacementTools, characterModel } from './scene/scene';
import { updateCharacter } from './utils/controls/characterController';
import { config } from './config/config';
import './styles/style.css';

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
    }

    const distance = spriteScreenPos.distanceTo(charScreenPos);
    if (distance < 1) {
      console.log('House is near the character');
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
