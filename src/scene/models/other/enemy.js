import gltfLoader from '@/utils/loader/gltfLoader';

const monster = async (position = { x: 1, y: 0.1, z: 0 }) => {
  const { scene: model } = await gltfLoader.loadAsync('./models/monster.glb');

  model.scale.set(0.05, 0.05, 0.05);
  model.rotation.y = Math.PI * -0.5;
  model.position.set(position.x, position.y, position.z);
  model.castShadow = true;

  return model;
};
export default monster;
