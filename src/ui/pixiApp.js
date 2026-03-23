import { Application } from 'pixi.js';

export const UI_HEIGHT = 68;
export const POPUP_HEIGHT = 120;
export const POPUP_GAP = 10;

export const app = new Application();

export async function initPixiUI() {
  await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  });

  // const container = document.getElementById('ui-container');
  // container.appendChild(app.canvas);
}

export function resizeCanvas() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}
