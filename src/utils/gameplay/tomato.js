import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/state/state';
import { scene } from '@/utils/renderer';
const tomatoModel = await import('@/scene/models/plants/tomato');
import { spawnActivator } from './spawnTool';

export async function spawnTomato(point) {
  const model = await tomatoModel.default(point);
  scene.add(model);
  state.money -= assetConfig.tomato.price;
}

export const actionTomato = () => {
  if (state.money >= assetConfig.tomato.price) {
    spawnActivator(ground, spawnTomato, assetConfig.tomato.blockSize);
  }
};
