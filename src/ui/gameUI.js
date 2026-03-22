import { Container, Graphics, Text } from 'pixi.js';
import { app, UI_HEIGHT, resizeCanvas } from './pixiApp';
import { UIButton, BTN_HEIGHTS } from './components/button';
import { buildPopup } from './components/popup';
import { onPlacementChange } from '@/utils/placementTool';
import state from '@/store/state';
import { finishDay } from '@/gameplay/actions/finishDay';
import { canFinishDay } from '@/utils/canFinishDay';

const paddingX = 12;

export function buildGameUI() {
  const barGroup = new Container();
  const topbarGroup = new Container();

  const popup = buildPopup(() => closeShop());

  app.stage.addChild(topbarGroup);
  app.stage.addChild(popup.container);
  app.stage.addChild(barGroup);

  const screenW = app.screen.width;
  const btnWidth = screenW / 2 - paddingX * 2;

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

  const allPlants = () => [...state.tomatoes, ...state.cucumbers, ...state.vines];

  const harvestBtn = new UIButton({
    label: 'Harvest',
    emoji: '🍅',
    onClick: () => allPlants().forEach((p) => p.takeHarvest()),
    condition: () => state.isDay && allPlants().some((p) => p.status === 'ripe'),
    btnWidth,
  });
  harvestBtn.visible = false;
  barGroup.addChild(harvestBtn);

  const finishDayBtn = new UIButton({
    label: 'Finish Day',
    emoji: '🌙',
    onClick: () => finishDay(),
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
    const bw = w / 2 - paddingX * 2;
    const btnY = (UI_HEIGHT - BTN_HEIGHTS.md) / 2;

    barGroup.y = h - UI_HEIGHT;
    drawBarBg(w);

    moneyText.position.set(paddingX, 20);
    harvestBtn.position.set(paddingX, btnY);
    finishDayBtn.position.set(paddingX, btnY);
    shopBtn.position.set(w - bw - paddingX, btnY);

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

  const uiContainer = document.getElementById('ui-container');
  onPlacementChange(
    () => {
      barGroup.visible = false;
      popup.container.visible = false;
      uiContainer.style.pointerEvents = 'none';
    },
    () => {
      barGroup.visible = true;
      uiContainer.style.pointerEvents = 'auto';
    }
  );

  app.ticker.add(() => {
    moneyText.text = `💰  ${state.money}`;

    const arePlacementsMade = state.isWellPlaced && state.isPlantPlaced;
    const isDay = state.isDay;
    const isHarvestable = allPlants().some((p) => p.status === 'ripe');
    finishDayBtn.visible = arePlacementsMade && isDay && !isHarvestable;
    harvestBtn.visible = arePlacementsMade && isDay && isHarvestable;
    shopBtn.visible = isDay;

    harvestBtn.update();
    finishDayBtn.update();
    popup.update();
  });

  window.addEventListener('resize', () => {
    resizeCanvas();
    layout();
  });
}
