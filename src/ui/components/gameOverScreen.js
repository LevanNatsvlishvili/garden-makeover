import { Container, Graphics, Text } from 'pixi.js';
import { app } from '../pixiApp';
import { resetGame } from '@/gameplay/actions/resetGame';

export function buildGameOverScreen() {
  const container = new Container();
  container.visible = false;
  container.eventMode = 'static';

  const overlay = new Graphics();
  container.addChild(overlay);

  const title = new Text({
    text: 'GAME OVER',
    style: {
      fill: 0xff3333,
      fontSize: 48,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  title.anchor.set(0.5);
  container.addChild(title);

  const sub = new Text({
    text: 'You were defeated',
    style: {
      fill: 0xaaaaaa,
      fontSize: 18,
      fontFamily: 'Segoe UI, Arial, sans-serif',
    },
  });
  sub.anchor.set(0.5);
  container.addChild(sub);

  const btnBg = new Graphics();
  container.addChild(btnBg);

  const btnLabel = new Text({
    text: 'Restart',
    style: {
      fill: 0xffffff,
      fontSize: 20,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 'bold',
    },
  });
  btnLabel.anchor.set(0.5);
  container.addChild(btnLabel);

  const BTN_W = 180;
  const BTN_H = 52;

  function drawBtn(hovered) {
    btnBg.clear();
    btnBg.roundRect(-BTN_W / 2, -BTN_H / 2, BTN_W, BTN_H, 10);
    btnBg.fill({ color: hovered ? 0xcc2222 : 0x991111, alpha: 1 });
    btnBg.stroke({ color: 0xff6666, width: 1.5, alpha: 0.7 });
  }

  btnBg.eventMode = 'static';
  btnBg.cursor = 'pointer';
  btnBg.on('pointerover', () => drawBtn(true));
  btnBg.on('pointerout', () => drawBtn(false));
  btnBg.on('pointerdown', () => {
    resetGame();
    container.visible = false;
  });

  drawBtn(false);

  function layout() {
    const w = app.screen.width;
    const h = app.screen.height;

    overlay.clear();
    overlay.rect(0, 0, w, h);
    overlay.fill({ color: 0x000000, alpha: 0.75 });

    title.position.set(w / 2, h / 2 - 80);
    sub.position.set(w / 2, h / 2 - 24);

    const btnY = h / 2 + 52;
    btnBg.position.set(w / 2, btnY);
    btnLabel.position.set(w / 2, btnY);
  }

  function show() {
    container.visible = true;
    layout();
  }

  window.addEventListener('resize', () => {
    if (container.visible) layout();
  });

  return { container, show };
}
