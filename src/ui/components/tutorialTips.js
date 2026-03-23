import { Container, Graphics, Text } from 'pixi.js';
import { app } from '../pixiApp';
import state from '@/store/state';

const TIPS = [
  'Welcome, To start, You need to place the well, its essential for you and your plants to survive. Open the shop to place the well.',
  'Great, Now place the tomato plant from shop, you need it to earn gold by harvesting it.',
  'You have made all the necessary placements. Press "Finish Day" to end the day but beware, when night comes, monsters will appear and attack you.',
  'use Arrows to move and "space" to attack monsters, if on mobile use knob and attack button to attack monsters',
  'Congratulations, you have survived the night. Now you can harvest your plants to earn gold.',
  "You've got all the basics, now you can start playing the game. Good luck!",
];

const paddingX = 16;
const paddingY = 10;

export function buildTutorialTips() {
  const container = new Container();

  const bg = new Graphics();
  container.addChild(bg);

  const tipText = new Text({
    text: '',
    style: {
      fill: 0xedf2f4,
      fontSize: 13,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontStyle: 'italic',
      wordWrap: true,
      wordWrapWidth: 280,
      align: 'center',
    },
  });
  tipText.anchor.set(0.5, 0.5);
  container.addChild(tipText);

  let currentIndex = 0;
  let lastSwitch = performance.now();

  function setTip(index) {
    tipText.text = `💡  ${TIPS[index]}`;
  }

  setTip(currentIndex);

  function layout() {
    const w = app.screen.width;
    const maxW = Math.min(w - 32, 340);
    tipText.style.wordWrapWidth = maxW - paddingX * 2;

    const bgW = maxW;
    const bgH = tipText.height + paddingY * 2;

    bg.clear();
    bg.roundRect(0, 0, bgW, bgH, 8);
    bg.fill({ color: 0x14213d, alpha: 0.82 });
    bg.stroke({ color: 0x8d99ae, width: 1, alpha: 0.3 });

    container.x = (w - bgW) / 2;
    container.y = 54;

    tipText.position.set(bgW / 2, bgH / 2);
  }

  function update(index) {
    setTip(index);

    // Remove the test if index is null
    if (index === null) {
      container.visible = false;
    }
  }

  layout();

  return { container, layout, update };
}
