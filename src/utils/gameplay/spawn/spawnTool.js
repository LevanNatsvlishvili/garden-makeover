import { scene } from '@/utils/renderer';
import { deactivate, activate, isActive, getActiveCallback } from '@/utils/placementTool';
import house from '@/scene/models/structures/house';
import { assetConfig } from '@/config/assetConfig';
import * as THREE from 'three';
import { markOccupied, snapToGrid } from '@/utils/placementTool';
import models from '@/store/models';

export const spawnActivator = (ground, fc, blockSize = 1) => {
  if (isActive()) {
    const sameTool = getActiveCallback() === fc;
    deactivate();
    if (sameTool) return;
  }
  activate(ground, fc, blockSize);
};

export async function spawnCucumber(point) {
  const model = await models.cucumberModel.default(point);
  scene.add(model);
}

export async function spawnVine(point) {
  const model = await models.vineModel.default(point);
  scene.add(model);
}

export async function spawnRedRose(point, color = 'red') {
  const model = await models.roseModel.default(point, color);
  scene.add(model);
}

export async function spawnStatue(point, id = 1) {
  const model = await models.statueModel.default(point, id);
  scene.add(model);
}

export async function spawnWell(point) {
  const model = await models.wellModel.default(point);
  scene.add(model);
}

// Starter Tools
export async function spawnHouse() {
  const { xBlocks, yBlocks } = assetConfig.house;
  const housePoint = new THREE.Vector3(
    snapToGrid(assetConfig.house.startingPosition.x, xBlocks),
    0,
    snapToGrid(assetConfig.house.startingPosition.z, yBlocks)
  );
  const houseModel = await models.houseModel.default(housePoint);
  scene.add(houseModel);
  markOccupied(housePoint.x, housePoint.z, xBlocks, yBlocks);

  return houseModel;
}
