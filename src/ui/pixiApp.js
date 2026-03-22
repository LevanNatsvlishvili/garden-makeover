import { Application } from 'pixi.js';

export const UI_HEIGHT = 72;
export const POPUP_HEIGHT = 80;
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

  const container = document.getElementById('ui-container');
  container.appendChild(app.canvas);
}

export function resizeCanvas() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

export function hideUI() {
  document.getElementById('ui-container').style.pointerEvents = 'none';
  app.canvas.style.opacity = '0';
}

export function showUI() {
  document.getElementById('ui-container').style.pointerEvents = 'auto';
  app.canvas.style.opacity = '1';
}
