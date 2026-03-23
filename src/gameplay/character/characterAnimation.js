import * as THREE from 'three';

let mixer = null;
const actions = {};
let currentAction = null;
let locked = false;

export function initAnimations(animMixer, clips) {
  mixer = animMixer;

  for (const clip of clips) {
    const name = clip.name.toLowerCase();
    const action = mixer.clipAction(clip);
    if (name === 'slash') action.timeScale = 3;
    actions[name] = action;
  }

  console.log('Registered animation actions:', Object.keys(actions));

  play('idle');
}

export function play(name, { fadeDuration = 0.2, loop = true, force = false } = {}) {
  if (locked && !force) return;
  const action = actions[name];
  if (!action || action === currentAction) return;

  action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
  if (!loop) action.clampWhenFinished = true;

  if (currentAction) {
    currentAction.fadeOut(fadeDuration);
  }
  action.reset().fadeIn(fadeDuration).play();
  currentAction = action;
}

export function playOnce(name, onDone) {
  const action = actions[name];
  if (!action) return;

  locked = true;
  play(name, { loop: false, force: true });

  const handler = (e) => {
    if (e.action === action) {
      mixer.removeEventListener('finished', handler);
      locked = false;
      onDone?.();
    }
  };
  mixer.addEventListener('finished', handler);
}

export function updateAnimations(delta) {
  mixer?.update(delta);
}

export function getActionNames() {
  return Object.keys(actions);
}
