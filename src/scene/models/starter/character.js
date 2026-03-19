// import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gltfLoader';
import { config as globalConfig } from '@/config/config';

const { startingPosition } = globalConfig.character;

const character = async () => {
  const characterSprite = await gltfLoader.loadAsync('./models/character.glb');
  const model = characterSprite.scene;
  model.scale.set(0.1, 0.1, 0.1);
  model.rotation.y = Math.PI * 0.5;
  model.position.y = 0.1;
  model.position.x = -0.25;
  model.position.z = -0;
  model.position.set(startingPosition.x, startingPosition.y, startingPosition.z);

  return model;
};
export default character;
