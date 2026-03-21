import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gltfLoader';
import { config as globalConfig } from '@/config/config';

const { startingPosition } = globalConfig.monster;
export const torchLight = new THREE.PointLight(0xffa733, 1.6, 4, 2); // color, intensity, distance, decay

const monster = async () => {
  const monsterSprite = await gltfLoader.loadAsync('./models/monster.glb');
  const model = monsterSprite.scene;

  model.scale.set(0.1, 0.1, 0.1);
  model.rotation.y = Math.PI * -0.5;
  model.position.set(startingPosition.x, startingPosition.y, startingPosition.z);
  model.castShadow = true;

  return model;
};
export default monster;
