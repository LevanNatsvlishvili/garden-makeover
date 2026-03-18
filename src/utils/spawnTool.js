import { scene } from '@/utils/renderer';
import { deactivate, activate, isActive } from '@/utils/placementTool';
const tomatoModel = await import('@/scene/models/plants/tomato');
const cucumberModel = await import('@/scene/models/plants/cucumber');
const vineModel = await import('@/scene/models/plants/vine');

export async function spawnTomato(point) {
  const model = await tomatoModel.default(point);
  scene.add(model);
}

export const spawnActivator = (ground, fc, blockSize = 1) => {
  if (isActive()) {
    deactivate();
  } else {
    activate(ground, fc, blockSize);
  }
};

export async function spawnCucumber(point) {
  const model = await cucumberModel.default(point);
  scene.add(model);
}

export async function spawnVine(point) {
  const model = await vineModel.default(point);
  scene.add(model);
}
