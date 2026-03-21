import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/store/state';
import { scene } from '@/utils/renderer';
import { spawnActivator } from '../spawnTool';
import { deactivate } from '../../../utils/placementTool';
import { updateAllButtons } from '../../buttonManager';
import models from '@/store/models';

async function spawnWell(point) {
  if (state.money < assetConfig.well.price) return;
  const model = await models.treeModel.default(point);
  scene.add(model);
  state.money -= assetConfig.well.price;
  state.isWellPlaced = true;
  updateAllButtons();
  deactivate();
}

export const placeWell = () => {
  if (state.money >= assetConfig.well.price) {
    spawnActivator(ground, spawnWell, assetConfig.well.blockSize);
  } else {
    deactivate();
  }
};
