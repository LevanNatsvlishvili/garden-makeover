import { Container, Graphics } from 'pixi.js';

const BASE_RADIUS = 50;
const KNOB_RADIUS = 20;
const BASE_COLOR = 0xffffff;
const KNOB_COLOR = 0xcccccc;

export const joystickInput = { x: 0, y: 0 };

export function buildJoystick() {
  const container = new Container();
  container.eventMode = 'static';

  const base = new Graphics();
  base.circle(0, 0, BASE_RADIUS);
  base.fill({ color: BASE_COLOR, alpha: 0.15 });
  base.stroke({ color: BASE_COLOR, width: 2, alpha: 0.3 });
  container.addChild(base);

  const knob = new Graphics();
  knob.circle(0, 0, KNOB_RADIUS);
  knob.fill({ color: KNOB_COLOR, alpha: 0.5 });
  container.addChild(knob);

  container.hitArea = {
    contains: (x, y) => x * x + y * y <= BASE_RADIUS * BASE_RADIUS,
  };

  let dragging = false;

  container.on('pointerdown', (e) => {
    dragging = true;
    updateKnob(e);
  });

  container.on('globalpointermove', (e) => {
    if (!dragging) return;
    updateKnob(e);
  });

  container.on('pointerup', release);
  container.on('pointerupoutside', release);

  function updateKnob(e) {
    const local = container.toLocal(e.global);
    const dist = Math.sqrt(local.x * local.x + local.y * local.y);
    const clamped = Math.min(dist, BASE_RADIUS);
    const angle = Math.atan2(local.y, local.x);

    knob.x = Math.cos(angle) * clamped;
    knob.y = Math.sin(angle) * clamped;

    joystickInput.x = knob.x / BASE_RADIUS;
    joystickInput.y = knob.y / BASE_RADIUS;
  }

  function release() {
    dragging = false;
    knob.x = 0;
    knob.y = 0;
    joystickInput.x = 0;
    joystickInput.y = 0;
  }

  return container;
}
