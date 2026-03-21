import { camera, renderer, scene } from './utils/renderer';
import { controls } from './utils/controls/controls';
import windowResizer from './utils/windowResizer';
import { setupScene, setupRest } from './scene';
import models from './store/models';
import { actions } from './gameplay/actions';
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

    if (models.characterModel) {
      updateCharacter(models.characterModel, deltaSec);
    }

    controls.update();
    renderer.render(scene, camera);
  };
  window.requestAnimationFrame(tick);

  setupRest();
  actions();
}
init().catch((err) => {
  console.error(
    'An error occurred during loading, please restart the webpage and start again:',
    err
  );
});
