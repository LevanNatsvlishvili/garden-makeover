import { Container, Graphics, Text } from 'pixi.js';
import { app } from './pixiApp';

const BAR_WIDTH = 260;
const BAR_HEIGHT = 14;
const BAR_RADIUS = 7;
const BG_COLOR = 0x0a0e1a;
const BAR_BG = 0x1a1f33;
const BAR_FILL = 0x44cc88;
const BORDER = 0x2a3050;

let container;
let barBg;
let barFill;
let percentText;
let titleText;

export function showLoadingScreen() {
  container = new Container();
  app.stage.addChild(container);

  const bg = new Graphics();
  container.addChild(bg);

  titleText = new Text({
    text: 'Loading...',
    style: {
      fill: 0xdddddd,
      fontSize: 22,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  titleText.anchor.set(0.5);
  container.addChild(titleText);

  barBg = new Graphics();
  container.addChild(barBg);

  barFill = new Graphics();
  container.addChild(barFill);

  percentText = new Text({
    text: '0%',
    style: {
      fill: 0x999999,
      fontSize: 13,
      fontFamily: 'Segoe UI, Arial, sans-serif',
    },
  });
  percentText.anchor.set(0.5);
  container.addChild(percentText);

  layoutLoading();

  function layoutLoading() {
    const w = app.screen.width;
    const h = app.screen.height;
    const cx = w / 2;
    const cy = h / 2;

    bg.clear();
    bg.rect(0, 0, w, h);
    bg.fill({ color: BG_COLOR });

    titleText.position.set(cx, cy - 30);

    const barX = cx - BAR_WIDTH / 2;
    const barY = cy;

    barBg.clear();
    barBg.roundRect(barX, barY, BAR_WIDTH, BAR_HEIGHT, BAR_RADIUS);
    barBg.fill({ color: BAR_BG });
    barBg.stroke({ color: BORDER, width: 1 });

    percentText.position.set(cx, cy + 30);
  }

  window.addEventListener('resize', layoutLoading);
  container._layoutLoading = layoutLoading;
}

export function updateLoadingProgress(loaded, total) {
  if (!container) return;

  const ratio = total > 0 ? loaded / total : 0;
  const pct = Math.round(ratio * 100);

  percentText.text = `${pct}%`;

  const cx = app.screen.width / 2;
  const cy = app.screen.height / 2;
  const barX = cx - BAR_WIDTH / 2;
  const barY = cy;
  const fillW = Math.max(0, BAR_WIDTH * ratio);

  barFill.clear();
  if (fillW > 0) {
    barFill.roundRect(barX, barY, fillW, BAR_HEIGHT, BAR_RADIUS);
    barFill.fill({ color: BAR_FILL });
  }
}

export function hideLoadingScreen() {
  if (!container) return;
  container.destroy({ children: true });
  container = null;
}
