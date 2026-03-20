const buttons = [];

export function registerButton(controller, condition) {
  buttons.push({ controller, condition });
}

export function updateAllButtons() {
  for (const { controller, condition } of buttons) {
    controller.enable(condition());
  }
}
