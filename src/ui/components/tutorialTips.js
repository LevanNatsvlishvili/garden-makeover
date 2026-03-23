import { Container, Graphics, Text } from 'pixi.js';
import { app } from '../pixiApp';
import state from '@/store/state';

const TIPS = [
  'You need to place the well, its essential for you and your plants to survive .',
  'Harvest ripe crops before nightfall to earn gold.',
  'Place the well first — plants need water to grow!',
  'Monsters appear at night. Use the attack button to fight back.',
  'Buy more plants to increase your income per harvest.',
  "Watch your health bar — if it hits zero, it's game over.",
  'Finish the day early to rest and prepare for the next wave.',
];

const TIP_DURATION = 4000; // ms between tip changes
const FADE_DURATION = 400; // ms for fade in/out

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
  let alpha = 1;
  let phase = 'visible'; // 'visible' | 'fadeout' | 'fadein'

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

  function update() {
    const now = performance.now();
    const elapsed = now - lastSwitch;

    if (state.isWellPlaced) {
      setTip(0);
    }

    // if (phase === 'visible' && elapsed >= TIP_DURATION) {
    //   phase = 'fadeout';
    //   lastSwitch = now;
    // } else if (phase === 'fadeout') {
    //   alpha = Math.max(0, 1 - elapsed / FADE_DURATION);
    //   container.alpha = alpha;
    //   if (elapsed >= FADE_DURATION) {
    //     currentIndex = (currentIndex + 1) % TIPS.length;
    //     setTip(currentIndex);
    //     layout();
    //     phase = 'fadein';
    //     lastSwitch = now;
    //   }
    // } else if (phase === 'fadein') {
    //   alpha = Math.min(1, elapsed / FADE_DURATION);
    //   container.alpha = alpha;
    //   if (elapsed >= FADE_DURATION) {
    //     container.alpha = 1;
    //     phase = 'visible';
    //     lastSwitch = now;
    //   }
    // }
  }

  layout();

  return { container, layout, update };
}
