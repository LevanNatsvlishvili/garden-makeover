import * as THREE from 'three';
import { camera, renderer, controls, scene } from './utils/renderer.js';
import windowResizer from './utils/windowResizer.js';
import { config } from './config';
import './styles/style.css';

async function init() {
  scene.add(camera);
  windowResizer(camera, renderer);

  // Base
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshBasicMaterial({ color: 'green' })
  );
  floor.position.y = -0.5;
  floor.rotation.x = -Math.PI * 0.5;
  scene.add(floor);

  /**
   * Animate
   */

  const frameDuration = 1000 / config.fps.limit;
  let lastTime = 0;

  const tick = (now) => {
    window.requestAnimationFrame(tick);

    // First frame init
    if (!lastTime) {
      lastTime = now;
    }

    const delta = now - lastTime;

    // If not enough time passed for 60fps, skip this frame
    if (delta < frameDuration) {
      return;
    }

    // Keep leftover time (smoother pacing)
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
