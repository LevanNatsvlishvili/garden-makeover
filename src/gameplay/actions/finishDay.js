import state from '@/store/state';
import { ambientLight, directionalLight } from '@/scene/lights/lights';
import { config } from '@/config/config';
import { torchLight } from '@/scene/models/other/character';
import { scene } from '@/utils/renderer';
import { deactivate } from '@/utils/placementTool';
import { spawnMonsters } from '@/gameplay/enemyAI/spawnMonster';
import { setNightTint } from '@/utils/setNightTint';

const { intensity: defaultAmbient, nightIntensity: nightAmbient } = config.lights.ambient;
const { intensity: defaultDirectional, nightIntensity: nightDirectional } =
  config.lights.directional;

export function finishDay() {
  const wasDay = state.isDay;
  state.isDay = !wasDay;

  if (wasDay) {
    spawnMonsters(1);
    ambientLight.intensity = nightAmbient;
    directionalLight.intensity = nightDirectional;
    torchLight.intensity = 1.5;
    setNightTint(true);
  }

  if (!state.isDay) deactivate();
}
