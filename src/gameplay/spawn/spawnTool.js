import { scene } from '@/utils/renderer';
import { deactivate, activate, isActive, getActiveCallback } from '@/utils/placementTool';
import models from '@/store/models';

export const spawnActivator = (ground, fc, blockSize = 1) => {
  if (isActive()) {
    const sameTool = getActiveCallback() === fc;
    deactivate();
    if (sameTool) return;
  }
  activate(ground, fc, blockSize);
};

export async function spawnRedRose(point, color = 'red') {
  const model = await models.roseModel.default(point, color);
  scene.add(model);
}

export async function spawnStatue(point, id = 1) {
  const model = await models.statueModel.default(point, id);
  scene.add(model);
}
