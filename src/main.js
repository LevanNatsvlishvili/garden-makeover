import { camera, renderer, scene } from './utils/renderer';
import { controls } from './utils/controls/controls';
import windowResizer from './utils/windowResizer';
import { setupScene } from './scene/scene';
import { config } from './config';
import './styles/style.css';

async function init() {
  scene.add(camera);
  windowResizer(camera, renderer);
  setupScene();

  /**
   * Animate
   */

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

    controls.update();
    renderer.render(scene, camera);
  };
  window.requestAnimationFrame(tick);
}
init().catch((err) => {
  console.error(
    'An error occurred during loading, please restart the webpage and start again:',
    err
  );
});
