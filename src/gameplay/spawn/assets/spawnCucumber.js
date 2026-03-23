import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/store/state';
import { scene } from '@/utils/renderer';
import { spawnActivator } from '../spawnTool';
import { deactivate } from '../../../utils/placementTool';
import models from '@/store/models';

async function spawnCucumber(point) {
  if (state.money < assetConfig.cucumber.price) return;
  const model = await models.cucumberModel.default(point);
  scene.add(model);
  state.money -= assetConfig.cucumber.price;

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
      state.money += assetConfig.cucumber.harvestIncome;
    },
  };
  state.cucumbers.push(entry);

  if (state.money < assetConfig.cucumber.price) {
    deactivate();
  }
}

export const actionCucumber = () => {
  if (state.money >= assetConfig.cucumber.price) {
    spawnActivator(ground, spawnCucumber, assetConfig.cucumber.blockSize);
  } else {
    deactivate();
  }
};
