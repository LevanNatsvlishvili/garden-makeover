import { camera, renderer, scene } from './utils/renderer';
import { controls } from './utils/controls/controls';
import windowResizer from './utils/windowResizer';
import { setupScene, setupRest } from './scene';
import models from './store/models';
import { updateCharacter } from './gameplay/character/characterMobility';
import { updateCombat } from './gameplay/character/characterCombat';
import { updateAllEnemies } from './gameplay/enemyAI/enemyAI';
import { config } from './config/config';
import { initPixiUI } from './ui/pixiApp';
import { buildGameUI } from './ui/gameUI';
import './styles/style.css';
import { finishNight } from './gameplay/actions/finishNight';
import state from './store/state';

async function init() {
  scene.add(camera);
  windowResizer(camera, renderer);

  await setupScene();
  await initPixiUI();
  buildGameUI();

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
      updateCombat(deltaSec);
    }
    updateAllEnemies(deltaSec);

    controls.update();
    renderer.render(scene, camera);
  };
  window.requestAnimationFrame(tick);

  setupRest();
}
init().catch((err) => {
  console.error(
    'An error occurred during loading, please restart the webpage and start again:',
    err
  );
});
