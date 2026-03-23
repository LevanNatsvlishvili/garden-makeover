import state from '@/store/state';
import { ambientLight, directionalLight } from '@/scene/lights/lights';
import { config } from '@/config/config';
import { torchLight } from '@/scene/models/other/character';
import { deactivate } from '@/utils/placementTool';
import { spawnMonsters } from '@/gameplay/enemyAI/spawnMonster';
import { setNightTint } from '@/utils/setNightTint';

const { nightIntensity: nightAmbient } = config.lights.ambient;
const { nightIntensity: nightDirectional } = config.lights.directional;

export async function finishDay() {
  const wasDay = state.isDay;

  if (wasDay) {
    ambientLight.intensity = nightAmbient;
    directionalLight.intensity = nightDirectional;
    torchLight.intensity = 1.5;
    setNightTint(true);
    state.isDay = false;
    spawnMonsters(3);
  }

  if (!state.isDay) deactivate();
}
