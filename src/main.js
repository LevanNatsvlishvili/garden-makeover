import * as THREE from 'three';
import { camera, renderer, controls, scene } from './utils/renderer.js';
import windowResizer from './utils/windowResizer.js';
import './styles/style.css';

async function init() {
  // Camera
  scene.add(camera);

  // Resizes window every time the window size changes
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
  const clock = new THREE.Clock();

  const fpsLimit = 60;
  const frameDuration = 1000 / fpsLimit; // ~16.67ms
  let lastTime = 0;

  const lowFPS = 30;
  const lowFrameDuration = 1000 / lowFPS; // ~33.33ms
  let lastLowTime = 0;

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

    // stats.begin();

    const t = clock.getElapsedTime(); // seconds since start

    // Low framerate updates
    if (now - lastLowTime >= lowFrameDuration) {
    }

    controls.update();
    renderer.render(scene, camera);

    // stats.end();
  };
  window.requestAnimationFrame(tick);
}
init().catch((err) => {
  console.error(
    'An error occurred during loading, please restart the webpage and start again:',
    err
  );
});
