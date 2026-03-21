import state from '@/store/state';
import { ambientLight, directionalLight } from '@/scene/lights/lights';
import { config } from '@/config/config';
import { torchLight } from '@/scene/models/other/character';
import { scene } from '@/utils/renderer';

const { intensity: defaultAmbient, nightIntensity: nightAmbient } = config.lights.ambient;
const { intensity: defaultDirectional, nightIntensity: nightDirectional } =
  config.lights.directional;

function setNightTint(isNight) {
  const tint = isNight ? 0.4 : 1;
  scene.traverse((child) => {
    if (child.isSprite) {
      child.material.color.setScalar(tint);
    }
  });
}

export function turnDay() {
  const wasDay = state.isDay;
  state.isDay = !wasDay;

  ambientLight.intensity = wasDay ? nightAmbient : defaultAmbient;
  directionalLight.intensity = wasDay ? nightDirectional : defaultDirectional;
  torchLight.intensity = wasDay ? 1.5 : 0;
  setNightTint(wasDay);
}
