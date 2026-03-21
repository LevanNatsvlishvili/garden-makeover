import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gltfLoader';
import { config as globalConfig } from '@/config/config';
import state from '@/store/state';

const { startingPosition } = globalConfig.character;
export const torchLight = new THREE.PointLight(0xffa733, 1.6, 4, 2); // color, intensity, distance, decay

const character = async () => {
  const characterSprite = await gltfLoader.loadAsync('./models/character.glb');
  const model = characterSprite.scene;

  model.scale.set(0.1, 0.1, 0.1);
  model.rotation.y = Math.PI * 0.5;
  model.position.set(startingPosition.x, startingPosition.y, startingPosition.z);
  model.castShadow = true;

  // torchLight.position.x = 0.5;
  // torchLight.position.z = props.position.z;
  // torchLight.position.y = 0.5;
  // torchLight.shadow.mapSize.set(shadow.mapSize.width, shadow.mapSize.height);
  torchLight.shadow.radius = 2; // softer edge
  torchLight.position.y = 1.1;
  torchLight.position.x = 0.51;
  torchLight.intensity = state.isDay ? 0 : 1.5;
  torchLight.distance = 8;
  torchLight.decay = 1;
  model.add(torchLight);
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
