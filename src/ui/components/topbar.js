import { Container, Graphics, Text } from 'pixi.js';
import { app } from '../pixiApp';
import state from '@/store/state';
import { config } from '@/config/config';

const HP_BAR_W = 80;
const HP_BAR_H = 10;

const BG_PADDING_X = 14;
const BG_HEIGHT = 40;

export function buildTopbar() {
  const container = new Container();
  const maxHealth = state.characterMaxHealth;

  const bg = new Graphics();
  container.addChild(bg);

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
  container.addChild(moneyText);

  const hpLabel = new Text({
    text: '❤️',
    style: { fontSize: 14 },
  });
  hpLabel.anchor.set(0, 0.5);
  container.addChild(hpLabel);

  const hpBarBg = new Graphics();
  container.addChild(hpBarBg);

  const hpBarFill = new Graphics();
  container.addChild(hpBarFill);

  const hpText = new Text({
    text: `${state.characterCurrentHealth}`,
    style: {
      fill: 0xffffff,
      fontSize: 11,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  hpText.anchor.set(0.5, 0.5);
  container.addChild(hpText);

  const atkText = new Text({
    text: `⚔️ ${state.attackDamage}`,
    style: {
      fill: 0xff6b6b,
      fontSize: 14,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  atkText.anchor.set(0, 0.5);
  container.addChild(atkText);

  const potionsText = new Text({
    text: `🧪 ${state.potions}`,
    style: {
      fill: 0xff6b6b,
      fontSize: 12,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  potionsText.anchor.set(-1.5, 0.5);
  container.addChild(potionsText);

  function drawHpBar() {
    const ratio = Math.max(0, state.characterCurrentHealth / state.characterMaxHealth);

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

    hpText.text = `${state.characterCurrentHealth}/${state.characterMaxHealth}`;
  }

  function layout() {
    const w = app.screen.width;
    const topY = BG_HEIGHT / 2;

    bg.clear();

    moneyText.position.set(0, topY);
    const hpX = moneyText.width + 16;
    hpLabel.position.set(hpX, topY);
    hpBarBg.position.set(hpX + 20, topY - HP_BAR_H / 2);
    hpBarFill.position.set(hpX + 20, topY - HP_BAR_H / 2);
    hpText.position.set(hpX + 20 + HP_BAR_W / 2, topY);
    atkText.position.set(hpX + 20 + HP_BAR_W + 12, topY);
    potionsText.position.set(hpX + 20 + HP_BAR_W + 12, topY);

    const contentW = container.width;

    bg.roundRect(-BG_PADDING_X, 0, contentW + BG_PADDING_X * 2, BG_HEIGHT, 8);
    bg.fill({ color: 0x14213d, alpha: 0.85 });
    bg.stroke({ color: 0x8d99ae, width: 1, alpha: 0.3 });

    container.x = (w - contentW) / 2;
    container.y = 0;
  }

  function update() {
    moneyText.text = `💰  ${state.money}`;
    drawHpBar();
    atkText.text = `⚔️ ${state.attackDamage}`;
  }

  drawHpBar();

  return { container, layout, update };
}
