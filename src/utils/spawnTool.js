import { scene } from '@/utils/renderer';
import { deactivate, activate, isActive } from '@/utils/placementTool';
import house from '@/scene/models/starter/house';
import { assetConfig } from '@/config/assetConfig';
import * as THREE from 'three';
import { markOccupied, snapToGrid } from '@/utils/placementTool';

const tomatoModel = await import('@/scene/models/plants/tomato');
const cucumberModel = await import('@/scene/models/plants/cucumber');
const vineModel = await import('@/scene/models/plants/vine');
const roseModel = await import('@/scene/models/decoration/rose');
const statueModel = await import('@/scene/models/decoration/statue');
const wellModel = await import('@/scene/models/assets/well');

export const spawnActivator = (ground, fc, blockSize = 1) => {
  if (isActive()) {
    deactivate();
  } else {
    activate(ground, fc, blockSize);
  }
};

export async function spawnTomato(point) {
  const model = await tomatoModel.default(point);
  scene.add(model);
}

export async function spawnCucumber(point) {
  const model = await cucumberModel.default(point);
  scene.add(model);
}

export async function spawnVine(point) {
  const model = await vineModel.default(point);
  scene.add(model);
}

export async function spawnRedRose(point, color = 'red') {
  const model = await roseModel.default(point, color);
  scene.add(model);
}

export async function spawnStatue(point, id = 1) {
  const model = await statueModel.default(point, id);
  scene.add(model);
}

export async function spawnWell(point) {
  const model = await wellModel.default(point);
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
  const houseModel = await house(housePoint);
  scene.add(houseModel);
  markOccupied(housePoint.x, housePoint.z, xBlocks, yBlocks);

  return houseModel;
}
