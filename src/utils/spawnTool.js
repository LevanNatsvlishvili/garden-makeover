import { scene } from '@/utils/renderer';
const tomatoModel = await import('@/scene/models/plants/tomato');

export async function spawnTomato(point) {
  const model = await tomatoModel.default(point);
  scene.add(model);
}
