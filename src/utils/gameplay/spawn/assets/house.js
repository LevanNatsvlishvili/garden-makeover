import { scene } from '@/utils/renderer';
import models from '@/store/models';
import { assetConfig } from '@/config/assetConfig';
import { snapToGrid } from '@/utils/placementTool';
import * as THREE from 'three';
import { markOccupied } from '@/utils/placementTool';
import house from '@/scene/models/structures/house';

const { xBlocks, yBlocks } = assetConfig.house;
export const housePoint = new THREE.Vector3(
  snapToGrid(assetConfig.house.startingPosition.x, xBlocks),
  0,
  snapToGrid(assetConfig.house.startingPosition.z, yBlocks)
);

// Starter Tools
async function spawnHouse() {
  scene.add(models.houseModel);
  markOccupied(housePoint.x, housePoint.z, xBlocks, yBlocks);

  return models.houseModel;
}

export default spawnHouse;
