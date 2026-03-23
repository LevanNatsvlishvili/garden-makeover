import { Container, Graphics } from 'pixi.js';
import { app, UI_HEIGHT, POPUP_GAP } from '../pixiApp';
import { UIButton, BTN_HEIGHTS } from './button';
import state from '@/store/state';
import { assetConfig } from '@/config/assetConfig';
import { placeWell } from '@/gameplay/spawn/assets/spawnWell';
import { actionTomato } from '@/gameplay/spawn/assets/spawnTomato';
import { actionCucumber } from '@/gameplay/spawn/assets/spawnCucumber';
import { actionVine } from '@/gameplay/spawn/assets/spawnVine';

const BTN_GAP = 8;
const ROW_GAP = 8;
const paddingX = 12;
const paddingY = 10;

export function buildPopup(onClose, conditions) {
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
    subText: assetConfig.tomato.harvestIncome,
    btnSize: 'lg',
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
    subText: `income ${assetConfig.cucumber.harvestIncome}`,
    btnSize: 'lg',
    emoji: '🥒',
    onClick: () => {
      actionCucumber();
      onClose();
    },
    condition: () => state.money >= assetConfig.cucumber.price && state.isWellPlaced && state.isDay,
  });
  popupGroup.addChild(cucumberBtn);
  allButtons.push(cucumberBtn);
  plantButtons.push(cucumberBtn);

  const vineBtn = new UIButton({
    label: 'Vine',
    price: assetConfig.vine.price,
    subText: `income ${assetConfig.vine.harvestIncome}`,
    btnSize: 'lg',
    txtSize: 'sm',
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

  const potionButtons = [];

  const atkPotionBtn = new UIButton({
    label: 'Atk Potion',
    price: assetConfig.attackIncrease.price,
    subText: `increase ${assetConfig.attackIncrease.increase} dmg`,
    emoji: '⚔️',
    btnSize: 'lg',
    onClick: () => {},
    condition: () => state.money >= assetConfig.attackIncrease.price && state.isDay,
  });
  popupGroup.addChild(atkPotionBtn);
  allButtons.push(atkPotionBtn);
  potionButtons.push(atkPotionBtn);

  const hpPotionBtn = new UIButton({
    label: 'Hp Potion',
    subText: `restores ${assetConfig.healthPottion.healthRestore} hp`,
    price: assetConfig.healthPottion.price,
    emoji: '❤️',
    btnSize: 'lg',
    onClick: () => {},
    condition: () => state.money >= assetConfig.healthPottion.price && state.isDay,
  });
  popupGroup.addChild(hpPotionBtn);
  allButtons.push(hpPotionBtn);
  potionButtons.push(hpPotionBtn);

  const maxHpBtn = new UIButton({
    label: '+Max Hp',
    price: assetConfig.maxHealthIncrease.price,
    subText: `increase ${assetConfig.maxHealthIncrease.increase} max hp`,
    emoji: '💖',
    btnSize: 'lg',
    onClick: () => {},
    condition: () => state.money >= assetConfig.maxHealthIncrease.price && state.isDay,
  });
  popupGroup.addChild(maxHpBtn);
  allButtons.push(maxHpBtn);
  potionButtons.push(maxHpBtn);

  popupGroup.visible = false;

  function layout() {
    const h = app.screen.height;
    const w = app.screen.width;
    const innerW = w - paddingX * 2;
    const showWell = !state.isWellPlaced;
    const plantH = BTN_HEIGHTS.lg;
    const potionH = BTN_HEIGHTS.lg;
    const wellH = BTN_HEIGHTS.md;
    const popupH = paddingY * 2 + plantH + ROW_GAP + potionH + (showWell ? ROW_GAP + wellH : 0);

    popupBg.clear();
    popupBg.roundRect(0, 0, w, popupH, 10);
    popupBg.fill({ color: 0x14213d, alpha: 0.9 });
    popupBg.stroke({ color: 0x8d99ae, width: 1, alpha: 0.25 });

    const potionBtnW = (innerW - BTN_GAP * (potionButtons.length - 1)) / potionButtons.length;
    const potionRowY = paddingY;
    potionButtons.forEach((btn, i) => {
      btn._btnWidth = potionBtnW;
      btn._draw();
      btn.position.set(paddingX + i * (potionBtnW + BTN_GAP), potionRowY);
    });

    const plantBtnW = (innerW - BTN_GAP * (plantButtons.length - 1)) / plantButtons.length;
    const plantRowY = potionRowY + potionH + ROW_GAP;
    plantButtons.forEach((btn, i) => {
      btn._btnWidth = plantBtnW;
      btn._draw();
      btn.position.set(paddingX + i * (plantBtnW + BTN_GAP), plantRowY);
    });

    if (showWell) {
      const wellRowY = plantRowY + plantH + ROW_GAP;
      wellBtn._btnWidth = innerW;
      wellBtn._draw();
      wellBtn.position.set(paddingX, wellRowY);
    }

    popupGroup.y = h - UI_HEIGHT - POPUP_GAP - popupH;
  }

  function update() {
    wellBtn.visible = !state.isWellPlaced;
    wellBtn.setGlow(conditions.tutorial.shouldWellTipsStart());
    tomatoBtn.setGlow(conditions.tutorial.shouldTomatoTipsStart());
    allButtons.forEach((btn) => {
      btn.update();
      btn.tickGlow();
    });
  }

  return { container: popupGroup, layout, update };
}
