import { Application } from 'pixi.js';

export const UI_HEIGHT = 72;

export const app = new Application();

export async function initPixiUI() {
  await app.init({
    width: window.innerWidth,
    height: UI_HEIGHT,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  });

  const container = document.getElementById('ui-container');
  container.appendChild(app.canvas);
}
