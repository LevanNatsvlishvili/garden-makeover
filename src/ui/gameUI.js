import { Graphics, Text } from 'pixi.js';
import { app, UI_HEIGHT } from './pixiApp';
import { UIButton } from './components/UIButton';
import state from '@/store/state';
import { assetConfig } from '@/config/assetConfig';
import { placeWell } from '@/gameplay/spawn/assets/spawnWell';
import { actionTomato } from '@/gameplay/spawn/assets/spawnTomato';
import { registerButton } from '@/gameplay/buttonManager';

const BTN_GAP = 16;
const BTN_WIDTH = 130;
const PADDING_X = 24;

export function buildGameUI() {
  const barBg = new Graphics();
  drawBar(barBg, app.screen.width);
  app.stage.addChild(barBg);

  const moneyText = new Text({
    text: `💰  ${state.money}`,
    style: {
      fill: 0xffd166,
      fontSize: 18,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  moneyText.anchor.set(0, 0.5);
  moneyText.position.set(PADDING_X, UI_HEIGHT / 2);
  app.stage.addChild(moneyText);

  const buttons = [];

  const wellBtn = new UIButton({
    label: 'Well',
    price: assetConfig.well.price,
    emoji: '⛲',
    onClick: placeWell,
  });
  buttons.push(wellBtn);
  app.stage.addChild(wellBtn);
  registerButton(
    wellBtn,
    () => state.money >= assetConfig.well.price && !state.isWellPlaced && state.isDay
  );

  const tomatoBtn = new UIButton({
    label: 'Tomato',
    price: assetConfig.tomato.price,
    emoji: '🍅',
    onClick: actionTomato,
  });
  buttons.push(tomatoBtn);
  app.stage.addChild(tomatoBtn);
  registerButton(
    tomatoBtn,
    () => state.money >= assetConfig.tomato.price && state.isWellPlaced && state.isDay
  );

  layoutButtons(buttons, app.screen.width);

  app.ticker.add(() => {
    moneyText.text = `💰  ${state.money}`;
  });

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    app.renderer.resize(w, UI_HEIGHT);
    barBg.clear();
    drawBar(barBg, w);
    layoutButtons(buttons, w);
  });
}

function drawBar(gfx, width) {
  gfx.rect(0, 0, width, UI_HEIGHT);
  gfx.fill({ color: 0x14213d, alpha: 0.85 });
  gfx.rect(0, 0, width, 1);
  gfx.fill({ color: 0x8d99ae, alpha: 0.3 });
}

function layoutButtons(buttons, screenWidth) {
  const totalWidth = buttons.length * BTN_WIDTH + (buttons.length - 1) * BTN_GAP;
  const startX = (screenWidth - totalWidth) / 2;
  const y = (UI_HEIGHT - 46) / 2;

  buttons.forEach((btn, i) => {
    btn.position.set(startX + i * (BTN_WIDTH + BTN_GAP), y);
  });
}
