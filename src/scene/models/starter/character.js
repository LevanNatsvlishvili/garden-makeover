// import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gltfLoader';
import { config as globalConfig } from '@/config/config';

const { startingPosition } = globalConfig.character;

const character = async () => {
  const characterSprite = await gltfLoader.loadAsync('./models/character.glb');
  const model = characterSprite.scene;

  model.scale.set(0.1, 0.1, 0.1);
  model.rotation.y = Math.PI * 0.5;
  model.position.set(startingPosition.x, startingPosition.y, startingPosition.z);
  model.castShadow = true;

  model.traverse((child) => {
    if (child.isMesh) {
      child.renderOrder = 999;
      child.material.transparent = true;
      child.material.depthTest = true;
      child.material.depthWrite = true;
    }
  });

  return model;
};
export default character;
