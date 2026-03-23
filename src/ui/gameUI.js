import { Container, Graphics, Text } from 'pixi.js';
import { app, UI_HEIGHT, resizeCanvas } from './pixiApp';
import { UIButton, BTN_HEIGHTS } from './components/button';
import { buildPopup } from './components/popup';
import { buildTutorialTips } from './components/tutorialTips';
import { buildJoystick } from './components/joystick';
import { buildAttackButton } from './components/attackButton';
import { onPlacementChange } from '@/utils/placementTool';
import state from '@/store/state';
import { config } from '@/config/config';
import { finishDay } from '@/gameplay/actions/finishDay';
import { moveTutorialIndex } from './utils/tutorialIndex';
import { createConditions } from './utils/conditions';

const paddingX = 12;

export function buildGameUI() {
  const barGroup = new Container();
  const topbarGroup = new Container();

  let tutorialIndex = null;

  const conditions = createConditions();

  const popup = buildPopup(() => closeShop(), conditions);
  const tutorialTips = buildTutorialTips();

  const joystick = buildJoystick();
  const attackBtn = buildAttackButton();
  app.stage.addChild(joystick);
  app.stage.addChild(attackBtn);
  app.stage.addChild(topbarGroup);
  app.stage.addChild(tutorialTips.container);
  app.stage.addChild(popup.container);
  app.stage.addChild(barGroup);

  let btnWidth = app.screen.width / 2 - paddingX * 2;

  const barBg = new Graphics();
  barGroup.addChild(barBg);

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
  topbarGroup.addChild(moneyText);

  const HP_BAR_W = 80;
  const HP_BAR_H = 10;
  const maxHealth = config.character.health;

  const hpLabel = new Text({
    text: '❤️',
    style: { fontSize: 14 },
  });
  hpLabel.anchor.set(0, 0.5);
  topbarGroup.addChild(hpLabel);

  const hpBarBg = new Graphics();
  topbarGroup.addChild(hpBarBg);

  const hpBarFill = new Graphics();
  topbarGroup.addChild(hpBarFill);

  const hpText = new Text({
    text: `${state.characterHealth}`,
    style: {
      fill: 0xffffff,
      fontSize: 11,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  hpText.anchor.set(0.5, 0.5);
  topbarGroup.addChild(hpText);

  const atkText = new Text({
    text: `⚔️ ${config.character.attackDamage}`,
    style: {
      fill: 0xff6b6b,
      fontSize: 14,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  atkText.anchor.set(0, 0.5);
  topbarGroup.addChild(atkText);

  function drawHpBar() {
    const ratio = Math.max(0, state.characterHealth / maxHealth);

    hpBarBg.clear();
    hpBarBg.roundRect(0, 0, HP_BAR_W, HP_BAR_H, 3);
    hpBarBg.fill({ color: 0x333333, alpha: 0.7 });
    hpBarBg.stroke({ color: 0x666666, width: 1, alpha: 0.5 });

    const fillColor = ratio > 0.5 ? 0x44cc44 : ratio > 0.25 ? 0xddaa00 : 0xcc3333;
    hpBarFill.clear();
    if (ratio > 0) {
      hpBarFill.roundRect(0, 0, HP_BAR_W * ratio, HP_BAR_H, 3);
      hpBarFill.fill({ color: fillColor, alpha: 0.9 });
    }

    hpText.text = `${state.characterHealth}/${maxHealth}`;
  }

  drawHpBar();

  const allPlants = () => [...state.tomatoes, ...state.cucumbers, ...state.vines];

  const harvestBtn = new UIButton({
    label: 'Harvest',
    emoji: '🍅',
    onClick: () => {
      conditions.allPlants().forEach((p) => p.takeHarvest());
      state.isTutorialFinished = true;
      tutorialIndex = 5;
      setTimeout(() => {
        tutorialIndex = null;
      }, 5000);
    },
    condition: () => conditions.isDay() && conditions.isHarvestable(),
    btnWidth,
  });
  harvestBtn.visible = false;
  barGroup.addChild(harvestBtn);

  const finishDayBtn = new UIButton({
    label: 'Finish Day',
    emoji: '🌙',
    onClick: () => {
      closeShop();
      finishDay();
    },
    btnWidth,
    // condition: canFinishDay,
  });
  finishDayBtn.visible = true;
  barGroup.addChild(finishDayBtn);

  const shopBtn = new UIButton({
    label: 'Shop',
    emoji: '🛒',
    onClick: () => toggleShop(),
    btnWidth,
  });
  barGroup.addChild(shopBtn);

  let shopOpen = false;

  function drawBarBg(width) {
    barBg.clear();
    barBg.rect(0, 0, width, UI_HEIGHT);
    barBg.fill({ color: 0x14213d, alpha: 0.85 });
    barBg.rect(0, 0, width, 1);
    barBg.fill({ color: 0x8d99ae, alpha: 0.3 });
  }

  function layout() {
    const h = app.screen.height;
    const w = app.screen.width;
    btnWidth = w / 2 - paddingX * 2;
    const btnY = (UI_HEIGHT - BTN_HEIGHTS.md) / 2;

    barGroup.y = h - UI_HEIGHT;
    drawBarBg(w);
    joystick.position.set(80, h - UI_HEIGHT - 70);
    attackBtn.position.set(w - 80, h - UI_HEIGHT - 70);

    const topY = 20;
    moneyText.position.set(0, topY);
    const hpX = moneyText.width + 16;
    hpLabel.position.set(hpX, topY);
    hpBarBg.position.set(hpX + 20, topY - HP_BAR_H / 2);
    hpBarFill.position.set(hpX + 20, topY - HP_BAR_H / 2);
    hpText.position.set(hpX + 20 + HP_BAR_W / 2, topY);
    atkText.position.set(hpX + 20 + HP_BAR_W + 12, topY);
    topbarGroup.x = (w - topbarGroup.width) / 2;
    topbarGroup.y = 0;

    [harvestBtn, finishDayBtn, shopBtn].forEach((btn) => {
      btn._btnWidth = btnWidth;
      btn._draw();
    });

    harvestBtn.position.set(paddingX, btnY);
    finishDayBtn.position.set(paddingX, btnY);
    shopBtn.position.set(w - btnWidth - paddingX, btnY);

    tutorialTips.layout(tutorialIndex);

    if (shopOpen) {
      popup.layout();
    }
  }

  function toggleShop() {
    shopOpen ? closeShop() : openShop();
  }

  function openShop() {
    shopOpen = true;
    popup.container.visible = true;
    popup.layout();
  }

  function closeShop() {
    shopOpen = false;
    popup.container.visible = false;
  }

  layout();

  // Disables UI when placing assets and enables it when placing is finished
  // Pixi overrides pointer events on the container, so we need to make it dissapear
  const uiContainer = document.getElementById('ui-container');
  onPlacementChange(
    () => {
      barGroup.visible = false;
      joystick.visible = false;
      attackBtn.visible = false;
      popup.container.visible = false;
      uiContainer.style.pointerEvents = 'none';
    },
    () => {
      barGroup.visible = true;
      joystick.visible = true;
      uiContainer.style.pointerEvents = 'auto';
    }
  );

  app.ticker.add(() => {
    moneyText.text = `💰  ${state.money}`;
    drawHpBar();

    // Becomes visible when all placements, plants are harvested and is day
    finishDayBtn.visible = conditions.isFinishDayButtonVisible();
    harvestBtn.visible = conditions.isHarvestButtonVisible(); // Disappears when no plants are ripe and during night
    shopBtn.visible = conditions.isDay(); // Disappears during night
    attackBtn.visible = !conditions.isDay(); // Becomes visible during night

    // Conditions for tutorial
    if (tutorialIndex !== null) {
      shopBtn.setGlow(conditions.tutorial.shouldShopTipsStart());
      finishDayBtn.setGlow(conditions.tutorial.shouldFinishDayTipsStart());
      harvestBtn.setGlow(conditions.tutorial.shouldHarvestTipsStart() && tutorialIndex === 4);
    }

    // Moves tutorial tips
    tutorialIndex = moveTutorialIndex(tutorialIndex, conditions);

    harvestBtn.update();
    finishDayBtn.update();
    popup.update();
    tutorialTips.update(tutorialIndex);
    harvestBtn.tickGlow();
    finishDayBtn.tickGlow();
    shopBtn.tickGlow();
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    layout();
  });
}
