import state from '@/state/state';

const buttons = [];

export function registerButton(controller, price) {
  buttons.push({ controller, price });
}

export function updateAllButtons() {
  for (const { controller, price } of buttons) {
    controller.enable(state.money >= price);
  }
}
