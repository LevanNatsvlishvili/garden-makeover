import { scene } from '@/utils/renderer';
const tomatoModel = await import('@/scene/models/plants/tomato');
const cucumberModel = await import('@/scene/models/plants/cucumber');
const vineModel = await import('@/scene/models/plants/vine');

export async function spawnTomato(point) {
  const model = await tomatoModel.default(point);
  scene.add(model);
}

export async function spawnCucumber(point) {
  const model = await cucumberModel.default(point);
  scene.add(model);
}

export async function spawnVine(point) {
  const model = await vineModel.default(point);
  scene.add(model);
}
