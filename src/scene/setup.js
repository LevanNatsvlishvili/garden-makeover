import { scene } from '../utils/renderer';
import ground from './environment/ground';
import { ambientLight, directionalLight } from './lights/lights';
import { setupEnvironment } from './environment/environment';
import models from '@/store/models';
import spawnHouse, { housePoint } from '@/gameplay/spawn/assets/spawnHouse';
import { trees } from '@/config/treeConfig';
import { markOccupied } from '@/utils/placementTool';
import { assetConfig } from '@/config/assetConfig';
import character from './models/other/character';
import tree from './models/other/tree';
import house from './models/structures/house';
import { spawnMonster } from '@/gameplay/enemyAI/spawnMonster';

const loadStarterModels = async () => {
  models.houseModel = await house(housePoint);
  models.characterModel = await character();

  const side = Math.sqrt(assetConfig.tree.blockSize);
  const treeSprites = await Promise.all(trees.map((pos) => tree(pos)));
  treeSprites.forEach((sprite, i) => {
    scene.add(sprite);
    markOccupied(trees[i].x, trees[i].z, side);
  });

  scene.add(models.characterModel);
};

export async function setupScene() {
  setupEnvironment();

  await loadStarterModels();
  spawnHouse();

  scene.add(ground);
  scene.add(ambientLight);
  scene.add(directionalLight);
}

export default setupScene;
