import { Container, Graphics, Text } from 'pixi.js';
import { triggerAttack } from '@/gameplay/character/characterCombat';

const RADIUS = 36;

export function buildAttackButton() {
  const container = new Container();
  container.eventMode = 'static';
  container.cursor = 'pointer';

  const bg = new Graphics();
  container.addChild(bg);

  const label = new Text({
    text: '⚔️',
    style: { fontSize: 22 },
  });
  label.anchor.set(0.5);
  container.addChild(label);

  container.hitArea = {
    contains: (x, y) => x * x + y * y <= RADIUS * RADIUS,
  };

  let pressed = false;

  function draw() {
    bg.clear();
    bg.circle(0, 0, RADIUS);
    bg.fill({ color: pressed ? 0x992222 : 0xcc3333, alpha: 0.7 });
    bg.stroke({ color: 0xff6666, width: 2, alpha: 0.5 });
  }

  draw();

  container.on('pointerdown', () => {
    pressed = true;
    draw();
    triggerAttack();
  });

  container.on('pointerup', () => {
    pressed = false;
    draw();
  });

  container.on('pointerupoutside', () => {
    pressed = false;
    draw();
  });

  return container;
}
