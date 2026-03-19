// import * as THREE from 'three';
import gltfLoader from '@/utils/loader/gltfLoader';

const character = async () => {
  const characterSprite = await gltfLoader.loadAsync('./models/character.glb');
  const model = characterSprite.scene;
  model.scale.set(0.1, 0.1, 0.1);
  model.rotation.y = Math.PI * 0.5;
  model.position.y = 0.1;
  model.position.x = -0.25;
  model.position.z = -0;

  return model;
};
export default character;
