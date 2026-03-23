import { Container, Graphics } from 'pixi.js';
import { app, UI_HEIGHT } from '../pixiApp';
import { UIButton, BTN_HEIGHTS } from './button';
import state from '@/store/state';

const paddingX = 12;

export function buildBottomBar({ conditions, onShopToggle, onFinishDay, onHarvest }) {
  const container = new Container();

  const barBg = new Graphics();
  container.addChild(barBg);

  let btnWidth = app.screen.width / 2 - paddingX * 2;

  const harvestBtn = new UIButton({
    label: 'Harvest',
    emoji: '🍅',
    onClick: () => onHarvest(),
    condition: () => conditions.isDay() && conditions.isHarvestable(),
    btnWidth,
  });
  harvestBtn.visible = false;
  container.addChild(harvestBtn);

  const finishDayBtn = new UIButton({
    label: 'Finish Day',
    emoji: '🌙',
    onClick: () => {
      onFinishDay();
      state.isFirstDay = false;
    },
    btnWidth,
    // This button has 2 conditions:
    // 1: If it's the first day, enables the button
    // 2: If it's not the first day, enables the button if the character is upgraded
    condition: () => state.isFirstDay || (!state.isFirstDay && state.isCharacterUpgraded),
  });
  finishDayBtn.visible = true;
  container.addChild(finishDayBtn);

  const shopBtn = new UIButton({
    label: 'Shop',
    emoji: '🛒',
    onClick: () => onShopToggle(),
    btnWidth,
  });
  container.addChild(shopBtn);

  function drawBg(w) {
    barBg.clear();
    barBg.rect(0, 0, w, UI_HEIGHT);
    barBg.fill({ color: 0x14213d, alpha: 0.85 });
    barBg.rect(0, 0, w, 1);
    barBg.fill({ color: 0x8d99ae, alpha: 0.3 });
  }

  function layout() {
    const h = app.screen.height;
    const w = app.screen.width;
    btnWidth = w / 2 - paddingX * 2;
    const btnY = (UI_HEIGHT - BTN_HEIGHTS.md) / 2;

    container.y = h - UI_HEIGHT;
    drawBg(w);

    [harvestBtn, finishDayBtn, shopBtn].forEach((btn) => {
      btn._btnWidth = btnWidth;
      btn._draw();
    });

    harvestBtn.position.set(paddingX, btnY);
    finishDayBtn.position.set(paddingX, btnY);
    shopBtn.position.set(w - btnWidth - paddingX, btnY);
  }

  function update(tutorialIndex) {
    finishDayBtn.visible = conditions.isFinishDayButtonVisible();
    harvestBtn.visible = conditions.isHarvestButtonVisible();
    shopBtn.visible = conditions.isDay();

    if (tutorialIndex !== null) {
      shopBtn.setGlow(conditions.tutorial.shouldShopTipsStart());
      finishDayBtn.setGlow(conditions.tutorial.shouldFinishDayTipsStart());
      harvestBtn.setGlow(conditions.tutorial.shouldHarvestTipsStart() && tutorialIndex === 4);
    }

    harvestBtn.update();
    finishDayBtn.update();
    harvestBtn.tickGlow();
    finishDayBtn.tickGlow();
    shopBtn.tickGlow();
  }

  return { container, layout, update };
}
