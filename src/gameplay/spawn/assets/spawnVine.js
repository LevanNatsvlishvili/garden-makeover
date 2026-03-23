import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/store/state';
import { scene } from '@/utils/renderer';
import { spawnActivator } from '../spawnTool';
import { deactivate } from '../../../utils/placementTool';
import models from '@/store/models';

async function spawnVine(point) {
  if (state.money < assetConfig.vine.price) return;
  const model = await models.vineModel.default(point);
  scene.add(model);
  state.money -= assetConfig.vine.price;

  const entry = {
    ref: model,
    status: 'growing',
    setStatus(newStatus) {
      this.status = newStatus;
      const [ripeSprite, growingSprite] = model.children;
      ripeSprite.visible = newStatus === 'ripe';
      growingSprite.visible = newStatus === 'growing';
    },
    ripenHarvest() {
      this.status = 'ripe';
      const [ripeSprite, growingSprite] = model.children;
      ripeSprite.visible = true;
      growingSprite.visible = false;
    },
    takeHarvest() {
      if (this.status !== 'ripe') return;
      this.status = 'growing';
      const [ripeSprite, growingSprite] = model.children;
      ripeSprite.visible = false;
      growingSprite.visible = true;
      state.money += assetConfig.vine.harvestIncome;
    },
  };
  state.vines.push(entry);

  if (state.money < assetConfig.vine.price) {
    deactivate();
  }
}

export const actionVine = () => {
  if (state.money >= assetConfig.vine.price) {
    spawnActivator(ground, spawnVine, assetConfig.vine.blockSize);
  } else {
    deactivate();
  }
};
