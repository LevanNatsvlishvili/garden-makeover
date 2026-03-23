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

    // Conditions based
    // if (tutorialIndex !== null) {
    //   if (state.isFirstDay) {
    //     shopBtn.setGlow(conditions.tutorial.shouldShopTipsStart());
    //   }
    //   if (conditions.tutorial.shouldFinishDayTipsStart()) {
    //     console.log(conditions.tutorial.shouldFinishDayTipsStart());
    //     finishDayBtn.setGlow(conditions.tutorial.shouldFinishDayTipsStart());
    //   }
    //   harvestBtn.setGlow(conditions.tutorial.shouldHarvestTipsStart() && tutorialIndex === 4);
    //   // Upgrade character
    //   console.log(state.isFirstDay);
    //   if (conditions.tutorial.shouldUpgradeCharacterTipsStart()) {
    //     shopBtn.setGlow(true);
    //   }
    // }

    // Tutorial index based
    if (tutorialIndex !== null) {
      // Welcome, activates until well and then tomato plants are placed
      // 0: Welcome and, Well placed, 1
      // 1: Tomato placed,
      // 5: Upgrade character
      if (tutorialIndex === 0 || tutorialIndex === 1) {
        shopBtn.setGlow(tutorialIndex === 0 || tutorialIndex === 1);
      }
      // Finish the day, activates when the first day is finished
      console.log(tutorialIndex);

      if (tutorialIndex === 2) {
        shopBtn.setGlow(false);

        finishDayBtn.setGlow(tutorialIndex === 2);
      }
      // harvestBtn.setGlow(tutorialIndex === 4);

      // 3: How to to navigate and attack monsters, happens during night
      // Doesn't activate any button

      if (tutorialIndex === 4) {
        // finishDayBtn.setGlow(tutorialIndex === 3);
        harvestBtn.setGlow(tutorialIndex === 4);
      }
      // // Upgrade character
      if (tutorialIndex === 5) {
        finishDayBtn.setGlow(false);
        shopBtn.setGlow(true);
      }
      if (tutorialIndex === 6) {
        shopBtn.setGlow(false);
      }
    }

    harvestBtn.update();
    finishDayBtn.update();
    harvestBtn.tickGlow();
    finishDayBtn.tickGlow();
    shopBtn.tickGlow();
  }

  return { container, layout, update };
}
