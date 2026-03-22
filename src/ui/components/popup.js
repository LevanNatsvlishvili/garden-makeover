import { Container, Graphics } from 'pixi.js';
import { app, UI_HEIGHT, POPUP_HEIGHT, POPUP_GAP } from '../pixiApp';
import { UIButton } from './button';
import state from '@/store/state';
import { assetConfig } from '@/config/assetConfig';
import { placeWell } from '@/gameplay/spawn/assets/spawnWell';
import { actionTomato } from '@/gameplay/spawn/assets/spawnTomato';

const BTN_GAP = 16;
const paddingX = 12;

export function buildPopup(onClose) {
  const popupGroup = new Container();
  const screenW = app.screen.width;
  const btnWidth = screenW / 2 - paddingX * 2;

  const popupBg = new Graphics();
  popupGroup.addChild(popupBg);

  const buttons = [];

  const wellBtn = new UIButton({
    label: 'Well',
    price: assetConfig.well.price,
    emoji: '⛲',
    onClick: () => {
      placeWell();
      onClose();
    },
    condition: () => state.money >= assetConfig.well.price && !state.isWellPlaced && state.isDay,
  });
  popupGroup.addChild(wellBtn);
  buttons.push(wellBtn);

  const tomatoBtn = new UIButton({
    label: 'Tomato',
    price: assetConfig.tomato.price,
    emoji: '🍅',
    onClick: () => {
      actionTomato();
      onClose();
    },
    condition: () => state.money >= assetConfig.tomato.price && state.isWellPlaced && state.isDay,
  });
  popupGroup.addChild(tomatoBtn);
  buttons.push(tomatoBtn);

  popupGroup.visible = false;

  function layout() {
    const h = app.screen.height;
    const w = app.screen.width;
    const bw = w / 2 - paddingX * 2;
    const totalW = buttons.length * bw + (buttons.length - 1) * BTN_GAP;
    const pw = totalW + 32;
    const px = (w - pw) / 2;

    popupBg.clear();
    popupBg.roundRect(px, 0, pw, POPUP_HEIGHT, 10);
    popupBg.fill({ color: 0x14213d, alpha: 0.9 });
    popupBg.stroke({ color: 0x8d99ae, width: 1, alpha: 0.25 });

    const startX = (w - totalW) / 2;
    const y = (POPUP_HEIGHT - 46) / 2;
    buttons.forEach((btn, i) => {
      btn.position.set(startX + i * (bw + BTN_GAP), y);
    });

    popupGroup.y = h - UI_HEIGHT - POPUP_GAP - POPUP_HEIGHT;
  }

  function update() {
    buttons.forEach((btn) => btn.update());
  }

  return { container: popupGroup, layout, update };
}
