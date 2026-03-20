import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/state/state';
import { scene } from '@/utils/renderer';
import { spawnActivator } from './spawnTool';
import { deactivate } from '../placementTool';
import { updateAllButtons } from './buttonManager';
const wellModel = await import('@/scene/models/assets/well');

export async function spawnWell(point) {
  if (state.money < assetConfig.well.price) return;
  const model = await wellModel.default(point);
  scene.add(model);
  state.money -= assetConfig.well.price;
  state.isWellPlaced = true;
  updateAllButtons();
  if (state.money < assetConfig.well.price) {
    deactivate();
  }
}

export const actionWell = () => {
  if (state.money >= assetConfig.well.price) {
    spawnActivator(ground, spawnWell, assetConfig.well.blockSize);
  } else {
    deactivate();
  }
};
