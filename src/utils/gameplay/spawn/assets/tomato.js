import { assetConfig } from '@/config/assetConfig';
import ground from '@/scene/environment/ground';
import state from '@/store/state';
import { scene } from '@/utils/renderer';
import { spawnActivator } from '../spawnTool';
import { deactivate } from '../../../placementTool';
import { updateAllButtons } from '../../buttonManager';
const tomatoModel = await import('@/scene/models/plants/tomato');

export async function spawnTomato(point) {
  if (state.money < assetConfig.tomato.price) return;
  const model = await tomatoModel.default(point);
  scene.add(model);
  state.money -= assetConfig.tomato.price;

  const entry = {
    ref: model,
    status: 'growing',
    setStatus(newStatus) {
      this.status = newStatus;
      const [ripeSprite, growingSprite] = model.children;
      ripeSprite.visible = newStatus === 'ripe';
      growingSprite.visible = newStatus === 'growing';
      updateAllButtons();
    },
    ripenHarvest() {
      this.status = 'ripe';
      const [ripeSprite, growingSprite] = model.children;
      ripeSprite.visible = true;
      growingSprite.visible = false;
      updateAllButtons();
    },
    takeHarvest() {
      if (this.status !== 'ripe') return;
      this.status = 'growing';
      const [ripeSprite, growingSprite] = model.children;
      ripeSprite.visible = false;
      growingSprite.visible = true;
      state.money += assetConfig.tomato.harvestIncome;
      updateAllButtons();
    },
  };
  state.tomatoes.push(entry);

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
