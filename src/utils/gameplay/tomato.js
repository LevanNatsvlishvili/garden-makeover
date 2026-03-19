import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/state/state';
import { scene } from '@/utils/renderer';
import { spawnActivator } from './spawnTool';
import { deactivate } from '../placementTool';
import { updateAllButtons } from './buttonManager';
const tomatoModel = await import('@/scene/models/plants/tomato');

export async function spawnTomato(point) {
  if (state.money < assetConfig.tomato.price) return;
  const model = await tomatoModel.default(point);
  scene.add(model);
  state.money -= assetConfig.tomato.price;
  updateAllButtons();
  if (state.money < assetConfig.tomato.price) {
    deactivate();
  }
}

export const actionTomato = () => {
  if (state.money >= assetConfig.tomato.price) {
    spawnActivator(ground, spawnTomato, assetConfig.tomato.blockSize);
  } else {
    deactivate();
  }
};
