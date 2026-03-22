import { Container, Graphics } from 'pixi.js';
import { app, UI_HEIGHT, POPUP_HEIGHT, POPUP_GAP } from '../pixiApp';
import { UIButton } from './button';
import state from '@/store/state';
import { assetConfig } from '@/config/assetConfig';
import { placeWell } from '@/gameplay/spawn/assets/spawnWell';
import { actionTomato } from '@/gameplay/spawn/assets/spawnTomato';
import { actionCucumber } from '@/gameplay/spawn/assets/spawnCucumber';
import { actionVine } from '@/gameplay/spawn/assets/spawnVine';

const BTN_GAP = 8;
const BTN_HEIGHT = 46;
const ROW_GAP = 8;
const paddingX = 12;
const paddingY = 10;

export function buildPopup(onClose) {
  const popupGroup = new Container();

  const popupBg = new Graphics();
  popupGroup.addChild(popupBg);

  const allButtons = [];

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
  allButtons.push(wellBtn);

  const plantButtons = [];

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
  allButtons.push(tomatoBtn);
  plantButtons.push(tomatoBtn);

  const cucumberBtn = new UIButton({
    label: 'Cucumber',
    price: assetConfig.cucumber.price,
    emoji: '🥒',
    onClick: () => {
      actionCucumber();
      onClose();
    },
    condition: () =>
      state.money >= assetConfig.cucumber.price && state.isWellPlaced && state.isDay,
  });
  popupGroup.addChild(cucumberBtn);
  allButtons.push(cucumberBtn);
  plantButtons.push(cucumberBtn);

  const vineBtn = new UIButton({
    label: 'Vine',
    price: assetConfig.vine.price,
    emoji: '🍇',
    onClick: () => {
      actionVine();
      onClose();
    },
    condition: () => state.money >= assetConfig.vine.price && state.isWellPlaced && state.isDay,
  });
  popupGroup.addChild(vineBtn);
  allButtons.push(vineBtn);
  plantButtons.push(vineBtn);

  popupGroup.visible = false;

  function layout() {
    const h = app.screen.height;
    const w = app.screen.width;
    const innerW = w - paddingX * 2;
    const showWell = !state.isWellPlaced;
    const rows = showWell ? 2 : 1;
    const popupH = paddingY * 2 + BTN_HEIGHT * rows + (showWell ? ROW_GAP : 0);

    popupBg.clear();
    popupBg.roundRect(0, 0, w, popupH, 10);
    popupBg.fill({ color: 0x14213d, alpha: 0.9 });
    popupBg.stroke({ color: 0x8d99ae, width: 1, alpha: 0.25 });

    const plantBtnW = (innerW - BTN_GAP * (plantButtons.length - 1)) / plantButtons.length;
    const plantRowY = paddingY;
    plantButtons.forEach((btn, i) => {
      btn._btnWidth = plantBtnW;
      btn._draw();
      btn.position.set(paddingX + i * (plantBtnW + BTN_GAP), plantRowY);
    });

    if (showWell) {
      const wellRowY = plantRowY + BTN_HEIGHT + ROW_GAP;
      wellBtn._btnWidth = innerW;
      wellBtn._draw();
      wellBtn.position.set(paddingX, wellRowY);
    }

    popupGroup.y = h - UI_HEIGHT - POPUP_GAP - popupH;
  }

  function update() {
    wellBtn.visible = !state.isWellPlaced;
    allButtons.forEach((btn) => btn.update());
  }

  return { container: popupGroup, layout, update };
}
